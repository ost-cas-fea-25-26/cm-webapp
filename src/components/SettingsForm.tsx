"use client";

import { User } from "@/lib/api/users/user.types";
import { Button, Cancel, Checkmark, Form, Input } from "@krrli/cm-designsystem";

type SettingsFormProps = {
  user: User;
  username: string;
  firstname: string;
  lastname: string;
  isSubmitting: boolean;
  error: string | null;
  onUsernameChange: (value: string) => void;
  onFirstnameChange: (value: string) => void;
  onLastnameChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const SettingsForm = ({
  // user,
  username,
  firstname,
  lastname,
  isSubmitting,
  error,
  onUsernameChange,
  onFirstnameChange,
  onLastnameChange,
  onSubmit,
  onCancel,
}: SettingsFormProps) => {
  return (
    <Form
      fields={
        <>
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}
          <Input
            name="username"
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={onUsernameChange}
            // disabled={isSubmitting}
          />
          {/* <Input
            name="firstname"
            label="Vorname"
            placeholder="Vornamen eingeben"
            value={firstname}
            onChange={onFirstnameChange}
            // disabled={isSubmitting}
          />
          <Input
            name="lastname"
            label="Nachname"
            placeholder="Nachnamen eingeben"
            value={lastname}
            onChange={onLastnameChange}
            // disabled={isSubmitting}
          /> */}
        </>
      }
      action={
        <div
          style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
        >
          <Button
            intent="primary"
            size="md"
            onClick={onCancel}
            icon={Cancel}
            // disabled={isSubmitting}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            intent="secondary"
            size="md"
            icon={Checkmark}
            // disabled={isSubmitting}
          >
            {isSubmitting ? "Speichert..." : "Speichern"}
          </Button>
        </div>
      }
      onSubmit={onSubmit}
    />
  );
};

export default SettingsForm;
