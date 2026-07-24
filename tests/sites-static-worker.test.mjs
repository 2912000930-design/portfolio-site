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

test("Sites static worker serves the AI Interview Coach landing route", async () => {
  const { default: worker } = await import(`${workerUrl}?t=${Date.now()}`);
  const response = await worker.fetch(
    new Request("https://example.test/demos/interview-assistant"),
    {
      ASSETS: {
        fetch: (request) => fetchFromDist(new URL(request.url).pathname),
      },
    }
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/);
  assert.match(await response.text(), /Master Your Interview with AI/);
});
