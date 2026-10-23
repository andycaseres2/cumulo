import { EXAM_DOMAINS, type ExamDomainId } from '@/modules/exam/domain/ExamDomain';
import { findExamTask } from '@/modules/exam/domain/ExamTask';
import type { Mission } from '../domain/Mission';
import { jobFee } from '../domain/MissionRun';
import type { MissionCatalog } from '../domain/MissionCatalog';
import type { MissionProgressStore, MissionState } from '../domain/MissionProgress';
import { getMissionStatus } from './missionProgress';

export interface CampaignEntry {
  mission: Mission;
  state: MissionState;
  bestScore: number | null;
  /** Best rating of the job (0–3 stars), or null when it was never rated. */
  bestStars: number | null;
}

export interface CampaignOverview {
  entries: CampaignEntry[];
  completed: number;
  total: number;
  /** Exam domains (in exam order) practiced by at least one completed mission. */
  practicedDomains: ExamDomainId[];
  /** Stars earned over every job, and the fees their best ratings paid. */
  stars: number;
  fees: number;
}

/** Every mission of the campaign with the player's state, for the progress page. */
export async function getCampaignOverview(store: MissionProgressStore, catalog: MissionCatalog): Promise<CampaignOverview> {
  const missions = await catalog.all();
  const records = await store.load();
  const entries = await Promise.all(
    missions.map(async (mission) => ({
      mission,
      ...(await getMissionStatus(store, catalog, mission.id)),
      // 0 stars only comes from a failed try: the job is not rated.
      bestStars: records[mission.id]?.bestStars || null,
    })),
  );
  const rated = entries.filter((e) => e.state === 'completed' && e.bestStars !== null);
  const completedMissions = entries.filter((e) => e.state === 'completed').map((e) => e.mission);
  const practiced = new Set(
    completedMissions.flatMap((m) => m.decisions.flatMap((d) => d.examTasks.map((id) => findExamTask(id)?.domainId))),
  );
  return {
    entries,
    completed: completedMissions.length,
    total: missions.length,
    practicedDomains: EXAM_DOMAINS.map((d) => d.id).filter((id) => practiced.has(id)),
    stars: rated.reduce((total, e) => total + (e.bestStars ?? 0), 0),
    fees: rated.reduce((total, e) => total + jobFee(e.mission, e.bestStars ?? 0), 0),
  };
}
