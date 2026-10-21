export const TILE = 16;
export const MAP_W = 64;
export const MAP_H = 48;
export const WORLD_W = MAP_W * TILE;
export const WORLD_H = MAP_H * TILE;

export const FONT = '"Press Start 2P", monospace';

export const PLAYER_SPEED = 80;
export const PLAYER_RUN_SPEED = 130;
export const NPC_SPEED = 32;
export const NPC_COUNT = 12;
export const INTERACT_RANGE = 20;

/** Keys shared through the Phaser registry. */
export const REGISTRY = {
  playerKey: 'playerKey',
  playerName: 'playerName',
} as const;

export const EVENTS = {
  prompt: 'hud:prompt',
  dialog: 'hud:dialog',
  dialogClose: 'hud:dialog-close',
  interact: 'hud:interact',
} as const;

export function pickZoom(width: number, height: number): number {
  return Math.min(4, Math.max(2, Math.floor(Math.min(width / 480, height / 300))));
}

export function minimapRect(screenWidth: number) {
  const width = 176;
  const height = Math.round((width * MAP_H) / MAP_W);
  return { x: screenWidth - width - 12, y: 12, width, height };
}
