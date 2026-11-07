import MumbleLoading from "@/components/base/MumbleLoading";
import { AuthGuard } from "@/guards/AuthGuard";
import { Suspense } from "react";
import { tv } from "tailwind-variants";
import NavbarSection from "@/components/section/NavbarSection";
import MumbleNavbar from "@/components/base/MumbleNavbar";

const protectedLayoutStyles = tv({
  slots: {
    base: ["w-full", "max-w-5xl", "mx-auto", "px-4"],
  },
});

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { base } = protectedLayoutStyles();

  return (
    <>
      <Suspense fallback={<MumbleNavbar children={[]} />}>
        <NavbarSection />
      </Suspense>

      <Suspense fallback={<MumbleLoading />}>
        <AuthGuard>
          <main className={base()}>{children}</main>
        </AuthGuard>
      </Suspense>
    </>
  );
}
