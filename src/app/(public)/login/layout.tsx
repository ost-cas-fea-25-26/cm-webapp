import "../../globals.css";
import Navbar from "@/components/Navbar";
import LoginButton from "@/components/LoginButton";
import { tv } from "tailwind-variants";

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
      <Navbar>
        <LoginButton />
      </Navbar>
      <main className={base()}>{children}</main>
    </>
  );
}
