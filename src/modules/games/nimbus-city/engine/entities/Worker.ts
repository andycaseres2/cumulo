import Phaser from 'phaser';
import { TILE } from '../../config';
import { findPath, type Point, type Workstation } from '../../world/office';
import { OFFICE_TEXTURES } from '../art/officeProps';
import { Walker } from './Walker';

const WALK_SPEED = 34;
type Activity = 'working' | 'walking' | 'resting';

const tileCenter = (p: Point) => ({ x: (p.x + 0.5) * TILE, y: (p.y + 1) * TILE - 2 });

/**
 * An office worker: types at their workstation, walks to the break area, rests, and walks back.
 * Walks along grid paths so it never needs physics against furniture.
 */
export class Worker extends Walker {
  frozen = false;
  /** Set for someone who waits for the player at their workstation (e.g. a client). */
  private staysAtDesk = false;
  private activity: Activity = 'working';
  private path: Point[] = [];
  private until = 0;
  private bubble: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    look: string,
    readonly line: string,
    private readonly station: Workstation,
    private readonly breakSpots: Point[],
    private readonly walkable: boolean[][],
    private readonly rng: () => number,
    /** Break spots taken by any worker of this office, shared so nobody stands on someone else. */
    private readonly takenSpots: Set<string>,
  ) {
    const seat = tileCenter(station.seat);
    super(scene, seat.x, seat.y, look);
    this.arcadeBody.pushable = false;
    this.facing = station.facing;
    this.move(0, 0);
    this.bubble = scene.add.image(seat.x + 6, seat.y - 18, OFFICE_TEXTURES.typing).setDepth(8_000);
    scene.tweens.add({ targets: this.bubble, alpha: 0.35, duration: 450, yoyo: true, repeat: -1 });
  }

  update(time: number) {
    // The scene clock is not in sync with the game clock until the first update, so start the shift here.
    if (this.until === 0) this.until = time + this.between(4000, 12000);
    this.bubble.setVisible(this.activity === 'working' && !this.frozen);
    if (this.frozen) {
      this.arcadeBody.setVelocity(0, 0);
      return;
    }
    if (this.activity === 'walking') {
      this.followPath();
      return;
    }
    if (this.staysAtDesk && this.activity === 'working') return;
    if (time < this.until) return;
    const target = this.activity === 'working' ? this.reserveBreakSpot() : this.leaveBreakSpot();
    if (!target) {
      this.until = time + this.between(3000, 6000);
      return;
    }
    this.path = findPath(this.walkable, this.tile(), target)?.slice(1) ?? [];
    this.activity = 'walking';
  }

  /** A free break spot, now reserved for this worker; null when all are taken. */
  private reserveBreakSpot(): Point | null {
    const free = this.breakSpots.filter((p) => !this.takenSpots.has(`${p.x},${p.y}`));
    if (free.length === 0) return null;
    const spot = free[Math.floor(this.rng() * free.length)];
    this.takenSpots.add(`${spot.x},${spot.y}`);
    return spot;
  }

  private leaveBreakSpot(): Point {
    const here = this.tile();
    this.takenSpots.delete(`${here.x},${here.y}`);
    return this.station.seat;
  }

  /**
   * Where the player stands to talk. Someone working behind a counter (facing down) is talked to
   * from the front of the counter, two tiles below, because the counter blocks the way.
   */
  get talkPoint(): { x: number; y: number } {
    const behindCounter = this.activity === 'working' && this.station.facing === 'down';
    return { x: this.x, y: behindCounter ? this.y + 2 * TILE : this.y };
  }

  /** From now on the worker goes back to (or stays at) their workstation and does not take breaks. */
  stayAtDesk() {
    this.staysAtDesk = true;
    // A deadline already in the past (0 would mean "shift not started yet").
    if (this.activity === 'resting') this.until = 1;
  }

  private followPath() {
    const next = this.path[0];
    if (!next) {
      this.arrive();
      return;
    }
    const goal = tileCenter(next);
    const dx = goal.x - this.x;
    const dy = goal.y - this.y;
    if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
      this.setPosition(goal.x, goal.y);
      this.path.shift();
      return;
    }
    const length = Math.hypot(dx, dy);
    this.move((dx / length) * WALK_SPEED, (dy / length) * WALK_SPEED);
  }

  private arrive() {
    const atSeat = this.tile().x === this.station.seat.x && this.tile().y === this.station.seat.y;
    this.activity = atSeat ? 'working' : 'resting';
    this.facing = atSeat ? this.station.facing : 'down';
    this.move(0, 0);
    this.until = this.scene.time.now + (atSeat ? this.between(9000, 16000) : this.between(3000, 6000));
    if (atSeat) this.bubble.setPosition(this.x + 6, this.y - 18);
  }

  private tile(): Point {
    return { x: Math.floor(this.x / TILE), y: Math.floor((this.y - 1) / TILE) };
  }

  private between(min: number, max: number): number {
    return min + this.rng() * (max - min);
  }

  destroy(fromScene?: boolean) {
    this.bubble?.destroy();
    super.destroy(fromScene);
  }
}
