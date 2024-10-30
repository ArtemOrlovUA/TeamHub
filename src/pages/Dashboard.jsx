import { useUser } from "../features/authentication/useUser";
import { useGetSkills } from "../features/userSkills/useGetSkills";
import { getUserSkills } from "../services/apiUser";
import { useLogout } from "../features/authentication/useLogout";

function Dashboard() {
  const { user } = useUser();
  const { skills } = useGetSkills();
  const { logout } = useLogout();

  console.log(skills);

  return (
    <>
      <div>Hello, {user.user_metadata.fullName}!</div>
      <div>Your email: {user.email}</div>
      {skills && <div>Your skills: {skills?.join(", ")}</div>}
      <button onClick={() => logout()}>Вийти</button>
    </>
  );
}

export default Dashboard;
