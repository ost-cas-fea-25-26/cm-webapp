import { test, expect } from "@playwright/test";

test("Timeline shows data after login", async ({ page }) => {
  await page.goto("/");

  const timeline = page.getByTestId("timeline-page");
  await expect(timeline).toBeVisible();

  // check if post creator is visible (todo: improve by checking for test id)
  await expect(page.getByRole("textbox")).toBeVisible();

  /**
   * todo:
   * - check if post can be created
   * - check if posts are visible in feed
   * - check if logout works (and redirect to login page - is that possible with this setup?)
   */
});
