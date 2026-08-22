import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const PRINCIPLES = [
  {
    icon: "🪶",
    title: "Low cognitive load, always",
    body: "One suggestion instead of ten. One dashboard instead of fifteen tabs. Every screen is designed to ask less of your working memory.",
  },
  {
    icon: "🌤️",
    title: "Energy-aware, not one-size-fits-all",
    body: "A rigid system that ignores how you feel today will get abandoned. JumpyBrain adapts its suggestions to your energy, not the other way around.",
  },
  {
    icon: "🙌",
    title: "Encouraging, never shaming",
    body: "No streak-guilt, no red overdue banners screaming at you. Setbacks are just data — the copy and design stay calm and kind.",
  },
  {
    icon: "🧱",
    title: "Small steps over perfect systems",
    body: "You don't need a complicated productivity method. You need the next tiny, doable action — and a reason to trust it'll actually help.",
  },
];

export function PhilosophySection() {
  return (
    <section className="border-t border-border bg-bg-elevated py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Designed for ADHD brains"
            title="Productivity tools weren't built with you in mind. This one was."
            description="JumpyBrain isn't a stricter to-do list. It's built on one idea: reduce what your brain has to hold, and momentum takes care of itself."
          />
        </Reveal>

        <div className="flex flex-col gap-4">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 60}>
              <div className="flex gap-4 rounded-jb-lg border border-border bg-surface p-5 jb-card-shadow">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-active text-lg"
                >
                  {principle.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {principle.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
