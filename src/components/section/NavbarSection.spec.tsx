import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, describe, expect, it, vi } from "vitest";
import NavbarSection from "./NavbarSection";
import { getUserAction } from "@/actions/user.action";

vi.mock("@/actions/user.action");
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("../base/MumbleProfileAvatar", () => ({
  default: () => <div data-testid="profile-avatar">Avatar</div>,
}));

vi.mock("../base/MumbleSettingsButton", () => ({
  default: () => <div data-testid="settings-button">Settings</div>,
}));

vi.mock("../base/MumbleLogoutButton", () => ({
  default: () => <div data-testid="logout-button">Logout</div>,
}));

vi.mock("../base/MumbleNavbar", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="navbar">{children}</nav>
  ),
}));

describe("NavbarSection", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render Navbar with login button when user is not authenticated", async () => {
    /**
     * render NavbarSection without userContext
     * - mock all child components
     * assert logout button is present but avatar/settings are not
     */
    vi.mocked(getUserAction).mockResolvedValue(undefined);

    render(await NavbarSection());
    // Avatar and Settings should not be visible
    expect(screen.queryByTestId("profile-avatar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-button")).not.toBeInTheDocument();

    // Logout Button should be present (TODO: refactor - should be conditional)
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });
  it("should render Navbar with user avatar, settings button and logout button when user is authenticated", async () => {
    vi.mocked(getUserAction).mockResolvedValue({
      id: "user123",
      username: "testuser",
      firstname: "Test",
      lastname: "User",
      avatarUrl: "https://example.com/avatar.jpg",
    });

    render(await NavbarSection());

    // All elements should be visible when authenticated
    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });
});
