import { NextResponse } from "next/server";
import { questionnaireSchema } from "@/lib/validation";
import { isEmailConfigured, sendNotificationEmail } from "@/lib/mailer";
import { escapeHtml } from "@/lib/escape-html";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";

const MIN_FILL_TIME_MS = 3000;

const QUESTION_LABELS: Record<string, string> = {
  struggle: "What they struggle with most",
  blocker: "What stops them from starting",
  focusLoss: "How easily focus slips",
  bigTaskReaction: "What happens with a big task",
  triedBefore: "Tools tried before",
  wantsHelpWith: "Wants JumpyBrain to help with",
};

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

  const parsed = questionnaireSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Please check your answers and try again.";
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 });
  }

  const { answers, email, company, formRenderedAt } = parsed.data;

  if (company) {
    return NextResponse.json({ ok: true });
  }
  if (Date.now() - formRenderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  // If no email was left, there's nothing actionable to deliver -- just
  // acknowledge success without sending mail (this is an anonymous check-in).
  if (!email) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailConfigured()) {
    console.error(
      "[questionnaire] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS, and FEEDBACK_TO_EMAIL."
    );
    return NextResponse.json(
      { ok: false, error: "This can't be delivered right now. Please try again later." },
      { status: 503 }
    );
  }

  const rows = Object.entries(answers).map(([key, value]) => {
    const label = QUESTION_LABELS[key] ?? key;
    const display = Array.isArray(value) ? value.join(", ") || "(none selected)" : value;
    return { label, display };
  });

  try {
    await sendNotificationEmail({
      subject: "New JumpyBrain quick check-in submission",
      replyTo: email || undefined,
      text: [
        `Email: ${email}`,
        "",
        ...rows.map((row) => `${row.label}: ${row.display}`),
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">New quick check-in submission</h2>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <table cellpadding="6" style="border-collapse: collapse; margin-top: 12px;">
            ${rows
              .map(
                (row) => `
              <tr>
                <td style="font-weight: 600; vertical-align: top;">${escapeHtml(row.label)}</td>
                <td>${escapeHtml(row.display)}</td>
              </tr>`
              )
              .join("")}
          </table>
        </div>
      `,
    });
  } catch (error) {
    console.error("[questionnaire] failed to send email", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong submitting your check-in. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
