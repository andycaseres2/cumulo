import { getCollection, render, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import type { BankQuestion } from '@/modules/exam/domain/PracticeExam';
import type { Topic } from '../domain/Topic';
import type { TopicRepository } from '../domain/TopicRepository';

type TheoryEntry = CollectionEntry<'theory'>;

/** Entry ids are `<locale>/<slug>`: the same slug in every language. */
const slugOf = (entry: TheoryEntry) => entry.id.slice(entry.id.indexOf('/') + 1);
const localeOfEntry = (entry: TheoryEntry) => entry.id.slice(0, entry.id.indexOf('/'));

/** One entry per topic in `locale`; topics not translated yet fall back to Spanish. */
async function entriesIn(locale: Locale): Promise<TheoryEntry[]> {
  const all = await getCollection('theory');
  const original = all.filter((entry) => localeOfEntry(entry) === DEFAULT_LOCALE);
  const translated = new Map(all.filter((entry) => localeOfEntry(entry) === locale).map((entry) => [slugOf(entry), entry]));
  return original.map((entry) => translated.get(slugOf(entry)) ?? entry);
}

function toTopic(entry: TheoryEntry): Topic {
  return {
    slug: slugOf(entry),
    title: entry.data.title,
    summary: entry.data.summary,
    domainId: entry.data.domain,
    order: entry.data.order,
    examTasks: entry.data.examTasks,
    services: entry.data.services,
    readingMinutes: entry.data.readingMinutes,
    hasQuiz: (entry.data.quiz?.length ?? 0) > 0,
  };
}

/** Adapter: theory topics stored as Markdown in the `theory` content collection, one folder per language. */
export function astroContentTopicRepository(locale: Locale): TopicRepository {
  return { findAll: async () => (await entriesIn(locale)).map(toTopic) };
}

/** Every topic quiz question, tagged with its domain and topic, as the bank for practice exams. */
export async function quizBank(locale: Locale): Promise<BankQuestion[]> {
  return (await entriesIn(locale)).flatMap((entry) =>
    [...(entry.data.quiz ?? []), ...(entry.data.practice ?? [])].map((question, i) => ({
      id: `${slugOf(entry)}#${i + 1}`,
      domainId: entry.data.domain,
      topicSlug: slugOf(entry),
      prompt: question.prompt,
      options: question.options,
    })),
  );
}

/** Rendering the Markdown body is a presentation concern, so it stays outside the domain. */
export async function renderTopicBody(slug: string, locale: Locale) {
  const entry = (await entriesIn(locale)).find((candidate) => slugOf(candidate) === slug);
  if (!entry) throw new Error(`Theory topic not found: ${slug}`);
  return { ...(await render(entry)), sources: entry.data.sources, quiz: entry.data.quiz ?? [], translated: localeOfEntry(entry) === locale };
}
