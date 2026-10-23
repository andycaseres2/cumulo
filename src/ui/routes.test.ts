import { describe, expect, it } from 'vitest';
import { routesFor } from './routes';

describe('routesFor', () => {
  it('prefixes every page with the language', () => {
    const es = routesFor('es');
    const en = routesFor('en');
    expect([es.home, es.signIn, es.games, es.theory, es.profile, es.practiceExam]).toEqual([
      '/es/',
      '/es/sign-in',
      '/es/games',
      '/es/theory',
      '/es/profile',
      '/es/practice-exam',
    ]);
    expect(en.game('cumulo-city')).toBe('/en/games/cumulo-city');
  });

  it('nests topics and domain anchors under their course, Cloud Practitioner by default', () => {
    const en = routesFor('en');
    expect(en.course('cloud-practitioner')).toBe('/en/theory/cloud-practitioner');
    expect(en.topic('amazon-s3')).toBe('/en/theory/cloud-practitioner/amazon-s3');
    expect(en.topic('amazon-s3', 'other-course')).toBe('/en/theory/other-course/amazon-s3');
    expect(en.theoryDomain('cloud-concepts')).toBe('/en/theory/cloud-practitioner#cloud-concepts');
  });

  it('serves each language its own practice exam bank', () => {
    expect(routesFor('en').practiceExamBank).toBe('/en/practice-exam/bank.json');
  });
});
