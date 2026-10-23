import { defineMessages } from '../defineMessages';

/** Practice exam history: on the exam page and in the profile. */
export const examHistoryMessages = defineMessages({
  es: {
    title: 'Tus intentos',
    profileTitle: 'Simulacro de examen',
    empty: 'Aún no tienes intentos. Cuando termines un simulacro, aparecerá aquí con su puntaje.',
    summary: (count: number, passed: number) => `${count} ${count === 1 ? 'intento' : 'intentos'} · ${passed} ${passed === 1 ? 'aprobado' : 'aprobados'}`,
    best: 'Mejor puntaje',
    last: 'Último',
    passed: 'Aprobado',
    failed: 'No aprobado',
    correct: (correct: number, total: number) => `${correct} de ${total} correctas`,
    duration: (minutes: number, seconds: number) => `${minutes} min ${String(seconds).padStart(2, '0')} s`,
    byDomain: 'Por dominio',
    saved: 'Intento guardado en tu historial.',
    authReason: 'Necesitas una cuenta gratuita para hacer el simulacro: así guardamos cada intento y tu puntaje.',
    seeAll: 'Ver todos y hacer otro',
  },
  en: {
    title: 'Your attempts',
    profileTitle: 'Practice exam',
    empty: 'No attempts yet. When you finish a practice exam, it shows up here with its score.',
    summary: (count: number, passed: number) => `${count} ${count === 1 ? 'attempt' : 'attempts'} · ${passed} passed`,
    best: 'Best score',
    last: 'Latest',
    passed: 'Passed',
    failed: 'Not passed',
    correct: (correct: number, total: number) => `${correct} of ${total} correct`,
    duration: (minutes: number, seconds: number) => `${minutes} min ${String(seconds).padStart(2, '0')} s`,
    byDomain: 'By domain',
    saved: 'Attempt saved to your history.',
    authReason: 'You need a free account to take the practice exam: that way every attempt and your score are saved.',
    seeAll: 'See all and take another',
  },
});
