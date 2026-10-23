import type { Mission } from '../../../../domain/Mission';

/**
 * Distribuidora Norte: a food distributor in Monterrey whose warehouse system becomes critical for the business.
 * Practices the designated TAM in Enterprise Support, Unified Operations for mission-critical workloads,
 * reporting abuse to AWS Trust & Safety and AWS Trusted Advisor.
 */
export const supportPlans2: Mission = {
  id: 'support-plans-2',
  track: 'market',
  topicSlug: 'support-plans',
  buildingId: 'distributor',
  title: 'Warehouses without blackouts',
  client: { name: 'Rodrigo Treviño', role: 'Director of Operations at Distribuidora Norte' },
  intro: [
    'I’m glad you made it. I’m Rodrigo Treviño, director of operations at Distribuidora Norte. From Monterrey we supply food to more than two thousand stores in northern Mexico.',
    'Everything goes through our warehouse system on AWS: which truck leaves, what load it carries and which store it goes to. Today we have Business Support+ and it has worked well for us.',
    'But the system has grown so much that, if it stops for an hour, stores run out of milk and bread. The board no longer wants to just put out fires: it wants to prevent them and have AWS closer at hand.',
    'I have to present a support proposal to them next week. Will you help me put it together?',
  ],
  outro: {
    passed: [
      'Excellent. Now I’m clear on which plan gives us a TAM, which one covers the mission-critical warehouses and whom to notify when someone commits abuse from AWS.',
      'With Trusted Advisor reviewing our environment, the board will see we went from putting out fires to preventing them. Thank you: the trucks keep leaving on time thanks to you.',
    ],
    failed: [
      'Hmm... I don’t think the board will approve this proposal. Some decisions don’t quite convince me.',
      'Review the theory on support plans and come back. The warehouses will still be waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'designated-tam',
      prompt:
        'The first thing the board asks for: a designated AWS technical advisor who knows our account and leads Well-Architected reviews. Among the current plans, which is the first one that includes it?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'business-plus-tam',
          label: 'AWS Business Support+',
          definition:
            'A paid plan with AI-powered assistance, 24/7 access to AWS experts, all Trusted Advisor checks and the AWS Health API.',
          explanation:
            'It’s the plan they already have. It gives 24/7 access to experts, but it doesn’t include a designated Technical Account Manager (TAM).',
          correct: false,
        },
        {
          id: 'basic-tam',
          label: 'Basic Support',
          definition:
            'The plan included with every account, with account and billing customer service, documentation and AWS re:Post.',
          explanation:
            'Basic Support includes no technical support or any designated contact, so it doesn’t provide an advisor who knows the account.',
          correct: false,
        },
        {
          id: 'enterprise-tam',
          label: 'AWS Enterprise Support',
          definition:
            'A paid plan for business-critical workloads, with proactive services, workshops, AWS GameDays and 24/7 access to AWS Security Incident Response.',
          explanation:
            'The designated Technical Account Manager (TAM), who knows the account and leads Well-Architected reviews, starts with Enterprise Support.',
          correct: true,
        },
        {
          id: 'developer-tam',
          label: 'Developer Support',
          definition:
            'A paid support plan aimed at those experimenting with or testing workloads on AWS.',
          explanation:
            'Developer Support is being discontinued on January 1, 2027 and isn’t part of the current plans; among those, the designated TAM starts with Enterprise Support.',
          correct: false,
        },
      ],
    },
    {
      id: 'mission-critical',
      prompt:
        'Now the warehouse system becomes mission-critical. The board demands a response in under 5 minutes for a critical outage, Incident Management Engineers and 24/7 security and performance monitoring. Which plan meets that?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'unified-operations',
          label: 'AWS Unified Operations',
          definition:
            'A paid plan for mission-critical enterprise operations, with designated specialist engineers working in a follow-the-sun model.',
          explanation:
            'Unified Operations adds Incident Management Engineers with a response in under 5 minutes and 24/7 security and performance monitoring, exactly what the board is asking for.',
          correct: true,
        },
        {
          id: 'enterprise-critical',
          label: 'AWS Enterprise Support',
          definition:
            'A paid plan with a designated TAM, proactive services and 24/7 access to AWS Security Incident Response engineers.',
          explanation:
            'Enterprise Support aims to respond in under 15 minutes for critical outages and doesn’t include the mission-critical 24/7 monitoring being required.',
          correct: false,
        },
        {
          id: 'business-plus-critical',
          label: 'AWS Business Support+',
          definition:
            'A paid plan with AI-powered assistance, 24/7 access to AWS experts, the AWS Support API and the AWS Health API.',
          explanation:
            'Business Support+ is the minimum for production, with a response target of under 30 minutes; it falls far short of what the board demands.',
          correct: false,
        },
        {
          id: 'onramp-critical',
          label: 'Enterprise On-Ramp',
          definition:
            'A paid support plan positioned between Business and Enterprise in AWS’s previous list of plans.',
          explanation:
            'Enterprise On-Ramp is being discontinued on January 1, 2027 and its customers are being migrated to Enterprise Support during 2026; it isn’t part of the current plans.',
          correct: false,
        },
      ],
    },
    {
      id: 'report-abuse',
      prompt:
        'Another strange issue: our firewall detects port scans coming from resources hosted on AWS that aren’t ours. Whom do we report it to?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'support-case-abuse',
          label: 'To AWS Support, by opening a technical case in AWS Support Center',
          definition:
            'Support cases created and managed from the AWS Support Center console, with a chosen severity.',
          explanation:
            'AWS Support handles cases about your own account, but it doesn’t manage abuse reports about AWS resources.',
          correct: false,
        },
        {
          id: 'trusted-advisor-abuse',
          label: 'To AWS Trusted Advisor',
          definition:
            'A service that inspects your environment and recommends best-practice improvements in six categories.',
          explanation:
            'Trusted Advisor reviews your own environment; it can’t be used to report what other people’s resources are doing.',
          correct: false,
        },
        {
          id: 'health-abuse',
          label: 'To the AWS Health Dashboard',
          definition:
            'A dashboard that shows the health of AWS services and the events affecting the resources in your account.',
          explanation:
            'The AWS Health Dashboard reports AWS events that affect you; it doesn’t receive abuse reports.',
          correct: false,
        },
        {
          id: 'trust-safety',
          label: 'To the AWS Trust & Safety team, using the abuse report form',
          definition:
            'The AWS team that receives reports of AWS resources used for spam, port scanning, DDoS attacks or intrusion attempts.',
          explanation:
            'Port scanning from AWS resources is reported to AWS Trust & Safety using its form; you don’t even need an AWS account to do it.',
          correct: true,
        },
      ],
    },
    {
      id: 'best-practice-checks',
      prompt:
        'Finally, the board wants to be preventive: detect idle or underutilized resources that generate unnecessary spending and review things like the root user’s MFA. Which service inspects our environment and gives us those recommendations?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'repost-checks',
          label: 'AWS re:Post',
          definition:
            'A cloud knowledge service with community questions and answers, reviewed by experts.',
          explanation:
            'On AWS re:Post the community answers questions, but nobody inspects the distributor’s resources.',
          correct: false,
        },
        {
          id: 'trusted-advisor',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that inspects your environment and recommends improvements in Cost optimization, Performance, Security, Fault tolerance, Service limits and Operational Excellence.',
          explanation:
            'Trusted Advisor detects idle or underutilized resources and reviews security, such as the root user’s MFA. With a paid plan, like the one they’ll have, they get access to all of its checks.',
          correct: true,
        },
        {
          id: 'health-checks',
          label: 'AWS Health Dashboard',
          definition:
            'The AWS Health dashboard that shows AWS incidents and scheduled maintenance affecting your account.',
          explanation:
            'The AWS Health Dashboard alerts you to AWS events, but it doesn’t review your configuration or recommend savings.',
          correct: false,
        },
        {
          id: 'support-center-checks',
          label: 'AWS Support Center',
          definition:
            'The console where support cases are created and managed and their severity is chosen.',
          explanation:
            'AWS Support Center is for opening and following up on cases; it doesn’t inspect the environment looking for improvements.',
          correct: false,
        },
      ],
    },
  ],
};
