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
      <body className="bg-slate-100 min-h-screen">
        <Navbar isLoggedIn={!!session?.user} />
        <main>{children}</main>
      </body>
    </html>
  );
}
