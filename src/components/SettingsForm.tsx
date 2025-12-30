"use client";

import { User } from "@/lib/api/users/user.types";
import { Button, Cancel, Checkmark, Form, Input } from "@krrli/cm-designsystem";
import { useState } from "react";

type SettingsFormProps = {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
};

const SettingsForm = ({ user, onSuccess, onCancel }: SettingsFormProps) => {
  const [username, setUsername] = useState(user.username ?? "öper");
  const [firstname, setFirstname] = useState(user.firstname ?? "");
  const [lastname, setLastname] = useState(user.lastname ?? "");

  console.log("username: ", username);

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("change setting for user: ", user);
    console.log("Submitted data:", { data });

    onSuccess();
  };

  return (
    <Form
      fields={
        <>
          <Input
            name="username"
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={setUsername}
          />
          <Input
            name="firstname"
            label="Vorname"
            placeholder="Vornamen eingeben"
            value={firstname}
            onChange={setFirstname}
          />
          <Input
            name="lastname"
            label="Nachname"
            placeholder="Nachnamen eingeben"
            value={lastname}
            onChange={setLastname}
          />
        </>
      }
      action={
        <div
          style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
        >
          <Button intent="primary" size="md" onClick={onCancel} icon={Cancel}>
            Abbrechen
          </Button>
          <Button type="submit" intent="secondary" size="md" icon={Checkmark}>
            Speichern
          </Button>
        </div>
      }
      onSubmit={handleSubmit}
    />
  );
};

export default SettingsForm;
