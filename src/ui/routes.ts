/** Course whose theory every topic belongs to until the platform offers more than one. */
const DEFAULT_COURSE = 'cloud-practitioner';

/** Every internal URL of the site, so pages and components never hardcode paths. */
export const routes = {
  home: '/',
  signIn: '/sign-in',
  games: '/games',
  game: (slug: string) => `/games/${slug}`,
  /** Catalog of courses; each course lists its own topics. */
  theory: '/theory',
  course: (courseSlug: string) => `/theory/${courseSlug}`,
  theoryDomain: (domainId: string, courseSlug = DEFAULT_COURSE) => `/theory/${courseSlug}#${domainId}`,
  topic: (slug: string, courseSlug = DEFAULT_COURSE) => `/theory/${courseSlug}/${slug}`,
  profile: '/profile',
  practiceExam: '/practice-exam',
  practiceExamBank: '/practice-exam/bank.json',
};
