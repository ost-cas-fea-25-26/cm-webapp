"use server";

import { ApiClient } from "@/lib/api/client";
import { UserApi } from "@/lib/api/users/user.api";
import { User } from "@/lib/api/users/user.types";
import { AuthServer } from "@/lib/auth/server";

const apiUrl = process.env.MUMBLE_API_URL;
if (!apiUrl) {
  throw new Error("MUMBLE_API_URL is not set");
}

const apiClient = new ApiClient(apiUrl);
const userApiClient = new UserApi(apiClient);

export const getUserAction = async (): Promise<User | undefined> => {
  const authServer = new AuthServer();
  const authUser = await authServer.getAuthUser();
  if (!authUser?.identifier) {
    throw new Error("Auth user identifier is missing.");
  }
  return (await userApiClient.getById(authUser.identifier)).data;
};
