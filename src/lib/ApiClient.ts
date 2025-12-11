import { paths } from "@/types/api";
import createClient from "openapi-fetch";
import { authServer, getAccessToken } from "./AuthServer";

export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_MUMBLE_API_URL,
});

export const getAuthHeaders = async (): Promise<{
  Authorization: string;
}> => {
  const result = await getAccessToken();
  console.log(result);
  const headers = { Authorization: "" };

  if (result?.accessToken) {
    headers.Authorization = `Bearer ${result.accessToken}`;
  }

  return headers;
};
