import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaMobileAlt, FaGraduationCap } from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    level: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  const inputClass =
    "w-full pl-10 pr-3 py-2 border border-gray-300 rounded bg-white text-sm focus:outline-none";

  const iconStyle = "absolute left-3 top-2.5 text-gray-400";

  return (
    <div className="min-h-screen bg-[#f9fafb] flex justify-center items-center px-4 py-12">
      <div className="flex w-full max-w-5xl bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 bg-[#f0f4f8] p-6">
          <img
            src="/SignUp.png"
            alt="Sign up"
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Sign up
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Join our Q&A community today
          </p>

          <div className="flex gap-4">
            <div className="relative w-1/2">
              <FaUser className={iconStyle} />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="relative w-1/2">
              <FaUser className={iconStyle} />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative">
            <FaEnvelope className={iconStyle} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative w-1/2">
              <FaLock className={iconStyle} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="relative w-1/2">
              <FaLock className={iconStyle} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative">
            <FaGraduationCap className={iconStyle} />
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Level</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="college/university">College/University</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="relative">
            <FaMobileAlt className={iconStyle} />
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={form.mobileNumber}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-sm font-medium bg-green-200 hover:bg-green-300 text-gray-800 rounded"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
