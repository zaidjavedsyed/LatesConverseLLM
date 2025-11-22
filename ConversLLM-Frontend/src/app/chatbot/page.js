"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import "../../styles/globals.css";
import Image from "next/image";
import WhiteLogo from "@/components/white-logo";

import {
  ArrowLeft,
  BotIcon,
  LoaderCircleIcon,
  SendHorizontalIcon,
  User2Icon,
} from "lucide-react";
import Tempchatlogo from "@/components/tempchatlogo";
import Loadingsvg from "./loadingsvg";
import { authorizedFetch } from "@/lib/utils";
import GenieLogo from "@/components/genie-logo";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");

  var router = useSearchParams();
  useEffect(() => {
    const urlFromParams = router.get("url") || "";
    setWebsiteUrl(urlFromParams);
    setQuestion(urlFromParams);
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: question },
    ]);

    const raw = JSON.stringify({
      url: websiteUrl || "https://skippi.in",
      prompt: question,
    });
    setQuestion("");

    try {
      const response = await authorizedFetch(
        "http://localhost:3001/chatbotprompt",
        { method: "POST", body: raw, redirect: "follow" },
        "http://localhost:3001"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const textData = await response.text(); // Get the response as text directly
      console.log("Bot response:", textData);
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: textData },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // Set loading state back to false after receiving the result
    }
  };
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <main className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Modern Header */}
        <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
            >
              <a href="/preview" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Dashboard</span>
              </a>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center">
                <BotIcon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI Assistant
              </span>
            </div>
          </div>
        </nav>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
          {/* Welcome Message */}
          <div className="mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                <BotIcon className="h-5 w-5 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700 max-w-md">
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                  Hello! I'm your AI assistant. How can I help you today?
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {time}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto pb-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-3 max-w-md ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user" 
                      ? "bg-gradient-to-r from-gray-600 to-gray-700" 
                      : "bg-gradient-to-r from-violet-500 to-violet-600"
                  }`}>
                    {message.type === "user" ? (
                      <User2Icon className="h-4 w-4 text-white" />
                    ) : (
                      <BotIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 shadow-sm border ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-tr-md"
                      : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 rounded-tl-md"
                  }`}>
                    <p className="text-sm leading-relaxed break-words">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Message */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-md">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <BotIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="p-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
              >
                <SendHorizontalIcon className="h-5 w-5" />
              </button>
            </form>
            
            {/* Footer */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Powered by{" "}
                  <a href="/" className="font-semibold text-violet-600 dark:text-violet-400 hover:underline">
                    ConverseLLM
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Chatbot;
