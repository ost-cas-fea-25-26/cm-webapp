"use client";

import { createPostAction } from "@/actions/post.action";
import { getUserAction } from "@/actions/user.action";
import { Post } from "@/lib/api/posts/post.types";
import { User } from "@/lib/api/users/user.types";
import { PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import MumblePost from "./MumblePost";

const PostPublisher = () => {
  const goToProfilePage = () => redirect("/profile");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadUser = async () => {
    const mumbleUser = await getUserAction();
    setUser(mumbleUser);
  };

  const createPost = async (text: string, file: File | null) => {
    setLoading(true);
    const response = await createPostAction(text, file ?? undefined);
    if (response) {
      setPosts((prevPosts) => [response, ...prevPosts]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PostCreator
          src={user?.avatarUrl ?? undefined}
          onAvatarClick={goToProfilePage}
          onSendClick={async (text, file) => await createPost(text, file)}
        ></PostCreator>
      )}

      {posts.map((post, index) => (
        <MumblePost key={index} post={post}></MumblePost>
      ))}
    </>
  );
};

export default PostPublisher;
