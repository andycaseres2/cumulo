/** Composition root for the theory module. Server-side only (reads content collections). */
import { getTopicNavigation } from '@/modules/theory/application/getTopicNavigation';
import { listTheoryCatalog } from '@/modules/theory/application/listTheoryCatalog';
import { astroContentTopicRepository, renderTopicBody } from '@/modules/theory/infrastructure/astroContentTopics';

export const theory = {
  catalog: () => listTheoryCatalog(astroContentTopicRepository),
  navigation: (slug: string) => getTopicNavigation(astroContentTopicRepository, slug),
  renderBody: renderTopicBody,
};
