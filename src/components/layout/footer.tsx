import { Logo } from "./logo";
import { Container } from "@/components/ui/container";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#showcase", label: "App tour" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "#questionnaire", label: "Quick check-in" },
      { href: "#feedback", label: "Share feedback" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <Container className="flex flex-col gap-10 py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              A calm command centre for ADHD brains — built to make starting easier
              and momentum stick.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-text-primary">{col.title}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-brand-purple"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} JumpyBrain. All rights reserved.</p>
          <p>Not a medical device. Not intended to diagnose or treat ADHD.</p>
        </div>
      </Container>
    </footer>
  );
}
