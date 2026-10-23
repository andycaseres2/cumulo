import { defineMessages } from '../defineMessages';
import type { ExamDomainId } from '@/modules/exam/domain/ExamDomain';

type DomainText = Record<ExamDomainId, { title: string; description: string }>;

/**
 * Exam domains and task statements in each language. Spanish comes from the domain data; English uses the
 * wording of the official CLF-C02 exam guide.
 */
export const examMessages = defineMessages<{ domains: DomainText | null; tasks: Record<string, string> | null }>({
  es: { domains: null, tasks: null },
  en: {
    domains: {
      'cloud-concepts': { title: 'Cloud Concepts', description: 'Cloud benefits, design principles and migration strategies.' },
      'security-compliance': {
        title: 'Security and Compliance',
        description: 'Shared responsibility, identity and access management, and security services.',
      },
      'technology-services': {
        title: 'Cloud Technology and Services',
        description: 'Global infrastructure, compute, storage, databases and networking.',
      },
      'billing-pricing-support': {
        title: 'Billing, Pricing, and Support',
        description: 'Pricing models, cost management tools and support resources.',
      },
    },
    tasks: {
      '1.1': 'Define the benefits of the AWS Cloud',
      '1.2': 'Identify design principles of the AWS Cloud',
      '1.3': 'Understand the benefits of and strategies for migration to the AWS Cloud',
      '1.4': 'Understand concepts of cloud economics',
      '2.1': 'Understand the AWS shared responsibility model',
      '2.2': 'Understand AWS Cloud security, governance, and compliance concepts',
      '2.3': 'Identify AWS access management capabilities',
      '2.4': 'Identify components and resources for security',
      '3.1': 'Define methods of deploying and operating in the AWS Cloud',
      '3.2': 'Define the AWS global infrastructure',
      '3.3': 'Identify AWS compute services',
      '3.4': 'Identify AWS database services',
      '3.5': 'Identify AWS network services',
      '3.6': 'Identify AWS storage services',
      '3.7': 'Identify AWS artificial intelligence and machine learning (AI/ML) services and analytics services',
      '3.8': 'Identify services from other in-scope AWS service categories',
      '4.1': 'Compare AWS pricing models',
      '4.2': 'Understand resources for billing, budget, and cost management',
      '4.3': 'Identify AWS technical resources and AWS Support options',
    },
  },
});
