import { NextResponse } from "next/server";

export const runtime = "nodejs";

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Please complete every required field." },
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
            "The contact form is not configured yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL on the server.",
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
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: payload.message || "The email provider rejected the message." },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true, id: payload.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}
