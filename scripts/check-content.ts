import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export function checkContent(root: string): string[] {
  const errors: string[] = [];
  const fail = (file: string, message: string) =>
    errors.push(`${file}: ${message}`);

  const exactAsset = (url: string): boolean => {
    const clean = decodeURIComponent(url.split(/[?#]/)[0] || "");
    if (!clean.startsWith("/") || clean.startsWith("//")) return true;
    const parts = clean.slice(1).split("/");
    if (parts.some((part) => !part || part === "." || part === ".."))
      return false;
    let dir = path.join(root, "public");
    for (const part of parts) {
      if (
        !fs.existsSync(dir) ||
        !fs.statSync(dir).isDirectory() ||
        !fs.readdirSync(dir).includes(part)
      ) {
        return false;
      }
      dir = path.join(dir, part);
    }
    return fs.statSync(dir).isFile();
  };

  for (const collection of ["blog", "projects"] as const) {
    const dir = path.join(root, "src/content", collection);
    const indexPath = path.join(dir, "index.ts");
    if (!fs.existsSync(indexPath)) {
      fail(collection, "missing src/content/" + collection + "/index.ts");
      continue;
    }

    const indexSrc = fs.readFileSync(indexPath, "utf8");
    const slugs = new Set<string>();
    for (const match of indexSrc.matchAll(/\bslug:\s*["']([^"']*)["']/g)) {
      const slug = match[1];
      if (!slug || slugs.has(slug)) {
        fail(`${collection}/index.ts`, `duplicate or empty slug: ${slug}`);
      }
      slugs.add(slug);
    }
    if (!slugs.size) {
      fail(`${collection}/index.ts`, "must declare at least one entry");
    }

    if (collection === "blog") {
      for (const match of indexSrc.matchAll(/\bdate:\s*["']([^"']*)["']/g)) {
        const rawDate = match[1];
        if (!Number.isFinite(new Date(rawDate).getTime())) {
          fail(`${collection}/index.ts`, `date must be valid: ${rawDate}`);
        }
      }
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".vue") || file.endsWith(".ts"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      for (const match of content.matchAll(
        /["'](\/(?:img|pdf)\/(?!generated\/)[^"'\r\n]+?)["']/g,
      )) {
        const asset = match[1];
        if (asset && !exactAsset(asset)) {
          fail(
            `${collection}/${file}`,
            `asset does not exist with exact case: ${asset}`,
          );
        }
      }
    }
  }

  return errors;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const errors = checkContent(process.cwd());
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Content validation passed.");
  }
}
