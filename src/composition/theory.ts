/** Composition root for the theory module. Server-side only (reads content collections). */
import { getTheoryCoverage } from '@/modules/theory/application/getTheoryCoverage';
import { getTopicNavigation } from '@/modules/theory/application/getTopicNavigation';
import { listTheoryCatalog } from '@/modules/theory/application/listTheoryCatalog';
import { astroContentTopicRepository, renderTopicBody } from '@/modules/theory/infrastructure/astroContentTopics';

export const theory = {
  catalog: () => listTheoryCatalog(astroContentTopicRepository),
  coverage: () => getTheoryCoverage(astroContentTopicRepository),
  navigation: (slug: string) => getTopicNavigation(astroContentTopicRepository, slug),
  renderBody: renderTopicBody,
};
