import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "../../services/apiTeam";

export function useGetTeamById(team_id) {
  const {
    isLoading,
    data: team,
    error,
  } = useQuery({
    queryKey: ["team", team_id],
    queryFn: () => getTeamById(team_id),
    enabled: !!team_id,
  });

  return { isLoading, error, team };
}
