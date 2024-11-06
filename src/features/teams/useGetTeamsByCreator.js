import { useQuery } from "@tanstack/react-query";
import { getTeamsByCreator } from "../../services/apiTeam";

export function useGetTeamsByCreator(creatorEmail) {
  const {
    isLoading,
    data: teams,
    error,
  } = useQuery({
    queryKey: ["owned_teams", creatorEmail],
    queryFn: () => getTeamsByCreator(creatorEmail),
    enabled: !!creatorEmail,
  });

  return { isLoading, error, teams };
}
