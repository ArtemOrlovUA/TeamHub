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
      console.log("Обрані навички успішно збережено", selectedSkills.join(","));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#140D2D] bg-cover bg-center text-indigo-950">
      {/* Header */}
      <h1 className="mb-6 mt-8 font-primaryBold text-4xl text-indigo-100">
        Навички Користувача
      </h1>

      {/* Form Container */}
      <div className="mt-36 w-[700px] rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center font-primaryBold text-2xl text-gray-800">
          Оберіть Свої Навички
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormRow>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {skillsList.map((skill) => (
                <div
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`cursor-pointer rounded-lg p-4 text-center text-xl font-bold transition ${
                    selectedSkills.includes(skill)
                      ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </FormRow>

          <FormRow>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Зберегти
            </Button>
          </FormRow>
        </Form>
      </div>
    </div>
  );
}

export default UserSkillsForm;
