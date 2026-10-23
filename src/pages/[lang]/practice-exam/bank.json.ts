import type { APIRoute } from 'astro';
import { theory } from '@/composition/theory';
import { localePaths } from '@/i18n/page';
import type { Locale } from '@/i18n/locales';

export const getStaticPaths = () => localePaths();

/** Every topic's quiz and practice questions in this language, the bank the practice exam draws from. */
export const GET: APIRoute = async ({ params }) =>
  new Response(JSON.stringify(await theory.quizBank(params.lang as Locale)), { headers: { 'Content-Type': 'application/json' } });
