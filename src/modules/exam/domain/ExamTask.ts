import type { ExamDomainId } from './ExamDomain';

/** A task statement of the official CLF-C02 exam guide (e.g. "3.6"). */
export interface ExamTask {
  id: string;
  domainId: ExamDomainId;
  title: string;
}

/** Source: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html */
export const EXAM_TASKS: readonly ExamTask[] = [
  { id: '1.1', domainId: 'cloud-concepts', title: 'Definir los beneficios de la nube de AWS' },
  { id: '1.2', domainId: 'cloud-concepts', title: 'Identificar los principios de diseño de la nube de AWS' },
  { id: '1.3', domainId: 'cloud-concepts', title: 'Comprender los beneficios y las estrategias de migración a la nube de AWS' },
  { id: '1.4', domainId: 'cloud-concepts', title: 'Comprender los conceptos de la economía de la nube' },
  { id: '2.1', domainId: 'security-compliance', title: 'Comprender el modelo de responsabilidad compartida de AWS' },
  { id: '2.2', domainId: 'security-compliance', title: 'Comprender la seguridad, la gobernanza y el cumplimiento en la nube de AWS' },
  { id: '2.3', domainId: 'security-compliance', title: 'Identificar las capacidades de gestión de acceso de AWS' },
  { id: '2.4', domainId: 'security-compliance', title: 'Identificar los componentes y recursos de seguridad' },
  { id: '3.1', domainId: 'technology-services', title: 'Definir los métodos para implementar y operar en la nube de AWS' },
  { id: '3.2', domainId: 'technology-services', title: 'Definir la infraestructura global de AWS' },
  { id: '3.3', domainId: 'technology-services', title: 'Identificar los servicios de cómputo de AWS' },
  { id: '3.4', domainId: 'technology-services', title: 'Identificar los servicios de bases de datos de AWS' },
  { id: '3.5', domainId: 'technology-services', title: 'Identificar los servicios de red de AWS' },
  { id: '3.6', domainId: 'technology-services', title: 'Identificar los servicios de almacenamiento de AWS' },
  { id: '3.7', domainId: 'technology-services', title: 'Identificar los servicios de IA/ML y de analítica de AWS' },
  { id: '3.8', domainId: 'technology-services', title: 'Identificar servicios de otras categorías incluidas en el examen' },
  { id: '4.1', domainId: 'billing-pricing-support', title: 'Comparar los modelos de precios de AWS' },
  { id: '4.2', domainId: 'billing-pricing-support', title: 'Comprender los recursos de facturación, presupuestos y gestión de costos' },
  { id: '4.3', domainId: 'billing-pricing-support', title: 'Identificar los recursos técnicos y las opciones de AWS Support' },
];

export function findExamTask(id: string): ExamTask | undefined {
  return EXAM_TASKS.find((task) => task.id === id);
}
