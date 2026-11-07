import { tv, VariantProps } from "tailwind-variants";
import { LogoLink } from "@krrli/cm-designsystem";
import MobileNav from "../MobileNav";

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
    desktopAction: ["hidden", "md:flex", "gap-4", "items-center"],
    mobileNav: ["flex", "md:hidden"],
  },
});

type NavbarVariants = VariantProps<typeof mumbleNavbarStyles>;

interface NavbarProps extends NavbarVariants {
  children: React.ReactElement | React.ReactElement[];
}

const MumbleNavbar = (props: NavbarProps) => {
  const { base, navigation, desktopAction, mobileNav } = mumbleNavbarStyles();

  return (
    <header className={base()}>
      <nav className={navigation()}>
        <LogoLink />
        <div className={desktopAction()}>{props.children}</div>
        <div className={mobileNav()}>
          <MobileNav>{props.children}</MobileNav>
        </div>
      </nav>
    </header>
  );
};

export default MumbleNavbar;
