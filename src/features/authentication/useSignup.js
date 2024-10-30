import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => {
      navigate("/skills", { replace: true });
      toast.success("Реєстрація пройшла успішно!");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { signup, isSigningUp };
}
