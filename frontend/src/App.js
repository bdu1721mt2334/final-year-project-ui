import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ComposeMail from "./pages/ComposeMail";
import Templates from "./pages/Templates";
import UploadContacts from "./pages/UploadContacts";
import BulkSend from "./pages/BulkSend";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      {/* Toast system */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        pauseOnHover
      />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compose" element={<ComposeMail />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/upload" element={<UploadContacts />} />
          <Route path="/bulk-send" element={<BulkSend />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
