import { isCurrentUserAction } from "@/actions/user.action";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, afterEach, vi, it, expect } from "vitest";
import ProfileSection from "./ProfileSection";

vi.mock("@/actions/user.action");

vi.mock("../section/PostFeedSection", () => ({
  default: () => <div data-testid="post-feed-section">Posts</div>,
}));
vi.mock("../base/MumbleFollow", () => ({
  default: () => <div data-testid="mumble-follow">Follow</div>,
}));

vi.mock("../base/MumbleUnFollow", () => ({
  default: () => <div data-testid="mumble-unfollow">Unfollow</div>,
}));

vi.mock("../base/MumbleProfileTabs", () => ({
  default: () => <div data-testid="mumble-profile-tabs">Profile Tabs</div>,
}));

describe("ProfileSection ", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("render profile section for users own profile", async () => {
    vi.mocked(isCurrentUserAction).mockResolvedValueOnce(true);

    render(
      await ProfileSection({
        userId: "blubbsi",
        displayName: "Displayname von Blubbsi",
      })
    );
    expect(screen.queryByTestId("mumble-profile-tabs")).toBeInTheDocument();
    expect(screen.queryByTestId("mumble-follow")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mumble-unfollow")).not.toBeInTheDocument();
  });
});
