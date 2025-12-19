"use cache";

import { tv, VariantProps } from "tailwind-variants";
import { LogoLink } from "@krrli/cm-designsystem";

const navbarStyles = tv({
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

type NavbarVariants = VariantProps<typeof navbarStyles>;

interface NavbarProps extends NavbarVariants {
  children: React.ReactElement | React.ReactElement[];
}

const Navbar = async (props: NavbarProps) => {
  const { base, navigation, action } = navbarStyles();

  return (
    <header className={base()}>
      <nav className={navigation()}>
        <LogoLink />
        <div className={action()}>{props.children}</div>
      </nav>
    </header>
  );
};

export default Navbar;
