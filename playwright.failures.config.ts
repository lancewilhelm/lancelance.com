import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/failures.spec.ts",
  workers: 1,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 30_000 },
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3131",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
  },
  webServer: {
    command:
      "node --import ./tests/fixtures/fetch-failures.mjs node_modules/nuxt/bin/nuxt.mjs dev --host 127.0.0.1 --port 3131",
    port: 3131,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
