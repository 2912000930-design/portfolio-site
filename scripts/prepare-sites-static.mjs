import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
const nextStaticDir = join(root, ".next", "static");
const nextMediaDir = join(nextStaticDir, "media");
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

function inlineStyles(html, cssBundle) {
  let injected = false;

  return html.replace(
    /<link[^>]+rel="stylesheet"[^>]*>/gi,
    () => {
      if (injected) {
        return "";
      }

      injected = true;
      return `<style data-sites-inline-css>${cssBundle}</style>`;
    }
  );
}

function prepareHtml(html, cssBundle) {
  return inlineStyles(html, cssBundle)
    .replace(/<link[^>]+rel="preload"[^>]*>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/style="opacity:0;filter:[^"]*?;transform:[^"]*?"/g, 'style="opacity:1"');
}

function contentTypeForPath(path) {
  const dot = path.lastIndexOf(".");
  const extension = dot >= 0 ? path.slice(dot) : "";
  return contentTypes.get(extension) ?? "application/octet-stream";
}

async function collectEmbeddedAssets() {
  const assets = [];

  if (await exists(publicDir)) {
    for (const file of await walk(publicDir)) {
      const pathname = `/${relative(publicDir, file).split(sep).join("/")}`;
      assets.push([
        pathname,
        {
          base64: (await readFile(file)).toString("base64"),
          contentType: contentTypeForPath(pathname),
        },
      ]);
    }
  }

  if (await exists(nextMediaDir)) {
    for (const file of await walk(nextMediaDir)) {
      const mediaPath = relative(nextMediaDir, file).split(sep).join("/");
      const asset = {
        base64: (await readFile(file)).toString("base64"),
        contentType: contentTypeForPath(mediaPath),
      };

      assets.push([`/media/${mediaPath}`, asset]);
      assets.push([`/_next/static/media/${mediaPath}`, asset]);
    }
  }

  return assets;
}

function workerSource(routes, pages, embeddedAssets) {
  return `const routes = new Map(${JSON.stringify(routes, null, 2)});

const pages = new Map(${JSON.stringify(pages, null, 2)});

const contentTypes = new Map(${JSON.stringify([...contentTypes], null, 2)});

const embeddedAssets = new Map(${JSON.stringify(embeddedAssets, null, 2)});

function contentTypeFor(path) {
  const dot = path.lastIndexOf(".");
  const extension = dot >= 0 ? path.slice(dot) : "";
  return contentTypes.get(extension) ?? "application/octet-stream";
}

function embeddedAssetResponse(path) {
  const asset = embeddedAssets.get(path);

  if (!asset) {
    return undefined;
  }

  const binary = atob(asset.base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Response(bytes, {
    headers: {
      "content-type": asset.contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

async function fetchAsset(request, env, path) {
  const url = new URL(request.url);
  url.pathname = path;
  return env.ASSETS.fetch(new Request(url, request));
}

async function assetResponse(request, env, path) {
  let response;

  if (env?.ASSETS) {
    response = await fetchAsset(request, env, path);

    if (response.status !== 200 && !path.startsWith("/dist/")) {
      response = await fetchAsset(request, env, \`/dist\${path}\`);
    }
  }

  if (response?.status === 200) {
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

  const embeddedResponse = embeddedAssetResponse(path);

  if (embeddedResponse) {
    return embeddedResponse;
  }

  return response ?? new Response("Not found", { status: 404 });
}

function htmlResponse(assetPath, status = 200) {
  const html = pages.get(assetPath);

  if (!html) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
    },
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
        return htmlResponse(assetPath, route === "_not-found" ? 404 : 200);
      }
    }

    const notFound = routes.get("_not-found");
    return notFound ? htmlResponse(notFound, 404) : new Response("Not found", { status: 404 });
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

const cssFiles = (await walk(nextStaticDir)).filter((file) => file.endsWith(".css"));
const cssBundle = (await Promise.all(cssFiles.map((file) => readFile(file, "utf8")))).join("\n");
const htmlFiles = (await walk(appDir)).filter((file) => file.endsWith(".html"));
const routes = [];
const pages = [];

for (const htmlFile of htmlFiles) {
  const route = routeFromHtml(htmlFile);
  const outPath = join(pagesDir, `${route}.html`);
  const html = prepareHtml(await readFile(htmlFile, "utf8"), cssBundle);

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html);
  routes.push([route, `/__static_pages/${route}.html`]);
  pages.push([`/__static_pages/${route}.html`, html]);
}

const embeddedAssets = await collectEmbeddedAssets();

await writeFile(join(serverDir, "index.js"), workerSource(routes, pages, embeddedAssets));
