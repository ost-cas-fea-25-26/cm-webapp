import { tv } from "tailwind-variants";
import PostFeedSection from "./PostFeedSection";
import { isCurrentUserAction, isFollowing } from "@/actions/user.action";
import MumbleFollow from "../base/MumbleFollow";
import MumbleUnFollow from "../base/MumbleUnFollow";
import MumbleProfileTabs from "../base/MumbleProfileTabs";

const profileSectionStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
  },
});

export type ProfileSectionProps = {
  userId: string;
  displayName: string;
};

const ProfileSection = async (props: ProfileSectionProps) => {
  const { base } = profileSectionStyles();
  const following = await isFollowing(props.userId);
  const isCurrentUser = await isCurrentUserAction(props.userId);

  return (
    <>
      {isCurrentUser ? (
        <MumbleProfileTabs userId={props.userId}></MumbleProfileTabs>
      ) : (
        <div className={base()}>
          {following ? (
            <MumbleUnFollow
              userId={props.userId}
              displayName={props.displayName}
            />
          ) : (
            <MumbleFollow
              userId={props.userId}
              displayName={props.displayName}
            />
          )}

          <PostFeedSection
            params={{
              creators: [props.userId],
            }}
          ></PostFeedSection>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
