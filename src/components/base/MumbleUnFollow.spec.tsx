vi.mock("@/actions/user.action");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumbleUnFollow from "./MumbleUnFollow";
import { unfollowUser } from "@/actions/user.action";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

describe("MumbleUnFollow", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render unfollow button and trigger unfollowUser action on click", async () => {
    const mockRefresh = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      refresh: mockRefresh,
    } as any);

    vi.mocked(unfollowUser).mockResolvedValue(undefined);

    render(<MumbleUnFollow userId="user123" displayName="Jane Doe" />);

    expect(screen.getByText("You follow Jane Doe")).toBeInTheDocument();

    const unfollowButton = screen.getByRole("button", { name: /unfollow/i });
    await userEvent.click(unfollowButton);

    expect(unfollowUser).toHaveBeenCalledWith("user123");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
