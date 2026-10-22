import { describe, expect, it } from 'vitest';
import { IDLE_AFTER_MS, NUDGE_AFTER_MS, NUDGE_EVERY_MS, cardKey, isIdle, nudgeDue } from './attention';

describe('isIdle', () => {
  it('stays active while the player touched something recently', () => {
    expect(isIdle(1_000, 1_000 + IDLE_AFTER_MS - 1)).toBe(false);
  });

  it('turns idle once nothing was pressed for the idle time', () => {
    expect(isIdle(1_000, 1_000 + IDLE_AFTER_MS)).toBe(true);
  });
});

describe('nudgeDue', () => {
  it('waits before the first reminder of an active mission', () => {
    expect(nudgeDue(0, null, NUDGE_AFTER_MS - 1)).toBe(false);
    expect(nudgeDue(0, null, NUDGE_AFTER_MS)).toBe(true);
  });

  it('repeats the reminder at a steady pace, not every frame', () => {
    const first = NUDGE_AFTER_MS;
    expect(nudgeDue(0, first, first + NUDGE_EVERY_MS - 1)).toBe(false);
    expect(nudgeDue(0, first, first + NUDGE_EVERY_MS)).toBe(true);
  });

  it('never nudges without an active mission', () => {
    expect(nudgeDue(null, null, NUDGE_AFTER_MS * 10)).toBe(false);
  });
});

describe('cardKey', () => {
  it('changes when the card shows another mission or another state, not on a repeated refresh', () => {
    const offer = { kind: 'offer' as const, heading: 'Nueva misión', title: 'A', detail: 'x', action: 'Aceptar misión' };
    expect(cardKey(offer)).toBe(cardKey({ ...offer }));
    expect(cardKey(offer)).not.toBe(cardKey({ ...offer, kind: 'active', heading: 'Misión activa', action: null }));
    expect(cardKey(offer)).not.toBe(cardKey({ ...offer, title: 'B' }));
  });
});
