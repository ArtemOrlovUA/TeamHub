import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <p>Вибачте, щось пішло не так</p>
      <Link to="/home">На головну</Link>
    </div>
  );
}

export default ErrorPage;
