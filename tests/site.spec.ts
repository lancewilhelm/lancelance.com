import fs from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";

async function openPage(page: Page, url: string) {
  const response = await page.goto(url);
  await page.waitForFunction(() => {
    const root = document.querySelector("#__nuxt");
    return root && "__vue_app__" in root;
  });
  return response;
}

const documents = [
  "/",
  "/blog",
  "/projects",
  "/about",
  ...["blog", "projects"].flatMap((collection) =>
    fs
      .readdirSync(`content/${collection}`)
      .filter((file) => file.endsWith(".md"))
      .map(
        (file) =>
          `/${collection}/${file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "")}`,
      ),
  ),
];

test("all pages have current metadata, landmarks, image alternatives, and working images", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  for (const route of documents) {
    const response = await openPage(page, route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/lancelance\.com(?:\/|$)/,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      /^https:\/\/lancelance\.com(?:\/|$)/,
    );
    if (route.startsWith("/projects/"))
      await expect(page.locator("h1")).toHaveCount(1);
    for (const image of await page.locator("img").all()) {
      await expect(image).toHaveAttribute("alt");
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(
          () =>
            image.evaluate(
              (element) =>
                element instanceof HTMLImageElement &&
                element.complete &&
                element.naturalWidth > 0,
            ),
          { message: `${route}: image loads` },
        )
        .toBe(true);
    }
  }
  expect(pageErrors).toEqual([]);
});

test("tag filtering and reset preserve all six posts", async ({ page }) => {
  await openPage(page, "/blog");
  await expect(page.locator("a.blog-card")).toHaveCount(6);
  await page
    .getByRole("link", { name: "Data Science (1)", exact: true })
    .click();
  await expect(page.locator("a.blog-card")).toHaveCount(1);
  await page.getByRole("link", { name: "All (6)", exact: true }).click();
  await expect(page.locator("a.blog-card")).toHaveCount(6);
});

test("theme picker is keyboard operable, modal, persistent, and returns focus", async ({
  page,
}) => {
  await openPage(page, "/");
  const opener = page.getByRole("button", {
    name: "Choose theme",
    exact: true,
  });
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Choose theme" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button")).toHaveCount(177);
  const dracula = dialog.getByRole("button", { name: "dracula", exact: true });
  await dracula.focus();
  await page.keyboard.press("Enter");
  await expect(dracula).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await page.reload();
  await expect(page.locator("#currentTheme")).toHaveCount(1);
  await expect(page.locator("#currentTheme")).toHaveAttribute(
    "href",
    "/css/themes/dracula.css",
  );
  expect(
    await page.evaluate(() => getComputedStyle(document.body).backgroundColor),
  ).toBe("rgb(40, 42, 54)");
});

for (const saved of [
  "{broken",
  "null",
  "[]",
  '{"theme":"missing"}',
  '{"theme":"../../invalid"}',
]) {
  test(`invalid saved preference recovers: ${saved}`, async ({ page }) => {
    await page.addInitScript(
      (value) => localStorage.setItem("config", value),
      saved,
    );
    await openPage(page, "/");
    await expect(page.locator("#currentTheme")).toHaveCount(1);
    await expect(page.locator("#currentTheme")).toHaveAttribute(
      "href",
      "/css/themes/paper.css",
    );
    await page
      .getByRole("button", { name: "Choose theme", exact: true })
      .click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "dracula", exact: true })
      .click();
    expect(await page.evaluate(() => localStorage.getItem("config"))).toContain(
      '"theme":"dracula"',
    );
  });
}

test("denied storage does not prevent theme selection", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Denied", "SecurityError");
      },
    });
  });
  await openPage(page, "/");
  await expect(page.locator("#currentTheme")).toHaveAttribute(
    "href",
    "/css/themes/paper.css",
  );
  await page.getByRole("button", { name: "Choose theme", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "dracula", exact: true })
    .click();
  await expect(page.locator("#currentTheme")).toHaveAttribute(
    "href",
    "/css/themes/dracula.css",
  );
});

test("image zoom closes and returns focus through repeated keyboard use", async ({
  page,
}) => {
  await openPage(page, "/projects/retroboard");
  const opener = page.getByRole("button", { name: /^Enlarge image:/ }).first();
  for (let cycle = 0; cycle < 3; cycle++) {
    await opener.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "Enlarged image" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog")).toHaveCount(0);
    await expect(opener).toBeFocused();
  }
});

test("code and heading links can be copied by keyboard", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await openPage(page, "/blog/vue-chatbot1");
  const copy = page.getByRole("button", { name: "copy", exact: true }).first();
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "copied!", exact: true }).first(),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "npm create vue@latest\n",
  );
  const heading = page
    .getByRole("button", { name: "Copy link to heading" })
    .first();
  await heading.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Link copied", exact: true }).first(),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "#what-is-vuejs",
  );
});

