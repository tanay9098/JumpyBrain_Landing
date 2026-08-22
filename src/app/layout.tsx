import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jumpybrain.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JumpyBrain — Focus & Task App Built for ADHD Brains",
    template: "%s — JumpyBrain",
  },
  description:
    "JumpyBrain is a calm, ADHD-friendly productivity app that helps you start tasks, break down overwhelm, protect your focus, and build momentum — one small step at a time.",
  keywords: [
    "ADHD productivity app",
    "ADHD focus app",
    "task initiation app",
    "ADHD task management",
    "focus timer for ADHD",
    "procrastination app",
    "brain dump app",
    "JumpyBrain",
  ],
  authors: [{ name: "JumpyBrain" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "JumpyBrain",
    title: "JumpyBrain — Focus & Task App Built for ADHD Brains",
    description:
      "A calm command centre for ADHD brains: capture what's on your mind, break it into doable steps, protect your focus, and build momentum without the overwhelm.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JumpyBrain — an ADHD-friendly focus and task app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JumpyBrain — Focus & Task App Built for ADHD Brains",
    description:
      "Capture what's on your mind, break it into doable steps, protect your focus, and build momentum — designed for ADHD brains.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b12" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-sans antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-purple focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
