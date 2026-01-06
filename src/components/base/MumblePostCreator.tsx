"use client";

import { createPostAction } from "@/actions/post.action";
import { Post } from "@/lib/api/posts/post.types";
import { User } from "@/lib/api/users/user.types";
import { PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import MumblePost from "./MumblePost";
import { useState } from "react";
import MumbleLoading from "./MumbleLoading";

export type MumblePostCreatorProps = {
  user: User;
};

const MumblePostCreator = (props: MumblePostCreatorProps) => {
  const profilePageUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/profile/${props.user?.id}`;
  const goToProfilePage = () => redirect(profilePageUrl);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async (text: string, file: File | null) => {
    setLoading(true);
    const response = await createPostAction(text, file);
    if (response) setPosts((prevPosts) => [response, ...prevPosts]);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <MumbleLoading />
      ) : (
        <PostCreator
          src={props.user?.avatarUrl}
          onAvatarClick={goToProfilePage}
          onSendClick={createPost}
        ></PostCreator>
      )}

      {posts.map((post: Post, index: number) => (
        <MumblePost key={index} post={post}></MumblePost>
      ))}
    </>
  );
};

export default MumblePostCreator;
