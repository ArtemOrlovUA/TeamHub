import { useUser } from "../features/authentication/useUser";
import { useGetInvitesByEmail } from "../features/teams/useGetInvitesByEmail";
import TeamInvite from "../ui/TeamInvite";

function InvitesPage() {
  const { user } = useUser();
  const { personInvites } = useGetInvitesByEmail(user.email);

  return (
    <div className="container mx-auto p-6 bg-indigo-50">
      <h1 className="mb-6 mt-24 font-primaryBold text-3xl font-bold text-indigo-950">
        Ваші запрошення
      </h1>
      {personInvites?.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-l font-primaryBold font-medium uppercase tracking-wider text-gray-900"
              >
                Назва команди
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-l font-primaryBold font-medium uppercase tracking-wider text-gray-900"
              >
                Роль
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-l font-primaryBold font-medium uppercase tracking-wider text-gray-900"
              >
                Дії
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-primaryRegular text-l">
            {personInvites.map((invite) => (
              <tr key={invite.id}>
                <TeamInvite invite={invite} />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-12">
          <h2 className="mb-4 font-primaryBold text-2xl text-gray-900">
            Немає запрошень
          </h2>
          <p className="font-primaryRegular text-lg text-gray-600">
            Схоже, вас поки що ніхто не запросив до команди.
          </p>
        </div>
      )}
    </div>
  );
}

export default InvitesPage;
