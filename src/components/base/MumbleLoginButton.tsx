"use client";

import { AuthClient } from "@/lib/auth/client";
import { NaviButton, Profile } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";

const mumbleLoginButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: [
      "transition-transform",
      "group-hover:[&>g]:[&>path:first-child]:translate-x-0.5",
      "duration-350",
    ],
  },
});

const MumbleLoginButton = () => {
  const { base, icon } = mumbleLoginButtonStyles();
  const authClient = new AuthClient();

  return (
    <NaviButton
      className={base()}
      icon={Profile}
      iconClassName={icon()}
      intent="secondary"
      onClick={authClient.login}
    >
      Login
    </NaviButton>
  );
};

export default MumbleLoginButton;
