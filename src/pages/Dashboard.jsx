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
  const { clearTeam } = useDeletedTeam();

  useEffect(() => {
    clearTeam();
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900">
      {/* Main Content */}
      <main className="container mx-auto mt-24 grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
        {/* User Info and Actions */}
        <section className="col-span-1 space-y-6 rounded-lg bg-white p-6 shadow">
          <h2 className="font-primaryBold text-2xl text-indigo-950">
            Ваші дані
          </h2>
          <p className="text-lg font-primaryRegular">
            <strong>Email:</strong> {user.email}
          </p>
          {skills && (
            <p className="text-lg font-primaryRegular">
              <strong>Навички:</strong> {skills.join(", ")}
            </p>
          )}
          <p className="text-lg font-primaryRegular">
            <strong>Рейтинг:</strong> {userRating?.[0]?.rating || "Немає даних"}
          </p>
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-full border border-indigo-950 bg-indigo-950 px-8 py-3 font-primaryBold text-white shadow transition hover:bg-indigo-50 hover:text-indigo-950"
            >
              Подивитися резюме
            </a>
          )}
          <div className="flex flex-col gap-4">
            <Link
              to="/createTeam"
              className="mt-2 inline-block rounded-full border border-indigo-950 px-4 py-3 text-center font-primaryBold text-indigo-950 shadow-lg hover:bg-green-900 hover:text-white"
            >
              Створити команду
            </Link>
            <Link
              to="/teams"
              className="mt-2 inline-block rounded-full border border-indigo-950 px-4 py-3 text-center font-primaryBold text-indigo-950 shadow-lg hover:bg-blue-900 hover:text-white"
            >
              Приєднатися до команди
            </Link>
          </div>
        </section>

        {/* All Teams */}
        <section className="col-span-2 space-y-6 rounded-lg bg-white p-6 shadow">
          <h2 className="font-primaryBold text-2xl text-indigo-950">
            Всі команди
          </h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-indigo-50 shadow">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-primaryBold text-indigo-950">
                    Назва команди
                  </th>
                  <th className="px-6 py-3 text-right font-primaryBold text-indigo-950">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-primaryRegular">
                {userTeams?.map((team) => (
                  <tr key={team.id}>
                    <td className="px-6 py-4 text-indigo-950">
                      {team.teamName}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/team/${team.id}`}
                        className="mt-2 inline-block rounded-full border bg-indigo-800 px-4 py-2 text-white hover:bg-indigo-900"
                      >
                        Детальніше
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Teams Created by User */}
        <section className="col-span-3 space-y-6 rounded-lg bg-white p-6 shadow">
          <h2 className="font-primaryBold text-2xl text-indigo-950">
            Команди, створені вами
          </h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-indigo-50 shadow">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-primaryBold text-indigo-950">
                    Назва команди
                  </th>
                  <th className="px-6 py-3 text-right font-primaryBold text-indigo-950">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-primaryRegular">
                {teams?.map((team) => (
                  <tr key={team.id}>
                    <td className="px-6 py-4 text-indigo-950">
                      {team.teamName}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/team/${team.id}`}
                        className="mt-2 inline-block rounded-full border bg-indigo-800 px-4 py-2 text-white hover:bg-indigo-900"
                      >
                        Детальніше
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center font-primaryRegular text-indigo-950">
        &copy; 2024 TeamHub. Всі права захищені.
      </footer>
    </div>
  );
}

export default Dashboard;
