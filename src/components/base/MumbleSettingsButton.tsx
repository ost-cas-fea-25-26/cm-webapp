"use client";

import {
  Button,
  Cancel,
  Checkmark,
  Modal,
  ModalActions,
  ModalBody,
  NaviButton,
  Settings,
} from "@krrli/cm-designsystem";
import { useState } from "react";
import { tv } from "tailwind-variants";
import SettingsForm from "../SettingsForm";
import { User } from "@/lib/api/users/user.types";

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
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <>
      <NaviButton
        className={base()}
        icon={Settings}
        iconClassName={icon()}
        intent="secondary"
        onClick={() => {
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
            onSuccess={() => setSettingsModalOpen(false)}
          />
        </ModalBody>
        <ModalActions>
          <Button
            icon={Cancel}
            intent="primary"
            onClick={() => {
              setSettingsModalOpen(false);
            }}
            size="md"
          >
            Cancel
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default MumbleSettingsButton;
