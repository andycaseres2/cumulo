export interface Painter {
  rect: (x: number, y: number, w: number, h: number, color: string) => void;
  px: (x: number, y: number, color: string) => void;
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function painter(canvas: HTMLCanvasElement, ox = 0, oy = 0): Painter {
  const ctx = canvas.getContext('2d')!;
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(ox + x, oy + y, w, h);
  };
  return { rect, px: (x, y, color) => rect(x, y, 1, 1, color) };
}

/** Lightens (amount > 0) or darkens (amount < 0) a #rrggbb color. */
export function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const channel = (v: number) =>
    Math.round(Math.min(255, Math.max(0, amount < 0 ? v * (1 + amount) : v + (255 - v) * amount)));
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** Paints a 1px outline around every opaque pixel inside the given region. */
export function outline(canvas: HTMLCanvasElement, x: number, y: number, w: number, h: number, color = '#1b1b2a') {
  const ctx = canvas.getContext('2d')!;
  const image = ctx.getImageData(x, y, w, h);
  const { data } = image;
  const n = parseInt(color.slice(1), 16);
  const alphaAt = (i: number, j: number) => (i < 0 || j < 0 || i >= w || j >= h ? 0 : data[(j * w + i) * 4 + 3]);
  const marks: number[] = [];
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (alphaAt(i, j) !== 0) continue;
      if (alphaAt(i - 1, j) || alphaAt(i + 1, j) || alphaAt(i, j - 1) || alphaAt(i, j + 1)) marks.push((j * w + i) * 4);
    }
  }
  for (const idx of marks) {
    data[idx] = (n >> 16) & 255;
    data[idx + 1] = (n >> 8) & 255;
    data[idx + 2] = n & 255;
    data[idx + 3] = 255;
  }
  ctx.putImageData(image, x, y);
}

/** Deterministic PRNG (mulberry32) so the city looks the same on every load. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return h >>> 0;
}
