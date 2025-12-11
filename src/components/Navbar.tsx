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
    ],
    navigation: ["flex", "justify-between", "max-w-170", "w-170"],
    action: ["flex", "gap-4", "items-center"],
  },
});

type NavbarVariants = VariantProps<typeof navbarStyles>;

interface NavbarProps extends NavbarVariants {
  children: React.ReactElement | React.ReactElement[];
}

const Navbar = async (props: NavbarProps) => {
  const { base, navigation, action } = navbarStyles();

  return (
    <div className={base()}>
      <nav className={navigation()}>
        <LogoLink />
        <div className={action()}>{props.children}</div>
      </nav>
    </div>
  );
};

export default Navbar;
