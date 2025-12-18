"use client";

import { Button, Cancel, Eye, Label } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";
import PostFeed from "./PostFeed";
import { followUser, isFollowing, unfollowUser } from "@/actions/user.action";
import { useEffect, useState } from "react";

const profileStrangerContentStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
    follow: ["flex", "justify-end", "items-center", "gap-4", "text-slate-400"],
    button: ["w-fit"],
  },
});

export type ProfileStrangerContentProps = {
  userId: string;
  displayName: string;
};

const ProfileStrangerContent = (props: ProfileStrangerContentProps) => {
  const { base, follow, button } = profileStrangerContentStyles();
  const [following, setFollowing] = useState<boolean>(false);

  useEffect(() => {
    const checkIsFollowing = async () => {
      setFollowing(await isFollowing(props.userId));
    };
    checkIsFollowing();
  }, []);
  return (
    <div className={base()}>
      {following ? (
        <div className={follow()}>
          <Label size="md">You follow {props.displayName}</Label>
          <Button
            size="md"
            intent="primary"
            icon={Cancel}
            className={button()}
            onClick={async () => await unfollowUser(props.userId)}
          >
            Unfollow
          </Button>
        </div>
      ) : (
        <div className={follow()}>
          <Label size="md">
            You currently do not follow {props.displayName}
          </Label>
          <Button
            size="md"
            intent="primary"
            icon={Eye}
            className={button()}
            onClick={async () => await followUser(props.userId)}
          >
            Follow
          </Button>
        </div>
      )}

      <PostFeed
        params={{
          creators: [props.userId],
        }}
      ></PostFeed>
    </div>
  );
};

export default ProfileStrangerContent;
