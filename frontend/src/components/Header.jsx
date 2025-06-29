import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu, GiArtificialHive } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoMdHome } from "react-icons/io";
import { IoInformationSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import BackDrop from "./BackDrop";
import { AuthContext } from "../utils/context-API";


const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <div className="w-full bg-white px-8 py-4 shadow-md">
        <header className="flex justify-between items-center">
          <div className="w-14 h-16">
            <img src={('assets/logo.png')} alt="logo" className="w-full h-full object-contain" />
          </div>

          <nav className="hidden md:flex gap-10 text-gray-700 font-medium">
            <Link to="/questions" className="hover:text-blue-700">Questions</Link>
            <Link to="/askAi" className="hover:text-blue-700">Ask AI</Link>
            <Link to="/about" className="hover:text-blue-700">About</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/ask"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Ask Question
                </Link>
                <Link
                  to="/profile"
                  className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden text-3xl cursor-pointer" onClick={() => setIsSideBarOpen(true)}>
            <GiHamburgerMenu />
          </div>
        </header>
      </div>

      <SideBar
        isOpen={isSideBarOpen}
        close={() => setIsSideBarOpen(false)}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />

      {isSideBarOpen}
    </>
  );
};

const SideBar = ({ isOpen, close, isLoggedIn, logout }) => {
  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-full bg-white shadow-xl transition-transform duration-500 ease-in-out rounded-l-md w-[65%] md:w-[45%] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col pt-20 px-4 relative">
        <button
          className="absolute top-2 left-2 text-4xl text-gray-700"
          onClick={close}
        >
          <IoMdCloseCircleOutline />
        </button>

        <ul className="flex flex-col gap-4 border-b pb-3 text-lg text-gray-800">
          <Link to="/questions" className="flex items-center gap-2">
            <IoMdHome />
            <p>Questions</p>
          </Link>
          <Link to="/askAI" className="flex items-center gap-2">
            <GiArtificialHive />
            <p>Ask AI</p>
          </Link>
          <Link to="/about" className="flex items-center gap-2">
            <IoInformationSharp />
            <p>About</p>
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className="flex items-center gap-2">
              <CgProfile />
              <p>Profile</p>
            </Link>
          )}
        </ul>

        <div className="flex flex-col mt-6 gap-4">
          {!isLoggedIn && (
            <Link
              to="/login"
              className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition text-center"
            >
              Login / Signup
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link
                to="/ask"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-center"
              >
                Ask Question
              </Link>
              <button
                onClick={logout}
                className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Header;
