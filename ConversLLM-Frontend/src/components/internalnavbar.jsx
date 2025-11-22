import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Bot, Home, Settings, LogOut } from "lucide-react";

const InternalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <a href="/user-dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10">
                <Image
                  src="/sitegenie-logo.png"
                  alt="ConverseLLM Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  ConverseLLM
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  AI Dashboard
                </p>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/user-dashboard"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="/preview"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Bot className="h-4 w-4" />
              <span className="font-medium">Chatbots</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="font-medium">Settings</span>
            </a>
          </div>

          {/* User Section */}
          <div className="flex items-center">
            {/* User Button */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-full p-1">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-lg",
                      userButtonPopoverActionButton: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700",
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InternalNavbar;
