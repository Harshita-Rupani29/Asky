import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import LoginSignUpIllustration from "../components/LoginSignUpIllustration";
import { AuthContext } from "../utils/context-API";
import useHttp from "../utils/hooks/http-hook";
import Loader from "../components/Loader"; 

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (!backendUrl) {
      toast.error("Backend URL is not configured.");
      return;
    }

    const LoginData = { email: formData.email, password: formData.password };

    try {
      const response = await sendRequest(
        `${backendUrl}/api/users/login`,
        "POST",
        JSON.stringify(LoginData),
        {
          "Content-Type": "application/json",
        }
      );

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      if (response?.userId && response?.token && response?.profile) {
        authContext.login(response.userId, response.token, response.profile);
        toast.success("Logged in!");
        navigate("/questions");
      } else {
        toast.error("Login failed. User may not be registered.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  return (
    <>
      {isLoading && <Loader color="#36d7b7" />}

      <div className="min-h-screen flex flex-col justify-between bg-white px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto gap-16 flex-grow">
          <LoginSignUpIllustration></LoginSignUpIllustration>

          <div className="w-full max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              Welcome back!
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="laraa2@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading} 
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-600">
              Create an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Signup
              </span>
            </div>

            <div className="text-center mt-2 text-sm text-gray-600">
              Don’t want to Login?{" "}
              <span
                onClick={() => navigate("/questions")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Continue as guest
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
