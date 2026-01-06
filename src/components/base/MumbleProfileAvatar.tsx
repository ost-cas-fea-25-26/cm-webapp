"use client";

import { getBaseUrl } from "@/lib/utils/link";
import { Avatar } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";

export type MumbleProfileAvatarProps = {
  userId: string;
  src: string;
};

const MumbleProfileAvatar = (props: MumbleProfileAvatarProps) => {
  const profilePageUrl = `${getBaseUrl()}/profile/${props.userId}`;
  const goToProfile = () => redirect(profilePageUrl);

  return (
    <Avatar
      alt="Avatar image of your account"
      size="sm"
      src={props.src ? props.src : "data:,"}
      onAvatarClick={goToProfile}
    ></Avatar>
  );
};

export default MumbleProfileAvatar;
