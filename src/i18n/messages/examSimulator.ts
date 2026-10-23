import { defineMessages } from '../defineMessages';

interface ScoreScale {
  min: number;
  max: number;
  passing: number;
}

/** Practice exam: the page around it and the simulator (rules, questions, results and review). */
export const examSimulatorMessages = defineMessages({
  es: {
    page: {
      title: 'Simulacro del examen',
      eyebrow: 'Practica',
      description: (code: string, questions: number, minutes: number) =>
        `Practica con un simulacro del examen ${code}: ${questions} preguntas, ${minutes} minutos y puntaje estimado.`,
      intro: (code: string, bankSize: number) =>
        `Pon a prueba todo lo que estudiaste con un examen como el ${code}: preguntas de los cuatro dominios, con tiempo y puntaje. Cada intento trae preguntas distintas de un banco de ${bankSize}.`,
    },
    title: 'Simulacro del examen CLF-C02',
    rules: {
      questions: (count: number) => `${count} preguntas de los cuatro dominios, en la proporción oficial del examen.`,
      time: (minutes: number) => `${minutes} minutos. Al terminar el tiempo, el examen se entrega solo.`,
      navigation: 'Puedes avanzar, volver y marcar preguntas para revisarlas antes de terminar.',
      score: ({ min, max, passing }: ScoreScale) =>
        `Al final ves un puntaje estimado en la escala ${min}–${max} (se aprueba con ${passing}) y el repaso de cada pregunta.`,
    },
    note: 'Es una estimación: el examen real incluye 15 preguntas que no puntúan, preguntas de respuesta múltiple y una escala que AWS no publica.',
    start: 'Empezar simulacro',
    navLabel: 'Ir a una pregunta',
    questionLabel: (n: number) => `Pregunta ${n}`,
    progress: (n: number, total: number) => `Pregunta ${n} de ${total}`,
    previous: 'Anterior',
    unflag: 'Quitar marca',
    flag: 'Marcar para revisar',
    next: 'Siguiente',
    reviewAndFinish: 'Revisar y terminar',
    unanswered: (count: number) => `Tienes ${count} ${count === 1 ? 'pregunta' : 'preguntas'} sin responder. Cuentan como incorrectas.`,
    keepAnswering: 'Seguir respondiendo',
    finishAnyway: 'Terminar igual',
    timeLeft: 'Tiempo restante ',
    finishExam: 'Terminar examen',
    questions: 'Preguntas',
    timeUp: 'Se acabó el tiempo: el examen se entregó con tus respuestas hasta ese momento.',
    scoreLabel: 'Puntaje estimado',
    passed: 'Aprobado',
    failed: 'No aprobado',
    summary: (correct: number, total: number, passing: number) => `${correct} de ${total} correctas. Se aprueba con ${passing}.`,
    domainScore: (correct: number, total: number) => `${correct} de ${total}`,
    newExam: 'Nuevo simulacro',
    reviewTitle: 'Repaso de las preguntas',
    yourAnswer: 'Tu respuesta: ',
    noAnswer: 'Sin responder',
    rightAnswer: 'Respuesta correcta: ',
    reviewTopic: 'Repasar el tema',
  },
  en: {
    page: {
      title: 'Practice exam',
      eyebrow: 'Practice',
      description: (code: string, questions: number, minutes: number) =>
        `Practice with a mock ${code} exam: ${questions} questions, ${minutes} minutes and an estimated score.`,
      intro: (code: string, bankSize: number) =>
        `Put everything you studied to the test with an exam like the ${code}: questions from all four domains, with a timer and a score. Each attempt brings different questions from a bank of ${bankSize}.`,
    },
    title: 'CLF-C02 practice exam',
    rules: {
      questions: (count: number) => `${count} questions from the four domains, in the official exam proportions.`,
      time: (minutes: number) => `${minutes} minutes. When time runs out, the exam submits itself.`,
      navigation: 'You can move forward, go back and flag questions to review before finishing.',
      score: ({ min, max, passing }: ScoreScale) =>
        `At the end you get an estimated score on the ${min}–${max} scale (${passing} to pass) and a review of every question.`,
    },
    note: 'It is an estimate: the real exam includes 15 unscored questions, multiple-response questions and a scale AWS does not publish.',
    start: 'Start practice exam',
    navLabel: 'Go to a question',
    questionLabel: (n: number) => `Question ${n}`,
    progress: (n: number, total: number) => `Question ${n} of ${total}`,
    previous: 'Previous',
    unflag: 'Remove flag',
    flag: 'Flag for review',
    next: 'Next',
    reviewAndFinish: 'Review and finish',
    unanswered: (count: number) => `You have ${count} unanswered ${count === 1 ? 'question' : 'questions'}. They count as incorrect.`,
    keepAnswering: 'Keep answering',
    finishAnyway: 'Finish anyway',
    timeLeft: 'Time left ',
    finishExam: 'Finish exam',
    questions: 'Questions',
    timeUp: 'Time is up: the exam was submitted with your answers so far.',
    scoreLabel: 'Estimated score',
    passed: 'Passed',
    failed: 'Not passed',
    summary: (correct: number, total: number, passing: number) => `${correct} of ${total} correct. ${passing} to pass.`,
    domainScore: (correct: number, total: number) => `${correct} of ${total}`,
    newExam: 'New practice exam',
    reviewTitle: 'Question review',
    yourAnswer: 'Your answer: ',
    noAnswer: 'Not answered',
    rightAnswer: 'Correct answer: ',
    reviewTopic: 'Review the topic',
  },
});
