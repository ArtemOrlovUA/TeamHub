import styled from "styled-components";
import { useUserProfile } from "../features/profile/useUserProfile";
import { useUser } from "../features/authentication/useUser";
import { Link } from "react-router-dom";

const Avatar = styled.img`
  display: block;
  width: 16rem;
  width: 20rem;
  aspect-ratio: 1;
  object-position: center;
  outline: 2px solid var(--color-grey-100);
`;

function UserProfile() {
  const { user } = useUserProfile();
  const { user: currentUser } = useUser();

  console.log(user);

  const userInfo = user && user[0];

  console.log(userInfo);

  return (
    <div className="user-profile">
      <Avatar src={userInfo?.avatar} alt="Аватар користувача" />
      <h2>Ім&apos;я користувача: {userInfo?.fullName}</h2>
      <p>Пошта: {userInfo?.email}</p>
      <p>LinkedIn: {userInfo?.linkedIn}</p>
      <p>Рейтинг користувача: {userInfo?.rating}</p>
      {currentUser?.email === userInfo?.email && (
        <Link to="/account">Редагувати профіль</Link>
      )}
    </div>
  );
}

export default UserProfile;
