import { defineMessages } from '../defineMessages';

/** Theory views rendered in the browser: the quiz at the end of a topic and the theory progress on the profile. */
export const theoryViewMessages = defineMessages({
  es: {
    quiz: {
      title: 'Pon a prueba lo que aprendiste',
      intro: 'Responde las tres preguntas. Si aciertas todas, el tema queda completado en tu progreso.',
      completedBadge: '✓ Tema completado',
      right: '¡Correcto!',
      wrong: 'No es correcto.',
      score: (correct: number, total: number) => `${correct} de ${total} correctas`,
      allRight: '¡Tema completado! Dominas lo esencial de este tema.',
      tryAgainHint: 'Repasa las explicaciones y vuelve a intentarlo: el tema se completa con todas las respuestas correctas.',
      tryAgain: 'Intentar de nuevo',
      guestNote: 'Tu avance se guarda en este navegador. Ingresa para guardarlo en tu cuenta y verlo en cualquier dispositivo.',
      signIn: 'Ingresar',
    },
    progress: {
      count: (completed: number, total: number) => `${completed} de ${total} temas completados`,
      label: 'Avance en la teoría',
      domainCount: (completed: number, total: number) => `${completed} de ${total}`,
      keepStudying: 'Seguir estudiando',
    },
  },
  en: {
    quiz: {
      title: 'Test what you learned',
      intro: 'Answer the three questions. Get them all right and the topic is marked as completed in your progress.',
      completedBadge: '✓ Topic completed',
      right: 'Correct!',
      wrong: 'Not quite.',
      score: (correct: number, total: number) => `${correct} of ${total} correct`,
      allRight: 'Topic completed! You know the essentials of this topic.',
      tryAgainHint: 'Review the explanations and try again: the topic is completed when every answer is right.',
      tryAgain: 'Try again',
      guestNote: 'Your progress is saved in this browser. Sign in to save it to your account and see it on any device.',
      signIn: 'Sign in',
    },
    progress: {
      count: (completed: number, total: number) => `${completed} of ${total} topics completed`,
      label: 'Theory progress',
      domainCount: (completed: number, total: number) => `${completed} of ${total}`,
      keepStudying: 'Keep studying',
    },
  },
});
