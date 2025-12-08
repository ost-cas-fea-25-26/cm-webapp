"use client";
import WelcomeSection from "@/components/WelcomeSection";
import { apiClient } from "@/lib/ApiClient";
import { getAuthUser } from "@/lib/AuthClient";
import { Post, PostCreator } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { tv } from "tailwind-variants";
import { decodeTime } from "ulid";

const timelineStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-8"],
    timeline: ["flex", "flex-col", "gap-4"],
  },
});

const posts = (await apiClient.GET("/posts", {})).data?.data ?? [];

export default async function Timeline() {
  const { base, timeline } = timelineStyles();
  const goToProfilePage = () => redirect("/profile");

  return (
    <div className={base()}>
      <WelcomeSection />
      <div className={timeline()}>
        <PostCreator
          src={""}
          onAvatarClick={goToProfilePage}
          onSendClick={() => {}}
        ></PostCreator>

        {posts.map((post) => (
          <Post
            size="md"
            displayName={post.creator?.displayName ?? ""}
            userName={post.creator?.username ?? ""}
            timestamp={new Date(decodeTime(post.id ?? ""))}
            text={post.text ?? ""}
            src={post.creator?.avatarUrl ?? ""}
            onAvatarClick={goToProfilePage}
            onCommentClick={() => {}}
            onLikeClick={() => {}}
            onShareClick={() => {}}
          ></Post>
        ))}
      </div>
    </div>
  );
}
