import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full bg-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        {/* Add your logo here if needed */}
      </div>

      <nav className="flex space-x-8 text-sm font-medium">
        <Link
          to="/questions"
          className="text-black hover:text-white transition duration-200"
        >
          Questions
        </Link>
        <Link
          to="/askAI"
          className="text-black hover:text-white transition duration-200"
        >
          Ask AI
        </Link>
        <Link
          to="/about"
          className="text-black hover:text-white transition duration-200"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center space-x-3">
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="bg-black text-white hover:text-white font-semibold text-base px-10 py-3 rounded hover:bg-gray-800 text-center transition duration-200"
          >
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/ask"
              className="bg-black text-white hover:text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Ask Question
            </Link>
            <Link
              to="/profile"
              className="bg-gray-200 text-black hover:text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white border border-gray-300 text-black hover:text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
