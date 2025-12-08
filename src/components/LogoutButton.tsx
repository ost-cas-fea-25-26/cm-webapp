"use client";

import { logout } from "@/lib/AuthClient";
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
  return (
    <NaviButton
      className={base()}
      icon={LogOut}
      iconClassName={icon()}
      intent="secondary"
      onClick={logout}
    >
      Log out
    </NaviButton>
  );
};

export default LogoutButton;
