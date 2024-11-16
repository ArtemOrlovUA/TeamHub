import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    font-family: "Montserrat-Regular", sans-serif;
    font-size: 1.4rem;
    color: white;
  }

  a {
    font-family: "Montserrat-Regular", sans-serif;
    font-size: 1.2rem;
    color: white;
    text-decoration: none;
    border: 1px solid white;
    border-radius: 0.4rem;
    padding: 0.2rem 0.6rem;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      color: black;
      background-color: white; /* Invert colors on hover */
    }
  }
`;

const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white; /* Matches header styling */
`;

function UserAvatar() {
  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName || "Guest";
  const avatar = user?.user_metadata?.avatar || "default-user.jpg";
  const linkedin = user?.user_metadata?.linkedin;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar} alt={`Avatar of ${fullName}`} />
      <span>{fullName}</span>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
