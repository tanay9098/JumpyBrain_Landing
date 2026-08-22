"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { emailSchema } from "@/lib/validation";

const RATINGS = [
  { value: 1, icon: "😕", label: "Not great" },
  { value: 2, icon: "😐", label: "Okay" },
  { value: 3, icon: "🙂", label: "Good" },
  { value: 4, icon: "😊", label: "Great" },
  { value: 5, icon: "🤩", label: "Loved it" },
] as const;

const CATEGORIES = [
  { value: "idea", icon: "💡", label: "Feature idea" },
  { value: "bug", icon: "🐛", label: "Something's broken" },
  { value: "confused", icon: "😕", label: "Something confused me" },
  { value: "general", icon: "💬", label: "General thought" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const renderedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!rating) next.rating = "Pick a rating so we know how it landed.";
    if (!category) next.category = "Choose the type that fits best.";
    if (message.trim().length < 10) next.message = "A few more words would help us a lot.";
    if (email.trim()) {
      const parsed = emailSchema.safeParse(email.trim());
      if (!parsed.success) next.email = parsed.error.issues[0]?.message ?? "Enter a valid email.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          category,
          message: message.trim(),
          email: email.trim(),
          company: honeypotRef.current?.value ?? "",
          formRenderedAt: renderedAt.current,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <span aria-hidden="true" className="text-4xl">
          🙏
        </span>
        <h3 className="text-xl font-bold text-text-primary">Thank you!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
          Your feedback just landed straight in our inbox. It genuinely shapes what we
          build next.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-semibold text-text-primary">
          Overall, how has JumpyBrain felt so far?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <button
              key={r.value}
              type="button"
              aria-pressed={rating === r.value}
              onClick={() => setRating(r.value)}
              className={cn(
                "flex flex-1 min-w-[64px] flex-col items-center gap-1 rounded-jb-md border-2 px-2 py-3 text-xs font-medium transition-colors",
                rating === r.value
                  ? "border-brand-purple bg-surface-active text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-border-strong"
              )}
            >
              <span aria-hidden="true" className="text-2xl">
                {r.icon}
              </span>
              {r.label}
            </button>
          ))}
        </div>
        {errors.rating ? (
          <p role="alert" className="mt-1.5 text-sm text-accent-red">
            {errors.rating}
          </p>
        ) : null}
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-text-primary">
          What best describes your feedback?
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              aria-pressed={category === c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "flex items-center gap-2 rounded-jb-md border-2 px-3 py-2.5 text-left text-sm font-medium transition-colors",
                category === c.value
                  ? "border-brand-purple bg-surface-active text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-border-strong"
              )}
            >
              <span aria-hidden="true">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
        {errors.category ? (
          <p role="alert" className="mt-1.5 text-sm text-accent-red">
            {errors.category}
          </p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="feedback-message" className="text-sm font-semibold text-text-primary">
          Tell us more
        </label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="What worked, what didn't, what you'd love to see next..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "feedback-message-error" : undefined}
          className="mt-2 w-full resize-none rounded-jb-sm border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-brand-purple"
        />
        {errors.message ? (
          <p id="feedback-message-error" role="alert" className="mt-1.5 text-sm text-accent-red">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="feedback-email" className="text-sm font-semibold text-text-primary">
          Email <span className="font-normal text-text-muted">(optional, if you&rsquo;re open to us following up)</span>
        </label>
        <input
          id="feedback-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "feedback-email-error" : undefined}
          className="mt-2 h-11 w-full rounded-jb-sm border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-brand-purple"
        />
        {errors.email ? (
          <p id="feedback-email-error" role="alert" className="mt-1.5 text-sm text-accent-red">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Honeypot -- hidden from real users, bots tend to fill every field */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="feedback-company">Company</label>
        <input
          id="feedback-company"
          ref={honeypotRef}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.form ? (
        <p role="alert" className="text-sm text-accent-red">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send feedback"}
      </Button>
    </form>
  );
}
