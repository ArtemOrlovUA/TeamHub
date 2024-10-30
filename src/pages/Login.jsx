import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div>
      <Link to={`/Home`}>TeamHub</Link>
      <LoginForm />
    </div>
  );
}

export default Login;
