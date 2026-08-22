import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    number: "01",
    title: "Dump everything on your mind",
    body: "Type or capture whatever's rattling around — tasks, half-thoughts, emails you keep meaning to reply to. No structure required yet.",
  },
  {
    number: "02",
    title: "JumpyBrain breaks it into steps",
    body: "Your brain dump becomes an organized task list, small enough that each item is easy to actually start.",
  },
  {
    number: "03",
    title: "Check in, get your next move",
    body: "Tell it your energy level and let \"What Next\" pick the right task for right now — no decision fatigue.",
  },
  {
    number: "04",
    title: "Focus, protected, and build momentum",
    body: "Start a focus session behind Focus Shield, then watch your streak and focus minutes grow with every session.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From scattered thoughts to done, in four moves"
          />
        </Reveal>

        <div className="grid w-full gap-6 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 70} className="h-full">
              <div className="relative flex h-full flex-col gap-3 rounded-jb-lg border border-border bg-surface p-6 jb-card-shadow">
                <span className="jb-gradient-text text-3xl font-extrabold">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.body}
                </p>
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-lg text-text-muted lg:block"
                  >
                    →
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
