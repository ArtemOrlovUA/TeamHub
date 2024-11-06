import { useQuery } from "@tanstack/react-query";
import { getUserSkills } from "../../services/apiUser";
import { useUser } from "../authentication/useUser";

export function useGetSkills() {
  const user = useUser();

  const {
    isLoading,
    data: skillsData,
    error,
  } = useQuery({
    queryKey: ["skills", user.user.id],
    queryFn: () => getUserSkills(user.user.id),
  });

  const skills = skillsData ? skillsData[0]?.skills.split(",") : [];

  return { isLoading, skills, error };
}
