import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import LoginSignUpIllustration from "../components/LoginSignUpIllustration";
import { AuthContext } from "../utils/context-API";
import useHttp from "../utils/hooks/http-hook";
import Loader from "../components/Loader";

const Signup = () => {
  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  const handleSignup = async (data) => {
    clearError();
    setSuccessMessage(null);

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const signupData = {
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        level: data.level,
      };

      const res = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        "POST",
        JSON.stringify(signupData),
        {
          "Content-Type": "application/json",
        }
      );

      if (res && res.message) {
        setSuccessMessage(res.message);
        toast.success(res.message);

        reset();

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error("Signup process completed, but received an unexpected response. Please check your email manually.");
      }
    } catch (err) {
      console.error("Signup submission error:", err);
    }
  };

  return (
    <>
      {isLoading && <Loader color="#36d7b7" />}
      <div className="min-h-screen flex flex-col justify-between bg-white px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto gap-16 flex-grow">
          <LoginSignUpIllustration />

          <div className="w-full max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              Join QA Hub today!
            </h2>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Amelia"
                  {...register("firstName", { required: "First name is required" })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Lara"
                  {...register("lastName", { required: "Last name is required" })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  placeholder="8902345678"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{6,12}$/,
                      message: "Invalid mobile number (6-12 digits)",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mobileNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="laraa2@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="********"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  id="level"
                  {...register("level", { required: "Please select your level" })}
                  className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.level ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select level</option>
                  <option value="Primary School">Primary School</option>
                  <option value="Secondary School">Secondary School</option>
                  <option value="University/College">University</option>
                  <option value="Other">Other</option>
                </select>
                {errors.level && (
                  <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                SignUp
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </div>

            <div className="text-center mt-2 text-sm text-gray-600">
              Don’t want to Signup?{" "}
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

export default Signup;