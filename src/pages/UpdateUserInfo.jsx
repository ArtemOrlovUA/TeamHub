import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function UpdateInfo() {
  return (
    <div className="min-h-screen flex flex-col bg-indigo-50 text-gray-900">
      <main className="container mx-auto mt-16 max-w-4xl flex-grow space-y-8 px-8 py-12 rounded-lg bg-white shadow-lg">
        <h1 className="text-3xl mt-8 font-primaryBold text-center text-indigo-950">
          Оновлення інформації користувача
        </h1>
        <UpdateUserDataForm />
      </main>

      {/* Footer */}
      <footer className="py-4 text-center font-primaryRegular text-indigo-950">
        &copy; 2024 TeamHub. Всі права захищені.
      </footer>
    </div>
  );
}

export default UpdateInfo;
