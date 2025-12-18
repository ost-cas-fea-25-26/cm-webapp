"use client";

import { createReplyAction } from "@/actions/post.action";
import { ResponseCreator } from "@krrli/cm-designsystem";
import { useState } from "react";

type PostResponseCreatorProps = {
  displayName: string;
  userName: string;
  avatarSrc?: string;
  postId: string;
};

const PostResponseCreator = ({
  displayName,
  userName,
  avatarSrc,
  postId,
}: PostResponseCreatorProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleSendClick = async (text: string, file: File | null) => {
    setIsSubmitting(true);
    try {
      const result = await createReplyAction(postId, text, file ?? undefined);
      console.log("Reply created:", result);
      // TODO: Refresh replies or show success message
    } catch (error) {
      console.error("Failed to create reply:", error);
      alert("Failed to create reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponseCreator
      displayName={displayName}
      userName={userName}
      src={avatarSrc ?? ""}
      onAvatarClick={handleAvatarClick}
      onSendClick={handleSendClick}
    />
  );
};

export default PostResponseCreator;
