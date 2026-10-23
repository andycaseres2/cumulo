import Phaser from 'phaser';
import { FONT } from '../../config';
import type { Walker } from './Walker';

/** Pixels between the character's feet and the top of its name label. */
const GAP_BELOW_FEET = 2;

/**
 * Small name label under a character's feet, with a notch pointing up at them, drawn above every world object.
 * Below the feet it never covers the character's head or the guide arrow that circles them.
 */
export class NameTag extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, name: string) {
    const notch = scene.add.triangle(0, 0, 0, 2.5, 4, 2.5, 2, 0, 0xffd166).setOrigin(0.5, 0);
    const label = scene.add
      .text(0, 2.5, name, {
        fontFamily: FONT,
        fontSize: '4px',
        color: '#1b1b2a',
        backgroundColor: '#ffd166',
        padding: { x: 1.5, y: 1 },
        resolution: 4,
      })
      .setOrigin(0.5, 0);
    label.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    super(scene, 0, 0, [notch, label]);
    scene.add.existing(this);
    this.setDepth(9_000);
  }

  follow(walker: Walker) {
    this.setPosition(Math.round(walker.x), Math.round(walker.y) + GAP_BELOW_FEET);
  }
}
