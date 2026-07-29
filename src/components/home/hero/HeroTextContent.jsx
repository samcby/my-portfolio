"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const HeroTextContent = () => {
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 min-w-0 w-full text-center sm:col-span-6 sm:text-left lg:col-span-7"
    >
      <h1
        className={`mb-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl ${
          isDarkMode ? "text-white" : "text-[#002b36]"
        }`}
      >
        <span className="block bg-gradient-to-r from-[#268bd2] via-[#2aa198] to-[#b58900] bg-clip-text text-transparent">
          Hello, I&apos;m
        </span>
        {prefersReducedMotion ? (
          <span className="mt-1 block min-h-[2.5rem] text-2xl sm:min-h-[3rem] sm:text-3xl md:text-4xl lg:min-h-[3.75rem] lg:text-5xl">
            IC Designer
          </span>
        ) : (
          <TypeAnimation
            className="mt-1 block min-h-[2.5rem] text-2xl sm:min-h-[3rem] sm:text-3xl md:text-4xl lg:min-h-[3.75rem] lg:text-5xl"
            sequence={[
              "Sam",
              1000,
              "IC Designer",
              1000,
              "IC Researcher",
              1000,
              "Hardware Enthusiast",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        )}
      </h1>
      <p
        className={`mb-6 max-w-[600px] text-sm sm:mx-0 sm:text-base lg:text-lg ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
        }`}
      >
        I build research-driven hardware and IC design projects across circuit
        design, hardware acceleration, and computer architecture.
      </p>
      <div className="flex flex-col items-center gap-3 sm:items-start">
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <Link
            href="https://drive.google.com/file/d/1i307tAClEGwEdmHXx7f_vXjTiObBohev/view?usp=drive_link"
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
            "IC Design",
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

        <p
          className={`mt-4 max-w-full text-xs leading-5 ${
            isDarkMode ? "text-[#79c0ff]" : "text-[#2075c7]"
          }`}
        >
          Interactive model attribution:{" "}
          <Link
            href="https://skfb.ly/prRXD"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2]"
          >
            Oiiaioooooiai Cat
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default HeroTextContent;
