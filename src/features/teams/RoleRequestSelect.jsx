/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useRequest } from "./useRequest";
import { useState } from "react";
import { useGetTeamById } from "./useGetTeamById";

const rolesList = [
  "Front-end",
  "Back-end",
  "UI/UX Дизайн",
  "QA",
  "PM",
  "Ментор",
];

const roleToEmailField = {
  "Front-end": "email_front",
  "Back-end": "email_back",
  "UI/UX Дизайн": "email_ui",
  QA: "email_qa",
  PM: "email_pm",
  Ментор: "email_mentor",
};

function RoleRequestSelect({ user_email, team_id, team_name, onCloseModal }) {
  const { request } = useRequest();
  const { handleSubmit } = useForm();
  const { team } = useGetTeamById(team_id);

  const [selectedRole, setSelectedRole] = useState("");

  if (!team) {
    return <div>Завантаження...</div>;
  }

  const availableRoles = rolesList.filter((role) => {
    const emailField = roleToEmailField[role];
    return team[emailField] === null;
  });

  const onSubmit = () => {
    if (!selectedRole) {
      console.log("Будь ласка, оберіть роль");
      return;
    }

    console.log(user_email, team_id, selectedRole);
    request({ user_email, team_id, role: selectedRole, onCloseModal });
  };

  if (availableRoles.length === 0) {
    return (
      <div>
        <p>На жаль, немає доступних ролей у команді {team_name}.</p>
      </div>
    );
  }

  return (
    <div>
      <p>Оберіть одну роль, яку ви хочете займати, в {team_name}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          {availableRoles.map((role) => (
            <div
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`cursor-pointer rounded-lg border p-4 text-center ${
                selectedRole === role
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {role}
            </div>
          ))}
        </div>
        <button type="submit">Відправити заявку на приєднання</button>
      </form>
    </div>
  );
}

export default RoleRequestSelect;
