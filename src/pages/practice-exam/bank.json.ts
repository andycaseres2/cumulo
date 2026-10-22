import type { APIRoute } from 'astro';
import { theory } from '@/composition/theory';

/** The practice exam question bank, served as a static JSON file so the page HTML stays small. */
export const GET: APIRoute = async () => new Response(JSON.stringify(await theory.quizBank()), { headers: { 'Content-Type': 'application/json' } });
