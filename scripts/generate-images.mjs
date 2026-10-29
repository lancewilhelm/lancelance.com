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
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import sharp from "sharp";

const repository = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const digest = (data) => createHash("sha256").update(data).digest("hex");
const recipe = {
  version: 1,
  generator: digest(await readFile(fileURLToPath(import.meta.url))),
  sharp: sharp.versions.sharp,
  widths: [320, 640, 1280],
  format: "webp",
  quality: 85,
  autoOrient: true,
  withoutEnlargement: true,
};
const owned = /^[a-f0-9]{20}-\d+\.webp(?:\.tmp)?$/;

async function readOptional(file) {
  return readFile(file).catch((error) =>
    error.code === "ENOENT" ? null : Promise.reject(error),
  );
}
async function save(file, data) {
  const current = await readOptional(file);
  const bytes = Buffer.isBuffer(data) ? data : Buffer.from(data);
  if (current?.equals(bytes)) return;
  const temporary = `${file}.tmp`;
  await writeFile(temporary, bytes);
  await rename(temporary, file);
}

export async function generateImages({
  root = repository,
  check = false,
} = {}) {
  const generated = path.join(root, "public/img/generated");
  const manifestPath = path.join(root, "app/assets/generated-images.json");
  const integrityPath = path.join(root, "scripts/images.integrity.json");
  const references = new Set();
  for (const directory of ["content/blog", "content/projects"]) {
    for (const entry of (await readdir(path.join(root, directory)))
      .filter((name) => name.endsWith(".md"))
      .sort()) {
      const content = await readFile(path.join(root, directory, entry), "utf8");
      for (const match of content.matchAll(
        /^\s*(?:image|imagePath):\s*["']?(\/img\/[^\r\n"']+?)["']?\s*$/gm,
      ))
        references.add(match[1].trim());
    }
  }
  for (const source of references) {
    let directory = path.join(root, "public/img");
    for (const part of source.slice("/img/".length).split("/")) {
      if (
        !part ||
        part === "." ||
        part === ".." ||
        !(await readdir(directory)).includes(part)
      )
        throw new Error(
          `Image path is missing or has incorrect case: ${source}`,
        );
      directory = path.join(directory, part);
    }
  }
  if (!check) {
    await mkdir(generated, { recursive: true });
    await mkdir(path.dirname(manifestPath), { recursive: true });
    await mkdir(path.dirname(integrityPath), { recursive: true });
  }
  if ((await lstat(generated)).isSymbolicLink())
    throw new Error("Generated image directory must not be a symlink");
  for (const entry of await readdir(generated, { withFileTypes: true })) {
    if (entry.isSymbolicLink())
      throw new Error(
        `Unexpected symlink in generated image directory: ${entry.name}`,
      );
    if (
      entry.isFile() &&
      owned.test(entry.name) &&
      entry.name.endsWith(".tmp")
    ) {
      if (check) throw new Error(`Incomplete image generation: ${entry.name}`);
      await unlink(path.join(generated, entry.name));
    }
  }
  const previous = await readOptional(integrityPath);
  const integrity =
    check && previous
      ? JSON.parse(previous.toString())
      : { recipe, sources: {} };
  if (check && !previous)
    throw new Error("Image integrity receipt is missing; run images:generate");
  if (!isDeepStrictEqual(integrity.recipe, recipe))
    throw new Error("Image recipe changed; run images:generate");
  const manifest = {};
  const expected = new Set();
  for (const source of [...references].sort()) {
    const input = await readFile(path.join(root, "public", source));
    const sourceHash = digest(input);
    const metadata = await sharp(input).metadata();
    const rotated =
      recipe.autoOrient &&
      metadata.orientation >= 5 &&
      metadata.orientation <= 8;
    const width = rotated ? metadata.height : metadata.width;
    const height = rotated ? metadata.width : metadata.height;
    if (!width || !height) throw new Error(`Missing dimensions for ${source}`);
    if (check && integrity.sources[source]?.sha256 !== sourceHash)
      throw new Error(`Image source changed: ${source}; run images:generate`);
    const record = { sha256: sourceHash, outputs: {} };
    const renditions = [];
    const id = digest(
      `${source}\0${sourceHash}\0${JSON.stringify(recipe)}`,
    ).slice(0, 20);
    for (const target of recipe.widths.filter((value) => value <= width)) {
      const name = `${id}-${target}.webp`;
      const output = path.join(generated, name);
      if (check) {
        const bytes = await readOptional(output);
        if (!bytes || digest(bytes) !== integrity.sources[source].outputs[name])
          throw new Error(
            `Image output integrity failed: ${name}; run images:generate`,
          );
        const actual = await sharp(bytes).metadata();
        if (
          actual.format !== recipe.format ||
          actual.width !== target ||
          actual.height !== Math.round((height * target) / width)
        )
          throw new Error(
            `Image dimensions or format differ from recipe: ${name}`,
          );
      } else {
        let image = sharp(input);
        if (recipe.autoOrient) image = image.rotate();
        const bytes = await image
          .resize({
            width: target,
            withoutEnlargement: recipe.withoutEnlargement,
          })
          .webp({ quality: recipe.quality })
          .toBuffer();
        await save(output, bytes);
        record.outputs[name] = digest(bytes);
      }
      expected.add(name);
      renditions.push({ src: `/img/generated/${name}`, width: target });
    }
    manifest[source] = { width, height, renditions };
    if (!check) integrity.sources[source] = record;
  }
  for (const entry of await readdir(generated, { withFileTypes: true })) {
    if (entry.isFile() && owned.test(entry.name) && !expected.has(entry.name)) {
      if (check)
        throw new Error(
          `Stale generated image: ${entry.name}; run images:generate`,
        );
      await unlink(path.join(generated, entry.name));
    }
  }
  if (check) {
    const saved = await readOptional(manifestPath);
    if (!saved || !isDeepStrictEqual(JSON.parse(saved.toString()), manifest))
      throw new Error("Image manifest is out of date; run images:generate");
    if (
      !isDeepStrictEqual(
        Object.keys(integrity.sources).sort(),
        [...references].sort(),
      )
    )
      throw new Error(
        "Image receipt sources are out of date; run images:generate",
      );
  } else {
    await save(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    await save(integrityPath, `${JSON.stringify(integrity, null, 2)}\n`);
  }
  return { images: references.size, renditions: expected.size };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const check = process.argv.includes("--check");
  const result = await generateImages({ check });
  console.log(
    `${check ? "Verified" : "Generated"} ${result.renditions} renditions for ${result.images} images`,
  );
}
