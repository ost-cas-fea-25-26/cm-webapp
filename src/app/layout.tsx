import type { Metadata } from "next";
import { tv } from "tailwind-variants";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

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
    <html lang="en" className={poppins.variable}>
      <body className={base()}>{children}</body>
    </html>
  );
}
