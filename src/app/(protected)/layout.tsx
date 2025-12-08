import Navbar from "@/components/Navbar";
import { AuthGuard } from "@/guards/AuthGuard";
import { tv } from "tailwind-variants";

const protectedLayoutStyles = tv({
  slots: {
    base: ["flex", "flex-col", "items-center"],
    content: ["w-170"],
  },
});

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { base, content } = protectedLayoutStyles();

  return (
    <AuthGuard>
      <div className={base()}>
        <Navbar />
        <div className={content()}>{children}</div>
      </div>
    </AuthGuard>
  );
}
