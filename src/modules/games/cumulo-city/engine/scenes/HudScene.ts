import Phaser from 'phaser';
import { EVENTS, FONT, minimapRect } from '../../config';
import type { MissionCardContent } from '../../missionCard';
import { MissionTracker } from '../systems/MissionTracker';
import { Button } from '../ui/Button';
import type { DialogChoice, DialogContent, LocationInfo } from '../ui/dialog';
import { revealedText } from '../ui/typewriter';

const PANEL = 0x1b1b2a;
const DIALOG_HEIGHT = 140;
const CARD_WIDTH = 260;
/** Leaves room for the page's "Salir" button in the top-left corner. */
const HEADER_TOP = 58;
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
  private choices: DialogChoice[] = [];
  private choiceButtons: Button[] = [];
  private card!: Phaser.GameObjects.Container;
  private cardBg!: Phaser.GameObjects.Rectangle;
  private cardHeading!: Phaser.GameObjects.Text;
  private cardTitle!: Phaser.GameObjects.Text;
  private cardDetail!: Phaser.GameObjects.Text;
  private cardAction!: Button;

  constructor() {
    super('hud');
  }

  create() {
    const headerBg = this.add.rectangle(0, 0, 330, 54, PANEL, 0.85).setOrigin(0).setStrokeStyle(2, 0xffd166);
    this.locationTitle = this.add.text(12, 10, '', { fontFamily: FONT, fontSize: '12px', color: '#ffd166' });
    this.locationSubtitle = this.add.text(12, 34, '', { fontFamily: FONT, fontSize: '8px', color: '#ffffff' });
    this.header = this.add.container(12, HEADER_TOP, [headerBg, this.locationTitle, this.locationSubtitle]);

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
    this.showLocation({ title: 'Cúmulo City', subtitle: 'Distrito Centro', minimap: true });
    this.prompt = new Button(this, 0, 0, '', () => this.game.events.emit(EVENTS.interact)).setVisible(false);

    this.cardBg = this.add.rectangle(0, 0, CARD_WIDTH, 10, PANEL, 0.92).setOrigin(0).setStrokeStyle(2, 0xffd166);
    const wrap = { width: CARD_WIDTH - 24 };
    this.cardHeading = this.add.text(12, 10, '', { fontFamily: FONT, fontSize: '8px', color: '#ffd166' });
    this.cardTitle = this.add.text(12, 26, '', { fontFamily: FONT, fontSize: '10px', color: '#ffffff', wordWrap: wrap, lineSpacing: 4 });
    this.cardDetail = this.add.text(12, 0, '', { fontFamily: FONT, fontSize: '8px', color: '#c7d2fe', wordWrap: wrap, lineSpacing: 5 });
    this.cardAction = new Button(this, 0, 0, 'Aceptar misión', () => this.game.events.emit(EVENTS.missionAccept), 10);
    this.card = this.add
      .container(0, 0, [this.cardBg, this.cardHeading, this.cardTitle, this.cardDetail, this.cardAction])
      .setVisible(false);

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

    ['ONE', 'TWO', 'THREE'].forEach((key, i) =>
      this.input.keyboard!.on(`keydown-${key}`, () => {
        if (this.dialog.visible && !this.typing && this.choices[i]) this.choose(this.choices[i].id);
      }),
    );

    this.layout();
    this.scale.on('resize', this.layout, this);
    const handlers: [string, (...args: never[]) => void][] = [
      [EVENTS.prompt, this.showPrompt],
      [EVENTS.dialog, this.showDialog],
      [EVENTS.dialogAdvance, this.advanceDialog],
      [EVENTS.location, this.showLocation],
      [EVENTS.missionCard, this.showMissionCard],
    ];
    for (const [event, handler] of handlers) this.game.events.on(event, handler, this);
    // The HUD starts a frame after the city: ask for the current mission instead of waiting for the next change.
    void MissionTracker.of(this).refresh();
    this.events.once('shutdown', () => {
      this.scale.off('resize', this.layout, this);
      for (const [event, handler] of handlers) this.game.events.off(event, handler, this);
    });
  }

  update(time: number) {
    if (!this.typing) return;
    const shown = revealedText(this.fullText, time - this.typingStartedAt, CHARS_PER_SECOND);
    this.dialogText.setText(shown);
    if (shown.length >= this.fullText.length) this.finishTyping();
  }

  private finishTyping() {
    this.typing = false;
    this.dialogText.setText(this.fullText);
    this.showChoices();
  }

  /** Choice buttons replace "Aceptar", right-aligned at the bottom of the box, once the text is complete. */
  private showChoices() {
    for (const button of this.choiceButtons) button.destroy();
    this.choiceButtons = [];
    this.dialogAccept.setVisible(this.choices.length === 0);
    let right = this.dialogBox.width - 14;
    for (const [i, choice] of [...this.choices.entries()].reverse()) {
      const button = new Button(this, 0, 0, `${i + 1}. ${choice.label}`, () => this.choose(choice.id), 10);
      button.setPosition(right - button.buttonWidth / 2, DIALOG_HEIGHT - button.buttonHeight / 2 - 12);
      right -= button.buttonWidth + 10;
      this.dialog.add(button);
      this.choiceButtons.push(button);
    }
  }

  private choose(choiceId: string) {
    this.game.events.emit(EVENTS.dialogChoice, choiceId);
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
    this.card.setPosition(width - CARD_WIDTH - 12, map.y + map.height + 12);
  }

  /** The current mission, under the minimap: offer with an accept button, objective, or all done. */
  private showMissionCard(content: MissionCardContent) {
    this.cardHeading.setText(content.heading.toUpperCase());
    this.cardTitle.setText(content.title);
    this.cardDetail.setText(content.detail).setY(this.cardTitle.y + this.cardTitle.height + 8);
    let bottom = this.cardDetail.y + this.cardDetail.height;
    this.cardAction.setVisible(content.action !== null);
    if (content.action) {
      this.cardAction.setText(content.action);
      this.cardAction.setPosition(12 + this.cardAction.buttonWidth / 2, bottom + 10 + this.cardAction.buttonHeight / 2);
      bottom += 10 + this.cardAction.buttonHeight;
    }
    this.cardBg.setSize(CARD_WIDTH, bottom + 12);
    this.card.setVisible(true);
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
    this.choices = content?.choices ?? [];
    for (const button of this.choiceButtons) button.destroy();
    this.choiceButtons = [];
    this.dialogAccept.setVisible(this.choices.length === 0);
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

  /** First press reveals the whole text; the next one closes the page, unless the player must pick a choice. */
  private advanceDialog() {
    if (this.typing) {
      this.finishTyping();
      return;
    }
    if (this.choices.length === 0) this.game.events.emit(EVENTS.dialogClose);
  }
}
