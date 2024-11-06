import { useMutation } from "@tanstack/react-query";
import { createInvite as createInviteApi } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useInvite() {
  const { mutate: invite, isLoading: isInviting } = useMutation({
    mutationFn: ({ email, role, team_id, status }) =>
      createInviteApi({ email, role, team_id, status }),
    onSuccess: () => {
      toast.success("Успішно запрошено!");
    },
    onError: (error) => {
      console.error("Error creating invite:", error);
      toast.error(
        "Не вдалося запросити. Будь ласка, перевірте електрону пошту та спробуйте ще раз.",
      );
    },
  });

  return { invite, isInviting };
}
