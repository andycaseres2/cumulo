/**
 * Port between the game and the missions of the platform. The game only knows this contract;
 * the host page decides where missions come from, how they are played and where progress is saved.
 */
export interface MissionBrief {
  id: string;
  buildingId: string;
  title: string;
  client: { name: string; role: string };
  intro: string[];
  outro: { passed: string[]; failed: string[] };
}

/** Missions are offered one at a time, in order; one becomes active only when the player accepts it. */
export type MissionState = 'locked' | 'offered' | 'active' | 'completed';

export interface CurrentMission {
  brief: MissionBrief;
  state: 'offered' | 'active';
}

/** The mission that matters in a building right now: the active one there, or the last one once all are done. */
export interface BuildingMission {
  brief: MissionBrief;
  state: 'active' | 'completed';
}

export interface GameMissions {
  /** The active mission wherever it is, otherwise the one on offer in this district; null when there is none. */
  current(district: string): Promise<CurrentMission | null>;
  /** Null while the building has clients still waiting their turn (or none at all). */
  forBuilding(buildingId: string): Promise<BuildingMission | null>;
  status(missionId: string): Promise<MissionState>;
  /** Activates the mission on offer; false if it was not the one on offer. */
  accept(missionId: string): Promise<boolean>;
  /** Plays the mission over the game; null when the player leaves before finishing. */
  play(missionId: string): Promise<{ passed: boolean; score: number } | null>;
}

/** Used when the host provides no missions: the city is free to explore. */
export const noMissions: GameMissions = {
  current: async () => null,
  forBuilding: async () => null,
  status: async () => 'locked',
  accept: async () => false,
  play: async () => null,
};
