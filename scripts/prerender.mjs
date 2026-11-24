import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://lancelance.com";
const distDir = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const serverEntry = path.join(ssrDir, "entry-server.js");
const { render } = await import(pathToFileURL(serverEntry).href);

// Collect visible routes from src/content/blog/index.ts and src/content/projects/index.ts
function extractVisibleSlugs(indexFile) {
  const src = fs.readFileSync(indexFile, "utf8");
  const blocks = src.match(/\{[^{}]*\bslug:\s*["'][^"']+["'][^{}]*\}/g) || [];
  return blocks
    .filter((block) => !/\bhidden:\s*true\b/.test(block))
    .map((block) => block.match(/\bslug:\s*["']([^"']+)["']/)?.[1])
    .filter(Boolean);
}

const blogSlugs = extractVisibleSlugs(path.resolve("src/content/blog/index.ts"));
const projectSlugs = extractVisibleSlugs(path.resolve("src/content/projects/index.ts"));

const routes = [
  "/",
  "/about",
  "/blog",
  "/projects",
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...projectSlugs.map((slug) => `/projects/${slug}`),
];

for (const route of routes) {
  const { html, headTags } = await render(route);
  const pageHtml = template
    .replace("<!--app-head-->", headTags)
    .replace("<!--app-html-->", html);

  const outFile =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, pageHtml);
}

// Render real static 404.html for Cloudflare Pages
{
  const { html, headTags } = await render("/__404__");
  const pageHtml = template
    .replace("<!--app-head-->", headTags)
    .replace("<!--app-html-->", html);
  fs.writeFileSync(path.join(distDir, "404.html"), pageHtml);
}

// Generate sitemap.xml
const sitemapUrls = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${new URL(route, SITE_URL).href}</loc>\n  </url>`,
  )
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

// Emit robots.txt from public/_robots.txt if present
const robotsSrc = path.resolve("public/_robots.txt");
if (fs.existsSync(robotsSrc)) {
  fs.copyFileSync(robotsSrc, path.join(distDir, "robots.txt"));
} else {
  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  );
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} routes + 404.html + sitemap.xml`);
