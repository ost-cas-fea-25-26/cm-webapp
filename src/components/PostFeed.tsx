"use client";

import { components } from "@/lib/api/api";
import {
  Paragraph,
  Post as PostComponent,
  Repost,
  RoundButton,
} from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { tv } from "tailwind-variants";
import { decodeTime } from "ulid";
import { Post, PostQueryParams } from "../lib/api/posts/post.types";
import { useEffect, useState } from "react";
import { getPostsAction, likePostAction } from "@/actions/post.action";

const postFeedStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
    more: ["flex", "justify-center", "pb-4"],
  },
});

const PostFeed = () => {
  const { base, more } = postFeedStyles();
  const goToProfilePage = () => redirect("/profile");

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const loadPosts = async (params: PostQueryParams = {}) => {
    setLoading(true);
    const mumblePosts = await getPostsAction(params);
    setPosts((prevPosts) => [...prevPosts, ...mumblePosts]);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts({ limit: 10 });
  }, []);

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
          nbrOfComments={0}
          nbrOfLikes={0}
          onAvatarClick={goToProfilePage}
          onCommentClick={() => {}}
          onLikeClick={async () => {
            await likePostAction(post.id ?? "");
          }}
          onShareClick={() => {}}
        ></PostComponent>
      ))}

      {loading ? (
        <Paragraph size="lg">Loading posts...</Paragraph>
      ) : (
        <div className={more()}>
          <RoundButton
            ariaLabel="Load more posts"
            icon={Repost}
            intent="primary"
            onClick={async () => {
              await loadPosts({
                limit: 5,
                olderThan: posts[posts.length - 1]?.id,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostFeed;
