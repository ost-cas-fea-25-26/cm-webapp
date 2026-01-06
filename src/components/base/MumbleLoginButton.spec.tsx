import { AuthClient } from "@/lib/auth/client";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumbleLoginButton from "./MumbleLoginButton";

vi.mock("@/lib/auth/client", () => ({
  AuthClient: vi.fn(),
}));

describe("Mumble Login Button", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders login button and calls login on click", async () => {
    // Mock login Method
    const mockLogin = vi.fn();

    // AuthClient returns instance with mocked login method
    vi.mocked(AuthClient).mockImplementation(function () {
      return {
        login: mockLogin,
      } as any;
    });

    render(<MumbleLoginButton />);

    // Assert button is rendered
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Click on login button
    await userEvent.click(loginButton);

    // Assert login was called
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
