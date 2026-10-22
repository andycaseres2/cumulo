import { describe, expect, it } from 'vitest';
import { routes } from './routes';

describe('theory routes', () => {
  it('lists the courses at /teoria and each course at its own path', () => {
    expect(routes.theory).toBe('/teoria');
    expect(routes.course('cloud-practitioner')).toBe('/teoria/cloud-practitioner');
  });

  it('nests topics and domain anchors under their course, Cloud Practitioner by default', () => {
    expect(routes.topic('amazon-s3')).toBe('/teoria/cloud-practitioner/amazon-s3');
    expect(routes.topic('amazon-s3', 'otro-curso')).toBe('/teoria/otro-curso/amazon-s3');
    expect(routes.theoryDomain('cloud-concepts')).toBe('/teoria/cloud-practitioner#cloud-concepts');
  });
});
