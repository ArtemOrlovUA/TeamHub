import { useQuery } from "@tanstack/react-query";
import { getTeamsByCreator } from "../../services/apiTeam";

export function useGetTeamsByCreator(creatorId) {
  const {
    isLoading,
    data: teams,
    error,
  } = useQuery({
    queryKey: ["owned_teams", creatorId],
    queryFn: () => getTeamsByCreator(creatorId),
    enabled: !!creatorId,
  });

  return { isLoading, error, teams };
}
