import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-5 bg-gradient-to-r from-green-100 via-white to-green-50 border-b-2 border-green-200 shadow-xl rounded-b-2xl sticky top-0 z-50">
      <Link
        to="/"
        className="text-3xl font-extrabold bg-gradient-to-r from-green-600 via-green-400 to-green-700 bg-clip-text text-transparent tracking-tight drop-shadow-lg hover:scale-105 transition-transform"
      >
        💡 QA Hub
      </Link>
      <nav className="flex gap-6">
        <Link
          className="px-4 py-2 rounded-lg font-semibold text-green-800 hover:bg-green-200 hover:text-green-900 focus:bg-green-300 focus:outline-none transition-all duration-150 shadow hover:scale-105"
          to="/"
        >
          Home
        </Link>
        <Link
          className="px-4 py-2 rounded-lg font-semibold text-green-800 hover:bg-green-200 hover:text-green-900 focus:bg-green-300 focus:outline-none transition-all duration-150 shadow hover:scale-105"
          to="/ask"
        >
          Ask a Question
        </Link>
        <Link
          className="px-4 py-2 rounded-lg font-semibold text-green-800 hover:bg-green-200 hover:text-green-900 focus:bg-green-300 focus:outline-none transition-all duration-150 shadow hover:scale-105"
          to="/login"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}