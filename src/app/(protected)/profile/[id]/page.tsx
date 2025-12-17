import { getUserAction, isCurrentUserAction } from "@/actions/user.action";
import MumbleProfileBanner from "@/components/MumbleProfileBanner";
import MumbleTabs from "@/components/MumbleTabs";
import { tv } from "tailwind-variants";

const profileStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-10", "relative"],
    tabs: ["flex", "flex-col", "gap-4"],
  },
});

type ProfilePageProps = {
  params: { id: string };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const userId = (await params).id;
  const { base, tabs } = profileStyles();
  const user = await getUserAction(userId);
  const isCurrentUser = await isCurrentUserAction(userId);
  return (
    <div className={base()}>
      <MumbleProfileBanner
        user={user!}
        isCurrentUser={isCurrentUser}
      ></MumbleProfileBanner>
      <div className={tabs()}>
        <MumbleTabs userId={userId}></MumbleTabs>
      </div>
    </div>
  );
}
