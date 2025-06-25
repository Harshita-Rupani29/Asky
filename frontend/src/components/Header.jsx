import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  // Replace this with your real authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Example: Listen for login/logout events (optional, for demo)
  // useEffect(() => {
  //   const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("token"));
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);

  return (
    <header className="flex justify-between items-center px-10 py-5 bg-white border-b border-[#dfe4ea] shadow-sm sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-[#2f3542] hover:text-[#1e272e] transition-colors duration-150 flex items-center group"
      >
        <span
          className="mr-2 text-2xl transition-all duration-300 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_#ffe066,0_0_12px_#ffe066,0_0_16px_#ffe066]"
        >
          💡
        </span>
        QandA Hub
      </Link>
      <nav className="flex gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-[#2f3542] hover:text-[#1e272e] px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-[#f1f2f6]"
        >
          Home
        </Link>
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="text-sm font-medium text-[#2f3542] hover:text-[#1e272e] px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-[#f1f2f6]"
          >
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/ask"
              className="text-sm font-medium text-[#2f3542] hover:text-[#1e272e] px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-[#f1f2f6]"
            >
              Ask a Question
            </Link>
            <Link
              to="/question-detail"
              className="text-sm font-medium text-[#2f3542] hover:text-[#1e272e] px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-[#f1f2f6]"
            >
              Question Detail
            </Link>
            <Link
              to="/ask-ai"
              className="text-sm font-medium text-[#2f3542] hover:text-[#1e272e] px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-[#f1f2f6]"
            >
              Ask AI
            </Link>
            <Link
              to="/user"
              className="text-sm font-medium text-[#2f3542] hover:text-[#1e272e] px-3 py-1.5 rounded-md transition-all duration-150 hover:bg-[#f1f2f6]"
            >
              User Profile
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}