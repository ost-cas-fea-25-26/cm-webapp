import { components } from "@/lib/api/api";

export type Post = components["schemas"]["Post"];
export type PagedPosts = components["schemas"]["PostPaginatedResult"];
export type PostQueryParams = { limit?: number; olderThan?: string };
