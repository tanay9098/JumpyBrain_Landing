import { z } from "zod";

/** Shared across client + server so both agree on limits and messages. */

export const emailSchema = z
  .string()
  .trim()
  .max(254, "That email looks too long.")
  .refine((value) => value === "" || z.string().email().safeParse(value).success, {
    message: "Enter a valid email address.",
  });

export const feedbackSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  category: z.enum(["idea", "bug", "confused", "general"]),
  message: z.string().trim().min(10, "A few more words would help us a lot.").max(2000),
  email: emailSchema.optional().default(""),
  company: z.string().max(0, "Spam check failed.").optional().default(""),
  formRenderedAt: z.coerce.number(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

export const questionnaireAnswersSchema = z.object({
  struggle: z.array(z.string().max(80)).min(1).max(10),
  blocker: z.string().min(1).max(120),
  focusLoss: z.string().min(1).max(120),
  bigTaskReaction: z.string().min(1).max(120),
  triedBefore: z.array(z.string().max(80)).max(10).default([]),
  wantsHelpWith: z.array(z.string().max(80)).max(10).default([]),
});

export const questionnaireSchema = z.object({
  answers: questionnaireAnswersSchema,
  email: emailSchema.optional().default(""),
  company: z.string().max(0, "Spam check failed.").optional().default(""),
  formRenderedAt: z.coerce.number(),
});

export type QuestionnaireInput = z.infer<typeof questionnaireSchema>;

export const CATEGORY_LABELS: Record<FeedbackInput["category"], string> = {
  idea: "Feature idea",
  bug: "Something's broken",
  confused: "Something confused me",
  general: "General thought",
};
