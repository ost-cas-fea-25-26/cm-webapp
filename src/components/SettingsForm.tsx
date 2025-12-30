"use client";

import { User } from "@/lib/api/users/user.types";
import { Button, Cancel, Checkmark, Form, Input } from "@krrli/cm-designsystem";

type SettingsFormProps = {
  user: User;
  username: string;
  isSubmitting: boolean;
  error: string | null;
  onUsernameChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const SettingsForm = ({
  username,
  isSubmitting,
  error,
  onUsernameChange,
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
          />
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
