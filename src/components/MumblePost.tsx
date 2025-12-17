"use client";

import { Post as PostComponent } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { decodeTime } from "ulid";
import { Post } from "../lib/api/posts/post.types";
import { likePostAction, unlikePostAction } from "@/actions/post.action";

export type MumbleProps = {
  post: Post;
};

const MumblePost = (props: MumbleProps) => {
  const postDetailPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${props.post.id}`;
  const profilePageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile`;
  const goToProfilePage = () => redirect(profilePageUrl);
  const goToPostDetailPage = () => redirect(postDetailPageUrl);
  const copyLinkToClipboard = () =>
    navigator.clipboard.writeText(postDetailPageUrl);
  const onLikeButtonClick = async () =>
    props.post.likedBySelf
      ? await unlikePostAction(props.post.id!)
      : await likePostAction(props.post.id!);
  const postTimeStamp = props.post.id
    ? new Date(decodeTime(props.post.id))
    : undefined;

  return (
    <PostComponent
      size="md"
      displayName={props.post.creator?.displayName}
      userName={props.post.creator?.username}
      timestamp={postTimeStamp}
      text={props.post.text}
      avatarSrc={props.post.creator?.avatarUrl}
      imageSrc={props.post.mediaUrl}
      nbrOfComments={props.post.replies}
      nbrOfLikes={props.post.likes}
      likedBySelf={props.post.likedBySelf}
      onAvatarClick={goToProfilePage}
      onCommentClick={goToPostDetailPage}
      onLikeClick={onLikeButtonClick}
      onShareClick={copyLinkToClipboard}
    ></PostComponent>
  );
};

export default MumblePost;
