vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
}));

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UserApi } from "./user.api";
import { ApiClient } from "../client";

// Test Helpers
const createMockUser = (overrides = {}) => ({
  id: "test-user-id",
  username: "testuser",
  firstname: "Test",
  lastname: "User",
  ...overrides,
});

const createMockFetchResponse = (data: any, ok = true, status = 200) => ({
  data,
  response: { ok, status } as Response,
});

const createMockErrorResponse = (error: string, status = 404) => ({
  data: undefined,
  error,
  response: { ok: false, status } as Response,
});

describe("User API", () => {
  let apiClient: ApiClient;
  let userApi: UserApi;

  beforeEach(() => {
    apiClient = new ApiClient("https://api.mumble.com");
    userApi = new UserApi(apiClient);
  });

  describe("getById", () => {
    it("returns user on success", async () => {
      const mockUser = createMockUser({ id: "test-123" });
      const mockResponse = createMockFetchResponse(mockUser);

      vi.spyOn(apiClient.client, "GET").mockResolvedValue(mockResponse as any);

      const result = await userApi.getById("test-123");

      expect(result.hasError).toBe(false);
      expect(result.data).toEqual(mockUser);
    });

    it("returns error when user not found", async () => {
      const mockResponse = createMockErrorResponse("User not found", 404);

      vi.spyOn(apiClient.client, "GET").mockResolvedValue(mockResponse as any);

      const result = await userApi.getById("nonexistent-id");

      expect(result.hasError).toBe(true);
      expect(result.error).toBe("User not found");
    });
  });

  describe("updateAvatar", () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("uploads avatar and returns URL", async () => {
      const avatarUrl = "https://cdn.mumble.com/avatars/test.png";

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const mockFetch = vi.fn().mockResolvedValue({
        text: async () => avatarUrl,
      });
      vi.stubGlobal("fetch", mockFetch);

      const file = new File(["content"], "avatar.png", { type: "image/png" });
      const result = await userApi.updateAvatar("user-id", file);

      expect(result.hasError).toBe(false);
      expect(result.data).toBe(avatarUrl);
      expect(mockFetch).toHaveBeenCalledOnce();
    });
  });

  describe("updateUser", () => {
    it("updates user with correct body", async () => {
      const mockResponse = createMockFetchResponse(undefined);

      const spy = vi
        .spyOn(apiClient.client, "PATCH")
        .mockResolvedValue(mockResponse as any);

      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token",
      });

      const updateData = {
        username: "new-username",
        firstname: "New",
        lastname: undefined,
      };

      const result = await userApi.updateUser("user-123", updateData);

      expect(spy).toHaveBeenCalledWith("/users", {
        headers: { Authorization: "Bearer test-token" },
        body: updateData,
      });

      expect(result.hasError).toBe(false);
      expect(result.data).toBeUndefined();
    });
  });
});
