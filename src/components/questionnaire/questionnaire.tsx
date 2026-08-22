"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { OptionCard } from "./option-card";
import { AFFIRMATIONS, QUESTIONS } from "./questions";
import { emailSchema } from "@/lib/validation";

type Answers = Record<string, string | string[]>;
type Status = "in-progress" | "submitting" | "success" | "error";

const TOTAL_STEPS = QUESTIONS.length + 1; // +1 for the summary/email step

export function Questionnaire() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("in-progress");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const renderedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const isSummaryStep = stepIndex === QUESTIONS.length;
  const currentQuestion = isSummaryStep ? null : QUESTIONS[stepIndex];

  const affirmation = useMemo(
    () => AFFIRMATIONS[stepIndex % AFFIRMATIONS.length],
    [stepIndex]
  );

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canGoNext = currentQuestion
    ? currentQuestion.kind === "single"
      ? Boolean(currentAnswer)
      : Array.isArray(currentAnswer) && currentAnswer.length > 0
    : true;

  function selectSingle(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function toggleMulti(questionId: string, value: string) {
    setAnswers((prev) => {
      const existing = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [questionId]: next };
    });
  }

  function goNext() {
    if (!canGoNext) return;
    setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit() {
    setEmailError(null);

    if (email.trim()) {
      const parsed = emailSchema.safeParse(email.trim());
      if (!parsed.success) {
        setEmailError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
        return;
      }
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: {
            struggle: answers.struggle ?? "",
            blocker: answers.blocker ?? "",
            focusLoss: answers.focusLoss ?? "",
            bigTaskReaction: answers.bigTaskReaction ?? "",
            triedBefore: answers.triedBefore ?? [],
            wantsHelpWith: answers.wantsHelpWith ?? [],
          },
          email: email.trim(),
          company: honeypotRef.current?.value ?? "",
          formRenderedAt: renderedAt.current,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <span aria-hidden="true" className="text-4xl">
          🎉
        </span>
        <h3 className="text-xl font-bold text-text-primary">Thanks for checking in!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
          That takes real self-awareness. We&rsquo;ll use this to keep JumpyBrain focused on
          what actually helps.
          {email ? " We'll be in touch with updates." : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-text-muted">
          <span>
            {isSummaryStep ? "Almost done" : `Question ${stepIndex + 1} of ${QUESTIONS.length}`}
          </span>
          <span>{Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Check-in progress"
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-active"
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-purple),var(--brand-blue))] transition-[width] duration-300 ease-out"
            style={{ width: `${((stepIndex + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {stepIndex > 0 ? (
        <p aria-live="polite" className="text-sm font-medium text-brand-purple dark:text-brand-cyan">
          {affirmation}
        </p>
      ) : null}

      {/* Question or summary */}
      {currentQuestion ? (
        <fieldset key={currentQuestion.id} className="flex flex-col gap-4">
          <legend className="text-xl font-bold text-text-primary sm:text-2xl">
            {currentQuestion.title}
          </legend>
          {currentQuestion.subtitle ? (
            <p className="-mt-3 text-sm text-text-secondary">{currentQuestion.subtitle}</p>
          ) : null}
          <div className="flex flex-col gap-2.5">
            {currentQuestion.options.map((option) => {
              const selected =
                currentQuestion.kind === "single"
                  ? currentAnswer === option.value
                  : Array.isArray(currentAnswer) && currentAnswer.includes(option.value);
              return (
                <OptionCard
                  key={option.value}
                  icon={option.icon}
                  label={option.label}
                  selected={selected}
                  type={currentQuestion.kind === "single" ? "radio" : "checkbox"}
                  name={currentQuestion.id}
                  onSelect={() =>
                    currentQuestion.kind === "single"
                      ? selectSingle(currentQuestion.id, option.value)
                      : toggleMulti(currentQuestion.id, option.value)
                  }
                />
              );
            })}
          </div>
        </fieldset>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-bold text-text-primary sm:text-2xl">
              Here&rsquo;s what you told us
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Nothing clinical, just a quick snapshot — you can go back and change anything.
            </p>
          </div>

          <ul className="flex flex-col gap-2 rounded-jb-md border border-border bg-bg-elevated p-4 text-sm">
            {QUESTIONS.map((q) => {
              const value = answers[q.id];
              const display = Array.isArray(value)
                ? q.options.filter((o) => value.includes(o.value)).map((o) => o.label).join(", ") || "—"
                : q.options.find((o) => o.value === value)?.label ?? "—";
              return (
                <li key={q.id} className="flex flex-col gap-0.5 border-b border-border pb-2 last:border-0 last:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {q.title}
                  </span>
                  <span className="text-text-primary">{display}</span>
                </li>
              );
            })}
          </ul>

          <div>
            <label htmlFor="questionnaire-email" className="text-sm font-semibold text-text-primary">
              Want updates or early access? Leave your email <span className="font-normal text-text-muted">(optional)</span>
            </label>
            <input
              id="questionnaire-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "questionnaire-email-error" : undefined}
              className="mt-2 h-11 w-full rounded-jb-sm border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-brand-purple"
            />
            {emailError ? (
              <p id="questionnaire-email-error" role="alert" className="mt-1.5 text-sm text-accent-red">
                {emailError}
              </p>
            ) : null}
          </div>

          {/* Honeypot -- hidden from real users, bots tend to fill every field */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="questionnaire-company">Company</label>
            <input
              id="questionnaire-company"
              ref={honeypotRef}
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status === "error" ? (
            <p role="alert" className="text-sm text-accent-red">
              {errorMessage}
            </p>
          ) : null}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={stepIndex === 0 || status === "submitting"}
        >
          Back
        </Button>

        {isSummaryStep ? (
          <Button type="button" onClick={handleSubmit} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Finish check-in"}
          </Button>
        ) : (
          <Button type="button" onClick={goNext} disabled={!canGoNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
