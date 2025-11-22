"use client";
import "../../styles/globals.css";
import Create from "@/components/createChatbot";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import FooterSection from "@/components/footer";
import InternalNavbar from "@/components/internalnavbar";
import { Plus, Bot } from "lucide-react";

export default function Home() {
  return (
    <>
      <InternalNavbar />
      <main className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Manage your AI chatbots and track their performance
            </p>
          </div>

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome to ConverseLLM</h2>
                <p className="text-violet-100">Transform any website into an intelligent chatbot</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Lightning Fast</p>
                  <p className="text-sm text-violet-100">Instant AI responses</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Easy Setup</p>
                  <p className="text-sm text-violet-100">Just add your website URL</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Secure & Private</p>
                  <p className="text-sm text-violet-100">Your data stays protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create New Chatbot Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create New Chatbot
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Transform any website into an intelligent conversational experience
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Chatbot
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <Create />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Create your first AI chatbot in minutes. Simply add your website URL and watch as we transform it into an intelligent conversational experience for your visitors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add Website</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enter your website URL to get started</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Processing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our AI analyzes your content</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Deploy & Chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your chatbot is ready to use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
