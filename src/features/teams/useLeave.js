import { useMutation } from "@tanstack/react-query";
import { removeUserFromTeam } from "../../services/apiTeam";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLeave() {
  const navigate = useNavigate();

  const { mutate: leave, isLoading: isLeaving } = useMutation({
    mutationFn: ({ email, role, team_id }) =>
      removeUserFromTeam({ email, role, team_id }),
    onSuccess: () => {
      toast.success("Роль успішно покинута!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error leaving team:", error);
      toast.error("Не вдалося покинути роль. Будь ласка, спробуйте ще раз.");
    },
  });

  return { leave, isLeaving };
}
