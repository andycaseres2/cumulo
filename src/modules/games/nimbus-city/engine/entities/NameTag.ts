import Phaser from 'phaser';
import { FONT } from '../../config';
import type { Walker } from './Walker';

/** Name label with a pointer arrow that floats above a character, drawn above every world object. */
export class NameTag extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, name: string) {
    const label = scene.add
      .text(0, -1, name, {
        fontFamily: FONT,
        fontSize: '5px',
        color: '#1b1b2a',
        backgroundColor: '#ffd166',
        padding: { x: 2, y: 1.5 },
        resolution: 4,
      })
      .setOrigin(0.5, 1);
    label.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    const arrow = scene.add.triangle(0, 0, 0, 0, 5, 0, 2.5, 3, 0xffd166).setOrigin(0.5, 0);
    super(scene, 0, 0, [label, arrow]);
    scene.add.existing(this);
    this.setDepth(9_000);
  }

  follow(walker: Walker) {
    this.setPosition(Math.round(walker.x), Math.round(walker.y) - 18);
  }
}
