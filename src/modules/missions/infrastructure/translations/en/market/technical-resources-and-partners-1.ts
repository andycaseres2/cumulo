import type { Mission } from '../../../../domain/Mission';

/**
 * Estudio Contable Saldo: an accounting firm in Asunción migrating its accounting platform to AWS.
 * Practices the AWS Knowledge Center, AWS Prescriptive Guidance, AWS solutions architects
 * and AWS Professional Services versus AWS Support.
 */
export const technicalResourcesAndPartners1: Mission = {
  id: 'technical-resources-and-partners-1',
  track: 'market',
  topicSlug: 'technical-resources-and-partners',
  buildingId: 'accounting-firm',
  title: 'Clear books, help at hand',
  client: { name: 'Lucía Giménez', role: 'Managing Partner of Estudio Contable Saldo' },
  intro: [
    'Hi, come in. I’m Lucía Giménez, managing partner of Estudio Contable Saldo. From Asunción we handle the accounting and taxes of about two thousand Paraguayan companies.',
    'Our accounting platform lives on old servers in the basement, and this year we decided to move it to AWS. We have a small IT team, four people, who have never done a migration like this.',
    'Every time they have a question they lose days searching the internet, and if we make a mistake in the middle of tax filing season, two thousand clients won’t be able to file their taxes.',
    'Before spending on what we don’t need, I want to know what help AWS offers us and where to look for each thing. Can you give me a hand?',
  ],
  outro: {
    passed: [
      'Excellent. Now the team knows where to find quick answers and which guides to use to plan the migration.',
      'And now I know whom to ask for an architecture review and who can carry out the project with us. Thank you: at last, the books balance.',
    ],
    failed: [
      'Hmm... with these answers we’d keep going in circles, and tax season is right around the corner.',
      'Review the theory on technical resources and partners and come back whenever you like. We’ll be waiting with the mate ready.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'frequent-questions',
      prompt:
        'Let’s start with day-to-day stuff. My team keeps running into common problems, like billing or configuration questions, and wants official AWS answers to those frequent questions. Where do they look?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'whitepapers-faq',
          label: 'AWS Whitepapers & Guides',
          definition:
            'A collection of technical whitepapers, decision guides and reference architecture diagrams, written by AWS and the community.',
          explanation:
            'Whitepapers are for best practices and architecture; for quick answers to common, specific problems, the right resource is the Knowledge Center.',
          correct: false,
        },
        {
          id: 'knowledge-center',
          label: 'AWS Knowledge Center',
          definition:
            'Articles produced by an AWS team, with the AWS Official badge, which are now found within AWS re:Post.',
          explanation:
            'The Knowledge Center gives authoritative answers to the most frequent questions, for example about billing or configuration, exactly what the firm’s team needs.',
          correct: true,
        },
        {
          id: 'marketplace-faq',
          label: 'AWS Marketplace',
          definition:
            'A curated digital catalog to find, buy and deploy third-party software, data and services.',
          explanation:
            'AWS Marketplace is for buying third-party products; it doesn’t publish answers to frequent questions.',
          correct: false,
        },
        {
          id: 'license-manager-faq',
          label: 'AWS License Manager',
          definition:
            'A service to distribute, activate and track software licenses, even across accounts in an organization.',
          explanation:
            'AWS License Manager manages licenses; it doesn’t offer articles with answers to common problems.',
          correct: false,
        },
      ],
    },
    {
      id: 'migration-guides',
      prompt:
        'Now the migration. We want to plan it with resources from AWS experts: planning and implementation guides, and patterns with steps, architectures and code. Which resource do we use?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'repost-guides',
          label: 'AWS re:Post',
          definition:
            'A cloud knowledge service with questions and answers from the community and experts.',
          explanation:
            'AWS re:Post is useful for specific questions, but it isn’t a set of guides and patterns for planning a migration.',
          correct: false,
        },
        {
          id: 'marketplace-guides',
          label: 'AWS Marketplace',
          definition:
            'A catalog of third-party software, data and services, with charges that appear on the AWS bill.',
          explanation:
            'AWS Marketplace sells third-party products; it doesn’t publish migration guides or patterns.',
          correct: false,
        },
        {
          id: 'knowledge-center-guides',
          label: 'AWS Knowledge Center',
          definition:
            'Official AWS articles with answers to the most frequent questions about common problems.',
          explanation:
            'The Knowledge Center solves specific, frequent problems; it doesn’t offer patterns with steps, architectures and code for migrating.',
          correct: false,
        },
        {
          id: 'prescriptive-guidance',
          label: 'AWS Prescriptive Guidance',
          definition:
            'Resources from AWS experts to accelerate cloud adoption and modernization, organized into guides and patterns.',
          explanation:
            'AWS Prescriptive Guidance brings together planning and implementation guides and patterns with steps, architectures and code for migrations and modernizations.',
          correct: true,
        },
      ],
    },
    {
      id: 'architecture-review',
      prompt:
        'Before moving anything, I want an AWS technical advisor to review our architecture design with an AWS Well-Architected review. Who plays that role?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'solutions-architect',
          label: 'An AWS solutions architect',
          definition:
            'An AWS technical advisor who works with customers and partners in architecture design sessions.',
          explanation:
            'Solutions architects help design architectures, for example with AWS Well-Architected reviews, and if implementation is needed they can connect the firm with Professional Services or the APN.',
          correct: true,
        },
        {
          id: 'isv-review',
          label: 'An Independent Software Vendor (ISV)',
          definition:
            'A company that builds software that runs on AWS or integrates with AWS, and that can sell it in AWS Marketplace.',
          explanation:
            'An ISV is dedicated to building and selling its own software; it isn’t the AWS technical advisor who reviews your architecture.',
          correct: false,
        },
        {
          id: 'license-manager-review',
          label: 'AWS License Manager',
          definition:
            'A service that manages software licenses and their usage rights within an organization.',
          explanation:
            'AWS License Manager manages licenses; it doesn’t take part in designing or reviewing architectures.',
          correct: false,
        },
        {
          id: 'blogs-review',
          label: 'The AWS Blogs',
          definition:
            'AWS publications with announcements, use cases and tutorials organized by topic.',
          explanation:
            'The blogs are for news and hands-on examples, but they aren’t a person who reviews the firm’s design.',
          correct: false,
        },
      ],
    },
    {
      id: 'migration-project',
      prompt:
        'Last decision. The migration is big and we want an AWS team to carry it out with us and help us modernize the platform. My manager says opening cases with AWS Support is enough. What do we hire?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'support-cases-project',
          label: 'AWS Support, opening technical cases with a paid plan',
          definition:
            'AWS technical support that handles cases according to the plan you have, from Basic to Unified Operations.',
          explanation:
            'AWS Support handles cases according to the plan; it doesn’t carry out migration or modernization projects alongside the customer.',
          correct: false,
        },
        {
          id: 'whitepapers-project',
          label: 'AWS Whitepapers & Guides',
          definition:
            'Written material with best practices, decision guides and reference architectures.',
          explanation:
            'Whitepapers offer best practices in writing, but they aren’t a team that carries out the firm’s migration.',
          correct: false,
        },
        {
          id: 'professional-services',
          label: 'AWS Professional Services',
          definition:
            'An AWS team that works together with AWS Partners on migration, modernization, data and AI, and security projects.',
          explanation:
            'AWS Professional Services helps design, build, migrate and manage workloads, including large-scale migrations and modernization: it carries out projects, while Support handles cases.',
          correct: true,
        },
        {
          id: 'repost-project',
          label: 'AWS re:Post',
          definition:
            'A community question-and-answer service, with answers reviewed by experts.',
          explanation:
            'On AWS re:Post the community answers questions, but nobody carries out the firm’s migration project.',
          correct: false,
        },
      ],
    },
  ],
};
