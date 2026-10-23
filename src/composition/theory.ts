/** Composition root for the theory module. Server-side only (reads content collections). */
import type { Locale } from '@/i18n/locales';
import { getTheoryCoverage } from '@/modules/theory/application/getTheoryCoverage';
import { getTopicNavigation } from '@/modules/theory/application/getTopicNavigation';
import { listTheoryCatalog } from '@/modules/theory/application/listTheoryCatalog';
import { astroContentTopicRepository, quizBank, renderTopicBody } from '@/modules/theory/infrastructure/astroContentTopics';
import { COURSES } from '@/modules/theory/infrastructure/courses';

export const theory = {
  courses: () => COURSES,
  findCourse: (slug: string) => COURSES.find((course) => course.slug === slug),
  catalog: (locale: Locale) => listTheoryCatalog(astroContentTopicRepository(locale)),
  coverage: (locale: Locale) => getTheoryCoverage(astroContentTopicRepository(locale)),
  navigation: (slug: string, locale: Locale) => getTopicNavigation(astroContentTopicRepository(locale), slug),
  renderBody: renderTopicBody,
  quizBank,
};
