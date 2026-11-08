import { vi } from "vitest";
import { UserApi } from "@/lib/api/users/user.api";

export const mockGetUserById = (user: any) => {
  return vi.spyOn(UserApi.prototype, "getById").mockResolvedValue({
    data: user,
    hasError: false,
  });
};
