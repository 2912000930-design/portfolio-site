import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const root = process.cwd();
const workerUrl = pathToFileURL(join(root, "dist/server/index.js")).href;

async function fetchFromDist(pathname) {
  const filePath = join(root, "dist", pathname.replace(/^\//, ""));
  return new Response(await readFile(filePath), {
    headers: {
      "content-type": extname(filePath) === ".html" ? "text/html" : "text/plain",
    },
  });
}

async function fetchFromArchiveRoot(pathname) {
  try {
    const filePath = join(root, pathname.replace(/^\//, ""));
    return new Response(await readFile(filePath));
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function render(pathname) {
  const { default: worker } = await import(`${workerUrl}?t=${Date.now()}`);

  return worker.fetch(
    new Request(`https://example.test${pathname}`),
    {
      ASSETS: {
        fetch: (request) => fetchFromDist(new URL(request.url).pathname),
      },
    }
  );
}

async function renderWithArchiveRootAssets(pathname) {
  const { default: worker } = await import(`${workerUrl}?t=${Date.now()}`);

  return worker.fetch(
    new Request(`https://example.test${pathname}`),
    {
      ASSETS: {
        fetch: (request) => fetchFromArchiveRoot(new URL(request.url).pathname),
      },
    }
  );
}

test("Sites static worker serves the portfolio homepage without external assets", async () => {
  const response = await render("/");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/);

  const html = await response.text();
  assert.match(html, /My Projects/);
  assert.match(html, /\/demos\/interview-assistant/);
  assert.match(html, /<style data-sites-inline-css>/);
  assert.doesNotMatch(html, /\/_next\/static\/chunks\/[^"]+\.css/);
});

test("Sites static worker serves the AI Interview Coach landing route", async () => {
  const response = await render("/demos/interview-assistant");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/);
  assert.match(await response.text(), /Master Your Interview with AI/);
});

test("Sites static worker serves public assets from archive-root ASSETS bindings", async () => {
  const response = await renderWithArchiveRootAssets("/buildspace.jpg");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /image\/jpeg/);
});
