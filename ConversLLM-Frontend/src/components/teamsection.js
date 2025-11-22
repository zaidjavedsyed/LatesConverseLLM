import { User2Icon } from "lucide-react";
import React from "react";

const Teamsection = () => {
  return (
    <>
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-5xl text-center text-gray-900 dark:text-white">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-xl mx-auto md:max-w-3xl lg:max-w-6xl">
            <div className="block group md:col-span-1 lg:col-span-1">
              <div className="relative mb-6">
                <User2Icon className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-gray-500 border-solid border-transparent group-hover:border-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                Zaid Syed
              </h4>
              <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">Developer</span>
            </div>

            <div className="block group md:col-span-1 lg:col-span-1">
              <div className="relative mb-6">
                <User2Icon className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-gray-500 border-solid border-transparent group-hover:border-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                Gokul Gupta
              </h4>
              <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">Developer</span>
            </div>

            <div className="block group md:col-span-1 lg:col-span-1">
              <div className="relative mb-6">
                <User2Icon className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-gray-500 border-solid border-transparent group-hover:border-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                Mohit Pandita
              </h4>
              <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">Developer</span>
            </div>

            <div className="block group md:col-span-1 lg:col-span-1">
              <div className="relative mb-6">
                <User2Icon className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-gray-500 border-solid border-transparent group-hover:border-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                Ayush Khurana
              </h4>
              <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">Developer</span>
            </div>

            <div className="block group md:col-span-1 lg:col-span-1">
              <div className="relative mb-6">
                <User2Icon className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-gray-500 border-solid border-transparent group-hover:border-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600">
                Pratyush Bhat
              </h4>
              <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-white">Developer</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Teamsection;
