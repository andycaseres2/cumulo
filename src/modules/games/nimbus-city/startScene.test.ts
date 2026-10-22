import { describe, expect, it } from 'vitest';
import { startScene } from './startScene';

describe('startScene', () => {
  it('opens character selection when the player has not chosen yet', () => {
    expect(startScene(null, null)).toEqual({ scene: 'select' });
  });

  it('goes straight to the city with the character chosen before', () => {
    expect(startScene('woman', null)).toEqual({ scene: 'city', playerKey: 'player-woman' });
  });

  it('lets the ?play= development shortcut win', () => {
    expect(startScene(null, 'man')).toEqual({ scene: 'city', playerKey: 'player-man' });
    expect(startScene('woman', 'man')).toEqual({ scene: 'city', playerKey: 'player-man' });
    expect(startScene(null, 'robot')).toEqual({ scene: 'select' });
  });
});
