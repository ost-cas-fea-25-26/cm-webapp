"use client";

import { User } from "@/lib/api/users/user.types";
import { Button, Form, Input } from "@krrli/cm-designsystem";

// const loginButtonStyles = tv({
//   slots: {
//     base: ["group"],
//     icon: ["transition", "group-hover:rotate-90", "duration-350"],
//   },
// });

type SettingsFormProps = {
  user: User;
  onSuccess: () => void;
};

const SettingsForm = ({ user, onSuccess }: SettingsFormProps) => {
  const handleSubmit = async (data: Record<string, any>) => {
    console.log("change setting for user: ", user);
    console.log("Submitted data:", data);
    // Here you would typically send the data to your backend API
    // For example:
    // await updateUserSettingsAction(user.id, data);
    onSuccess();
  };

  return (
    <Form
      fields={
        <>
          <Input
            name="username"
            label="Username"
            placeholder={""}
            onChange={function (value: string): void {
              console.log("value", value);
            }} // defaultValue={defaultValues.username}
          />
          <Input
            name="email"
            label="Email"
            placeholder={""}
            onChange={function (value: string): void {
              console.log("value", value);
            }} // defaultValue={defaultValues.username}faultValue={defaultValues.email}
          />
        </>
      }
      action={
        <Button type="submit" intent={"secondary"} size={"md"}>
          Save
          {/* {isSaving ? "Saving…" : "Save"} */}
        </Button>
      }
      onSubmit={handleSubmit}
    />

    // <Form fields={undefined} action={onSuccess}>
    //   <Input
    //     name="Username"
    //     placeholder="Username"
    //     onChange={() => {
    //       console.log("changed");
    //     }}
    //     label="Username"
    //   />
    //   <Input
    //     name="Firstname"
    //     placeholder="Firstname"
    //     onChange={() => {
    //       console.log("changed");
    //     }}
    //     label="Firstname"
    //   />
    //   <Input
    //     name="Lastname"
    //     placeholder="Lastname"
    //     onChange={() => {
    //       console.log("changed");
    //     }}
    //     label="Lastname"
    //   />
    //   <Button type="submit" intent="primary" size="md" onClick={onSuccess}>
    //     Submit
    //   </Button>
    // </Form>
  );
};

export default SettingsForm;
