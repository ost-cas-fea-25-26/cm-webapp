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

const MumbleTabs = () => {
  const { feed } = mumbleTabsStyles();
  return (
    <Tabs value="2">
      <TabItem label="My Mumbles" value="1">
        <div className={feed()}>
          <PostFeed
            params={{ creators: ["346664680862801750"] } as PostQueryParams}
          ></PostFeed>
        </div>
      </TabItem>
      <TabItem label="My Likes" value="2">
        <div className={feed()}>
          <PostFeed
            params={{ likedBy: ["346664680862801750"] } as PostQueryParams}
          ></PostFeed>
        </div>
      </TabItem>
    </Tabs>
  );
};

export default MumbleTabs;
