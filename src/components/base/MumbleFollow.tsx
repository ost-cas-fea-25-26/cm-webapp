"use client";

import { followUser } from "@/actions/user.action";
import { Button, Eye, Label } from "@krrli/cm-designsystem";
import { useRouter } from "next/navigation";
import { tv } from "tailwind-variants";
import MumbleLoading from "./MumbleLoading";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

  return (
    <div className={base()}>
      <Label as="span" size="md">
        You currently do not follow {props.displayName}
      </Label>
      {loading ? (
        <MumbleLoading />
      ) : (
        <Button
          size="md"
          intent="primary"
          icon={Eye}
          className={button()}
          onClick={async () => {
            setLoading(true);
            await followUser(props.userId);
            router.refresh();
          }}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default MumbleFollow;
