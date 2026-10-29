import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createApp, toWebHandler } from "h3";
import { checkContent } from "../scripts/check-content";
import { formatPublicationDate } from "../shared/utils/date";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "lancelance-content-"));
process.chdir(root);
fs.mkdirSync(path.join(root, "content/projects"), { recursive: true });
fs.mkdirSync(path.join(root, "content/blog"), { recursive: true });
fs.mkdirSync(path.join(root, "public/img"), { recursive: true });
fs.writeFileSync(path.join(root, "public/img/Example.jpg"), "fixture");
const project = (name: string, order: string, category = "personal") =>
  fs.writeFileSync(
    path.join(root, `content/projects/${name}.md`),
    `---\ntitle: ${name}\ndescription: Test project\nimage: /img/Example.jpg\norder: ${order}\ncategory: ${category}\n---\nBody\n`,
  );
project("missing", "null");
project("empty", '""');
project("invalid", "nope");
project("numeric", '"4"');
fs.writeFileSync(
  path.join(root, "content/blog/2024-11-14-example.md"),
  "---\ntitle: Example\ndescription: Test\ndate: 2024-11-14\n---\nBody\n",
);
const projects = await import("../server/utils/projects");
const handler = (await import("../server/api/projects/list")).default;
const app = createApp().use(handler);
const request = toWebHandler(app);

test("project parser uses fallback for null, empty and invalid order", () => {
  for (const slug of ["missing", "empty", "invalid"]) {
    assert.equal(projects.getProjectBySlug(slug)?.order, 1000);
    assert.equal(
      projects.getAllProjects().find((p) => p.slug === slug)?.order,
      1000,
    );
  }
  assert.equal(projects.getProjectBySlug("numeric")?.order, 4);
  project("fallback", "1", "unknown");
  assert.equal(projects.getProjectBySlug("fallback")?.category, "personal");
});

test("real h3 handler controls repeated categories and ignores them when grouped", async () => {
  assert.equal(
    (
      await request(
        new Request("http://localhost/?category=work&category=academic"),
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await request(
        new Request(
          "http://localhost/?grouped=true&category=work&category=academic",
        ),
      )
    ).status,
    200,
  );
  assert.equal(
    (await request(new Request("http://localhost/?category=PERSONAL"))).status,
    200,
  );
  assert.deepEqual(
    await (
      await request(new Request("http://localhost/?category=unknown"))
    ).json(),
    [],
  );
  assert.equal(
    (await request(new Request("http://localhost/?category="))).status,
    200,
  );
});

test("calendar date displays consistently across host timezones", () => {
  const initial = process.env.TZ;
  process.env.TZ = "UTC";
  const utc = formatPublicationDate("2024-11-14T00:00:00.000Z");
  process.env.TZ = "America/New_York";
  assert.equal(formatPublicationDate("2024-11-14T00:00:00.000Z"), utc);
  assert.equal(utc, "14 November 2024");
  process.env.TZ = initial;
});

test("content gate rejects invalid metadata, duplicate slugs and wrong-case assets", () => {
  fs.writeFileSync(
    path.join(root, "content/blog/example.md"),
    "---\ntitle: Example\ndescription: Test\ndate: invalid\n---\nBody\n",
  );
  project("wrong-asset", "1");
  const target = path.join(root, "content/projects/wrong-asset.md");
  fs.writeFileSync(
    target,
    fs.readFileSync(target, "utf8").replace("Example.jpg", "example.jpg"),
  );
  const errors = checkContent(root).join("\n");
  assert.match(errors, /duplicate or empty slug/);
  assert.match(errors, /date must be valid/);
  assert.match(errors, /exact case/);
});