test("responsive images use generated assets and keep originals available for zoom", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await openPage(page, "/projects/retroboard");
  const thumbnail = page.locator("main img").first();
  await thumbnail.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      thumbnail.evaluate((image) =>
        image instanceof HTMLImageElement ? image.currentSrc : "",
      ),
    )
    .toContain("/img/generated/");
  await page
    .getByRole("button", { name: /^Enlarge image:/ })
    .first()
    .click();
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
    "src",
    "/img/retroboard/IMG_0982_crop.jpg",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    375,
  );
});

test("publication dates agree across browser timezones", async ({
  browser,
}) => {
  for (const timezoneId of ["UTC", "America/New_York"]) {
    const context = await browser.newContext({
      timezoneId,
      baseURL: "http://127.0.0.1:3130",
    });
    const page = await context.newPage();
    await openPage(page, "/blog/rag-bot");
    await expect(page.locator("main .italic.pb-2")).toHaveText(
      "14 November 2024",
    );
    await context.close();
  }
});

test("sitemap and real not-found response are generated", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://lancelance.com/blog/rag-bot");
  expect((await request.get("/not-an-existing-page")).status()).toBe(404);
  expect(fs.existsSync(path.join("dist", "robots.txt"))).toBe(true);
});

for (const collection of ["blog", "projects"]) {
  test(`a failed static ${collection} payload can recover without a deployed API`, async ({
    page,
  }) => {
    const payload = `**/${collection}/_payload.json*`;
    await page.route(payload, (route) => route.abort());
    await openPage(page, "/");
    await page
      .getByRole("link", {
        name: collection === "blog" ? "Blog" : "Projects",
        exact: true,
      })
      .click();
    await expect(page.getByRole("alert")).toContainText(
      collection === "blog"
        ? "Unable to load blog posts."
        : "Unable to load projects.",
    );
    await page.unroute(payload);
    await page.getByRole("button", { name: "Try again", exact: true }).click();
    await expect(page.locator("a.blog-card")).toHaveCount(6);
  });
}

test("theme works before Nuxt starts and falls back without JavaScript", async ({
  page,
  browser,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("config", '{"theme":"dracula"}'),
  );
  await page.route("**/_nuxt/*.js", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("#currentTheme")).toHaveCount(1);
  await expect
    .poll(() =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor),
    )
    .toBe("rgb(40, 42, 54)");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await context.newPage();
  await fallback.goto("http://127.0.0.1:3130/");
  expect(
    await fallback.locator('link[href="/css/themes/paper.css"]').count(),
  ).toBe(1);
  await context.close();
});

test("clipboard denial is reported instead of success", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () =>
        Promise.reject(new DOMException("Denied", "NotAllowedError")),
    }),
  );
  await openPage(page, "/blog/vue-chatbot1");
  await page.getByRole("button", { name: "copy", exact: true }).first().click();
  await expect(
    page.getByRole("button", { name: "copy failed", exact: true }).first(),
  ).toBeVisible();
});

for (const [collection, slug, title] of [
  ["blog", "rag-bot", "Simple RAG-Based AI Chatbot"],
  ["projects", "retroboard", "Retroboard"],
]) {
  test(`an interrupted ${collection} detail payload is retryable rather than missing`, async ({
    page,
  }) => {
    const payload = `**/${collection}/${slug}/_payload.json*`;
    await page.route(payload, (route) => route.abort());
    await openPage(page, `/${collection}`);
    await page.locator(`a[href="/${collection}/${slug}"]`).click();
    await expect(page.getByText("503", { exact: true })).toBeVisible();
    await page.unroute(payload);
    await page.getByRole("button", { name: "Try again", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: title, exact: true, level: 1 }),
    ).toBeVisible();
  });
}

test("Paper secondary text meets normal-text contrast", async ({ page }) => {
  await openPage(page, "/blog/rag-bot");
  const colors = await page
    .locator("main .italic.pb-2")
    .evaluate((element) => ({
      foreground: getComputedStyle(element).color,
      background: getComputedStyle(document.body).backgroundColor,
    }));
  const luminance = (color: string) => {
    const channels = color.match(/\d+/g);
    if (!channels || channels.length !== 3)
      throw new Error(`Expected RGB color: ${color}`);
    return channels
      .map((value) => {
        const channel = Number(value) / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      })
      .reduce(
        (sum, channel, index) =>
          sum + channel * ([0.2126, 0.7152, 0.0722][index] || 0),
        0,
      );
  };
  const foreground = luminance(colors.foreground);
  const background = luminance(colors.background);
  expect(
    (Math.max(foreground, background) + 0.05) /
      (Math.min(foreground, background) + 0.05),
  ).toBeGreaterThanOrEqual(4.5);
});
