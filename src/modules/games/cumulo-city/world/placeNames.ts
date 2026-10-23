import type { Locale } from '@/i18n/locales';
import { findBuilding, findDistrict } from './districts';

/**
 * District and building names in languages other than Spanish (the names in districts.ts).
 * Missing entries fall back to the Spanish name.
 */
const DISTRICT_NAMES: Partial<Record<Locale, Record<string, string>>> = {
  en: {
    downtown: 'Downtown District',
    financial: 'Financial District',
    tech: 'Tech District',
    market: 'Market District',
  },
};
const BUILDING_NAMES: Partial<Record<Locale, Record<string, string>>> = {
  en: {
    bakery: 'Dulce Nube Bakery',
    'travel-agency': 'Rumbo Travel Agency',
    cafe: 'Byte Café',
    'insurance-office': 'Horizonte Insurance',
    hotel: 'Mirador Hotel',
    academy: 'Cloud Academy',
    'central-tower': 'Central Tower',
    store: 'Andes Store',
    school: 'Digital School',
    newspaper: 'La Voz Daily',
    delivery: 'Rapidito',
    logistics: 'Pacífico Logistics',
    gym: 'FitCloud Gym',
    'exchange-house': 'Inca Currency Exchange',
    bank: 'Andino Bank',
    'stock-cafe': 'Stock Exchange Café',
    fintech: 'PagoYa Fintech',
    insurer: 'Pacífico Insurers',
    'stock-exchange': 'Andino Stock Exchange',
    'financial-tower': 'Financial Tower',
    'jewelry-store': 'Oro Inca Jewelers',
    notary: 'Central Notary',
    'credit-union': 'San Martín Credit Union',
    locksmith: 'Llave Segura Locksmith',
    'audit-firm': 'Associated Auditors',
    'print-shop': 'Quick Print Shop',
    'gaming-store': 'Pixel Gamer Store',
    streaming: 'StreamLlama',
    'hacker-cafe': 'Hacker Café',
    clinic: 'Vida Clinic',
    'data-center': 'Andino Data Center',
    university: 'Tech University',
    'startup-lab': 'Startup Lab',
    'electronics-store': 'Volta Electronics',
    cityhall: 'City Hall',
    'game-studio': 'Cóndor Game Studio',
    'maker-workshop': 'Maker 3D Workshop',
    telecom: 'Andina Telecom',
    'robotics-school': 'Robotics Kids',
    'central-market': 'Central Market',
    startup: 'Startup Hub',
    'neighborhood-bakery': 'La Espiga Bakery',
    'coffee-exporter': 'Café Andino Exporters',
    'accounting-firm': 'Saldo Accounting',
    'cloud-consultancy': 'Nube Clara Consulting',
    'retail-chain': 'Retail Andes',
    'hardware-store': 'El Tornillo Hardware',
    'creative-agency': 'Llama Creative Agency',
    distributor: 'Norte Distributors',
    'flower-shop': 'Primavera Florist',
    'contact-center': 'Andino Contact Center',
    bookstore: 'El Saber Bookstore',
  },
};

export function districtName(id: string, locale: Locale): string {
  return DISTRICT_NAMES[locale]?.[id] ?? findDistrict(id).name;
}

export function buildingName(id: string, locale: Locale): string {
  return BUILDING_NAMES[locale]?.[id] ?? findBuilding(id)?.name ?? id;
}
