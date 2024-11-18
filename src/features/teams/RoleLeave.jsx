// /* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import { useLeave } from "./useLeave";
// import { useDeletedTeam } from "../../context/RateDeletedTeamContext";

// function RoleLeave({ role, team_id, email, team }) {
//   const { leave } = useLeave();
//   const { saveTeam } = useDeletedTeam();

//   const { handleSubmit } = useForm();

//   const onSubmit = () => {
//     leave({ email, role, team_id });
//     saveTeam(team);
//   };

//   return (
//     <div>
//       <p>Чи ви впевнені, що хочете покинути роль: {role}</p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <button type="submit">Підтвердити</button>
//       </form>
//     </div>
//   );
// }

// export default RoleLeave;

/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useLeave } from "./useLeave";
import { useDeletedTeam } from "../../context/RateDeletedTeamContext";

function RoleLeave({ role, team_id, email, team }) {
  const { leave } = useLeave();
  const { saveTeam } = useDeletedTeam();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    leave({ email, role, team_id });
    saveTeam(team);
  };

  return (
    <div className="max-w-md mx-auto rounded-lg bg-indigo-950 p-6 shadow-lg">
      <h2 className="text-2xl font-primaryBold text-indigo-50 mb-4">
        Покинути команду
      </h2>
      <p className="text-indigo-200 mb-6">
        Чи ви впевнені, що хочете покинути роль:{" "}
        <span className="font-primaryBold">{role}</span>?
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <button
          type="submit"
          className="w-full rounded-full bg-red-700 px-6 py-3 font-primaryBold text-indigo-50 shadow-lg transition hover:bg-red-900"
        >
          Підтвердити
        </button>
      </form>
    </div>
  );
}

export default RoleLeave;
