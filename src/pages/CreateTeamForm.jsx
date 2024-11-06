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

  // Helper function to format the date as "DD.MM.YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
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

      // Format the timeline date before submission
      const formattedTimeline = formatDate(timeline);

      createTeam({
        creatorEmail: user.email,
        roles: selectedRoles,
        teamName: name,
        teamGoals: goals,
        deadline_date: formattedTimeline, // use the formatted date
      });

      reset();
      setSelectedSpecialists([]);
      setSelectedRoles([]);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormRow label="Назва проекту" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Це поле має бути заповненим" })}
        />
      </FormRow>

      <FormRow label="Цілі проекту" error={errors?.goals?.message}>
        <Textarea
          id="goals"
          rows="3"
          {...register("goals", { required: "Це поле має бути заповненим" })}
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
                "Timeline should be at least 3 days from today"
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
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-300"
              }`}
            >
              {specialist}
            </div>
          ))}
        </div>
      </FormRow>

      <FormRow label="Ваша роль (-лі)">
        <div className="grid grid-cols-3 gap-4">
          {specialistOptions.map((role) => (
            <div
              key={role}
              onClick={() => toggleRole(role)}
              className={`cursor-pointer rounded-lg border p-4 text-center transition-colors ${
                selectedRoles.includes(role)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-green-300"
              }`}
            >
              {role}
            </div>
          ))}
        </div>
      </FormRow>

      <FormRow>
        <Button disabled={isCreating} type="submit">
          Створити
        </Button>
      </FormRow>
    </Form>
  );
}

export default ProjectForm;
