import { EXAM_FORMAT } from '@/modules/exam/domain/ExamFormat';
import type { Course } from '../domain/Course';

/** Courses on offer. Every theory topic belongs to the first one for now. */
export const COURSES: Course[] = [
  {
    slug: 'cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    examCode: EXAM_FORMAT.code,
    level: 'Fundamentos',
    summary:
      'La certificación de entrada de AWS: conceptos de la nube, seguridad, servicios principales, facturación y soporte. No necesitas experiencia previa.',
  },
];
