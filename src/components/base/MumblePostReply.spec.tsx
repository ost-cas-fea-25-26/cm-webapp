vi.mock("@/actions/post.action");
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumblePostReply from "./MumblePostReply";

describe("Test Post Replies", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  /**
   * - copyLinkToClipboard testen
   * - onLikeButtonClick testen
   * - onReplyButtonClick testen
   */

  it("should render reply with correct data", () => {
    const mockReply = {
      id: "01JGGZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z",
      parentId: "01JGGZ4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y",
      text: "This ist eine Aaaantwort",
      likes: 3,
      likedBySelf: false,
      creator: {
        id: "ein-user",
        displayName: "Frau Test",
        username: "frau.test",
        avatarUrl: "https://example.com/avatar.jpg",
      },
      mediaUrl: null,
    };
    const { container } = render(<MumblePostReply reply={mockReply} />);
    expect(screen.getByText("This ist eine Aaaantwort")).toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });
});
