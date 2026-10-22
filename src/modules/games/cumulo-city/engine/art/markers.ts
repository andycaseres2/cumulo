import Phaser from 'phaser';
import { createCanvas } from './canvas';

export const MARKERS = { job: 'marker-job', done: 'marker-done', guide: 'marker-guide', busStop: 'bus-stop' } as const;

const OUTLINE = '#3a3a40';

/** Floating markers in the Kenney palette: "!" for an available job, a check once completed. */
export function createMarkers(scene: Phaser.Scene) {
  const job = createCanvas(11, 15);
  const j = job.getContext('2d')!;
  j.fillStyle = OUTLINE;
  j.fillRect(1, 0, 9, 12);
  j.fillRect(0, 1, 11, 10);
  j.fillRect(4, 12, 3, 2);
  j.fillStyle = '#f5aa57';
  j.fillRect(1, 1, 9, 10);
  j.fillStyle = '#ffc999';
  j.fillRect(2, 2, 7, 1);
  j.fillStyle = OUTLINE;
  j.fillRect(5, 3, 1, 4);
  j.fillRect(5, 8, 1, 1);
  scene.textures.addCanvas(MARKERS.job, job);

  const done = createCanvas(11, 15);
  const d = done.getContext('2d')!;
  d.fillStyle = OUTLINE;
  d.fillRect(1, 0, 9, 12);
  d.fillRect(0, 1, 11, 10);
  d.fillRect(4, 12, 3, 2);
  d.fillStyle = '#39a077';
  d.fillRect(1, 1, 9, 10);
  d.fillStyle = '#f4f7ee';
  for (const [x, y] of [
    [2, 6],
    [3, 7],
    [4, 8],
    [5, 7],
    [6, 6],
    [7, 5],
    [8, 4],
  ]) {
    d.fillRect(x, y, 1, 1);
  }
  scene.textures.addCanvas(MARKERS.done, done);

  // Guide arrow pointing right (16x15): shaft plus head, dark outline and solid fill; the scene rotates it.
  const guide = createCanvas(16, 15);
  const g = guide.getContext('2d')!;
  const arrow = (color: string, inset: number) => {
    g.fillStyle = color;
    g.fillRect(inset, 5 + inset, 8, 5 - 2 * inset);
    for (let i = 0; i <= 7 - inset; i++) g.fillRect(8 + i, i + inset, 1, 15 - 2 * (i + inset));
  };
  arrow(OUTLINE, 0);
  arrow('#f5aa57', 1);
  g.fillStyle = '#ffc999';
  g.fillRect(2, 6, 6, 1);
  scene.textures.addCanvas(MARKERS.guide, guide);

  // Bus stop (12x26): a blue sign with a white bus on a grey pole.
  const stop = createCanvas(12, 26);
  const s = stop.getContext('2d')!;
  s.fillStyle = OUTLINE;
  s.fillRect(4, 10, 4, 16);
  s.fillRect(0, 0, 12, 12);
  s.fillStyle = '#9aa0ad';
  s.fillRect(5, 11, 2, 15);
  s.fillStyle = '#3b6fb6';
  s.fillRect(1, 1, 10, 10);
  s.fillStyle = '#f4f7ee';
  s.fillRect(3, 3, 6, 5);
  s.fillRect(3, 8, 1, 1);
  s.fillRect(8, 8, 1, 1);
  s.fillStyle = '#3b6fb6';
  s.fillRect(4, 4, 4, 2);
  scene.textures.addCanvas(MARKERS.busStop, stop);
}

/** Places a marker above a point and makes an open job bounce gently. */
export function placeMarker(scene: Phaser.Scene, x: number, y: number, completed: boolean): Phaser.GameObjects.Image {
  const marker = scene.add.image(x, y, completed ? MARKERS.done : MARKERS.job).setOrigin(0.5, 1).setDepth(8_500);
  if (!completed) scene.tweens.add({ targets: marker, y: y - 3, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  return marker;
}
