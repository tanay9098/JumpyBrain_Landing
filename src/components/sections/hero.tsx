import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AppMockup } from "./app-mockup";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-160px] -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,108,246,0.16),transparent)]"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="jb-reveal flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-active px-3.5 py-1.5 text-xs font-semibold text-brand-purple dark:text-brand-cyan">
            <span aria-hidden="true">🧠</span> Built for brains that jump around
          </span>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-[3.4rem]">
            Starting is the hardest part.
            <br />
            <span className="jb-gradient-text">JumpyBrain makes it easier.</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
            The ADHD-friendly command centre that catches what&rsquo;s in your head,
            breaks it into steps small enough to actually start, and protects your
            focus once you&rsquo;re in motion.
          </p>

          <ButtonLink href="#questionnaire" size="lg">
            Try JumpyBrain free
          </ButtonLink>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-accent-green">
                ●
              </span>
              No credit card needed
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-brand-purple">
                ●
              </span>
              2-minute check-in
            </span>
          </div>
        </div>

        <div className="jb-reveal [animation-delay:120ms]">
          <AppMockup className="h-[420px] w-full sm:h-[460px]" />
        </div>
      </Container>
    </section>
  );
}
