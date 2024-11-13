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
    <div>
      <p>Чи ви впевнені, що хочете покинути роль: {role}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Підтвердити</button>
      </form>
    </div>
  );
}

export default RoleLeave;
