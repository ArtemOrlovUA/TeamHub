/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useLeave } from "./useLeave";

function RoleLeave({ role, team_id, email }) {
  const { leave } = useLeave();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    leave({ email, role, team_id });
  };

  return (
    <div>
      <p>Чи ви впевнені, що хочете покинути роль: {role}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Підтвердити</button>
      </form>
    </div>
  );
}

export default RoleLeave;
