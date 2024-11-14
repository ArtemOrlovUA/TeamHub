/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAcceptRequest } from "../features/teams/useAcceptRequest";
import { useDeclineRequest } from "../features/teams/useDeclineRequest";
import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";

function TeamRequest({ request }) {
  const { acceptRequest } = useAcceptRequest();
  const { declineRequest } = useDeclineRequest();
  const { user } = useGetUserByEmail(request.user_email);

  return (
    <div key={request.id} className="mb-2 bg-yellow-300">
      <div>
        <Link to={`/profile/${user && user[0]?.id}`}>
          {user && user[0]?.fullName}
        </Link>
      </div>
      <div>Роль: {request.role}</div>
      <button onClick={() => acceptRequest(request.id)}>Прийняти</button>
      <button onClick={() => declineRequest(request.id)}>Відхилити</button>
    </div>
  );
}

export default TeamRequest;
