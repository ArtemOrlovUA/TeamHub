/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetUserByEmail } from "./useGetUserByEmail";

function TeamListItem({ team_id, team_name, email_owner }) {
  const { user } = useGetUserByEmail(email_owner);
  const owner_full_name = user && user[0].fullName;

  return (
    <tr key={team_id}>
      <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-900"
      >{team_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800">
        <Link to={`/profile/${user && user[0]?.id}`}>{owner_full_name}</Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-m font-medium">
        <Link to={`/team/${team_id}`}
        className="text-indigo-950 hover:text-indigo-400"
        >Переглянути деталі</Link>
      </td>
    </tr>
  );
}

export default TeamListItem;
