import { isAuthenticated } from "@/lib/AuthServer";
import { redirect } from "next/navigation";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = async ({ children }: AuthGuardProps) => {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return <>{children}</>;
};
