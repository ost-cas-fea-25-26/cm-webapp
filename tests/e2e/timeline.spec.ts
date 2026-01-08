import { test, expect } from "@playwright/test";

test("Timeline shows data after login", async ({ page }) => {
  // Wir fangen die Session-Abfrage ab, damit die App denkt, wir seien eingeloggt
  await page.route("**/api/auth/get-session", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        user: { id: "me", username: "E2E-Tester" },
        session: { expiresAt: "2030-01-01T00:00:00.000Z" },
      }),
    });
  });

  // 1. Gehe zur Seite (Die App holt sich die Daten selbst vom Port 4000)
  await page.goto("/");

  const timeline = page.getByTestId("timeline-page");
  await expect(timeline).toBeVisible();

  // 2. Prüfen, ob der Text aus deiner tests/mocks/db.json erscheint
  // Wichtig: Der Text muss EXAKT so in der db.json stehen!
  const mockPost = page.getByText("Dieser Post MUSS erscheinen!");
  await expect(mockPost).toBeVisible();

  // 3. Logout Test
  await page.getByRole("button", { name: "LogOut Log out" }).click();
  const welcomeHeading = page.getByRole("heading", {
    name: "Welcome to Mumble",
  });
  await expect(welcomeHeading).toBeVisible();
});
