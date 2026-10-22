import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import type { BankQuestion } from '@/modules/exam/domain/PracticeExam';
import type { Topic } from '../domain/Topic';
import type { TopicRepository } from '../domain/TopicRepository';

function toTopic(entry: CollectionEntry<'theory'>): Topic {
  return {
    slug: entry.id,
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

/** Adapter: theory topics stored as Markdown in the `theory` content collection. */
export const astroContentTopicRepository: TopicRepository = {
  findAll: async () => (await getCollection('theory')).map(toTopic),
};

/** Every topic quiz question, tagged with its domain and topic, as the bank for practice exams. */
export async function quizBank(): Promise<BankQuestion[]> {
  return (await getCollection('theory')).flatMap((entry) =>
    (entry.data.quiz ?? []).map((question, i) => ({
      id: `${entry.id}#${i + 1}`,
      domainId: entry.data.domain,
      topicSlug: entry.id,
      prompt: question.prompt,
      options: question.options,
    })),
  );
}

/** Rendering the Markdown body is a presentation concern, so it stays outside the domain. */
export async function renderTopicBody(slug: string) {
  const entry = await getEntry('theory', slug);
  if (!entry) throw new Error(`Theory topic not found: ${slug}`);
  return { ...(await render(entry)), sources: entry.data.sources, quiz: entry.data.quiz ?? [] };
}
