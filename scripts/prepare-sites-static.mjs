import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
const nextStaticDir = join(root, ".next", "static");
const publicDir = join(root, "public");
const distDir = join(root, "dist");
const pagesDir = join(distDir, "__static_pages");
const serverDir = join(distDir, "server");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".ttf", "font/ttf"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

async function exists(path) {
  try {
    await readdir(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFromHtml(htmlPath) {
  const appRelative = relative(appDir, htmlPath).split(sep).join("/");
  const withoutExt = appRelative.replace(/\.html$/, "");

  if (withoutExt === "index") {
    return "index";
  }

  return withoutExt;
}

function workerSource(routes) {
  return `const routes = new Map(${JSON.stringify(routes, null, 2)});

const contentTypes = new Map(${JSON.stringify([...contentTypes], null, 2)});

function contentTypeFor(path) {
  const dot = path.lastIndexOf(".");
  const extension = dot >= 0 ? path.slice(dot) : "";
  return contentTypes.get(extension) ?? "application/octet-stream";
}

async function assetResponse(request, env, path) {
  const url = new URL(request.url);
  url.pathname = path;
  const response = await env.ASSETS.fetch(new Request(url, request));

  if (response.status !== 200) {
    return response;
  }

  const headers = new Headers(response.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", contentTypeFor(path));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function candidateRoutes(pathname) {
  const cleanPath = pathname.replace(/\\/$/, "") || "/";
  const withoutSlash = cleanPath.slice(1);

  return [
    cleanPath === "/" ? "index" : withoutSlash,
    withoutSlash ? \`\${withoutSlash}/index\` : "index",
    "_not-found",
  ];
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/_next/")) {
      return assetResponse(request, env, url.pathname);
    }

    if (url.pathname.includes(".")) {
      return assetResponse(request, env, url.pathname);
    }

    for (const route of candidateRoutes(url.pathname)) {
      const assetPath = routes.get(route);
      if (assetPath) {
        return assetResponse(request, env, assetPath);
      }
    }

    return new Response("Not found", { status: 404 });
  },
};
`;
}

await rm(distDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });
await mkdir(serverDir, { recursive: true });

if (await exists(publicDir)) {
  await cp(publicDir, distDir, { recursive: true });
}

await cp(nextStaticDir, join(distDir, "_next", "static"), { recursive: true });

const htmlFiles = (await walk(appDir)).filter((file) => file.endsWith(".html"));
const routes = [];

for (const htmlFile of htmlFiles) {
  const route = routeFromHtml(htmlFile);
  const outPath = join(pagesDir, `${route}.html`);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, await readFile(htmlFile, "utf8"));
  routes.push([route, `/__static_pages/${route}.html`]);
}

await writeFile(join(serverDir, "index.js"), workerSource(routes));
