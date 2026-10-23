import type { APIRoute } from 'astro';
import { robotsTxt } from '@/ui/seo/sitemap';

export const GET: APIRoute = ({ site }) => new Response(robotsTxt(site), { headers: { 'Content-Type': 'text/plain' } });
