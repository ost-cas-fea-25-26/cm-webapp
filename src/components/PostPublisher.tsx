"use client";

import { createPostAction } from "@/actions/post.action";
import { PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";

const PostPublisher = () => {
  const goToProfilePage = () => redirect("/profile");

  return (
    <PostCreator
      src={""}
      onAvatarClick={goToProfilePage}
      onSendClick={async (text, file) =>
        await createPostAction(text, file ?? undefined)
      }
    ></PostCreator>
  );
};

export default PostPublisher;
