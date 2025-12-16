import { components, paths } from "@/lib/api/api";

export type Post = components["schemas"]["Post"];
export type PagedPosts = components["schemas"]["PostPaginatedResult"];
export type PostQueryParams = {
  limit?: number;
  olderThan?: string;
  creators?: string[];
  likedBy?: string[];
};
