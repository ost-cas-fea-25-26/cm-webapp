"use client";

import { Post as PostComponent } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { tv } from "tailwind-variants";
import { decodeTime } from "ulid";
import { Post } from "../lib/api/posts/post.types";

const postFeedStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
  },
});

interface PostFeedProps {
  posts: Post[];
}

const PostFeed = (props: PostFeedProps) => {
  const { base } = postFeedStyles();
  const goToProfilePage = () => redirect("/profile");

  return (
    <div className={base()}>
      {props.posts.map((post, index) => (
        <PostComponent
          key={index}
          size="md"
          displayName={post.creator?.displayName ?? ""}
          userName={post.creator?.username ?? ""}
          timestamp={new Date(decodeTime(post.id ?? ""))}
          text={post.text ?? ""}
          src={post.creator?.avatarUrl ?? ""}
          imageSrc={post.mediaUrl ?? ""}
          imageAlt=""
          onAvatarClick={goToProfilePage}
          onCommentClick={() => {}}
          onLikeClick={() => {}}
          onShareClick={() => {}}
        ></PostComponent>
      ))}
    </div>
  );
};

export default PostFeed;
