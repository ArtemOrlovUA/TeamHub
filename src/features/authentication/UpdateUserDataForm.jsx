// UpdateUserDataForm.js
import { useState, useEffect } from "react";
import Select from "react-select";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import { useUpdate } from "./useUpdate";
import { useUpdateUserSkills } from "../userSkills/useUpdateUserSkills";
import { useGetSkills } from "../userSkills/useGetSkills";

const skillsList = [
  { value: "Front-end", label: "Front-end" },
  { value: "Back-end", label: "Back-end" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "QA", label: "QA" },
  { value: "PM", label: "PM" },
  { value: "Mentor", label: "Mentor" },
];

function UpdateUserDataForm() {
  const { user, isLoading, refetch: refetchUser } = useUser();
  const { updateUser, isUpdating } = useUpdate();
  const { updateUserSkills } = useUpdateUserSkills();
  const { skills: currentSkills, isLoading: isSkillsLoading } = useGetSkills();

  console.log(currentSkills);
  const currentSkillsString = currentSkills.join(",");

  // State management
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [cv, setCv] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.fullName || "");
      setLinkedin(user.user_metadata.linkedin || "");
    }
  }, [user]);

  useEffect(() => {
    if (currentSkills.length > 0 && selectedSkills.length === 0) {
      const initialSkills = currentSkills
        .map((skill) => skillsList.find((s) => s.value === skill))
        .filter(Boolean);
      setSelectedSkills(initialSkills);
    }
  }, [currentSkills, selectedSkills.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    // Update user data including avatar
    await updateUser(
      { email: user.email, fullName, avatar, linkedin, cv },
      {
        onSettled: () => {
          setAvatar(null); // Reset avatar input field
          setCv(null);
          e.target.reset();
        },
      },
    );

    // Update user skills
    const skillsToUpdate = selectedSkills.map((skill) => skill.value).join(",");
    console.log(skillsToUpdate);
    if (skillsToUpdate !== currentSkillsString)
      await updateUserSkills({ uid: user.id, skills: skillsToUpdate });

    // Refetch user data to get updated avatar URL
    refetchUser();
  }

  if (isLoading || isSkillsLoading) return <p>Loading user data...</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Електронна пошта:">
        <Input value={user.email || ""} disabled />
      </FormRow>
      <FormRow label="Повне ім'я:">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="LinkedIn:">
        <Input
          type="text"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          id="linkedin"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Завантажити/змінити фото:">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow label="Завантажити/змінити CV:">
        <FileInput
          id="cv"
          accept=".pdf,.doc,.docx"
          disabled={isUpdating}
          onChange={(e) => setCv(e.target.files[0])}
        />
      </FormRow>
      <FormRow label="Мої навички:">
        <Select
          isMulti
          options={skillsList}
          value={selectedSkills}
          onChange={setSelectedSkills}
          placeholder="Обрати навички..."
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating}>Зберегти</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
