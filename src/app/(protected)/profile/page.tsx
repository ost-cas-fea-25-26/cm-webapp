import { getUserAction } from "@/actions/user.action";
import MumbleProfileBanner from "@/components/MumbleProfileBanner";
import MumbleTabs from "@/components/MumbleTabs";
import { tv } from "tailwind-variants";

const profileStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-10", "relative"],
    tabs: ["flex", "flex-col", "gap-4"],
  },
});

export default async function ProfilePage() {
  const { base, tabs } = profileStyles();
  const user = await getUserAction();
  return (
    <div className={base()}>
      <MumbleProfileBanner
        user={user!}
        isCurrentUser={false}
      ></MumbleProfileBanner>

      <div className={tabs()}>
        <MumbleTabs></MumbleTabs>
      </div>
    </div>
  );
}
