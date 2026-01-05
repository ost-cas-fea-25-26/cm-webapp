import { Post } from "@/lib/api/posts/post.types";

export const createMockPost = (overrides: Partial<Post> = {}): Post =>
  ({
    id: "test-post-id",
    text: "This is a test post",
    avatar: "test-avatar-url",
    ...overrides,
  }) as Post;
