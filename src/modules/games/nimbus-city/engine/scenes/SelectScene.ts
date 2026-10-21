import Phaser from 'phaser';
import { FONT, REGISTRY } from '../../config';
import { walkAnimation } from '../art/characters';
import { Button } from '../ui/Button';

const OPTIONS = [
  { key: 'player-man', label: 'Consultor' },
  { key: 'player-woman', label: 'Consultora' },
];

export class SelectScene extends Phaser.Scene {
  private selected = 0;
  private sprites: Phaser.GameObjects.Sprite[] = [];
  private labels: Phaser.GameObjects.Text[] = [];
  private frame!: Phaser.GameObjects.Rectangle;
  private title!: Phaser.GameObjects.Text;
  private subtitle!: Phaser.GameObjects.Text;
  private hint!: Phaser.GameObjects.Text;
  private accept!: Button;

  constructor() {
    super('select');
  }

  create() {
    this.cameras.main.setBackgroundColor('#1d2b53');
    this.title = this.add.text(0, 0, 'NIMBUS CITY', { fontFamily: FONT, fontSize: '32px', color: '#ffd166' }).setOrigin(0.5);
    this.subtitle = this.add
      .text(0, 0, 'Consultoría cloud · Nivel Practitioner', { fontFamily: FONT, fontSize: '12px', color: '#c7d2fe' })
      .setOrigin(0.5);
    this.hint = this.add
      .text(0, 0, 'Clic o ← → para elegir   ·   ENTER para aceptar', { fontFamily: FONT, fontSize: '8px', color: '#c7d2fe' })
      .setOrigin(0.5);
    this.accept = new Button(this, 0, 0, 'Aceptar', () => this.startGame(), 16);
    this.frame = this.add.rectangle(0, 0, 170, 200).setStrokeStyle(4, 0xffd166).setFillStyle(0xffffff, 0.06);

    OPTIONS.forEach((option, i) => {
      const sprite = this.add.sprite(0, 0, option.key).setScale(8).play(walkAnimation(option.key, 'down'));
      sprite.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.select(i));
      this.sprites.push(sprite);
      this.labels.push(this.add.text(0, 0, option.label, { fontFamily: FONT, fontSize: '12px', color: '#ffffff' }).setOrigin(0.5));
    });

    const keyboard = this.input.keyboard!;
    keyboard.on('keydown-LEFT', () => this.select(0));
    keyboard.on('keydown-A', () => this.select(0));
    keyboard.on('keydown-RIGHT', () => this.select(1));
    keyboard.on('keydown-D', () => this.select(1));
    keyboard.on('keydown-ENTER', () => this.startGame());
    keyboard.on('keydown-SPACE', () => this.startGame());

    this.layout();
    this.scale.on('resize', this.layout, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.layout, this));
  }

  private layout() {
    const { width, height } = this.scale;
    const cy = height / 2;
    this.title.setPosition(width / 2, cy - 170);
    this.subtitle.setPosition(width / 2, cy - 130);
    this.accept.setPosition(width / 2, cy + 165);
    this.hint.setPosition(width / 2, cy + 215);
    this.sprites.forEach((sprite, i) => {
      const x = width / 2 + (i === 0 ? -110 : 110);
      sprite.setPosition(x, cy);
      this.labels[i].setPosition(x, cy + 90);
    });
    this.select(this.selected);
  }

  private select(index: number) {
    this.selected = index;
    const sprite = this.sprites[index];
    this.frame.setPosition(sprite.x, sprite.y + 10);
    this.labels.forEach((label, i) => label.setColor(i === index ? '#ffd166' : '#ffffff'));
  }

  private startGame() {
    this.registry.set(REGISTRY.playerKey, OPTIONS[this.selected].key);
    this.scene.start('city');
  }
}
