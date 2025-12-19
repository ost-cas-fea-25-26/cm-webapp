"use server";

import { ApiClient } from "@/lib/api/client";
import { UserApi } from "@/lib/api/users/user.api";
import { User } from "@/lib/api/users/user.types";
import { AuthServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";

const apiUrl = process.env.MUMBLE_API_URL;
if (!apiUrl) {
  throw new Error("MUMBLE_API_URL is not set");
}

const apiClient = new ApiClient(apiUrl);
const userApiClient = new UserApi(apiClient);

export const getUserAction = async (id?: string): Promise<User | undefined> => {
  await connection();
  if (id) {
    return (await userApiClient.getById(id)).data;
  }
  const authUser = await new AuthServer().getAuthUser();
  if (!authUser?.identifier) {
    console.warn("Auth user identifier is missing.");
    redirect("/login");
  }
  return (await userApiClient.getById(authUser.identifier)).data;
};

export const isCurrentUserAction = async (id: string): Promise<boolean> => {
  const authUser = await new AuthServer().getAuthUser();
  return authUser?.identifier === id;
};

export const updateAvatarAction = async (
  userId: string,
  file: File | null
): Promise<string | undefined> => {
  if (file) {
    return (await userApiClient.updateAvatar(userId, file)).data;
  }
  await userApiClient.deleteAvatar(userId);
};

export const isFollowing = async (strangerUserId: string): Promise<boolean> => {
  const authServer = new AuthServer();
  const authUser = await authServer.getAuthUser();
  const result = await userApiClient.getFollowers(strangerUserId);
  if (!result.hasError && result.data) {
    var stranger = result.data.data!.find((x) => x.id === authUser?.identifier);
    return !!stranger;
  }

  return false;
};

export const followUser = async (strangerUserId: string): Promise<void> => {
  await userApiClient.followUser(strangerUserId);
};

export const unfollowUser = async (strangerUserId: string): Promise<void> => {
  await userApiClient.unfollowUser(strangerUserId);
};
