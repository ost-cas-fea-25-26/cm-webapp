"use client";

import { AuthClient } from "@/lib/auth/client";
import { LogOut, NaviButton } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";

const logoutButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: [
      "transition-transform",
      " group-hover:[&>g]:[&>path:first-child]:translate-x-0.5",
      "duration-350",
    ],
  },
});

const LogoutButton = () => {
  const { base, icon } = logoutButtonStyles();
  const authClient = new AuthClient();

  return (
    <NaviButton
      className={base()}
      icon={LogOut}
      iconClassName={icon()}
      intent="secondary"
      onClick={() => authClient.logout()}
    >
      Log out
    </NaviButton>
  );
};

export default LogoutButton;
