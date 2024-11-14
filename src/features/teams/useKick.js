import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kickUserFromTeam } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useKick() {
  const queryClient = useQueryClient();

  const { mutate: kick, isLoading } = useMutation({
    mutationFn: ({ emailToKick, role, team_id }) =>
      kickUserFromTeam({ role, emailToKick, team_id }),
    onSuccess: () => {
      toast.success("Користувача успішно видалено");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("team"),
      });
    },
    onError: (error) => {
      console.error("Error kicking user:", error);
      toast.error("Не вдалося видалити. Будь ласка, спробуйте ще раз.");
    },
  });

  return { kick, isLoading };
}
