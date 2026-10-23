import type Phaser from 'phaser';
import { EVENTS, REGISTRY } from '../../config';
import { missionCard } from '../../missionCard';
import type { CurrentMission, GameMissions } from '../../missions';
import type { Locale } from '@/i18n/locales';
import { gameLocale } from '../locale';
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
    private readonly locale: Locale,
  ) {
    game.events.on(EVENTS.missionAccept, () => void this.accept());
  }

  static of(scene: Phaser.Scene): MissionTracker {
    let tracker = scene.registry.get(REGISTRY.missionTracker) as MissionTracker | undefined;
    if (!tracker) {
      tracker = new MissionTracker(scene.game, scene.registry.get(REGISTRY.missions) as GameMissions, gameLocale(scene));
      scene.registry.set(REGISTRY.missionTracker, tracker);
    }
    return tracker;
  }

  /** Number of the latest refresh: an older one that finishes later must not overwrite it. */
  private refreshes = 0;

  async refresh() {
    const mine = ++this.refreshes;
    const current = await this.missions.current(this.district);
    if (mine !== this.refreshes) return;
    this.current = current;
    this.game.events.emit(EVENTS.missionCard, missionCard(this.current, this.district, this.locale));
    this.game.events.emit(EVENTS.missionChanged, this.current);
  }

  async accept() {
    if (this.current?.state !== 'offered') return;
    if (await this.missions.accept(this.current.brief.id)) await this.refresh();
  }
}
