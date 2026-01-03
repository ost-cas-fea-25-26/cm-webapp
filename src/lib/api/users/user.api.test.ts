vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
}));

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UserApi } from "./user.api";
import { ApiClient } from "../client";

describe("User API - Get User by ID", () => {
  let apiClient: ApiClient;
  let userApi: UserApi;

  beforeEach(() => {
    apiClient = new ApiClient("https://api.mumble.com");
    userApi = new UserApi(apiClient);
  });

  describe("getById", () => {
    it("success case", async () => {
      const mockUser = {
        id: "iddestestibus",
        username: "herr-test",
        firstname: "Testi",
        lastname: "Testibus",
      };

      const mockResponse = {
        data: mockUser,
        response: { ok: true, status: 200 } as Response,
      };

      const spy = vi
        .spyOn(apiClient.client, "GET")
        .mockResolvedValue(mockResponse as any);
      expect(spy).not.toHaveBeenCalled();

      const res = await userApi.getById("iddestestibus");

      expect(res.hasError).toBe(false);
      expect(spy).toHaveBeenCalledOnce();
      expect(res.data).toEqual(mockUser);
    });

    it("error case", async () => {
      const mockResponse = {
        data: undefined,
        response: { ok: false, status: 404 } as Response,
        error: "User not found",
      };

      const spy = vi
        .spyOn(apiClient.client, "GET")
        .mockResolvedValue(mockResponse as any);
      expect(spy).not.toHaveBeenCalled();

      const res = await userApi.getById("notexistinguserid");

      expect(res.hasError).toBe(true);
      expect(res.error).toBe("User not found");
    });
  });

  describe("updateAvatar", async () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("success case", async () => {
      // Arrange -  Mock getAuthHeaders from apiClient
      vi.spyOn(apiClient, "getAuthHeaders").mockResolvedValue({
        Authorization: "Bearer test-token-used-for-updating-avatar",
      });

      // Arrange - Mock fetch (as it's called directly in updateAvatar)
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: async () => "https://cdn.mumble.com/avatars/userid/avatar.png",
      });
      vi.stubGlobal("fetch", mockFetch);

      // Arrange - Mock file
      const mockedFile = new File(["avatar-content"], "avatar.png", {
        type: "image/png",
      });

      // Act - Call updateAvatar
      const res = await userApi.updateAvatar("userId", mockedFile);

      // Assert
      expect(res.hasError).toBe(false);
      expect(res.data).toBe("https://cdn.mumble.com/avatars/userid/avatar.png");
      expect(mockFetch).toHaveBeenCalledOnce();
    });
  });
});
