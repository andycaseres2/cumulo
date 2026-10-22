import Phaser from 'phaser';
import { REGISTRY } from './config';
import { BootScene } from './engine/scenes/BootScene';
import { CityScene } from './engine/scenes/CityScene';
import { HudScene } from './engine/scenes/HudScene';
import { InteriorScene } from './engine/scenes/InteriorScene';
import { SelectScene } from './engine/scenes/SelectScene';
import { noMissions, type GameMissions } from './missions';
import type { PlayableCharacter } from './startScene';

export interface CumuloCityOptions {
  /** Shown above the player's character. Provided by whoever hosts the game. */
  playerName: string;
  /** Jobs offered in the buildings; without it the city is free to explore. */
  missions?: GameMissions;
  /** Character picked before; the selection screen is skipped when present. */
  character?: PlayableCharacter | null;
  /** Called once the player picks a character on the selection screen. */
  onCharacterChosen?: (character: PlayableCharacter) => void;
}

export interface CumuloCityHandle {
  destroy: () => void;
}

/** Public entry point of the game: renders Cúmulo City inside `parent`. */
export async function mountCumuloCity(parent: HTMLElement, options: CumuloCityOptions): Promise<CumuloCityHandle> {
  try {
    await document.fonts.load('16px "Press Start 2P"');
  } catch {
    // The monospace fallback is fine if the web font cannot load.
  }

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#1d2b53',
    pixelArt: true,
    scale: { mode: Phaser.Scale.RESIZE, width: parent.clientWidth, height: parent.clientHeight },
    physics: { default: 'arcade', arcade: { debug: false } },
    callbacks: {
      preBoot: (booting) => {
        booting.registry.set(REGISTRY.playerName, options.playerName);
        booting.registry.set(REGISTRY.missions, options.missions ?? noMissions);
        booting.registry.set(REGISTRY.character, options.character ?? null);
        booting.registry.set(REGISTRY.onCharacterChosen, options.onCharacterChosen ?? (() => {}));
      },
    },
    scene: [BootScene, SelectScene, CityScene, InteriorScene, HudScene],
  });

  // Exposed in development, and with ?e2e for browser tests, to drive the game from the console.
  if (import.meta.env.DEV || new URLSearchParams(window.location.search).has('e2e')) {
    (window as unknown as { __game: Phaser.Game }).__game = game;
  }

  return { destroy: () => game.destroy(true) };
}
