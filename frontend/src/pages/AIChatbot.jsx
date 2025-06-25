// src/pages/AiChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoIosSend } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header"; // assuming your header path

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function AiChatbot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(input);
      const text = await result.response.text();
      setMessages((prev) => [...prev, { type: "bot", text }]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#e8f5e9] text-[#2f3542]">
      <Header />
      <div className="max-w-4xl mx-auto p-4 pt-6">
        <div className="bg-white rounded-xl shadow border border-[#dfe4ea] p-6 min-h-[70vh] flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xl px-4 py-2 rounded-md ${
                msg.type === "bot"
                  ? "bg-[#dee2e6] self-start"
                  : "bg-[#a3d9a5] text-white self-end"
              }`}
            >
              <div className="flex justify-between gap-2 items-start">
                <ReactMarkdown className="whitespace-pre-wrap">{msg.text}</ReactMarkdown>
                {msg.type === "bot" && (
                  <button
                    className="text-xs opacity-60 hover:opacity-100"
                    onClick={() => copyToClipboard(msg.text)}
                  >
                    <FaRegCopy />
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-[#636e72] animate-pulse px-4 py-2 bg-[#dee2e6] rounded self-start">
              Gemini is typing...
            </div>
          )}
          <div ref={chatRef} />
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-[#ced6e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b2bec3]"
          />
          <button
            onClick={handleSend}
            className="bg-[#a3d9a5] hover:bg-[#8fc28f] text-[#232526] px-4 py-2 rounded-md transition-all duration-150"
            disabled={loading}
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
}
