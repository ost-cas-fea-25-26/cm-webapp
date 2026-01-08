import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const BASE_URL = "http://localhost:3000";
const MOCK_API_URL = "http://localhost:4000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "blob" : "html",

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.04,
      animations: "disabled",
    },
  },

  projects: [
    // 1. Auth Setup (Erstellt die user.json)
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    // 2. Tests ohne Login (z.B. Redirect Check)
    {
      name: "logged-out",
      testMatch: /.*\.logged-out\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: { cookies: [], origins: [] },
      },
    },
    // 3. Haupt-Tests (Eingeloggt)
    {
      name: "chromium",
      // Wir ignorieren Setups UND die Logged-out Specs
      testIgnore: [/.*\.setup\.ts/, /.*\.logged-out\.spec\.ts/],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],

  /* Wir starten immer beide Server */
  webServer: [
    {
      name: "mock-api",
      command: `npx json-server tests/mocks/db.json --port 4000`,
      port: 4000,
      reuseExistingServer: !process.env.CI,
    },
    {
      name: "next-app",
      command: `MUMBLE_API_URL=http://127.0.0.1:4000 NEXT_PUBLIC_MUMBLE_API_URL=http://127.0.0.1:4000 npm run dev`,
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
