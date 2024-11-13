import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { upvoteUserRating } from "../../services/apiUser";

export function useUpvote() {
  const queryClient = useQueryClient();

  const { mutate: upvote, isLoading } = useMutation({
    mutationFn: (user_email) => upvoteUserRating(user_email),
    onSuccess: () => {
      toast.success(
        "Ви успішно проголосували за підвищення рейтингу користувача",
      );

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("user"),
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(
        `Нажаль, не вийшло проголосувати. Спробуйте, будь ласка, ще раз`,
      );
    },
  });

  return { upvote, isLoading };
}
