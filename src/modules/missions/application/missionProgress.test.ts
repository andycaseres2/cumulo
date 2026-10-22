import { describe, expect, it } from 'vitest';
import { inMemoryProgressStore } from '../infrastructure/inMemoryProgressStore';
import { catalogOf, otherTrackMission, secondMission, twoStepMission as firstMission } from '../testing/fixtures';
import { acceptMission, getBuildingMission, getCampaign, getMissionStatus, recordMissionResult } from './missionProgress';

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

  it('runs one campaign per track: the first mission of every track is on offer at the same time', async () => {
    const tracks = catalogOf(firstMission, secondMission, otherTrackMission);
    const store = inMemoryProgressStore();

    expect((await getMissionStatus(store, tracks, firstMission.id)).state).toBe('offered');
    expect((await getMissionStatus(store, tracks, secondMission.id)).state).toBe('locked');
    expect((await getMissionStatus(store, tracks, otherTrackMission.id)).state).toBe('offered');
    expect((await getCampaign(store, tracks, 'financiero')).current).toEqual({ mission: otherTrackMission, state: 'offered' });
    expect((await getCampaign(store, tracks, 'centro')).current).toEqual({ mission: firstMission, state: 'offered' });
  });

  it('allows only one active mission in the whole city, and shows it from every track', async () => {
    const tracks = catalogOf(firstMission, secondMission, otherTrackMission);
    const store = inMemoryProgressStore();

    await expect(acceptMission(store, tracks, firstMission.id)).resolves.toBe(true);
    await expect(acceptMission(store, tracks, otherTrackMission.id)).resolves.toBe(false);
    expect((await getCampaign(store, tracks, 'financiero')).current).toEqual({ mission: firstMission, state: 'active' });

    await recordMissionResult(store, firstMission.id, { score: 1, passed: true });
    await expect(acceptMission(store, tracks, otherTrackMission.id)).resolves.toBe(true);
  });

  it('finds the missions hosted by a building, in campaign order', async () => {
    const shared = { ...secondMission, buildingId: firstMission.buildingId };
    await expect(catalogOf(firstMission, shared, otherTrackMission).inBuilding(firstMission.buildingId)).resolves.toEqual([firstMission, shared]);
  });

  it('tells what matters in a building: its active mission, nothing while clients wait, the last one when all are done', async () => {
    const shared = { ...secondMission, buildingId: firstMission.buildingId };
    const building = catalogOf(firstMission, shared);
    const store = inMemoryProgressStore();
    await expect(getBuildingMission(store, building, firstMission.buildingId)).resolves.toBeNull();

    await acceptMission(store, building, firstMission.id);
    await expect(getBuildingMission(store, building, firstMission.buildingId)).resolves.toEqual({ mission: firstMission, state: 'active' });

    await recordMissionResult(store, firstMission.id, { score: 1, passed: true });
    await expect(getBuildingMission(store, building, firstMission.buildingId)).resolves.toBeNull();

    await acceptMission(store, building, shared.id);
    await recordMissionResult(store, shared.id, { score: 1, passed: true });
    await expect(getBuildingMission(store, building, firstMission.buildingId)).resolves.toEqual({ mission: shared, state: 'completed' });
    await expect(getBuildingMission(store, building, 'empty-building')).resolves.toBeNull();
  });

  it('reads progress saved before missions had to be accepted', async () => {
    const legacy = { [firstMission.id]: { bestScore: 0.8, completed: true } } as never;
    const store = inMemoryProgressStore(legacy);

    expect((await getMissionStatus(store, catalog, firstMission.id)).state).toBe('completed');
    expect((await getCampaign(store, catalog)).current?.mission.id).toBe(secondMission.id);
  });
});
