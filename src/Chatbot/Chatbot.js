import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showPrompts, setShowPrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const prompts = [
    "Recommend the top 5 tourist attractions in Paris",
    "Plan a budget-friendly trip to Thailand for 2 weeks",
    "Plan a customized trip to Italy based on my interests in history and art",
    "What are the must-see attractions in Tokyo for first-time visitors?",
    "Where should I go for a winter holiday in Europe?",
    "What are the top 5 cultural experiences to have in Mexico City?",
  ];

  const handleSendMessage = async (promptMessage = null) => {
    const userMessage = promptMessage || message;
    if (!userMessage) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "User is not authenticated." },
      ]);
      return;
    }

    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setShowPrompts(false);
    setIsLoading(true); // Start loading

    try {
      const apiUrl = "https://localhost:7030/api/Chat/send-message";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const data = { content: userMessage };
      const res = await axios.post(apiUrl, data, { headers });
      const responseData = res.data?.response?.result;

      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: responseData || "No result found." },
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err.response?.data?.message || "An error occurred.",
        },
      ]);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="Ai-container">
      <video autoPlay loop muted className="Ai-videoBackground">
        <source
          src="/Video/Ai Background.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="Ai-overlay">
        {chatHistory.length === 0 && (
          <>
            <h1 className="Ai-title">
              Hi There, <span className="Ai-highlight">Welcome To TourNest </span>
            </h1>
            <p className="Ai-subtitle">Where Are You Travelling To This Season?</p>
          </>
        )}

        {showPrompts && chatHistory.length === 0 && (
          <div className="Ai-prompts">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                className="Ai-promptButton"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {chatHistory.length > 0 && (
          <div className="Ai-chatBox">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={
                  chat.role === "user"
                    ? "Ai-userMessageContainer"
                    : "Ai-assistantMessageContainer"
                }
              >
                <div
                  className={
                    chat.role === "user"
                      ? "Ai-userMessage"
                      : "Ai-assistantMessage"
                  }
                >
                  {chat.role === "assistant" ? (
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  ) : (
                    <p>{chat.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="Ai-assistantMessageContainer">
                <div className="Ai-assistantMessage">Typing...</div>
              </div>
            )}
          </div>
        )}

        <div className="Ai-inputContainer">
          <input
            type="text"
            className="Ai-textInput"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="Ai-sendButton" onClick={() => handleSendMessage()}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
