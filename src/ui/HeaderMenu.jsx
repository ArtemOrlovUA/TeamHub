import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useGetUserByEmail } from "../features/teams/useGetUserByEmail";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { user: userInfo } = useGetUserByEmail(user?.email);

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon
          onClick={() => navigate(`/profile/${userInfo && userInfo[0]?.id}`)}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
