import { createPostAction } from "@/actions/post.action";
import { createMockPost } from "@/test-utils/createMockPost";
import { createMockUser } from "@/test-utils/createMockUser";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MumblePostCreator from "./MumblePostCreator";

vi.mock("@/actions/post.action");
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("MumblePostCreator", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render post creator component", async () => {
    const mockUser = createMockUser({
      id: "user1",
      displayName: "John Doe",
      avatarUrl: "https://example.com/avatar.jpg",
    });

    const mockCreatedPost = createMockPost({
      id: "newpost123",
      text: "New post text",
      creator: mockUser,
    });

    vi.mocked(createPostAction).mockResolvedValue(mockCreatedPost);

    const { container } = render(<MumblePostCreator user={mockUser} />);

    // PostCreator component should render
    expect(container.firstChild).toBeInTheDocument();

    // Verify no loading state initially
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should render with user avatar", async () => {
    const mockUser = createMockUser({
      id: "user1",
      avatarUrl: "https://example.com/avatar.jpg",
    });

    const { container } = render(<MumblePostCreator user={mockUser} />);

    // Component should render with avatar image
    const avatarImg = container.querySelector('img[alt="Profile"]');
    expect(avatarImg).toBeInTheDocument();
  });
});
