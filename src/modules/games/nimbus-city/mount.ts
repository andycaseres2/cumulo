import Phaser from 'phaser';
import { REGISTRY } from './config';
import { BootScene } from './engine/scenes/BootScene';
import { CityScene } from './engine/scenes/CityScene';
import { HudScene } from './engine/scenes/HudScene';
import { InteriorScene } from './engine/scenes/InteriorScene';
import { SelectScene } from './engine/scenes/SelectScene';
import { noMissions, type GameMissions } from './missions';

export interface NimbusCityOptions {
  /** Shown above the player's character. Provided by whoever hosts the game. */
  playerName: string;
  /** Jobs offered in the buildings; without it the city is free to explore. */
  missions?: GameMissions;
}

export interface NimbusCityHandle {
  destroy: () => void;
}

/** Public entry point of the game: renders Nimbus City inside `parent`. */
export async function mountNimbusCity(parent: HTMLElement, options: NimbusCityOptions): Promise<NimbusCityHandle> {
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
      },
    },
    scene: [BootScene, SelectScene, CityScene, InteriorScene, HudScene],
  });

  // Exposed in development only, for debugging from the browser console.
  if (import.meta.env.DEV) (window as unknown as { __game: Phaser.Game }).__game = game;

  return { destroy: () => game.destroy(true) };
}
