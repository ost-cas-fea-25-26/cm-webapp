"use client";

import { publishPost } from "@/actions/actions";
import { PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";

const PostPublisher = () => {
  const goToProfilePage = () => redirect("/profile");

  return (
    <PostCreator
      src={""}
      onAvatarClick={goToProfilePage}
      onSendClick={publishPost}
    ></PostCreator>
  );
};

export default PostPublisher;
