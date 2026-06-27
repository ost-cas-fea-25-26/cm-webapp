type MockUserOverrides = Partial<{
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  displayName?: string;
  avatarUrl?: string;
}>;

export const createMockUser = (overrides: MockUserOverrides = {}) => ({
  id: "test-user-id",
  username: "testuser",
  firstname: "Test",
  lastname: "User",
  ...overrides,
});
