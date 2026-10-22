import { describe, expect, it } from 'vitest';
import { EXAM_DOMAINS } from '@/modules/exam/domain/ExamDomain';
import { buildCityGround, streetProps } from './cityMap';
import { ALL_BUILDINGS, BUS_STOP, DISTRICTS, districtOf, findBuilding } from './districts';
import { G } from './tileTypes';

describe('districts', () => {
  it('has one district per exam domain, in exam order', () => {
    expect(DISTRICTS.map((d) => d.domainId)).toEqual(EXAM_DOMAINS.map((d) => d.id));
    expect(DISTRICTS.map((d) => d.name)).toEqual(['Distrito Centro', 'Distrito Financiero', 'Distrito Tecnológico', 'Distrito Mercado']);
  });

  it('gives every district thirteen buildings on the same lots, with unique ids and names in the whole city', () => {
    const lots = (i: number) => DISTRICTS[i].buildings.map(({ x, bottom, w, h, style }) => ({ x, bottom, w, h, style }));
    for (const district of DISTRICTS) expect(district.buildings).toHaveLength(13);
    for (let i = 1; i < DISTRICTS.length; i++) expect(lots(i)).toEqual(lots(0));
    expect(new Set(ALL_BUILDINGS.map((b) => b.id)).size).toBe(ALL_BUILDINGS.length);
    expect(new Set(ALL_BUILDINGS.map((b) => b.name)).size).toBe(ALL_BUILDINGS.length);
    expect(ALL_BUILDINGS.every((b) => DISTRICTS.find((d) => d.id === b.district)?.buildings.includes(b))).toBe(true);
  });

  it('keeps the buildings of the first missions where their missions are', () => {
    expect(districtOf('bakery')?.id).toBe('centro');
    expect(districtOf('bank')?.id).toBe('financiero');
    expect(districtOf('startup')?.id).toBe('mercado');
    for (const id of ['streaming', 'cityhall', 'clinic']) expect(districtOf(id)?.id).toBe('tecnologico');
    expect(findBuilding('bank')?.name).toBe('Banco Andino');
    expect(findBuilding('nowhere')).toBeUndefined();
  });

  it('puts the bus stop on free pavement in every district', () => {
    const ground = buildCityGround();
    expect(ground[BUS_STOP.y][BUS_STOP.x]).toBe(G.PAVEMENT);
    for (const district of DISTRICTS) {
      const nearBuilding = district.buildings.some(
        (b) => BUS_STOP.x >= b.x - 1 && BUS_STOP.x <= b.x + b.w && BUS_STOP.y >= b.bottom - b.h && BUS_STOP.y <= b.bottom + 1,
      );
      expect(nearBuilding, district.id).toBe(false);
      expect(streetProps(ground, district.buildings).some((p) => p.x === BUS_STOP.x && p.y === BUS_STOP.y), district.id).toBe(false);
    }
  });
});
