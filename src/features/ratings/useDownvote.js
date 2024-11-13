import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { downvoteUserRating } from "../../services/apiUser";

export function useDownvote() {
  const queryClient = useQueryClient();

  const { mutate: downvote, isLoading } = useMutation({
    mutationFn: (user_email) => downvoteUserRating(user_email),
    onSuccess: () => {
      toast.success(
        "Ви успішно проголосували за зниження рейтингу користувача",
      );

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("user"),
      });
    },
    onError: () => {
      toast.error(
        `Нажаль, не вийшло проголосувати. Спробуйте, будь ласка, ще раз`,
      );
    },
  });

  return { downvote, isLoading };
}
