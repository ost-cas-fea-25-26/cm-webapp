import Loading from "@/components/Loading";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/Navbar";
import ProfileAvatar from "@/components/ProfileAvatar";
import SettingsButton from "@/components/SettingsButton";
import { AuthGuard } from "@/guards/AuthGuard";
import { Suspense } from "react";
import { tv } from "tailwind-variants";

const protectedLayoutStyles = tv({
  slots: {
    base: ["w-full", "max-w-5xl", "mx-auto", "px-4"],
  },
});

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { base } = protectedLayoutStyles();

  return (
    <>
      <Navbar>
        <ProfileAvatar />
        <SettingsButton />
        <LogoutButton />
      </Navbar>
      <Suspense fallback={<Loading />}>
        <AuthGuard>
          <main className={base()}>{children}</main>
        </AuthGuard>
      </Suspense>
    </>
  );
}
