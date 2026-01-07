import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const defaultTemplates = [
  {
    id: 1,
    name: "Leave for Fever",
    subject: "Requesting Medical Leave",
    body:
      "Dear Sir/Madam,\n\n" +
      "I am suffering from fever and body pain. Doctor advised rest for 1–2 days.\n\n" +
      "Kindly grant me leave.\n\nRegards,\n[Your Name]"
  },
  {
    id: 2,
    name: "Leave for Marriage",
    subject: "Leave Request for Marriage",
    body:
      "Dear Sir/Madam,\n\n" +
      "There is a marriage function in my family. I request leave for the mentioned dates.\n\n" +
      "Thank you.\n\nRegards,\n[Your Name]"
  },
  {
    id: 3,
    name: "Job Application",
    subject: "Application for Job Position",
    body:
      "Dear Hiring Manager,\n\n" +
      "I am applying for the job position. Please find my resume attached.\n\n" +
      "Regards,\n[Your Name]"
  }
];

const BulkSend = () => {
  const [contacts, setContacts] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  /* ---------- FILE IMPORT (EMAIL LIST) ---------- */
  const handleFileImport = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, {
        type: "binary"
      });
      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      const emails = rows
        .map((row) => {
          const key = Object.keys(row).find((k) =>
            k.toLowerCase().includes("mail")
          );
          return key ? row[key] : null;
        })
        .filter(Boolean);

      setContacts(emails);
      toast.success("Emails imported successfully");
    };

    reader.readAsBinaryString(uploadedFile);
  };

  /* ---------- TEMPLATE SELECT ---------- */
  const handleTemplateChange = (id) => {
    const temp = defaultTemplates.find(
      (t) => t.id === Number(id)
    );
    if (!temp) return;
    setSubject(temp.subject);
    setBody(temp.body);
  };

  /* ---------- 🎤 VOICE INPUT ---------- */
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Voice input not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setBody((prev) => prev + " " + spokenText);
    };

    recognition.onerror = () => {
      toast.error("Voice recognition failed");
    };

    recognition.start();
  };

  /* ---------- REMOVE SINGLE CONTACT ---------- */
  const removeContact = (index) => {
    setContacts((prev) =>
      prev.filter((_, i) => i !== index)
    );
    toast.info("Contact removed");
  };

  /* ---------- SEND (FRONTEND DEMO) ---------- */
  const handleSendAll = () => {
    if (!contacts.length)
      return toast.error("No contacts available");
    if (!subject || !body)
      return toast.error("Template / message missing");

    console.log({
      contacts,
      subject,
      body,
      attachment: file?.name
    });

    toast.success("Mail ready to send");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">
          Bulk Mail Sender
        </h1>

        {/* TEMPLATE */}
        <div className="mb-4">
          <label className="font-semibold">
            Choose Template
          </label>
          <select
            className="w-full mt-2 p-3 border rounded-lg"
            onChange={(e) =>
              handleTemplateChange(e.target.value)
            }
          >
            <option value="">-- Select Template --</option>
            {defaultTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBJECT */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* BODY */}
        <textarea
          className="w-full h-40 border p-3 rounded-lg mb-2"
          placeholder="Email body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {/* 🎤 VOICE BUTTON */}
        <button
          onClick={handleVoiceInput}
          className="mb-6 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <img
            src="https://img.icons8.com/fluency/24/microphone.png"
            alt="mic"
          />
          Voice Input
        </button>

        {/* FILE IMPORT */}
        <div className="mb-6">
          <label className="font-semibold">
            Import Email File (Excel / CSV)
          </label>
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileImport}
            className="block mt-2"
          />

          {file && (
            <p className="text-green-600 text-sm mt-1">
              File selected: {file.name}
            </p>
          )}
        </div>

        {/* CONTACT LIST */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            Contacts ({contacts.length})
          </h3>

          <div className="border rounded-lg h-56 overflow-y-auto bg-gray-50">
            {contacts.length === 0 && (
              <p className="p-4 text-gray-400 text-sm">
                No contacts imported
              </p>
            )}

            {contacts.map((email, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 py-2 border-b text-sm"
              >
                <span>{email}</span>
                <button
                  onClick={() => removeContact(idx)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SEND */}
        <button
          onClick={handleSendAll}
          className="w-full bg-[#7fb6a4] text-white py-3 rounded-lg font-bold hover:bg-[#6aa897]"
        >
          Send to All Contacts
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default BulkSend;
