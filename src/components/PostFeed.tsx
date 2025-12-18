"use client";

import { getPostsAction } from "@/actions/post.action";
import { Repost, RoundButton } from "@krrli/cm-designsystem";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { Post, PostQueryParams } from "../lib/api/posts/post.types";
import Loading from "./Loading";
import MumblePost from "./MumblePost";

const postFeedStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
    more: ["flex", "justify-center", "pb-4"],
  },
});

export type PostFeedProps = {
  params?: PostQueryParams;
};

const PostFeed = (props: PostFeedProps) => {
  const { base, more } = postFeedStyles();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const loadPosts = async (params: PostQueryParams = {}) => {
    setLoading(true);
    const mumblePosts = await getPostsAction(params);
    setPosts((prevPosts) => [...prevPosts, ...mumblePosts]);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts({ limit: 10, ...props.params });
  }, []);

  return (
    <div className={base()}>
      {posts.map((post, index) => (
        <MumblePost key={index} post={post}></MumblePost>
      ))}

      {loading ? (
        <Loading />
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
                ...props.params,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostFeed;
