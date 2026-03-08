"use client";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "@/context/ThemeContext";

const initialStatus = { type: "idle", message: "" };

const EmailSection = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const form = useRef(null);
  const recaptchaRef = useRef(null);
  const { isDarkMode } = useTheme();

  const recaptchaEnabled = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const canSubmit = !recaptchaEnabled || isVerified;

  const handleRecaptchaChange = (token) => {
    setIsVerified(Boolean(token));
    if (!token) {
      setStatus({ type: "error", message: "The reCAPTCHA challenge expired. Please try again." });
    }
  };

  const resetForm = () => {
    form.current?.reset();
    recaptchaRef.current?.reset();
    setIsVerified(false);
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    setStatus(initialStatus);

    if (!canSubmit) {
      setStatus({
        type: "error",
        message: "Please complete the reCAPTCHA challenge before sending your message.",
      });
      return;
    }

    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      subject: formData.get("subject")?.toString().trim(),
      message: formData.get("message")?.toString().trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({ message: "Failed to send message." }));

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent successfully.",
      });
      resetForm();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="flex flex-col items-center">
      <div className="w-full max-w-5xl rounded-3xl border p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={`text-sm sm:text-base leading-7 ${isDarkMode ? "text-[#839496]" : "text-[#586e75]"}`}>
              I am always open to research conversations, internships, and engineering collaborations.
              If you would like to discuss a project, paper, or opportunity, feel free to send a message.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { label: "Best for", value: "Research collaborations and internships" },
                { label: "Location", value: "Los Angeles, California" },
                { label: "Response style", value: "Thoughtful, technical, and direct" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border px-4 py-3 ${
                    isDarkMode ? "border-[#586e75] bg-[#073642]" : "border-[#93a1a1] bg-[#e6eef8]"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-[0.2em] ${isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}`}>
                    {item.label}
                  </p>
                  <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? "text-white" : "text-[#002b36]"}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/samcby"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#268bd2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2aa198]"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bingyu-chen-b85b36324/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "border-[#586e75] text-[#fdf6e3] hover:border-[#2aa198] hover:text-[#2aa198]"
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
                  isDarkMode ? "border-[#2aa198] bg-[#073642]" : "border-[#2aa198] bg-[#f1fbf8]"
                }`}
              >
                <p className="text-lg font-semibold text-[#2aa198]">Message sent</p>
                <p className={`mt-3 text-sm sm:text-base ${isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}`}>
                  {status.message}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus(initialStatus)}
                  className="mt-6 rounded-full bg-[#268bd2] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2aa198]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"}`}
                  >
                    Your Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    required
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border p-3 transition-colors ${
                      isDarkMode
                        ? "border-[#586e75] bg-[#073642] text-[#93a1a1] placeholder-[#657b83]"
                        : "border-[#93a1a1] bg-[#eee8d5] text-[#002b36] placeholder-[#93a1a1]"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"}`}
                  >
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    required
                    className={`w-full rounded-xl border p-3 transition-colors ${
                      isDarkMode
                        ? "border-[#586e75] bg-[#073642] text-[#93a1a1] placeholder-[#657b83]"
                        : "border-[#93a1a1] bg-[#eee8d5] text-[#002b36] placeholder-[#93a1a1]"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"}`}
                  >
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    id="subject"
                    placeholder="What would you like to discuss?"
                    required
                    className={`w-full rounded-xl border p-3 transition-colors ${
                      isDarkMode
                        ? "border-[#586e75] bg-[#073642] text-[#93a1a1] placeholder-[#657b83]"
                        : "border-[#93a1a1] bg-[#eee8d5] text-[#002b36] placeholder-[#93a1a1]"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"}`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    placeholder="Tell me a bit about your project, role, or question."
                    className={`w-full resize-none rounded-xl border p-3 transition-colors ${
                      isDarkMode
                        ? "border-[#586e75] bg-[#073642] text-[#93a1a1] placeholder-[#657b83]"
                        : "border-[#93a1a1] bg-[#eee8d5] text-[#002b36] placeholder-[#93a1a1]"
                    }`}
                  />
                </div>

                {recaptchaEnabled ? (
                  <div className="flex items-center justify-center sm:justify-start">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme={isDarkMode ? "dark" : "light"}
                      hl="en"
                    />
                  </div>
                ) : (
                  <p className={`text-xs leading-6 ${isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}`}>
                    Spam protection is disabled in this environment because NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set.
                  </p>
                )}

                {status.type === "error" ? (
                  <p className="rounded-xl border border-[#dc2626]/40 bg-[#dc2626]/10 px-4 py-3 text-sm text-[#dc2626]" aria-live="polite">
                    {status.message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium text-[#fdf6e3] transition-colors sm:text-base ${
                    isSubmitting || !canSubmit
                      ? "cursor-not-allowed bg-gray-500"
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

export default EmailSection;
