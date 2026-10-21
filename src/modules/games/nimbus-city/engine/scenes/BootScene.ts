import Phaser from 'phaser';
import { createCharacter, PLAYER_LOOKS, randomLook } from '../art/characters';
import { seededRandom } from '../art/canvas';
import { generateProps } from '../art/props';
import { generateTileset } from '../art/tiles';
import { NPC_COUNT, REGISTRY } from '../../config';
import { BUILDINGS } from '../../world/cityMap';

/** Generates every texture and animation in code, then opens character selection. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  create() {
    generateTileset(this);
    generateProps(this, BUILDINGS);
    for (const [key, look] of Object.entries(PLAYER_LOOKS)) createCharacter(this, key, look);
    const rng = seededRandom(42);
    for (let i = 0; i < NPC_COUNT; i++) createCharacter(this, `npc-${i}`, randomLook(rng));

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
