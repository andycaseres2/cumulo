import Phaser from 'phaser';
import { EVENTS, FONT, minimapRect } from '../../config';
import { Button } from '../ui/Button';
import type { DialogContent, LocationInfo } from '../ui/dialog';
import { revealedText } from '../ui/typewriter';

const PANEL = 0x1b1b2a;
const DIALOG_HEIGHT = 140;
const PORTRAIT_SIZE = 72;
const CHARS_PER_SECOND = 45;

/** Screen-space overlay: location, controls, interaction button, minimap frame and dialog box. */
export class HudScene extends Phaser.Scene {
  private header!: Phaser.GameObjects.Container;
  private locationTitle!: Phaser.GameObjects.Text;
  private locationSubtitle!: Phaser.GameObjects.Text;
  private controls!: Phaser.GameObjects.Text;
  private minimapFrame!: Phaser.GameObjects.Rectangle;
  private prompt!: Button;
  private dialog!: Phaser.GameObjects.Container;
  private dialogBox!: Phaser.GameObjects.Rectangle;
  private portraitFrame!: Phaser.GameObjects.Rectangle;
  private portrait!: Phaser.GameObjects.Image;
  private dialogTitle!: Phaser.GameObjects.Text;
  private dialogText!: Phaser.GameObjects.Text;
  private dialogAccept!: Button;
  private fullText = '';
  private typingStartedAt = 0;
  private typing = false;

  constructor() {
    super('hud');
  }

  create() {
    const headerBg = this.add.rectangle(0, 0, 330, 54, PANEL, 0.85).setOrigin(0).setStrokeStyle(2, 0xffd166);
    this.locationTitle = this.add.text(12, 10, '', { fontFamily: FONT, fontSize: '12px', color: '#ffd166' });
    this.locationSubtitle = this.add.text(12, 34, '', { fontFamily: FONT, fontSize: '8px', color: '#ffffff' });
    this.header = this.add.container(12, 12, [headerBg, this.locationTitle, this.locationSubtitle]);

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
    this.showLocation({ title: 'Nimbus City', subtitle: 'Objetivo: explora la ciudad', minimap: true });
    this.prompt = new Button(this, 0, 0, '', () => this.game.events.emit(EVENTS.interact)).setVisible(false);

    this.dialogBox = this.add.rectangle(0, 0, 10, DIALOG_HEIGHT, PANEL, 0.95).setOrigin(0).setStrokeStyle(3, 0xffd166);
    this.portraitFrame = this.add
      .rectangle(16, 16, PORTRAIT_SIZE, PORTRAIT_SIZE, 0x2d3b6b)
      .setOrigin(0)
      .setStrokeStyle(2, 0xffd166);
    this.portrait = this.add.image(16 + PORTRAIT_SIZE / 2, 16 + PORTRAIT_SIZE / 2, '__DEFAULT').setScale(4);
    this.dialogTitle = this.add.text(18, 14, '', { fontFamily: FONT, fontSize: '12px', color: '#ffd166' });
    this.dialogText = this.add.text(18, 40, '', { fontFamily: FONT, fontSize: '10px', color: '#ffffff', lineSpacing: 8 });
    this.dialogAccept = new Button(this, 0, 0, 'Aceptar', () => this.game.events.emit(EVENTS.dialogAdvance), 10);
    this.dialog = this.add
      .container(0, 0, [this.dialogBox, this.portraitFrame, this.portrait, this.dialogTitle, this.dialogText, this.dialogAccept])
      .setVisible(false);

    this.layout();
    this.scale.on('resize', this.layout, this);
    const handlers: [string, (...args: never[]) => void][] = [
      [EVENTS.prompt, this.showPrompt],
      [EVENTS.dialog, this.showDialog],
      [EVENTS.dialogAdvance, this.advanceDialog],
      [EVENTS.location, this.showLocation],
    ];
    for (const [event, handler] of handlers) this.game.events.on(event, handler, this);
    this.events.once('shutdown', () => {
      this.scale.off('resize', this.layout, this);
      for (const [event, handler] of handlers) this.game.events.off(event, handler, this);
    });
  }

  update(time: number) {
    if (!this.typing) return;
    const shown = revealedText(this.fullText, time - this.typingStartedAt, CHARS_PER_SECOND);
    this.dialogText.setText(shown);
    if (shown.length >= this.fullText.length) this.typing = false;
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
    this.dialogAccept.setPosition(
      boxWidth - this.dialogAccept.buttonWidth / 2 - 14,
      DIALOG_HEIGHT - this.dialogAccept.buttonHeight / 2 - 12,
    );
    this.layoutDialogText();
    this.header.setVisible(width > 560);
  }

  private layoutDialogText() {
    const left = this.portrait.visible ? 16 + PORTRAIT_SIZE + 16 : 18;
    const boxWidth = this.dialogBox.width;
    this.dialogTitle.setX(left);
    this.dialogText.setX(left).setWordWrapWidth(boxWidth - left - 18);
  }

  private showLocation(location: LocationInfo) {
    this.locationTitle.setText(location.title.toUpperCase());
    this.locationSubtitle.setText(location.subtitle);
    this.minimapFrame.setVisible(location.minimap);
  }

  private showPrompt(text: string | null) {
    if (text !== null) this.prompt.setText(text);
    this.prompt.setVisible(text !== null && !this.dialog.visible);
  }

  private showDialog(content: DialogContent | null) {
    this.dialog.setVisible(content !== null);
    this.controls.setVisible(content === null);
    if (!content) {
      this.typing = false;
      return;
    }
    this.prompt.setVisible(false);
    this.portrait.setVisible(content.portrait !== undefined);
    this.portraitFrame.setVisible(content.portrait !== undefined);
    if (content.portrait) this.portrait.setTexture(content.portrait.key, content.portrait.frame);
    this.layoutDialogText();
    this.dialogTitle.setText(content.title);
    this.fullText = content.text;
    this.dialogText.setText('');
    this.typingStartedAt = this.time.now;
    this.typing = true;
  }

  /** First press reveals the whole text; the next one closes the dialog. */
  private advanceDialog() {
    if (this.typing) {
      this.typing = false;
      this.dialogText.setText(this.fullText);
      return;
    }
    this.game.events.emit(EVENTS.dialogClose);
  }
}
