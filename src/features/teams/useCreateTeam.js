import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeam as createTeamApi } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useCreateTeam() {
  const queryClient = useQueryClient();

  const { mutate: createTeam, isLoading: isCreating } = useMutation({
    mutationFn: ({ creatorId, roles, teamName, teamGoals, deadline_date }) => {
      return createTeamApi(
        creatorId,
        roles,
        teamName,
        teamGoals,
        deadline_date,
      );
    },
    onSuccess: () => {
      toast.success("Команду успішно створено");
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
