"use client";

import { getUserAction } from "@/actions/user.action";
import { User } from "@/lib/api/users/user.types";
import { Avatar } from "@krrli/cm-designsystem";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileAvatar = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const profilePageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user?.id}`;

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
      onAvatarClick={() => redirect(profilePageUrl)}
    ></Avatar>
  );
};

export default ProfileAvatar;
