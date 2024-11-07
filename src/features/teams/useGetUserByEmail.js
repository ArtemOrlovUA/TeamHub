import { useQuery } from "@tanstack/react-query";
import { getUserByEmail } from "../../services/apiUser";

export function useGetUserByEmail(user_email) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", user_email],
    queryFn: () => getUserByEmail(user_email),
    enabled: !!user_email,
  });

  return { isLoading, error, user };
}
