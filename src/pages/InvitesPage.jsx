import { useUser } from "../features/authentication/useUser";
import { useGetInvitesByEmail } from "../features/teams/useGetInvitesByEmail";
import TeamInvite from "../ui/TeamInvite";

function InvitesPage() {
  const { user } = useUser();
  const { personInvites } = useGetInvitesByEmail(user.email);

  return (
    <div>
      {personInvites?.length > 0 ? (
        <div>
          <h2>Запрошення:</h2>
          {personInvites.map((invite) => (
            <TeamInvite key={invite.id} invite={invite} />
          ))}
        </div>
      ) : (
        <div>Немає запрошень</div>
      )}
    </div>
  );
}

export default InvitesPage;
