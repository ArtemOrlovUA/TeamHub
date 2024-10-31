import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTeam } from "../../services/apiTeam";

export function useTeam() {
  const { teamId } = useParams();

  const {
    isLoading,
    data: team,
    error,
  } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeam(teamId),
    retry: false,
  });

  return { isLoading, error, team };
}
