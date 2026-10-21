import { describe, expect, it } from 'vitest';
import { BUILDINGS } from './cityMap';
import { BUILDING_CONCERNS, workerLine, workerName } from './officeTalk';

describe('office talk', () => {
  it('gives every building its own concern, which its first worker always mentions', () => {
    for (const b of BUILDINGS) {
      expect(BUILDING_CONCERNS[b.id], b.id).toBeTruthy();
      expect(workerLine(b.id, 0)).toBe(BUILDING_CONCERNS[b.id]);
    }
  });

  it('gives the other workers everyday office lines, the same ones on every visit', () => {
    expect(workerLine('bank', 1)).not.toBe(BUILDING_CONCERNS.bank);
    expect(workerLine('bank', 3)).toBe(workerLine('bank', 3));
  });

  it('names workers so the dialog shows who is talking', () => {
    expect(workerName('bank', 0)).not.toBe(workerName('bank', 1));
    expect(workerName('bank', 2)).toBe(workerName('bank', 2));
  });
});
