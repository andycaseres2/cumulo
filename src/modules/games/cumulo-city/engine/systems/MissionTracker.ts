import Phaser from 'phaser';
import { EVENTS, REGISTRY } from '../../config';
import { missionCard } from '../../missionCard';
import type { CurrentMission, GameMissions } from '../../missions';
import { START_DISTRICT, type DistrictId } from '../../world/districts';

/**
 * One per game: knows the current mission, accepts the one on offer and tells the HUD
 * and the scenes whenever it changes, so city and interiors never disagree.
 */
export class MissionTracker {
  current: CurrentMission | null = null;
  /** District the player is in: the card offers its next mission. */
  district: DistrictId = START_DISTRICT;

  private constructor(
    private readonly game: Phaser.Game,
    readonly missions: GameMissions,
  ) {
    game.events.on(EVENTS.missionAccept, () => void this.accept());
  }

  static of(scene: Phaser.Scene): MissionTracker {
    let tracker = scene.registry.get(REGISTRY.missionTracker) as MissionTracker | undefined;
    if (!tracker) {
      tracker = new MissionTracker(scene.game, scene.registry.get(REGISTRY.missions) as GameMissions);
      scene.registry.set(REGISTRY.missionTracker, tracker);
    }
    return tracker;
  }

  async refresh() {
    this.current = await this.missions.current(this.district);
    this.game.events.emit(EVENTS.missionCard, missionCard(this.current, this.district));
    this.game.events.emit(EVENTS.missionChanged, this.current);
  }

  async accept() {
    if (this.current?.state !== 'offered') return;
    if (await this.missions.accept(this.current.brief.id)) await this.refresh();
  }
}
