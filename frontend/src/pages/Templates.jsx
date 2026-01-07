import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const defaultTemplates = [
  {
    id: 1,
    name: "Leave for Fever",
    subject: "Requesting Medical Leave",
    body:
      "Dear Sir/Madam,\n\n" +
      "I am writing this email to inform you that I am suffering from fever and related health issues. Due to my current condition, I am unable to attend work/school today.\n\n" +
      "I have been advised to take proper rest in order to recover fully. Hence, I kindly request you to grant me leave for 1–2 days.\n\n" +
      "I assure you that I will resume my responsibilities once I recover.\n\n" +
      "Thank you for your understanding.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 2,
    name: "Leave for Marriage",
    subject: "Leave Request for Marriage Function",
    body:
      "Dear Sir/Madam,\n\n" +
      "I would like to inform you that there is a marriage function in my family, and my presence is required for the same.\n\n" +
      "Therefore, I kindly request you to grant me leave on the mentioned date(s). I will ensure that all my responsibilities are managed properly before my leave.\n\n" +
      "Thank you for your support and consideration.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 3,
    name: "School Leave",
    subject: "Requesting Leave for School",
    body:
      "Respected Teacher,\n\n" +
      "I am unable to attend school today due to personal reasons. I kindly request you to excuse my absence for the day.\n\n" +
      "I assure you that I will complete all the classwork and homework that I miss.\n\n" +
      "Thank you for your kind understanding.\n\n" +
      "Yours sincerely,\n[Your Name]"
  },
  {
    id: 4,
    name: "Leave for HR",
    subject: "Requesting Leave – Official Reason",
    body:
      "Dear HR,\n\n" +
      "I am writing to formally request leave due to unavoidable personal circumstances.\n\n" +
      "I have completed all my assigned tasks and ensured that my responsibilities are managed during my absence. I will also be reachable in case of any urgent requirements.\n\n" +
      "Kindly grant me leave for the mentioned period.\n\n" +
      "Thanks & Regards,\n[Your Name]"
  },
  {
    id: 5,
    name: "Internship Request",
    subject: "Application for Internship",
    body:
      "Dear Sir/Madam,\n\n" +
      "I am writing to express my interest in applying for an internship position at your esteemed organization.\n\n" +
      "I am eager to gain practical experience and enhance my skills by working under your guidance. I believe this internship will help me grow both professionally and personally.\n\n" +
      "Kindly let me know the further procedure.\n\n" +
      "Thank you for your time and consideration.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 6,
    name: "Job Application Mail",
    subject: "Application for Job Position",
    body:
      "Dear Hiring Manager,\n\n" +
      "I am writing to apply for the job position available at your organization.\n\n" +
      "I believe my skills, qualifications, and experience make me a suitable candidate for this role. Please find my resume attached for your reference.\n\n" +
      "I would appreciate the opportunity to discuss my application further.\n\n" +
      "Thank you for your time and consideration.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 7,
    name: "Offer Acceptance Mail",
    subject: "Acceptance of Job Offer",
    body:
      "Dear Hiring Manager,\n\n" +
      "I am pleased to formally accept the job offer extended to me. Thank you very much for providing me with this opportunity.\n\n" +
      "I am excited to join your organization and contribute to the team. Kindly let me know the next steps in the onboarding process.\n\n" +
      "Looking forward to working with you.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 8,
    name: "Project Submission Mail",
    subject: "Submission of Project Work",
    body:
      "Dear Sir/Madam,\n\n" +
      "As per the given instructions, I am submitting my project for your review.\n\n" +
      "All the required documents and files have been attached with this email. Kindly let me know if any changes or corrections are required.\n\n" +
      "Thank you for your guidance and support throughout the project.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 9,
    name: "Apology / Sorry Mail",
    subject: "Apology Regarding Recent Issue",
    body:
      "Dear Sir/Madam,\n\n" +
      "I sincerely apologize for the inconvenience caused due to my recent mistake.\n\n" +
      "I take full responsibility for the issue and assure you that I will be more careful in the future to avoid such situations.\n\n" +
      "Thank you for your patience and understanding.\n\n" +
      "Regards,\n[Your Name]"
  },
  {
    id: 10,
    name: "Reminder / Follow-up Mail",
    subject: "Gentle Reminder",
    body:
      "Dear Sir/Madam,\n\n" +
      "This is a gentle reminder regarding my previous email.\n\n" +
      "I kindly request you to review it and provide your response at your earliest convenience.\n\n" +
      "Thank you for your time and support.\n\n" +
      "Regards,\n[Your Name]"
  }
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const selectTemplate = (temp) => {
    setSelectedTemplate(temp);
    setSubject(temp.subject);
    setBody(temp.body);
  };

  const sendMail = (e) => {
    e.preventDefault();
    console.log({ to, subject, body });
    alert("Mail ready to send (backend connect panna real-ah send aagum)");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT – Template List */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Templates
          </h2>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {defaultTemplates.map((temp) => (
              <div
                key={temp.id}
                onClick={() => selectTemplate(temp)}
                className={`p-4 rounded-xl cursor-pointer border transition
                  ${
                    selectedTemplate?.id === temp.id
                      ? "bg-[#e6f2ee] border-[#7fb6a4]"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
              >
                <p className="font-semibold text-gray-700">
                  {temp.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click to view details
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE – Template Details */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-lg p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Template Details
          </h2>

          {selectedTemplate ? (
            <>
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Subject
              </p>
              <div className="bg-gray-50 p-3 rounded-xl text-sm mb-4">
                {selectedTemplate.subject}
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-1">
                Message
              </p>
              <div className="bg-gray-50 p-3 rounded-xl text-sm whitespace-pre-line max-h-72 overflow-y-auto">
                {selectedTemplate.body}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">
              Select a template to view details
            </p>
          )}
        </div>

        {/* RIGHT – Edit & Send */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Edit & Send Email
          </h2>

          <form onSubmit={sendMail} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                To Email
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7fb6a4] focus:outline-none"
                placeholder="recipient@gmail.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Subject
              </label>
              <input
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7fb6a4] focus:outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Message
              </label>
              <textarea
                className="w-full p-3 border rounded-xl h-56 focus:ring-2 focus:ring-[#7fb6a4] focus:outline-none"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7fb6a4] hover:bg-[#6aa897] text-white py-3 rounded-full font-bold shadow transition"
            >
              Send Email
            </button>
          </form>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Templates;
