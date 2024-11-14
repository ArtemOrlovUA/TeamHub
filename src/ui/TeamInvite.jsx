/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAcceptInvite } from "../features/teams/useAcceptInvite";
import { useDeclineInvite } from "../features/teams/useDeclineInvite";
import { useGetTeamById } from "../features/teams/useGetTeamById";

function TeamInvite({ invite }) {
  const { team } = useGetTeamById(invite.team_id);
  const { acceptInvite } = useAcceptInvite();
  const { declineInvite } = useDeclineInvite();

  return (
    <div key={invite.id} className="mb-2 bg-yellow-300">
      <div>
        <Link to={`/team/${invite.team_id}`}>
          Від команди: {team?.teamName}
        </Link>
      </div>
      <div>Роль: {invite.role}</div>
      <button onClick={() => acceptInvite(invite.id)}>Прийняти</button>
      <button onClick={() => declineInvite(invite.id)}>Відхилити</button>
    </div>
  );
}

export default TeamInvite;
