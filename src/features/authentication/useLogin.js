import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoadingAuth } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Авторизація не вдалася: невірний логін або пароль");
    },
  });

  return { login, isLoadingAuth };
}
