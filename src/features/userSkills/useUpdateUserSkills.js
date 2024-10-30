import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserSkills as updateUserSkillsApi } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateUserSkills() {
  const navigate = useNavigate();

  const { mutate: updateUserSkills, isLoading: isUpdatingSkills } = useMutation(
    {
      mutationFn: ({ uid, skills }) => updateUserSkillsApi({ uid, skills }),
      onSuccess: () => {
        navigate("/dashboard", { replace: true });
        toast.success("Навички успішно оновлено");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Виникла помилка при оновленні навичок");
      },
    },
  );

  return { updateUserSkills, isUpdatingSkills };
}
