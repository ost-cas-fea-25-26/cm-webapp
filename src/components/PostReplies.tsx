"use client";

import { getRepliesAction } from "@/actions/post.action";
import { Reply } from "@/lib/api/posts/post.types";
import { useEffect, useState } from "react";
import MumblePost from "./MumblePost";
import Loading from "./Loading";
import { tv } from "tailwind-variants";

const postReplyStyles = tv({
  base: ["flex", "flex-col", "gap-4"],
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
        <MumblePost key={reply.id} post={reply} />
      ))}
    </div>
  );
};

export default PostReplies;
