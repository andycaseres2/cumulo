import { describe, expect, it } from 'vitest';
import { safeNextPath } from './safeNextPath';

describe('safeNextPath', () => {
  it('keeps paths inside the site', () => {
    expect(safeNextPath('/juegos/cumulo-city')).toBe('/juegos/cumulo-city');
    expect(safeNextPath('/teoria?tema=s3#arriba')).toBe('/teoria?tema=s3#arriba');
  });

  it.each([null, '', 'juegos', 'https://evil.example', '//evil.example', '/\\evil.example', 'javascript:alert(1)'])(
    'sends %o to the home page instead of leaving the site',
    (next) => {
      expect(safeNextPath(next)).toBe('/');
    },
  );
});
