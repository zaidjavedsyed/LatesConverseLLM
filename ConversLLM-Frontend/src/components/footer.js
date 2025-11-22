import { GithubIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";

const FooterSection = () => {
  return (
    <>
      <footer className="w-full py-8 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <a href="/" className="flex justify-center mb-8">
              <div className="relative w-64 h-24">
                <Image
                  src="/sitegenie-2.png"
                  alt="ConverseLLM Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </a>

            <div className="flex justify-center items-center space-x-6 mb-8">
              <a
                href="https://github.com/conversellm"
                className="text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <GithubIcon width="40px" height="40px" />
              </a>
              <a
                href="https://x.com/conversellm"
                className="text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <TwitterIcon width="40px" height="40px" />
              </a>
              <a
                href="https://www.linkedin.com/company/conversellm"
                className="text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg
                  width="40px"
                  height="40px"
                  className="hover:stroke-indigo-600 dark:hover:stroke-indigo-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.56"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M16.12 9.69027V17.6947L15.18 17.7942L10.64 9.9292L9.8 10.0088V21L20 20.2832V6.06562L15.34 3L3 4.09687V17.1372L6.32 21V7.10625L16.12 6.31832"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>

            <span className="text-lg text-gray-500 dark:text-gray-400">
              © <a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">ConverseLLM</a> 2024 - Future, All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
