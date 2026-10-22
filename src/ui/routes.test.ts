import { describe, expect, it } from 'vitest';
import { routes } from './routes';

describe('routes', () => {
  it('uses English paths for every page', () => {
    expect([routes.signIn, routes.games, routes.theory, routes.profile, routes.practiceExam, routes.practiceExamBank]).toEqual([
      '/sign-in',
      '/games',
      '/theory',
      '/profile',
      '/practice-exam',
      '/practice-exam/bank.json',
    ]);
    expect(routes.game('cumulo-city')).toBe('/games/cumulo-city');
  });

  it('lists the courses at /theory and each course at its own path', () => {
    expect(routes.course('cloud-practitioner')).toBe('/theory/cloud-practitioner');
  });

  it('nests topics and domain anchors under their course, Cloud Practitioner by default', () => {
    expect(routes.topic('amazon-s3')).toBe('/theory/cloud-practitioner/amazon-s3');
    expect(routes.topic('amazon-s3', 'other-course')).toBe('/theory/other-course/amazon-s3');
    expect(routes.theoryDomain('cloud-concepts')).toBe('/theory/cloud-practitioner#cloud-concepts');
  });
});
