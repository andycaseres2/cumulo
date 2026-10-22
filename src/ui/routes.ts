/** Course whose theory every topic belongs to until the platform offers more than one. */
const DEFAULT_COURSE = 'cloud-practitioner';

/** Every internal URL of the site, so pages and components never hardcode paths. */
export const routes = {
  home: '/',
  signIn: '/ingresar',
  games: '/juegos',
  game: (slug: string) => `/juegos/${slug}`,
  /** Catalog of courses; each course lists its own topics. */
  theory: '/teoria',
  course: (courseSlug: string) => `/teoria/${courseSlug}`,
  theoryDomain: (domainId: string, courseSlug = DEFAULT_COURSE) => `/teoria/${courseSlug}#${domainId}`,
  topic: (slug: string, courseSlug = DEFAULT_COURSE) => `/teoria/${courseSlug}/${slug}`,
  profile: '/perfil',
  practiceExam: '/simulacro',
  practiceExamBank: '/simulacro/banco.json',
};
