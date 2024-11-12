import { useDeletedTeam } from "../context/RateDeletedTeamContext";

function RateTeamMembersPage() {
  const { team } = useDeletedTeam();
  console.log("team", team);

  return <div></div>;
}

export default RateTeamMembersPage;
