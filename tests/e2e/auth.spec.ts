import { test, expect } from "@playwright/test";

test("Forward to Zitadel on login", async ({ page }) => {
  // App öffnen, Login suchen und klicken, Wetierleitung zu Zitadel prüfen
  await page.goto("/");
  await expect(page).toHaveURL(/\/login/);

  // Login-Button klicken
  const loginButton = page.getByRole("button", { name: /login/i });
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  await expect(page).toHaveURL(/.*zitadel\.cloud.*/);
});
