import type { Mission } from '../../../../domain/Mission';

/**
 * Seguros Horizonte: an insurance company in Panama City deciding whether to renew its data center or move to AWS.
 * Practices fixed versus variable costs (CapEx and OpEx), on-premises TCO, BYOL versus license included, and AWS License Manager.
 */
export const cloudEconomics1: Mission = {
  id: 'cloud-economics-1',
  track: 'downtown',
  topicSlug: 'cloud-economics',
  buildingId: 'insurance-office',
  title: 'The data center policy',
  client: { name: 'Gabriela Moreno', role: 'Chief Financial Officer at Seguros Horizonte' },
  intro: [
    'Good morning. I’m Gabriela Moreno, chief financial officer at Seguros Horizonte. From Panama City we insure cars, homes and businesses all over the country.',
    'Our servers are turning five and the vendor is offering to renew them with an enormous upfront payment. The IT department, on the other hand, proposes moving to AWS.',
    'I have to take a serious comparison to the board. But the head of IT only compared the price of the servers with the AWS bill, and on top of that we already pay for Oracle licenses I don’t want to throw away.',
    'As an insurer, I hate risks that haven’t been calculated. Will you help me get the numbers right?',
  ],
  outro: {
    passed: [
      'Perfect. Now the board will see the total cost of the data center, not just the servers, and how we go from a fixed expense to one that follows our actual usage.',
      'And our Oracle licenses keep working for us, under control. Thank you: this analysis has the best coverage I’ve ever seen.',
    ],
    failed: [
      'Hmm... with these numbers I don’t dare face the board. There are uncalculated risks.',
      'Review the theory on cloud economics calmly and come back whenever you like. The renewal offer can wait a little.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'expense-type',
      prompt:
        'Let’s start with the accounting. Today we buy servers with a big upfront payment, planning for the moment of highest demand. How does that expense change if we move to AWS?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'capex-to-opex',
          label: 'It goes from a fixed capital expense (CapEx) to a variable operating expense (OpEx)',
          definition:
            'The shift from investing up front in physical equipment to paying as resources are consumed.',
          explanation:
            'In the cloud, Seguros Horizonte stops buying equipment for peak demand and pays only when it consumes resources and only for what it consumes.',
          correct: true,
        },
        {
          id: 'opex-to-capex',
          label: 'It goes from an operating expense (OpEx) to a capital expense (CapEx)',
          definition:
            'The shift from paying for consumption to investing up front in physical assets used for years.',
          explanation:
            'It’s the other way around: buying servers is already a capital expense. The cloud turns it into an operating expense that follows consumption.',
          correct: false,
        },
        {
          id: 'no-cost',
          label: 'The expense disappears, because AWS takes care of the infrastructure',
          definition:
            'The idea that moving to the cloud eliminates all of a company’s technology costs.',
          explanation:
            'The cloud doesn’t make the expense disappear: it changes its type. The insurer will keep paying, but based on its actual usage.',
          correct: false,
        },
        {
          id: 'same-fixed',
          label: 'It’s still a fixed expense, just paid to AWS instead of the vendor',
          definition:
            'The idea that the cloud charges a fixed fee for maximum capacity, just like buying equipment.',
          explanation:
            'On AWS the cost goes up or down with consumption; idle resources can be turned off so you stop paying for their compute hours.',
          correct: false,
        },
      ],
    },
    {
      id: 'tco',
      prompt:
        'Now the head of IT’s mistake: he compared only the price of the servers with the AWS bill. For a total cost of ownership (TCO) analysis of the data center, what do we need to add up?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'servers-only',
          label: 'Only the price of the new servers',
          definition:
            'Comparing only the purchase cost of the compute hardware with the cost of the cloud.',
          explanation:
            'That’s the trap the head of IT fell into: an on-premises data center costs much more than the hardware.',
          correct: false,
        },
        {
          id: 'servers-and-licenses',
          label: 'The servers and the software licenses, nothing else',
          definition:
            'Comparing the cost of hardware and licensed software, without including facility or staff costs.',
          explanation:
            'You’re missing power, cooling, physical space and the staff who install, maintain and repair the equipment.',
          correct: false,
        },
        {
          id: 'full-tco',
          label: 'Hardware, licenses, power, cooling, physical space and staff',
          definition:
            'The sum of everything it costs to own infrastructure over its useful life, including its periodic replacement.',
          explanation:
            'An honest TCO analysis includes all of those costs. That way the comparison with AWS reflects what the insurer’s data center really costs.',
          correct: true,
        },
        {
          id: 'electricity-only',
          label: 'Only the electricity bill, because the hardware is already paid for',
          definition:
            'Comparing only the data center’s power consumption with the cost of the cloud.',
          explanation:
            'The current servers are turning five and must be replaced. And you’re still missing licenses, cooling, space and staff.',
          correct: false,
        },
      ],
    },
    {
      id: 'oracle-licenses',
      prompt:
        'We have paid-up, valid Oracle licenses. We’re going to use Amazon RDS for Oracle and I don’t want to pay twice for the same thing. Which licensing model suits us?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'license-included',
          label: 'License included: the license is part of the service price',
          definition:
            'A model in which AWS holds the software license and its cost is included in the price of the service.',
          explanation:
            'License included makes sense when you don’t own licenses. Seguros Horizonte has already paid for them, so it would be paying twice.',
          correct: false,
        },
        {
          id: 'switch-engine',
          label: 'Rewrite the applications for Amazon DynamoDB and forget about Oracle',
          definition:
            'Amazon DynamoDB is a fully managed NoSQL key-value database.',
          explanation:
            'Switching engines forces you to rewrite the applications and leaves unused the licenses Gabriela wants to take advantage of.',
          correct: false,
        },
        {
          id: 'new-licenses',
          label: 'Buy a new set of Oracle licenses just for the cloud',
          definition:
            'Acquiring a second set of licenses from the vendor to use only with resources on AWS.',
          explanation:
            'Buying new licenses is exactly what Gabriela wants to avoid: she already has valid licenses she can reuse.',
          correct: false,
        },
        {
          id: 'byol',
          label: 'BYOL (Bring Your Own License): reuse the licenses you already have',
          definition:
            'A model in which the customer reuses on AWS the software licenses it already bought, following the vendor’s rules.',
          explanation:
            'With BYOL the insurer makes use of its valid licenses. It must follow Oracle’s rules: for example, a Multi-AZ deployment needs a license for both the primary instance and the standby.',
          correct: true,
        },
      ],
    },
    {
      id: 'license-control',
      prompt:
        'Last point: with BYOL, I don’t want anyone to use more licenses than we have and get us fined in a vendor audit. Which service helps us manage them and set limits?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'A web tool to estimate the cost of an architecture on AWS before deploying it.',
          explanation:
            'The calculator estimates prices, but it doesn’t keep count of the licenses in use or prevent them from being exceeded.',
          correct: false,
        },
        {
          id: 'license-manager',
          label: 'AWS License Manager',
          definition:
            'A service to manage licenses from vendors such as Microsoft, SAP, Oracle and IBM across accounts and Regions.',
          explanation:
            'License Manager lets you define rules with limits to prevent overuse and noncompliance, and it offers dashboards that are useful for audits.',
          correct: true,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports, such as SOC, PCI and ISO, and manage agreements.',
          explanation:
            'Artifact provides reports on AWS’s compliance, but it doesn’t control how many Oracle licenses the insurer uses.',
          correct: false,
        },
        {
          id: 'compute-optimizer',
          label: 'AWS Compute Optimizer',
          definition:
            'A service that analyzes the configuration and usage metrics of resources to recommend their size and identify idle resources.',
          explanation:
            'Compute Optimizer helps size resources, but it doesn’t manage licenses or set limits on their use.',
          correct: false,
        },
      ],
    },
  ],
};
