import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-2xl p-6 hidden md:block border-r">
        <h2 className="text-2xl font-bold text-[#7fb6a4] mb-8">
          Bulk Mailer
        </h2>

        {/* Logged-in user */}
        <div className="bg-[#eef6f3] p-3 rounded-xl text-sm text-gray-700 mb-6">
          Logged in as:
          <span className="font-semibold block mt-1 text-[#4f8f7a]">
            {user?.email}
          </span>
        </div>

        <ul className="space-y-4 text-gray-700 font-medium">

          <li>
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e6f2ee] text-[#4f8f7a]">
              <img
                src="https://img.icons8.com/fluency/24/dashboard-layout.png"
                alt="Dashboard"
              />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/compose" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e6f2ee] transition">
              <img
                src="https://img.icons8.com/fluency/24/new-post.png"
                alt="Compose"
              />
              Compose Mail
            </Link>
          </li>

          <li>
            <Link to="/templates" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e6f2ee] transition">
              <img
                src="https://img.icons8.com/fluency/24/document.png"
                alt="Templates"
              />
              Templates
            </Link>
          </li>

          <li>
            <Link to="/upload" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e6f2ee] transition">
              <img
                src="https://img.icons8.com/fluency/24/upload.png"
                alt="Upload"
              />
              Upload Contacts
            </Link>
          </li>

          <li>
            <Link to="/bulk-send" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#e6f2ee] transition">
              <img
                src="https://img.icons8.com/fluency/24/mailbox-opened.png"
                alt="Bulk Send"
              />
              Bulk Send
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Navbar */}
        <div className="bg-white p-4 shadow-md rounded-xl mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Dashboard
          </h1>

          <div className="text-gray-600 font-medium hidden md:block">
            {user?.email}
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://img.icons8.com/fluency/48/email-open.png"
              alt="Total mails"
              className="mb-3"
            />
            <h3 className="text-gray-600 font-semibold">
              Total Mails Sent
            </h3>
            <p className="text-4xl font-bold text-[#7fb6a4] mt-2">
              128
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://img.icons8.com/fluency/48/template.png"
              alt="Templates"
              className="mb-3"
            />
            <h3 className="text-gray-600 font-semibold">
              Templates Saved
            </h3>
            <p className="text-4xl font-bold text-[#7fb6a4] mt-2">
              12
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <img
              src="https://img.icons8.com/fluency/48/address-book.png"
              alt="Contacts"
              className="mb-3"
            />
            <h3 className="text-gray-600 font-semibold">
              Contacts Uploaded
            </h3>
            <p className="text-4xl font-bold text-[#7fb6a4] mt-2">
              567
            </p>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Recent Activity
          </h2>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <ul className="space-y-3 text-gray-700">
              <li className="border-b pb-2">✔ Mail sent to 120 contacts</li>
              <li className="border-b pb-2">✔ New template “Offer Mail” created</li>
              <li className="border-b pb-2">✔ Contacts CSV file uploaded</li>
              <li>✔ Dashboard UI updated</li>
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
