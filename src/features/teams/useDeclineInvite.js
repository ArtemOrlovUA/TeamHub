import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineInviteById } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useDeclineInvite() {
  const queryClient = useQueryClient();

  const { mutate: declineInvite, isLoading: isDecliningInvite } = useMutation({
    mutationFn: (inviteId) => declineInviteById(inviteId),
    onSuccess: () => {
      toast.success("Запрошення успішно відхилено");
      queryClient.invalidateQueries({
        queryKey: ["invites"],
      });
    },
    onError: (error) => {
      toast.error(`Помилка: ${error.message}`);
    },
  });

  return { declineInvite, isDecliningInvite };
}
