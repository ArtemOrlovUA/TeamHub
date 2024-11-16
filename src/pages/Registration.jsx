import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";

function Registration() {
  return (
      <div className="relative flex min-h-screen flex-col items-center bg-[#140D2D] bg-cover bg-center text-indigo-950">
      {/* Home Link */}
      <Link
        to="/Home"
        className="mb-8 mt-8 font-primaryBold text-4xl text-indigo-100 transition hover:text-fuchsia-100"
      >
        TeamHub
      </Link>

      {/* Signup Form Container */}
      <div className="w-[500px] rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-6 mt-4 text-center font-primaryBold text-3xl text-gray-800">
          Реєстрація
        </h2>

        {/* Render Signup Form */}
        <SignupForm />

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Вже маєте акаунт?{" "}
          <Link
            to="/login"
            className="font-bold text-indigo-950 transition hover:text-gray-600 hover:underline"
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
