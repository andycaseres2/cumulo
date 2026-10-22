import Phaser from 'phaser';
import { EVENTS, FONT, minimapRect } from '../../config';
import { cardKey, isIdle, nudgeDue } from '../../attention';
import type { MissionCardContent } from '../../missionCard';
import { MissionTracker } from '../systems/MissionTracker';
import { Button } from '../ui/Button';
import { choiceRows } from '../ui/choiceLayout';
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
  private zoomIn!: Button;
  private zoomOut!: Button;
  private mapToggle!: Button;
  private mapControls!: Phaser.GameObjects.Container;
  private mapHint!: Phaser.GameObjects.Text;
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
  /** Where the card rests; entrance and shake tweens move it around this point. */
  private cardHome = { x: 0, y: 0 };
  private cardShown = '';
  private cardTween?: Phaser.Tweens.Tween;
  private badge!: Phaser.GameObjects.Container;
  private badgePulse?: Phaser.Tweens.Tween;
  private activeSince: number | null = null;
  private lastNudgeAt: number | null = null;
  private missionPlaying = false;
  private lastInputAt = 0;
  private idleModal!: Phaser.GameObjects.Container;
  private idleShade!: Phaser.GameObjects.Rectangle;
  private idlePanel!: Phaser.GameObjects.Container;

  constructor() {
    super('hud');
  }

  create() {
    const headerBg = this.add.rectangle(0, 0, 330, 54, PANEL, 0.85).setOrigin(0).setStrokeStyle(2, 0xffd166);
    this.locationTitle = this.add.text(12, 10, '', { fontFamily: FONT, fontSize: '12px', color: '#ffd166' });
    this.locationSubtitle = this.add.text(12, 34, '', { fontFamily: FONT, fontSize: '8px', color: '#ffffff' });
    this.header = this.add.container(12, HEADER_TOP, [headerBg, this.locationTitle, this.locationSubtitle]);

    this.controls = this.add
      .text(0, 0, 'WASD/Flechas: caminar   Shift: correr   E o clic: interactuar   Rueda o +/-: zoom   M: mapa', {
        fontFamily: FONT,
        fontSize: '8px',
        color: '#ffffff',
        backgroundColor: '#1b1b2acc',
        padding: { x: 8, y: 6 },
      })
      .setOrigin(0, 1);

    this.minimapFrame = this.add.rectangle(0, 0, 10, 10).setOrigin(0).setStrokeStyle(3, 0xffd166);

    // Zoom and full-map controls of the city, bottom right; hidden inside buildings.
    this.zoomOut = new Button(this, 0, 0, '-', () => this.game.events.emit(EVENTS.zoomOut), 12);
    this.zoomIn = new Button(this, 0, 0, '+', () => this.game.events.emit(EVENTS.zoomIn), 12);
    this.mapToggle = new Button(this, 0, 0, 'Mapa', () => this.game.events.emit(EVENTS.toggleMap), 10);
    this.mapControls = this.add.container(0, 0, [this.zoomOut, this.zoomIn, this.mapToggle]);
    this.mapHint = this.add
      .text(0, 0, 'Vista del mapa: arrastra para recorrerlo · rueda o +/- para el zoom · M o Esc para volver', {
        fontFamily: FONT,
        fontSize: '8px',
        color: '#ffd166',
        backgroundColor: '#1b1b2add',
        padding: { x: 10, y: 8 },
      })
      .setOrigin(0.5, 0)
      .setVisible(false);
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
    this.badge = this.createBadge('¡Tienes una misión activa!');
    this.card.add(this.badge);

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

    ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'].forEach((key, i) =>
      this.input.keyboard!.on(`keydown-${key}`, () => {
        if (this.dialog.visible && !this.typing && this.choices[i]) this.choose(this.choices[i].id);
      }),
    );

    this.createIdleModal();
    this.watchInput();

    this.layout();
    this.scale.on('resize', this.layout, this);
    const handlers: [string, (...args: never[]) => void][] = [
      [EVENTS.prompt, this.showPrompt],
      [EVENTS.dialog, this.showDialog],
      [EVENTS.dialogAdvance, this.advanceDialog],
      [EVENTS.location, this.showLocation],
      [EVENTS.missionCard, this.showMissionCard],
      [EVENTS.mapMode, this.showMapMode],
      [EVENTS.missionPlaying, this.setMissionPlaying],
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
    this.checkAttention(time);
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

  /** Choice buttons replace "Aceptar" once the text is complete; they were placed when the dialog opened. */
  private showChoices() {
    this.dialogAccept.setVisible(this.choices.length === 0);
    for (const button of this.choiceButtons) button.setVisible(true);
  }

  /** One button per choice, hidden until the text is complete, so the box can be sized for them. */
  private buildChoices() {
    for (const button of this.choiceButtons) button.destroy();
    this.choiceButtons = this.choices.map((choice, i) => {
      const button = new Button(this, 0, 0, `${i + 1}. ${choice.label}`, () => this.choose(choice.id), 10).setVisible(false);
      this.dialog.add(button);
      return button;
    });
  }

  /**
   * Sizes the dialog for its whole text and its choices, and places everything inside it:
   * choices wrap into rows (right-aligned, in order) so none goes past the edges of the box.
   */
  private layoutDialogBox() {
    const { width, height } = this.scale;
    const boxWidth = Math.min(760, width - 24);
    this.dialogBox.setSize(boxWidth, this.dialogBox.height);
    this.layoutDialogText();

    // Measure the full text, not the part already typed.
    const shown = this.dialogText.text;
    const textHeight = this.dialogText.setText(this.fullText).height;
    this.dialogText.setText(shown);

    const left = this.dialogText.x;
    const gap = 10;
    const rows = choiceRows(this.choiceButtons.map((b) => b.buttonWidth), boxWidth - left - 14, gap);
    const rowHeight = (this.choiceButtons[0]?.buttonHeight ?? 0) + 8;
    const actionsHeight = rows.length > 0 ? rows.length * rowHeight - 8 : this.dialogAccept.buttonHeight;
    const boxHeight = Math.max(DIALOG_HEIGHT, this.dialogText.y + textHeight + 16 + actionsHeight + 12);

    this.dialogBox.setSize(boxWidth, boxHeight);
    this.dialog.setPosition((width - boxWidth) / 2, height - boxHeight - 12);
    this.dialogAccept.setPosition(boxWidth - this.dialogAccept.buttonWidth / 2 - 14, boxHeight - this.dialogAccept.buttonHeight / 2 - 12);
    rows.forEach((row, r) => {
      const centerY = boxHeight - 12 - (rows.length - 1 - r) * rowHeight - this.choiceButtons[row[0]].buttonHeight / 2;
      let right = boxWidth - 14;
      for (const i of [...row].reverse()) {
        const button = this.choiceButtons[i];
        button.setPosition(right - button.buttonWidth / 2, centerY);
        right -= button.buttonWidth + gap;
      }
    });
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

    this.layoutDialogBox();
    this.header.setVisible(width > 560);
    this.cardHome = { x: width - CARD_WIDTH - 12, y: map.y + map.height + 12 };
    if (!this.cardTween?.isPlaying()) this.card.setPosition(this.cardHome.x, this.cardHome.y);
    this.idleShade.setSize(width, height);
    this.idlePanel.setPosition(width / 2, height / 2);

    const gap = 8;
    const bottom = height - 12;
    let right = width - 12;
    for (const button of [this.mapToggle, this.zoomIn, this.zoomOut]) {
      button.setPosition(right - button.buttonWidth / 2, bottom - button.buttonHeight / 2);
      right -= button.buttonWidth + gap;
    }
    this.mapHint.setPosition(width / 2, 12).setWordWrapWidth(width - 24);
    // The controls hint wraps before reaching the zoom buttons on narrow screens.
    this.controls.setWordWrapWidth(Math.max(160, right - 12 - gap));
  }

  /** In the full-map view the minimap is redundant and the toggle takes the player back. */
  private showMapMode(on: boolean) {
    this.mapHint.setVisible(on);
    this.minimapFrame.setVisible(!on && this.mapControls.visible);
    this.mapToggle.setText(on ? 'Volver' : 'Mapa');
    this.layout();
  }

  /** The current mission, under the minimap: offer with an accept button, objective, or all done. */
  private showMissionCard(content: MissionCardContent) {
    // Mixed case on purpose: the pixel font draws accented capitals (Ó, Ú) without room for the accent.
    this.cardHeading.setText(content.heading);
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

    const key = cardKey(content);
    if (key === this.cardShown) return;
    this.cardShown = key;
    this.activeSince = content.kind === 'active' ? this.time.now : null;
    this.lastNudgeAt = null;
    this.hideBadge();
    this.playCardEntrance(content.kind === 'offer');
  }

  /** The card slides in from the right edge; a new offer also blinks its heading to catch the eye. */
  private playCardEntrance(announce: boolean) {
    this.cardTween?.stop();
    this.card.setPosition(this.scale.width + 12, this.cardHome.y).setAlpha(0);
    this.cardTween = this.tweens.add({
      targets: this.card,
      x: this.cardHome.x,
      alpha: 1,
      duration: 420,
      ease: 'Back.easeOut',
      onComplete: () => {
        if (!announce) return;
        this.tweens.add({ targets: this.cardHeading, alpha: 0.2, duration: 220, yoyo: true, repeat: 2 });
      },
    });
  }

  /** Reminder for an accepted mission nobody started: the card shakes and the badge pops up and keeps pulsing. */
  private nudgeMission() {
    if (this.cardTween?.isPlaying()) return;
    this.card.setPosition(this.cardHome.x, this.cardHome.y);
    this.cardTween = this.tweens.add({
      targets: this.card,
      x: this.cardHome.x - 6,
      duration: 55,
      yoyo: true,
      repeat: 3,
      ease: 'Sine.easeInOut',
      onComplete: () => this.card.setX(this.cardHome.x),
    });
    if (this.badge.visible) return;
    this.badge.setVisible(true).setScale(0);
    this.tweens.add({
      targets: this.badge,
      scale: 1,
      duration: 260,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.badgePulse = this.tweens.add({ targets: this.badge, scale: 1.08, duration: 520, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      },
    });
  }

  private hideBadge() {
    this.badgePulse?.stop();
    this.badgePulse = undefined;
    this.tweens.killTweensOf(this.badge);
    this.badge.setVisible(false).setScale(1);
  }

  private createBadge(text: string): Phaser.GameObjects.Container {
    const label = this.add.text(0, 0, text, { fontFamily: FONT, fontSize: '8px', color: '#1b1b2a' }).setOrigin(0.5);
    const width = Math.ceil(label.width) + 16;
    const bg = this.add.rectangle(0, 0, width, Math.ceil(label.height) + 10, 0xff6b6b).setStrokeStyle(2, 0x1b1b2a);
    // Hangs from the top-right corner of the card, like a tag.
    return this.add.container(CARD_WIDTH - width / 2 - 8, -2, [bg, label]).setVisible(false);
  }

  /** Full-screen shade with a centered panel; any key or click closes it. */
  private createIdleModal() {
    this.idleShade = this.add.rectangle(0, 0, 10, 10, 0x000000, 0.55).setOrigin(0).setInteractive();
    const panelWidth = 360;
    const title = this.add.text(0, -44, '¿Sigues ahí?', { fontFamily: FONT, fontSize: '14px', color: '#ffd166' }).setOrigin(0.5);
    const text = this.add
      .text(0, -6, 'Notamos que llevas un rato sin moverte. Tu avance está guardado.', {
        fontFamily: FONT,
        fontSize: '8px',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 6,
        wordWrap: { width: panelWidth - 40 },
      })
      .setOrigin(0.5);
    const back = new Button(this, 0, 42, 'Sigo aquí', () => this.closeIdleModal(), 10);
    const bg = this.add.rectangle(0, 0, panelWidth, 150, PANEL, 0.97).setStrokeStyle(3, 0xffd166);
    this.idlePanel = this.add.container(0, 0, [bg, title, text, back]);
    this.idleModal = this.add.container(0, 0, [this.idleShade, this.idlePanel]).setDepth(10).setVisible(false);
  }

  private openIdleModal() {
    this.idleModal.setVisible(true).setAlpha(0);
    this.idlePanel.setScale(0.85);
    this.tweens.add({ targets: this.idleModal, alpha: 1, duration: 200 });
    this.tweens.add({ targets: this.idlePanel, scale: 1, duration: 320, ease: 'Back.easeOut' });
  }

  private closeIdleModal() {
    if (!this.idleModal.visible) return;
    this.tweens.add({
      targets: this.idleModal,
      alpha: 0,
      duration: 160,
      onComplete: () => this.idleModal.setVisible(false),
    });
  }

  /** Keys, clicks and the wheel anywhere on the page count as activity, and close the idle question. */
  private watchInput() {
    this.lastInputAt = this.time.now;
    const onInput = () => {
      this.lastInputAt = this.time.now;
      this.closeIdleModal();
    };
    const events = ['keydown', 'pointerdown', 'wheel'] as const;
    for (const event of events) window.addEventListener(event, onInput, { passive: true });
    this.events.once('shutdown', () => {
      for (const event of events) window.removeEventListener(event, onInput);
    });
  }

  private setMissionPlaying(playing: boolean) {
    this.missionPlaying = playing;
    this.lastInputAt = this.time.now;
    // Restart the reminder clock after a try: failing a mission is not ignoring it.
    if (this.activeSince !== null) this.activeSince = this.time.now;
    this.lastNudgeAt = null;
    this.hideBadge();
  }

  /** Reminders wait while a mission panel or a dialog is open: the player is busy, not away. */
  private checkAttention(now: number) {
    if (this.missionPlaying || this.dialog.visible) {
      this.lastInputAt = Math.max(this.lastInputAt, now - 1);
      return;
    }
    if (!this.idleModal.visible && isIdle(this.lastInputAt, now)) this.openIdleModal();
    if (this.idleModal.visible) return;
    if (nudgeDue(this.activeSince, this.lastNudgeAt, now)) {
      this.lastNudgeAt = now;
      this.nudgeMission();
    }
  }

  private layoutDialogText() {
    const left = this.portrait.visible ? 16 + PORTRAIT_SIZE + 16 : 18;
    const boxWidth = this.dialogBox.width;
    this.dialogTitle.setX(left);
    this.dialogText.setX(left).setWordWrapWidth(boxWidth - left - 18);
  }

  private showLocation(location: LocationInfo) {
    this.locationTitle.setText(location.title);
    this.locationSubtitle.setText(location.subtitle);
    this.minimapFrame.setVisible(location.minimap);
    this.mapControls?.setVisible(location.minimap);
  }

  private showPrompt(text: string | null) {
    if (text !== null) this.prompt.setText(text);
    this.prompt.setVisible(text !== null && !this.dialog.visible);
  }

  private showDialog(content: DialogContent | null) {
    this.dialog.setVisible(content !== null);
    this.controls.setVisible(content === null);
    this.choices = content?.choices ?? [];
    this.buildChoices();
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
    this.layoutDialogBox();
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
