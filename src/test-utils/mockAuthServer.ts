import { vi } from "vitest";
import { AuthServer } from "@/lib/auth/server";

/**
 * Mocks the AuthServer constructor so that
 * new AuthServer().getAuthUser() returns the given identifier.
 *
 * Mock AuthServer instance:
 * - vi.mocked(AuthServer) gets mocked class constructor
 * - .mockImplementation(function (this: any) { ... }) defines what happens wen new AuthServer() is called
 * - must be a function, does not work with arrow function
 * (because usage of "this" - this does not exist on arrow functions)
 * remember: this only exists with new keyword
 * - this.getAuthUser = mockGetAuthUser sets property to new instance
 *
 * ==> redefine what constructor does 🙈🙈🙈
 *
 * @example
 * mockAuthServer("user-123");
 */

export const mockAuthServer = (identifier?: string) => {
  const mockGetAuthUser = vi.fn().mockResolvedValue({ identifier });

  vi.mocked(AuthServer).mockImplementation(function (this: any) {
    this.getAuthUser = mockGetAuthUser;
  } as any);

  return {
    mockGetAuthUser,
  };
};
