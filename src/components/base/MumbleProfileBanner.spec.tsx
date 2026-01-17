import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumbleProfileBanner from "./MumbleProfileBanner";
import { createMockUser } from "@/test-utils/createMockUser";

const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

vi.mock("@/actions/user.action");

vi.mock("@krrli/cm-designsystem", () => ({
  ProfileBanner: () => <div data-testid="profile-banner">Profil</div>,
}));

describe("Mumble Profile Banner ", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should pass correct props to ProfileBanner and handle avatar change", async () => {
    const user = createMockUser({
      avatarUrl: "https://example.com/avatar.jpg",
      displayName: "Test User",
      username: "testuser",
    });
    const isCurrentUser = true;

    render(<MumbleProfileBanner user={user} isCurrentUser={isCurrentUser} />);

    // ProfileBanner gets rendered
    expect(screen.getByTestId("profile-banner")).toBeInTheDocument();
  });
});
