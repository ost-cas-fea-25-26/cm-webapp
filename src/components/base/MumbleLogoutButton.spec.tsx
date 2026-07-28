import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumbleLogoutButton from "./MumbleLogoutButton";
import { AuthClient } from "@/lib/auth/client";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/auth/client");

describe("MumbleLogoutButton", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render and trigger logout on click", async () => {
    const mockLogout = vi.fn();

    vi.mocked(AuthClient).mockImplementation(function (this: AuthClient) {
      this.logout = mockLogout;
    } as any);

    render(<MumbleLogoutButton />);

    const button = screen.getByRole("button", { name: /log out/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
