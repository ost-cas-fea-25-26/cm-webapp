"use client";

import { createPostAction } from "@/actions/post.action";
import { getUserAction } from "@/actions/user.action";
import { User } from "@/lib/api/users/user.types";
import { PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

const PostPublisher = () => {
  const goToProfilePage = () => redirect("/profile");
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const loadUser = async () => {
      const mumbleUser = await getUserAction();
      setUser(mumbleUser);
    };
    loadUser();
  }, []);

  return (
    <PostCreator
      src={user?.avatarUrl ?? ""}
      onAvatarClick={goToProfilePage}
      onSendClick={async (text, file) =>
        await createPostAction(text, file ?? undefined)
      }
    ></PostCreator>
  );
};

export default PostPublisher;
