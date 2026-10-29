import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";

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
      )
        return false;
      dir = path.join(dir, part);
    }
    return fs.statSync(dir).isFile();
  };
  for (const collection of ["blog", "projects"]) {
    const dir = path.join(root, "content", collection);
    const files = fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
      : [];
    if (!files.length) {
      fail(collection, "collection must contain Markdown files");
      continue;
    }
    const slugs = new Set<string>();
    for (const file of files) {
      const label = `${collection}/${file}`;
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
      if (!slug || slugs.has(slug))
        fail(label, `duplicate or empty slug: ${slug}`);
      slugs.add(slug);
      let parsed: matter.GrayMatterFile<string>;
      try {
        parsed = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      } catch (error) {
        fail(label, `invalid frontmatter: ${String(error)}`);
        continue;
      }
      const { data, content } = parsed;
      for (const field of ["title", "description"]) {
        if (typeof data[field] !== "string" || !data[field].trim())
          fail(label, `${field} must be a nonempty string`);
      }
      for (const field of ["tags", "categories"]) {
        const value = data[field];
        if (
          value != null &&
          !(
            typeof value === "string" ||
            (Array.isArray(value) &&
              value.every((v: unknown) => typeof v === "string"))
          )
        )
          fail(label, `${field} must be a string or array of strings`);
      }
      if (collection === "blog") {
        const date = data.date;
        if (
          !(date instanceof Date || typeof date === "string") ||
          !Number.isFinite(new Date(date).getTime())
        )
          fail(label, "date must be valid");
      } else {
        if (typeof data.image !== "string" || !data.image.trim())
          fail(label, "image must be a nonempty string");
        else if (!exactAsset(data.image))
          fail(label, `asset does not exist with exact case: ${data.image}`);
        if (data.category != null && typeof data.category !== "string")
          fail(label, "category must be a string");
        if (
          data.order != null &&
          !(typeof data.order === "number" || typeof data.order === "string")
        )
          fail(label, "order must be a number or numeric string");
        else if (
          data.order != null &&
          (String(data.order).trim() === "" ||
            !Number.isFinite(Number(data.order)))
        )
          fail(label, "order must be a number or numeric string");
      }
      for (const match of content.matchAll(
        /^(?:imagePath|link):\s*["']?([^\n"']+)["']?\s*$/gm,
      )) {
        const asset = match[1]?.trim();
        if (asset?.startsWith("/") && !exactAsset(asset))
          fail(label, `asset does not exist with exact case: ${asset}`);
      }
      for (const match of content.matchAll(/!\[[^\]]*\]\((\/[^)]+)\)/g)) {
        const asset = match[1];
        if (asset && !exactAsset(asset))
          fail(label, `asset does not exist with exact case: ${asset}`);
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
  } else console.log("Content validation passed.");
}
