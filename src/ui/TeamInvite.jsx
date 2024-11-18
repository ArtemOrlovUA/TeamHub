import { Link } from "react-router-dom";
import { useAcceptInvite } from "../features/teams/useAcceptInvite";
import { useDeclineInvite } from "../features/teams/useDeclineInvite";
import { useGetTeamById } from "../features/teams/useGetTeamById";

function TeamInvite({ invite }) {
  const { team } = useGetTeamById(invite.team_id);
  const { acceptInvite } = useAcceptInvite();
  const { declineInvite } = useDeclineInvite();

  return (
    <>
      {/* Назва команди */}
      <td className="px-6 py-4 text-indigo-600 hover:underline">
        <Link to={`/team/${invite.team_id}`}>
          {team?.teamName || "Завантаження..."}
        </Link>
      </td>
      {/* Роль */}
      <td className="px-6 py-4 text-gray-800">{invite.role}</td>
      {/* Дії */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-4">
          <button
            onClick={() => acceptInvite(invite.id)}
            className="rounded-full border border-green-700 bg-green-700 px-4 py-2 font-primaryBold text-white transition hover:bg-green-900"
          >
            Прийняти
          </button>
          <button
            onClick={() => declineInvite(invite.id)}
            className="rounded-full border border-red-700 bg-red-700 px-4 py-2 font-primaryBold text-white transition hover:bg-red-900"
          >
            Відхилити
          </button>
        </div>
      </td>
    </>
  );
}

export default TeamInvite;
