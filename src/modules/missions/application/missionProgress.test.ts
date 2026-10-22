import { describe, expect, it } from 'vitest';
import { inMemoryProgressStore } from '../infrastructure/inMemoryProgressStore';
import { catalogOf, secondMission, twoStepMission as firstMission } from '../testing/fixtures';
import { acceptMission, getCampaign, getMissionStatus, recordMissionResult } from './missionProgress';

const catalog = catalogOf(firstMission, secondMission);

describe('mission campaign', () => {
  it('starts with nothing active: the first mission is offered and the rest are locked', async () => {
    const store = inMemoryProgressStore();

    expect(await getMissionStatus(store, catalog, firstMission.id)).toEqual({ state: 'offered', bestScore: null });
    expect((await getMissionStatus(store, catalog, secondMission.id)).state).toBe('locked');
    expect(await getCampaign(store, catalog)).toEqual({
      current: { mission: firstMission, state: 'offered' },
      completed: 0,
      total: 2,
    });
  });

  it('activates the offered mission only when the player accepts it', async () => {
    const store = inMemoryProgressStore();

    await expect(acceptMission(store, catalog, firstMission.id)).resolves.toBe(true);
    expect((await getMissionStatus(store, catalog, firstMission.id)).state).toBe('active');
    expect((await getCampaign(store, catalog)).current?.state).toBe('active');
  });

  it('refuses to accept a mission that is not the one on offer', async () => {
    const store = inMemoryProgressStore();
    await expect(acceptMission(store, catalog, secondMission.id)).resolves.toBe(false);
    expect((await getMissionStatus(store, catalog, secondMission.id)).state).toBe('locked');
  });

  it('keeps a failed mission active with its best score', async () => {
    const store = inMemoryProgressStore();
    await acceptMission(store, catalog, firstMission.id);
    await recordMissionResult(store, firstMission.id, { score: 0.6, passed: false });

    expect(await getMissionStatus(store, catalog, firstMission.id)).toEqual({ state: 'active', bestScore: 0.6 });
  });

  it('offers the next mission once the current one is completed, keeping the best score', async () => {
    const store = inMemoryProgressStore();
    await acceptMission(store, catalog, firstMission.id);
    await recordMissionResult(store, firstMission.id, { score: 1, passed: true });
    await recordMissionResult(store, firstMission.id, { score: 0.2, passed: false });

    expect(await getMissionStatus(store, catalog, firstMission.id)).toEqual({ state: 'completed', bestScore: 1 });
    expect(await getCampaign(store, catalog)).toEqual({
      current: { mission: secondMission, state: 'offered' },
      completed: 1,
      total: 2,
    });
  });

  it('has no current mission when every mission is completed', async () => {
    const store = inMemoryProgressStore({
      [firstMission.id]: { bestScore: 1, completed: true, accepted: true },
      [secondMission.id]: { bestScore: 1, completed: true, accepted: true },
    });
    expect((await getCampaign(store, catalog)).current).toBeNull();
  });

  it('reads progress saved before missions had to be accepted', async () => {
    const legacy = { [firstMission.id]: { bestScore: 0.8, completed: true } } as never;
    const store = inMemoryProgressStore(legacy);

    expect((await getMissionStatus(store, catalog, firstMission.id)).state).toBe('completed');
    expect((await getCampaign(store, catalog)).current?.mission.id).toBe(secondMission.id);
  });
});
