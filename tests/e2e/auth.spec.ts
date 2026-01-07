import { test, expect } from "@playwright/test";

test("Forward to Zitadel on login", async ({ page }) => {
  // Open app, look for login and click, check redirection to Zitadel
  await page.goto("/");
  await expect(page).toHaveURL(/\/login/);

  const loginButton = page.getByRole("button", { name: /login/i });
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  await expect(page).toHaveURL(/.*zitadel\.cloud.*/);
});
