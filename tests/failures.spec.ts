import { test, expect, type Page } from "@playwright/test";

async function ready(page: Page) {
  await page.waitForFunction(() => {
    const root = document.querySelector("#__nuxt");
    return root && "__vue_app__" in root;
  });
}

for (const project of ["retroboard", "horizon-extended"]) {
  test(`repository link survives an upstream outage for ${project}`, async ({
    page,
  }) => {
    await page.goto(`/projects/${project}`);
    await ready(page);
    await expect(
      page.getByText("Repository details are temporarily unavailable."),
    ).toBeVisible();
    await expect(
      page.locator('main a[href^="https://github.com/lancewilhelm/"]').last(),
    ).toBeVisible();
  });
}

test("blog error is distinct from an empty tag and can be retried", async ({
  page,
}) => {
  await page.goto("/");
  await ready(page);
  await page.route("**/api/blog/list", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: '{"statusCode":503,"statusMessage":"Simulated content outage"}',
    }),
  );
  await page.getByRole("link", { name: "Blog", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Unable to load blog posts.",
  );
  await expect(page.getByText("No blog posts match this tag.")).toHaveCount(0);
  await page.unroute("**/api/blog/list");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(page.locator("a.blog-card")).toHaveCount(6);
});

test("project error keeps its server status and real missing pages return 404", async ({
  page,
  request,
}) => {
  await page.goto("/projects");
  await ready(page);
  await page.route("**/api/projects/retroboard", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: '{"statusCode":503,"statusMessage":"Simulated content outage"}',
    }),
  );
  await page.locator('a[href="/projects/retroboard"]').click();
  await expect(
    page.getByRole("heading", { name: "503", exact: true }),
  ).toBeVisible();
  expect((await request.get("/projects/no-such-project")).status()).toBe(404);
});
