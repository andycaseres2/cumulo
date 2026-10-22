/** Every internal URL of the site, so pages and components never hardcode paths. */
export const routes = {
  home: '/',
  signIn: '/ingresar',
  games: '/juegos',
  game: (slug: string) => `/juegos/${slug}`,
  theory: '/teoria',
  theoryDomain: (domainId: string) => `/teoria#${domainId}`,
  topic: (slug: string) => `/teoria/${slug}`,
  profile: '/perfil',
  practiceExam: '/simulacro',
};
