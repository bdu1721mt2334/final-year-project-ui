import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const UploadContacts = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // 💥 Auto-detect email column
  const extractEmail = (obj) => {
    const keys = Object.keys(obj);
    const emailKey = keys.find((key) =>
      key.toLowerCase().includes("mail")
    );
    return obj[emailKey] || null;
  };

  const processFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected!");

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    // -------------------------------
    // 1️⃣ Read CSV / TXT Files
    // -------------------------------
    if (fileName.endsWith(".txt") || fileName.endsWith(".csv")) {
      reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split("\n").map((l) => l.trim());
        const emails = lines.map((email) => ({ email }));

        setContacts(emails);
        toast.success("TXT / CSV Contacts Loaded!");
      };
      reader.readAsText(file);
      return;
    }

    // -------------------------------
    // 2️⃣ Read Excel Files
    // -------------------------------
    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Extract emails from Excel rows
        const emailList = jsonData
          .map((row) => extractEmail(row))
          .filter((mail) => mail !== null);

        if (emailList.length === 0) {
          return toast.error("No email column found in Excel!");
        }

        const formatted = emailList.map((email) => ({ email }));

        setContacts(formatted);
        toast.success("Excel Contacts Loaded!");
      };

      reader.readAsBinaryString(file);
      return;
    }

    // Unsupported file
    toast.error("Unsupported file type!");
  };

  const uploadToServer = () => {
    if (!contacts.length) return toast.error("No contacts to upload!");

    localStorage.setItem("uploadedContacts", JSON.stringify(contacts));
    toast.success("Contacts saved! Redirecting…");

    setTimeout(() => navigate("/bulk-send"), 700);
  };

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto bg-white p-6 mt-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Upload Contacts</h1>

        {/* ACCEPT Excel + CSV + TXT */}
        <input
          type="file"
          accept="
            .txt,
            .csv,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
            application/vnd.ms-excel
          "
          onChange={processFile}
          className="w-full mb-4"
        />

        <button
          onClick={uploadToServer}
          className="w-full bg-[#7fb6a4] text-white p-3 rounded-lg hover:bg-[#6aa897]"
        >
          Save & Go to Bulk Send
        </button>
      </div>

      <Footer />
    </>
  );
};

export default UploadContacts;
