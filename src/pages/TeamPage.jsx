import Modal from "../ui/Modal";
import RoleInvite from "../features/teams/RoleInvite";

import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";
import { useTeam } from "../features/teams/useTeam";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import RoleLeave from "../features/teams/RoleLeave";
import TeamDelete from "../features/teams/TeamDelete";
import RoleRequestSelect from "../features/teams/RoleRequestSelect";
import { useGetRequestsByTeamId } from "../features/teams/useGetRequestsByTeamId";
import TeamRequest from "../ui/TeamRequest";

function TeamPage() {
  const { team } = useTeam();
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

  const isTeamOwner = teamOwner && teamOwner[0]?.email === user.email;

  function handleInvite(role) {
    setRoleToInvite(role);
  }

  function handleLeave(role) {
    setRoleToLeave(role);
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

  return (
    <Modal>
      <div>
        <h1>Команда: {team?.teamName}</h1>
        <span>
          <p>Власник: {(teamOwner && teamOwner[0]?.fullName) || "відсутній"}</p>
        </span>
        <span>
          <p>Front: {(front && front[0]?.fullName) || "відсутній"}</p>
          {isTeamOwner ? (
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
        </span>
        <span>
          <p>Back: {(back && back[0]?.fullName) || "відсутній"}</p>
          {isTeamOwner ? (
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
        </span>
        <span>
          <p>UI/UX: {(ui && ui[0]?.fullName) || "відсутній"}</p>
          {isTeamOwner ? (
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
        </span>
        <span>
          <p>QA: {(qa && qa[0]?.fullName) || "відсутній"}</p>
          {isTeamOwner ? (
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
        </span>
        <span>
          <p>PM: {(pm && pm[0]?.fullName) || "відсутній"}</p>
          {isTeamOwner ? (
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
        </span>
        <span>
          <p>Mentor: {(mentor && mentor[0]?.fullName) || "відсутній"}</p>
          {isTeamOwner ? (
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
        </span>

        <p>Цілі: {team?.teamGoals}</p>
        <p>Таймлайн: {team?.deadline_date}</p>

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
                <h2>Запрошення:</h2>
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
        <RoleLeave role={roleToLeave} team_id={teamId} email={user?.email} />
      </Modal.Window>
      <Modal.Window name={"invite"}>
        <RoleInvite role={roleToInvite} team_id={teamId} />
      </Modal.Window>
      <Modal.Window name={"deleteTeam"}>
        <TeamDelete team_id={teamId} team_name={team?.teamName} />
      </Modal.Window>
      <Modal.Window name="joinRequest">
        <RoleRequestSelect
          user_email={user?.email}
          team_id={teamId}
          team_name={team?.teamName}
          // Додати функцію на закриття
        />
      </Modal.Window>
    </Modal>
  );
}

export default TeamPage;
