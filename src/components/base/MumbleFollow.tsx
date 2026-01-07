"use client";

import { followUser } from "@/actions/user.action";
import { Button, Eye, Label } from "@krrli/cm-designsystem";
import { useRouter } from "next/navigation";
import { tv } from "tailwind-variants";

const mumbleFollowStyles = tv({
  slots: {
    base: ["flex", "justify-end", "items-center", "gap-4", "text-slate-400"],
    button: ["w-fit"],
  },
});

export type MumbleFollowProps = {
  userId: string;
  displayName: string;
};

const MumbleFollow = (props: MumbleFollowProps) => {
  const { base, button } = mumbleFollowStyles();
  const router = useRouter();

  return (
    <div className={base()}>
      <Label as="span" size="md">
        You currently do not follow {props.displayName}
      </Label>
      <Button
        size="md"
        intent="primary"
        icon={Eye}
        className={button()}
        onClick={async () => {
          await followUser(props.userId);
          router.refresh();
        }}
      >
        Follow
      </Button>
    </div>
  );
};

export default MumbleFollow;
