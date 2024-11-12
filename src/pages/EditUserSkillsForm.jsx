import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import { useUpdateUserSkills } from "../features/userSkills/useUpdateUserSkills";
import { useUser } from "../features/authentication/useUser";
import { useGetSkills } from "../features/userSkills/useGetSkills";

const skillsList = [
  "Front-end",
  "Back-end",
  "UI/UX Дизайн",
  "QA",
  "PM",
  "Ментор",
];

function EditUserSkillsForm() {
  const { handleSubmit } = useForm();
  const { updateUserSkills } = useUpdateUserSkills();
  const { user } = useUser();
  const { skills } = useGetSkills(); // Get the existing skills to pre-select
  const [selectedSkills, setSelectedSkills] = useState(skills || []);

  useEffect(() => {
    if (skills) setSelectedSkills(skills);
  }, [skills]);

  const handleSkillChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setSelectedSkills(selected);
  };

  const onSubmit = () => {
    if (selectedSkills.length === 0) {
      toast.error("Будь ласка, оберіть хоча б одну навичку");
    } else {
      updateUserSkills({ uid: user.id, skills: selectedSkills.join(",") });
      console.log("Обрані навички успішно збережено", selectedSkills.join(","));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormRow label="Редагувати свої навички">
        <select
          multiple
          value={selectedSkills}
          onChange={handleSkillChange}
          className="w-full border rounded-lg p-2"
        >
          {skillsList.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow>
        <Button type="submit">Оновити навички</Button>
      </FormRow>
    </Form>
  );
}

export default EditUserSkillsForm;
