// /* eslint-disable react/prop-types */
// import { useContext } from "react";
// import { ModalContext } from "../../ui/Modal";
// import { useForm } from "react-hook-form";
// import { useInvite } from "./useInvite";

// function RoleInvite({ role, team_id }) {
//   const { invite } = useInvite();

//   const { closeModal } = useContext(ModalContext);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = (data) => {
//     invite({
//       email: data.email,
//       role: role,
//       team_id,
//       status: "pending",
//     });
//     reset();
//     closeModal();
//   };

//   return (
//     <div>
//       <p>Введіть пошту людини, котру ви хочете запросити на роль: {role}</p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="email"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Invalid email format",
//             },
//           })}
//         />

//         {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

//         <button type="submit">Запросити</button>
//       </form>
//     </div>
//   );
// }

// export default RoleInvite;


/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { useInvite } from "./useInvite";

function RoleInvite({ role, team_id }) {
  const { invite } = useInvite();
  
  const { closeModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    invite({
      email: data.email,
      role: role,
      team_id,
      status: "pending",
    });
    reset();
    closeModal();
  };

  return (
    <div className="max-w-md mx-auto rounded-lg bg-indigo-950 p-6 shadow-lg">
      <h2 className="text-2xl font-primaryBold text-indigo-50 mb-4">
        Запросити учасника
      </h2>
      <p className="mb-6 text-indigo-200">
        Введіть пошту людини, котру ви хочете запросити на роль:{" "}
        <span className="font-primaryBold">{role}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-primaryRegular text-indigo-200">
            Електронна пошта:
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="example@domain.com"
            className="mt-2 w-full rounded-lg border border-indigo-500 bg-indigo-50 px-4 py-2 font-primaryRegular text-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-indigo-50 px-6 py-3 font-primaryBold text-indigo-950 shadow-lg transition hover:bg-indigo-800 hover:text-indigo-50"
        >
          Запросити
        </button>
      </form>
    </div>
  );
}

export default RoleInvite;
