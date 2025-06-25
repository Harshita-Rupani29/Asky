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

    // Simulate a loading delay for UI testing (optional)
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted (UI only)");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-green-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center mb-2">Login</h2>

        <div>
          <label className="block text-green-800 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
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
            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 rounded-lg shadow hover:from-green-500 hover:to-green-700 transition-all duration-150"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-2 text-green-800">
          New here?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}