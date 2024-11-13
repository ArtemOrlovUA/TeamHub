import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserSkills as updateUserSkillsApi } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateUserSkills() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateUserSkills, isLoading: isUpdatingSkills } = useMutation(
    {
      mutationFn: ({ uid, skills }) => updateUserSkillsApi({ uid, skills }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "user" });
        navigate("/dashboard", { replace: true });
        toast.success("Дані користувача успішно оновлено");
      },
      onError: (error) => {
        console.error(error);
        toast.error("An error occurred while updating skills");
      },
    },
  );

  return { updateUserSkills, isUpdatingSkills };
}
