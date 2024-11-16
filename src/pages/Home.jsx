import { Link } from "react-router-dom";

function Home() {
  // Scroll handler for smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#140D2D] bg-cover bg-center text-white">
      {/* Header with Navigation Links */}
      <header className="absolute left-0 top-0 mt-4 flex w-full items-center justify-between bg-[#140D2D] bg-opacity-80 p-4">
        <h1 className="ml-10 font-primaryBold text-3xl font-bold">TeamHub</h1>
        <nav className="mr-10 flex gap-6">
          <button
            onClick={() => scrollToSection("intro")}
            className="font-primaryRegular transition hover:text-gray-300"
          >
            Про нас
          </button>
          <button
            onClick={() => scrollToSection("teamRoles")}
            className="font-primaryRegular transition hover:text-gray-300"
          >
            Команда
          </button>
          <button
            onClick={() => scrollToSection("benefits")}
            className="font-primaryRegular transition hover:text-gray-300"
          >
            Переваги
          </button>
          <button
            onClick={() => scrollToSection("steps")}
            className="font-primaryRegular transition hover:text-gray-300"
          >
            Як це працює
          </button>
        </nav>
      </header>
      {/* Main Section */}
      <div
        id="intro"
        className="container mx-auto mt-20 flex flex-col items-center justify-between px-4 md:flex-row"
      >
        <div className="text-left md:w-1/2">
          <h1 className="mb-4 font-primaryBold text-5xl font-bold">
            Створи свій перший пет-проект <br /> разом із нами!
          </h1>
          <p className="mb-6 mt-12 font-primaryRegular text-2xl">
            Тут ти можеш знайти команду, об'єднати ідеї,
            <br /> а також розпочати свою подорож у світі стартапів!
          </p>
          <div className="flex gap-10">
            <Link
              to="/registration"
              className="mt-2 inline-block rounded-full border border-white px-8 py-3 font-primaryBold transition hover:bg-white hover:text-black"
            >
              Приєднатися
            </Link>
            <Link
              to="/login"
              className="mt-2 inline-block rounded-full border border-white px-8 py-3 font-primaryBold transition hover:bg-white hover:text-black"
            >
              Вже маю акаунт
            </Link>
          </div>
        </div>
        {/* Hero Image Section */}
        <div className="mt-10 flex items-center justify-center md:mt-0 md:w-1/2">
          <img src="/HeroImg.png" alt="Hero" className="w-[1440px]" />
        </div>
      </div>
      {/* Role Grid Block */}
      <h2
        id="teamRoles"
        className="mb-4 mt-24 font-primaryBold text-5xl font-semibold"
      >
        Кожна команда містить:
      </h2>
      <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-8 px-6 font-primaryBold">
        {["BACKEND", "FRONTEND", "QA", "DESIGN", "PM", "MENTOR"].map((role) => (
          <div
            key={role}
            className="flex transform items-center justify-center rounded-lg bg-black bg-opacity-20 p-8 text-xl font-semibold transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-30"
          >
            {role}
          </div>
        ))}
      </div>
      {/* Block 2: Benefits of Teamhub */}
      <section
        id="benefits"
        className="mt-24 flex w-full flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-100 px-6 py-20"
      >
        <h2 className="mb-8 font-primaryBold text-5xl font-semibold text-indigo-950">
          Чому саме Teamhub?
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {[
            "Шукай партнерів за навичками, інтересами та досвідом.",
            "Збирай людей навколо своїх ідей та розвивай проекти з нуля.",
            "Платформа підтримує твою мотивацію через зворотний зв'язок.",
            "Доступна для всіх, без фінансових зобов'язань.",
          ].map((benefit, index) => (
            <div
              key={index}
              className="w-full transform rounded-lg bg-white p-6 shadow-lg transition duration-200 hover:scale-105"
            >
              <p className="font-primaryRegular text-lg text-gray-800">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Steps Section */}
      <h2
        id="steps"
        className="mb-4 mt-24 font-primaryBold text-5xl font-semibold"
      >
        Як це працює?
      </h2>
      <section className="w-4/5 space-y-8 rounded-lg bg-black bg-opacity-30 p-8 text-left">
        {[
          {
            step: "01",
            title: "Крок 1:",
            description:
              "Створи профіль — Заповни його, вказавши навички, інтереси і тип проектів, які тебе цікавлять.",
          },
          {
            step: "02",
            title: "Крок 2:",
            description:
              "Знайди команду або командного партнера — Переглядай доступні проекти та шукай однодумців, чи пропонуй свої ідеї.",
          },
          {
            step: "03",
            title: "Крок 3:",
            description:
              "Запускай проект — Зібрав команду, створюй проект, діліться ідеями та розвивайте його разом.",
          },
        ].map(({ step, title, description }) => (
          <div
            key={step}
            className="border-white-500 flex flex-col border-t pt-6 md:flex-row md:items-start"
          >
            <div className="text-white-500 text-xl font-bold md:w-1/12">
              {step}
            </div>
            <div className="md:w-11/12">
              <h3 className="font-primaryBold text-2xl font-semibold">
                {title}
              </h3>
              <p className="font-primaryRegular text-lg text-gray-300">
                {description}
              </p>
            </div>
          </div>
        ))}
      </section>
      {/* Block 4: Our aim */}
      <section
        id="benefits"
        className="to-indigo-1500 mt-24 flex w-full flex-col items-center justify-center bg-gradient-to-b from-indigo-50 px-6 py-28"
      >
        <h2 className="mb-8 font-primaryBold text-5xl font-semibold text-indigo-950">
          Наша мета — допомогти тобі створити успішний проект
        </h2>
        <div className="grid w-full grid-cols-1 gap-6">
          {[
            "Ми прагнемо створити простір для кожного, хто хоче реалізувати свою ідею. Ми віримо, що найкращі ідеї з'являються тоді, коли люди об'єднуються і працюють разом. Разом ми здатні більше!",
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex w-full transform flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-lg transition duration-200 hover:scale-105"
            >
              <p className="mb-6 font-primaryRegular text-lg text-gray-800">
                {benefit}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/registration"
                  className="inline-block rounded-full border border-gray-800 bg-gray-800 px-8 py-3 font-primaryBold text-white transition hover:bg-white hover:text-gray-800"
                >
                  Приєднатися
                </Link>
                <Link
                  to="/login"
                  className="inline-block rounded-full border border-gray-800 bg-gray-800 px-8 py-3 font-primaryBold text-white transition hover:bg-white hover:text-gray-800"
                >
                  Вже маю акаунт
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-24 flex w-full flex-col items-center bg-[#140D2D] py-8 text-gray-400">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          {/* Footer Navigation Links */}
          <nav className="mb-4 flex gap-6 md:mb-0">
            <button
              onClick={() => scrollToSection("intro")}
              className="font-primaryRegular transition hover:text-gray-100"
            >
              Про нас
            </button>
            <button
              onClick={() => scrollToSection("teamRoles")}
              className="font-primaryRegular transition hover:text-gray-100"
            >
              Команда
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="font-primaryRegular transition hover:text-gray-100"
            >
              Переваги
            </button>
            <button
              onClick={() => scrollToSection("steps")}
              className="font-primaryRegular transition hover:text-gray-100"
            >
              Як це працює
            </button>
          </nav>
        </div>
        <p className="mt-4 font-primaryRegular text-sm">
          &copy; 2024 TeamHub. Всі права захищені.
        </p>
      </footer>
    </div>
  );
}

export default Home;
