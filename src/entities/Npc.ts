import Phaser from 'phaser';
import { NPC_SPEED } from '../config';
import { Walker } from './Walker';

const HEADINGS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/** A citizen that wanders around and shares a hint when spoken to. */
export class Npc extends Walker {
  frozen = false;
  private heading = new Phaser.Math.Vector2();
  private nextDecisionAt = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, look: string, readonly line: string) {
    super(scene, x, y, look);
    this.arcadeBody.pushable = false;
  }

  update(time: number) {
    if (this.frozen) {
      this.arcadeBody.setVelocity(0, 0);
      return;
    }
    const body = this.arcadeBody;
    const bumped = this.heading.lengthSq() > 0 && (!body.blocked.none || !body.touching.none);
    if (time >= this.nextDecisionAt || bumped) {
      this.heading.set(0, 0);
      if (Math.random() > 0.35) {
        const [x, y] = Phaser.Utils.Array.GetRandom(HEADINGS);
        this.heading.set(x, y);
      }
      this.nextDecisionAt = time + Phaser.Math.Between(900, 2800);
    }
    this.move(this.heading.x * NPC_SPEED, this.heading.y * NPC_SPEED);
  }
}
