import type { ServiceFamily } from '../domain/ServiceFamily';
import { FAMILY_ORDER } from './familyOrder';

export { FAMILY_ORDER };

const modules = import.meta.glob<Record<string, ServiceFamily>>('./content/*.ts', { eager: true });
const loaded = Object.values(modules).flatMap((module) => Object.values(module));

export const SERVICE_FAMILIES: ServiceFamily[] = [...loaded].sort((a, b) => FAMILY_ORDER.indexOf(a.id) - FAMILY_ORDER.indexOf(b.id));

export function findFamily(id: string): ServiceFamily | undefined {
  return SERVICE_FAMILIES.find((family) => family.id === id);
}
