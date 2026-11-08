import { describe, expect, it } from "vitest";
import type { ApiResponse } from "./client.types";

describe("ApiResponse Type", () => {
  it("should create success response object", () => {
    const response: ApiResponse<string> = {
      hasError: false,
      data: "test data",
    };

    expect(response.hasError).toBe(false);
    expect(response.data).toBe("test data");
  });

  it("should create error response object", () => {
    const response: ApiResponse<string> = {
      hasError: true,
      error: "Something went wrong",
    };

    expect(response.hasError).toBe(true);
    expect(response.error).toBe("Something went wrong");
  });
});
