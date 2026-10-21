/**
 * Port between the game and the missions of the platform. The game only knows this contract;
 * the host page decides where missions come from, how they are played and where progress is saved.
 */
export interface MissionBrief {
  id: string;
  title: string;
  client: { name: string; role: string };
  intro: string[];
  outro: { passed: string[]; failed: string[] };
}

export type MissionState = 'available' | 'completed';

export interface GameMissions {
  forBuilding(buildingId: string): Promise<MissionBrief | null>;
  status(missionId: string): Promise<MissionState>;
  /** Plays the mission over the game; null when the player leaves before finishing. */
  play(missionId: string): Promise<{ passed: boolean; score: number } | null>;
}

/** Used when the host provides no missions: the city is free to explore. */
export const noMissions: GameMissions = {
  forBuilding: async () => null,
  status: async () => 'available',
  play: async () => null,
};
