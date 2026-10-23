import type { Mission } from '../../../../domain/Mission';

/**
 * Diario La Voz: a newspaper in Córdoba whose oversized servers and always-on test environments eat the budget.
 * Practices rightsizing, AWS Compute Optimizer, automation to stop idle resources and leaving data center heavy lifting to AWS.
 */
export const cloudEconomics2: Mission = {
  id: 'cloud-economics-2',
  track: 'downtown',
  topicSlug: 'cloud-economics',
  buildingId: 'newspaper',
  title: 'Servers on the front page',
  client: { name: 'Ramiro Acosta', role: 'Head of IT at Diario La Voz' },
  intro: [
    'Hey, great that you came! I’m Ramiro Acosta, head of IT at Diario La Voz. From Córdoba we publish news in print and on the web every day of the year.',
    'A year ago we moved the site to AWS. Since we didn’t want it to go down on the day of a big story, we picked the biggest servers we could find, just in case.',
    'Now management is looking at the bill and asking me to cut costs without the site getting slow. On top of that, the development and test environments are on day and night.',
    'My team spends half its time putting out fires instead of improving the website. Will you help me sort this out?',
  ],
  outro: {
    passed: [
      'This is front-page news! Right-sized servers, recommendations based on real data and test environments that shut down on their own after hours.',
      'And my team can finally focus on the website instead of the hardware. Thank you: your name is going in the acknowledgments section.',
    ],
    failed: [
      'Hmm... with these decisions I don’t think management will be satisfied. Some of them just don’t add up for me.',
      'Review the theory on cloud economics calmly and come back whenever you like. The newsroom never closes.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'oversized-servers',
      prompt:
        'Look at these charts: the web servers almost never go above 10% CPU usage, not even on election days. Which practice helps us spend less without losing performance?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'scale-up',
          label: 'Move to even bigger servers, for peace of mind',
          definition:
            'Vertical scaling: replacing a server with another one that has more CPU and memory.',
          explanation:
            'Enlarging servers that are barely used increases waste. Ramiro’s problem is precisely that he has capacity to spare.',
          correct: false,
        },
        {
          id: 'rightsizing',
          label: 'Rightsizing: matching the type and size of the servers to actual usage',
          definition:
            'The practice of matching the type and size of resources to what the workload actually needs.',
          explanation:
            'With usage this low, rightsizing usually means scaling down what is oversized: less waste and the same performance for readers.',
          correct: true,
        },
        {
          id: 'byol',
          label: 'BYOL: bringing your own licenses to the servers',
          definition:
            'A model in which the customer reuses on AWS the software licenses it already bought, following the vendor’s rules.',
          explanation:
            'BYOL helps you make use of licenses you already paid for, but it doesn’t fix servers being much bigger than needed.',
          correct: false,
        },
        {
          id: 'same-size-more-servers',
          label: 'Keep the size and add more identical servers',
          definition:
            'Horizontal scaling: adding more instances of the same type to spread the load.',
          explanation:
            'If the current servers are already almost idle, adding more of the same size only makes the bill bigger.',
          correct: false,
        },
      ],
    },
    {
      id: 'sizing-advice',
      prompt:
        'I don’t want to guess the new size. Which AWS service analyzes the configuration and usage metrics of our servers to recommend the right size and flag idle resources?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'A service to manage licenses from vendors such as Microsoft, SAP, Oracle and IBM across accounts and Regions.',
          explanation:
            'License Manager manages licenses and prevents overuse, but it doesn’t analyze the size of the servers.',
          correct: false,
        },
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'A web tool to estimate the cost of an architecture on AWS before deploying it.',
          explanation:
            'The calculator estimates the cost of an architecture you describe, but it doesn’t analyze the real metrics of the newspaper’s servers.',
          correct: false,
        },
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'A service that monitors resources and applications in real time with metrics, logs, dashboards and alarms.',
          explanation:
            'CloudWatch shows the metrics, like the 10% CPU Ramiro saw, but the service that analyzes them to recommend sizes is a different one.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'AWS Compute Optimizer',
          definition:
            'A service that analyzes the configuration and usage metrics of resources to recommend their size and identify idle resources.',
          explanation:
            'Compute Optimizer gives rightsizing recommendations based on actual usage and flags idle resources, to reduce costs and improve performance.',
          correct: true,
        },
      ],
    },
    {
      id: 'test-environments',
      prompt:
        'Now the development and test environments. The team uses them about eight hours a day, Monday to Friday, but they’re on all 168 hours of the week. What do we do?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'manual-stop',
          label: 'Ask the team to turn them off by hand whenever they remember',
          definition:
            'Relying on each person to stop resources manually at the end of their workday.',
          explanation:
            'Relying on each person’s memory leaves resources running by mistake. Automation gives consistent responses and fewer human errors.',
          correct: false,
        },
        {
          id: 'automate-stop',
          label: 'Automate shutting them down outside working hours',
          definition:
            'Scheduling resources to stop and start according to the hours they are actually used.',
          explanation:
            'If they’re used about 40 of the 168 weekly hours, stopping them outside that schedule gives potential savings of around 75%, without depending on anyone remembering.',
          correct: true,
        },
        {
          id: 'bigger-test',
          label: 'Give them bigger servers so the team finishes sooner',
          definition:
            'Vertical scaling of the test environments: more CPU and memory for each server.',
          explanation:
            'Bigger servers cost more per hour and stay on all week. The problem is the idle hours.',
          correct: false,
        },
        {
          id: 'leave-on',
          label: 'Leave them on, because in the cloud an unused server isn’t charged',
          definition:
            'The idea that resources not processing work don’t generate cost while they are running.',
          explanation:
            'A running instance is charged even if nobody uses it. The advantage of the cloud is that you can turn it off and stop paying for its compute hours.',
          correct: false,
        },
      ],
    },
    {
      id: 'heavy-lifting',
      prompt:
        'Last question, from the board. My team used to spend hours swapping disks, cabling racks and fighting with the server room’s air conditioning. Which advantage of the cloud describes the fact that they can now focus on improving the website?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'stop-data-centers',
          label: 'Stop spending money running and maintaining data centers',
          definition:
            'The advantage by which a company stops racking, stacking and powering servers and focuses on what differentiates its business.',
          explanation:
            'AWS handles the heavy lifting of running data centers, and Ramiro’s team focuses on its readers. It’s also the principle of no longer spending on undifferentiated heavy lifting.',
          correct: true,
        },
        {
          id: 'economies-of-scale',
          label: 'Benefit from massive economies of scale',
          definition:
            'The advantage by which AWS aggregates the usage of hundreds of thousands of customers and achieves lower costs that translate into lower pay-as-you-go prices.',
          explanation:
            'Economies of scale explain lower prices. The board is asking about the time the team no longer spends maintaining the server room.',
          correct: false,
        },
        {
          id: 'go-global',
          label: 'Go global in minutes',
          definition:
            'The advantage by which an application is deployed in several Regions around the world in a few clicks, with lower latency for users.',
          explanation:
            'Reaching readers in other countries has nothing to do with no longer swapping disks and cabling racks.',
          correct: false,
        },
        {
          id: 'variable-expense',
          label: 'Trade fixed expense for variable expense',
          definition:
            'The advantage by which you pay only when you consume resources and only for what you consume, instead of investing up front.',
          explanation:
            'Variable expense changes how you pay. The question is about the work of maintaining the hardware, which AWS now does.',
          correct: false,
        },
      ],
    },
  ],
};
