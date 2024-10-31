import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useGetSkills } from "../features/userSkills/useGetSkills";
import { useGetTeamsByCreator } from "../features/teams/useGetTeamsByCreator";

function Dashboard() {
  const { user } = useUser();
  const { skills } = useGetSkills();
  const { teams } = useGetTeamsByCreator(user.id);
  console.log(teams);

  return (
    <>
      <div>Your email: {user.email}</div>
      {skills && <div>Your skills: {skills?.join(", ")}</div>}
      <Link to={"/createTeam"}>Створити команду</Link>
      <p>Чи</p>
      <button>Приєднатися до команди</button>

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
    </>
  );
}

export default Dashboard;
