import Phaser from 'phaser';
import { EVENTS, FONT, minimapRect } from '../config';
import { Button } from '../ui/Button';
import type { DialogContent } from './CityScene';

const PANEL = 0x1b1b2a;
const DIALOG_HEIGHT = 140;

/** Screen-space overlay: location, controls, interaction button and dialog box. */
export class HudScene extends Phaser.Scene {
  private header!: Phaser.GameObjects.Container;
  private controls!: Phaser.GameObjects.Text;
  private minimapFrame!: Phaser.GameObjects.Rectangle;
  private prompt!: Button;
  private dialog!: Phaser.GameObjects.Container;
  private dialogBox!: Phaser.GameObjects.Rectangle;
  private dialogTitle!: Phaser.GameObjects.Text;
  private dialogText!: Phaser.GameObjects.Text;
  private dialogAccept!: Button;

  constructor() {
    super('hud');
  }

  create() {
    const headerBg = this.add.rectangle(0, 0, 330, 54, PANEL, 0.85).setOrigin(0).setStrokeStyle(2, 0xffd166);
    const title = this.add.text(12, 10, 'NIMBUS CITY', { fontFamily: FONT, fontSize: '16px', color: '#ffd166' });
    const objective = this.add.text(12, 34, 'Objetivo: explora la ciudad', { fontFamily: FONT, fontSize: '8px', color: '#ffffff' });
    this.header = this.add.container(12, 12, [headerBg, title, objective]);

    this.controls = this.add
      .text(0, 0, 'WASD/Flechas: caminar   Shift: correr   E o clic: interactuar', {
        fontFamily: FONT,
        fontSize: '8px',
        color: '#ffffff',
        backgroundColor: '#1b1b2acc',
        padding: { x: 8, y: 6 },
      })
      .setOrigin(0, 1);

    this.minimapFrame = this.add.rectangle(0, 0, 10, 10).setOrigin(0).setStrokeStyle(3, 0xffd166);

    this.prompt = new Button(this, 0, 0, '', () => this.game.events.emit(EVENTS.interact)).setVisible(false);

    this.dialogBox = this.add.rectangle(0, 0, 10, DIALOG_HEIGHT, PANEL, 0.95).setOrigin(0).setStrokeStyle(3, 0xffd166);
    this.dialogTitle = this.add.text(18, 14, '', { fontFamily: FONT, fontSize: '12px', color: '#ffd166' });
    this.dialogText = this.add.text(18, 40, '', { fontFamily: FONT, fontSize: '10px', color: '#ffffff', lineSpacing: 8 });
    this.dialogAccept = new Button(this, 0, 0, 'Aceptar', () => this.game.events.emit(EVENTS.dialogClose), 10);
    this.dialog = this.add
      .container(0, 0, [this.dialogBox, this.dialogTitle, this.dialogText, this.dialogAccept])
      .setVisible(false);

    this.layout();
    this.scale.on('resize', this.layout, this);
    this.game.events.on(EVENTS.prompt, this.showPrompt, this);
    this.game.events.on(EVENTS.dialog, this.showDialog, this);
    this.events.once('shutdown', () => {
      this.scale.off('resize', this.layout, this);
      this.game.events.off(EVENTS.prompt, this.showPrompt, this);
      this.game.events.off(EVENTS.dialog, this.showDialog, this);
    });
  }

  private layout() {
    const { width, height } = this.scale;
    const map = minimapRect(width);
    this.minimapFrame.setPosition(map.x, map.y).setSize(map.width, map.height);
    this.controls.setPosition(12, height - 12);
    this.prompt.setPosition(width / 2, height - 60);

    const boxWidth = Math.min(760, width - 24);
    this.dialog.setPosition((width - boxWidth) / 2, height - DIALOG_HEIGHT - 12);
    this.dialogBox.setSize(boxWidth, DIALOG_HEIGHT);
    this.dialogText.setWordWrapWidth(boxWidth - 36);
    this.dialogAccept.setPosition(
      boxWidth - this.dialogAccept.buttonWidth / 2 - 14,
      DIALOG_HEIGHT - this.dialogAccept.buttonHeight / 2 - 12,
    );
    this.header.setVisible(width > 560);
  }

  private showPrompt(text: string | null) {
    if (text !== null) this.prompt.setText(text);
    this.prompt.setVisible(text !== null && !this.dialog.visible);
  }

  private showDialog(content: DialogContent | null) {
    this.dialog.setVisible(content !== null);
    this.controls.setVisible(content === null);
    if (content) {
      this.dialogTitle.setText(content.title);
      this.dialogText.setText(content.text);
      this.prompt.setVisible(false);
    }
  }
}
