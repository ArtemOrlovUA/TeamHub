/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetUserByEmail } from "./useGetUserByEmail";

function TeamListItem({ team_id, team_name, email_owner }) {
  const { user } = useGetUserByEmail(email_owner);
  const owner_full_name = user && user[0].fullName;

  return (
    <tr key={team_id}>
      <td>{team_name}</td>
      <td>
        <Link to={`/profile/${user && user[0]?.id}`}>{owner_full_name}</Link>
      </td>
      <td>
        <Link to={`/team/${team_id}`}>Переглянути деталі</Link>
      </td>
    </tr>
  );
}

export default TeamListItem;
