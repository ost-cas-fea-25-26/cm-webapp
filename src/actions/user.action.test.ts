vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("next/server", () => ({
  connection: vi.fn(),
}));
vi.mock("@/lib/auth/server", () => ({
  AuthServer: vi.fn(),
}));

import { UserApi } from "@/lib/api/users/user.api";
import { AuthServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getUserAction } from "./user.action";

const createMockUser = (overrides = {}) => ({
  id: "test-user-id",
  username: "testuser",
  firstname: "Test",
  lastname: "User",
  ...overrides,
});

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

      // Spy on UserApi prototype method
      vi.spyOn(UserApi.prototype, "getById").mockResolvedValue({
        data: testUser,
        hasError: false,
      });

      /**
       * Mock AuthServer instance:
       * - vi.mocked(AuthServer) gets mocked class constructor
       * - .mockImplementation(function (this: any) { ... }) defines what happens wen new AuthServer() is called
       * - must be a function, does not work with arrow function
       * (because usage of "this" - this does not exist on arrow functions)
       * remember: this only exists with new keyword
       * - this.getAuthUser = mockGetAuthUser sets property to new instance
       *
       * ==> redefine what constructor does 🙈🙈🙈
       */

      const mockGetAuthUser = vi.fn().mockResolvedValue({
        identifier: "current-user-123",
      });

      vi.mocked(AuthServer).mockImplementation(function (this: any) {
        this.getAuthUser = mockGetAuthUser;
      } as any);

      const result = await getUserAction();

      expect(result).toEqual(testUser);
      expect(UserApi.prototype.getById).toHaveBeenCalledWith(
        "current-user-123"
      );
      expect(mockGetAuthUser).toHaveBeenCalled();
    });
    it("returns current user when id is provided", async () => {
      const testUser = createMockUser({
        id: "user-123",
        username: "specificuser",
      });

      vi.spyOn(UserApi.prototype, "getById").mockResolvedValue({
        data: testUser,
        hasError: false,
      });

      const result = await getUserAction("user-123");

      expect(result).toEqual(testUser);
      expect(UserApi.prototype.getById).toHaveBeenCalledWith("user-123");
    });

    it("redirects to login when no auth user identifier", async () => {
      const mockGetAuthUser = vi.fn().mockResolvedValue({
        identifier: undefined,
      });

      vi.mocked(AuthServer).mockImplementation(function (this: any) {
        this.getAuthUser = mockGetAuthUser;
      } as any);

      await getUserAction();

      expect(redirect).toHaveBeenCalledWith("/login");
    });
  });
});
