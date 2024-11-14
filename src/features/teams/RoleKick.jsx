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
  console.log(user);

  const onSubmit = () => {
    kick({ emailToKick, role, team_id });
    closeModal();
  };

  return (
    <div>
      <p>
        Чи ви впевнені, що хочете видалити {user && user[0]?.fullName} з ролі{" "}
        {role}?
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Підтвердити</button>
      </form>
    </div>
  );
}

export default RoleKick;
