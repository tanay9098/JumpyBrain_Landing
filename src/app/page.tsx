import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { QuestionnaireSection } from "@/components/sections/questionnaire-section";
import { FeedbackSection } from "@/components/sections/feedback-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PhilosophySection />
        <ShowcaseSection />
        <QuestionnaireSection />
        <FeedbackSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
