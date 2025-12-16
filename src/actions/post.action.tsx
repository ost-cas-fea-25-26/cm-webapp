"use server";

import { ApiClient } from "@/lib/api/client";
import { PostApi } from "@/lib/api/posts/post.api";
import { Post, PostQueryParams } from "@/lib/api/posts/post.types";

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_MUMBLE_API_URL);
const postApiClient = new PostApi(apiClient);

export const getPostsAction = async (
  params: PostQueryParams = {}
): Promise<Post[]> => {
  return (await postApiClient.get(params)).data?.data ?? [];
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
