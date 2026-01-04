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

      // Mock AuthServer instance (arrow function property, not on prototype)
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
    it("getUserAction with ID: success", () => {
      /**
       * call getUserAction
       */
    });

    it("getUserAction error", () => {});
  });
});
