import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { EXAM_DOMAIN_IDS } from '@/modules/exam/domain/ExamDomain';

const quizOption = z.object({
  label: z.string().min(1),
  /** Why this option is right or wrong, always shown after answering. */
  explanation: z.string().min(30),
  correct: z.boolean().default(false),
});

const quizQuestion = z.object({
  prompt: z.string().min(20),
  options: z
    .array(quizOption)
    .length(4)
    .refine((options) => options.filter((o) => o.correct).length === 1, 'Each question needs exactly one correct option'),
});

const theory = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/theory' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    domain: z.enum(EXAM_DOMAIN_IDS),
    order: z.number().int().positive(),
    examTasks: z.array(z.string().regex(/^[1-4]\.[1-8]$/)).min(1),
    services: z.array(z.string()).default([]),
    readingMinutes: z.number().int().positive(),
    sources: z.array(z.url()).min(1),
    /** Three questions at the end of the topic; answering all of them right completes it. */
    quiz: z.array(quizQuestion).length(3).optional(),
  }),
});

export const collections = { theory };
