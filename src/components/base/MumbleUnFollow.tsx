"use client";

import { unfollowUser } from "@/actions/user.action";
import { Button, Cancel, Label } from "@krrli/cm-designsystem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tv } from "tailwind-variants";
import MumbleLoading from "./MumbleLoading";

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
  const [loading, setLoading] = useState(false);

  return (
    <div className={base()}>
      <Label as="span" size="md">
        You follow {props.displayName}
      </Label>
      {loading ? (
        <MumbleLoading />
      ) : (
        <Button
          size="md"
          intent="primary"
          icon={Cancel}
          className={button()}
          onClick={async () => {
            setLoading(true);
            await unfollowUser(props.userId);
            router.refresh();
          }}
        >
          Unfollow
        </Button>
      )}
    </div>
  );
};

export default MumbleUnFollow;
