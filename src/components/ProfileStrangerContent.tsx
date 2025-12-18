"use client";

import { Button, Cancel, Eye, Label } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";
import PostFeed from "./PostFeed";

const profileStrangerContentStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-4"],
    follow: ["flex", "justify-end", "items-center", "gap-4", "text-slate-400"],
    button: ["w-fit"],
  },
});

export type ProfileStrangerContentProps = {
  userId: string;
  isFollowing: boolean;
  displayName: string;
};

const ProfileStrangerContent = (props: ProfileStrangerContentProps) => {
  const { base, follow, button } = profileStrangerContentStyles();
  return (
    <div className={base()}>
      {props.isFollowing ? (
        <div className={follow()}>
          <Label size="md">You follow {props.displayName}</Label>
          <Button size="md" intent="primary" icon={Cancel} className={button()}>
            Unfollow
          </Button>
        </div>
      ) : (
        <div className={follow()}>
          <Label size="md">
            You currently do not follow {props.displayName}
          </Label>
          <Button size="md" intent="primary" icon={Eye} className={button()}>
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
