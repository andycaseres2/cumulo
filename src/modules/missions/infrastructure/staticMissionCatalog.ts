import type { Mission } from '../domain/Mission';
import type { MissionCatalog } from '../domain/MissionCatalog';

/**
 * Campaign order of each district (track): its missions are offered one after another in this order.
 * Generated from the theory topics (see odd/tasks/city-districts-plan.md): two missions per topic.
 */
export const CAMPAIGN_ORDER: Record<string, string[]> = {
  centro: [
    'bakery-elasticity',
    'modelos-de-servicio-y-despliegue-1',
    'well-architected-framework-1',
    'economia-de-la-nube-1',
    'cloud-adoption-framework-1',
    'estrategias-de-migracion-1',
    'beneficios-de-la-nube-2',
    'modelos-de-servicio-y-despliegue-2',
    'well-architected-framework-2',
    'economia-de-la-nube-2',
    'cloud-adoption-framework-2',
    'estrategias-de-migracion-2',
  ],
  financiero: [
    'responsabilidad-compartida-1',
    'bank-access',
    'cuenta-raiz-y-credenciales-1',
    'identidad-federada-y-acceso-entre-cuentas-1',
    'cumplimiento-y-auditoria-1',
    'gobierno-multicuenta-1',
    'cifrado-y-proteccion-de-datos-1',
    'proteccion-de-red-y-aplicaciones-1',
    'deteccion-de-amenazas-1',
    'recursos-de-seguridad-1',
    'responsabilidad-compartida-2',
    'iam-fundamentos-2',
    'cuenta-raiz-y-credenciales-2',
    'identidad-federada-y-acceso-entre-cuentas-2',
    'cumplimiento-y-auditoria-2',
    'gobierno-multicuenta-2',
    'cifrado-y-proteccion-de-datos-2',
    'proteccion-de-red-y-aplicaciones-2',
    'deteccion-de-amenazas-2',
    'recursos-de-seguridad-2',
  ],
  tecnologico: [
    'formas-de-acceder-y-aprovisionar-1',
    'infraestructura-global-1',
    'computo-ec2-1',
    'escalado-y-balanceo-de-carga-1',
    'contenedores-y-serverless-1',
    'otros-servicios-de-computo-1',
    'clinic-resilience',
    'bases-de-datos-nosql-y-en-memoria-1',
    'redes-vpc-1',
    'conectividad-hibrida-1',
    'streaming-global',
    'almacenamiento-s3-ebs-efs-1',
    'cityhall-archive',
    'almacenamiento-hibrido-y-respaldo-1',
    'inteligencia-artificial-y-ml-1',
    'analitica-de-datos-1',
    'integracion-de-aplicaciones-1',
    'herramientas-de-desarrollo-y-frontend-1',
    'negocio-escritorios-e-iot-1',
    'monitoreo-y-operaciones-1',
    'formas-de-acceder-y-aprovisionar-2',
    'infraestructura-global-2',
    'computo-ec2-2',
    'escalado-y-balanceo-de-carga-2',
    'contenedores-y-serverless-2',
    'otros-servicios-de-computo-2',
    'bases-de-datos-relacionales-2',
    'bases-de-datos-nosql-y-en-memoria-2',
    'redes-vpc-2',
    'conectividad-hibrida-2',
    'dns-y-entrega-de-contenido-2',
    'almacenamiento-s3-ebs-efs-2',
    'clases-de-almacenamiento-s3-2',
    'almacenamiento-hibrido-y-respaldo-2',
    'inteligencia-artificial-y-ml-2',
    'analitica-de-datos-2',
    'integracion-de-aplicaciones-2',
    'herramientas-de-desarrollo-y-frontend-2',
    'negocio-escritorios-e-iot-2',
    'monitoreo-y-operaciones-2',
  ],
  mercado: [
    'modelos-de-compra-ec2-1',
    'precios-de-almacenamiento-y-transferencia-1',
    'startup-costs',
    'facturacion-consolidada-y-etiquetas-1',
    'planes-de-soporte-1',
    'recursos-tecnicos-y-partners-1',
    'modelos-de-compra-ec2-2',
    'precios-de-almacenamiento-y-transferencia-2',
    'herramientas-de-costos-2',
    'facturacion-consolidada-y-etiquetas-2',
    'planes-de-soporte-2',
    'recursos-tecnicos-y-partners-2',
  ],
};

/** Every mission file in content/ (one exported Mission per file), found at build time. */
const modules = import.meta.glob<Record<string, Mission>>('./content/**/*.ts', { eager: true });
const byId = new Map(Object.values(modules).flatMap((exports) => Object.values(exports)).map((m) => [m.id, m]));

/** Missions in campaign order; ids without a file yet are skipped. */
const MISSIONS: Mission[] = Object.values(CAMPAIGN_ORDER)
  .flat()
  .flatMap((id) => byId.get(id) ?? []);

/** Mission files whose id is not in the campaign order (should be none). */
export const UNPLANNED_MISSIONS = [...byId.keys()].filter((id) => !Object.values(CAMPAIGN_ORDER).flat().includes(id));

/** Adapter: missions written as typed data in the repository. */
export const staticMissionCatalog: MissionCatalog = {
  all: async () => [...MISSIONS],
  inBuilding: async (buildingId) => MISSIONS.filter((m) => m.buildingId === buildingId),
};
