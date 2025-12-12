import { AuthGuard } from "@/guards/AuthGuard";
import "./globals.css";
import type { Metadata } from "next";
import { tv } from "tailwind-variants";
import Navbar from "@/components/Navbar";
import { AuthServer } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Mumble App",
  description: "So cool mumbling app",
};

const rootLayoutStyles = tv({
  slots: {
    base: ["min-h-screen", "bg-slate-100", "flex", "flex-col", "items-center"],
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { base } = rootLayoutStyles();

  return (
    <html lang="en">
      <body className={base()}>{children}</body>
    </html>
  );
}
