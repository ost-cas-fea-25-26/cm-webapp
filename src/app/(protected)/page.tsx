import { getPosts } from "@/actions/post.action";
import PostFeed from "@/components/PostFeed";
import PostPublisher from "@/components/PostPublisher";
import WelcomeSection from "@/components/WelcomeSection";
import { Paragraph } from "@krrli/cm-designsystem";
import { Suspense } from "react";
import { tv } from "tailwind-variants";

const timelineStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-8"],
    timeline: ["flex", "flex-col", "gap-4"],
  },
});

export default async function TimelinePage() {
  const { base, timeline } = timelineStyles();

  return (
    <div className={base()}>
      <WelcomeSection />
      <div className={timeline()}>
        <PostPublisher />
        <Suspense fallback={<Paragraph size="lg">Loading Posts...</Paragraph>}>
          <PostFeed posts={await getPosts()} />
        </Suspense>
      </div>
    </div>
  );
}
