"use client";

import { getUserAction } from "@/actions/user.action";
import { User } from "@/lib/api/users/user.types";
import { AuthClient } from "@/lib/auth/client";
import { AuthServer } from "@/lib/auth/server";
import { Avatar } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileAvatar = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const loadUser = async () => {
      const mumbleUser = await getUserAction();
      setUser(mumbleUser);
    };
    loadUser();
  }, []);

  return (
    <Avatar
      alt="Avatar image of your account"
      size="sm"
      src={user?.avatarUrl}
      onAvatarClick={() => redirect("/profile")}
    ></Avatar>
  );
};

export default ProfileAvatar;
