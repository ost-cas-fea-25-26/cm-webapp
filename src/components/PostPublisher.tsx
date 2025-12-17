"use client";

import { createPostAction, likePostAction } from "@/actions/post.action";
import { getUserAction } from "@/actions/user.action";
import { Post } from "@/lib/api/posts/post.types";
import { User } from "@/lib/api/users/user.types";
import { Paragraph, PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Post as PostComponent } from "@krrli/cm-designsystem";
import { decodeTime } from "ulid";
import MumblePost from "./MumblePost";
import Loading from "./Loading";

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
    const response = await createPostAction(text, file);
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
          src={user?.avatarUrl}
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
