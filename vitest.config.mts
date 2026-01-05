import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".next", "tests/e2e/**"],
    env: {
      ZITADEL_CLIENT_ID: "test-client-id",
      ZITADEL_PROJECT_ID: "test-project-id",
      AUTH_SECRET: "test-auth-secret",
      MUMBLE_API_URL: "http://localhost:8080",
    },
  },
});
