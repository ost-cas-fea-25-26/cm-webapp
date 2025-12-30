"use client";

import { Button, Form, Input } from "@krrli/cm-designsystem";

// const loginButtonStyles = tv({
//   slots: {
//     base: ["group"],
//     icon: ["transition", "group-hover:rotate-90", "duration-350"],
//   },
// });

export type SettingsFormProps = {
  userId: string;
};

// const SettingsForm = (props: SettingsFormProps) => {
const SettingsForm = () => {
  // const { base, icon } = loginButtonStyles();
  // const [settingsModalOpen, setSettingsModalOpen] = useState(false);

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
          name="Email"
          placeholder="Email"
          onChange={() => {
            console.log("changed");
          }}
          label="Input"
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
