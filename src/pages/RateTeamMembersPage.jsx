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
      <div key={userDetails.email}>
        <p>{userDetails.fullName}</p>
        <p>{userDetails.email}</p>
        <p>Ролі: {roles.join(", ")}</p>
        <p>Рейтинг: {userDetails.rating}</p>
        {!hasVoted && (
          <>
            <button onClick={() => handleUpvote(userDetails.email)}>
              Підняти рейтинг
            </button>
            <button onClick={() => handleDownvote(userDetails.email)}>
              Знизити рейтинг
            </button>
          </>
        )}
      </div>
    );
  });

  return (
    <div>
      <h1>
        На цій сторінці ви можете проголосувати, на скільки ви задоволені
        співпрацею в команді
      </h1>
      {userElements}
      {groupedUsers.length > 0 ? (
        <h2>
          Ви можете пропустити етап оцінювання користувачів, настнувши кнопку
          &quot;До головної сторінки&quot;
        </h2>
      ) : (
        <h2>Користувачі для оцінки відсутні</h2>
      )}
      <button onClick={() => navigate("/dashboard")}>
        До головної сторінки
      </button>
    </div>
  );
}

export default RateTeamMembersPage;
