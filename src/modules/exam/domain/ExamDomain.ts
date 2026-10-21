/** Shared kernel: the four content domains of the AWS Certified Cloud Practitioner exam (CLF-C02). */
export const EXAM_DOMAIN_IDS = [
  'cloud-concepts',
  'security-compliance',
  'technology-services',
  'billing-pricing-support',
] as const;

export type ExamDomainId = (typeof EXAM_DOMAIN_IDS)[number];

export interface ExamDomain {
  id: ExamDomainId;
  /** Position in the exam guide, starting at 1. */
  order: number;
  title: string;
  /** Percentage of scored content in the exam. */
  weight: number;
  description: string;
}

export const EXAM_DOMAINS: readonly ExamDomain[] = [
  {
    id: 'cloud-concepts',
    order: 1,
    title: 'Conceptos de la nube',
    weight: 24,
    description: 'Beneficios de la nube, principios de diseño y estrategias de migración.',
  },
  {
    id: 'security-compliance',
    order: 2,
    title: 'Seguridad y cumplimiento',
    weight: 30,
    description: 'Responsabilidad compartida, gestión de identidades y accesos, y servicios de seguridad.',
  },
  {
    id: 'technology-services',
    order: 3,
    title: 'Tecnología y servicios de la nube',
    weight: 34,
    description: 'Infraestructura global, cómputo, almacenamiento, bases de datos y redes.',
  },
  {
    id: 'billing-pricing-support',
    order: 4,
    title: 'Facturación, precios y soporte',
    weight: 12,
    description: 'Modelos de precios, herramientas de gestión de costos y recursos de soporte.',
  },
];

export function findExamDomain(id: string): ExamDomain | undefined {
  return EXAM_DOMAINS.find((domain) => domain.id === id);
}
