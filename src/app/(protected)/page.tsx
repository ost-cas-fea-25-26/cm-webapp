import PostFeed from "@/components/PostFeed";
import PostPublisher from "@/components/PostPublisher";
import WelcomeSection from "@/components/WelcomeSection";
import { apiClient } from "@/lib/ApiClient";
import { tv } from "tailwind-variants";

const timelineStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-8"],
    timeline: ["flex", "flex-col", "gap-4"],
  },
});

const posts = (await apiClient.GET("/posts", {})).data?.data ?? [];

export default async function TimelinePage() {
  const { base, timeline } = timelineStyles();

  return (
    <div className={base()}>
      <WelcomeSection />
      <div className={timeline()}>
        <PostPublisher />
        <PostFeed posts={posts} />
      </div>
    </div>
  );
}
