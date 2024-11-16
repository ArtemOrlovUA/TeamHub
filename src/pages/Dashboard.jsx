// import { Link } from "react-router-dom";
// import { useUser } from "../features/authentication/useUser";
// import { useUserCV } from "../features/authentication/useUserCV";  
// import { useGetSkills } from "../features/userSkills/useGetSkills";
// import { useGetTeamsByCreator } from "../features/teams/useGetTeamsByCreator";
// import { useGetInvitesByEmail } from "../features/teams/useGetInvitesByEmail";
// import { useGetAllUserTeams } from "../features/teams/useGetAllUserTeams";
// import { useEffect } from "react";
// import { useDeletedTeam } from "../context/RateDeletedTeamContext";
// import { useGetUserRatingByEmail } from "../features/ratings/useGetUserRatingByEmail";

// function Dashboard() {
//   const { user } = useUser();
//   const { userRating } = useGetUserRatingByEmail(user?.email);
//   const { cvUrl } = useUserCV();
//   const { skills } = useGetSkills();
//   const { teams } = useGetTeamsByCreator(user.email);
//   const { userTeams } = useGetAllUserTeams(user.email);
//   const { personInvites } = useGetInvitesByEmail(user.email);
//   const { clearTeam } = useDeletedTeam();

//   useEffect(() => {
//     clearTeam();
//   }, []);

//   return (
//     <>
//        {cvUrl && (
//         <div>
//           <a href={cvUrl} target="_blank" rel="noopener noreferrer">Подивитися резюме</a>
//         </div>
//       )}
//       <div>Ваша пошта: {user.email}</div>
//       {skills && <div>Ваші навички: {skills?.join(", ")}</div>}
//       <div>Ваш рейтинг: {userRating && userRating[0].rating}</div>
//       {personInvites?.length > 0 && (
//         <div>
//           <Link to={"/invites"}>Подивіться нові запрошення</Link>
//         </div>
//       )}
//       <Link to={"/createTeam"}>Створити команду</Link>
//       <p>Чи</p>
//       <Link to={"/teams"}>Приєднатися до команди</Link>

//       {userTeams?.filter(
//         (userTeam) => !teams?.some((team) => team.id === userTeam.id),
//       )?.length > 0 && (
//         <div>
//           <h2>Ваші команди:</h2>
//           <div>
//             {userTeams
//               ?.filter(
//                 (userTeam) => !teams?.some((team) => team.id === userTeam.id),
//               )
//               .map((team) => (
//                 <div key={team.id}>
//                   <Link to={`/team/${team.id}`}>{team.teamName}</Link>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//       {teams?.length > 0 && (
//         <div>
//           <h2>Команди, чиїм власником є Ви:</h2>
//           <div>
//             {teams?.map((team) => (
//               <div key={team.id}>
//                 <Link to={`/team/${team.id}`}>{team.teamName}</Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dashboard;

import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useUserCV } from "../features/authentication/useUserCV";  
import { useGetSkills } from "../features/userSkills/useGetSkills";
import { useGetTeamsByCreator } from "../features/teams/useGetTeamsByCreator";
import { useGetInvitesByEmail } from "../features/teams/useGetInvitesByEmail";
import { useGetAllUserTeams } from "../features/teams/useGetAllUserTeams";
import { useEffect } from "react";
import { useDeletedTeam } from "../context/RateDeletedTeamContext";
import { useGetUserRatingByEmail } from "../features/ratings/useGetUserRatingByEmail";

function Dashboard() {
  const { user } = useUser();
  const { userRating } = useGetUserRatingByEmail(user?.email);
  const { cvUrl } = useUserCV();
  const { skills } = useGetSkills();
  const { teams } = useGetTeamsByCreator(user.email);
  const { userTeams } = useGetAllUserTeams(user.email);
  const { personInvites } = useGetInvitesByEmail(user.email);
  const { clearTeam } = useDeletedTeam();

  useEffect(() => {
    clearTeam();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#140D2D] text-white">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-[#140D2D] bg-opacity-90 px-6 py-4">
        <h1 className="mt-24 text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-10 px-6 space-y-12">
        {/* Resume Section */}
        {cvUrl && (
          <div className="bg-black bg-opacity-30 rounded-lg p-6 shadow-lg hover:bg-opacity-40 transition">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold hover:underline"
            >
              Подивитися резюме
            </a>
          </div>
        )}

        {/* User Info */}
        <div className="bg-black bg-opacity-30 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Ваші дані:</h2>
          <p className="mt-2">Email: <span className="font-semibold">{user.email}</span></p>
          {skills && (
            <p className="mt-2">Навички: <span className="font-semibold">{skills?.join(", ")}</span></p>
          )}
          <p className="mt-2">Рейтинг: <span className="font-semibold">{userRating?.[0]?.rating || "Немає даних"}</span></p>
        </div>

        {/* Invitations */}
        {personInvites?.length > 0 && (
          <div className="bg-black bg-opacity-30 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Запрошення</h2>
            <Link
              to="/invites"
              className="mt-4 inline-block rounded-lg bg-indigo-500 px-4 py-2 text-white transition hover:bg-indigo-600"
            >
              Подивитися запрошення
            </Link>
          </div>
        )}

        {/* Create or Join Teams */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/createTeam"
            className="w-full md:w-1/2 rounded-lg bg-green-500 px-4 py-6 text-center font-bold text-white shadow-lg transition hover:bg-green-600"
          >
            Створити команду
          </Link>
          <Link
            to="/teams"
            className="w-full md:w-1/2 rounded-lg bg-blue-500 px-4 py-6 text-center font-bold text-white shadow-lg transition hover:bg-blue-600"
          >
            Приєднатися до команди
          </Link>
        </div>

        {/* Teams Overview */}
        <div className="space-y-8">
          {userTeams?.filter(
            (userTeam) => !teams?.some((team) => team.id === userTeam.id)
          )?.length > 0 && (
            <div className="bg-black bg-opacity-30 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold">Ваші команди:</h2>
              <div className="mt-4 space-y-2">
                {userTeams
                  ?.filter((userTeam) => !teams?.some((team) => team.id === userTeam.id))
                  .map((team) => (
                    <Link
                      key={team.id}
                      to={`/team/${team.id}`}
                      className="block text-lg font-semibold hover:underline"
                    >
                      {team.teamName}
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {teams?.length > 0 && (
            <div className="bg-black bg-opacity-30 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold">Ваші команди:</h2>
              <div className="mt-4 space-y-2">
                {teams.map((team) => (
                  <Link
                    key={team.id}
                    to={`/team/${team.id}`}
                    className="block text-lg font-semibold hover:underline"
                  >
                    {team.teamName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#140D2D] py-4 text-center text-gray-400">
        &copy; 2024 TeamHub. Всі права захищені.
      </footer>
    </div>
  );
}

export default Dashboard;
