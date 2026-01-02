import { z } from "zod";

/**
 * Zod schema for PublicUser
 * Provides sensible defaults for all nullable fields
 */
export const PublicUserSchema = z.object({
  id: z.string().default(""),
  username: z.string().nullable().default(null),
  displayName: z.string().nullable().default(null),
  avatarUrl: z.string().nullable().default(null),
});

/**
 * Zod schema for User
 * Provides sensible defaults for all nullable fields
 */
export const UserSchema = z.object({
  id: z.string().default(""),
  username: z.string().nullable().default(null),
  displayName: z.string().nullable().default(null),
  avatarUrl: z.string().nullable().default(null),
  firstname: z.string().nullable().default(null),
  lastname: z.string().nullable().default(null),
});

/**
 * Zod schema for Post
 * Provides sensible defaults for all nullable/optional fields
 */
export const PostSchema = z.object({
  id: z.string().default(""),
  creator: PublicUserSchema.optional(),
  text: z.string().nullable().default(null),
  mediaUrl: z.string().nullable().default(null),
  mediaType: z.string().nullable().default(null),
  likes: z.number().default(0),
  likedBySelf: z.boolean().nullable().default(null),
  replies: z.number().default(0),
});

/**
 * Zod schema for Reply
 * Provides sensible defaults for all nullable/optional fields
 */
export const ReplySchema = z.object({
  id: z.string().default(""),
  creator: PublicUserSchema.optional(),
  text: z.string().nullable().default(null),
  mediaUrl: z.string().nullable().default(null),
  mediaType: z.string().nullable().default(null),
  likes: z.number().default(0),
  likedBySelf: z.boolean().nullable().default(null),
  parentId: z.string().default(""),
});

/**
 * Zod schema for paginated Post results
 */
export const PagedPostsSchema = z.object({
  count: z.number().default(0),
  data: z.array(PostSchema).default([]),
  next: z.string().nullable().default(null),
  previous: z.string().nullable().default(null),
});

/**
 * Zod schema for paginated Reply results
 */
export const PagedRepliesSchema = z.object({
  count: z.number().default(0),
  data: z.array(ReplySchema).default([]),
  next: z.string().nullable().default(null),
  previous: z.string().nullable().default(null),
});

/**
 * Zod schema for paginated User results
 */
export const PagedUsersSchema = z.object({
  count: z.number().default(0),
  data: z.array(UserSchema).default([]),
  next: z.string().nullable().default(null),
  previous: z.string().nullable().default(null),
});

// Inferred TypeScript types from Zod schemas
export type PublicUser = z.infer<typeof PublicUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Reply = z.infer<typeof ReplySchema>;
export type PagedPosts = z.infer<typeof PagedPostsSchema>;
export type PagedReplies = z.infer<typeof PagedRepliesSchema>;
export type PagedUsers = z.infer<typeof PagedUsersSchema>;
