"use client";

import { Post as PostComponent } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { decodeTime } from "ulid";
import { Post } from "../../lib/api/posts/post.types";
import { likePostAction, unlikePostAction } from "@/actions/post.action";
import { getBaseUrl } from "@/lib/utils/link";

export type MumbleProps = {
  post: Post;
};

const MumblePost = (props: MumbleProps) => {
  const postDetailPageUrl = `${getBaseUrl()}/posts/${props.post.id}`;
  const profilePageUrl = `${getBaseUrl()}/profile/${props.post.creator?.id}`;
  const goToProfilePage = (e: React.MouseEvent) => {
    e.stopPropagation();
    redirect(profilePageUrl);
  };
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
      displayName={props.post.creator?.displayName || ""}
      userName={props.post.creator?.username || ""}
      timestamp={postTimeStamp}
      text={props.post.text || ""}
      avatarSrc={props.post.creator?.avatarUrl || ""}
      avatarAlt={"Avatar of " + props.post.creator?.displayName}
      imageSrc={props.post.mediaUrl || ""}
      nbrOfComments={props.post.replies ?? 0}
      nbrOfLikes={props.post.likes ?? 0}
      likedBySelf={props.post.likedBySelf ?? false}
      onPostClick={goToPostDetailPage}
      onAvatarClick={goToProfilePage}
      onCommentClick={goToPostDetailPage}
      onLikeClick={onLikeButtonClick}
      onShareClick={copyLinkToClipboard}
    ></PostComponent>
  );
};

export default MumblePost;
