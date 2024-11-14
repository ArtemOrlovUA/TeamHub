import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/apiUser";

export function useUserProfile() {
  const { id } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUserById(id),
    retry: false,
  });

  return { isLoading, error, user };
}
