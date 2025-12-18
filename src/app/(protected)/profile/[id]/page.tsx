import { getUserAction, isCurrentUserAction } from "@/actions/user.action";
import MumbleProfileBanner from "@/components/MumbleProfileBanner";
import MumbleTabs from "@/components/MumbleTabs";
import PostFeed from "@/components/PostFeed";
import { tv } from "tailwind-variants";

const profileStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-10", "relative"],
  },
});

type ProfilePageProps = {
  params: { id: string };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const userId = (await params).id;
  const { base } = profileStyles();
  const user = await getUserAction(userId);
  const isCurrentUser = await isCurrentUserAction(userId);
  return (
    <div className={base()}>
      <MumbleProfileBanner
        user={user!}
        isCurrentUser={isCurrentUser}
      ></MumbleProfileBanner>
      {isCurrentUser ? (
        <MumbleTabs userId={userId}></MumbleTabs>
      ) : (
        <PostFeed
          params={{
            creators: [userId],
          }}
        ></PostFeed>
      )}
    </div>
  );
}
