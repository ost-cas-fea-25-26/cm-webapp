"use server";

import { ApiClient } from "@/lib/api/client";
import { PostApi } from "@/lib/api/posts/post.api";
import { Post } from "@/lib/api/posts/post.types";

const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_MUMBLE_API_URL ?? "http://localhost:3000"
);
const postApiClient = new PostApi(apiClient);

export const getPostsAction = async (): Promise<Post[]> => {
  return (await postApiClient.get()).data?.data ?? [];
};

export const createPostAction = async (
  text: string,
  file?: File
): Promise<Post | undefined> => {
  return (await postApiClient.create(text, file)).data;
};
