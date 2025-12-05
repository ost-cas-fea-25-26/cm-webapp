"use client";

import {
  Avatar,
  LogoLink,
  NaviButton,
  Settings,
  LogOut,
  Profile,
} from "@krrli/cm-designsystem";
import { tv, VariantProps } from "tailwind-variants";
import { signinZitadel } from "@/lib/auth-client";

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
    action: ["flex", "gap-4"],
  },
});

type NavbarVariants = VariantProps<typeof navbarStyles>;

interface NavbarProps extends NavbarVariants {
  /** URL of the user's avatar image. */
  src?: string;
  isLoggedIn: boolean;
}

const Navbar = (props: NavbarProps) => {
  const { base, navigation, action } = navbarStyles();
  return (
    <div className={base()}>
      <nav className={navigation()}>
        <LogoLink />
        {props.isLoggedIn ? (
          <div className={action()}>
            <Avatar
              alt="Avatar image of your account"
              size="sm"
              src={""}
            ></Avatar>

            <NaviButton
              className="group"
              icon={Settings}
              iconClassName="transition group-hover:rotate-90 duration-350"
              intent="secondary"
              onClick={() => {}}
            >
              Settings
            </NaviButton>

            <NaviButton
              className="group"
              icon={LogOut}
              iconClassName="transition-transform group-hover:[&>g]:[&>path:first-child]:translate-x-0.5 duration-350"
              intent="secondary"
              onClick={() => {}}
            >
              Log out
            </NaviButton>
          </div>
        ) : (
          <div className={action()}>
            <NaviButton
              className="group"
              icon={Profile}
              iconClassName="transition-transform group-hover:[&>g]:[&>path:first-child]:translate-x-0.5 duration-350"
              intent="secondary"
              onClick={() => signinZitadel()}
            >
              Login
            </NaviButton>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
