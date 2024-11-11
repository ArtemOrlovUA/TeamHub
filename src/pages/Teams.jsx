import TeamListItem from "../features/teams/TeamListItem";
import { useGetAllTeams } from "../features/teams/useGetAllTeams";

function Teams() {
  const { allTeams } = useGetAllTeams();
  console.log(allTeams);

  return (
    <table>
      <thead>
        <tr>
          <th>Назва команди</th>
          <th>Власник</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {allTeams?.map((team) => (
          <TeamListItem
            key={team.id}
            team_id={team.id}
            team_name={team.teamName}
            email_owner={team.email_owner}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Teams;
