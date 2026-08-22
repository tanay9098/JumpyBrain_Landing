import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const PROBLEMS = [
  {
    icon: "🚪",
    title: "Starting feels impossible",
    body: "You know what to do. Your brain just won't let you begin — so the task sits there, untouched, getting heavier.",
  },
  {
    icon: "🌊",
    title: "Big tasks feel like a wall",
    body: "“Write the report” isn't one step, it's fifty invisible ones. Without a breakdown, overwhelm wins before you start.",
  },
  {
    icon: "🎯",
    title: "Focus slips the second you sit down",
    body: "One tab, one notification, one stray thought — and the task you were doing five minutes ago is gone.",
  },
  {
    icon: "🧩",
    title: "Things fall through the cracks",
    body: "Tasks live in your email, your calendar, your head, and three different apps. Nothing is in one place.",
  },
  {
    icon: "⏳",
    title: "Procrastination isn't laziness",
    body: "It's a mismatch between how your brain works and how tasks are usually organized. You need a different system, not more willpower.",
  },
  {
    icon: "🔋",
    title: "Momentum is hard to keep",
    body: "You finish one task and the energy that got you there evaporates. Starting the next one means starting from zero again.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="The real struggle"
            title="It's not a motivation problem"
            description="If you've ever stared at a task list and felt nothing but static, you're not broken — the tools just weren't built for how your brain actually works."
          />
        </Reveal>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 60}>
              <div className="flex h-full flex-col gap-3 rounded-jb-lg border border-border bg-surface p-6 transition-transform duration-200 hover:-translate-y-1 jb-card-shadow">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-active text-xl"
                >
                  {problem.icon}
                </span>
                <h3 className="text-base font-semibold text-text-primary">
                  {problem.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {problem.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
