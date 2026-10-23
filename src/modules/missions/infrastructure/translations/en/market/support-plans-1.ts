import type { Mission } from '../../../../domain/Mission';

/**
 * Exportadora Café Andino: a coffee exporter in Manizales taking its orders platform to production on AWS.
 * Practices free account and billing support in Basic, the minimum production plan (Business Support+),
 * the discontinued legacy plans, AWS Support Center cases and the AWS Health Dashboard.
 */
export const supportPlans1: Mission = {
  id: 'support-plans-1',
  track: 'market',
  topicSlug: 'support-plans',
  buildingId: 'coffee-exporter',
  title: 'Coffee with support',
  client: { name: 'Valentina Ospina', role: 'Head of Technology at Exportadora Café Andino' },
  intro: [
    'Hi, great to see you. I’m Valentina Ospina, head of technology at Exportadora Café Andino. From Manizales we buy coffee from hundreds of farms in the Coffee Region and ship it to roasters in Europe and Asia.',
    'We built an ordering platform on AWS where our buyers reserve lots and track their shipments. Until now it was a pilot, and the documentation and forums were enough for us.',
    'But in a month the platform goes into production, right before the harvest. If it goes down in the middle of ordering season, we lose contracts that took us years to win, and today I don’t even know whom we’d call.',
    'I need to understand what AWS support we have, which one suits us and how to use it. Will you help us get ready before the harvest?',
  ],
  outro: {
    passed: [
      'Perfect. Now I know what the plan we have includes, which one to sign up for in production and where to open a case if something fails.',
      'And with the AWS Health Dashboard we’ll know when an AWS event affects us before the buyers call. Thank you: we’ll welcome this harvest with peace of mind. I owe you a good cup of coffee.',
    ],
    failed: [
      'Hmm... with these answers I don’t dare go to production. I’m still not clear on what support we need.',
      'Review the theory on support plans and come back whenever you like. The harvest won’t wait, but I will.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'billing-question',
      prompt:
        'Let’s start with something that has me confused: today we have the Basic Support plan and a charge I don’t understand showed up on the AWS bill. What do I do to get it explained?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'upgrade-for-billing',
          label: 'Sign up for AWS Business Support+, because Basic doesn’t include billing questions',
          definition:
            'A paid plan with AI-powered assistance, 24/7 access to AWS experts and technical support by phone, web, chat and email.',
          explanation:
            'There’s no need to change plans for a billing question: Basic Support already includes 24/7 access to account and billing customer service.',
          correct: false,
        },
        {
          id: 'customer-service',
          label: 'Contact AWS account and billing customer service',
          definition:
            'The AWS channel that handles questions about the account and the bill, available in every support plan.',
          explanation:
            'Account and billing support is free in every plan, including Basic Support, so you can ask to have the charge explained at no additional cost.',
          correct: true,
        },
        {
          id: 'trust-safety-billing',
          label: 'Report it to the AWS Trust & Safety team',
          definition:
            'The AWS team that receives reports of AWS resources used for abusive activities, such as spam or port scanning.',
          explanation:
            'AWS Trust & Safety handles abuse reports, not questions about a charge on the exporter’s bill.',
          correct: false,
        },
        {
          id: 'trusted-advisor-billing',
          label: 'Review it with the AWS Trusted Advisor checks',
          definition:
            'A service that inspects your environment and recommends best-practice improvements in categories such as cost, security and service limits.',
          explanation:
            'Trusted Advisor recommends improvements for your environment, but it doesn’t explain why a specific charge appeared on your bill.',
          correct: false,
        },
      ],
    },
    {
      id: 'production-plan',
      prompt:
        'Now the important part. Once the platform is in production I want 24/7 technical support and a response in under 30 minutes if it goes down in the middle of the harvest. What is the minimum plan AWS recommends for production?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'basic-production',
          label: 'Basic Support',
          definition:
            'The plan included with every account, with customer service, documentation, AWS re:Post and the basic Trusted Advisor checks.',
          explanation:
            'Basic Support doesn’t include technical support cases, so it doesn’t cover the platform going down in production.',
          correct: false,
        },
        {
          id: 'developer-production',
          label: 'Developer Support',
          definition:
            'A paid support plan aimed at those experimenting with or testing workloads on AWS.',
          explanation:
            'Developer Support is being discontinued on January 1, 2027 and isn’t part of the current plans; its customers can move to Business Support+.',
          correct: false,
        },
        {
          id: 'onramp-production',
          label: 'Enterprise On-Ramp',
          definition:
            'A paid support plan positioned between Business and Enterprise in AWS’s previous list of plans.',
          explanation:
            'Enterprise On-Ramp is being discontinued on January 1, 2027 and its customers are being migrated to Enterprise Support during 2026; it isn’t part of the current plans.',
          correct: false,
        },
        {
          id: 'business-plus',
          label: 'AWS Business Support+',
          definition:
            'A paid plan with AI-powered assistance, 24/7 access to AWS experts, all Trusted Advisor checks, the AWS Support API and the AWS Health API.',
          explanation:
            'Business Support+ is the recommended minimum for production: it provides 24/7 technical support and its response target for a business-critical outage is under 30 minutes.',
          correct: true,
        },
      ],
    },
    {
      id: 'open-case',
      prompt:
        'We signed up for Business Support+. If something fails on a Saturday night, the on-call engineer has to open a case, mark how severe it is and follow it up. Where does he do that?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'support-center',
          label: 'In AWS Support Center',
          definition:
            'The AWS console where support cases are created and managed, with AI-assisted troubleshooting.',
          explanation:
            'In AWS Support Center the engineer creates the case, chooses its severity and follows it up. He needs to be the root user or have IAM permissions to open it.',
          correct: true,
        },
        {
          id: 'repost-case',
          label: 'On AWS re:Post',
          definition:
            'A community question-and-answer service, with answers reviewed by experts.',
          explanation:
            'On AWS re:Post you ask the community questions; you don’t open support cases with a severity for the exporter’s account there.',
          correct: false,
        },
        {
          id: 'health-case',
          label: 'In the AWS Health Dashboard',
          definition:
            'A dashboard that shows the health of AWS services and the events affecting the resources in your account.',
          explanation:
            'The AWS Health Dashboard reports AWS events, but it isn’t used to create or follow up on support cases.',
          correct: false,
        },
        {
          id: 'trust-safety-center-case',
          label: 'In the AWS Trust & Safety Center',
          definition:
            'A space on AWS re:Post that explains how to report abuse of AWS resources and how to respond to that team’s notices.',
          explanation:
            'The AWS Trust & Safety Center deals with abuse reports; a platform outage is handled with a support case.',
          correct: false,
        },
      ],
    },
    {
      id: 'aws-events',
      prompt:
        'One last thing. Last year AWS did scheduled maintenance and we found out late. Where can we see the health of AWS services and the events affecting our account?',
      topicSlug: 'support-plans',
      examTasks: ['4.3'],
      options: [
        {
          id: 'trusted-advisor-events',
          label: 'In AWS Trusted Advisor',
          definition:
            'A service that inspects your environment and recommends improvements in six categories, such as cost optimization and fault tolerance.',
          explanation:
            'Trusted Advisor checks your configuration against best practices; it doesn’t report AWS incidents or scheduled maintenance.',
          correct: false,
        },
        {
          id: 'support-center-events',
          label: 'In AWS Support Center',
          definition:
            'The console where technical and account and billing support cases are created and managed.',
          explanation:
            'AWS Support Center manages your support cases; to see the AWS events affecting your account you use AWS Health.',
          correct: false,
        },
        {
          id: 'health-dashboard',
          label: 'In the AWS Health Dashboard',
          definition:
            'The AWS Health dashboard that shows service health and the events, such as incidents or scheduled maintenance, that affect your account.',
          explanation:
            'The AWS Health Dashboard is free and requires no setup for all customers, and it shows the events affecting your resources, such as scheduled maintenance.',
          correct: true,
        },
        {
          id: 'repost-events',
          label: 'On AWS re:Post',
          definition:
            'A cloud knowledge service with questions and answers from the community and experts.',
          explanation:
            'On AWS re:Post you can ask the community, but it doesn’t show the AWS events that specifically affect your account.',
          correct: false,
        },
      ],
    },
  ],
};
