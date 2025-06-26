import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import  LoginSignUpillustration from "../components/image";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in...");
    navigate("/questions"); 
  };

return (
  <div className="min-h-screen flex flex-col justify-between bg-white px-6">
    <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto gap-16 flex-grow">
      <LoginSignUpillustration />

      {/* Right Form */}
      <div className="w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Welcome back !
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="laraa2@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
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
);

};

export default Login;
