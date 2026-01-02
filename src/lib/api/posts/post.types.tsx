export type { Post, PagedPosts, Reply, PagedReplies } from "../schemas";
export {
  PostSchema,
  PagedPostsSchema,
  ReplySchema,
  PagedRepliesSchema,
} from "../schemas";

export type PostQueryParams = {
  limit?: number;
  olderThan?: string;
  creators?: string[];
  likedBy?: string[];
};
