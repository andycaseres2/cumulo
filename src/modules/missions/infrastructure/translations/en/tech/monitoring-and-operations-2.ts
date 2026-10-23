import type { Mission } from '../../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a gaming store in Guatemala City getting its online shop ready for its biggest sale of the year.
 * Practices AWS Compute Optimizer, Service Quotas, AWS Trusted Advisor checks by support plan and AWS License Manager.
 */
export const monitoringAndOperations2: Mission = {
  id: 'monitoring-and-operations-2',
  track: 'tech',
  topicSlug: 'monitoring-and-operations',
  buildingId: 'gaming-store',
  title: 'Boss Level: The Big Sale',
  client: { name: 'Lucía Batz', role: 'Owner of Tienda Gamer Pixel' },
  intro: [
    'Hey there, player! I\'m Lucía Batz, owner of Tienda Gamer Pixel. We sell consoles, games and peripherals here and through our online store, which serves all of Guatemala City.',
    'The online store has been running on AWS for a year. It works, but the bill goes up every month, and I suspect we\'re paying for servers bigger than we need.',
    'Also, during the last sale we tried to launch more instances and AWS wouldn\'t let us because we hit a limit. And the inventory program uses Microsoft licenses that nobody keeps track of.',
    'In a month, the big year-end sale arrives, and it\'s half of our sales. I can\'t afford a game over. Will you play on my team?',
  ],
  outro: {
    passed: [
      'Level cleared! The servers are just the right size, the instance limit is already adjusted, and the licenses are under control.',
      'And now I know which Trusted Advisor checks I get with my plan. Thank you: there\'s a free controller waiting for you at the counter.',
    ],
    failed: [
      'Oops... with these decisions, the big sale could end in game over.',
      'Review monitoring and operations theory and come back whenever you like. You can always retry the level.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'oversized-servers',
      prompt:
        'Let\'s start with the bill. I suspect the online store\'s EC2 instances are oversized. I want sizing recommendations based on how we actually use them. Which service do we turn on?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-quotas-rightsizing',
          label: 'Service Quotas',
          definition:
            'A service to view the AWS service quotas in the account and request increases when they are adjustable.',
          explanation:
            'Service Quotas shows the account\'s limits. It doesn\'t analyze whether an instance is bigger than it needs to be.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'AWS Compute Optimizer',
          definition:
            'A service that analyzes the configuration and usage metrics of resources to recommend their size and detect idle resources.',
          explanation:
            'Compute Optimizer uses the actual usage metrics of the EC2 instances to tell you whether they are optimal and how to reduce costs. You have to opt in to turn it on.',
          correct: true,
        },
        {
          id: 'license-rightsizing',
          label: 'AWS License Manager',
          definition:
            'A service that manages software licenses from vendors such as Microsoft, SAP, Oracle and IBM on AWS and on premises.',
          explanation:
            'License Manager tracks software licenses. It doesn\'t evaluate instance sizes.',
          correct: false,
        },
        {
          id: 'cloudtrail-rightsizing',
          label: 'AWS CloudTrail',
          definition:
            'A service that records actions taken in the account by users, roles and services as events.',
          explanation:
            'CloudTrail tells you who did what and when. It doesn\'t provide rightsizing recommendations.',
          correct: false,
        },
      ],
    },
    {
      id: 'instance-limit',
      prompt:
        'During the last sale we tried to launch more instances, and the account hit the maximum allowed for that resource. Before the big sale, I want to see that limit and request an increase, all from one place. What do I use?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'systems-manager-limit',
          label: 'AWS Systems Manager',
          definition:
            'A service to operate nodes at scale with patching, remote commands and secure connections to the servers.',
          explanation:
            'Systems Manager is for operating servers that already exist. It doesn\'t manage the account\'s service limits.',
          correct: false,
        },
        {
          id: 'health-limit',
          label: 'AWS Health Dashboard',
          definition:
            'A dashboard that shows the health of AWS services and the events affecting the account.',
          explanation:
            'Health Dashboard reports on AWS events and outages. It doesn\'t show quotas or let you request increases.',
          correct: false,
        },
        {
          id: 'compute-optimizer-limit',
          label: 'AWS Compute Optimizer',
          definition:
            'A service that recommends the right size for resources such as EC2 instances, EBS volumes and Lambda functions.',
          explanation:
            'Compute Optimizer recommends sizes based on usage. It doesn\'t let you view quotas or request increases.',
          correct: false,
        },
        {
          id: 'service-quotas',
          label: 'Service Quotas',
          definition:
            'A service to view and manage AWS service quotas, or limits, from one place and request increases.',
          explanation:
            'Service Quotas shows the maximum value allowed for each resource and lets you request an increase when the quota is adjustable. Some quotas are per account and others are per Region.',
          correct: true,
        },
      ],
    },
    {
      id: 'trusted-advisor-basic',
      prompt:
        'A friend recommended AWS Trusted Advisor to review costs, security and fault tolerance. We\'re on the Basic Support plan. Which Trusted Advisor checks do we get with that plan?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'basic-subset',
          label: 'All Service limits checks and selected Security and Fault tolerance checks',
          definition:
            'The subset of Trusted Advisor checks that corresponds to a given support plan.',
          explanation:
            'With Basic Support, the store gets all Service limits checks and some Security and Fault tolerance checks. The full set and the API require AWS Business Support+, AWS Enterprise Support or AWS Unified Operations.',
          correct: true,
        },
        {
          id: 'all-checks',
          label: 'All checks in all six categories, including the Trusted Advisor API',
          definition:
            'Access to the full set of Trusted Advisor checks and its API.',
          explanation:
            'This is a classic trap: the full set and the API require AWS Business Support+, AWS Enterprise Support or AWS Unified Operations, not the Basic plan.',
          correct: false,
        },
        {
          id: 'cost-only',
          label: 'Only the Cost optimization checks',
          definition:
            'Trusted Advisor checks that look for ways to reduce spending in the account.',
          explanation:
            'The Basic plan includes the Service limits checks and a selection of Security and Fault tolerance checks; the Cost optimization checks are part of the full set, which requires a higher plan.',
          correct: false,
        },
        {
          id: 'operational-only',
          label: 'Only the Operational Excellence checks',
          definition:
            'Trusted Advisor checks on operational best practices for resources.',
          explanation:
            'With Basic Support, what\'s included is all of Service limits and a selection of Security and Fault tolerance, not the Operational Excellence category.',
          correct: false,
        },
      ],
    },
    {
      id: 'microsoft-licenses',
      prompt:
        'Last question. The inventory program runs on servers with Microsoft licenses that we brought ourselves, and nobody knows how many we use. I want to set limits so we don\'t go over and don\'t breach the contract. Which service do we use?',
      topicSlug: 'monitoring-and-operations',
      examTasks: ['3.1'],
      options: [
        {
          id: 'service-catalog-licenses',
          label: 'AWS Service Catalog',
          definition:
            'A service for creating portfolios of approved IT products that users launch through self-service.',
          explanation:
            'Service Catalog controls which approved products can be launched. It doesn\'t keep track of Microsoft license consumption.',
          correct: false,
        },
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'A service that manages software licenses from vendors such as Microsoft, SAP, Oracle and IBM, with consumption rules.',
          explanation:
            'With consumption rules, License Manager sets limits to prevent license non-compliance and overages, and helps you take advantage of the BYOL model with the licenses the store already owns.',
          correct: true,
        },
        {
          id: 'cloudwatch-licenses',
          label: 'Amazon CloudWatch',
          definition:
            'A monitoring service with metrics, logs, dashboards and alarms about resources and applications.',
          explanation:
            'CloudWatch measures server performance. It doesn\'t manage software licenses or their consumption rules.',
          correct: false,
        },
        {
          id: 'marketplace-licenses',
          label: 'AWS Marketplace',
          definition:
            'A digital catalog of third-party software that you can find, buy and use on AWS.',
          explanation:
            'Marketplace is for buying third-party software. It doesn\'t control the consumption of the Microsoft licenses the store brought.',
          correct: false,
        },
      ],
    },
  ],
};
