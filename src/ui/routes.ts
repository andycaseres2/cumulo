import type { Locale } from '@/i18n/locales';

/** Course whose theory every topic belongs to until the platform offers more than one. */
const DEFAULT_COURSE = 'cloud-practitioner';

/** Every internal URL of the site in one language, so pages and components never hardcode paths. */
export function routesFor(locale: Locale) {
  const base = `/${locale}`;
  return {
    home: `${base}/`,
    signIn: `${base}/sign-in`,
    games: `${base}/games`,
    game: (slug: string) => `${base}/games/${slug}`,
    /** Catalog of courses; each course lists its own topics. */
    theory: `${base}/theory`,
    course: (courseSlug: string) => `${base}/theory/${courseSlug}`,
    theoryDomain: (domainId: string, courseSlug = DEFAULT_COURSE) => `${base}/theory/${courseSlug}#${domainId}`,
    topic: (slug: string, courseSlug = DEFAULT_COURSE) => `${base}/theory/${courseSlug}/${slug}`,
    profile: `${base}/profile`,
    practiceExam: `${base}/practice-exam`,
    practiceExamBank: `${base}/practice-exam/bank.json`,
  };
}

export type Routes = ReturnType<typeof routesFor>;
