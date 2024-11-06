import { useQuery } from "@tanstack/react-query";
import { getInvitesByEmail } from "../../services/apiTeam";

export function useGetInvitesByEmail(email) {
  const {
    isLoading,
    data: personInvites,
    error,
  } = useQuery({
    queryKey: ["invites", email],
    queryFn: () => getInvitesByEmail(email),
    enabled: !!email,
  });

  return { isLoading, error, personInvites };
}
