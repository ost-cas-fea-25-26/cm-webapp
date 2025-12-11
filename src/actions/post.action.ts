"use server";

import { ApiClient } from "@/lib/api/client";
import { PostApi } from "@/lib/api/posts/post.api";
import { Post } from "@/lib/api/posts/post.types";

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_MUMBLE_API_URL ?? "");
const postApiClient = new PostApi(apiClient);

export const getPosts = async (): Promise<Post[]> => {
  return (await postApiClient.get()).data?.data ?? [];
};

export const createPost = async (
  text: string,
  file?: File
): Promise<Post | undefined> => {
  return (await postApiClient.create(text, file)).data;
};
