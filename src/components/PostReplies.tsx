"use client";

import { getRepliesAction } from "@/actions/post.action";
import { Reply } from "@/lib/api/posts/post.types";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import Loading from "./Loading";
import PostReply from "./PostReply";

const postReplyStyles = tv({
  base: [
    "flex",
    "flex-col",
    "gap-1",
    "[&>*:not(:last-child):not(:hover)]:border-b",
    "[&>*:not(:last-child):not(:hover)]:border-slate-100",
    "[&>*:not(:last-child):not(:hover)]:rounded-b-none",
    "[&>*:not(:first-child):not(:hover)]:rounded-t-none",
    "[&>*:has(+_:hover)]:!border-b-0",
    "[&>*:has(+_:hover)]:rounded-b",
  ],
});

type PostRepliesProps = {
  postId: string;
};

const PostReplies = ({ postId }: PostRepliesProps) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReplies = async () => {
    setLoading(true);
    const fetchedReplies = await getRepliesAction(postId, { limit: 100 });
    setReplies(fetchedReplies);
    setLoading(false);
  };

  useEffect(() => {
    loadReplies();
  }, [postId]);

  if (loading) {
    return <Loading />;
  }

  if (replies.length === 0) {
    return null;
  }

  return (
    <div className={postReplyStyles()}>
      {replies.map((reply) => (
        <PostReply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};

export default PostReplies;
