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
import { getUserAction } from "@/actions/user.action";

const loginButtonStyles = tv({
  slots: {
    base: ["group"],
    icon: ["transition", "group-hover:rotate-90", "duration-350"],
  },
});

export type MumbleSettingsButtonProps = {
  userId: string;
};

const MumbleSettingsButton = (props: MumbleSettingsButtonProps) => {
  const { base, icon } = loginButtonStyles();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // todo: load user (firstname, lastname, username)
  const user = await getUserAction(props.userId);

  return (
    user ?
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
            userId={props.userId}
            defaultValues={{
              username: user.username ?? "",
              firstname: user.firstname ?? "",
              lastname: user.lastname ?? "",
            }}
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
          {/* <Button
            icon={Checkmark}
            intent="secondary"
            onClick={() => {
              console.log("Save clicked");
            }}
            size="md"
          >
            Save
          </Button> */}
        </ModalActions>
      </Modal>
    </>
  );
};

export default MumbleSettingsButton;
