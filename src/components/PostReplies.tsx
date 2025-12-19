"use client";

import { getRepliesAction } from "@/actions/post.action";
import { Reply } from "@/lib/api/posts/post.types";
import { Response } from "@krrli/cm-designsystem";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { decodeTime } from "ulid";
import Loading from "./Loading";

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

  const getTimestamp = (id: string | undefined) => {
    return id ? new Date(decodeTime(id)) : undefined;
  };

  return (
    <div className={postReplyStyles()}>
      {replies.map((reply) => (
        // <MumblePost key={reply.id} post={reply} />
        <Response
          key={reply.id}
          avatarSrc={reply.creator?.avatarUrl ?? ""}
          displayName={reply.creator?.displayName ?? "Anonymous"}
          nbrOfComments={0}
          nbrOfLikes={0}
          onAvatarClick={() => {
            console.log("Avatar clicked");
          }}
          onCommentClick={() => {
            console.log("Comment clicked");
          }}
          onLikeClick={() => {
            console.log("Like clicked");
          }}
          onShareClick={() => {
            console.log("Share clicked");
          }}
          text={reply.text}
          timestamp={getTimestamp(reply.id)}
          userName={reply.creator?.username ?? "anonymous"}
        />
      ))}
    </div>
  );
};

export default PostReplies;
