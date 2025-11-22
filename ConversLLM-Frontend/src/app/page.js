"use client";
import HeroSection from "../components/heroSection";
import FAQ_E from "../components/faqs";
import CTA from "@/components/cta-section";
import "@/styles/globals.css";
import FooterSection from "@/components/footer";
import FeatureSection from "@/components/features";
import Teamsection from "@/components/teamsection";

export default function Page() {
  return (
    <div className="relative p-5 bg-white dark:bg-slate-900 min-h-screen">
      <HeroSection />
      <FeatureSection />
      <FAQ_E />
      <Teamsection />
      <CTA />
      <FooterSection />
    </div>
  );
}
