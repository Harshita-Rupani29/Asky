import React, { useState, useEffect, useContext, useCallback } from "react"; // Add useCallback if not already there
import { AuthContext } from "../utils/context-API";
import useHttp from "../utils/hooks/http-hook";
import ProfileBanner from "../components/ProfileBanner";
import Header from "../components/Header";
import QuestionsList from "../components/QuestionList";
import EditProfile from "../components/EditProfile";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Profile = () => {
 
  const { userId, token } = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttp();
  const [result, setResult] = useState({});
  const [activeSection, setActiveSection] = useState("myQuestions");

  const fetchData = useCallback(async () => {
   
    if (!userId || !token) {
      console.log("User ID or authentication token not available. Skipping profile fetch.");
    
      return;
    }

    try {
      const response = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me/${userId}`,
        "GET",
        null, 
        {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json' 
        }
      );
      setResult(response.user);
    } catch (e) {
      toast.error(e.message || "Failed to fetch profile data.");
      console.error("Profile fetch error:", e);
    }
  }, [userId, token, sendRequest]); 

  useEffect(() => {
    fetchData(); 
  }, [fetchData]); 

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col w-full">
        <Header />
        <ProfileBanner
          username={result?.firstName || "Unknown"}
          score={result?.score}
          questionsAsked={result?.questions?.length}
          profilePic={result.profile_image}
        />

        <div className="w-full flex justify-center gap-4 sm:gap-6 lg:gap-14 my-8">
          {["myQuestions", "editProfile", "saved"].map((section) => (
            <div key={section} className="flex flex-col items-center">
              <button
                className={`text-sm sm:text-base px-4 py-2 rounded-full border border-gray-300
                  ${activeSection === section ? "bg-black text-white font-semibold" : "bg-white text-black"}`}
                onClick={() => handleSectionChange(section)}
              >
                {section === "myQuestions" && "My Questions"}
                {section === "editProfile" && "Edit Profile"}
                {section === "saved" && "Saved Questions"}
              </button>
              {activeSection === section && (
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1 transition-transform" />
              )}
            </div>
          ))}
        </div>

        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-0 max-w-[770px] mx-auto transition-opacity duration-300">
          {activeSection === "myQuestions" && (
            <QuestionsList data={result.questions} />
          )}
          {activeSection === "editProfile" && (
            <EditProfile data={result} />
          )}
          {activeSection === "saved" && (
            <QuestionsList data={result.savedQuestions} />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;