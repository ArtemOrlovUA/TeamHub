import { useQuery } from "@tanstack/react-query";
import { getRequestsByTeamId } from "../../services/apiTeam";

export function useGetRequestsByTeamId(team_id) {
  const {
    isLoading,
    data: teamRequests,
    error,
  } = useQuery({
    queryKey: ["requests", team_id],
    queryFn: () => getRequestsByTeamId(team_id),
    enabled: !!team_id,
  });

  return { isLoading, error, teamRequests };
}
