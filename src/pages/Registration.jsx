import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/SignupForm";

function Registration() {
  return (
    <div>
      <Link to={`/Home`}>TeamHub</Link>
      <SignupForm />
    </div>
  );
}

export default Registration;
