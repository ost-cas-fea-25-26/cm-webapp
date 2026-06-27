import { cleanup, render, screen } from "@testing-library/react";
import { getUserAction } from "@/actions/user.action";
import { afterEach, describe, expect, it, vi } from "vitest";
import NavbarSection from "./NavbarSection";

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
    vi.mocked(getUserAction).mockResolvedValue(undefined);

    render(await NavbarSection());

    // wihtout a user logged in, only logout button is visible (does only make 50% sense, see refactor list)
    expect(screen.queryByTestId("profile-avatar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("settings-button")).not.toBeInTheDocument();

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
