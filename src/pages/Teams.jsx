import TeamListItem from "../features/teams/TeamListItem";
import { useGetAllTeams } from "../features/teams/useGetAllTeams";

function Teams() {
  const { allTeams, isLoading, error } = useGetAllTeams();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="font-primaryBold text-2xl text-gray-500">
          Завантаження...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="font-primaryBold text-xl text-red-500">
          Сталася помилка: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 mt-24 font-primaryBold text-3xl font-bold text-indigo-950">
        Усі команди
      </h1>
      <table className="min-w-full divide-y divide-gray-500 bg-indigo-50 shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="text-l bg-indigo-50 px-6 py-3 text-left font-primaryBold font-medium uppercase tracking-wider text-gray-900"
            >
              Назва команди
            </th>
            <th
              scope="col"
              className="text-l bg-indigo-50 px-6 py-3 text-left font-primaryBold font-medium uppercase tracking-wider text-gray-900"
            >
              Власник
            </th>
            <th
              scope="col"
              className="text-l bg-indigo-50 px-6 py-3 text-right font-primaryBold font-medium uppercase tracking-wider text-gray-900"
            >
              Дії
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 font-primaryRegular text-l">
          {allTeams?.map((team) => (
            <TeamListItem
              key={team.id}
              team_id={team.id}
              team_name={team.teamName}
              email_owner={team.email_owner}
            />
          ))}
        </tbody>
      </table>
      {/* Footer */}
      <footer className="mt-auto py-4 text-center font-primaryRegular text-gray-900">
        &copy; 2024 TeamHub. Всі права захищені.
      </footer>
    </div>
  );
}

export default Teams;
