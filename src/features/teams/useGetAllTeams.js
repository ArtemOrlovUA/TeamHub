import { useQuery } from "@tanstack/react-query";
import { getAllTeams } from "../../services/apiTeam";

export function useGetAllTeams() {
  const {
    isLoading,
    data: allTeams,
    error,
  } = useQuery({
    queryKey: ["all_teams"],
    queryFn: () => getAllTeams(),
  });

  return { isLoading, error, allTeams };
}
