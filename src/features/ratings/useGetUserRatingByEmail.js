//wrtite hook to get user rating by email
import { useQuery } from "@tanstack/react-query";
import { getUserRatingByEmail } from "../../services/apiUser";

export function useGetUserRatingByEmail(email) {
  const {
    isLoading,
    data: userRating,
    error,
  } = useQuery({
    queryKey: ["rating", email],
    queryFn: () => getUserRatingByEmail(email),
    enabled: !!email,
  });

  return { isLoading, error, userRating };
}
