import Phaser from 'phaser';
import { TILE } from '../../config';
import type { BuildingDef } from '../../world/cityMap';
import type { Furniture, OfficeLayout } from '../../world/office';
import { FACADE, OVERLAY, PROP, ROOF, SHEET } from '../art/kenney';
import { OFFICE_TEXTURES } from '../art/officeProps';

type AddSolid = (cx: number, cy: number, w: number, h: number) => void;

const FURNITURE_TEXTURE: Record<Exclude<Furniture['kind'], 'plant' | 'shelf'>, string> = {
  desk: OFFICE_TEXTURES.desk,
  meeting: OFFICE_TEXTURES.meeting,
  counter: OFFICE_TEXTURES.counter,
  printer: OFFICE_TEXTURES.printer,
  cooler: OFFICE_TEXTURES.cooler,
  sofa: OFFICE_TEXTURES.sofa,
};

/**
 * Draws an office interior: Kenney roof tiles as the floor, the building's brick as the back wall
 * with windows, wall caps around, a doormat at the exit, and furniture depth-sorted by its base.
 */
export function renderOffice(scene: Phaser.Scene, layout: OfficeLayout, building: BuildingDef, addSolid: AddSolid) {
  const map = scene.make.tilemap({ width: layout.width, height: layout.height, tileWidth: TILE, tileHeight: TILE });
  const tileset = map.addTilesetImage(SHEET, SHEET, TILE, TILE, 0, 0)!;
  const floor = map.createBlankLayer('floor', tileset)!;
  const decor = map.createBlankLayer('wall-decor', tileset)!.setDepth(1);
  const brick = FACADE[building.facade];
  const floorFrame = ROOF[building.roof].c;

  layout.cells.forEach((row, y) =>
    row.forEach((cell, x) => {
      const px = x * TILE;
      const py = y * TILE;
      if (cell === 'floor' || cell === 'door') floor.putTileAt(floorFrame, x, y);
      if (cell === 'door') scene.add.image(px, py, OFFICE_TEXTURES.doormat).setOrigin(0).setDepth(0.5);
      if (y === 0 && cell === 'wall' && x > 0 && x < layout.width - 1) floor.putTileAt(brick.top[1], x, y);
      else if (y === 1 && x > 0 && x < layout.width - 1) {
        floor.putTileAt(brick.wall[1], x, y);
        if (cell === 'window') decor.putTileAt(OVERLAY.window, x, y);
      } else if (cell === 'wall') scene.add.image(px, py, OFFICE_TEXTURES.wallCap).setOrigin(0).setDepth(0.5);
    }),
  );

  const w = layout.width * TILE;
  const h = layout.height * TILE;
  addSolid(w / 2, TILE, w, 2 * TILE);
  addSolid(TILE / 2, h / 2, TILE, h);
  addSolid(w - TILE / 2, h / 2, TILE, h);
  const doorLeft = layout.door.x * TILE;
  addSolid(doorLeft / 2, h - TILE / 2, doorLeft, TILE);
  addSolid((doorLeft + TILE + w) / 2, h - TILE / 2, w - doorLeft - TILE, TILE);

  for (const f of layout.furniture) renderFurniture(scene, f, addSolid);
  for (const station of layout.workstations) {
    if (station.facing !== 'up') continue;
    const base = (station.seat.y + 1) * TILE;
    scene.add.image((station.seat.x + 0.5) * TILE, base - 1, OFFICE_TEXTURES.chair).setOrigin(0.5, 1).setDepth(base - 3);
  }
}

function renderFurniture(scene: Phaser.Scene, f: Furniture, addSolid: AddSolid) {
  const left = f.x * TILE;
  const base = (f.y + f.h) * TILE;
  addSolid(left + (f.w * TILE) / 2, f.y * TILE + (f.h * TILE) / 2, f.w * TILE, f.h * TILE);

  if (f.kind === 'plant') {
    const cx = left + TILE / 2;
    scene.add.image(cx, base, SHEET, PROP.treePlanter).setOrigin(0.5, 1).setDepth(base);
    scene.add.image(cx, base - TILE, SHEET, PROP.treeTop).setOrigin(0.5, 1).setDepth(base);
    return;
  }
  const texture = f.kind === 'shelf' ? (f.w >= 3 ? OFFICE_TEXTURES.shelf3 : OFFICE_TEXTURES.shelf2) : FURNITURE_TEXTURE[f.kind];
  scene.add.image(left, base, texture).setOrigin(0, 1).setDepth(base);
}
