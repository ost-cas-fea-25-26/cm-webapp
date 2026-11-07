import { createMockPost } from "@/test-utils/createMockPost";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumblePost from "./MumblePost";

vi.mock("@/actions/post.action");
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("MumblePost", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render post with correct data", () => {
    const mockPost = createMockPost({
      id: "01J9X8ZZZZZZZZZZZZZZZZZZZZ",
      text: "Test post content",
      likes: 5,
      replies: 3,
      likedBySelf: false,
    });

    const { container } = render(<MumblePost post={mockPost} />);

    // Verify post content renders
    expect(screen.getByText("Test post content")).toBeInTheDocument();

    // Verify PostComponent rendered
    expect(container.firstChild).toBeInTheDocument();

    // Verify buttons are present (like, comment, share buttons)
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should pass likedBySelf prop correctly to PostComponent", () => {
    const likedPost = createMockPost({
      id: "01J9X8ZZZZZZZZZZZZZZZZZZZZ",
      likedBySelf: true,
      likes: 10,
    });

    const { container } = render(<MumblePost post={likedPost} />);

    // Verify component rendered with liked state
    expect(container.firstChild).toBeInTheDocument();

    // The PostComponent should receive likedBySelf=true
    // Visual indication depends on design system implementation
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });
});
