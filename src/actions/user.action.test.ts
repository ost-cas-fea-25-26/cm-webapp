vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("next/server", () => ({
  connection: vi.fn(),
}));
vi.mock("@/lib/auth/server", () => ({
  AuthServer: vi.fn(),
}));

import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getUserAction,
  isCurrentUserAction,
  updateAvatarAction,
  isFollowing,
  followUser,
  unfollowUser,
  updateUserAction,
} from "./user.action";
import { createMockUser } from "@/test-utils/createMockUser";
import { mockAuthServer } from "@/test-utils/mockAuthServer";
import { mockGetUserById } from "@/test-utils/mockUserApi";
import { createMockAvatarFile } from "@/test-utils/createMockFile";
import { UserApi } from "@/lib/api/users/user.api";

describe("User Action Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserAction", () => {
    it("returns current user when no id is provided", async () => {
      const testUser = createMockUser({
        id: "current-testus-userus",
        username: "currentuser",
      });

      const getUserByIdSpy = mockGetUserById(testUser);
      const { mockGetAuthUser } = mockAuthServer("current-testus-userus");

      const result = await getUserAction();

      expect(result).toEqual(testUser);
      expect(getUserByIdSpy).toHaveBeenCalledWith("current-testus-userus");
      expect(mockGetAuthUser).toHaveBeenCalled();
    });
    it("returns current user when id is provided", async () => {
      const testUser = createMockUser({
        id: "testus-userus",
        username: "specificuser",
      });

      const getUserByIdSpy = mockGetUserById(testUser);

      const result = await getUserAction("testus-userus");

      expect(result).toEqual(testUser);
      expect(getUserByIdSpy).toHaveBeenCalledWith("testus-userus");
    });

    it("redirects to login when no auth user identifier", async () => {
      mockAuthServer(undefined);

      await getUserAction();

      expect(redirect).toHaveBeenCalledWith("/login");
    });
  });

  describe("isCurrentUserAction", () => {
    it("returns true when id matches current user", async () => {
      mockAuthServer("testus-userus");

      const result = await isCurrentUserAction("testus-userus");

      expect(result).toBe(true);
    });

    it("returns false when id does not match current user", async () => {
      mockAuthServer("testus-userus");

      const result = await isCurrentUserAction("other-user");

      expect(result).toBe(false);
    });
  });

  describe("updateAvatarAction", () => {
    it("uploads new avatar when file is provided", async () => {
      const mockFile = createMockAvatarFile();
      const updateAvatarSpy = vi
        .spyOn(UserApi.prototype, "updateAvatar")
        .mockResolvedValue({
          data: "https://example.com/avatar.png",
          hasError: false,
        });

      const result = await updateAvatarAction("testus-userus", mockFile);

      expect(result).toBe("https://example.com/avatar.png");
      expect(updateAvatarSpy).toHaveBeenCalledWith("testus-userus", mockFile);
    });

    it("deletes avatar when file is null", async () => {
      const deleteAvatarSpy = vi
        .spyOn(UserApi.prototype, "deleteAvatar")
        .mockResolvedValue({ data: undefined, hasError: false });

      await updateAvatarAction("testus-userus", null);

      expect(deleteAvatarSpy).toHaveBeenCalledWith("testus-userus");
    });
  });

  describe("isFollowing", () => {
    it("returns true when current user follows the stranger", async () => {
      mockAuthServer("current-testus-userus");

      const mockFollowers = {
        count: 2,
        data: [
          createMockUser({ id: "current-testus-userus" }),
          createMockUser({ id: "other-user" }),
        ],
      };

      vi.spyOn(UserApi.prototype, "getFollowers").mockResolvedValue({
        data: mockFollowers,
        hasError: false,
      });

      const result = await isFollowing("stranger-testus-userus");

      expect(result).toBe(true);
    });

    it("returns false when current user does not follow the stranger", async () => {
      mockAuthServer("current-testus-userus");

      const mockFollowers = {
        count: 1,
        data: [createMockUser({ id: "other-user" })],
      };

      vi.spyOn(UserApi.prototype, "getFollowers").mockResolvedValue({
        data: mockFollowers,
        hasError: false,
      });

      const result = await isFollowing("stranger-testus-userus");

      expect(result).toBe(false);
    });

    it("returns false when API returns error", async () => {
      mockAuthServer("current-testus-userus");

      vi.spyOn(UserApi.prototype, "getFollowers").mockResolvedValue({
        data: undefined,
        hasError: true,
        error: "API Error",
      });

      const result = await isFollowing("stranger-testus-userus");

      expect(result).toBe(false);
    });
  });

  describe("followUser", () => {
    it("calls followUser API", async () => {
      const followUserSpy = vi
        .spyOn(UserApi.prototype, "followUser")
        .mockResolvedValue({ data: undefined, hasError: false });

      await followUser("stranger-testus-userus");

      expect(followUserSpy).toHaveBeenCalledWith("stranger-testus-userus");
    });
  });

  describe("unfollowUser", () => {
    it("calls unfollowUser API", async () => {
      const unfollowUserSpy = vi
        .spyOn(UserApi.prototype, "unfollowUser")
        .mockResolvedValue({ data: undefined, hasError: false });

      await unfollowUser("stranger-testus-userus");

      expect(unfollowUserSpy).toHaveBeenCalledWith("stranger-testus-userus");
    });
  });

  describe("updateUserAction", () => {
    it("returns success when user is updated successfully", async () => {
      vi.spyOn(UserApi.prototype, "updateUser").mockResolvedValue({
        data: undefined,
        hasError: false,
      });

      const result = await updateUserAction("testus-userus", {
        username: "newusername",
      });

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("returns error when API returns error", async () => {
      vi.spyOn(UserApi.prototype, "updateUser").mockResolvedValue({
        data: undefined,
        hasError: true,
        error: "Username already taken",
      });

      const result = await updateUserAction("testus-userus", {
        username: "taken",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Username already taken");
    });

    it("returns generic error when API returns error without message", async () => {
      vi.spyOn(UserApi.prototype, "updateUser").mockResolvedValue({
        data: undefined,
        hasError: true,
      });

      const result = await updateUserAction("testus-userus", {
        username: "newusername",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Failed to update user");
    });

    it("returns error when exception is thrown", async () => {
      vi.spyOn(UserApi.prototype, "updateUser").mockRejectedValue(
        new Error("Network error")
      );

      const result = await updateUserAction("testus-userus", {
        username: "newusername",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("An unexpected error occurred");
    });
  });
});
