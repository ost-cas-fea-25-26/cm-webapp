"use client";

import { login } from "@/lib/AuthClient";
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
  return (
    <NaviButton
      className={base()}
      icon={Profile}
      iconClassName={icon()}
      intent="secondary"
      onClick={login}
    >
      Login
    </NaviButton>
  );
};

export default LoginButton;
