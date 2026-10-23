import type { Locale } from '@/i18n/locales';
import type { ServiceFamily } from '../domain/ServiceFamily';
import { FAMILY_ORDER } from './familyOrder';

export { FAMILY_ORDER };

const byOrder = (a: ServiceFamily, b: ServiceFamily) => FAMILY_ORDER.indexOf(a.id) - FAMILY_ORDER.indexOf(b.id);
const familiesIn = (modules: Record<string, Record<string, ServiceFamily>>) => Object.values(modules).flatMap((module) => Object.values(module));

const modules = import.meta.glob<Record<string, ServiceFamily>>('./content/*.ts', { eager: true });

/** The Spanish originals: the content every translation mirrors. */
export const SERVICE_FAMILIES: ServiceFamily[] = familiesIn(modules).sort(byOrder);

/** Translations in translations/<locale>/, with the same ids, options and answers as the originals. */
const translationModules = import.meta.glob<Record<string, ServiceFamily>>('./translations/*/*.ts', { eager: true });
const TRANSLATIONS: Record<string, Map<string, ServiceFamily>> = {};
for (const [path, exports] of Object.entries(translationModules)) {
  const locale = path.split('/')[2];
  TRANSLATIONS[locale] ??= new Map();
  for (const family of Object.values(exports)) TRANSLATIONS[locale].set(family.id, family);
}

/** Every family in `locale`; a family without a translation yet is shown in Spanish. */
export function familiesFor(locale: Locale): ServiceFamily[] {
  return SERVICE_FAMILIES.map((family) => TRANSLATIONS[locale]?.get(family.id) ?? family);
}

export function findFamily(id: string): ServiceFamily | undefined {
  return SERVICE_FAMILIES.find((family) => family.id === id);
}
