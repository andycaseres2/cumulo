import { EventEmitter } from 'node:events';
import { describe, expect, it } from 'vitest';
import { EVENTS, REGISTRY } from '../../config';
import type { CurrentMission, GameMissions, MissionBrief } from '../../missions';
import { MissionTracker } from './MissionTracker';

const brief: MissionBrief = {
  id: 'bakery-elasticity',
  buildingId: 'bakery',
  title: 'La Navidad que tumbó la web',
  client: { name: 'Rosa Quispe', role: 'Dueña' },
  intro: ['Hola'],
  outro: { passed: [], failed: [] },
};

/** A scene-like object with the game events and registry the tracker uses. */
function sceneWith(missions: GameMissions) {
  const registry = new Map<string, unknown>([[REGISTRY.missions, missions]]);
  const events = new EventEmitter();
  const game = { events };
  return { game, registry: { get: (k: string) => registry.get(k), set: (k: string, v: unknown) => registry.set(k, v) }, events };
}

describe('MissionTracker', () => {
  it('keeps the newest answer when an older refresh finishes last', async () => {
    let release!: () => void;
    const slow = new Promise<void>((resolve) => (release = resolve));
    let calls = 0;
    const missions = {
      current: async (): Promise<CurrentMission> => {
        calls++;
        if (calls === 1) {
          await slow;
          return { brief, state: 'offered' };
        }
        return { brief, state: 'active' };
      },
    } as unknown as GameMissions;
    const scene = sceneWith(missions);
    const cards: string[] = [];
    scene.events.on(EVENTS.missionCard, (card: { heading: string }) => cards.push(card.heading));
    const tracker = MissionTracker.of(scene as never);

    const older = tracker.refresh();
    await tracker.refresh();
    release();
    await older;

    expect(tracker.current?.state).toBe('active');
    expect(cards).toEqual(['Misión activa']);
  });
});
