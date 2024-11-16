import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;

  li {
    list-style: none;
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  font-size: 1.5rem;
  color: white;
  transition: color 0.3s;

  &:hover {
    color: var(--color-grey-300); /* Light grey on hover */
  }
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { user: userInfo } = useGetUserByEmail(user?.email);

  return (
    <StyledHeaderMenu>
      <li>
        <StyledButtonIcon
          onClick={() => navigate(`/profile/${userInfo && userInfo[0]?.id}`)}
          aria-label="Profile"
        >
          <HiOutlineUser />
        </StyledButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
