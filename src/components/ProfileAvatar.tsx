"use client";

import { Avatar } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";

const ProfileAvatar = () => {
  return (
    <Avatar
      alt="Avatar image of your account"
      size="sm"
      src=""
      onAvatarClick={() => redirect("/profile")}
    ></Avatar>
  );
};

export default ProfileAvatar;
