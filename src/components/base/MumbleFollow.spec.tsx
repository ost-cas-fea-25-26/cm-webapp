import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumbleFollow from "./MumbleFollow";
import { followUser } from "@/actions/user.action";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

vi.mock("@/actions/user.action");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("MumbleFollow", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render follow button and trigger followUser action on click", async () => {
    const mockRefresh = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      refresh: mockRefresh,
    } as any);

    vi.mocked(followUser).mockResolvedValue(undefined);

    render(<MumbleFollow userId="user123" displayName="Jane Doe" />);

    expect(
      screen.getByText("You currently do not follow Jane Doe")
    ).toBeInTheDocument();

    const followButton = screen.getByRole("button", { name: /follow/i });
    await userEvent.click(followButton);

    expect(followUser).toHaveBeenCalledWith("user123");
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
