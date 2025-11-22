"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      // Check if the user has scrolled down
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
      className={`bg-white/50 dark:bg-slate-900/50 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-slate-700 ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {" "}
        {/* Reduced padding */}
        <a href="/" className="flex items-center space-x-3">
          <span className="self-center text-black dark:text-white text-4xl">
            <div className="relative w-44 h-16">
              <Image
                src="/sitegenie-2.png"
                alt="ConverseLLM Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </span>
        </a>
        <div className="flex items-center space-x-3 md:space-x-3 rtl:space-x-reverse md:order-2">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
          </button>
          <button className="bg-indigo-50 dark:bg-slate-800 text-violet-800 dark:text-violet-300 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-4 text-sm hover:bg-indigo-100 dark:hover:bg-slate-700">
            <a href="/sign-in"> Login</a>
          </button>
          <button className="bg-gradient-to-r from-violet-800 to-violet-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-4 text-sm hover:bg-indigo-700">
            <a href="/sign-up"> Sign Up</a>
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
