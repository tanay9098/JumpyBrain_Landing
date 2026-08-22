import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export function FeedbackSection() {
  return (
    <section id="feedback" className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Help shape JumpyBrain"
            title="Tell us what's working — and what isn't"
            description="Real feedback goes straight into deciding what we build next. It only takes a minute."
          />
        </Reveal>

        <Reveal delay={80} className="w-full max-w-xl">
          <Card className="p-6 sm:p-8">
            <FeedbackForm />
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
