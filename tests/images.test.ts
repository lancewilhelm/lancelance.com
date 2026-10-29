import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import images from "../app/assets/generated-images.json";

test("responsive renditions retain the original dimensions and do not upscale", async () => {
  assert.ok(Object.keys(images).length > 0);
  for (const [src, image] of Object.entries(images)) {
    const original = await sharp(path.join("public", src)).metadata();
    const rotated =
      original.orientation &&
      original.orientation >= 5 &&
      original.orientation <= 8;
    assert.equal(image.width, rotated ? original.height : original.width, src);
    assert.equal(image.height, rotated ? original.width : original.height, src);
    assert.deepEqual(
      image.renditions.map((item) => item.width),
      [320, 640, 1280].filter((width) => width <= image.width),
      src,
    );
    for (const rendition of image.renditions) {
      const bytes = await readFile(path.join("public", rendition.src));
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, "webp", rendition.src);
      assert.ok(metadata.width !== undefined, rendition.src);
      assert.equal(metadata.width, rendition.width, rendition.src);
      assert.ok(metadata.width <= image.width, rendition.src);
      assert.ok(
        metadata.height &&
          Math.abs(
            metadata.height - (image.height * rendition.width) / image.width,
          ) <= 1,
        rendition.src,
      );
    }
  }
});
