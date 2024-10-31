import { useTeam } from "../features/teams/useTeam";

function TeamPage() {
  const { team } = useTeam();
  //   const { user: teamOwner } = useGetUserById(team?.uid_owner);

  return (
    <div>
      <h1>Team: {team?.teamName}</h1>

      <p>Goals: {team?.teamGoals}</p>
    </div>
  );
}

export default TeamPage;
