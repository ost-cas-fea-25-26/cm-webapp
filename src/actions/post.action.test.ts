import { PostApi } from "@/lib/api/posts/post.api";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPostByIdAction,
  getPostsAction,
  getRepliesAction,
  createPostAction,
  createReplyAction,
  likePostAction,
  unlikePostAction,
} from "./post.action";
import { createMockPost } from "@/test-utils/createMockPost";
import {
  mockGetPostById,
  mockGetPosts,
  mockCreatePost,
  mockLikePost,
  mockUnlikePost,
} from "@/test-utils/mockPostApi";
import { createMockImageFile } from "@/test-utils/createMockFile";

describe("Post Action Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPostById", () => {
    it("throws error when post not found", async () => {
      // Mock the PostApi getById method to return an error
      vi.spyOn(PostApi.prototype, "getById").mockResolvedValue({
        data: undefined,
        hasError: true,
        error: "Post not found",
      });

      await expect(getPostByIdAction("invalid-id")).rejects.toThrow(
        "Failed to fetch post: Post not found"
      );
    });
    it("returns Post when found", async () => {
      const mockPost = createMockPost({ id: "valid-id" });
      mockGetPostById(mockPost);

      const result = await getPostByIdAction("valid-id");
      expect(result).toEqual(mockPost);
    });
  });

  describe("getPostsAction", () => {
    it("returns array of posts", async () => {
      const mockPosts = [
        createMockPost({ id: "post-1", text: "First post" }),
        createMockPost({ id: "post-2", text: "Second post" }),
      ];

      mockGetPosts(mockPosts);

      const result = await getPostsAction({ limit: 10 });

      expect(result).toEqual(mockPosts);
    });

    it("returns empty array when no posts", async () => {
      mockGetPosts([]);

      const result = await getPostsAction();

      expect(result).toEqual([]);
    });
  });

  describe("getRepliesAction", () => {
    it("returns array of replies for a post", async () => {
      const mockReplies = [
        createMockPost({ id: "reply-1", text: "Great post!" }),
        createMockPost({ id: "reply-2", text: "I agree!" }),
      ];

      vi.spyOn(PostApi.prototype, "getReplies").mockResolvedValue({
        data: { count: 2, data: mockReplies },
        hasError: false,
      });

      const result = await getRepliesAction("post-id", { limit: 10 });

      expect(result).toEqual(mockReplies);
    });
  });

  describe("createPostAction", () => {
    it("creates post without file", async () => {
      const newPost = createMockPost({
        id: "new-post",
        text: "My new post!",
      });

      mockCreatePost(newPost);

      const result = await createPostAction("My new post!");

      expect(result).toEqual(newPost);
    });

    it("creates post with image file", async () => {
      const newPost = createMockPost({
        id: "new-post-with-image",
        text: "Check this out!",
        mediaUrl: "https://example.com/image.jpg",
        mediaType: "image/jpeg",
      });

      mockCreatePost(newPost);

      const mockFile = createMockImageFile();
      const result = await createPostAction("Check this out!", mockFile);

      expect(result).toEqual(newPost);
    });
  });

  describe("createReplyAction", () => {
    it("creates reply to a post", async () => {
      const newReply = createMockPost({
        id: "new-reply",
        text: "This is my reply!",
      });

      vi.spyOn(PostApi.prototype, "createReply").mockResolvedValue({
        data: newReply,
        hasError: false,
      });

      const result = await createReplyAction(
        "parent-post-id",
        "This is my reply!"
      );

      expect(result).toEqual(newReply);
    });
  });

  describe("likePostAction", () => {
    it("likes a post", async () => {
      const mockResponse = mockLikePost();

      const result = await likePostAction("post-to-like");

      expect(result.hasError).toBe(false);
      expect(mockResponse).toHaveBeenCalledWith("post-to-like");
    });
  });

  describe("unlikePostAction", () => {
    it("unlikes a post", async () => {
      const mockResponse = mockUnlikePost();

      const result = await unlikePostAction("post-to-unlike");

      expect(result.hasError).toBe(false);
      expect(mockResponse).toHaveBeenCalledWith("post-to-unlike");
    });
  });
});
