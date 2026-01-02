import { getUserAction, isCurrentUserAction } from "@/actions/user.action";
import MumbleLoading from "@/components/base/MumbleLoading";
import MumbleProfileBanner from "@/components/base/MumbleProfileBanner";
import ProfileSection from "@/components/section/ProfileSection";
import { Suspense } from "react";
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

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={base()}>
      <MumbleProfileBanner
        user={user}
        isCurrentUser={isCurrentUser}
      ></MumbleProfileBanner>
      <Suspense fallback={<MumbleLoading />}>
        <ProfileSection
          userId={userId}
          displayName={user.displayName ?? "Unknown"}
        />
      </Suspense>
    </div>
  );
}
