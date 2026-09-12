import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "App is still in development",
  description:
    "JumpyBrain is still in development. Sign up for the check-in or share feedback and we'll let you know the moment it's ready to try.",
  robots: { index: false, follow: true },
};

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[-160px] -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,108,246,0.16),transparent)]"
          />
          <Container className="flex justify-center">
            <Reveal className="flex max-w-xl flex-col items-center gap-6 rounded-jb-xl border border-border-strong bg-[linear-gradient(135deg,rgba(124,108,246,0.12),rgba(63,185,245,0.06))] px-6 py-14 text-center sm:px-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-active px-3.5 py-1.5 text-xs font-semibold text-brand-purple dark:text-brand-cyan">
                <span aria-hidden="true">🚧</span> Under construction
              </span>

              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-4xl">
                <span className="jb-gradient-text">App is still in development.</span>
              </h1>

              <p className="max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                We&rsquo;re still building JumpyBrain. Take the 2-minute check-in
                so we know what you need, or share feedback to help shape it —
                we&rsquo;ll let you know the moment it&rsquo;s ready to try.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/#questionnaire" size="lg">
                  Take the check-in
                </ButtonLink>
                <ButtonLink href="/#feedback" size="lg" variant="ghost">
                  Share feedback
                </ButtonLink>
              </div>

              <ButtonLink href="/" size="md" variant="secondary">
                Back to home
              </ButtonLink>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
