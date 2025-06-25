import { useState } from "react";
import { Link } from "react-router-dom";

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
    // No backend call – just printing for now
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-br from-green-100 via-white to-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col gap-7 border border-green-100"
      >
        <h2 className="text-4xl font-extrabold text-green-700 text-center mb-2 tracking-tight drop-shadow">
          Create Account
        </h2>
        <p className="text-center text-green-600 mb-2">
          Join QA Hub and Start Asking or Answering Questions!
        </p>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-green-800 font-semibold mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
              placeholder="First Name"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-green-800 font-semibold mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-green-800 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-green-800 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
              placeholder="Password"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-green-800 font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div>
          <label className="block text-green-800 font-semibold mb-1">Level</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
          >
            <option value="">Select Level</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="college/university">College/University</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-green-800 font-semibold mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
            placeholder="Mobile Number"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-150 text-lg tracking-wide"
        >
          Sign Up
        </button>

        <div className="text-center mt-2 text-green-800">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}