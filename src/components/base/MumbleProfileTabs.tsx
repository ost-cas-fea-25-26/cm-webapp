"use client";

import { TabItem, Tabs } from "@krrli/cm-designsystem";
import PostFeedSection from "../section/PostFeedSection";
import { tv } from "tailwind-variants";
import { useState } from "react";

const mumbleProfileTabsStyles = tv({
  slots: {
    feed: ["pt-4"],
  },
});

export type MumbleProfileTabsProps = {
  userId: string;
};

const MumbleProfileTabs = (props: MumbleProfileTabsProps) => {
  const { feed } = mumbleProfileTabsStyles();
  const [tabIndex, setTabIndex] = useState<string>("1");
  return (
    <Tabs value={tabIndex} onChange={setTabIndex}>
      <TabItem label="My Mumbles" value="1">
        <div className={feed()}>
          <PostFeedSection
            params={{
              creators: [props.userId],
            }}
          ></PostFeedSection>
        </div>
      </TabItem>
      <TabItem label="My Likes" value="2">
        <div className={feed()}>
          <PostFeedSection
            params={{
              likedBy: [props.userId],
            }}
          ></PostFeedSection>
        </div>
      </TabItem>
    </Tabs>
  );
};

export default MumbleProfileTabs;
