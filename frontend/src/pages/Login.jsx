import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted (UI only)");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-green-100 shadow-sm rounded-2xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-green-800 text-center">Login</h2>

        <div>
          <label className="block text-green-800 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-100 rounded-lg bg-[#f9fdf9] focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-green-800 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-100 rounded-lg bg-[#f9fdf9] focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 rounded-lg transition-all duration-150"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-sm text-green-700">
          New here?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
