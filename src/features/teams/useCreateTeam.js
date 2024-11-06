import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeam as createTeamApi } from "../../services/apiTeam";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const Navigate = useNavigate();

  const { mutate: createTeam, isLoading: isCreating } = useMutation({
    mutationFn: ({
      creatorEmail,
      roles,
      teamName,
      teamGoals,
      deadline_date,
    }) => {
      return createTeamApi(
        creatorEmail,
        roles,
        teamName,
        teamGoals,
        deadline_date,
      );
    },
    onSuccess: () => {
      toast.success("Команду успішно створено");
      Navigate("/dashboard");
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { createTeam, isCreating };
}
