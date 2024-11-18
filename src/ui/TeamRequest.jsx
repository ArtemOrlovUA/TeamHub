// /* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
// import { useAcceptRequest } from "../features/teams/useAcceptRequest";
// import { useDeclineRequest } from "../features/teams/useDeclineRequest";
// import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";

// function TeamRequest({ request }) {
//   const { acceptRequest } = useAcceptRequest();
//   const { declineRequest } = useDeclineRequest();
//   const { user } = useGetUserByEmail(request.user_email);

//   return (
//     <div key={request.id} className="mb-2 bg-yellow-300">
//       <div>
//         <Link to={`/profile/${user && user[0]?.id}`}>
//           {user && user[0]?.fullName}
//         </Link>
//       </div>
//       <div>Роль: {request.role}</div>
//       <button onClick={() => acceptRequest(request.id)}>Прийняти</button>
//       <button onClick={() => declineRequest(request.id)}>Відхилити</button>
//     </div>
//   );
// }

// export default TeamRequest;

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
    <div
      key={request.id}
      className="mb-4 rounded-lg bg-indigo-950 p-6 shadow-md"
    >
      <div className="mb-4 flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-indigo-50" />
        <div>
          <Link
            to={`/profile/${user && user[0]?.id}`}
            className="text-xl font-primaryBold text-indigo-50 hover:underline"
          >
            {user && user[0]?.fullName}
          </Link>
          <p className="text-sm font-primaryRegular text-indigo-200">
            {request.user_email}
          </p>
        </div>
      </div>
      <div className="mb-4 text-lg font-primaryRegular text-indigo-50">
        <strong>Роль:</strong> {request.role}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => acceptRequest(request.id)}
          className="rounded-full border border-indigo-50 bg-indigo-50 px-4 py-2 font-primaryBold text-indigo-950 shadow-md transition hover:bg-indigo-950 hover:text-indigo-50"
        >
          Прийняти
        </button>
        <button
          onClick={() => declineRequest(request.id)}
          className="rounded-full border border-indigo-50 px-4 py-2 font-primaryBold text-indigo-50 shadow-md transition hover:bg-red-600"
        >
          Відхилити
        </button>
      </div>
    </div>
  );
}

export default TeamRequest;

