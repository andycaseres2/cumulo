// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { renameStoragePrefix } from './renameStoragePrefix';

describe('renameStoragePrefix', () => {
  beforeEach(() => window.localStorage.clear());

  it('moves every key under the old prefix to the new one, keeping the values', () => {
    window.localStorage.setItem('old:mission-progress:user-1', '{"a":1}');
    window.localStorage.setItem('old:has-character', '1');
    window.localStorage.setItem('unrelated', 'x');

    renameStoragePrefix('old:', 'new:');

    expect(window.localStorage.getItem('new:mission-progress:user-1')).toBe('{"a":1}');
    expect(window.localStorage.getItem('new:has-character')).toBe('1');
    expect(window.localStorage.getItem('old:mission-progress:user-1')).toBeNull();
    expect(window.localStorage.getItem('unrelated')).toBe('x');
  });

  it('never overwrites a value already saved under the new prefix', () => {
    window.localStorage.setItem('old:theory-progress', '["a"]');
    window.localStorage.setItem('new:theory-progress', '["b"]');

    renameStoragePrefix('old:', 'new:');

    expect(window.localStorage.getItem('new:theory-progress')).toBe('["b"]');
    expect(window.localStorage.getItem('old:theory-progress')).toBeNull();
  });
});
