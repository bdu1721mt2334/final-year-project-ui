import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">

      {/* Left Navigation */}
      <nav className="flex gap-6 items-center text-gray-700 font-medium">

        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:text-[#7fb6a4] transition"
        >
          <img
            src="https://img.icons8.com/fluency/24/dashboard-layout.png"
            alt="Dashboard"
          />
          Dashboard
        </Link>

        <Link
          to="/compose"
          className="flex items-center gap-2 hover:text-[#7fb6a4] transition"
        >
          <img
            src="https://img.icons8.com/fluency/24/new-post.png"
            alt="Compose"
          />
          Compose
        </Link>

        <Link
          to="/templates"
          className="flex items-center gap-2 hover:text-[#7fb6a4] transition"
        >
          <img
            src="https://img.icons8.com/fluency/24/document.png"
            alt="Templates"
          />
          Templates
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-2 hover:text-[#7fb6a4] transition"
        >
          <img
            src="https://img.icons8.com/fluency/24/upload.png"
            alt="Upload Contacts"
          />
          Upload Contacts
        </Link>

        <Link
          to="/bulk-send"
          className="flex items-center gap-2 hover:text-[#7fb6a4] transition"
        >
          <img
            src="https://img.icons8.com/fluency/24/mailbox-opened.png"
            alt="Bulk Send"
          />
          Bulk Send
        </Link>

      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-medium hidden md:block">
          {user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition"
        >
          Logout
        </button>
      </div>

    </header>
  );
};

export default Header;
