import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeam as deleteTeamApi } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTeam } = useMutation({
    mutationFn: (id) => deleteTeamApi(id),
    onSuccess: (team_id) => {
      console.log(team_id);
      toast.success("Команда успішно видалена");
      queryClient.invalidateQueries({ queryKey: ["team"] });
      queryClient.invalidateQueries({ queryKey: ["team", team_id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteTeam };
}
