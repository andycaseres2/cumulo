import Phaser from 'phaser';
import { createCanvas, shiftHue } from './canvas';
import { SHEET } from './kenney';

export const FRAME = 16;
export const DIRECTIONS = ['down', 'left', 'right', 'up'] as const;
export type Direction = (typeof DIRECTIONS)[number];

/** Each Kenney character is 4 columns (side, down, up, side) x 3 rows (stand, step, step) at sheet column 23. */
const SOURCE_COLUMN = 23;
const COLUMN: Record<Exclude<Direction, 'right'>, number> = { left: 0, down: 1, up: 2 };

interface Look {
  /** Character index in the sheet, 0–5. */
  base: number;
  /** Recolors the green shirt of base 0 to another hue. */
  shirtHue?: number;
}

export const PLAYER_LOOKS: Record<'player-man' | 'player-woman', Look> = {
  'player-man': { base: 0 },
  'player-woman': { base: 1 },
};

const NPC_LOOKS: Look[] = [{ base: 2 }, { base: 3 }, { base: 4 }, { base: 5 }, { base: 0, shirtHue: 215 }, { base: 0, shirtHue: 285 }];

export function npcLookKey(index: number): string {
  return `npc-${index % NPC_LOOKS.length}`;
}

/** Right-facing frames are the left-facing ones mirrored by the sprite. */
export function frameName(dir: Direction, step: number): string {
  return String(step * 4 + COLUMN[dir === 'right' ? 'left' : dir]);
}

export function walkAnimation(key: string, dir: Direction): string {
  return `${key}-walk-${dir === 'right' ? 'left' : dir}`;
}

function createCharacter(scene: Phaser.Scene, key: string, look: Look) {
  const source = scene.textures.get(SHEET).getSourceImage() as HTMLImageElement;
  const canvas = createCanvas(FRAME * 4, FRAME * 3);
  // Context attributes are fixed by the first getContext call; recoloring reads pixels back.
  canvas
    .getContext('2d', { willReadFrequently: true })!
    .drawImage(source, SOURCE_COLUMN * FRAME, look.base * FRAME * 3, FRAME * 4, FRAME * 3, 0, 0, FRAME * 4, FRAME * 3);
  if (look.shirtHue !== undefined) shiftHue(canvas, 100, 200, look.shirtHue);

  const texture = scene.textures.addCanvas(key, canvas)!;
  for (let i = 0; i < 12; i++) texture.add(String(i), 0, (i % 4) * FRAME, Math.floor(i / 4) * FRAME, FRAME, FRAME);
  for (const dir of ['down', 'left', 'up'] as const) {
    scene.anims.create({
      key: walkAnimation(key, dir),
      frames: [1, 0, 2, 0].map((step) => ({ key, frame: frameName(dir, step) })),
      frameRate: 8,
      repeat: -1,
    });
  }
}

/** Extracts every playable and NPC character from the Kenney sheet into its own texture. */
export function createCharacters(scene: Phaser.Scene) {
  for (const [key, look] of Object.entries(PLAYER_LOOKS)) createCharacter(scene, key, look);
  NPC_LOOKS.forEach((look, i) => createCharacter(scene, npcLookKey(i), look));
}
