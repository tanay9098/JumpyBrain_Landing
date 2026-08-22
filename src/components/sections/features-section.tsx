import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const FEATURES = [
  {
    icon: "⚡",
    title: "What Next",
    body: "One clear suggestion for your very next task — pulled from your list so you never have to decide where to start.",
    accent: "text-brand-purple",
  },
  {
    icon: "🔋",
    title: "Energy check-ins",
    body: "Tell JumpyBrain how you're feeling — exhausted to on fire — and get suggestions sized to match your actual energy.",
    accent: "text-accent-amber",
  },
  {
    icon: "🧠",
    title: "Brain Dump → Tasks",
    body: "Empty your head in one go. JumpyBrain turns the mess into a clean, organized task list for you.",
    accent: "text-brand-purple",
  },
  {
    icon: "🎯",
    title: "Focus sessions & timer",
    body: "Start a focus session in one tap and work in short, protected bursts instead of staring down an open-ended afternoon.",
    accent: "text-brand-blue",
  },
  {
    icon: "🛡️",
    title: "Focus Shield",
    body: "Block distracting sites and apps while you work, with a whitelist for the tools you actually need.",
    accent: "text-brand-purple",
  },
  {
    icon: "📊",
    title: "Progress & streaks",
    body: "Tasks done, focus minutes, and day streaks — small, visible wins that keep momentum going.",
    accent: "text-accent-green",
  },
  {
    icon: "🔗",
    title: "Connects to your world",
    body: "Pull tasks straight from Gmail, Slack, and Google Calendar so nothing important stays buried in another app.",
    accent: "text-brand-blue",
  },
  {
    icon: "🗓️",
    title: "Tasks, Schedule & Deadlines",
    body: "One home for everything you need to do, when it's due, and where it fits in your day.",
    accent: "text-accent-amber",
  },
  {
    icon: "🌿",
    title: "Mindfulness pauses",
    body: "Short, built-in resets between tasks so switching gears doesn't mean losing your whole afternoon.",
    accent: "text-accent-green",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-bg-elevated py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Inside JumpyBrain"
            title="Everything lives in one calm command centre"
            description="No sprawling settings, no fifteen views to check. Just the pieces that actually help you start, focus, and follow through."
          />
        </Reveal>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 50}>
              <div className="flex h-full flex-col gap-3 rounded-jb-lg border border-border bg-surface p-6 jb-card-shadow">
                <span
                  aria-hidden="true"
                  className={cn("text-2xl", feature.accent)}
                >
                  {feature.icon}
                </span>
                <h3 className="text-base font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
