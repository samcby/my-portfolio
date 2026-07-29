"use client";
import React from "react";
import { useTheme } from '@/context/ThemeContext';

const ProjectTag = ({ name, onClick, isSelected }) => {
  const { isDarkMode } = useTheme();
  
  const buttonStyles = isSelected
    ? isDarkMode
      ? "text-[#fdf6e3] border-[#268bd2]"
      : "text-[#002b36] border-[#268bd2]"
    : isDarkMode
      ? "text-[#839496] border-[#586e75] hover:border-[#93a1a1]"
      : "text-[#586e75] border-[#93a1a1] hover:border-[#002b36]";

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`${buttonStyles} cursor-pointer rounded-full border-2 px-3 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2 sm:px-5 sm:text-sm`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
