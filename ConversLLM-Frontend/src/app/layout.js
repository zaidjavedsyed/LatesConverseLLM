"use client";
import { Poppins, Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Animate from "@/components/animate";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { ThemeProvider } from "@/components/theme-provider";

const header = Poppins({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-header",
});

const body = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>ConverseLLM - AI-Powered Website Chatbots</title>
        <meta name="description" content="Create intelligent chatbots for your website with ConverseLLM. Transform your website content into an AI-powered conversational experience." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={twMerge("min-h-screen bg-background dark:bg-slate-900", body.className)}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
