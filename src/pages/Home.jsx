import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p>Welcome to TeamHub!</p>
      <Link to="/registration">Sign up</Link>
      <p>or</p>
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default Home;
