import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Mumble App",
  description: "So cool mumbling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
