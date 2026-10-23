/** Composition root for the theory module. Server-side only (reads content collections). */
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import { getTheoryCoverage } from '@/modules/theory/application/getTheoryCoverage';
import { getTopicNavigation } from '@/modules/theory/application/getTopicNavigation';
import { listTheoryCatalog } from '@/modules/theory/application/listTheoryCatalog';
import { astroContentTopicRepository, quizBank, renderTopicBody } from '@/modules/theory/infrastructure/astroContentTopics';
import { coursesIn } from '@/modules/theory/infrastructure/courses';

export const theory = {
  courses: (locale: Locale = DEFAULT_LOCALE) => coursesIn(locale),
  findCourse: (slug: string, locale: Locale = DEFAULT_LOCALE) => coursesIn(locale).find((course) => course.slug === slug),
  catalog: (locale: Locale) => listTheoryCatalog(astroContentTopicRepository(locale)),
  coverage: (locale: Locale) => getTheoryCoverage(astroContentTopicRepository(locale)),
  navigation: (slug: string, locale: Locale) => getTopicNavigation(astroContentTopicRepository(locale), slug),
  renderBody: renderTopicBody,
  quizBank,
};
