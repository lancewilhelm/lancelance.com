import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { generateImages } from "../scripts/generate-images.mjs";

test("image checks reject source, output, recipe, and manifest changes", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "lancelance-images-"));
  try {
    for (const dir of ["content/blog", "content/projects", "public/img"])
      await fs.mkdir(path.join(root, dir), { recursive: true });
    const source = path.join(root, "public/img/example.png");
    await sharp({
      create: { width: 400, height: 200, channels: 3, background: "#993355" },
    })
      .png()
      .toFile(source);
    await fs.writeFile(
      path.join(root, "content/blog/example.md"),
      "imagePath: /img/example.png\n",
    );
    await generateImages({ root });
    await generateImages({ root, check: true });
    const manifestPath = path.join(root, "app/assets/generated-images.json");
    const readManifest = async () =>
      JSON.parse(await fs.readFile(manifestPath, "utf8"));
    const original = await readManifest();
    const first = original["/img/example.png"].renditions[0].src;
    await fs.writeFile(path.join(root, "public", first), "altered output");
    await assert.rejects(
      generateImages({ root, check: true }),
      /integrity failed/,
    );
    await generateImages({ root });
    const receiptPath = path.join(root, "scripts/images.integrity.json");
    const receipt = JSON.parse(await fs.readFile(receiptPath, "utf8"));
    receipt.recipe.quality = 84;
    await fs.writeFile(receiptPath, JSON.stringify(receipt));
    await assert.rejects(
      generateImages({ root, check: true }),
      /recipe changed/,
    );
    await generateImages({ root });
    for (const key of ["generator", "sharp"]) {
      const changedRecipe = JSON.parse(await fs.readFile(receiptPath, "utf8"));
      changedRecipe.recipe[key] = "stale";
      await fs.writeFile(receiptPath, JSON.stringify(changedRecipe));
      await assert.rejects(
        generateImages({ root, check: true }),
        /recipe changed/,
      );
      await generateImages({ root });
    }
    const changed = await readManifest();
    changed["/img/example.png"].width = 1;
    await fs.writeFile(manifestPath, JSON.stringify(changed));
    await assert.rejects(
      generateImages({ root, check: true }),
      /manifest is out of date/,
    );
    await generateImages({ root });
    await sharp({
      create: { width: 400, height: 200, channels: 3, background: "#335599" },
    })
      .png()
      .toFile(source);
    await assert.rejects(
      generateImages({ root, check: true }),
      /source changed/,
    );
    await generateImages({ root });
    await generateImages({ root, check: true });
    assert.notEqual(
      (await readManifest())["/img/example.png"].renditions[0].src,
      first,
    );
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
