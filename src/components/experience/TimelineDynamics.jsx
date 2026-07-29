"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import TIMELINE_ITEMS from "@/data/timelineItems";
import { useTheme } from "@/context/ThemeContext";
import "react-vertical-timeline-component/style.min.css";
import "../../styles/timeline.css";

const INITIAL_ITEM_COUNT = 5;

function TimelineDynamics() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const closeButtonRef = useRef(null);
  const { isDarkMode } = useTheme();

  const visibleItems = showAll
    ? TIMELINE_ITEMS
    : TIMELINE_ITEMS.slice(0, INITIAL_ITEM_COUNT);

  useEffect(() => {
    if (!selectedMilestone) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedMilestone(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMilestone]);

  return (
    <div className="relative w-full px-1 sm:px-6 lg:px-8">
      <h3
        className={`mb-6 text-center text-xl font-medium transition-colors duration-300 sm:mb-8 sm:text-2xl ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"
        }`}
      >
        My Timeline
      </h3>

      <div className="mx-auto max-w-5xl">
        <VerticalTimeline
          animate={false}
          lineColor={isDarkMode ? "#93a1a1" : "#002b36"}
          className="vertical-timeline-custom"
        >
          {visibleItems.map((item, index) => (
            <TimelineItem
              key={`${item.date}-${item.title}`}
              item={item}
              index={index}
              onOpen={setSelectedMilestone}
              isDarkMode={isDarkMode}
            />
          ))}
        </VerticalTimeline>
      </div>

      {TIMELINE_ITEMS.length > INITIAL_ITEM_COUNT ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[#2aa198] hover:text-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
          >
            {showAll ? "Show recent experience only" : "Show earlier experience"}
          </button>
        </div>
      ) : null}

      {selectedMilestone ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#002b36]/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMilestone(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="timeline-dialog-title"
            className={`relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl ${
              isDarkMode
                ? "border-[#30363d] bg-[#002b36]"
                : "border-[#d0d7de] bg-white"
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedMilestone(null)}
              aria-label="Close timeline details"
              className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] ${
                isDarkMode
                  ? "bg-[#073642] text-[#e6edf3] hover:bg-[#114454]"
                  : "bg-[#eef4fb] text-[#24292f] hover:bg-[#dce8f5]"
              }`}
            >
              X
            </button>

            <div
              className={`flex flex-col items-center p-6 pt-8 ${
                isDarkMode ? "text-[#e6edf3]" : "text-[#24292f]"
              }`}
            >
              <Image
                height={80}
                width={80}
                src={selectedMilestone.logo}
                alt=""
                className="mb-4 h-20 w-20 rounded-full bg-white object-contain p-1"
              />
              <h3
                id="timeline-dialog-title"
                className="max-w-sm text-center text-xl font-bold"
              >
                {selectedMilestone.title}
              </h3>
              <p
                className={`mt-2 text-center text-sm ${
                  isDarkMode ? "text-[#8b949e]" : "text-[#57606a]"
                }`}
              >
                {selectedMilestone.date}
              </p>
              <p
                className={`mt-1 text-center text-sm italic ${
                  isDarkMode ? "text-[#8b949e]" : "text-[#57606a]"
                }`}
              >
                {selectedMilestone.location}
              </p>
              <div
                className={`my-5 h-px w-full ${
                  isDarkMode ? "bg-[#30363d]" : "bg-[#d8dee4]"
                }`}
              />
              <p
                className={`w-full whitespace-pre-line text-sm leading-7 ${
                  isDarkMode ? "text-[#b5c5cb]" : "text-[#40545d]"
                }`}
              >
                {selectedMilestone.details ||
                  "No additional details are available."}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const TimelineItem = memo(({ item, index, onOpen, isDarkMode }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      visible
      position={index % 2 === 0 ? "left" : "right"}
      date={item.date}
      dateClassName={`text-sm transition-colors sm:text-base ${
        isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"
      }`}
      contentStyle={{
        background: isDarkMode ? "#073642" : "#ffffff",
        color: isDarkMode ? "#93a1a1" : "#002b36",
        boxShadow: isDarkMode
          ? "0 3px 0 #073642"
          : "0 3px 0 #ffffff, 0 12px 30px rgba(15,23,42,0.06)",
        border: isDarkMode ? "1px solid #586e75" : "1px solid #d8e2eb",
        padding: "1.25rem",
        marginBottom: "1.5rem",
      }}
      contentArrowStyle={{
        borderRight: isDarkMode
          ? "7px solid #073642"
          : "7px solid #ffffff",
      }}
      iconStyle={{
        background: isDarkMode ? "#002b36" : "#ffffff",
        border: isDarkMode ? "2px solid #586e75" : "2px solid #93a1a1",
      }}
      icon={
        <div className="h-full w-full overflow-hidden rounded-full">
          <Image
            src={item.logo}
            alt=""
            className="h-full w-full rounded-full object-contain"
            width={40}
            height={40}
            sizes="(max-width: 768px) 40px, 60px"
            priority={index < 2}
          />
        </div>
      }
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-haspopup="dialog"
        className="w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-4"
      >
        <h4
          className={`text-base font-semibold sm:text-lg ${
            isDarkMode ? "text-[#d3e4ea]" : "text-[#002b36]"
          }`}
        >
          {item.title}
        </h4>
        <p
          className={`mt-1 text-xs italic sm:text-sm ${
            isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
          }`}
        >
          {item.location}
        </p>
        <p
          className={`mt-3 text-xs leading-6 sm:text-sm ${
            isDarkMode ? "text-[#b5c5cb]" : "text-[#586e75]"
          }`}
        >
          {item.description}
        </p>
        <span className="mt-4 inline-block text-xs font-semibold text-[#268bd2] sm:text-sm">
          View details
        </span>
      </button>
    </VerticalTimelineElement>
  );
});

TimelineItem.displayName = "TimelineItem";

export default TimelineDynamics;
