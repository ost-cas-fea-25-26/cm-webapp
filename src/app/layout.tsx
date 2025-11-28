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
        <div className="grid grid-cols-[1fr_minmax(auto,60ch)_1fr] min-h-screen">
          <Navbar />
          <main className="col-start-2 col-end-3 pt-20 px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
