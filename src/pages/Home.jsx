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
    <div className="bg-[#140D2D] bg-cover bg-center min-h-screen flex flex-col items-center text-white relative">
      
      {/* Header with Navigation Links */}
      <header className="absolute top-0 left-0 w-full bg-[#140D2D] bg-opacity-80 p-4 flex items-center justify-between">
        <h1 className="font-primaryBold text-3xl font-bold ml-10">TeamHub</h1>
        <nav className="flex gap-6 mr-10">
          <button onClick={() => scrollToSection("intro")} className="font-primaryRegular hover:text-gray-300 transition">Про нас</button>
          <button onClick={() => scrollToSection("teamRoles")} className="font-primaryRegular hover:text-gray-300 transition">Команда</button>
          <button onClick={() => scrollToSection("benefits")} className="font-primaryRegular hover:text-gray-300 transition">Переваги</button>
          <button onClick={() => scrollToSection("steps")} className="font-primaryRegular hover:text-gray-300 transition">Як це працює</button>
        </nav>
      </header>

      {/* Main Section */}
      <div id="intro" className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-32">
        <div className="text-left md:w-1/2">
          <h1 className="text-5xl font-bold mb-4 font-primaryBold">
            Створи свій перший пет-проект <br /> разом із нами!
          </h1>
          <p className="text-2xl mb-6 font-primaryRegular">
            Тут ти можеш знайти команду, об'єднати ідеї,
            <br /> а також розпочати свою подорож у світі стартапів!
          </p>
          <div className="flex gap-10">
            <Link
              to="/registration"
              className="font-primaryBold inline-block px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition mt-2"
            >
              Приєднатися
            </Link>
            <Link 
              to="/login" 
              className="font-primaryBold inline-block px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition mt-2"
            >
              Вже маю акаунт
            </Link>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
          <img src="public/HeroImg.png" alt="Hero" className="w-full max-w-lg" />
        </div>
      </div>

      {/* Role Grid Block */}
      <h2 id="teamRoles" className="font-primaryBold text-5xl font-semibold mt-32 mb-4">Кожна команда містить:</h2>
      <div className="font-primaryBold grid grid-cols-2 gap-6 mt-16 w-full max-w-4xl px-6">
        {['BACKEND', 'FRONTEND', 'QA', 'DESIGN', 'PM', 'MENTOR'].map((role) => (
        <div key={role} className="bg-black bg-opacity-20 p-8 flex items-center justify-center text-xl font-semibold rounded-lg">
          {role}
        </div>
      ))}
      </div>

      {/* Block 2: Benefits of Teamhub */}
      <section id="benefits" className="flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 py-20 px-6 mt-24">
        <h2 className="font-primaryBold text-5xl font-semibold text-indigo-950 mb-8">Чому саме Teamhub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-24xl">
          {[
            "Шукай партнерів за навичками, інтересами та досвідом.",
            "Збирай людей навколо своїх ідей та розвивай проекти з нуля.",
            "Платформа підтримує твою мотивацію через зворотний зв'язок.",
            "Доступна для всіх, без фінансових зобов'язань."
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition duration-200 hover:scale-105">
              <p className="font-primaryRegular text-lg text-gray-800">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <h2 id="steps" className="font-primaryBold text-5xl font-semibold mt-32 mb-4">Як це працює?</h2>
      <section className="w-4/5 bg-black bg-opacity-30 p-8 rounded-lg text-left space-y-8">
        {[
          { step: "01", title: "Крок 1:", description: "Створи профіль — Заповни його, вказавши навички, інтереси і тип проектів, які тебе цікавлять." },
          { step: "02", title: "Крок 2:", description: "Знайди команду або командного партнера — Переглядай доступні проекти та шукай однодумців, чи пропонуй свої ідеї." },
          { step: "03", title: "Крок 3:", description: "Запускай проект — Зібрав команду, створюй проект, діліться ідеями та розвивайте його разом." }
        ].map(({ step, title, description }) => (
          <div key={step} className="flex flex-col md:flex-row md:items-start border-t border-white-500 pt-6">
            <div className="text-white-500 font-bold text-xl md:w-1/12">{step}</div>
            <div className="md:w-11/12">
              <h3 className="font-primaryBold text-2xl font-semibold">{title}</h3>
              <p className="font-primaryRegular text-lg text-gray-300">{description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#140D2D] py-8 mt-24 flex flex-col items-center text-gray-400">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Footer Navigation Links */}
          <nav className="flex gap-6 mb-4 md:mb-0">
            <button onClick={() => scrollToSection("intro")} className="font-primaryRegular hover:text-gray-100 transition">Про нас</button>
            <button onClick={() => scrollToSection("teamRoles")} className="font-primaryRegular hover:text-gray-100 transition">Команда</button>
            <button onClick={() => scrollToSection("benefits")} className="font-primaryRegular hover:text-gray-100 transition">Переваги</button>
            <button onClick={() => scrollToSection("steps")} className="font-primaryRegular hover:text-gray-100 transition">Як це працює</button>
          </nav>

          {/* Social Media Links */}
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <p className="font-primaryRegular mt-4 text-sm">&copy; 2024 TeamHub. Всі права захищені.</p>
      </footer>
    </div>
  );
}

export default Home;
