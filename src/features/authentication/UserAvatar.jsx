import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
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
