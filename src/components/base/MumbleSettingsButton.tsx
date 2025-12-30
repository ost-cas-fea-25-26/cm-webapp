"use client";

import { updateUserAction } from "@/actions/user.action";
import { User } from "@/lib/api/users/user.types";
import { Modal, ModalBody, NaviButton, Settings } from "@krrli/cm-designsystem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tv } from "tailwind-variants";
import SettingsForm from "../SettingsForm";

const loginButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: ["transition", "group-hover:rotate-90", "duration-350"],
  },
});

export type MumbleSettingsButtonProps = {
  user: User;
};

const MumbleSettingsButton = (props: MumbleSettingsButtonProps) => {
  const { base, icon } = loginButtonStyles();
  const router = useRouter();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [username, setUsername] = useState(props.user.username ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!props.user.id) return;

    setIsSubmitting(true);
    setError(null);

    const result = await updateUserAction(props.user.id, {
      username: username || null,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSettingsModalOpen(false);
      router.refresh(); // Refresh to get updated user data
    } else {
      setError(result.error || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setSettingsModalOpen(false);
    setError(null);
    // Reset to original values
    setUsername(props.user.username ?? "");
  };

  return (
    <>
      <NaviButton
        className={base()}
        icon={Settings}
        iconClassName={icon()}
        intent="secondary"
        onClick={() => {
          setUsername(props.user.username ?? "");
          setError(null);
          setSettingsModalOpen(true);
        }}
      >
        Settings
      </NaviButton>
      <Modal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
        title="Einstellungen"
      >
        <ModalBody>
          <SettingsForm
            user={props.user}
            username={username}
            isSubmitting={isSubmitting}
            error={error}
            onUsernameChange={setUsername}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default MumbleSettingsButton;
