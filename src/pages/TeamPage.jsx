import Modal from "../ui/Modal";
import RoleInvite from "../features/teams/RoleInvite";

import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";
import { useTeam } from "../features/teams/useTeam";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useDeleteTeam } from "../features/teams/useDeleteTeam";

function TeamPage() {
  const { team } = useTeam();
  const { user } = useUser();
  const { deleteTeam } = useDeleteTeam();
  const { user: teamOwner } = useGetUserByEmail(team?.email_owner);
  const { user: front } = useGetUserByEmail(team?.email_front);
  const { user: back } = useGetUserByEmail(team?.email_back);
  const { user: ui } = useGetUserByEmail(team?.email_ui);
  const { user: qa } = useGetUserByEmail(team?.email_qa);
  const { user: pm } = useGetUserByEmail(team?.email_pm);
  const { user: mentor } = useGetUserByEmail(team?.email_mentor);
  const { teamId } = useParams();

  const [roleToInvite, setRoleToInvite] = useState("");

  function handleInvite(role) {
    setRoleToInvite(role);
  }

  return (
    <Modal>
      <div>
        <h1>Команда: {team?.teamName}</h1>
        <span>
          <p>Власник: {(teamOwner && teamOwner[0]?.fullName) || "відсутній"}</p>
        </span>
        <span>
          <p>Front: {(front && front[0]?.fullName) || "відсутній"}</p>
          <Modal.Open
            opens={"invite"}
            onClickFunction={() => handleInvite("Front-end")}
          >
            <button>Запросити на роль</button>
          </Modal.Open>
        </span>
        <span>
          <p>Back: {(back && back[0]?.fullName) || "відсутній"}</p>
          <Modal.Open
            opens={"invite"}
            onClickFunction={() => handleInvite("Back-end")}
          >
            <button>Запросити на роль</button>
          </Modal.Open>
        </span>
        <span>
          <p>UI/UX: {(ui && ui[0]?.fullName) || "відсутній"}</p>
          <Modal.Open
            opens={"invite"}
            onClickFunction={() => handleInvite("UI/UX")}
          >
            <button>Запросити на роль</button>
          </Modal.Open>
        </span>
        <span>
          <p>QA: {(qa && qa[0]?.fullName) || "відсутній"}</p>
          <Modal.Open
            opens={"invite"}
            onClickFunction={() => handleInvite("QA")}
          >
            <button>Запросити на роль</button>
          </Modal.Open>
        </span>
        <span>
          <p>PM: {(pm && pm[0]?.fullName) || "відсутній"}</p>
          <Modal.Open
            opens={"invite"}
            onClickFunction={() => handleInvite("PM")}
          >
            <button>Запросити на роль</button>
          </Modal.Open>
        </span>
        <span>
          <p>Mentor: {(mentor && mentor[0]?.fullName) || "відсутній"}</p>
          <Modal.Open
            opens={"invite"}
            onClickFunction={() => handleInvite("Mentor")}
          >
            <button>Запросити на роль</button>
          </Modal.Open>
        </span>

        <p>Цілі: {team?.teamGoals}</p>
        <p>Таймлайн: {team?.deadline_date}</p>

        {teamOwner && teamOwner[0]?.email === user.email ? (
          <button onClick={() => deleteTeam(teamId)}>Видалити команду</button>
        ) : null}
      </div>

      <Modal.Window name={"invite"}>
        <RoleInvite role={roleToInvite} team_id={teamId} />
      </Modal.Window>
    </Modal>
  );
}

export default TeamPage;
