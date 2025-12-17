"use client";
import { TabItem, Tabs } from "@krrli/cm-designsystem";
import PostFeed from "./PostFeed";
import { PostQueryParams } from "@/lib/api/posts/post.types";
import { tv } from "tailwind-variants";

const mumbleTabsStyles = tv({
  slots: {
    feed: ["pt-4"],
  },
});

export type MumbleTabsProps = {
  userId: string;
};

const MumbleTabs = (props: MumbleTabsProps) => {
  const { feed } = mumbleTabsStyles();
  return (
    <Tabs value="1">
      <TabItem label="My Mumbles" value="1">
        <div className={feed()}>
          <PostFeed
            params={{ creators: [props.userId] } as PostQueryParams}
          ></PostFeed>
        </div>
      </TabItem>
      <TabItem label="My Likes" value="2">
        <div className={feed()}>
          <PostFeed
            params={{ likedBy: [props.userId] } as PostQueryParams}
          ></PostFeed>
        </div>
      </TabItem>
    </Tabs>
  );
};

export default MumbleTabs;
