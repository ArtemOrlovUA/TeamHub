import { useMutation } from "@tanstack/react-query";
import { createRequest } from "../../services/apiTeam";
import toast from "react-hot-toast";

export function useRequest() {
  const { mutate: request, isLoading } = useMutation({
    mutationFn: ({ user_email, team_id, role, onCloseModal }) => {
      createRequest({ user_email, team_id, role });
      onCloseModal();
    },
    onSuccess: () => {
      toast.success("Запит успішно надіслано!");
    },
    onError: (error) => {
      console.error("Error creating request:", error);
      toast.error("Не вдалося надіслати запит. Будь ласка, спробуйте ще раз.");
    },
  });

  return { request, isLoading };
}
