import { z } from "zod";

export const analysisInputSchema = z.object({
  candidateName: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(160),
  jobDescription: z.string().trim().min(30).max(30000),
  resume: z.string().trim().max(30000).optional().default("")
});

export const analysisOutputSchema = z.object({
  matchScore: z.number().int().min(0).max(100),

  summary: z.string().trim().min(20).max(1200),

  matchingSkills: z
    .array(z.string().trim().min(1))
    .max(5),

  skillGaps: z
    .array(z.string().trim().min(1))
    .max(5),

  interviewQuestions: z
    .array(z.string().trim().min(1))
    .length(3)
});