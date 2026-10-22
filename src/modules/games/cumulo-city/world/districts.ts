import type { ExamDomainId } from '@/modules/exam/domain/ExamDomain';
import type { BuildingDef } from './cityMap';

export type DistrictId = 'centro' | 'financiero' | 'tecnologico' | 'mercado';

/** One map of the city; its clients bring problems of one exam domain. */
export interface District {
  id: DistrictId;
  name: string;
  domainId: ExamDomainId;
  buildings: BuildingDef[];
}

type Lot = Pick<BuildingDef, 'x' | 'bottom' | 'w' | 'h' | 'style' | 'facade' | 'roof'>;

/** The thirteen building lots every district shares: same streets, different neighbours. */
const LOTS: Lot[] = [
  { x: 2, bottom: 10, w: 9, h: 7, facade: 'red', roof: 'beige', style: 'shop' },
  { x: 20, bottom: 10, w: 9, h: 8, facade: 'orange', roof: 'grey', style: 'office' },
  { x: 31, bottom: 10, w: 7, h: 6, facade: 'red', roof: 'grey', style: 'shop' },
  { x: 44, bottom: 10, w: 9, h: 8, facade: 'orange', roof: 'beige', style: 'office' },
  { x: 55, bottom: 10, w: 8, h: 8, facade: 'red', roof: 'grey', style: 'office' },
  { x: 2, bottom: 26, w: 11, h: 8, facade: 'orange', roof: 'beige', style: 'office' },
  { x: 44, bottom: 26, w: 10, h: 8, facade: 'red', roof: 'grey', style: 'office' },
  { x: 56, bottom: 26, w: 7, h: 6, facade: 'orange', roof: 'grey', style: 'shop' },
  { x: 2, bottom: 42, w: 10, h: 7, facade: 'red', roof: 'beige', style: 'office' },
  { x: 20, bottom: 42, w: 9, h: 8, facade: 'orange', roof: 'grey', style: 'office' },
  { x: 31, bottom: 42, w: 7, h: 6, facade: 'red', roof: 'beige', style: 'shop' },
  { x: 44, bottom: 42, w: 10, h: 9, facade: 'orange', roof: 'beige', style: 'office' },
  { x: 56, bottom: 42, w: 7, h: 6, facade: 'red', roof: 'grey', style: 'shop' },
];

/** Builds a district from thirteen [id, name] pairs, one per lot; `swapColors` varies the look between districts. */
function district(id: DistrictId, name: string, domainId: ExamDomainId, names: [string, string][], swapColors = false): District {
  const buildings = names.map(([buildingId, buildingName], i): BuildingDef => {
    const lot = LOTS[i];
    const facade = swapColors ? (lot.facade === 'red' ? 'orange' : 'red') : lot.facade;
    return { ...lot, facade, id: buildingId, name: buildingName, district: id };
  });
  return { id, name, domainId, buildings };
}

export const DISTRICTS: District[] = [
  district('centro', 'Distrito Centro', 'cloud-concepts', [
    ['bakery', 'Pastelería Dulce Nube'],
    ['agencia-rumbo', 'Agencia de Viajes Rumbo'],
    ['cafe', 'Café Byte'],
    ['seguros-horizonte', 'Seguros Horizonte'],
    ['hotel', 'Hotel Mirador'],
    ['academy', 'Cloud Academy'],
    ['torre-central', 'Torre Central'],
    ['store', 'Tienda Andes'],
    ['school', 'Escuela Digital'],
    ['diario-la-voz', 'Diario La Voz'],
    ['delivery', 'Rapidito'],
    ['logistica-pacifico', 'Logística Pacífico'],
    ['gym', 'FitCloud Gym'],
  ]),
  district(
    'financiero',
    'Distrito Financiero',
    'security-compliance',
    [
      ['casa-cambio', 'Casa de Cambio Inca'],
      ['bank', 'Banco Andino'],
      ['cafe-bolsa', 'Café de la Bolsa'],
      ['fintech-pagoya', 'Fintech PagoYa'],
      ['aseguradora-pacifico', 'Aseguradora Pacífico'],
      ['bolsa-andina', 'Bolsa de Valores Andina'],
      ['torre-financiera', 'Torre Financiera'],
      ['joyeria-oro', 'Joyería Oro Inca'],
      ['notaria-central', 'Notaría Central'],
      ['cooperativa-san-martin', 'Cooperativa San Martín'],
      ['cerrajeria', 'Cerrajería Llave Segura'],
      ['auditores-asociados', 'Auditores Asociados'],
      ['imprenta-rapida', 'Imprenta Rápida'],
    ],
    true,
  ),
  district('tecnologico', 'Distrito Tecnológico', 'technology-services', [
    ['tienda-pixel', 'Tienda Gamer Pixel'],
    ['streaming', 'StreamLlama'],
    ['cafe-hacker', 'Café Hacker'],
    ['clinic', 'Clínica Vida'],
    ['centro-datos', 'Centro de Datos Andino'],
    ['universidad', 'Universidad Tecnológica'],
    ['startup-lab', 'Startup Lab'],
    ['electronica-volta', 'Electrónica Volta'],
    ['cityhall', 'Municipalidad'],
    ['estudio-condor', 'Estudio de Juegos Cóndor'],
    ['taller-maker', 'Taller Maker 3D'],
    ['telecom-andina', 'Telecom Andina'],
    ['robotica-kids', 'Robótica Kids'],
  ]),
  district(
    'mercado',
    'Distrito Mercado',
    'billing-pricing-support',
    [
      ['mercado-central', 'Mercado Central'],
      ['startup', 'Startup Hub'],
      ['panaderia-espiga', 'Panadería La Espiga'],
      ['exportadora-cafe', 'Exportadora Café Andino'],
      ['estudio-contable', 'Estudio Contable Saldo'],
      ['consultora-nube', 'Consultora Nube Clara'],
      ['retail-andes', 'Retail Andes'],
      ['ferreteria', 'Ferretería El Tornillo'],
      ['agencia-llama', 'Agencia Creativa Llama'],
      ['distribuidora-norte', 'Distribuidora Norte'],
      ['floreria', 'Florería Primavera'],
      ['contact-center', 'Contact Center Andino'],
      ['libreria', 'Librería El Saber'],
    ],
    true,
  ),
];

export const ALL_BUILDINGS: BuildingDef[] = DISTRICTS.flatMap((d) => d.buildings);

export const START_DISTRICT: DistrictId = 'centro';

/** Same tile in every district: pavement south of the first avenue, next to the western road. */
export const BUS_STOP = { x: 18, y: 14 };

export function findBuilding(buildingId: string): BuildingDef | undefined {
  return ALL_BUILDINGS.find((b) => b.id === buildingId);
}

export function districtOf(buildingId: string): District | undefined {
  return DISTRICTS.find((d) => d.buildings.some((b) => b.id === buildingId));
}

export function findDistrict(id: string): District {
  return DISTRICTS.find((d) => d.id === id) ?? DISTRICTS[0];
}
