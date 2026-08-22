import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AppMockup } from "./app-mockup";

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
            <AppMockup className="jb-force-light h-[420px] w-full sm:h-[460px]" />
            <p className="text-center text-sm font-medium text-text-muted">Light mode</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3">
            <AppMockup className="jb-force-dark h-[420px] w-full sm:h-[460px]" />
            <p className="text-center text-sm font-medium text-text-muted">Dark mode</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
