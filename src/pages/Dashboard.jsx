import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useGetSkills } from "../features/userSkills/useGetSkills";
import { useGetTeamsByCreator } from "../features/teams/useGetTeamsByCreator";
import { useGetInvitesByEmail } from "../features/teams/useGetInvitesByEmail";

function Dashboard() {
  const { user } = useUser();
  const { skills } = useGetSkills();
  const { teams } = useGetTeamsByCreator(user.email);
  const { personInvites } = useGetInvitesByEmail(user.email);

  return (
    <>
      <div>Ваша пошта: {user.email}</div>
      {skills && <div>Ваші навички: {skills?.join(", ")}</div>}
      {personInvites?.length > 0 && (
        <div>
          <Link to={"/invites"}>Подивіться нові запрошення</Link>
        </div>
      )}
      <Link to={"/createTeam"}>Створити команду</Link>
      <p>Чи</p>
      <button>Приєднатися до команди</button>

      {teams?.length > 0 && (
        <div>
          <h2>Ваші команди:</h2>
          <div>
            {teams?.map((team) => (
              <div key={team.id}>
                <Link to={`/team/${team.id}`}>{team.teamName}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
