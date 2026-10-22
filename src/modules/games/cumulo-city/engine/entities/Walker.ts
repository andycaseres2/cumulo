import Phaser from 'phaser';
import { frameName, walkAnimation, type Direction } from '../art/characters';

/** A character that walks in four directions with a feet-sized physics body. */
export class Walker extends Phaser.Physics.Arcade.Sprite {
  facing: Direction = 'down';

  constructor(scene: Phaser.Scene, x: number, y: number, readonly look: string) {
    super(scene, x, y, look, frameName('down', 0));
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 1);
    this.arcadeBody.setSize(8, 5).setOffset(4, 11).setCollideWorldBounds(true);
  }

  get arcadeBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  move(vx: number, vy: number) {
    this.arcadeBody.setVelocity(vx, vy);
    if (vx === 0 && vy === 0) {
      this.anims.stop();
      this.setFrame(frameName(this.facing, 0));
    } else {
      this.facing = Math.abs(vx) > Math.abs(vy) ? (vx < 0 ? 'left' : 'right') : vy < 0 ? 'up' : 'down';
      this.anims.play(walkAnimation(this.look, this.facing), true);
    }
    this.setFlipX(this.facing === 'right');
    this.setDepth(this.y);
  }

  face(x: number, y: number) {
    const dx = x - this.x;
    const dy = y - this.y;
    this.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : dy < 0 ? 'up' : 'down';
    this.move(0, 0);
  }
}
