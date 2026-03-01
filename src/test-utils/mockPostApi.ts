import { vi } from "vitest";
import { PostApi } from "@/lib/api/posts/post.api";
import { Post } from "@/lib/api/posts/post.types";

export const mockGetPostById = (post: Post) => {
  return vi.spyOn(PostApi.prototype, "getById").mockResolvedValue({
    data: post,
    hasError: false,
  });
};

export const mockGetPosts = (posts: Post[], count?: number) => {
  return vi.spyOn(PostApi.prototype, "get").mockResolvedValue({
    data: { count: count ?? posts.length, data: posts },
    hasError: false,
  });
};

export const mockCreatePost = (post: Post) => {
  return vi.spyOn(PostApi.prototype, "create").mockResolvedValue({
    data: post,
    hasError: false,
  });
};

export const mockLikePost = () => {
  return vi.spyOn(PostApi.prototype, "like").mockResolvedValue({
    data: undefined,
    hasError: false,
  });
};

export const mockUnlikePost = () => {
  return vi.spyOn(PostApi.prototype, "unlike").mockResolvedValue({
    data: undefined,
    hasError: false,
  });
};
