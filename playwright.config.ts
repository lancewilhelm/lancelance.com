import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/site.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3130",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], timezoneId: "America/New_York" },
    },
  ],
  webServer: {
    command: "node scripts/serve-static.mjs",
    port: 3130,
    reuseExistingServer: false,
  },
});
