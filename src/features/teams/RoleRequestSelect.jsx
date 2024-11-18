// /* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import { ModalContext } from "../../ui/Modal";
// import { useRequest } from "./useRequest";
// import { useState, useContext } from "react";
// import { useGetTeamById } from "./useGetTeamById";

// const rolesList = ["Front-end", "Back-end", "UI/UX", "QA", "PM", "Mentor"];

// const roleToEmailField = {
//   "Front-end": "email_front",
//   "Back-end": "email_back",
//   "UI/UX": "email_ui",
//   QA: "email_qa",
//   PM: "email_pm",
//   Mentor: "email_mentor",
// };

// function RoleRequestSelect({ user_email, team_id, team_name }) {
//   const { request } = useRequest();
//   const { handleSubmit } = useForm();
//   const { team } = useGetTeamById(team_id);
//   const { closeModal } = useContext(ModalContext);

//   const [selectedRole, setSelectedRole] = useState("");

//   if (!team) {
//     return <div>Завантаження...</div>;
//   }

//   const availableRoles = rolesList.filter((role) => {
//     const emailField = roleToEmailField[role];
//     return team[emailField] === null;
//   });

//   const onSubmit = () => {
//     if (!selectedRole) {
//       console.log("Будь ласка, оберіть роль");
//       return;
//     }

//     request({ user_email, team_id, role: selectedRole });
//     closeModal();
//   };

//   if (availableRoles.length === 0) {
//     return (
//       <div>
//         <p>На жаль, немає доступних ролей у команді {team_name}.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <p>Оберіть одну роль, яку ви хочете займати, в {team_name}</p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-3 gap-4">
//           {availableRoles.map((role) => (
//             <div
//               key={role}
//               onClick={() => setSelectedRole(role)}
//               className={`cursor-pointer rounded-lg border p-4 text-center ${
//                 selectedRole === role
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {role}
//             </div>
//           ))}
//         </div>
//         <button type="submit">Відправити заявку на приєднання</button>
//       </form>
//     </div>
//   );
// }

// export default RoleRequestSelect;

/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/Modal";
import { useRequest } from "./useRequest";
import { useState, useContext } from "react";
import { useGetTeamById } from "./useGetTeamById";

const rolesList = ["Front-end", "Back-end", "UI/UX", "QA", "PM", "Mentor"];

const roleToEmailField = {
  "Front-end": "email_front",
  "Back-end": "email_back",
  "UI/UX": "email_ui",
  QA: "email_qa",
  PM: "email_pm",
  Mentor: "email_mentor",
};

function RoleRequestSelect({ user_email, team_id, team_name }) {
  const { request } = useRequest();
  const { handleSubmit } = useForm();
  const { team } = useGetTeamById(team_id);
  const { closeModal } = useContext(ModalContext);

  const [selectedRole, setSelectedRole] = useState("");

  if (!team) {
    return (
      <div className="text-center text-indigo-200">
        <p>Завантаження...</p>
      </div>
    );
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

    request({ user_email, team_id, role: selectedRole });
    closeModal();
  };

  if (availableRoles.length === 0) {
    return (
      <div className="max-w-md mx-auto rounded-lg bg-indigo-950 p-6 shadow-lg text-center">
        <p className="text-indigo-200">
          На жаль, немає доступних ролей у команді{" "}
          <span className="font-primaryBold">{team_name}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto rounded-lg bg-indigo-950 p-6 shadow-lg">
      <h2 className="text-2xl font-primaryBold text-indigo-50 mb-4">
        Обрати роль
      </h2>
      <p className="text-indigo-200 mb-6">
        Оберіть одну роль, яку ви хочете займати, в{" "}
        <span className="font-primaryBold">{team_name}</span>.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {availableRoles.map((role) => (
            <div
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`cursor-pointer rounded-lg border p-4 text-center font-primaryRegular transition ${
                selectedRole === role
                  ? "bg-indigo-400 text-white border-indigo-950"
                  : "bg-indigo-50 text-indigo-950 border-indigo-400 hover:bg-indigo-100"
              }`}
            >
              {role}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-indigo-50 px-6 py-3 font-primaryBold text-indigo-950 shadow-lg transition hover:bg-indigo-800 hover:text-indigo-50"
        >
          Відправити заявку на приєднання
        </button>
      </form>
    </div>
  );
}

export default RoleRequestSelect;
