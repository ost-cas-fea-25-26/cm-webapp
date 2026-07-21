import { Post, Reply } from "@/lib/api/posts/post.types";

export const createMockPost = (overrides: Partial<Post> = {}): Post =>
  ({
    id: "test-post-id",
    text: "This is a test post",
    avatar: "test-avatar-url",
    ...overrides,
  }) as Post;

export const createMockReply = (overrides: Partial<Reply> = {}): Reply =>
  ({
    id: "reply-post-id",
    parentId: "parent-of-reply-id",
    text: "Das ist eine sehr wuetende Antwort!11!elf",
    creator: {
      id: "reply-creator-id",
      username: "wutbuerger",
    },
    likedBySelf: false,
    likeCount: 0,
    ...overrides,
  }) as Reply;
