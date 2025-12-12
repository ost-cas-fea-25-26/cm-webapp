"use server";

import { ApiClient } from "@/lib/api/client";
import { UserApi } from "@/lib/api/users/user.api";
import { User } from "@/lib/api/users/user.types";
import { AuthServer } from "@/lib/auth/server";

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_MUMBLE_API_URL);
const userApiClient = new UserApi(apiClient);

export const getUserAction = async (): Promise<User | undefined> => {
  const authServer = new AuthServer();
  const authUser = await authServer.getAuthUser();
  if (!authUser?.identifier) {
    throw new Error("Auth user identifier is missing.");
  }
  return (await userApiClient.getById(authUser.identifier)).data;
};
