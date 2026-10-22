import { describe, expect, it } from 'vitest';
import { safeNextPath } from './safeNextPath';

describe('safeNextPath', () => {
  it('keeps paths inside the site', () => {
    expect(safeNextPath('/games/cumulo-city')).toBe('/games/cumulo-city');
    expect(safeNextPath('/theory?topic=s3#top')).toBe('/theory?topic=s3#top');
  });

  it.each([null, '', 'games', 'https://evil.example', '//evil.example', '/\\evil.example', 'javascript:alert(1)'])(
    'sends %o to the home page instead of leaving the site',
    (next) => {
      expect(safeNextPath(next)).toBe('/');
    },
  );
});
