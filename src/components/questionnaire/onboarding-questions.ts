import type { Question } from "./questions";

/**
 * These run before the existing check-in questions (see questions.ts).
 * All are single-choice except comorbidities, which is intentionally the
 * only multi-select question in this section.
 */
export const ONBOARDING_QUESTIONS: Question[] = [
  {
    id: "ageGroup",
    kind: "single",
    title: "What's your age group?",
    options: [
      { value: "under-18", label: "Below 18", icon: "🎒" },
      { value: "18-25", label: "18–25", icon: "🎓" },
      { value: "26-34", label: "26–34", icon: "💼" },
      { value: "35-44", label: "35–44", icon: "🌤️" },
      { value: "45-54", label: "45–54", icon: "🌳" },
      { value: "55-plus", label: "55+", icon: "🌟" },
    ],
  },
  {
    id: "diagnosisStatus",
    kind: "single",
    title: "Have you been diagnosed with ADHD?",
    options: [
      { value: "diagnosed", label: "Yes, I have been diagnosed with ADHD.", icon: "✅" },
      { value: "no", label: "No.", icon: "🙂" },
      {
        value: "suspected",
        label: "I'm pretty sure I have ADHD, but I haven't been diagnosed.",
        icon: "🤔",
      },
    ],
  },
  {
    id: "adhdSubtype",
    kind: "single",
    title: "Which ADHD subtype best describes you?",
    subtitle: "No worries if you're not sure.",
    options: [
      { value: "inattentive", label: "Predominantly Inattentive (PI)", icon: "💭" },
      { value: "hyperactive-impulsive", label: "Predominantly Hyperactive/Impulsive", icon: "⚡" },
      { value: "combined", label: "Combined Type", icon: "🔀" },
      { value: "not-sure", label: "I'm not sure.", icon: "❓" },
    ],
  },
  {
    id: "comorbidities",
    kind: "multi",
    title: "Do you experience any of the following?",
    subtitle: "Pick as many as apply.",
    exclusiveValue: "none",
    options: [
      { value: "anxiety", label: "Anxiety", icon: "😰" },
      { value: "depression", label: "Depression", icon: "🌧️" },
      { value: "autism", label: "Autism (ASD)", icon: "🧩" },
      { value: "ocd", label: "OCD", icon: "🔁" },
      { value: "dyslexia", label: "Dyslexia", icon: "🔤" },
      { value: "dyspraxia", label: "Dyspraxia", icon: "🤸" },
      { value: "bipolar", label: "Bipolar Disorder", icon: "🎭" },
      { value: "ptsd", label: "PTSD / Trauma", icon: "💔" },
      { value: "sleep", label: "Sleep Disorder / Insomnia", icon: "🌙" },
      { value: "sensory", label: "Sensory Processing Issues", icon: "🎧" },
      { value: "none", label: "None of the above", icon: "🚫" },
      { value: "other", label: "Other", icon: "✍️", allowFreeText: true },
    ],
  },
];
