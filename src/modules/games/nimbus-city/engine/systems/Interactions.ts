import Phaser from 'phaser';
import { EVENTS, INTERACT_RANGE } from '../../config';
import type { Walker } from '../entities/Walker';
import type { DialogContent } from '../ui/dialog';

/** Something the player can use when standing close to it: a person, a door, an object. */
export interface Interactable {
  readonly x: number;
  readonly y: number;
  prompt: string;
  /** Returns the dialog to show, or null when the interaction is an action (e.g. walking through a door). */
  open: () => DialogContent | null;
  close?: () => void;
}

/** Finds the nearest interactable, shows its prompt and drives the dialog lifecycle through the HUD. */
export class Interactions {
  private items: Interactable[] = [];
  private active: Interactable | null = null;
  private lastPrompt: string | null = null;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly player: Walker,
  ) {
    const close = () => this.close();
    scene.game.events.on(EVENTS.dialogClose, close);
    scene.events.once('shutdown', () => scene.game.events.off(EVENTS.dialogClose, close));
  }

  add(item: Interactable) {
    this.items.push(item);
  }

  /** True while a dialog from this scene is open; the player should not move. */
  get busy(): boolean {
    return this.active !== null;
  }

  update(interactPressed: boolean) {
    if (this.active) {
      if (interactPressed) this.scene.game.events.emit(EVENTS.dialogAdvance);
      return;
    }
    const target = this.nearest();
    this.setPrompt(target?.prompt ?? null);
    if (!target || !interactPressed) return;
    const content = target.open();
    this.setPrompt(null);
    if (!content) return;
    this.active = target;
    this.scene.game.events.emit(EVENTS.dialog, content);
  }

  clearPrompt() {
    this.setPrompt(null);
  }

  private close() {
    if (!this.active) return;
    this.active.close?.();
    this.active = null;
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
