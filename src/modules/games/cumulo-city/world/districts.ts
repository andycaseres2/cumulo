import type { ExamDomainId } from '@/modules/exam/domain/ExamDomain';
import type { BuildingDef } from './cityMap';

export type DistrictId = 'downtown' | 'financial' | 'tech' | 'market';

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
  district('downtown', 'Distrito Centro', 'cloud-concepts', [
    ['bakery', 'Pastelería Dulce Nube'],
    ['travel-agency', 'Agencia de Viajes Rumbo'],
    ['cafe', 'Café Byte'],
    ['insurance-office', 'Seguros Horizonte'],
    ['hotel', 'Hotel Mirador'],
    ['academy', 'Cloud Academy'],
    ['central-tower', 'Torre Central'],
    ['store', 'Tienda Andes'],
    ['school', 'Escuela Digital'],
    ['newspaper', 'Diario La Voz'],
    ['delivery', 'Rapidito'],
    ['logistics', 'Logística Pacífico'],
    ['gym', 'FitCloud Gym'],
  ]),
  district(
    'financial',
    'Distrito Financiero',
    'security-compliance',
    [
      ['exchange-house', 'Casa de Cambio Inca'],
      ['bank', 'Banco Andino'],
      ['stock-cafe', 'Café de la Bolsa'],
      ['fintech', 'Fintech PagoYa'],
      ['insurer', 'Aseguradora Pacífico'],
      ['stock-exchange', 'Bolsa de Valores Andina'],
      ['financial-tower', 'Torre Financiera'],
      ['jewelry-store', 'Joyería Oro Inca'],
      ['notary', 'Notaría Central'],
      ['credit-union', 'Cooperativa San Martín'],
      ['locksmith', 'Cerrajería Llave Segura'],
      ['audit-firm', 'Auditores Asociados'],
      ['print-shop', 'Imprenta Rápida'],
    ],
    true,
  ),
  district('tech', 'Distrito Tecnológico', 'technology-services', [
    ['gaming-store', 'Tienda Gamer Pixel'],
    ['streaming', 'StreamLlama'],
    ['hacker-cafe', 'Café Hacker'],
    ['clinic', 'Clínica Vida'],
    ['data-center', 'Centro de Datos Andino'],
    ['university', 'Universidad Tecnológica'],
    ['startup-lab', 'Startup Lab'],
    ['electronics-store', 'Electrónica Volta'],
    ['cityhall', 'Municipalidad'],
    ['game-studio', 'Estudio de Juegos Cóndor'],
    ['maker-workshop', 'Taller Maker 3D'],
    ['telecom', 'Telecom Andina'],
    ['robotics-school', 'Robótica Kids'],
  ]),
  district(
    'market',
    'Distrito Mercado',
    'billing-pricing-support',
    [
      ['central-market', 'Mercado Central'],
      ['startup', 'Startup Hub'],
      ['neighborhood-bakery', 'Panadería La Espiga'],
      ['coffee-exporter', 'Exportadora Café Andino'],
      ['accounting-firm', 'Estudio Contable Saldo'],
      ['cloud-consultancy', 'Consultora Nube Clara'],
      ['retail-chain', 'Retail Andes'],
      ['hardware-store', 'Ferretería El Tornillo'],
      ['creative-agency', 'Agencia Creativa Llama'],
      ['distributor', 'Distribuidora Norte'],
      ['flower-shop', 'Florería Primavera'],
      ['contact-center', 'Contact Center Andino'],
      ['bookstore', 'Librería El Saber'],
    ],
    true,
  ),
];

export const ALL_BUILDINGS: BuildingDef[] = DISTRICTS.flatMap((d) => d.buildings);

export const START_DISTRICT: DistrictId = 'downtown';

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
