import { createHash } from "node:crypto";
import {
  readdir,
  readFile,
  mkdir,
  writeFile,
  rename,
  unlink,
  lstat,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generated = path.join(root, "public/img/generated");
const manifestPath = path.join(root, "app/assets/generated-images.json");
const widths = [320, 640, 1280];
const references = new Set();
const check = process.argv.includes("--check");
let stale = false;

for (const directory of ["content/blog", "content/projects"]) {
  const entries = (await readdir(path.join(root, directory)))
    .filter((name) => name.endsWith(".md"))
    .sort();
  for (const entry of entries) {
    const content = await readFile(path.join(root, directory, entry), "utf8");
    for (const match of content.matchAll(
      /^\s*(?:image|imagePath):\s*["']?(\/img\/[^\r\n"']+?)["']?\s*$/gm,
    )) {
      references.add(match[1].trim());
    }
  }
}

for (const source of references) {
  const parts = source.slice("/img/".length).split("/");
  let directory = path.join(root, "public/img");
  for (const part of parts) {
    if (
      !part ||
      part === "." ||
      part === ".." ||
      !(await readdir(directory)).includes(part)
    ) {
      throw new Error(`Image path is missing or has incorrect case: ${source}`);
    }
    directory = path.join(directory, part);
  }
}

await mkdir(generated, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });
if ((await lstat(generated)).isSymbolicLink())
  throw new Error("Generated image directory must not be a symlink");
for (const entry of await readdir(generated, { withFileTypes: true })) {
  if (entry.isSymbolicLink())
    throw new Error(
      `Unexpected symlink in generated image directory: ${entry.name}`,
    );
  if (entry.isFile() && /^[a-f0-9]{20}-\d+\.webp\.tmp$/.test(entry.name)) {
    if (check) stale = true;
    else await unlink(path.join(generated, entry.name));
  }
}
const manifest = {};
const expected = new Set();
for (const source of [...references].sort()) {
  const relative = source.slice("/img/".length);
  if (relative.split("/").some((part) => part === ".." || part === "."))
    throw new Error(`Invalid image path: ${source}`);
  const input = path.join(root, "public/img", relative);
  const metadata = await sharp(input).metadata();
  const rotated =
    metadata.orientation &&
    metadata.orientation >= 5 &&
    metadata.orientation <= 8;
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  if (!width || !height) throw new Error(`Missing dimensions for ${source}`);
  const renditions = [];
  const id = createHash("sha256").update(source).digest("hex").slice(0, 20);
  for (const target of widths.filter((value) => value <= width)) {
    const name = `${id}-${target}.webp`;
    const output = path.join(generated, name);
    const data = await sharp(input)
      .rotate()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    const current = await readFile(output).catch((error) =>
      error.code === "ENOENT" ? null : Promise.reject(error),
    );
    if (!current || !current.equals(data)) {
      if (check) stale = true;
      else {
        const temp = `${output}.tmp`;
        await writeFile(temp, data, { flag: "wx" });
        await rename(temp, output);
      }
    }
    expected.add(name);
    renditions.push({ src: `/img/generated/${name}`, width: target });
  }
  manifest[source] = { width, height, renditions };
}
for (const entry of await readdir(generated, { withFileTypes: true })) {
  if (
    entry.isFile() &&
    /^[a-f0-9]{20}-\d+\.webp(?:\.tmp)?$/.test(entry.name) &&
    !expected.has(entry.name)
  ) {
    if (check) stale = true;
    else await unlink(path.join(generated, entry.name));
  }
}
const json = `${JSON.stringify(manifest, null, 2)}\n`;
const oldManifest = await readFile(manifestPath, "utf8").catch((error) =>
  error.code === "ENOENT" ? null : Promise.reject(error),
);
if (oldManifest !== json) {
  if (check) stale = true;
  else {
    const temp = `${manifestPath}.tmp`;
    await writeFile(temp, json);
    await rename(temp, manifestPath);
  }
}
if (stale)
  throw new Error("Generated images are out of date; run images:generate");
console.log(
  `${check ? "Verified" : "Generated"} ${expected.size} renditions for ${Object.keys(manifest).length} images`,
);
