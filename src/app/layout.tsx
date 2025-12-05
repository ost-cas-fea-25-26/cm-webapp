import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Mumble App",
  description: "So cool mumbling app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100">
        <Navbar isLoggedIn={!!session?.user} />
        <main>{children}</main>
      </body>
    </html>
  );
}
