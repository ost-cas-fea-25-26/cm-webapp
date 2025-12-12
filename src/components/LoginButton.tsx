"use client";

import { AuthClient } from "@/lib/auth/client";
import { NaviButton, Profile } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";

const loginButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: [
      "transition-transform",
      "group-hover:[&>g]:[&>path:first-child]:translate-x-0.5",
      "duration-350",
    ],
  },
});

const LoginButton = () => {
  const { base, icon } = loginButtonStyles();
  const authClient = new AuthClient();

  return (
    <NaviButton
      className={base()}
      icon={Profile}
      iconClassName={icon()}
      intent="secondary"
      onClick={() => authClient.login()}
    >
      Login
    </NaviButton>
  );
};

export default LoginButton;
