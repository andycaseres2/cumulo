import type { Game } from '../domain/Game';
import type { GameCatalog } from '../domain/GameCatalog';

const GAMES: Game[] = [
  {
    slug: 'nimbus-city',
    title: 'Nimbus City',
    tagline: 'Recorre la ciudad como consultor cloud',
    description:
      'Camina por Nimbus City, conversa con sus vecinos y ayuda a negocios reales con sus problemas en la nube. Cada misión te enseña un servicio de AWS en contexto.',
    status: 'available',
    level: 'practitioner',
    domains: ['cloud-concepts', 'security-compliance', 'technology-services', 'billing-pricing-support'],
  },
  {
    slug: 'simulacro',
    title: 'Simulacro de examen',
    tagline: '65 preguntas con tiempo, como el examen real',
    description: 'Practica bajo presión con preguntas de escenarios de los cuatro dominios y recibe la explicación de cada respuesta.',
    status: 'coming-soon',
    level: 'practitioner',
    domains: ['cloud-concepts', 'security-compliance', 'technology-services', 'billing-pricing-support'],
  },
  {
    slug: 'duelo-de-servicios',
    title: 'Duelo de servicios',
    tagline: 'Elige el servicio correcto antes de que acabe el tiempo',
    description: 'Rondas rápidas para distinguir servicios que se confunden en el examen: S3, EBS o EFS; RDS o DynamoDB; y muchos más.',
    status: 'coming-soon',
    level: 'practitioner',
    domains: ['technology-services'],
  },
];

/** Adapter: the game catalog lives in code until games are managed elsewhere. */
export const staticGameCatalog: GameCatalog = {
  findAll: async () => [...GAMES],
};
