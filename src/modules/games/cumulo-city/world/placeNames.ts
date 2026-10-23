import type { Locale } from '@/i18n/locales';
import { findBuilding, findDistrict } from './districts';

/**
 * District and building names in languages other than Spanish (the names in districts.ts).
 * Missing entries fall back to the Spanish name.
 */
const DISTRICT_NAMES: Partial<Record<Locale, Record<string, string>>> = { en: {} };
const BUILDING_NAMES: Partial<Record<Locale, Record<string, string>>> = { en: {} };

export function districtName(id: string, locale: Locale): string {
  return DISTRICT_NAMES[locale]?.[id] ?? findDistrict(id).name;
}

export function buildingName(id: string, locale: Locale): string {
  return BUILDING_NAMES[locale]?.[id] ?? findBuilding(id)?.name ?? id;
}
