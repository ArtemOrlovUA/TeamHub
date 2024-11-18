// import { useDeletedTeam } from "../context/RateDeletedTeamContext";
// import { useQueries } from "@tanstack/react-query";
// import { getUserByEmail } from "../services/apiUser";
// import { useEffect, useState } from "react";
// import { useUpvote } from "../features/ratings/useUpvote";
// import { useDownvote } from "../features/ratings/useDownvote";
// import { useUser } from "../features/authentication/useUser";
// import { useNavigate } from "react-router-dom";

// function RateTeamMembersPage() {
//   const [votedUsers, setVotedUsers] = useState([]);

//   const { team } = useDeletedTeam();
//   const { upvote } = useUpvote();
//   const { downvote } = useDownvote();
//   const { user } = useUser();

//   const navigate = useNavigate();

//   const currentUserEmail = user.email;

//   useEffect(() => {
//     if (!team) navigate("/dashboard");
//   }, []);

//   const roles = [
//     { role: "Front-end", email: team?.email_front },
//     { role: "Back-end", email: team?.email_back },
//     { role: "UI/UX", email: team?.email_ui },
//     { role: "QA", email: team?.email_qa },
//     { role: "PM", email: team?.email_pm },
//     { role: "Mentor", email: team?.email_mentor },
//   ];

//   const teamMembers = roles.filter(({ email }) => email);

//   const userQueries = useQueries({
//     queries: teamMembers.map(({ role, email }) => ({
//       queryKey: ["user", email],
//       queryFn: () => getUserByEmail(email),
//       enabled: !!email,
//       select: (data) => ({ user: data, role }),
//     })),
//   });

//   const users = userQueries.map((query) => query.data);

//   const handleUpvote = (email) => {
//     setVotedUsers([...votedUsers, email]);
//     upvote(email);
//   };
//   const handleDownvote = (email) => {
//     setVotedUsers([...votedUsers, email]);
//     downvote(email);
//   };

//   const usersByEmail = users.reduce((acc, userData) => {
//     if (!userData) return acc;
//     const { user, role } = userData;
//     const userDetails = user[0];
//     const email = userDetails.email;
//     if (!acc[email]) {
//       acc[email] = { userDetails, roles: [role] };
//     } else {
//       acc[email].roles.push(role);
//     }
//     return acc;
//   }, {});

//   const groupedUsers = Object.values(usersByEmail).filter(
//     ({ userDetails }) => userDetails.email !== currentUserEmail,
//   );

//   const userElements = groupedUsers.map(({ userDetails, roles }) => {
//     const hasVoted = votedUsers.includes(userDetails.email);
//     return (
//       <div key={userDetails.email}>
//         <p>{userDetails.fullName}</p>
//         <p>{userDetails.email}</p>
//         <p>Ролі: {roles.join(", ")}</p>
//         <p>Рейтинг: {userDetails.rating}</p>
//         {!hasVoted && (
//           <>
//             <button onClick={() => handleUpvote(userDetails.email)}>
//               Підняти рейтинг
//             </button>
//             <button onClick={() => handleDownvote(userDetails.email)}>
//               Знизити рейтинг
//             </button>
//           </>
//         )}
//       </div>
//     );
//   });

//   return (
//     <div>
//       <h1>
//         На цій сторінці ви можете проголосувати, на скільки ви задоволені
//         співпрацею в команді
//       </h1>
//       {userElements}
//       {groupedUsers.length > 0 ? (
//         <h2>
//           Ви можете пропустити етап оцінювання користувачів, настнувши кнопку
//           &quot;До головної сторінки&quot;
//         </h2>
//       ) : (
//         <h2>Користувачі для оцінки відсутні</h2>
//       )}
//       <button onClick={() => navigate("/dashboard")}>
//         До головної сторінки
//       </button>
//     </div>
//   );
// }

// export default RateTeamMembersPage;

