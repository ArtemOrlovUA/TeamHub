import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const updateData = {
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
    },
  });

  return { updateUser, isUpdating };
}
