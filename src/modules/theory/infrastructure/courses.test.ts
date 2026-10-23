import { describe, expect, it } from 'vitest';
import { coursesIn } from './courses';

describe('coursesIn', () => {
  it('keeps the Spanish level and summary', () => {
    const [course] = coursesIn('es');
    expect(course.level).toBe('Fundamentos');
    expect(course.summary).toMatch(/^La certificación de entrada de AWS/);
  });

  it('gives each course its English level and summary, keeping title, slug and exam code', () => {
    const [es] = coursesIn('es');
    const [en] = coursesIn('en');
    expect(en.level).toBe('Foundational');
    expect(en.summary).toMatch(/^AWS's entry-level certification/);
    expect({ slug: en.slug, title: en.title, examCode: en.examCode }).toEqual({ slug: es.slug, title: es.title, examCode: es.examCode });
  });
});
