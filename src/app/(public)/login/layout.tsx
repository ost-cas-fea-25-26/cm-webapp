import "../../globals.css";
import MumbleNavbar from "@/components/base/MumbleNavbar";
import MumbleLoginButton from "@/components/base/MumbleLoginButton";
import { tv } from "tailwind-variants";
import { getBaseUrl } from "@/lib/utils/link";

const loginLayoutStyles = tv({
  slots: {
    base: ["w-full", "max-w-5xl", "mx-auto", "px-4"],
  },
});

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { base } = loginLayoutStyles();

  return (
    <>
      <MumbleNavbar>
        <MumbleLoginButton />
      </MumbleNavbar>
      {getBaseUrl()}
      <main className={base()}>{children}</main>
    </>
  );
}
