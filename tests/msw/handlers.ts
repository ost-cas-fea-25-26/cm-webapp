import { http, HttpResponse } from "msw";

// In-Memory Speicher: Bleibt bestehen, solange der Server läuft
let mockPosts = [
  { id: "1", text: "Hoi! Das ist ein Mock-Post von MSW", author: "Test-User" },
];

export const handlers = [
  // catch GET Requests to /api/posts
  http.get("**/api/posts", () => {
    return HttpResponse.json(mockPosts);
  }),

  // catch POST Requests to /api/posts
  http.post("**/api/posts", async ({ request }) => {
    const payload = (await request.json()) as any;
    const newPost = {
      id: Date.now().toString(),
      text: payload.text || payload.content,
      author: "E2E-Tester",
    };
    mockPosts = [newPost, ...mockPosts];
    return HttpResponse.json(newPost, { status: 201 });
  }),
];