import { useDeletedTeam } from "../context/RateDeletedTeamContext";
import { useQueries } from "@tanstack/react-query";
import { getUserByEmail } from "../services/apiUser";
import { useEffect, useState } from "react";
import { useUpvote } from "../features/ratings/useUpvote";
import { useDownvote } from "../features/ratings/useDownvote";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function RateTeamMembersPage() {
  const [votedUsers, setVotedUsers] = useState([]);

  const { team } = useDeletedTeam();
  const { upvote } = useUpvote();
  const { downvote } = useDownvote();
  const { user } = useUser();

  const navigate = useNavigate();

  const currentUserEmail = user.email;

  useEffect(() => {
    if (!team) navigate("/dashboard");
  }, []);

  const roles = [
    { role: "Front-end", email: team?.email_front },
    { role: "Back-end", email: team?.email_back },
    { role: "UI/UX", email: team?.email_ui },
    { role: "QA", email: team?.email_qa },
    { role: "PM", email: team?.email_pm },
    { role: "Mentor", email: team?.email_mentor },
  ];

  const teamMembers = roles.filter(({ email }) => email);

  const userQueries = useQueries({
    queries: teamMembers.map(({ role, email }) => ({
      queryKey: ["user", email],
      queryFn: () => getUserByEmail(email),
      enabled: !!email,
      select: (data) => ({ user: data, role }),
    })),
  });

  const users = userQueries.map((query) => query.data);

  const handleUpvote = (email) => {
    setVotedUsers([...votedUsers, email]);
    upvote(email);
  };
  const handleDownvote = (email) => {
    setVotedUsers([...votedUsers, email]);
    downvote(email);
  };

  const usersByEmail = users.reduce((acc, userData) => {
    if (!userData) return acc;
    const { user, role } = userData;
    const userDetails = user[0];
    const email = userDetails.email;
    if (!acc[email]) {
      acc[email] = { userDetails, roles: [role] };
    } else {
      acc[email].roles.push(role);
    }
    return acc;
  }, {});

  const groupedUsers = Object.values(usersByEmail).filter(
    ({ userDetails }) => userDetails.email !== currentUserEmail,
  );

  const userElements = groupedUsers.map(({ userDetails, roles }) => {
    const hasVoted = votedUsers.includes(userDetails.email);
    return (
      <div
        key={userDetails.email}
        className="space-y-3 rounded-lg bg-white p-6 shadow-md"
      >
        <p className="font-primaryBold text-xl text-indigo-950">
          {userDetails.fullName}
        </p>
        <p className="font-primaryRegular text-lg text-gray-700">
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p className="font-primaryRegular text-lg text-gray-700">
          <strong>Ролі:</strong> {roles.join(", ")}
        </p>
        <p className="font-primaryRegular text-lg text-gray-700">
          <strong>Рейтинг:</strong> {userDetails.rating}
        </p>
        {!hasVoted && (
          <div className="flex gap-4">
            <button
              onClick={() => handleUpvote(userDetails.email)}
              className="rounded-full border bg-green-900 px-4 py-2 font-primaryBold text-white transition hover:bg-green-700"
            >
              Підняти рейтинг
            </button>
            <button
              onClick={() => handleDownvote(userDetails.email)}
              className="rounded-full border bg-red-800 px-4 py-2 font-primaryBold text-white transition hover:bg-red-600"
            >
              Знизити рейтинг
            </button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-indigo-50 text-gray-900">
      <main className="container mx-auto mt-24 grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2">
        <h1 className="col-span-1 font-primaryBold text-2xl text-indigo-950 md:col-span-2">
          На цій сторінці ви можете проголосувати, на скільки ви задоволені
          співпрацею в команді
        </h1>
        {userElements}
        <div className="col-span-1 text-center md:col-span-2">
          {groupedUsers.length > 0 ? (
            <h2 className="mt-6 font-primaryRegular text-xl text-gray-700">
              Ви можете пропустити етап оцінювання користувачів, настнувши
              кнопку &quot;До головної сторінки&quot;
            </h2>
          ) : (
            <h2 className="mt-6 font-primaryRegular text-xl text-gray-700">
              Користувачі для оцінки відсутні
            </h2>
          )}
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 inline-block rounded-full border bg-indigo-950 px-8 py-3 font-primaryBold text-white shadow-lg transition hover:bg-indigo-700"
          >
            До головної сторінки
          </button>
        </div>
      </main>
    </div>
  );
}

export default RateTeamMembersPage;
