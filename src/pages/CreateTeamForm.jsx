import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import toast from "react-hot-toast";
import { useCreateTeam } from "../features/teams/useCreateTeam";
import { useUser } from "../features/authentication/useUser";

const specialistOptions = [
  "Front-end",
  "Back-end",
  "UI/UX Дизайн",
  "QA",
  "PM",
  "Ментор",
];

function ProjectForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { createTeam, isCreating } = useCreateTeam();
  const { user } = useUser();
  const { errors } = formState;
  const [selectedSpecialists, setSelectedSpecialists] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleSpecialist = (specialist) => {
    if (selectedRoles.includes(specialist)) {
      toast.error("Ви вже обрали цю спеціалізацію як власну роль");
      return;
    }
    setSelectedSpecialists((prev) =>
      prev.includes(specialist)
        ? prev.filter((s) => s !== specialist)
        : [...prev, specialist],
    );
  };

  const toggleRole = (role) => {
    if (selectedSpecialists.includes(role)) {
      toast.error("Ви вже обрали цю роль для спеціалістів");
      return;
    }
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const onSubmit = (data) => {
    if (selectedSpecialists.length < 1) {
      toast.error("Оберіть хоча б одну спеціалізацію");
    } else if (selectedRoles.length < 1) {
      toast.error("Оберіть хоча б одну роль");
    } else {
      const { name, goals, timeline } = data;
      const formattedTimeline = formatDate(timeline);

      createTeam({
        creatorEmail: user.email,
        roles: selectedRoles,
        teamName: name.trim(),
        teamGoals: goals.trim(),
        deadline_date: formattedTimeline,
      });

      reset();
      setSelectedSpecialists([]);
      setSelectedRoles([]);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900">
      <main className="container mx-auto mt-16 px-6 py-12 md:w-2/3 lg:w-1/2">
        <h1 className="mb-8 text-center font-primaryBold text-3xl text-indigo-950">
          Створити новий проект
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormRow label="Назва проекту" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              {...register("name", { required: "Це поле має бути заповненим" })}
              className="bg-indigo-100"
            />
          </FormRow>

          <FormRow label="Цілі проекту" error={errors?.goals?.message}>
            <Textarea
              id="goals"
              rows="3"
              {...register("goals", {
                required: "Це поле має бути заповненим",
              })}
            />
          </FormRow>

          <FormRow label="Часовий проміжок" error={errors?.timeline?.message}>
            <Input
              type="date"
              id="timeline"
              {...register("timeline", {
                required: "Це поле має бути заповненим",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const minDate = new Date();
                  minDate.setDate(minDate.getDate() + 3);
                  return (
                    selectedDate >= minDate ||
                    "Часовий проміжок має бути хоча б три дні"
                  );
                },
              })}
            />
          </FormRow>

          <FormRow label="Необхідні спеціалісти">
            <div className="grid grid-cols-3 gap-4">
              {specialistOptions.map((specialist) => (
                <div
                  key={specialist}
                  onClick={() => toggleSpecialist(specialist)}
                  className={`cursor-pointer rounded-lg border p-4 text-center transition-colors ${
                    selectedSpecialists.includes(specialist)
                      ? "bg-indigo-200 text-indigo-950"
                      : "bg-gray-200 text-gray-800 hover:bg-indigo-950 hover:text-white"
                  }`}
                >
                  {specialist}
                </div>
              ))}
            </div>
          </FormRow>

          <FormRow label="Ваша роль (-лі)">
            <div className="grid grid-cols-2 gap-4">
              {specialistOptions.map((role) => (
                <div
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`cursor-pointer rounded-lg border p-4 text-center transition-colors ${
                    selectedRoles.includes(role)
                      ? "bg-indigo-200 text-indigo-950"
                      : "bg-gray-200 text-gray-800 hover:bg-indigo-950 hover:text-white"
                  }`}
                >
                  {role}
                </div>
              ))}
            </div>
          </FormRow>

          <FormRow>
            <Button
              disabled={isCreating}
              type="submit"
            >
              Створити проект
            </Button>
          </FormRow>
        </Form>
      </main>
    </div>
  );
}

export default ProjectForm;
