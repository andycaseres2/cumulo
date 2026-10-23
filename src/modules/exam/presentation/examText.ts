import { examMessages } from '@/i18n/messages/exam';
import type { Locale } from '@/i18n/locales';
import type { ExamDomain } from '../domain/ExamDomain';
import type { ExamTask } from '../domain/ExamTask';

/** Title and description of an exam domain in `locale` (the domain data is Spanish). */
export function domainText(domain: ExamDomain, locale: Locale): { title: string; description: string } {
  return examMessages[locale].domains?.[domain.id] ?? { title: domain.title, description: domain.description };
}

/** A task statement of the exam guide in `locale`. */
export function taskTitle(task: ExamTask, locale: Locale): string {
  return examMessages[locale].tasks?.[task.id] ?? task.title;
}
