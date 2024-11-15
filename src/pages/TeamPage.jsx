import Modal from "../ui/Modal";
import RoleInvite from "../features/teams/RoleInvite";

import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";
import { useTeam } from "../features/teams/useTeam";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import RoleLeave from "../features/teams/RoleLeave";
import TeamDelete from "../features/teams/TeamDelete";
import RoleRequestSelect from "../features/teams/RoleRequestSelect";
import { useGetRequestsByTeamId } from "../features/teams/useGetRequestsByTeamId";
import TeamRequest from "../ui/TeamRequest";
import RoleKick from "../features/teams/RoleKick";
import EditTeamForm from "../features/teams/EditTeamForm";

function TeamPage() {
  const { team, isLoading } = useTeam();
  const { user } = useUser();
  const { user: teamOwner } = useGetUserByEmail(team?.email_owner);
  const { user: front } = useGetUserByEmail(team?.email_front);
  const { user: back } = useGetUserByEmail(team?.email_back);
  const { user: ui } = useGetUserByEmail(team?.email_ui);
  const { user: qa } = useGetUserByEmail(team?.email_qa);
  const { user: pm } = useGetUserByEmail(team?.email_pm);
  const { user: mentor } = useGetUserByEmail(team?.email_mentor);
  const { teamId } = useParams();
  const { teamRequests } = useGetRequestsByTeamId(teamId);

  const [roleToInvite, setRoleToInvite] = useState("");
  const [roleToLeave, setRoleToLeave] = useState("");
  const [roleToKick, setRoleToKick] = useState("");
  const [emailToKick, setEmailToKick] = useState("");

  const isTeamOwner = teamOwner && teamOwner[0]?.email === user.email;

  function handleInvite(role) {
    setRoleToInvite(role);
  }

  function handleLeave(role) {
    setRoleToLeave(role);
  }

  function handleKick(role, email) {
    setRoleToKick(role);
    setEmailToKick(email);
  }

  const teamMemberEmails = [
    team?.email_owner,
    team?.email_front,
    team?.email_back,
    team?.email_ui,
    team?.email_qa,
    team?.email_pm,
    team?.email_mentor,
  ];

  const isNotTeamMember = !teamMemberEmails.includes(user?.email);

  if (isLoading) return <div>Завантаження...</div>;

  if (!team) return <div>Вибачте, такої команди не існує</div>;

  return (
    <Modal>
      <div>
        <h1>Команда: {team?.teamName}</h1>
        <span>
          <p>
            <span>Власник: </span>

            {teamOwner && (
              <Link to={`/profile/${teamOwner[0]?.id}`}>
                {teamOwner[0]?.fullName}
              </Link>
            )}
          </p>
        </span>

        <span>
          <p>
            <span>Front-end: </span>
            {(front && (
              <Link to={`/profile/${front[0]?.id}`}>{front[0]?.fullName}</Link>
            )) ||
              " відсутній"}
          </p>
          {isTeamOwner && !team.email_front ? (
            <Modal.Open
              opens={"invite"}
              onClickFunction={() => handleInvite("Front-end")}
            >
              <button>Запросити на роль</button>
            </Modal.Open>
          ) : user.email === team?.email_front ? (
            <Modal.Open
              opens={"leave"}
              onClickFunction={() => handleLeave("Front-end")}
            >
              <button>Покинути роль</button>
            </Modal.Open>
          ) : null}
          {isTeamOwner &&
          team.email_front &&
          user.email !== team?.email_front ? (
            <Modal.Open
              opens={"kick"}
              onClickFunction={() => handleKick("Front-end", team?.email_front)}
            >
              <button>Видалити з команди</button>
            </Modal.Open>
          ) : null}
        </span>

        <span>
          <p>
            <span>Back-end: </span>

            {(back && (
              <Link to={`/profile/${back[0]?.id}`}>{back[0]?.fullName}</Link>
            )) ||
              " відсутній"}
          </p>
          {isTeamOwner && !team.email_back ? (
            <Modal.Open
              opens={"invite"}
              onClickFunction={() => handleInvite("Back-end")}
            >
              <button>Запросити на роль</button>
            </Modal.Open>
          ) : user.email === team?.email_back ? (
            <Modal.Open
              opens={"leave"}
              onClickFunction={() => handleLeave("Back-end")}
            >
              <button>Покинути роль</button>
            </Modal.Open>
          ) : null}
          {isTeamOwner && team.email_back && user.email !== team?.email_back ? (
            <Modal.Open
              opens={"kick"}
              onClickFunction={() => handleKick("Back-end", team?.email_back)}
            >
              <button>Видалити з команди</button>
            </Modal.Open>
          ) : null}
        </span>

        <span>
          <p>
            <span>UI/UX: </span>
            {(ui && (
              <Link to={`/profile/${ui[0]?.id}`}>{ui[0]?.fullName}</Link>
            )) ||
              " відсутній"}
          </p>
          {isTeamOwner && !team.email_ui ? (
            <Modal.Open
              opens={"invite"}
              onClickFunction={() => handleInvite("UI/UX")}
            >
              <button>Запросити на роль</button>
            </Modal.Open>
          ) : user.email === team?.email_ui ? (
            <Modal.Open
              opens={"leave"}
              onClickFunction={() => handleLeave("UI/UX")}
            >
              <button>Покинути роль</button>
            </Modal.Open>
          ) : null}
          {isTeamOwner && team.email_ui && user.email !== team?.email_ui ? (
            <Modal.Open
              opens={"kick"}
              onClickFunction={() => handleKick("UI/UX", team?.email_ui)}
            >
              <button>Видалити з команди</button>
            </Modal.Open>
          ) : null}
        </span>

        <span>
          <p>
            <span>QA: </span>
            {(qa && (
              <Link to={`/profile/${qa[0]?.id}`}>{qa[0]?.fullName}</Link>
            )) ||
              " відсутній"}
          </p>
          {isTeamOwner && !team.email_qa ? (
            <Modal.Open
              opens={"invite"}
              onClickFunction={() => handleInvite("QA")}
            >
              <button>Запросити на роль</button>
            </Modal.Open>
          ) : user.email === team?.email_qa ? (
            <Modal.Open
              opens={"leave"}
              onClickFunction={() => handleLeave("QA")}
            >
              <button>Покинути роль</button>
            </Modal.Open>
          ) : null}
          {isTeamOwner && team.email_qa && user.email !== team?.email_qa ? (
            <Modal.Open
              opens={"kick"}
              onClickFunction={() => handleKick("QA", team?.email_qa)}
            >
              <button>Видалити з команди</button>
            </Modal.Open>
          ) : null}
        </span>

        <span>
          <p>
            <span>PM: </span>
            {(pm && (
              <Link to={`/profile/${pm[0]?.id}`}>{pm[0]?.fullName}</Link>
            )) ||
              " відсутній"}
          </p>
          {isTeamOwner && !team.email_pm ? (
            <Modal.Open
              opens={"invite"}
              onClickFunction={() => handleInvite("PM")}
            >
              <button>Запросити на роль</button>
            </Modal.Open>
          ) : user.email === team?.email_pm ? (
            <Modal.Open
              opens={"leave"}
              onClickFunction={() => handleLeave("PM")}
            >
              <button>Покинути роль</button>
            </Modal.Open>
          ) : null}
          {isTeamOwner && team.email_pm && user.email !== team?.email_pm ? (
            <Modal.Open
              opens={"kick"}
              onClickFunction={() => handleKick("PM", team?.email_pm)}
            >
              <button>Видалити з команди</button>
            </Modal.Open>
          ) : null}
        </span>

        <span>
          <p>
            <span>Ментор: </span>
            {(mentor && (
              <Link to={`/profile/${mentor[0]?.id}`}>
                {mentor[0]?.fullName}
              </Link>
            )) ||
              " відсутній"}
          </p>
          {isTeamOwner && !team.email_mentor ? (
            <Modal.Open
              opens={"invite"}
              onClickFunction={() => handleInvite("Mentor")}
            >
              <button>Запросити на роль</button>
            </Modal.Open>
          ) : user.email === team?.email_mentor ? (
            <Modal.Open
              opens={"leave"}
              onClickFunction={() => handleLeave("Mentor")}
            >
              <button>Покинути роль</button>
            </Modal.Open>
          ) : null}
          {isTeamOwner &&
          team.email_mentor &&
          user.email !== team?.email_mentor ? (
            <Modal.Open
              opens={"kick"}
              onClickFunction={() => handleKick("Mentor", team?.email_mentor)}
            >
              <button>Видалити з команди</button>
            </Modal.Open>
          ) : null}
        </span>

        <p>Цілі: {team?.teamGoals}</p>
        <p>Таймлайн: {team?.deadline_date}</p>

        {teamOwner && teamOwner[0]?.email === user.email ? (
          <Modal.Open opens={"editTeam"}>
            <button>Оновити дані про команду</button>
          </Modal.Open>
        ) : null}

        {teamOwner && teamOwner[0]?.email === user.email ? (
          <Modal.Open opens={"deleteTeam"}>
            <button>Видалити команду</button>
          </Modal.Open>
        ) : null}

        {isNotTeamMember && (
          <Modal.Open opens="joinRequest">
            <button>Подати запит на приєднання</button>
          </Modal.Open>
        )}

        {isTeamOwner && teamRequests && teamRequests.length > 0 && (
          <div>
            {teamRequests?.length > 0 ? (
              <div>
                <h2>Запити на приєднання:</h2>
                {teamRequests.map((request) => (
                  <TeamRequest request={request} key={request.id} />
                ))}
              </div>
            ) : (
              <div>Немає запрошень</div>
            )}
          </div>
        )}
      </div>

      <Modal.Window name={"leave"}>
        <RoleLeave
          role={roleToLeave}
          team_id={teamId}
          email={user?.email}
          team={team}
        />
      </Modal.Window>
      <Modal.Window name={"invite"}>
        <RoleInvite role={roleToInvite} team_id={teamId} />
      </Modal.Window>
      <Modal.Window name={"editTeam"}>
        <EditTeamForm
          team_id={teamId}
          team_name={team?.teamName}
          team_goal={team?.teamGoals}
          deadline={team?.deadline_date}
        />
      </Modal.Window>
      <Modal.Window name={"kick"}>
        <RoleKick
          role={roleToKick}
          team_id={teamId}
          emailToKick={emailToKick}
        />
      </Modal.Window>
      <Modal.Window name={"deleteTeam"}>
        <TeamDelete team_id={teamId} team_name={team?.teamName} team={team} />
      </Modal.Window>
      <Modal.Window name="joinRequest">
        <RoleRequestSelect
          user_email={user?.email}
          team_id={teamId}
          team_name={team?.teamName}
        />
      </Modal.Window>
    </Modal>
  );
}

export default TeamPage;
