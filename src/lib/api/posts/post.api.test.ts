vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
}));

import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "../client";
import { PostApi } from "./post.api";
import { Post } from "./post.types";

const createMockPost = (overrides = {}): Post => ({
  id: "test-post-id",
  text: "This is a test post",
  ...overrides,
});

const createMockFetchResponse = (data: any, ok = true, status = 200) => ({
  data,
  response: { ok, status } as Response,
});

describe("Post API", () => {
  let apiClient: ApiClient;
  let postApi: PostApi;

  beforeEach(() => {
    apiClient = new ApiClient("https://api.mumble.com");
    postApi = new PostApi(apiClient);
  });

  describe("get Posts", () => {
    it("returns posts on success", async () => {
      const mockPosts = {
        count: 4,
        data: [
          createMockPost({
            id: "post-1",
            text: "First post!",
          }),
          createMockPost({
            id: "post-2",
            text: "Second post with more text",
          }),
          createMockPost({
            id: "post-3",
            text: "Third and final post",
          }),
          createMockPost({
            id: "post-4",
            text: "Post with an image!",
            mediaUrl: "https://cdn.mumble.com/images/cat.jpg",
            mediaType: "image/jpeg",
          }),
        ],
      };

      const mockResponse = createMockFetchResponse(mockPosts);

      vi.spyOn(apiClient.client, "GET").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.get({ limit: 10 });
      expect(result.data).toEqual(mockPosts);
      expect(result.data?.count).toBe(4);
      expect(result.data?.data).toHaveLength(4);
    });
  });

  describe("get Post By Id", () => {
    it("returns post by id on success", async () => {
      const mockPost = createMockPost({
        id: "test-123",
        text: "Hello, this is something very interesting that i'm sure the world needs to hear!",
      });
      const mockResponse = createMockFetchResponse(mockPost);

      vi.spyOn(apiClient.client, "GET").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.getById("test-123");

      expect(result.hasError).toBe(false);
      expect(result.data).toEqual(mockPost);
    });
  });

  describe("get Replies", () => {
    it("returns replies for a post", async () => {});
  });

  describe("create Post", () => {
    it("returns freshly created post", async () => {});
  });

  describe("create Reply", () => {
    it("returns freshly created reply", async () => {});
  });

  describe("like and unlike specific post", () => {
    it("like post", async () => {});
    it("unlike post", async () => {});
  });
});
