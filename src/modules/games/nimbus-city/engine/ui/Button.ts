import Phaser from 'phaser';
import { FONT } from '../../config';

const COLORS = { idle: 0xffd166, hover: 0xffe29a, pressed: 0xe6b84f, border: 0x1b1b2a };
const PADDING = { x: 14, y: 9 };

/** Clickable pixel-style button; the keyboard shortcut stays available alongside it. */
export class Button extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Rectangle;
  private label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick: () => void, fontSize = 12) {
    super(scene, x, y);
    this.label = scene.add.text(0, 0, text, { fontFamily: FONT, fontSize: `${fontSize}px`, color: '#1b1b2a' }).setOrigin(0.5);
    this.bg = scene.add.rectangle(0, 0, 10, 10, COLORS.idle).setStrokeStyle(3, COLORS.border);
    this.add([this.bg, this.label]);
    this.bg
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.bg.setFillStyle(COLORS.hover))
      .on('pointerout', () => this.bg.setFillStyle(COLORS.idle))
      .on('pointerdown', () => this.bg.setFillStyle(COLORS.pressed))
      .on('pointerup', () => {
        this.bg.setFillStyle(COLORS.hover);
        onClick();
      });
    this.fit();
    scene.add.existing(this);
  }

  get buttonWidth(): number {
    return this.bg.width;
  }

  get buttonHeight(): number {
    return this.bg.height;
  }

  setText(text: string): this {
    this.label.setText(text);
    this.fit();
    return this;
  }

  private fit() {
    const width = Math.ceil(this.label.width) + PADDING.x * 2;
    const height = Math.ceil(this.label.height) + PADDING.y * 2;
    this.bg.setSize(width, height);
    this.bg.input?.hitArea.setTo(0, 0, width, height);
    this.setSize(width, height);
  }
}
