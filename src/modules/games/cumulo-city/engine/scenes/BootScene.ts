import Phaser from 'phaser';
import { createCharacters } from '../art/characters';
import { SHEET, SHEET_URL } from '../art/kenney';
import { createMarkers } from '../art/markers';
import { createOfficeProps } from '../art/officeProps';
import { REGISTRY } from '../../config';
import { startScene, type PlayableCharacter } from '../../startScene';

/** Loads the Kenney sheet, builds textures and animations, then opens the selection or the city. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.spritesheet(SHEET, SHEET_URL, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    createCharacters(this);
    createOfficeProps(this);
    createMarkers(this);

    // Dev shortcut: ?play=man or ?play=woman skips character selection.
    const quickStart = new URLSearchParams(window.location.search).get('play');
    const next = startScene(this.registry.get(REGISTRY.character) as PlayableCharacter | null, quickStart);
    if (next.scene === 'city') this.registry.set(REGISTRY.playerKey, next.playerKey);
    this.scene.start(next.scene);
  }
}
