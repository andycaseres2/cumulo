import Phaser from 'phaser';
import { createCharacters } from '../art/characters';
import { SHEET, SHEET_URL } from '../art/kenney';
import { REGISTRY } from '../../config';

/** Loads the Kenney sheet, builds character textures and animations, then opens character selection. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.spritesheet(SHEET, SHEET_URL, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    createCharacters(this);

    // Dev shortcut: ?play=man or ?play=woman skips character selection.
    const quickStart = new URLSearchParams(window.location.search).get('play');
    if (quickStart === 'man' || quickStart === 'woman') {
      this.registry.set(REGISTRY.playerKey, `player-${quickStart}`);
      this.scene.start('city');
      return;
    }
    this.scene.start('select');
  }
}
