import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimits = new Map();

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const cleanValue = (value, maxLength) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const getClientAddress = (request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (clientAddress) => {
  const now = Date.now();
  const existing = rateLimits.get(clientAddress);

  if (!existing || now - existing.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimits.set(clientAddress, { count: 1, startedAt: now });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
};

const isSameOrigin = (request) => {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

export async function POST(request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { message: "This request could not be verified." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const website = cleanValue(body.website, 200);

    // Silently accept bot submissions so the honeypot is not disclosed.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (isRateLimited(getClientAddress(request))) {
      return NextResponse.json(
        { message: "Too many messages were submitted. Please try again later." },
        { status: 429 }
      );
    }

    const name = cleanValue(body.name, 100);
    const email = cleanValue(body.email, 254);
    const subject = cleanValue(body.subject, 150);
    const message = cleanValue(body.message, 5000);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Please complete every required field." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        {
          message:
            "Online delivery is temporarily unavailable. Please use the direct email link.",
        },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `New message from ${name} (${email})\n\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
            <h2 style="margin-bottom: 12px;">New portfolio contact</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
          </div>
        `,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            "Online delivery is temporarily unavailable. Please use the direct email link.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        message:
          "The message could not be sent. Please use the direct email link.",
      },
      { status: 500 }
    );
  }
}
