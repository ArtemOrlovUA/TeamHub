import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import { useUpdateUserSkills } from "../features/userSkills/useUpdateUserSkills";
import { useUser } from "../features/authentication/useUser";

const skillsList = [
  "Front-end",
  "Back-end",
  "UI/UX Дизайн",
  "QA",
  "PM",
  "Ментор",
];

function UserSkillsForm() {
  const { handleSubmit } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { updateUserSkills } = useUpdateUserSkills();
  const { user } = useUser();

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const onSubmit = () => {
    if (selectedSkills.length === 0) {
      toast.error("Будь ласка, оберіть хоча б одну навичку");
    } else {
      updateUserSkills({ uid: user.id, skills: selectedSkills.join(",") });
      console.log("Обрані навички успішно збережно", selectedSkills.join(","));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormRow label="Оберіть свої навички">
        <div className="grid grid-cols-3 gap-4">
          {skillsList.map((skill) => (
            <div
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`cursor-pointer rounded-lg border p-4 text-center ${
                selectedSkills.includes(skill)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {skill}
            </div>
          ))}
        </div>
      </FormRow>

      <FormRow>
        <Button type="submit">Підтвердити</Button>
      </FormRow>
    </Form>
  );
}

export default UserSkillsForm;
