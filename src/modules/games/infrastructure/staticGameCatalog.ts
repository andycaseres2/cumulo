import type { Game } from '../domain/Game';
import type { GameCatalog } from '../domain/GameCatalog';

const GAMES: Game[] = [
  {
    slug: 'cumulo-city',
    title: 'Cúmulo City',
    tagline: 'Recorre la ciudad como consultor cloud',
    description:
      'Camina por Cúmulo City, conversa con sus vecinos y ayuda a negocios reales con sus problemas en la nube. Cada misión te enseña un servicio de AWS en contexto.',
    status: 'available',
    level: 'practitioner',
    domains: ['cloud-concepts', 'security-compliance', 'technology-services', 'billing-pricing-support'],
  },
  {
    slug: 'service-duel',
    title: 'Duelo de servicios',
    tagline: 'Elige el servicio correcto antes de que acabe el tiempo',
    description:
      'Duelos contra cinco rivales, contrarreloj y entrenamiento para distinguir los servicios que se confunden en el examen: S3, EBS o EFS; RDS o DynamoDB; GuardDuty o Inspector, y muchos más.',
    status: 'available',
    level: 'practitioner',
    domains: ['technology-services'],
  },
];

/** Adapter: the game catalog lives in code until games are managed elsewhere. */
export const staticGameCatalog: GameCatalog = {
  findAll: async () => [...GAMES],
};
