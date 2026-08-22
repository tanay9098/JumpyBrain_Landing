import { NextResponse } from "next/server";
import { feedbackSchema, CATEGORY_LABELS } from "@/lib/validation";
import { isEmailConfigured, sendNotificationEmail } from "@/lib/mailer";
import { escapeHtml } from "@/lib/escape-html";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";

const MIN_FILL_TIME_MS = 1500;

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Please check your answers and try again.";
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 });
  }

  const { rating, category, message, email, company, formRenderedAt } = parsed.data;

  // Honeypot: a real user never fills this hidden field.
  if (company) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  // Basic bot heuristic: real users take at least ~1.5s to fill the form.
  if (Date.now() - formRenderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  if (!isEmailConfigured()) {
    console.error(
      "[feedback] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS, and FEEDBACK_TO_EMAIL."
    );
    return NextResponse.json(
      { ok: false, error: "Feedback can't be delivered right now. Please try again later." },
      { status: 503 }
    );
  }

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  try {
    await sendNotificationEmail({
      subject: `JumpyBrain feedback: ${CATEGORY_LABELS[category]} (${rating}/5)`,
      replyTo: email || undefined,
      text: [
        `Rating: ${stars} (${rating}/5)`,
        `Category: ${CATEGORY_LABELS[category]}`,
        `Email: ${email || "(not provided)"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">New JumpyBrain feedback</h2>
          <p><strong>Rating:</strong> ${escapeHtml(stars)} (${rating}/5)</p>
          <p><strong>Category:</strong> ${escapeHtml(CATEGORY_LABELS[category])}</p>
          <p><strong>Email:</strong> ${email ? escapeHtml(email) : "(not provided)"}</p>
          <p style="white-space: pre-wrap; border-left: 3px solid #7c6cf6; padding-left: 12px; margin-top: 16px;">${escapeHtml(
            message
          )}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[feedback] failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your feedback. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
