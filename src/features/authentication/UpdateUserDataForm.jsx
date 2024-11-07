import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdate } from "./useUpdate";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdate();
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.fullName || "");
      setLinkedin(user.user_metadata.linkedin || "");
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar, linkedin },
      {
        onSettled: () => {
          setAvatar(null);
          e.target.reset();
        },
      },
    );
  }

  if (isLoading) return <p>Loading user data...</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user.email || ""} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="LinkedIn URL">
        <Input
          type="text"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          id="linkedin"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow label="Upload CV">
        <FileInput
          id="cv"
          accept=".pdf,.doc,.docx"
          disabled={isUpdating}
          // onChange={(e) => setCv(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Update account data</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
