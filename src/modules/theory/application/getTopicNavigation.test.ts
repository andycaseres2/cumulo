import { describe, expect, it } from 'vitest';
import { inMemoryTopics, topic } from '../testing/fakes';
import { getTopicNavigation } from './getTopicNavigation';

const repository = inMemoryTopics([
  topic({ slug: 'iam', domainId: 'security-compliance', order: 2 }),
  topic({ slug: 'benefits', domainId: 'cloud-concepts', order: 1 }),
  topic({ slug: 'shared-responsibility', domainId: 'security-compliance', order: 1 }),
]);

describe('getTopicNavigation', () => {
  it('returns the topic with its exam domain and neighbours across domains in study order', async () => {
    const navigation = await getTopicNavigation(repository, 'shared-responsibility');

    expect(navigation?.topic.slug).toBe('shared-responsibility');
    expect(navigation?.domain.id).toBe('security-compliance');
    expect(navigation?.previous?.slug).toBe('benefits');
    expect(navigation?.next?.slug).toBe('iam');
  });

  it('has no previous topic at the start and no next topic at the end', async () => {
    expect((await getTopicNavigation(repository, 'benefits'))?.previous).toBeNull();
    expect((await getTopicNavigation(repository, 'iam'))?.next).toBeNull();
  });

  it('returns null for an unknown slug', async () => {
    await expect(getTopicNavigation(repository, 'missing')).resolves.toBeNull();
  });
});
