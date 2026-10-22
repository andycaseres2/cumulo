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

export interface GameMissions {
  /** The mission on offer or in progress; null when there is none left. */
  current(): Promise<CurrentMission | null>;
  forBuilding(buildingId: string): Promise<MissionBrief | null>;
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
