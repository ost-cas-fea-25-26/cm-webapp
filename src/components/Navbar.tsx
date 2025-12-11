import { tv, VariantProps } from "tailwind-variants";
import LogoutButton from "./LogoutButton";
import { Avatar, LogoLink } from "@krrli/cm-designsystem";
import SettingsButton from "./SettingsButton";
import { redirect } from "next/navigation";
import ProfileAvatar from "./ProfileAvatar";

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
  /** URL of the user's avatar image. */
  src?: string;
}

const Navbar = (props: NavbarProps) => {
  const { base, navigation, action } = navbarStyles();
  return (
    <div className={base()}>
      <nav className={navigation()}>
        <LogoLink />
        <div className={action()}>
          <ProfileAvatar />

          <SettingsButton />

          <LogoutButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
