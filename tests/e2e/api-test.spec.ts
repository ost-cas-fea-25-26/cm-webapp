import { test, expect } from "@playwright/test";

test("Timeline zeigt gemockte Posts und erlaubt Logout", async ({ page }) => {
  await page.goto("/");

  // 1. Prüfen, ob der MSW-Post da ist
  await expect(
    page.getByText("Hoi! Das ist ein Mock-Post von MSW")
  ).toBeVisible();

  // 2. Post erstellen 
  // const input = page.getByPlaceholder(/your opinion matters/i);
  // await input.fill("Mein E2E Test");
  // await page.getByRole("button", { name: /send/i }).first().click();

  // 3. Verifizieren (MSW hat den Post intern in 'mockPosts' gespeichert)
  // await expect(page.getByText("Mein E2E Test")).toBeVisible();

  // 4. Logout (Wie bisher)
  await page.getByRole("button", { name: /log out/i }).click();
  await expect(page).toHaveURL(/.*login/);
});
