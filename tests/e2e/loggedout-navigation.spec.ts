import { expect, test } from "@playwright/test";
import { resetCookieConfig } from "../test.utils";

test.describe("Navigation", () => {
  test("should visit home and click login", async ({ browser }) => {
    // reset cookies to ensure logged-out state
    const page = await resetCookieConfig(browser);

    // Visit home page
    await page.goto("/");

    // Check: "mumble" is visible
    await expect(page.getByText(/mumble/i)).toBeVisible();

    // Check: login button exists
    const loginButton = page.getByRole("button", { name: /login/i });
    await expect(loginButton).toBeVisible();

    // Click login button
    await loginButton.click();
  });

  test("should visit home and click login on mobile", async ({ browser }) => {
    // reset cookies to ensure logged-out state
    const page = await resetCookieConfig(browser);

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Visit home page
    await page.goto("/");

    // Check: "mumble" is visible
    await expect(page.getByText(/mumble/i)).toBeVisible();

    // Click burger menu to open navigation
    const burgerMenu = page.getByRole("button", { name: "Open menu" });
    await expect(burgerMenu).toBeVisible();
    await burgerMenu.click();

    // Check: login button exists (now visible after menu open)
    const loginButton = page.getByRole("button", { name: /login/i });
    await expect(loginButton).toBeVisible();

    // Click login button
    await loginButton.click();
  });
});
