import type { Locale } from '@/i18n/locales';
import type { Mission } from '../domain/Mission';
import type { MissionCatalog } from '../domain/MissionCatalog';

/**
 * Campaign order of each district (track): its missions are offered one after another in this order.
 * Generated from the theory topics (see odd/tasks/city-districts-plan.md): two missions per topic.
 */
export const CAMPAIGN_ORDER: Record<string, string[]> = {
  downtown: [
    'bakery-elasticity',
    'service-and-deployment-models-1',
    'well-architected-framework-1',
    'cloud-economics-1',
    'cloud-adoption-framework-1',
    'migration-strategies-1',
    'cloud-benefits-2',
    'service-and-deployment-models-2',
    'well-architected-framework-2',
    'cloud-economics-2',
    'cloud-adoption-framework-2',
    'migration-strategies-2',
  ],
  financial: [
    'shared-responsibility-1',
    'bank-access',
    'root-user-and-credentials-1',
    'federated-identity-and-cross-account-access-1',
    'compliance-and-auditing-1',
    'multi-account-governance-1',
    'encryption-and-data-protection-1',
    'network-and-application-protection-1',
    'threat-detection-1',
    'security-resources-1',
    'shared-responsibility-2',
    'iam-fundamentals-2',
    'root-user-and-credentials-2',
    'federated-identity-and-cross-account-access-2',
    'compliance-and-auditing-2',
    'multi-account-governance-2',
    'encryption-and-data-protection-2',
    'network-and-application-protection-2',
    'threat-detection-2',
    'security-resources-2',
  ],
  tech: [
    'access-and-provisioning-1',
    'global-infrastructure-1',
    'ec2-compute-1',
    'scaling-and-load-balancing-1',
    'containers-and-serverless-1',
    'other-compute-services-1',
    'clinic-resilience',
    'nosql-and-in-memory-databases-1',
    'vpc-networking-1',
    'hybrid-connectivity-1',
    'streaming-global',
    's3-ebs-efs-storage-1',
    'cityhall-archive',
    'hybrid-storage-and-backup-1',
    'ai-and-ml-1',
    'data-analytics-1',
    'application-integration-1',
    'developer-and-frontend-tools-1',
    'business-apps-desktops-and-iot-1',
    'monitoring-and-operations-1',
    'access-and-provisioning-2',
    'global-infrastructure-2',
    'ec2-compute-2',
    'scaling-and-load-balancing-2',
    'containers-and-serverless-2',
    'other-compute-services-2',
    'relational-databases-2',
    'nosql-and-in-memory-databases-2',
    'vpc-networking-2',
    'hybrid-connectivity-2',
    'dns-and-content-delivery-2',
    's3-ebs-efs-storage-2',
    's3-storage-classes-2',
    'hybrid-storage-and-backup-2',
    'ai-and-ml-2',
    'data-analytics-2',
    'application-integration-2',
    'developer-and-frontend-tools-2',
    'business-apps-desktops-and-iot-2',
    'monitoring-and-operations-2',
  ],
  market: [
    'ec2-purchase-options-1',
    'storage-and-transfer-pricing-1',
    'startup-costs',
    'consolidated-billing-and-tags-1',
    'support-plans-1',
    'technical-resources-and-partners-1',
    'ec2-purchase-options-2',
    'storage-and-transfer-pricing-2',
    'cost-tools-2',
    'consolidated-billing-and-tags-2',
    'support-plans-2',
    'technical-resources-and-partners-2',
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

/**
 * Translations live in translations/<locale>/ with the same ids, structure and right answers as the Spanish
 * originals; a mission without a translation yet is shown in Spanish.
 */
const translationModules = import.meta.glob<Record<string, Mission>>('./translations/*/**/*.ts', { eager: true });
const TRANSLATIONS: Record<string, Map<string, Mission>> = {};
for (const [path, exports] of Object.entries(translationModules)) {
  const locale = path.split('/')[2];
  TRANSLATIONS[locale] ??= new Map();
  for (const mission of Object.values(exports)) TRANSLATIONS[locale].set(mission.id, mission);
}

/** Adapter: missions written as typed data in the repository, in one language. */
export function staticMissionCatalog(locale: Locale): MissionCatalog {
  const missions = MISSIONS.map((mission) => TRANSLATIONS[locale]?.get(mission.id) ?? mission);
  return {
    all: async () => [...missions],
    inBuilding: async (buildingId) => missions.filter((m) => m.buildingId === buildingId),
  };
}
