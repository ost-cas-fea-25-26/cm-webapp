"use client";

import { likePostAction, unlikePostAction } from "@/actions/post.action";
import { Reply } from "@/lib/api/posts/post.types";
import { Response } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { decodeTime } from "ulid";

type PostReplyProps = {
  reply: Reply;
};

const PostReply = ({ reply }: PostReplyProps) => {
  console.log("Rendering reply:", reply);

  const replyDetailPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${reply.parentId}#reply-${reply.id}`;
  const profilePageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${reply.creator?.id}`;
  const goToProfilePage = () => redirect(profilePageUrl);

  const goToReplyDetailPage = () => {
    redirect(replyDetailPageUrl);
  };
  const copyLinkToClipboard = () =>
    navigator.clipboard.writeText(replyDetailPageUrl);

  // todo: can reply be liekd?
  const onLikeButtonClick = async () =>
    reply.likedBySelf
      ? await unlikePostAction(reply.id!)
      : await likePostAction(reply.id!);

  const replyTimeStamp = reply.id ? new Date(decodeTime(reply.id)) : undefined;

  return (
    <Response
      key={reply.id}
      avatarSrc={reply.creator?.avatarUrl ?? ""}
      displayName={reply.creator?.displayName ?? "Anonymous"}
      nbrOfComments={0}
      nbrOfLikes={reply.likes}
      likedBySelf={reply.likedBySelf}
      onAvatarClick={goToProfilePage}
      onCommentClick={goToReplyDetailPage}
      onLikeClick={onLikeButtonClick}
      onShareClick={copyLinkToClipboard}
      text={reply.text}
      timestamp={replyTimeStamp}
      userName={reply.creator?.username ?? "anonymous"}
    />
  );
};

export default PostReply;
