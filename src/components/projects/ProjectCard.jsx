"use client";
import React, { memo } from "react";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const ProjectCard = memo(
  ({ imgUrl, title, description, gitUrl, previewUrl, tag = [], year, featured, stack = [], linkLabel }) => {
    const { isDarkMode } = useTheme();
    const visibleTags = tag.filter((item) => item !== "All").slice(0, 2);
    const hasPreview = previewUrl && previewUrl !== "/";

    return (
      <article
        className={`flex h-full min-h-[430px] flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          isDarkMode
            ? "border-[#586e75] bg-[#073642]"
            : "border-[#93a1a1] bg-[#e6eef8]"
        }`}
      >
        <div className="relative h-52 overflow-hidden">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center text-center text-sm font-medium ${
                isDarkMode
                  ? "bg-gradient-to-br from-[#002b36] via-[#073642] to-[#0f172a] text-[#d3e4ea]"
                  : "bg-gradient-to-br from-white via-[#f8fbff] to-[#eef4fb] text-[#35505c]"
              }`}
            >
              Image coming soon
            </div>
          )}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            {featured ? (
              <span className="rounded-full bg-[#268bd2] px-3 py-1 text-xs font-semibold text-white">
                Featured
              </span>
            ) : (
              <span />
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isDarkMode ? "bg-[#002b36]/85 text-[#fdf6e3]" : "bg-white/85 text-[#002b36]"
              }`}
            >
              {year}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {visibleTags.map((item) => (
              <span
                key={item}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                  isDarkMode
                    ? "border-[#586e75] text-[#93a1a1]"
                    : "border-[#93a1a1] text-[#586e75]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <h3 className={`mb-3 text-xl font-semibold ${isDarkMode ? "text-white" : "text-[#002b36]"}`}>
            {title}
          </h3>

          <p className={`flex-1 text-sm leading-6 ${isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}`}>
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className={`rounded-full px-2.5 py-1 text-xs ${
                  isDarkMode ? "bg-[#002b36] text-[#d3e4ea]" : "bg-white text-[#35505c]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {gitUrl ? (
              <Link
                href={gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#268bd2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2aa198]"
              >
                <CodeBracketIcon className="h-4 w-4" />
                {linkLabel || "View details"}
              </Link>
            ) : (
              <span
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm ${
                  isDarkMode ? "bg-[#002b36] text-[#93a1a1]" : "bg-white text-[#586e75]"
                }`}
              >
                Details available on request
              </span>
            )}

            {hasPreview ? (
              <Link
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "border-[#586e75] text-[#fdf6e3] hover:border-[#2aa198] hover:text-[#2aa198]"
                    : "border-[#268bd2] text-[#002b36] hover:border-[#2aa198] hover:text-[#2aa198]"
                }`}
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                Live preview
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
