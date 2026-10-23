import { defineMessages } from '../defineMessages';

/** Site chrome: header, language switch, footer and page shell. */
export const siteMessages = defineMessages({
  es: {
    nav: { label: 'Principal', home: 'Inicio', games: 'Juegos', theory: 'Teoría', practiceExam: 'Simulacro' },
    language: { label: 'Idioma', es: 'Español', en: 'English' },
    footer: {
      disclaimer: (site: string) =>
        `${site} es un proyecto independiente para preparar el examen AWS Certified Cloud Practitioner (CLF-C02). No está afiliado ni respaldado por Amazon Web Services.`,
      artBy: 'Arte del juego Cúmulo City:',
      artPack: 'RPG Urban Pack de Kenney',
    },
    exit: '← Salir',
    ogLocale: 'es_ES',
  },
  en: {
    nav: { label: 'Main', home: 'Home', games: 'Games', theory: 'Theory', practiceExam: 'Practice exam' },
    language: { label: 'Language', es: 'Español', en: 'English' },
    footer: {
      disclaimer: (site: string) =>
        `${site} is an independent project to prepare for the AWS Certified Cloud Practitioner (CLF-C02) exam. It is not affiliated with or endorsed by Amazon Web Services.`,
      artBy: 'Cúmulo City game art:',
      artPack: 'RPG Urban Pack by Kenney',
    },
    exit: '← Exit',
    ogLocale: 'en_US',
  },
});
