"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import HeroTextContent from "./HeroTextContent";
import HeroModel from "./HeroModel";

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`rounded-[2rem] border px-4 py-8 shadow-sm sm:px-6 sm:py-10 lg:px-10 ${
        isDarkMode
          ? "border-[#243240] bg-[#0f172a]"
          : "border-[#d8e2eb] bg-[#f8fafc]"
      }`}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 place-items-center gap-8 sm:grid-cols-12">
        <HeroTextContent />
        <HeroModel />
      </div>
    </section>
  );
};

export default HeroSection;
