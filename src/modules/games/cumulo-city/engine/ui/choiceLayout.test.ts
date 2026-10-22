import { describe, expect, it } from 'vitest';
import { choiceRows } from './choiceLayout';

describe('choiceRows', () => {
  it('keeps short choices on one row', () => {
    expect(choiceRows([120, 100], 700, 10)).toEqual([[0, 1]]);
  });

  it('wraps to new rows, in order, when the choices do not fit the box width', () => {
    // The bus stop: three long district choices and a short one in a 730 px wide area.
    expect(choiceRows([560, 560, 500, 170], 730, 10)).toEqual([[0], [1], [2, 3]]);
  });

  it('never leaves a row empty, even when one choice alone is wider than the box', () => {
    expect(choiceRows([900, 100], 700, 10)).toEqual([[0], [1]]);
  });

  it('has no rows without choices', () => {
    expect(choiceRows([], 700, 10)).toEqual([]);
  });
});
