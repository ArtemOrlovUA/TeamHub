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
    <div>
      <p>Чи ви впевнені, що хочете видалити команду: {team_name} </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Підтвердити видалення</button>
      </form>
    </div>
  );
}

export default TeamDelete;
