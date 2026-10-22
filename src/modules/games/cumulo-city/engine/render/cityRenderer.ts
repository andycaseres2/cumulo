import Phaser from 'phaser';
import { FONT, MAP_H, MAP_W, TILE } from '../../config';
import { sliceRole } from '../../world/autotile';
import {
  buildingTop,
  doorTile,
  H_ROADS,
  PARK_BENCHES,
  PARK_TREES,
  streetProps,
  V_ROADS,
  type BuildingDef,
  type GroundGrid,
  type StreetPropKind,
} from '../../world/cityMap';
import { G, isRoad } from '../../world/tileTypes';
import { composeBuilding, GROUND, PROP, SHEET } from '../art/kenney';

type AddSolid = (cx: number, cy: number, w: number, h: number) => void;

export interface Door {
  building: BuildingDef;
  x: number;
  y: number;
}

/** Ground layer: autotiled pavement, grass and water, plus asphalt and crosswalks. Water is solid. */
export function renderGround(scene: Phaser.Scene, ground: GroundGrid): Phaser.Tilemaps.TilemapLayer {
  const map = scene.make.tilemap({ width: MAP_W, height: MAP_H, tileWidth: TILE, tileHeight: TILE });
  const tileset = map.addTilesetImage(SHEET, SHEET, TILE, TILE, 0, 0)!;
  const layer = map.createBlankLayer('ground', tileset)!;
  const grid = ground as number[][];

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const cell = ground[y][x];
      if (cell === G.ROAD) layer.putTileAt(GROUND.asphalt, x, y);
      else if (cell === G.CROSSWALK_H) layer.putTileAt(GROUND.crosswalk, x, y);
      else if (cell === G.CROSSWALK_V) layer.putTileAt(GROUND.crosswalk, x, y).rotation = Math.PI / 2;
      else if (cell === G.GRASS) layer.putTileAt(GROUND.grass[sliceRole(grid, x, y, (c) => c === G.GRASS)], x, y);
      else if (cell === G.WATER) layer.putTileAt(GROUND.water[sliceRole(grid, x, y, (c) => c === G.WATER)], x, y);
      else layer.putTileAt(GROUND.pavement[sliceRole(grid, x, y, (c) => !isRoad(c))], x, y);
    }
  }
  layer.setCollision(Object.values(GROUND.water));
  return layer;
}

/** Dashed center lines between the two lanes of every road, skipping intersections. */
export function renderRoadMarkings(scene: Phaser.Scene, ground: GroundGrid) {
  const g = scene.add.graphics().setDepth(1);
  g.fillStyle(0xe6e2f2, 0.85);
  for (const r of H_ROADS) {
    for (let x = 0; x < MAP_W; x++) {
      if (ground[r][x] === G.ROAD && ground[r + 1][x] === G.ROAD && !V_ROADS.some((c) => x === c || x === c + 1)) {
        g.fillRect(x * TILE + 3, (r + 1) * TILE - 1, 10, 2);
      }
    }
  }
  for (const c of V_ROADS) {
    for (let y = 0; y < MAP_H; y++) {
      if (ground[y][c] === G.ROAD && ground[y][c + 1] === G.ROAD && !H_ROADS.some((r) => y === r || y === r + 1)) {
        g.fillRect((c + 1) * TILE - 1, y * TILE + 3, 2, 10);
      }
    }
  }
}

/** Buildings made of Kenney tiles, with a name sign above the door. Returns where each door is. */
export function renderBuildings(
  scene: Phaser.Scene,
  ground: Phaser.Tilemaps.TilemapLayer,
  buildings: BuildingDef[],
  addSolid: AddSolid,
): Door[] {
  const map = ground.tilemap;
  const tileset = map.getTileset(SHEET)!;
  const structure = map.createBlankLayer('buildings', tileset)!.setDepth(2);
  const overlay = map.createBlankLayer('building-overlay', tileset)!.setDepth(3);

  return buildings.map((def) => {
    const top = buildingTop(def);
    const parts = composeBuilding(def, top);
    for (const t of parts.structure) structure.putTileAt(t.frame, t.x, t.y);
    for (const t of parts.overlay) overlay.putTileAt(t.frame, t.x, t.y);
    addSolid((def.x + def.w / 2) * TILE, (top + def.h / 2) * TILE, def.w * TILE, def.h * TILE);
    renderSign(scene, def, top);
    const door = doorTile(def);
    return { building: def, x: (door.x + 0.5) * TILE, y: door.y * TILE + 6 };
  });
}

function renderSign(scene: Phaser.Scene, def: BuildingDef, top: number) {
  const facadeRows = def.h >= 8 ? 4 : 3;
  const cx = (def.x + def.w / 2) * TILE;
  const cy = (top + def.h - facadeRows) * TILE + 7;
  const width = Math.min(def.w * TILE - 10, def.name.length * 4 + 10);
  scene.add
    .rectangle(cx, cy, width, 10, 0x2b2b3a)
    .setStrokeStyle(1, 0xffd166)
    .setDepth(4);
  scene.add
    .text(cx, cy, def.name, { fontFamily: FONT, fontSize: '4px', color: '#ffffff', resolution: 4 })
    .setOrigin(0.5)
    .setDepth(4.5)
    .texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
}

const SHORT_FRAMES: Record<Exclude<StreetPropKind, 'tree' | 'lamp'>, number> = {
  bench: PROP.bench,
  bin: PROP.bin,
  mailbox: PROP.mailbox,
  hydrant: PROP.hydrant,
};

/** Trees, lamps and street furniture, depth-sorted by their base so characters walk behind and in front. */
export function renderProps(scene: Phaser.Scene, ground: GroundGrid, buildings: BuildingDef[], addSolid: AddSolid) {
  const tall = (x: number, y: number, topFrame: number, bottomFrame: number) => {
    const px = (x + 0.5) * TILE;
    const base = (y + 1) * TILE;
    scene.add.image(px, base, SHEET, bottomFrame).setOrigin(0.5, 1).setDepth(base);
    scene.add.image(px, base - TILE, SHEET, topFrame).setOrigin(0.5, 1).setDepth(base);
    addSolid(px, base - 4, 6, 6);
  };
  const short = (x: number, y: number, frame: number) => {
    const px = (x + 0.5) * TILE;
    const base = (y + 1) * TILE;
    scene.add.image(px, base, SHEET, frame).setOrigin(0.5, 1).setDepth(base);
    addSolid(px, base - 5, 12, 6);
  };

  for (const prop of streetProps(ground, buildings)) {
    if (prop.kind === 'tree') tall(prop.x, prop.y, PROP.treeTop, PROP.treePlanter);
    else if (prop.kind === 'lamp') tall(prop.x, prop.y, PROP.lampTop, PROP.lampPole);
    else short(prop.x, prop.y, SHORT_FRAMES[prop.kind]);
  }
  PARK_TREES.forEach((spot, i) =>
    i % 3 === 2 ? tall(spot.x, spot.y, PROP.autumnTop, PROP.autumnTrunk) : tall(spot.x, spot.y, PROP.treeTop, PROP.treeTrunk),
  );
  for (const spot of PARK_BENCHES) short(spot.x, spot.y, PROP.bench);
}
