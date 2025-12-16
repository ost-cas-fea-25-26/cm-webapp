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
      avatarSrc={props.user.avatarUrl ?? ""}
      description={""}
      displayName={props.user.displayName ?? ""}
      imageAlt="Profile banner image"
      imageSrc="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
      joinedTimestamp={new Date()}
      location="Location"
      userName={props.user.username ?? ""}
      isCurrentUser={props.isCurrentUser}
    />
  );
};

export default MumbleProfileBanner;
