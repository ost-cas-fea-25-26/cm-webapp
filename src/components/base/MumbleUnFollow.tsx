"use client";

import { unfollowUser } from "@/actions/user.action";
import { Button, Cancel, Label } from "@krrli/cm-designsystem";
import { useRouter } from "next/navigation";
import { tv } from "tailwind-variants";

const mumbleUnFollowStyles = tv({
  slots: {
    base: ["flex", "justify-end", "items-center", "gap-4", "text-slate-400"],
    button: ["w-fit"],
  },
});

export type MumbleUnFollowProps = {
  userId: string;
  displayName: string;
};

const MumbleUnFollow = (props: MumbleUnFollowProps) => {
  const { base, button } = mumbleUnFollowStyles();
  const router = useRouter();

  return (
    <div className={base()}>
      <Label size="md">You follow {props.displayName}</Label>
      <Button
        size="md"
        intent="primary"
        icon={Cancel}
        className={button()}
        onClick={async () => {
          await unfollowUser(props.userId);
          router.refresh();
        }}
      >
        Unfollow
      </Button>
    </div>
  );
};

export default MumbleUnFollow;
