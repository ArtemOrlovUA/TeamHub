import styled from "styled-components";
import { useUserProfile } from "../features/profile/useUserProfile";
import { useUser } from "../features/authentication/useUser";
import { Link } from "react-router-dom";

const Avatar = styled.img`
  display: block;
  width: 12rem;
  aspect-ratio: 1;
  object-fit: cover;
  border: 4px solid #eef2ff; /* Soft Indigo Background */
  border-radius: 50%;
  margin: 0 auto;
`;

function UserProfile() {
  const { user } = useUserProfile();
  const { user: currentUser } = useUser();

  const userInfo = user && user[0];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-indigo-50 text-gray-900">
      <main className="container mx-auto mt-16 max-w-4xl space-y-8 rounded-lg bg-white px-8 py-12 shadow-lg">
        <section className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <div className="flex-shrink-0">
            <Avatar src={userInfo?.avatar} alt="Аватар користувача" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="mt-6 font-primaryBold text-4xl text-indigo-950 md:mt-0">
              {userInfo?.fullName || "Невідомий користувач"}
            </h2>
            <p className="mt-2 font-primaryRegular text-lg text-indigo-800">
              {userInfo?.email || "Немає email"}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <p className="font-primaryRegular text-lg">
            <strong className="text-indigo-950">LinkedIn:</strong>{" "}
            {userInfo?.linkedIn || "Немає даних"}
          </p>
          <p className="font-primaryRegular text-lg">
            <strong className="text-indigo-950">Рейтинг користувача:</strong>{" "}
            {userInfo?.rating || "Немає рейтингу"}
          </p>
        </section>

        {currentUser?.email === userInfo?.email && (
          <div className="text-center">
            <Link
              to="/account"
              className="inline-block rounded-full border border-indigo-950 bg-indigo-950 px-8 py-3 font-primaryBold text-white shadow transition hover:bg-indigo-50 hover:text-indigo-950"
            >
              Редагувати профіль
            </Link>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 text-center font-primaryRegular text-gray-900">
        &copy; 2024 TeamHub. Всі права захищені.
      </footer>
    </div>
  );
}

export default UserProfile;
