"use client";

import { components } from "@/lib/api/api";
import { Paragraph, Post as PostComponent } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { tv } from "tailwind-variants";
import { decodeTime } from "ulid";
import { Post } from "../lib/api/posts/post.types";
import { useEffect, useState } from "react";
import { getPostsAction, likePostAction } from "@/actions/post.action";

const postFeedStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
  },
});

const PostFeed = () => {
  const { base } = postFeedStyles();
  const goToProfilePage = () => redirect("/profile");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const mumblePosts = await getPostsAction();
      setPosts(mumblePosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (loading) {
    return <Paragraph size="lg">Loading posts...</Paragraph>;
  }

  return (
    <div className={base()}>
      {posts.map((post, index) => (
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
          onLikeClick={async () => {
            await likePostAction(post.id ?? "");
          }}
          onShareClick={() => {}}
        ></PostComponent>
      ))}
    </div>
  );
};

export default PostFeed;
