"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const HeroTextContent = () => {
  const { isDarkMode } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-12 w-full text-center sm:col-span-6 sm:text-left lg:col-span-7"
    >
      <h1
        className={`mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl ${
          isDarkMode ? "text-white" : "text-[#002b36]"
        }`}
      >
        <span className="bg-gradient-to-r from-[#268bd2] via-[#2aa198] to-[#b58900] bg-clip-text text-transparent">
          Hello, I&apos;m
        </span>
        <br className="hidden sm:block" />
        <TypeAnimation
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          sequence={[
            "Sam",
            1000,
            "IC Designer",
            1000,
            "EDA Researcher",
            1000,
            "Hardware Enthusiast",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <p
        className={`mb-6 max-w-[600px] text-sm sm:mx-0 sm:text-base lg:text-lg ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
        }`}
      >
        I build research-driven hardware and IC design projects across EDA,
        mixed-signal systems, and computer architecture.
      </p>
      <div className="flex flex-col items-center gap-3 sm:items-start">
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Link
            href="https://drive.google.com/file/d/1aMRk6cMOr5sgWcwZOsVDEXbRZ4Pq6Poo/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#268bd2] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#2aa198] sm:text-lg"
          >
            Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </Link>
          <Link
            href="/projects"
            className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-base font-semibold transition-all duration-300 sm:text-lg ${
              isDarkMode
                ? "border-[#586e75] text-[#fdf6e3] hover:border-[#2aa198] hover:text-[#2aa198]"
                : "border-[#93a1a1] text-[#002b36] hover:border-[#2aa198] hover:text-[#2aa198]"
            }`}
          >
            Explore Projects
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-xs sm:justify-start sm:text-sm">
          {[
            "M.S. ECE @ UCLA",
            "EDA + Mixed-Signal",
            "Hardware Acceleration",
          ].map((item) => (
            <span
              key={item}
              className={`rounded-full border px-3 py-1 ${
                isDarkMode
                  ? "border-[#586e75] bg-[#073642] text-[#93a1a1]"
                  : "border-[#93a1a1] bg-white text-[#586e75]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div
          className="relative mt-4 inline-block"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span
            className={`text-xs font-medium ${
              isDarkMode ? "text-[#79c0ff]" : "text-[#2075c7]"
            }`}
          >
            <span className="animate-pulse">See also:</span>{" "}
            The 3D model is {" "}
            <Link
              href="https://skfb.ly/prRXD"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              Oiiaioooooiai Cat
            </Link>
            <span className="ml-1 inline-block animate-bounce">inspired asset</span>
          </span>

          <div
            className={`absolute left-0 top-full z-10 mt-2 max-w-[250px] rounded-md border px-3 py-1.5 text-xs transition-opacity duration-300 ${
              showTooltip ? "opacity-100" : "pointer-events-none opacity-0"
            } ${
              isDarkMode
                ? "border-[#30363d] bg-[#161b22] text-[#8b949e]"
                : "border-[#d0d7de] bg-[#e6eef8] text-[#657b83]"
            }`}
          >
            A playful detail for the landing page. It stays lightweight on smaller or motion-reduced devices.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroTextContent;
