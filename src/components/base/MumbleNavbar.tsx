"use cache";

import { tv, VariantProps } from "tailwind-variants";
import { LogoLink } from "@krrli/cm-designsystem";

const mumbleNavbarStyles = tv({
  slots: {
    base: [
      "bg-violet-600",
      "w-full",
      "h-20",
      "flex",
      "items-center",
      "justify-center",
      "sticky",
      "top-0",
      "z-50",
      "px-4",
    ],
    navigation: ["flex", "justify-between", "w-full", "max-w-5xl"],
    action: ["flex", "gap-1", "sm:gap-4", "items-center"],
  },
});

type NavbarVariants = VariantProps<typeof mumbleNavbarStyles>;

interface NavbarProps extends NavbarVariants {
  children: React.ReactElement | React.ReactElement[];
}

const MumbleNavbar = async (props: NavbarProps) => {
  const { base, navigation, action } = mumbleNavbarStyles();

  return (
    <header className={base()}>
      <nav className={navigation()}>
        <LogoLink />
        <div className={action()}>{props.children}</div>
      </nav>
    </header>
  );
};

export default MumbleNavbar;
