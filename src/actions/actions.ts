"use server";

import { apiClient, getAuthHeaders } from "@/lib/ApiClient";

export async function publishPost(text: string, file: File | null) {
  console.log(await getAuthHeaders());
  const response = await apiClient.POST("/posts", {
    headers: await getAuthHeaders(),
    body: { text: text, media: await file?.text() },
  });
  console.log(response, await file?.text());
}
