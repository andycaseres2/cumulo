/**
 * How the CLF-C02 exam is delivered and scored.
 * Source: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html
 */
export const EXAM_FORMAT = {
  code: 'CLF-C02',
  questions: 65,
  scoredQuestions: 50,
  unscoredQuestions: 15,
  durationMinutes: 90,
  passingScore: 700,
  minScore: 100,
  maxScore: 1000,
  questionTypes: [
    'Opción múltiple: una respuesta correcta y tres distractores.',
    'Respuesta múltiple: dos o más respuestas correctas entre cinco o más opciones.',
  ],
  sourceUrl: 'https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html',
} as const;
