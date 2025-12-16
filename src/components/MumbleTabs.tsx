"use client";
import { TabItem, Tabs } from "@krrli/cm-designsystem";
import PostFeed from "./PostFeed";
import { PostQueryParams } from "@/lib/api/posts/post.types";

const MumbleTabs = () => {
  return (
    <Tabs value="2">
      <TabItem label="My Mumbles" value="1">
        <PostFeed
          params={{ creators: ["346664680862801750"] } as PostQueryParams}
        ></PostFeed>
      </TabItem>
      <TabItem label="My Likes" value="2">
        <PostFeed
          params={{ likedBy: ["346664680862801750"] } as PostQueryParams}
        ></PostFeed>
      </TabItem>
    </Tabs>
  );
};

export default MumbleTabs;
