"use client";

import { Button, Form, Input } from "@krrli/cm-designsystem";

// const loginButtonStyles = tv({
//   slots: {
//     base: ["group"],
//     icon: ["transition", "group-hover:rotate-90", "duration-350"],
//   },
// });

type SettingsFormProps = {
  userId: string;
  defaultValues: {
    username: string;
    firstname: string;
    lastname: string;
  };
  onSuccess: () => void;
};

const SettingsForm = ({
  userId,
  defaultValues,
  onSuccess,
}: SettingsFormProps) => {
  return (
    <Form>
      <Form.Fields>
        <Input
          name="Username"
          placeholder="Username"
          onChange={() => {
            console.log("changed");
          }}
          label="Username"
        />
        <Input
          name="Firstname"
          placeholder="Firstname"
          onChange={() => {
            console.log("changed");
          }}
          label="Firstname"
        />
        <Input
          name="Lastname"
          placeholder="Lastname"
          onChange={() => {
            console.log("changed");
          }}
          label="Lastname"
        />
      </Form.Fields>
      <Form.Action>
        <Button
          type="submit"
          intent="primary"
          size="md"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Submit
        </Button>
      </Form.Action>
    </Form>
  );
};

export default SettingsForm;
