import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineRequestById } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useDeclineRequest() {
  const queryClient = useQueryClient();

  const { mutate: declineRequest, isLoading } = useMutation({
    mutationFn: (requestId) => declineRequestById(requestId),
    onSuccess: () => {
      toast.success("Запит успішно відхилено");
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
    onError: (error) => {
      toast.error(`Помилка: ${error.message}`);
    },
  });

  return { declineRequest, isLoading };
}
