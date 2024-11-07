import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInviteById } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useAcceptInvite() {
  const queryClient = useQueryClient();

  const { mutate: acceptInvite, isLoading: isAcceptingInvite } = useMutation({
    mutationFn: (inviteId) => acceptInviteById(inviteId),
    onSuccess: () => {
      toast.success("Запрошення успішно прийнято");
      queryClient.invalidateQueries({
        queryKey: ["invites"],
      });
    },
    onError: (error) => {
      toast.error(`Помилка: ${error.message}`);
    },
  });

  return { acceptInvite, isAcceptingInvite };
}
