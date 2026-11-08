import type { FetchResponse } from "openapi-fetch";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "./client";

describe("ApiClient - handleResponse", () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient("https://api.mumble.com");
  });

  it("success case", () => {
    const mockResponse: FetchResponse<any, any, any> = {
      data: {
        id: "abc123",
        name: "A handleResponse Request that is VERY successful",
      },
      response: { ok: true, status: 200 } as Response,
    } as FetchResponse<any, any, any>;

    const result = apiClient.handleResponse(mockResponse);

    expect(result.hasError).toBe(false);
    expect(result.data).toEqual({
      id: "abc123",
      name: "A handleResponse Request that is VERY successful",
    });
  });

  it("error with message", () => {
    const mockResponse: FetchResponse<any, any, any> = {
      data: undefined,
      error: "Not Found",
      response: { ok: false, status: 404 } as Response,
    } as FetchResponse<any, any, any>;

    const result = apiClient.handleResponse(mockResponse);

    expect(result.hasError).toBe(true);
    expect(result.error).toBe("Not Found");
  });

  it("error without message - HTTP fallback", () => {
    const mockResponse: FetchResponse<any, any, any> = {
      data: undefined,
      error: undefined, //
      response: { ok: false, status: 500 } as Response,
    } as FetchResponse<any, any, any>;

    const result = apiClient.handleResponse(mockResponse);

    expect(result.hasError).toBe(true);
    expect(result.error).toBe("HTTP Response Status: 500");
  });
});

describe("ApiClient - getAuthHeaders", () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient("https://api.mumble.com");
  });

  it("success case - token exists", async () => {
    const mockedAccessToken: {
      accessToken: string;
      accessTokenExpiresAt: Date | undefined;
      scopes: string[];
      idToken: string | undefined;
    } | null = {
      accessToken: "test-token-123",
      accessTokenExpiresAt: undefined,
      scopes: [],
      idToken: undefined,
    };
    const spy = vi
      .spyOn(apiClient["authServer"], "getAccessToken")
      .mockResolvedValue(mockedAccessToken);
    expect(spy).not.toHaveBeenCalled();

    const result = await apiClient.getAuthHeaders();
    expect(result).toEqual({ Authorization: "Bearer test-token-123" });
  });

  it("failure case - no token", async () => {
    const mockedAccessToken: {
      accessToken: string;
      accessTokenExpiresAt: Date | undefined;
      scopes: string[];
      idToken: string | undefined;
    } | null = null;
    const spy = vi
      .spyOn(apiClient["authServer"], "getAccessToken")
      .mockResolvedValue(mockedAccessToken);
    expect(spy).not.toHaveBeenCalled();

    const result = await apiClient.getAuthHeaders();
    expect(result).toEqual({});
  });
});
