import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #140D2D;
  padding: 1rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10; /* Keep above content */
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: white;
    font-family: "Montserrat-Bold", sans-serif;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: var(--color-#FFF5EE-200);
    }
  }
`;

const Title = styled.h1`
  font-family: "Montserrat-Bold", sans-serif;
  font-size: 1.8rem;
  color: white;
`;

function Header() {
  return (
    <StyledHeader>
      <Title>TeamHub</Title>
      <StyledNav>
        <Link to="/dashboard">Головна сторінка</Link>
        <Link to="/teams">Команди</Link>
        <Link to="/invites">Запрошення</Link>
      </StyledNav>
      <div className="flex items-center gap-4">
        <UserAvatar />
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
