"use server";

import { getAuthHeaders } from "@/lib/ApiClient";
import { paths } from "@/types/api";
import createClient from "openapi-fetch";

export async function publishPost(text: string, file: File | null) {
  console.log(await getAuthHeaders());
  const apiClient = createClient<paths, "multipart/form-data">({
    baseUrl: process.env.NEXT_PUBLIC_MUMBLE_API_URL,
  });
  const form = new FormData();
  form.append("text", text);
  form.append("media", file ?? "");
  const response = await apiClient.POST("/posts", {
    headers: await getAuthHeaders(),
    body: form as any,
  });
  // console.log(process.env.NEXT_PUBLIC_MUMBLE_API_URL + "/posts", {
  //   method: "POST",
  //   headers: await getAuthHeaders(),
  //   body: form,
  // });
  // const response = await fetch(
  //   process.env.NEXT_PUBLIC_MUMBLE_API_URL + "/posts",
  //   { method: "POST", headers: await getAuthHeaders(), body: form }
  // );
}
