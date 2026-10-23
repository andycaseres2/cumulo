import { catalogMessages } from '@/i18n/messages/catalog';
import type { Locale } from '@/i18n/locales';
import { EXAM_FORMAT } from '@/modules/exam/domain/ExamFormat';
import type { Course } from '../domain/Course';

type CourseSlug = keyof (typeof catalogMessages)['es']['courses'];

/** Courses on offer, without their copy. Every theory topic belongs to the first one for now. */
const COURSES: (Omit<Course, 'level' | 'summary'> & { slug: CourseSlug })[] = [
  {
    slug: 'cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    examCode: EXAM_FORMAT.code,
  },
];

/** Courses on offer with their level and summary in `locale`. */
export function coursesIn(locale: Locale): Course[] {
  return COURSES.map((course) => ({ ...course, ...catalogMessages[locale].courses[course.slug] }));
}
