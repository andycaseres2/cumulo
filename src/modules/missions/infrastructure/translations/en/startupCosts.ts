import type { Mission } from '../../../domain/Mission';

/**
 * Startup Hub: a fast-growing startup whose AWS bill tripled and nobody knows why.
 * Practices AWS Cost Explorer, AWS Budgets, cost allocation tags, rightsizing and Spot Instances.
 */
export const startupCosts: Mission = {
  id: 'startup-costs',
  track: 'market',
  topicSlug: 'cost-tools',
  buildingId: 'startup',
  title: 'The bill nobody understands',
  client: { name: 'Valeria Ríos', role: 'CEO of Startup Hub' },
  intro: [
    'I’m so glad you came! I’m Valeria Ríos, CEO of Startup Hub. We’re a startup from Santiago, and this year we went from eight to forty people.',
    'We grew so fast that every team started launching its own servers on AWS. Some turn them on for a test and forget to turn them off.',
    'This month our AWS bill tripled. Nobody warned us before it happened and, when I asked in the meeting, no team could say how much it spends.',
    'Our investors want to see that we have costs under control. I don’t want to slow the teams down, but I need to understand and organize this spending. Will you help me?',
  ],
  outro: {
    passed: [
      'Amazing! Now I know where the money goes, I get alerts before going over, and every team sees its own spending thanks to the tags.',
      'With right-sized servers and Spot for the nightly jobs, the next investor meeting is going to be very different. Thank you!',
    ],
    failed: [
      'Hmm... I’m still not clear on how we’re going to control the bill. Some of these decisions don’t convince me.',
      'Review the cost theory calmly and come back whenever you like. I’ll be waiting with a coffee!',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'analyze-spend',
      prompt:
        'First things first: I want to see which services our money goes to and how spending changed month by month, to understand why it tripled. Which tool do I use?',
      topicSlug: 'cost-tools',
      examTasks: ['4.2'],
      options: [
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition: 'A free web tool to create cost estimates for AWS services before you build a solution.',
          explanation:
            'Pricing Calculator estimates how much something that doesn’t exist yet will cost. Valeria needs to analyze what she already spent, not estimate a new architecture.',
          correct: false,
        },
        {
          id: 'cost-explorer',
          label: 'AWS Cost Explorer',
          definition:
            'A tool to view and analyze costs and usage, with up to 13 months of history, forecasts and filters by service, account or tag.',
          explanation:
            'Correct. Cost Explorer shows spending grouped by service and how it evolves over time, exactly what you need to find out what pushed the bill up.',
          correct: true,
        },
        {
          id: 'budgets',
          label: 'AWS Budgets',
          definition: 'A service to set cost or usage budgets and receive alerts when spending approaches or exceeds a threshold.',
          explanation:
            'Budgets is for warning you before you go over, but it isn’t designed to analyze history and find which service drove up spending.',
          correct: false,
        },
        {
          id: 'trusted-advisor',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that inspects your environment and recommends best practices in categories such as cost optimization, security and performance.',
          explanation:
            'Trusted Advisor gives general recommendations about your environment, but it doesn’t show spending by service over the months the way Cost Explorer does.',
          correct: false,
        },
      ],
    },
    {
      id: 'budget-alerts',
      prompt:
        'Now I understand what happened. Next, I never want the bill to surprise me again: I need an email alert before we go over the monthly budget. What do I use?',
      topicSlug: 'cost-tools',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer',
          label: 'AWS Cost Explorer',
          definition:
            'A tool to view and analyze costs and usage, with up to 13 months of history, forecasts and filters by service, account or tag.',
          explanation:
            'Cost Explorer is for analyzing spending and viewing forecasts, but budget threshold alerts are set up in AWS Budgets. Confusing a forecast with an alert is a classic exam trap.',
          correct: false,
        },
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition: 'A free web tool to create cost estimates for AWS services before you build a solution.',
          explanation:
            'Pricing Calculator helps plan an estimated spend, but it doesn’t watch the account’s actual spending or warn you when it nears the limit.',
          correct: false,
        },
        {
          id: 'cur',
          label: 'AWS Cost and Usage Report',
          definition:
            'The most comprehensive set of cost and usage data, delivered as files to an Amazon S3 bucket for detailed analysis.',
          explanation:
            'The CUR delivers very detailed data for analysis, but it doesn’t send alerts. Valeria needs an automatic alert, not more files to go through.',
          correct: false,
        },
        {
          id: 'budgets',
          label: 'AWS Budgets',
          definition: 'A service to set cost or usage budgets and receive alerts when spending approaches or exceeds a threshold.',
          explanation:
            'Exactly. A cost budget can alert on actual or forecasted spending, by email or through Amazon SNS, before the bill skyrockets.',
          correct: true,
        },
      ],
    },
    {
      id: 'cost-per-team',
      prompt:
        'In the meeting nobody knew how much their team spends. All the resources are in the same account. How can I see each team’s spending in Cost Explorer?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-allocation-tags',
          label: 'Tag the resources and activate those tags as cost allocation tags',
          definition:
            'Cost allocation tags are key-value pairs, such as Team = payments, that you activate in Billing and Cost Management to organize your costs.',
          explanation:
            'Correct. With a tag like Team activated in the billing console, Cost Explorer can filter and group spending by team.',
          correct: true,
        },
        {
          id: 'tags-not-activated',
          label: 'Tag the resources and wait for them to show up in Cost Explorer on their own',
          definition: 'Assigning tags to resources without activating them as cost allocation tags in the billing console.',
          explanation:
            'Tagging is the first step, but tags must be activated in Billing and Cost Management before they appear in Cost Explorer or in reports.',
          correct: false,
        },
        {
          id: 'consolidated-billing',
          label: 'Turn on AWS Organizations consolidated billing',
          definition:
            'An AWS Organizations feature that combines several accounts into a single bill paid by the management account.',
          explanation:
            'Consolidated billing combines the bills of several accounts, but Startup Hub has everything in a single account: on its own it doesn’t split spending by team.',
          correct: false,
        },
        {
          id: 'pricing-estimates',
          label: 'Create one estimate per team in AWS Pricing Calculator',
          definition: 'A free web tool to create cost estimates and group them according to your architecture.',
          explanation:
            'Estimates show what something could cost, not what each team actually spent. Valeria needs real data from the bill.',
          correct: false,
        },
      ],
    },
    {
      id: 'rightsizing',
      prompt:
        'Now I see that many big servers sit almost idle all day. The teams picked the size "just in case." How do we adjust that without guessing?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'bigger-instances',
          label: 'Switch to even bigger instances to be safe',
          definition: 'Vertical scaling: replacing a server with another one that has more CPU and memory.',
          explanation:
            'If the servers are already almost idle, making them bigger only increases waste. Valeria’s problem is overprovisioning.',
          correct: false,
        },
        {
          id: 'reserved-oversized',
          label: 'Buy Reserved Instances for those same servers',
          definition: 'A billing discount on EC2 instances in exchange for a one- or three-year commitment to a configuration.',
          explanation:
            'Committing for years to oversized servers locks in a discount on capacity nobody uses. You have to fix the size first.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'Rightsize with the recommendations from AWS Compute Optimizer',
          definition:
            'Rightsizing means matching the type and size of resources to actual usage; Compute Optimizer analyzes usage metrics and recommends the right size.',
          explanation:
            'Exactly. Compute Optimizer reviews the usage metrics of EC2 instances, flags the oversized or idle ones and recommends how to reduce costs.',
          correct: true,
        },
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'A service to manage software licenses from vendors such as Microsoft, SAP, Oracle and IBM and avoid noncompliance.',
          explanation:
            'License Manager manages licenses; it doesn’t analyze server usage or recommend sizes. It doesn’t solve Startup Hub’s waste.',
          correct: false,
        },
      ],
    },
    {
      id: 'nightly-batch',
      prompt:
        'Last question. Every night we run jobs that generate reports; if one is interrupted, we simply run it again. Which EC2 purchase option is the cheapest for that?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'on-demand',
          label: 'On-Demand Instances',
          definition: 'Pay by the hour or by the second of usage, with no upfront payment or long-term commitment.',
          explanation:
            'On-Demand works, but it’s the baseline price, with no discount. For a job that tolerates interruptions there’s a much cheaper option.',
          correct: false,
        },
        {
          id: 'spot',
          label: 'Spot Instances',
          definition:
            'Spare EC2 capacity at up to a 90% discount compared to On-Demand, which AWS can reclaim with a two-minute warning.',
          explanation:
            'Correct. Valeria’s nightly jobs tolerate interruptions because they can be rerun, so Spot delivers the biggest savings without putting the business at risk.',
          correct: true,
        },
        {
          id: 'savings-plans',
          label: 'Savings Plans',
          definition: 'A commitment to a consistent amount of usage, in USD per hour, for 1 or 3 years, in exchange for a discount.',
          explanation:
            'Savings Plans suit steady workloads that run all day, like a 24/7 web server, not interruptible jobs that run a few hours each night.',
          correct: false,
        },
        {
          id: 'dedicated-hosts',
          label: 'Dedicated Hosts',
          definition: 'An entire physical server dedicated to you, with visibility into sockets and cores, billed per host.',
          explanation:
            'Dedicated Hosts are for per-socket or per-core licenses or compliance requirements. For these reports they would only add cost.',
          correct: false,
        },
      ],
    },
  ],
};
