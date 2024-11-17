import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#140D2D] bg-cover bg-center text-indigo-950">
      {/* Home Link */}
      <Link
        to="/Home"
        className="mb-8 mt-8 font-primaryBold text-4xl text-indigo-100 transition hover:text-fuchsia-100"
      >
        TeamHub
      </Link>

      {/* Login Form Container */}
      <div className="w-[500px] mt-8 rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-6 mt-4 text-center font-primaryBold text-3xl text-gray-800">
          Увійти
        </h2>

        <LoginForm />

        {/* Registration Link */}
        <p className="mt-6 text-center text-gray-600">
          Немає акаунта?{" "}
          <Link
            to="/registration"
            className="font-bold text-indigo-950 transition hover:text-gray-600 hover:underline"
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
