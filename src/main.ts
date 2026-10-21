import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { CityScene } from './scenes/CityScene';
import { HudScene } from './scenes/HudScene';
import { SelectScene } from './scenes/SelectScene';

async function start() {
  try {
    await document.fonts.load('16px "Press Start 2P"');
  } catch {
    // The monospace fallback is fine if the web font cannot load.
  }

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#1d2b53',
    pixelArt: true,
    scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [BootScene, SelectScene, CityScene, HudScene],
  });

  // Exposed in development only, for debugging from the browser console.
  if (import.meta.env.DEV) (window as unknown as { __game: Phaser.Game }).__game = game;
}

void start();
