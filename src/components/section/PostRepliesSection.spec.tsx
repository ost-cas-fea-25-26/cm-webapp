import { getRepliesAction } from "@/actions/post.action";
import { createMockReply } from "@/test-utils/createMockPost";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PostRepliesSection from "./PostRepliesSection";

vi.mock("../base/MumblePostReply", () => ({
  default: () => <div data-testid="post-reply"></div>,
}));

vi.mock("../base/MumbleLoading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("@/actions/post.action");

const mockReplies = [
  createMockReply({
    parentId: "parent-post",
    text: "Das ist eine sehr wuetende Antwort!11!elf",
    creator: {
      id: "reply-creator-id",
      username: "wutbuerger",
    },
  }),
  createMockReply({
    parentId: "parent-post",
    text: "Easy bleiben, Leute",
    creator: {
      id: "reply-creator-id",
      username: "gutmensch",
    },
  }),
  createMockReply({
    parentId: "parent-post",
    text: "Kolleg, chill dini Base.",
    creator: {
      id: "reply-creator-id",
      username: "normale-person",
    },
  }),
];

describe("PostRepliesSection ", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render loading state", async () => {
    vi.mocked(getRepliesAction).mockImplementation(
      // Promise does not resolve to keep loading state
      () => new Promise(() => {})
    );

    render(<PostRepliesSection postId={"abcdef"} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should render post replies", async () => {
    vi.mocked(getRepliesAction).mockResolvedValueOnce(mockReplies);
    render(<PostRepliesSection postId="parent-post" />);

    // wait til loading is done
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
    const posts = screen.getAllByTestId("post-reply");
    expect(posts).toHaveLength(3);
  });

  it("should return null if post has no reply", async () => {
    vi.mocked(getRepliesAction).mockResolvedValueOnce([]);
    render(<PostRepliesSection postId="blubb" />);

    // wait til loading is done
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });
    const posts = screen.queryAllByTestId("post-reply");
    expect(posts).toHaveLength(0);
  });
});
