import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page, context }) => {
  await page.goto("/");

  const cookies = [
    {
      name: "better-auth.session_token",
      value: "fake-session-123",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax" as const,
    },
    {
      name: "better-auth.session_token",
      value: "fake-session-123",
      domain: "127.0.0.1", // Wichtig für Server-zu-Server Kommunikation
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax" as const,
    },
  ];

  await context.addCookies(cookies);
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
