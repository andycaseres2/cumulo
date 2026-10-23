import { describe, expect, it } from 'vitest';
import { ALL_BUILDINGS, DISTRICTS } from './districts';
import { buildingName, districtName } from './placeNames';

describe('place names', () => {
  it('keeps the Spanish names in Spanish', () => {
    expect(districtName('downtown', 'es')).toBe('Distrito Centro');
    expect(buildingName('bakery', 'es')).toBe('Pastelería Dulce Nube');
  });

  it('has an English name for every district and building', () => {
    expect(districtName('downtown', 'en')).toBe('Downtown District');
    expect(buildingName('bakery', 'en')).toBe('Dulce Nube Bakery');
    for (const d of DISTRICTS) expect(districtName(d.id, 'en'), d.id).not.toBe(d.name);
    // Invented names that read the same in both languages keep their Spanish spelling.
    const unchanged = ALL_BUILDINGS.filter((b) => buildingName(b.id, 'en') === b.name).map((b) => b.id);
    expect(unchanged.sort()).toEqual(['academy', 'delivery', 'gym', 'retail-chain', 'startup', 'startup-lab', 'streaming']);
  });
});
