import { AuthServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: AuthGuardProps) => {
  const authServer = new AuthServer();
  if (!(await authServer.isAuthenticated())) {
    redirect("/login");
  }

  return <>{children}</>;
};
