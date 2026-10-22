import { describe, expect, it } from 'vitest';
import { renameMissionId, renameTopicSlug } from './legacyIds';

describe('legacy ids', () => {
  it('reads a topic slug saved before the English rename as the new slug', () => {
    expect(renameTopicSlug('cloud-benefits')).toBe('cloud-benefits');
  });

  it('keeps current slugs as they are', () => {
    expect(renameTopicSlug('cloud-benefits')).toBe('cloud-benefits');
    expect(renameTopicSlug('well-architected-framework')).toBe('well-architected-framework');
  });

  it('renames mission ids built from an old topic slug and keeps their number', () => {
    expect(renameMissionId('root-user-and-credentials-2')).toBe('root-user-and-credentials-2');
    expect(renameMissionId('ec2-compute-1')).toBe('ec2-compute-1');
  });

  it('keeps other mission ids', () => {
    expect(renameMissionId('bakery-elasticity')).toBe('bakery-elasticity');
    expect(renameMissionId('cloud-benefits-1')).toBe('cloud-benefits-1');
  });
});
