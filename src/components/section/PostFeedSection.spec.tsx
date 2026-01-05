import { getPostsAction } from "@/actions/post.action";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { describe, afterEach, vi, it, expect } from "vitest";
import PostFeedSection from "./PostFeedSection";
import { createMockPost } from "@/test-utils/createMockPost";

/**
 * todo: mocks
 * - loadPosts
 * - getPostsAction
 * -
 *
 */

vi.mock("../base/MumbleLoading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("../base/MumblePost", () => ({
  default: () => <div data-testid="post">Post</div>,
}));

vi.mock("@krrli/cm-designsystem", () => ({
  RoundButton: ({ onClick, ariaLabel }: any) => (
    <button data-testid="load-more-button" onClick={onClick}>
      {ariaLabel}
    </button>
  ),
  Repost: () => null,
}));

vi.mock("@/actions/post.action");

const mockPosts = [
  createMockPost({ id: "post-1", text: "First post" }),
  createMockPost({ id: "post-2", text: "Second post" }),
  createMockPost({ id: "post-3", text: "Third post" }),
  createMockPost({ id: "post-4", text: "Fourth post" }),
  createMockPost({ id: "post-5", text: "Fifth post" }),
];

describe("PostFeedSection ", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should load posts on initial render", async () => {
    vi.mocked(getPostsAction).mockImplementation(
      // Promise does not resolve to keep loading state
      () => new Promise(() => {})
    );
    render(<PostFeedSection />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("post")).not.toBeInTheDocument();
    expect(screen.queryByTestId("load-more-button")).not.toBeInTheDocument();
  });

  it("should load posts ", async () => {
    vi.mocked(getPostsAction).mockResolvedValueOnce(mockPosts);
    render(<PostFeedSection />);

    // wait til loading is done
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(5);
    expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
  });
});
