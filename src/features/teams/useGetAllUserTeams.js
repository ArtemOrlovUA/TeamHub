import { useQuery } from "@tanstack/react-query";
import { getTeamsByUser } from "../../services/apiTeam";

export function useGetAllUserTeams(userEmail) {
  const {
    isLoading,
    data: userTeams,
    error,
  } = useQuery({
    queryKey: ["user_teams", userEmail],
    queryFn: () => getTeamsByUser(userEmail),
    enabled: !!userEmail,
  });

  return { isLoading, error, userTeams };
}
