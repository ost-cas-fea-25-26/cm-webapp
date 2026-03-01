import { AuthServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: AuthGuardProps) => {
  await connection();
  const authServer = new AuthServer();
  if (!(await authServer.isAuthenticated())) {
    redirect("/login");
  }

  return <>{children}</>;
};
