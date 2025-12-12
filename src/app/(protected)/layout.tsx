import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/Navbar";
import ProfileAvatar from "@/components/ProfileAvatar";
import SettingsButton from "@/components/SettingsButton";
import { AuthGuard } from "@/guards/AuthGuard";
import { Paragraph } from "@krrli/cm-designsystem";
import { Suspense } from "react";
import { tv } from "tailwind-variants";

const protectedLayoutStyles = tv({
  slots: {
    base: ["w-170"],
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
      <Suspense fallback={<Paragraph size="lg">Loading...</Paragraph>}>
        <AuthGuard>
          <main className={base()}>{children}</main>
        </AuthGuard>
      </Suspense>
    </>
  );
}
