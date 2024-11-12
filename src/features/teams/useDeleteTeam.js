import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeam as deleteTeamApi } from "../../services/apiTeam";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useDeletedTeam } from "../../context/RateDeletedTeamContext";

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { saveTeam } = useDeletedTeam();

  const { isLoading: isDeleting, mutate: deleteTeam } = useMutation({
    mutationFn: ({ team_id, team }) => {
      console.log(team);
      deleteTeamApi(team_id);
      saveTeam(team);
    },
    onSuccess: (team_id) => {
      console.log(team_id);
      toast.success("Команда успішно видалена");
      queryClient.invalidateQueries({ queryKey: ["team"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team", team_id] });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteTeam };
}
