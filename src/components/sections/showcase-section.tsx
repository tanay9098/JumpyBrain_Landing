import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Take a look inside"
            title="The same calm dashboard, day or night"
            description="Whether you toggle light or dark on the site, JumpyBrain looks and feels this considered — every card, spacing, and color reused straight from the app."
          />
        </Reveal>

        <div className="grid w-full gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-jb-xl border border-border-strong bg-surface jb-card-shadow">
              <Image
                src="/screenshots/dashboard-light.png"
                alt="JumpyBrain dashboard in light mode, showing today's focus task, an energy check-in, quick actions, and Focus Shield status"
                width={1561}
                height={1082}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <p className="text-center text-sm font-medium text-text-muted">Light mode</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-jb-xl border border-border-strong bg-surface jb-card-shadow">
              <Image
                src="/screenshots/dashboard-dark.png"
                alt="JumpyBrain dashboard in dark mode, showing today's focus task, an energy check-in, quick actions, and Focus Shield status"
                width={1561}
                height={1082}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <p className="text-center text-sm font-medium text-text-muted">Dark mode</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
