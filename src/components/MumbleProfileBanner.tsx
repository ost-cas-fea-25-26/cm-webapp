"use client";

import { updateAvatarAction } from "@/actions/user.action";
import { User } from "@/lib/api/users/user.types";
import { ProfileBanner } from "@krrli/cm-designsystem";

export type MumbleProfileBannerProps = {
  user: User;
  isCurrentUser: boolean;
};

const MumbleProfileBanner = (props: MumbleProfileBannerProps) => {
  return (
    <ProfileBanner
      avatarAlt="Avatar image"
      avatarSrc={props.user.avatarUrl}
      displayName={props.user.displayName}
      imageAlt="Profile banner image"
      joinedTimestamp={new Date()}
      location="Location"
      userName={props.user.username}
      isCurrentUser={props.isCurrentUser}
      onAvatarImageChange={async (file) => {
        await updateAvatarAction(file);
        window.location.reload();
      }}
    />
  );
};

export default MumbleProfileBanner;
