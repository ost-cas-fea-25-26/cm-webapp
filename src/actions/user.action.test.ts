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
import { getUserAction, isCurrentUserAction } from "./user.action";
import { createMockUser } from "@/test-utils/createMockUser";
import { mockAuthServer } from "@/test-utils/mockAuthServer";
import { mockGetUserById } from "@/test-utils/mockUserApi";

describe("User Action Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserAction", () => {
    it("returns current user when no id is provided", async () => {
      const testUser = createMockUser({
        id: "current-user-123",
        username: "currentuser",
      });

      const getUserByIdSpy = mockGetUserById(testUser);
      const { mockGetAuthUser } = mockAuthServer("current-user-123");

      const result = await getUserAction();

      expect(result).toEqual(testUser);
      expect(getUserByIdSpy).toHaveBeenCalledWith("current-user-123");
      expect(mockGetAuthUser).toHaveBeenCalled();
    });
    it("returns current user when id is provided", async () => {
      const testUser = createMockUser({
        id: "user-123",
        username: "specificuser",
      });

      const getUserByIdSpy = mockGetUserById(testUser);

      const result = await getUserAction("user-123");

      expect(result).toEqual(testUser);
      expect(getUserByIdSpy).toHaveBeenCalledWith("user-123");
    });

    it("redirects to login when no auth user identifier", async () => {
      mockAuthServer(undefined);

      await getUserAction();

      expect(redirect).toHaveBeenCalledWith("/login");
    });
  });

  describe("isCurrentUserAction", () => {
    it("returns true when id matches current user", async () => {
      mockAuthServer("user-123");

      const result = await isCurrentUserAction("user-123");

      expect(result).toBe(true);
    });

    it("returns false when id does not match current user", async () => {
      mockAuthServer("user-123");

      const result = await isCurrentUserAction("other-user");

      expect(result).toBe(false);
    });
  });
});
