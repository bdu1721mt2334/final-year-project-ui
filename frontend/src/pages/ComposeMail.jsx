import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [attachment, setAttachment] = useState(null);

  // Voice input
  const [listening, setListening] = useState(false);

  // Scheduling
  const [sendLater, setSendLater] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // Handle Voice Input
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prev) => prev + " " + transcript);
    };

    recognition.start();
  };

  // Final Send function (frontend-only)
  const handleSend = () => {
    const payload = {
      to,
      subject,
      message,
      attachment: attachment ? attachment.name : null,
      scheduled: sendLater,
      scheduleDate,
      scheduleTime,
    };

    console.log("FINAL PAYLOAD:", payload);
    toast.success(sendLater ? "Email Scheduled!" : "Email Sent!");
  };

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 mt-6 rounded-2xl">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Compose Email
        </h1>

        {/* To */}
        <label className="block font-medium text-gray-600 mb-1">
          Recipient Email
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-3 border-b-2 border-gray-300 focus:border-[#7fb6a4] focus:outline-none mb-5"
        />

        {/* Subject */}
        <label className="block font-medium text-gray-600 mb-1">
          Subject
        </label>
        <input
          type="text"
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border-b-2 border-gray-300 focus:border-[#7fb6a4] focus:outline-none mb-5"
        />

        {/* Message Body */}
        <label className="block font-medium text-gray-600 mb-1">
          Message
        </label>
        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-xl h-44 mb-4 focus:ring-2 focus:ring-[#7fb6a4] focus:outline-none"
        />

        {/* Voice Input */}
        <button
          onClick={handleVoiceInput}
          className={`flex items-center gap-3 px-4 py-2 rounded-md mb-6 transition ${
            listening
              ? "bg-[#6aa897] text-white"
              : "bg-purple-600 text-white hover:bg-purple-800"
          }`}
        >
          <img
            src="https://img.icons8.com/fluency/24/microphone.png"
            alt="Voice Input"
          />
          {listening ? "Listening..." : "Voice Input"}
        </button>

        {/* Attachment */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-600 mb-1">
            Attach File
          </label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full"
          />

          {attachment && (
            <div className="flex items-center gap-2 mt-2 text-sm text-[#4f8f7a]">
              <img
                src="https://img.icons8.com/fluency/20/attach.png"
                alt="Attached"
              />
              {attachment.name}
            </div>
          )}
        </div>

        {/* Schedule Toggle */}
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sendLater}
              onChange={() => setSendLater(!sendLater)}
              className="w-5 h-5 accent-[#7fb6a4]"
            />
            <span className="font-semibold text-gray-700">
              Schedule this email
            </span>
          </label>
        </div>

        {/* Schedule Date + Time */}
        {sendLater && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="font-medium mb-1 block text-gray-600">
                Select Date
              </label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7fb6a4] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-medium mb-1 block text-gray-600">
                Select Time
              </label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7fb6a4] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full bg-[#7fb6a4] hover:bg-[#6aa897] text-white p-3 rounded-full text-lg font-semibold transition"
        >
          {sendLater ? "Schedule Email" : "Send Now"}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default ComposeMail;
