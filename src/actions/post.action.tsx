"use server";

import { ApiClient } from "@/lib/api/client";
import { PostApi } from "@/lib/api/posts/post.api";
import { Post } from "@/lib/api/posts/post.types";

const apiUrl = process.env.MUMBLE_API_URL;
if (!apiUrl) {
  throw new Error("MUMBLE_API_URL is not set");
}

const apiClient = new ApiClient(apiUrl);
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

export const likePostAction = async (id: string) => {
  return await postApiClient.like(id);
};
