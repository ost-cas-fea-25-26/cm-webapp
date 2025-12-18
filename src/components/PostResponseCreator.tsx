"use client";

import { ResponseCreator } from "@krrli/cm-designsystem";

type PostResponseCreatorProps = {
  displayName: string;
  userName: string;
  avatarSrc?: string;
};

const PostResponseCreator = ({
  displayName,
  userName,
  avatarSrc,
}: PostResponseCreatorProps) => {
  const handleAvatarClick = () => {
    console.log("Avatar clicked");
  };

  const handleSendClick = () => {
    console.log("Send clicked");
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
