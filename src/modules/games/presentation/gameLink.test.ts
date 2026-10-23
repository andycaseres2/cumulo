import { describe, expect, it } from 'vitest';
import { gameLink } from './gameLink';

describe('gameLink', () => {
  it('opens a game at its page under /games, behind an account', () => {
    expect(gameLink('cumulo-city')).toEqual({ href: '/games/cumulo-city', needsAccount: true });
  });

  it('sends the practice exam to its own public page', () => {
    expect(gameLink('practice-exam')).toEqual({ href: '/practice-exam', needsAccount: false });
  });
});
