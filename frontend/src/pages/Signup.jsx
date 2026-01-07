import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE – Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-8">
            Signup to get started
          </p>

          <form onSubmit={handleSignup} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-3 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7fb6a4] text-white py-3 rounded-full font-semibold hover:bg-[#6aa897] transition"
            >
              Sign up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE – Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#a8cbbf] p-10 text-center">

          <div className="text-6xl mb-6">📨</div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Join Bulk Mailer
          </h2>

          <p className="text-white/90 text-sm leading-relaxed max-w-xs">
            Create your account and start sending professional bulk emails
            using smart templates and automation.
          </p>

          <div className="flex gap-2 mt-6">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white/60 rounded-full"></span>
            <span className="w-2 h-2 bg-white/40 rounded-full"></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
