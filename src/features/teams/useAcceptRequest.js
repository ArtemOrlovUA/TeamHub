import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequestById } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useAcceptRequest() {
  const queryClient = useQueryClient();

  const { mutate: acceptRequest, isLoading } = useMutation({
    mutationFn: (requestId) => acceptRequestById(requestId),
    onSuccess: () => {
      toast.success("Запит успішно прийнято");
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("team"),
      });
    },
    onError: (error) => {
      toast.error(`Помилка: ${error.message}`);
    },
  });

  return { acceptRequest, isLoading };
}
