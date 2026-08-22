import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="border-t border-border bg-bg-elevated py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-jb-xl border border-border-strong bg-[linear-gradient(135deg,rgba(124,108,246,0.12),rgba(63,185,245,0.06))] px-6 py-14 text-center sm:px-12">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Ready to make starting easier?
          </h2>
          <p className="max-w-md text-base text-text-secondary sm:text-lg">
            Take the 2-minute check-in and see what JumpyBrain suggests for you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#questionnaire" size="lg">
              Start the check-in
            </ButtonLink>
            <ButtonLink href="#feedback" size="lg" variant="ghost">
              Share feedback instead
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
