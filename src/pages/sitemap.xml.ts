import type { APIRoute } from 'astro';
import { theory } from '@/composition/theory';
import { LOCALES } from '@/i18n/locales';
import { routesFor } from '@/ui/routes';
import { sitemapXml } from '@/ui/seo/sitemap';

/** Public pages in every language; absolute URLs need SITE_URL at build time (localhost otherwise). */
export const GET: APIRoute = async ({ site }) => {
  const [course] = theory.courses();
  const slugs = (await theory.catalog('es')).flatMap((section) => section.topics.map((topic) => topic.slug));
  const paths = LOCALES.flatMap((locale) => {
    const routes = routesFor(locale);
    return [
      routes.home,
      routes.theory,
      routes.course(course.slug),
      ...slugs.map((slug) => routes.topic(slug, course.slug)),
      routes.games,
      routes.game('cumulo-city'),
      routes.game('service-duel'),
      routes.practiceExam,
    ];
  });
  return new Response(sitemapXml(site ?? new URL('http://localhost:4321'), paths), { headers: { 'Content-Type': 'application/xml' } });
};
