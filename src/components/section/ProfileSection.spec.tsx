import { isCurrentUserAction, isFollowing } from "@/actions/user.action";
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

  it("render profile section for users own profile (profile tabs visible, no follow/unfollow button)", async () => {
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
    expect(screen.queryByTestId("post-feed-section")).not.toBeInTheDocument();
  });

  it("render profile section for another profile (profile tabs not visible, follow but no unfollow button)", async () => {
    vi.mocked(isCurrentUserAction).mockResolvedValueOnce(false);
    vi.mocked(isFollowing).mockResolvedValueOnce(false);

    render(
      await ProfileSection({
        userId: "blubbsi",
        displayName: "Displayname von Blubbsi",
      })
    );
    expect(screen.queryByTestId("mumble-profile-tabs")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mumble-follow")).toBeInTheDocument();
    expect(screen.queryByTestId("mumble-unfollow")).not.toBeInTheDocument();
    expect(screen.queryByTestId("post-feed-section")).toBeInTheDocument();
  });

  it("render profile section for another profile (profile tabs not visible, no follow but unfollow button)", async () => {
    vi.mocked(isCurrentUserAction).mockResolvedValueOnce(false);
    vi.mocked(isFollowing).mockResolvedValueOnce(true);

    render(
      await ProfileSection({
        userId: "blubbsi",
        displayName: "Displayname von Blubbsi",
      })
    );
    expect(screen.queryByTestId("mumble-profile-tabs")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mumble-follow")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mumble-unfollow")).toBeInTheDocument();
    expect(screen.queryByTestId("post-feed-section")).toBeInTheDocument();
  });

  it("crashes gracefully if isCurrentUserAction throws", async () => {
    vi.mocked(isCurrentUserAction).mockRejectedValueOnce(new Error("fail"));
    vi.mocked(isFollowing).mockResolvedValueOnce(false);

    await expect(
      ProfileSection({
        userId: "blubbsi",
        displayName: "Displayname von Blubbsi",
      })
    ).rejects.toThrow("fail");
  });
});
