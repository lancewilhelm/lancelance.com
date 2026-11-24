import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkContent } from "../scripts/check-content";
import { formatPublicationDate } from "../src/utils/date";
import { tagToSlug } from "../src/utils/tags";

test("calendar date displays consistently across host timezones", () => {
  const initial = process.env.TZ;
  process.env.TZ = "UTC";
  const utc = formatPublicationDate("2024-11-14T00:00:00.000Z");
  process.env.TZ = "America/New_York";
  assert.equal(formatPublicationDate("2024-11-14T00:00:00.000Z"), utc);
  assert.equal(utc, "14 November 2024");
  process.env.TZ = initial;
});

test("tag slug normalization handles spaces and punctuation", () => {
  assert.equal(tagToSlug("Data Science"), "data-science");
  assert.equal(tagToSlug("  Deep Learning! "), "deep-learning");
});

test("content gate rejects duplicate slugs, invalid dates, and wrong-case assets", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "lancelance-content-"));
  try {
    fs.mkdirSync(path.join(root, "src/content/projects"), { recursive: true });
    fs.mkdirSync(path.join(root, "src/content/blog"), { recursive: true });
    fs.mkdirSync(path.join(root, "public/img"), { recursive: true });
    fs.writeFileSync(path.join(root, "public/img/Example.jpg"), "fixture");

    fs.writeFileSync(
      path.join(root, "src/content/blog/index.ts"),
      `export const blogPosts = [
        { slug: "dup", date: "2024-11-14" },
        { slug: "dup", date: "not-a-date" },
      ];\n`,
    );
    fs.writeFileSync(
      path.join(root, "src/content/projects/index.ts"),
      `export const projects = [
        { slug: "wrong-asset", image: "/img/example.jpg" },
      ];\n`,
    );

    const errors = checkContent(root).join("\n");
    assert.match(errors, /duplicate or empty slug/);
    assert.match(errors, /date must be valid/);
    assert.match(errors, /exact case/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
