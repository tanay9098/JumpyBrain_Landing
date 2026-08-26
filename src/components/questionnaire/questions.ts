export type QuestionOption = {
  value: string;
  label: string;
  icon: string;
  /** Shows an optional free-text input beneath this option when it's selected. */
  allowFreeText?: boolean;
};

export type Question = {
  id: string;
  kind: "single" | "multi";
  title: string;
  subtitle?: string;
  options: QuestionOption[];
  /** For multi questions: selecting this option value clears every other selection (e.g. "None of the above"). */
  exclusiveValue?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: "struggle",
    kind: "multi",
    title: "What do you struggle with most?",
    subtitle: "Pick as many as apply.",
    options: [
      { value: "starting", label: "Getting started on tasks", icon: "🚪" },
      { value: "focus", label: "Staying focused once I start", icon: "🎯" },
      { value: "remembering", label: "Remembering what I need to do", icon: "🧩" },
      { value: "overwhelm", label: "Feeling overwhelmed by big tasks", icon: "🌊" },
      { value: "momentum", label: "Keeping momentum after a win", icon: "🔋" },
    ],
  },
  {
    id: "blocker",
    kind: "multi",
    title: "What usually stops you from starting a task?",
    subtitle: "Pick as many as apply.",
    options: [
      { value: "too-big", label: "It feels too big to begin", icon: "🧱" },
      { value: "no-first-step", label: "I don't know the first step", icon: "❓" },
      { value: "distracted", label: "I get distracted before I start", icon: "📱" },
      { value: "forget", label: "I forget until it's urgent", icon: "⏰" },
    ],
  },
  {
    id: "focusLoss",
    kind: "multi",
    title: "Once you start, how easily do you lose focus?",
    subtitle: "Pick as many as apply.",
    options: [
      { value: "immediately", label: "Almost immediately", icon: "💨" },
      { value: "few-minutes", label: "After a few minutes", icon: "⏳" },
      { value: "half-hour", label: "After 20–30 minutes", icon: "🕐" },
      { value: "locked-in", label: "I can usually stay locked in", icon: "✅" },
    ],
  },
  {
    id: "bigTaskReaction",
    kind: "multi",
    title: "What happens when you have a big task?",
    subtitle: "Pick as many as apply.",
    options: [
      { value: "freeze", label: "I freeze and avoid it", icon: "🥶" },
      { value: "everything-else", label: "I do everything except that", icon: "🌀" },
      { value: "burnout", label: "I try to do it all at once", icon: "🔥" },
      { value: "break-down", label: "I break it down, when I have time", icon: "🧭" },
    ],
  },
  {
    id: "triedBefore",
    kind: "multi",
    title: "What have you tried before?",
    subtitle: "Pick as many as apply.",
    options: [
      { value: "todo-apps", label: "To-do list apps", icon: "✅" },
      { value: "calendar", label: "Calendar blocking", icon: "🗓️" },
      { value: "timers", label: "Pomodoro / timers", icon: "⏱️" },
      { value: "reminders", label: "Reminders & alarms", icon: "🔔" },
      { value: "nothing", label: "Nothing formal yet", icon: "🌱" },
    ],
  },
  {
    id: "wantsHelpWith",
    kind: "multi",
    title: "What would you most like JumpyBrain to help with?",
    subtitle: "Pick as many as apply.",
    options: [
      { value: "start-faster", label: "Getting started faster", icon: "🚀" },
      { value: "focus-longer", label: "Staying focused longer", icon: "🎯" },
      { value: "remember-tasks", label: "Remembering tasks", icon: "🧠" },
      { value: "break-down-projects", label: "Breaking down big projects", icon: "🧩" },
      { value: "build-habits", label: "Building consistent habits", icon: "🔁" },
    ],
  },
];

export const AFFIRMATIONS = [
  "Got it — thanks for sharing.",
  "Makes sense, noted.",
  "Thanks, that's helpful to know.",
  "Appreciate the honesty.",
  "Good to know.",
];
