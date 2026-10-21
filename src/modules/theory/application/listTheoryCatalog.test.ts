import { describe, expect, it } from 'vitest';
import { inMemoryTopics, topic } from '../testing/fakes';
import { listTheoryCatalog } from './listTheoryCatalog';

describe('listTheoryCatalog', () => {
  it('groups topics under every exam domain in exam order, including empty domains', async () => {
    const repository = inMemoryTopics([
      topic({ slug: 'costs', domainId: 'billing-pricing-support', order: 1 }),
      topic({ slug: 'benefits', domainId: 'cloud-concepts', order: 1 }),
    ]);

    const catalog = await listTheoryCatalog(repository);

    expect(catalog.map((section) => [section.domain.id, section.topics.map((t) => t.slug)])).toEqual([
      ['cloud-concepts', ['benefits']],
      ['security-compliance', []],
      ['technology-services', []],
      ['billing-pricing-support', ['costs']],
    ]);
  });

  it('sorts topics inside a domain by their order', async () => {
    const repository = inMemoryTopics([
      topic({ slug: 'second', domainId: 'cloud-concepts', order: 2 }),
      topic({ slug: 'first', domainId: 'cloud-concepts', order: 1 }),
    ]);

    const [cloud] = await listTheoryCatalog(repository);

    expect(cloud.topics.map((t) => t.slug)).toEqual(['first', 'second']);
  });
});
