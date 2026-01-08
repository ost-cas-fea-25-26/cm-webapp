import { test, expect } from "@playwright/test";

test("Timeline shows data after login", async ({ page }) => {
  const mockPosts = [
    { id: 1, text: "Mock Post 1", author: "Testuser", createdAt: Date.now() },
  ];
  await page.route("**/api/posts", async (route, request) => {
    if (request.method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPosts),
      });
    } else if (request.method() === "POST") {
      const postData = await request.postDataJSON();
      const newPost = {
        id: Date.now(),
        ...postData,
        author: "Testuser",
        createdAt: Date.now(),
      };
      mockPosts.unshift(newPost);
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(newPost),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("/");

  const timeline = page.getByTestId("timeline-page");
  await expect(timeline).toBeVisible();

  // check if post creator is visible (todo: improve by checking for test id)
  await expect(page.getByRole("textbox")).toBeVisible();

  // todo: Post erstellen
  // await page.getByRole("textbox", { name: "Your opinion matters!" }).click();
  // await page
  //   .getByRole("textbox", { name: "Your opinion matters!" })
  //   .fill("Neuer Post zum Testen, geht das ächt?");

  // await page.getByRole("button", { name: "Send Send" }).click();
  // const newPost = await page.getByText("Neuer Post zum Testen, geht das ächt?");
  // await expect(newPost).toBeVisible();

  // todo: Logout funktioniert und leitet zur Login Seite weiter

  await page.getByRole("button", { name: "LogOut Log out" }).click();
  await page.getByRole("main").click();
  const welcomeHeading = await page.getByRole("heading", {
    name: "Welcome to Mumble",
  });
  await expect(welcomeHeading).toBeVisible();
});
