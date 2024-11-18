// import { Link } from "react-router-dom";

// function ErrorPage() {
//   return (
//     <div>
//       <p>Вибачте, щось пішло не так</p>
//       <Link to="/home">На головну</Link>
//     </div>
//   );
// }

// export default ErrorPage;

import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-indigo-50 text-indigo-950">
      {/* Error Message */}
      <h1 className="mb-4 text-5xl font-primaryBold">Щось пішло не так</h1>
      <p className="mb-6 text-lg text-indigo-900">
        Вибачте за незручності, будь ласка, спробуйте пізніше.
      </p>

      {/* Home Link */}
      <Link
        to="/home"
        className="rounded-lg bg-indigo-50 px-6 py-3 text-lg font-bold text-indigo-950 transition hover:bg-indigo-50"
      >
        На головну
      </Link>
    </div>
  );
}

export default ErrorPage;
