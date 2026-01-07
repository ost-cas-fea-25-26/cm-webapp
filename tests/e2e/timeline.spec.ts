import { test, expect } from "@playwright/test";

test("Timeline zeigt Daten nach Login", async ({ page }) => {
  // Du startest direkt hier, ohne Redirect!
  await page.goto("/");

  const timeline = page.getByTestId("timeline-page");
  await expect(timeline).toBeVisible();

  // Prüfen, ob der PostCreator geladen ist
  await expect(page.getByRole("textbox")).toBeVisible();
});
