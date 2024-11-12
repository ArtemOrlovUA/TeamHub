import { useQuery } from "@tanstack/react-query";
import { getUserSkills } from "../../services/apiUser";
import { useUser } from "../authentication/useUser";

export function useGetSkills() {
  const { user, isLoading: isUserLoading } = useUser();

  const {
    isLoading: isSkillsLoading,
    data: skillsData,
    error,
  } = useQuery({
    queryKey: ["skills", user?.id],
    queryFn: () => (user ? getUserSkills(user.id) : Promise.resolve([])), // only query if user is available
    enabled: !!user, // enable query only when user is defined
  });

  const skills = skillsData ? skillsData[0]?.skills.split(",") : [];

  return { isLoading: isUserLoading || isSkillsLoading, skills, error };
}
