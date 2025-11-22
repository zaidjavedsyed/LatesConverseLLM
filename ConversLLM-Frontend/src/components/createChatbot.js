"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { authorizedFetch } from "@/lib/utils";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Create = () => {
  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showRedirectButton, setShowRedirectButton] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchData = async () => {
    if (inputValue.trim() === "") {
      toast.error("Please enter a valid URL before generating ChatBOT");
      return;
    }

    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: inputValue,
    });

    try {
      const response = await authorizedFetch(
        "http://localhost:3001/chatbot",
        { method: "POST", headers: myHeaders, body: raw, redirect: "follow" },
        "http://localhost:3001"
      );

      if (response.ok) {
        toast.success("Data added successfully");
        setShowRedirectButton(true);
      } else {
        const errorData = await response.json();
        toast.error(
          `Error deleting data: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error adding data:", error);
      toast.error("Error adding data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUpdateData = async () => {
    if (inputValue.trim() === "") {
      toast.error("Please enter a valid URL before updating data");
      return;
    }

    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: inputValue,
    });

    try {
      const response = await authorizedFetch(
        "http://localhost:3001/chatbot",
        { method: "PUT", headers: myHeaders, body: raw, redirect: "follow" },
        "http://localhost:3001"
      );

      if (response.ok) {
        toast.success("Data updated successfully");
      } else {
        const errorData = await response.json();
        toast.error(
          `Error deleting data: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
    }

    setIsLoading(false);
  };

  const fetchDeleteData = async () => {
    if (inputValue.trim() === "") {
      toast.error("Please enter a valid URL before deleting data");
      return;
    }

    setIsLoading(true);

    // ... (remaining code)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: inputValue,
    });

    try {
      const response = await authorizedFetch(
        "http://localhost:3001/chatbot",
        { method: "DELETE", headers: myHeaders, body: raw, redirect: "follow" },
        "http://localhost:3001"
      );

      if (response.ok) {
        toast.success("Data deleted successfully");
        setInputValue("");
      } else {
        const errorData = await response.json();
        toast.error("Error deleting data:");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting data");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <DialogHeader className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Chatbot
        </DialogTitle>
        <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
          Enter your website's URL to transform it into an intelligent conversational experience
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website URL
          </label>
          <input
            id="website-url"
            type="url"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="https://example.com"
            disabled={isLoading}
          />
        </div>

        <DialogFooter className="flex flex-col space-y-3">
          {isLoading ? (
            <Button
              disabled
              className="w-full py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed"
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </Button>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={fetchUpdateData}
                  className="py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 text-sm"
                >
                  Update
                </Button>
                <Button
                  onClick={fetchDeleteData}
                  className="py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 text-sm"
                >
                  Delete
                </Button>
                {showRedirectButton ? (
                  <Link href="/chatbot">
                    <Button className="py-2 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 text-sm">
                      Redirect
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={fetchData}
                    className="py-2 px-4 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white rounded-lg transition-all duration-200 text-sm"
                  >
                    Generate
                  </Button>
                )}
              </div>
            </div>
          )}
          <ToastContainer />
        </DialogFooter>
      </div>
    </div>
  );
};
export default Create;
