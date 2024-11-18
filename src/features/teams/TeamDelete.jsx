// /* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import { useDeleteTeam } from "./useDeleteTeam";

// function TeamDelete({ team_id, team_name, team }) {
//   const { deleteTeam } = useDeleteTeam();

//   const { handleSubmit } = useForm();

//   const onSubmit = () => {
//     deleteTeam({ team_id, team });
//   };

//   return (
//     <div>
//       <p>Чи ви впевнені, що хочете видалити команду: {team_name} </p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <button type="submit">Підтвердити видалення</button>
//       </form>
//     </div>
//   );
// }

// export default TeamDelete;

/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useDeleteTeam } from "./useDeleteTeam";

function TeamDelete({ team_id, team_name, team }) {
  const { deleteTeam } = useDeleteTeam();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    deleteTeam({ team_id, team });
  };

  return (
    <div className="max-w-md mx-auto rounded-lg bg-indigo-950 p-6 shadow-lg">
      <h2 className="text-2xl font-primaryBold text-indigo-50 mb-4">
        Видалити команду
      </h2>
      <p className="text-indigo-200 mb-6">
        Чи ви впевнені, що хочете видалити команду:{" "}
        <span className="font-primaryBold">{team_name}</span>?
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <button
          type="submit"
          className="w-full rounded-full bg-red-500 px-6 py-3 font-primaryBold text-indigo-50 shadow-lg transition hover:bg-red-700"
        >
          Підтвердити видалення
        </button>
      </form>
    </div>
  );
}

export default TeamDelete;
