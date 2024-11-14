import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";

function Registration() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 px-6 py-12">
      {/* Home Link */}
      <Link
        to="/Home"
        className="font-primaryBold text-4xl mb-8 text-gray-800 hover:text-gray-600 transition"
      >
        TeamHub
      </Link>
      
      {/* Signup Form Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="font-primaryBold text-3xl text-gray-800 mb-6 text-center">
          Реєстрація
        </h2>
        
        {/* Render Signup Form */}
        <SignupForm />

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Вже маєте акаунт?{" "}
          <Link
            to="/login"
            className="text-gray-800 font-bold hover:underline hover:text-gray-600 transition"
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
