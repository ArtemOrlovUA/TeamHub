// /* eslint-disable react/prop-types */
// import { useEffect, useContext } from "react";
// import { ModalContext } from "../../ui/Modal";
// import { useForm } from "react-hook-form";
// import { useEditTeam } from "./useEditTeam";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}.${month}.${year}`;
// };

// const EditTeamForm = ({ team_id, team_name, team_goal, deadline }) => {
//   const { register, handleSubmit, setValue, formState } = useForm();
//   const { errors } = formState;
//   const { closeModal } = useContext(ModalContext);
//   const { editTeam } = useEditTeam();

//   useEffect(() => {
//     setValue("name", team_name);
//     setValue("goals", team_goal);
//     if (deadline) {
//       const formattedDate = deadline.split(".").reverse().join("-");
//       setValue("timeline", formattedDate);
//     }
//   }, [team_name, team_goal, deadline, setValue]);

//   const onSubmit = (data) => {
//     const { name, goals, timeline } = data;
//     const formattedTimeline = formatDate(timeline);
//     editTeam({ team_id, name, goals, formattedTimeline });
//     closeModal();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Назва команди:</label>
//         <input
//           {...register("name", {
//             required: "Це поле має бути заповненим",
//           })}
//           placeholder="Назва команди"
//         />
//         {errors?.name?.message && <p>{errors.name.message}</p>}
//       </div>
//       <div>
//         <label>Ціль команди:</label>
//         <input
//           {...register("goals", {
//             required: "Це поле має бути заповненим",
//           })}
//           placeholder="Ціль команди"
//         />
//         {errors?.goals?.message && <p>{errors.goals.message}</p>}
//       </div>
//       <div>
//         <label>Часовий проміжок:</label>
//         <input
//           type="date"
//           {...register("timeline", {
//             required: "Це поле має бути заповненим",
//             validate: (value) => {
//               const selectedDate = new Date(value);
//               const minDate = new Date();
//               minDate.setDate(minDate.getDate() + 3);
//               return (
//                 selectedDate >= minDate ||
//                 "Часовий проміжок має бути хоча б три дні від сьогоднішньої дати"
//               );
//             },
//           })}
//         />
//         {errors?.timeline?.message && <p>{errors.timeline.message}</p>}
//       </div>
//       <button type="submit">Підтвердити редагування даних</button>
//     </form>
//   );
// };

// export default EditTeamForm;

/* eslint-disable react/prop-types */
import { useEffect, useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { useEditTeam } from "./useEditTeam";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const EditTeamForm = ({ team_id, team_name, team_goal, deadline }) => {
  const { register, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState;
  const { closeModal } = useContext(ModalContext);
  const { editTeam } = useEditTeam();

  useEffect(() => {
    setValue("name", team_name);
    setValue("goals", team_goal);
    if (deadline) {
      const formattedDate = deadline.split(".").reverse().join("-");
      setValue("timeline", formattedDate);
    }
  }, [team_name, team_goal, deadline, setValue]);

  const onSubmit = (data) => {
    const { name, goals, timeline } = data;
    const formattedTimeline = formatDate(timeline);
    editTeam({ team_id, name, goals, formattedTimeline });
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6 rounded-lg bg-indigo-950 p-6 shadow-lg"
    >
      <h2 className="text-2xl font-primaryBold text-indigo-50">
        Редагувати дані команди
      </h2>

      {/* Team Name */}
      <div>
        <label className="block text-sm font-primaryRegular text-indigo-200">
          Назва команди:
        </label>
        <input
          {...register("name", {
            required: "Це поле має бути заповненим",
          })}
          placeholder="Назва команди"
          className="mt-2 w-full rounded-lg border border-indigo-500 bg-indigo-50 px-4 py-2 font-primaryRegular text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors?.name?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Team Goal */}
      <div>
        <label className="block text-sm font-primaryRegular text-indigo-200">
          Ціль команди:
        </label>
        <input
          {...register("goals", {
            required: "Це поле має бути заповненим",
          })}
          placeholder="Ціль команди"
          className="mt-2 w-full rounded-lg border border-indigo-500 bg-indigo-50 px-4 py-2 font-primaryRegular text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors?.goals?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.goals.message}</p>
        )}
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-primaryRegular text-indigo-200">
          Часовий проміжок:
        </label>
        <input
          type="date"
          {...register("timeline", {
            required: "Це поле має бути заповненим",
            validate: (value) => {
              const selectedDate = new Date(value);
              const minDate = new Date();
              minDate.setDate(minDate.getDate() + 3);
              return (
                selectedDate >= minDate ||
                "Часовий проміжок має бути хоча б три дні від сьогоднішньої дати"
              );
            },
          })}
          className="mt-2 w-full rounded-lg border border-indigo-500 bg-indigo-50 px-4 py-2 font-primaryRegular text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors?.timeline?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.timeline.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-indigo-50 px-6 py-3 font-primaryBold text-indigo-950 shadow-lg transition hover:bg-indigo-800 hover:text-indigo-50"
      >
        Підтвердити редагування даних
      </button>
    </form>
  );
};

export default EditTeamForm;
