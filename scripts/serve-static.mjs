import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const files = new Map();
function index(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) index(file);
    else files.set(`/${path.relative(root, file)}`, file);
  }
}
index(root);
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".JPG": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const server = http.createServer((request, response) => {
  let key;
  try {
    key = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (key.endsWith("/")) key += "index.html";
  if (!files.has(key) && files.has(`${key}/index.html`)) key += "/index.html";
  const found = files.get(key);
  const file = found || path.join(root, "404.html");
  response.writeHead(found ? 200 : 404, {
    "content-type": types[path.extname(file)] || "application/octet-stream",
  });
  response.end(fs.readFileSync(file));
});
server.listen(Number(process.env.PORT || 3130), "127.0.0.1");
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close());
