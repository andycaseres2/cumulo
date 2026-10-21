import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { EXAM_DOMAIN_IDS } from '@/modules/exam/domain/ExamDomain';

const theory = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/theory' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    domain: z.enum(EXAM_DOMAIN_IDS),
    order: z.number().int().positive(),
    services: z.array(z.string()).default([]),
    readingMinutes: z.number().int().positive(),
    sources: z.array(z.url()).min(1),
  }),
});

export const collections = { theory };
