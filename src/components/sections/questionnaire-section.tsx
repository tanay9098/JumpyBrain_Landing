import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Questionnaire } from "@/components/questionnaire/questionnaire";

export function QuestionnaireSection() {
  return (
    <section
      id="questionnaire"
      className="border-t border-border bg-bg-elevated py-20 sm:py-28"
    >
      <Container className="flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Quick check-in"
            title="A quick, friendly check-in — not a diagnosis"
            description="A few easy questions, one at a time, to help us understand your ADHD journey and what would actually help you. No medical assessment, no wrong answers, no pressure."
          />
        </Reveal>

        <Reveal delay={80} className="w-full max-w-xl">
          <Card className="p-6 sm:p-8">
            <Questionnaire />
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
