import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const updateData = {
        email: data.email,
        fullName: data.fullName,
        linkedin: data.linkedin,
        avatar: data.avatar,
        cv: data.cv,
      };
      return await updateCurrentUser(updateData);
    },
    onSuccess: () => {
      toast.success("Дані користувача успішно оновлено");
      queryClient.invalidateQueries({ queryKey: "user" });
      navigate("/dashboard");
    },
  });

  return { updateUser, isUpdating };
}
