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
  missions: 'missions',
  missionTracker: 'missionTracker',
  /** Character picked before ('man' | 'woman') or null. */
  character: 'character',
  /** Callback to tell the host page which character the player picked. */
  onCharacterChosen: 'onCharacterChosen',
} as const;

export const EVENTS = {
  prompt: 'hud:prompt',
  dialog: 'hud:dialog',
  dialogClose: 'hud:dialog-close',
  /** Player pressed E/Space/Aceptar while a dialog is open: the HUD completes the text or closes it. */
  dialogAdvance: 'hud:dialog-advance',
  /** Player picked one of the dialog choices; carries the choice id. */
  dialogChoice: 'hud:dialog-choice',
  interact: 'hud:interact',
  location: 'hud:location',
  /** HUD mission card content (MissionCardContent). */
  missionCard: 'hud:mission-card',
  /** Player pressed "Aceptar misión" on the HUD card. */
  missionAccept: 'hud:mission-accept',
  /** The current mission changed (CurrentMission | null); scenes refresh markers and guides. */
  missionChanged: 'game:mission-changed',
  /** HUD zoom buttons and the full-map toggle (also wheel, +/− and M in the city). */
  zoomIn: 'hud:zoom-in',
  zoomOut: 'hud:zoom-out',
  toggleMap: 'hud:toggle-map',
  /** The city entered (true) or left (false) the full-map view. */
  mapMode: 'game:map-mode',
} as const;

export function pickZoom(width: number, height: number): number {
  return Math.min(4, Math.max(2, Math.floor(Math.min(width / 480, height / 300))));
}

/** Largest whole zoom (2–4) at which content of the given size fits the view. */
export function fitZoom(viewWidth: number, viewHeight: number, contentWidth: number, contentHeight: number): number {
  return Math.min(4, Math.max(2, Math.floor(Math.min(viewWidth / contentWidth, viewHeight / contentHeight))));
}

export function minimapRect(screenWidth: number) {
  const width = 176;
  const height = Math.round((width * MAP_H) / MAP_W);
  return { x: screenWidth - width - 12, y: 12, width, height };
}
