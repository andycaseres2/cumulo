import legacy from './legacyTopicSlugs.json';

/**
 * Topic slugs were Spanish before the code moved to English. Progress saved back then (in the account or
 * in the browser) still holds the old slugs, and the mission ids built from them; these read them as the new ones.
 */
const TOPICS: Record<string, string> = legacy.topics;

export function renameTopicSlug(slug: string): string {
  return TOPICS[slug] ?? slug;
}

/** Mission ids of the theory campaigns are `<topic slug>-<number>`. */
export function renameMissionId(id: string): string {
  const match = /^(.+)-(\d+)$/.exec(id);
  return match && TOPICS[match[1]] ? `${TOPICS[match[1]]}-${match[2]}` : id;
}

/** Old slug → new slug, e.g. for the redirects of the old theory URLs. */
export const LEGACY_TOPIC_SLUGS: Readonly<Record<string, string>> = TOPICS;
