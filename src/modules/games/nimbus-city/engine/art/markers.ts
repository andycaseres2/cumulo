import Phaser from 'phaser';
import { createCanvas } from './canvas';

export const MARKERS = { job: 'marker-job', done: 'marker-done' } as const;

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
}

/** Places a marker above a point and makes an open job bounce gently. */
export function placeMarker(scene: Phaser.Scene, x: number, y: number, completed: boolean): Phaser.GameObjects.Image {
  const marker = scene.add.image(x, y, completed ? MARKERS.done : MARKERS.job).setOrigin(0.5, 1).setDepth(8_500);
  if (!completed) scene.tweens.add({ targets: marker, y: y - 3, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  return marker;
}
