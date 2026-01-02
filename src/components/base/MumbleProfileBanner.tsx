"use client";

import { updateAvatarAction } from "@/actions/user.action";
import { User } from "@/lib/api/users/user.types";
import { ProfileBanner } from "@krrli/cm-designsystem";
import { useRouter } from "next/navigation";

export type MumbleProfileBannerProps = {
  user: User;
  isCurrentUser: boolean;
};

const MumbleProfileBanner = (props: MumbleProfileBannerProps) => {
  const router = useRouter();
  return (
    <ProfileBanner
      avatarAlt="Avatar image"
      avatarSrc={props.user.avatarUrl ? props.user.avatarUrl : "data:,"}
      displayName={props.user.displayName}
      imageAlt="Profile banner image"
      joinedTimestamp={new Date()}
      location="Location"
      userName={props.user.username}
      isCurrentUser={props.isCurrentUser}
      onAvatarImageChange={async (file) => {
        await updateAvatarAction(props.user.id, file);
        router.refresh();
      }}
    />
  );
};

export default MumbleProfileBanner;
