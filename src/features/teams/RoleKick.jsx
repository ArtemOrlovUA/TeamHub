// /* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import { useContext } from "react";
// import { ModalContext } from "../../ui/Modal";
// import { useKick } from "./useKick";
// import { useGetUserByEmail } from "./useGetUserByEmail";

// function RoleKick({ role, team_id, emailToKick }) {
//   const { kick } = useKick();
//   const { handleSubmit } = useForm();
//   const { closeModal } = useContext(ModalContext);

//   const { user } = useGetUserByEmail(emailToKick);
//   console.log(user);

//   const onSubmit = () => {
//     kick({ emailToKick, role, team_id });
//     closeModal();
//   };

//   return (
//     <div>
//       <p>
//         Чи ви впевнені, що хочете видалити {user && user[0]?.fullName} з ролі{" "}
//         {role}?
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <button type="submit">Підтвердити</button>
//       </form>
//     </div>
//   );
// }

// export default RoleKick;

/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useKick } from "./useKick";
import { useGetUserByEmail } from "./useGetUserByEmail";

function RoleKick({ role, team_id, emailToKick }) {
  const { kick } = useKick();
  const { handleSubmit } = useForm();
  const { closeModal } = useContext(ModalContext);

  const { user } = useGetUserByEmail(emailToKick);

  const onSubmit = () => {
    kick({ emailToKick, role, team_id });
    closeModal();
  };

  return (
    <div className="max-w-md mx-auto rounded-lg bg-indigo-950 p-6 shadow-lg">
      <h2 className="text-2xl font-primaryBold text-indigo-50 mb-4">
        Видалити учасника
      </h2>
      <p className="text-indigo-200 mb-6">
        Чи ви впевнені, що хочете видалити{" "}
        <span className="font-primaryBold">
          {user && user[0]?.fullName ? user[0]?.fullName : "користувача"}
        </span>{" "}
        з ролі <span className="font-primaryBold">{role}</span>?
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

export default RoleKick;
