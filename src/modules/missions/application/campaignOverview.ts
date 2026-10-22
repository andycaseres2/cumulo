import { EXAM_DOMAINS, type ExamDomainId } from '@/modules/exam/domain/ExamDomain';
import { findExamTask } from '@/modules/exam/domain/ExamTask';
import type { Mission } from '../domain/Mission';
import type { MissionCatalog } from '../domain/MissionCatalog';
import type { MissionProgressStore, MissionState } from '../domain/MissionProgress';
import { getMissionStatus } from './missionProgress';

export interface CampaignEntry {
  mission: Mission;
  state: MissionState;
  bestScore: number | null;
}

export interface CampaignOverview {
  entries: CampaignEntry[];
  completed: number;
  total: number;
  /** Exam domains (in exam order) practiced by at least one completed mission. */
  practicedDomains: ExamDomainId[];
}

/** Every mission of the campaign with the player's state, for the progress page. */
export async function getCampaignOverview(store: MissionProgressStore, catalog: MissionCatalog): Promise<CampaignOverview> {
  const missions = await catalog.all();
  const entries = await Promise.all(
    missions.map(async (mission) => ({ mission, ...(await getMissionStatus(store, catalog, mission.id)) })),
  );
  const completedMissions = entries.filter((e) => e.state === 'completed').map((e) => e.mission);
  const practiced = new Set(
    completedMissions.flatMap((m) => m.decisions.flatMap((d) => d.examTasks.map((id) => findExamTask(id)?.domainId))),
  );
  return {
    entries,
    completed: completedMissions.length,
    total: missions.length,
    practicedDomains: EXAM_DOMAINS.map((d) => d.id).filter((id) => practiced.has(id)),
  };
}
