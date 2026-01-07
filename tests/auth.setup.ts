import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // 1. Gehe zur Login-Seite deiner App
  await page.goto("/login");

  // 2. Klicke auf Login (leitet zu Zitadel weiter)
  await page.getByRole("button", { name: /login/i }).click();

  await page.waitForURL(/.*zitadel.*/, { timeout: 15000 });
  console.log("🌐 Zitadel Login-Seite erreicht.");

  if (!process.env.PLAYWRIGHT_TEST_USER_EMAIL) {
    throw new Error(
      "❌ PLAYWRIGHT_TEST_USER_EMAIL ist nicht definiert. Check deine .env Datei!"
    );
  }
  if (!process.env.PLAYWRIGHT_TEST_USER_PASSWORD) {
    throw new Error(
      "❌ PLAYWRIGHT_TEST_USER_PASSWORD ist nicht definiert. Check deine .env Datei!"
    );
  }

  // 3. Jetzt bist du auf der Zitadel-Seite
  // Hier musst du die echten Felder von Zitadel ausfüllen

  const usernameField = page.locator('input[id*="loginName"]');
  await usernameField.fill(process.env.PLAYWRIGHT_TEST_USER_EMAIL!);

  // await page
  //   .locator('input[name="username"]')
  //   .fill(process.env.PLAYWRIGHT_TEST_USER_EMAIL || "");

  // const passwordField = page.locator(
  //   'input[type="password"], input[name="password"], input[name="Password"]'
  // );

  // await passwordField.waitFor({ state: "visible", timeout: 10000 });
  // await page
  //   .locator('input[name="Passwort"]')
  //   .fill(process.env.PLAYWRIGHT_TEST_USER_PASSWORD || "");
  const nextButton = page.locator("#submit-button");
  // Warten bis der Button klickbar ist (Zitadel validiert oft kurz)
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

  // 2. Ausfüllen
  // await page.getByTestId("password-text-input");
  const passwordField = page.locator("#password");

  console.log("⏳ Warte auf Passwort-Feld...");
  await passwordField.waitFor({ state: "visible", timeout: 10000 });

  // 3. Passwort ausfüllen und absenden
  await passwordField.fill(process.env.PLAYWRIGHT_TEST_USER_PASSWORD || "");
  console.log("✅ Passwort eingegeben.");

  // 3. Absenden (Enter ist oft sicherer als nach dem Button-Text zu suchen)
  await page.keyboard.press("Enter");

  // 4. Warten, bis wir zurück auf unserer App sind (Timeline)
  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(page.getByTestId("timeline-page")).toBeVisible();

  // 5. Den kompletten State speichern!
  await page.context().storageState({ path: authFile });
});
