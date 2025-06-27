import React, { useContext } from "react";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../utils/context-API";

function ProfileBanner({ username, questionsAsked, score, profilePic }) {
  const { logout } = useContext(AuthContext);

  // Correctly construct the image URL
  // 1. Use VITE_BACKEND_URL as your images are served by the backend.
  // 2. Always replace backslashes with forward slashes for URL compatibility,
  //    in case there are older entries in the DB or inconsistencies.
  const profileImageUrl = profilePic
    ? `${import.meta.env.VITE_BACKEND_URL}/${profilePic.replace(/\\/g, '/')}`
    : "/assets/avatar.webp"; // Fallback to a local asset if no profilePic

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="flex justify-between items-end text-white h-[230px] px-6 md:px-8"
      style={{
        backgroundImage: 'url("/assets/profileBanner3.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center">
        <img
          src={profileImageUrl} // Use the correctly constructed URL
          alt="Profile"
          className="w-24 h-24 md:w-24 md:h-24 rounded-full mr-4 md:mr-6 object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-1">{username}</h2>
          <div className="flex gap-6 bg-white text-black px-4 py-2 rounded mt-2 text-base text-center">
            <p className="flex items-center gap-1">
              {questionsAsked} <span>Questions asked</span>
            </p>
            <p className="flex items-center gap-1">
              {score} <IoIosStar className="text-yellow-500 text-lg" />
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#354547] hover:bg-[#2e3c3d] transition-colors text-white px-5 py-2 md:py-3 text-sm md:text-base rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileBanner;