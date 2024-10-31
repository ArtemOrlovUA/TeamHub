import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiUser";

export function useGetUserById(user_id) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUserById(user_id),
    enabled: !!user_id,
  });

  return { isLoading, error, user };
}
