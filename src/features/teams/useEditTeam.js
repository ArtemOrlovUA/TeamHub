import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeamById } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useEditTeam() {
  const queryClient = useQueryClient();

  const { mutate: editTeam, isLoading } = useMutation({
    mutationFn: ({ team_id, name, goals, formattedTimeline: deadline }) =>
      updateTeamById({ team_id, name, goals, deadline }),
    onSuccess: () => {
      toast.success("Дані команди успішно змінені");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("team"),
      });
    },
    onError: (error) => {
      console.error("Error updating team data:", error);
      toast.error(
        "Не вдалося змінити дані команди. Будь ласка, спробуйте ще раз.",
      );
    },
  });

  return { editTeam, isLoading };
}
