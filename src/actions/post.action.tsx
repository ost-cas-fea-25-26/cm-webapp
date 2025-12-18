"use server";

import { ApiClient } from "@/lib/api/client";
import { PostApi } from "@/lib/api/posts/post.api";
import { Post, PostQueryParams } from "@/lib/api/posts/post.types";

const apiUrl = process.env.MUMBLE_API_URL;
if (!apiUrl) {
  throw new Error("MUMBLE_API_URL is not set");
}

const apiClient = new ApiClient(apiUrl);
const postApiClient = new PostApi(apiClient);

export const getPostsAction = async (
  params: PostQueryParams = {}
): Promise<Post[]> => {
  return (await postApiClient.get(params)).data?.data ?? [];
};

export const getPostByIdAction = async (
  id: string
): Promise<Post | undefined> => {
  const response = await postApiClient.getById(id);

  if (response.hasError) {
    throw new Error(`Failed to fetch post: ${response.error}`);
  }

  return response.data;
};

export const createPostAction = async (
  text: string,
  file?: File | null
): Promise<Post | undefined> => {
  return (await postApiClient.create(text, file)).data;
};

export const likePostAction = async (id: string) => {
  return await postApiClient.like(id);
};

export const unlikePostAction = async (id: string) => {
  return await postApiClient.unlike(id);
};
