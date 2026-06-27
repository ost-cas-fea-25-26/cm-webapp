import { components } from "@/lib/api/api";

export type Post = components["schemas"]["Post"];
export type PagedPosts = components["schemas"]["PostPaginatedResult"];
export type Reply = components["schemas"]["Reply"];
export type PagedReplies = components["schemas"]["ReplyPaginatedResult"];
export type PostQueryParams = {
  limit?: number;
  olderThan?: string;
  creators?: string[];
  likedBy?: string[];
};
