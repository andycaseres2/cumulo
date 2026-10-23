import { defineMessages } from '../defineMessages';

/** Copy of the catalogs: games, courses and the exam's question types. Ids and structure live in the data files. */
export const catalogMessages = defineMessages({
  es: {
    games: {
      'cumulo-city': {
        title: 'Cúmulo City',
        tagline: 'Recorre la ciudad como consultor cloud',
        description:
          'Camina por Cúmulo City, conversa con sus vecinos y ayuda a negocios reales con sus problemas en la nube. Cada misión te enseña un servicio de AWS en contexto.',
      },
      'service-duel': {
        title: 'Duelo de servicios',
        tagline: 'Elige el servicio correcto antes de que acabe el tiempo',
        description:
          'Duelos contra cinco rivales, contrarreloj y entrenamiento para distinguir los servicios que se confunden en el examen: S3, EBS o EFS; RDS o DynamoDB; GuardDuty o Inspector, y muchos más.',
      },
    },
    courses: {
      'cloud-practitioner': {
        level: 'Fundamentos',
        summary:
          'La certificación de entrada de AWS: conceptos de la nube, seguridad, servicios principales, facturación y soporte. No necesitas experiencia previa.',
      },
    },
    examQuestionTypes: [
      'Opción múltiple: una respuesta correcta y tres distractores.',
      'Respuesta múltiple: dos o más respuestas correctas entre cinco o más opciones.',
    ],
  },
  en: {
    games: {
      'cumulo-city': {
        title: 'Cúmulo City',
        tagline: 'Explore the city as a cloud consultant',
        description:
          'Walk around Cúmulo City, chat with its neighbors and help real businesses with their cloud problems. Every mission teaches you an AWS service in context.',
      },
      'service-duel': {
        title: 'Service Duel',
        tagline: 'Pick the right service before time runs out',
        description:
          'Duels against five rivals, time attack and training to tell apart the services the exam loves to mix up: S3, EBS or EFS; RDS or DynamoDB; GuardDuty or Inspector, and many more.',
      },
    },
    courses: {
      'cloud-practitioner': {
        level: 'Foundational',
        summary:
          "AWS's entry-level certification: cloud concepts, security, core services, billing and support. No prior experience needed.",
      },
    },
    examQuestionTypes: [
      'Multiple choice: one correct answer and three distractors.',
      'Multiple response: two or more correct answers out of five or more options.',
    ],
  },
});
