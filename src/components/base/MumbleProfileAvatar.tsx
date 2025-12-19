"use client";

import { Avatar } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";

export type MumbleProfileAvatarProps = {
  userId: string;
  src: string;
};

const MumbleProfileAvatar = (props: MumbleProfileAvatarProps) => {
  const profilePageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${props.userId}`;
  const goToProfile = () => redirect(profilePageUrl);

  return (
    <Avatar
      alt="Avatar image of your account"
      size="sm"
      src={props.src}
      onAvatarClick={goToProfile}
    ></Avatar>
  );
};

export default MumbleProfileAvatar;
