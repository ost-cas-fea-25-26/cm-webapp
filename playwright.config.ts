import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
// load .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? "blob" : "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.04, // 4% - allow for minor font rendering differences
      animations: "disabled",
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup Projekt
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "logged-out",
      testMatch: /.*\.logged-out\.spec\.ts/, // Nur spezielle Dateien scannen
      use: {
        ...devices["Desktop Chrome"],
        storageState: { cookies: [], origins: [] }, // Explizit leerer State
      },
    },
    {
      name: "chromium",

      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      testIgnore: /.*\.setup\.ts/,
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "NEXT_PUBLIC_IS_E2E_TEST=true npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
