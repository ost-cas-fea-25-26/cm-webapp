vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
}));

import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "../client";
import { PostApi } from "./post.api";
import { createMockImageFile } from "@/test-utils/createMockFile";
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
    it("returns replies for a post", async () => {
      const mockReplies = {
        count: 2,
        data: [
          createMockPost({
            id: "reply-1",
            text: "Great post!",
          }),
          createMockPost({
            id: "reply-2",
            text: "I totally agree with this.",
          }),
        ],
      };

      const mockResponse = createMockFetchResponse(mockReplies);

      vi.spyOn(apiClient.client, "GET").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.getReplies("test-post-id", { limit: 10 });

      expect(result.hasError).toBe(false);
      expect(result.data).toEqual(mockReplies);
      expect(result.data?.count).toBe(2);
      expect(result.data?.data).toHaveLength(2);
    });
  });

  describe("create Post", () => {
    it("returns freshly created post", async () => {
      const newPost = createMockPost({
        id: "new-post-id",
        text: "This is my brand new post!",
      });

      const mockResponse = createMockFetchResponse(newPost);

      vi.spyOn(apiClient.client, "POST").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.create("This is my brand new post!");

      expect(result.hasError).toBe(false);
      expect(result.data).toEqual(newPost);
      expect(apiClient.client.POST).toHaveBeenCalledWith(
        "/posts",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
          body: expect.any(FormData),
        })
      );
    });

    it("creates post with media file", async () => {
      const newPost = createMockPost({
        id: "new-post-with-media",
        text: "Check out this image!",
        mediaUrl: "https://cdn.mumble.com/images/new-image.jpg",
        mediaType: "image/jpeg",
      });

      const mockResponse = createMockFetchResponse(newPost);

      vi.spyOn(apiClient.client, "POST").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const mockFile = createMockImageFile();

      const result = await postApi.create("Check out this image!", mockFile);

      expect(result.hasError).toBe(false);
      expect(result.data).toEqual(newPost);
    });
  });

  describe("create Reply", () => {
    it("returns freshly created reply", async () => {
      const newReply = createMockPost({
        id: "new-reply-id",
        text: "This is my reply!",
      });

      const mockResponse = createMockFetchResponse(newReply);

      vi.spyOn(apiClient.client, "POST").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.createReply(
        "parent-post-id",
        "This is my reply!"
      );

      expect(result.hasError).toBe(false);
      expect(result.data).toEqual(newReply);
      expect(apiClient.client.POST).toHaveBeenCalledWith(
        "/posts/{id}/replies",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
          params: { path: { id: "parent-post-id" } },
          body: expect.any(FormData),
        })
      );
    });
  });

  describe("like and unlike specific post", () => {
    it("like post", async () => {
      const mockResponse = createMockFetchResponse(undefined);

      vi.spyOn(apiClient.client, "PUT").mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.like("post-to-like");

      expect(result.hasError).toBe(false);
      expect(apiClient.client.PUT).toHaveBeenCalledWith(
        "/posts/{id}/likes",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
          params: { path: { id: "post-to-like" } },
        })
      );
    });

    it("unlike post", async () => {
      const mockResponse = createMockFetchResponse(undefined);

      vi.spyOn(apiClient.client, "DELETE").mockResolvedValue(
        mockResponse as any
      );

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const result = await postApi.unlike("post-to-unlike");

      expect(result.hasError).toBe(false);
      expect(apiClient.client.DELETE).toHaveBeenCalledWith(
        "/posts/{id}/likes",
        expect.objectContaining({
          headers: { Authorization: "Bearer test-token" },
          params: { path: { id: "post-to-unlike" } },
        })
      );
    });
  });
});
