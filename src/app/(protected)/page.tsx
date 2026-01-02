import { getUserAction } from "@/actions/user.action";
import MumblePostCreator from "@/components/base/MumblePostCreator";
import PostFeedSection from "@/components/section/PostFeedSection";
import WelcomeSection from "@/components/section/WelcomeSection";
import { tv } from "tailwind-variants";

const timelineStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-8"],
    timeline: ["flex", "flex-col", "gap-4"],
  },
});

export default async function TimelinePage() {
  const { base, timeline } = timelineStyles();
  const mumbleUser = await getUserAction();

  return (
    <div className={base()}>
      <WelcomeSection />
      <div className={timeline()}>
        {mumbleUser && (
          <MumblePostCreator user={mumbleUser}></MumblePostCreator>
        )}
        <PostFeedSection />
      </div>
    </div>
  );
}
