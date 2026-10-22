import { describe, expect, it } from 'vitest';
import { inMemoryProgressStore } from '../infrastructure/inMemoryProgressStore';
import { catalogOf, secondMission, twoStepMission as firstMission } from '../testing/fixtures';
import { getCampaignOverview } from './campaignOverview';

describe('getCampaignOverview', () => {
  it('lists every mission in campaign order with its state and best score', async () => {
    const store = inMemoryProgressStore({ [firstMission.id]: { bestScore: 1, completed: true, accepted: true } });

    const overview = await getCampaignOverview(store, catalogOf(firstMission, secondMission));

    expect(overview.entries.map((e) => [e.mission.id, e.state, e.bestScore])).toEqual([
      [firstMission.id, 'completed', 1],
      [secondMission.id, 'offered', null],
    ]);
    expect(overview).toMatchObject({ completed: 1, total: 2 });
  });

  it('counts the exam domains practiced in completed missions', async () => {
    const store = inMemoryProgressStore({ [firstMission.id]: { bestScore: 1, completed: true, accepted: true } });
    const overview = await getCampaignOverview(store, catalogOf(firstMission, secondMission));

    // firstMission practices tasks 1.1 and 3.3: domains cloud-concepts and technology-services.
    expect(overview.practicedDomains).toEqual(['cloud-concepts', 'technology-services']);
  });

  it('starts empty for a new player', async () => {
    const overview = await getCampaignOverview(inMemoryProgressStore(), catalogOf(firstMission, secondMission));
    expect(overview).toMatchObject({ completed: 0, practicedDomains: [] });
    expect(overview.entries.map((e) => e.state)).toEqual(['offered', 'locked']);
  });
});
