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

const loginButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: ["transition", "group-hover:rotate-90", "duration-350"],
  },
});

const MumbleSettingsButton = () => {
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
        onOpenChange={() => {
          setSettingsModalOpen(!settingsModalOpen);
        }}
        title="Modal"
        open={settingsModalOpen}
      >
        <ModalBody>Hello, this is a Modal!!!</ModalBody>
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
          <Button
            icon={Checkmark}
            intent="secondary"
            onClick={() => {
              console.log("Save clicked");
            }}
            size="md"
          >
            Save
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default MumbleSettingsButton;
