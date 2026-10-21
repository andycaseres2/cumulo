/**
 * Frame indices inside the Kenney RPG Urban Pack (CC0, https://kenney.nl/assets/rpg-urban-pack).
 * The packed sheet is 27 x 18 tiles of 16 px with no spacing.
 */
import type { SliceRole } from '../../world/autotile';
import type { BuildingDef } from '../../world/cityMap';

export const SHEET = 'kenney-urban';
export const SHEET_URL = '/games/nimbus-city/kenney-rpg-urban/tilemap_packed.png';
export const SHEET_COLUMNS = 27;

export type NineSlice = Record<SliceRole, number>;

/** A 3x3 block in the sheet whose top-left frame is `tl`. */
function nineSlice(tl: number): NineSlice {
  const row = SHEET_COLUMNS;
  return {
    tl,
    t: tl + 1,
    tr: tl + 2,
    l: tl + row,
    c: tl + row + 1,
    r: tl + row + 2,
    bl: tl + 2 * row,
    b: tl + 2 * row + 1,
    br: tl + 2 * row + 2,
  };
}

export const GROUND = {
  grass: nineSlice(0),
  pavement: nineSlice(8),
  water: nineSlice(170),
  asphalt: 406,
  /** Horizontal stripes stacked vertically; rotated 90° for vertical roads. */
  crosswalk: 405,
};

export const ROOF = { beige: nineSlice(81), grey: nineSlice(89) };

/** Facade pieces as [left, middle, right] per row kind. */
export const FACADE = {
  red: { top: [17, 18, 19], band: [44, 45, 46], wall: [71, 72, 73], base: [98, 99, 100] },
  orange: { top: [125, 126, 127], band: [152, 153, 154], wall: [179, 180, 181], base: [206, 207, 208] },
} as const;

export const OVERLAY = {
  doorOffice: 284,
  doorShop: 285,
  window: 363,
  shopWindow: 390,
  awning: [328, 329, 330],
  roofUnit: 333,
};

export const PROP = {
  treeTop: 232,
  treeTrunk: 259,
  treePlanter: 286,
  autumnTop: 313,
  autumnTrunk: 340,
  lampTop: 164,
  lampPole: 191,
  bench: 381,
  bin: 279,
  mailbox: 305,
  hydrant: 251,
};

export interface PlacedTile {
  x: number;
  y: number;
  frame: number;
}

/** Splits a building into structure tiles (roof + brick facade) and overlay tiles (doors, windows, awnings). */
export function composeBuilding(def: BuildingDef, top: number): { structure: PlacedTile[]; overlay: PlacedTile[] } {
  const structure: PlacedTile[] = [];
  const overlay: PlacedTile[] = [];
  const facadeRows = def.h >= 8 ? 4 : 3;
  const roofRows = def.h - facadeRows;
  const roof = ROOF[def.roof];
  const facade = FACADE[def.facade];
  const doorX = def.x + Math.floor(def.w / 2);

  for (let row = 0; row < roofRows; row++) {
    for (let col = 0; col < def.w; col++) {
      const v = row === 0 ? 't' : row === roofRows - 1 ? 'b' : '';
      const h = col === 0 ? 'l' : col === def.w - 1 ? 'r' : '';
      structure.push({ x: def.x + col, y: top + row, frame: roof[((v + h) || 'c') as SliceRole] });
    }
  }
  if (def.style === 'office') overlay.push({ x: def.x + 1, y: top, frame: OVERLAY.roofUnit });

  const rowKinds: (keyof typeof facade)[] =
    facadeRows === 4 ? ['top', 'wall', 'band', 'base'] : ['top', 'wall', 'base'];
  rowKinds.forEach((kind, i) => {
    const y = top + roofRows + i;
    for (let col = 0; col < def.w; col++) {
      const piece = col === 0 ? 0 : col === def.w - 1 ? 2 : 1;
      const x = def.x + col;
      structure.push({ x, y, frame: facade[kind][piece] });

      const inner = col > 0 && col < def.w - 1;
      if (kind === 'wall' && def.style === 'shop') overlay.push({ x, y, frame: OVERLAY.awning[piece] });
      else if (kind === 'wall' && inner && col % 2 === 1) overlay.push({ x, y, frame: OVERLAY.window });
      if (kind === 'base' && x === doorX) {
        overlay.push({ x, y, frame: def.style === 'shop' ? OVERLAY.doorShop : OVERLAY.doorOffice });
      } else if (kind === 'base' && inner && Math.abs(x - doorX) >= 2 && col % 2 === 1) {
        overlay.push({ x, y, frame: def.style === 'shop' ? OVERLAY.shopWindow : OVERLAY.window });
      }
    }
  });
  return { structure, overlay };
}
