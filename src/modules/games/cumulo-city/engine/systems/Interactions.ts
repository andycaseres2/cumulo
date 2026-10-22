import Phaser from 'phaser';
import { EVENTS, INTERACT_RANGE } from '../../config';
import type { Walker } from '../entities/Walker';
import { ConversationCursor, toConversation, type Conversation } from '../ui/conversation';
import type { DialogContent } from '../ui/dialog';

/** Something the player can use when standing close to it: a person, a door, an object. */
export interface Interactable {
  readonly x: number;
  readonly y: number;
  prompt: string;
  /** Returns what to say, or null when the interaction is an action (e.g. walking through a door). */
  open: () => DialogContent | Conversation | null;
  close?: () => void;
}

/** Finds the nearest interactable, shows its prompt and drives conversations through the HUD. */
export class Interactions {
  private items: Interactable[] = [];
  private cursor: ConversationCursor | null = null;
  private owner: Interactable | null = null;
  private lastPrompt: string | null = null;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly player: Walker,
  ) {
    const pageDone = () => this.onPageDone();
    const choice = (id: string) => this.onChoice(id);
    scene.game.events.on(EVENTS.dialogClose, pageDone);
    scene.game.events.on(EVENTS.dialogChoice, choice);
    scene.events.once('shutdown', () => {
      scene.game.events.off(EVENTS.dialogClose, pageDone);
      scene.game.events.off(EVENTS.dialogChoice, choice);
    });
  }

  add(item: Interactable) {
    this.items.push(item);
  }

  /** True while a conversation from this scene is open; the player should not move. */
  get busy(): boolean {
    return this.cursor !== null;
  }

  update(interactPressed: boolean) {
    if (this.cursor) {
      if (interactPressed) this.scene.game.events.emit(EVENTS.dialogAdvance);
      return;
    }
    const target = this.nearest();
    this.setPrompt(target?.prompt ?? null);
    if (!target || !interactPressed) return;
    const content = target.open();
    this.setPrompt(null);
    if (content) this.start(toConversation(content), target);
  }

  /** Opens a conversation that did not come from walking up to something (e.g. after a mission). */
  start(conversation: Conversation, owner: Interactable | null = null) {
    this.cursor = new ConversationCursor(conversation);
    this.owner = owner;
    this.setPrompt(null);
    this.scene.game.events.emit(EVENTS.dialog, this.cursor.current());
  }

  clearPrompt() {
    this.setPrompt(null);
  }

  private onPageDone() {
    if (!this.cursor) return;
    const step = this.cursor.advance();
    if (step === 'next') this.scene.game.events.emit(EVENTS.dialog, this.cursor.current());
    if (step !== 'end') return;
    const { onEnd } = this.cursor.conversation;
    this.finish();
    onEnd?.();
  }

  private onChoice(choiceId: string) {
    if (!this.cursor?.choose(choiceId)) return;
    const { onChoice } = this.cursor.conversation;
    this.finish();
    onChoice?.(choiceId);
  }

  private finish() {
    this.owner?.close?.();
    this.cursor = null;
    this.owner = null;
    this.scene.game.events.emit(EVENTS.dialog, null);
  }

  private nearest(): Interactable | null {
    let best: Interactable | null = null;
    let bestDistance = INTERACT_RANGE;
    for (const item of this.items) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y);
      if (distance < bestDistance) {
        best = item;
        bestDistance = distance;
      }
    }
    return best;
  }

  private setPrompt(text: string | null) {
    if (text === this.lastPrompt) return;
    this.lastPrompt = text;
    this.scene.game.events.emit(EVENTS.prompt, text);
  }
}
