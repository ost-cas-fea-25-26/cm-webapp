"use client";

import { NaviButton, Settings } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";

const loginButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: ["transition", "group-hover:rotate-90", "duration-350"],
  },
});

const MumbleSettingsButton = () => {
  const { base, icon } = loginButtonStyles();
  return (
    <NaviButton
      className={base()}
      icon={Settings}
      iconClassName={icon()}
      intent="secondary"
    >
      Settings
    </NaviButton>
  );
};

export default MumbleSettingsButton;
