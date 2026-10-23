import type { APIRoute } from 'astro';
import { theory } from '@/composition/theory';
import { routes } from '@/ui/routes';
import { sitemapXml } from '@/ui/seo/sitemap';

/** Public pages for search engines; absolute URLs need SITE_URL at build time (localhost otherwise). */
export const GET: APIRoute = async ({ site }) => {
  const [course] = theory.courses();
  const topics = (await theory.catalog()).flatMap((section) => section.topics.map((topic) => routes.topic(topic.slug, course.slug)));
  const paths = [routes.home, routes.theory, routes.course(course.slug), ...topics, routes.games, routes.game('cumulo-city'), routes.practiceExam];
  return new Response(sitemapXml(site ?? new URL('http://localhost:4321'), paths), { headers: { 'Content-Type': 'application/xml' } });
};
