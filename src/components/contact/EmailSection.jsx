"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const initialStatus = { type: "idle", message: "" };

const EmailSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const { isDarkMode } = useTheme();

  const sendEmail = async (event) => {
    event.preventDefault();
    setStatus(initialStatus);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response
        .json()
        .catch(() => ({ message: "The message could not be sent." }));

      if (!response.ok) {
        throw new Error(result.message || "The message could not be sent.");
      }

      setStatus({
        type: "success",
        message: "Thanks for reaching out. I will reply as soon as I can.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "The message could not be sent. Please use the direct email link instead.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName = `w-full rounded-xl border p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] ${
    isDarkMode
      ? "border-[#586e75] bg-[#073642] text-[#e6eef8] placeholder-[#839496]"
      : "border-[#d8e2eb] bg-white text-[#002b36] placeholder-[#94a3b8]"
  }`;

  return (
    <section id="contact" className="flex flex-col items-center">
      <div className="w-full max-w-5xl rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-bg)] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p
              className={`text-sm leading-7 sm:text-base ${
                isDarkMode ? "text-[#b5c5cb]" : "text-[#586e75]"
              }`}
            >
              I am open to research collaborations, engineering internships,
              and conversations about IC design, EDA, computer architecture,
              and hardware acceleration.
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Best for",
                  value: "Research collaborations and internships",
                },
                { label: "Location", value: "Los Angeles, California" },
                {
                  label: "Response style",
                  value: "Thoughtful, technical, and direct",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border px-4 py-3 ${
                    isDarkMode
                      ? "border-[#586e75] bg-[#073642]"
                      : "border-[#93a1a1] bg-[#e6eef8]"
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-[0.2em] ${
                      isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`mt-1 text-sm sm:text-base ${
                      isDarkMode ? "text-white" : "text-[#002b36]"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:samchenbingyu@gmail.com"
                className="inline-flex items-center rounded-full bg-[#268bd2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
              >
                Email directly
              </a>
              <a
                href="https://www.linkedin.com/in/bingyu-chen-b85b36324/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2 ${
                  isDarkMode
                    ? "border-[#586e75] text-[#e6eef8] hover:border-[#2aa198] hover:text-[#2aa198]"
                    : "border-[#268bd2] text-[#002b36] hover:border-[#2aa198] hover:text-[#2aa198]"
                }`}
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            {status.type === "success" ? (
              <div
                className={`rounded-2xl border px-6 py-8 text-center ${
                  isDarkMode
                    ? "border-[#2aa198] bg-[#073642]"
                    : "border-[#2aa198] bg-[#f1fbf8]"
                }`}
                role="status"
              >
                <p className="text-lg font-semibold text-[#2aa198]">
                  Message sent
                </p>
                <p
                  className={`mt-3 text-sm sm:text-base ${
                    isDarkMode ? "text-[#b5c5cb]" : "text-[#586e75]"
                  }`}
                >
                  {status.message}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus(initialStatus)}
                  className="mt-6 rounded-full bg-[#268bd2] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={sendEmail}
                aria-busy={isSubmitting}
                className="space-y-4"
              >
                <ContactField
                  id="name"
                  label="Your Name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  className={fieldClassName}
                  isDarkMode={isDarkMode}
                />
                <ContactField
                  id="email"
                  label="Your Email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="you@example.com"
                  className={fieldClassName}
                  isDarkMode={isDarkMode}
                />
                <ContactField
                  id="subject"
                  label="Subject"
                  type="text"
                  maxLength={150}
                  placeholder="What would you like to discuss?"
                  className={fieldClassName}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label
                    htmlFor="message"
                    className={`mb-2 block text-sm font-medium ${
                      isDarkMode ? "text-[#d3e4ea]" : "text-[#002b36]"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    maxLength={5000}
                    required
                    placeholder="Tell me about your project, role, or question."
                    className={`${fieldClassName} resize-y`}
                  />
                </div>

                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <p
                  className={`text-xs leading-6 ${
                    isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
                  }`}
                >
                  Your information is used only to reply to this message. If
                  delivery is unavailable, please use the direct email link.
                </p>

                {status.type === "error" ? (
                  <p
                    className="rounded-xl border border-[#dc2626]/40 bg-[#dc2626]/10 px-4 py-3 text-sm text-[#b91c1c]"
                    role="alert"
                  >
                    {status.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2 sm:text-base ${
                    isSubmitting
                      ? "cursor-not-allowed bg-[#64748b]"
                      : "bg-[#268bd2] hover:bg-[#2aa198]"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactField = ({
  id,
  label,
  className,
  isDarkMode,
  ...inputProps
}) => (
  <div>
    <label
      htmlFor={id}
      className={`mb-2 block text-sm font-medium ${
        isDarkMode ? "text-[#d3e4ea]" : "text-[#002b36]"
      }`}
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      required
      className={className}
      {...inputProps}
    />
  </div>
);

export default EmailSection;
