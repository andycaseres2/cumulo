import type { Mission } from '../../../../domain/Mission';

/**
 * Mercado Central: a traditional market in Cusco whose online ordering platform runs on Amazon EC2 and pays everything On-Demand.
 * Practices choosing between Compute Savings Plans, Spot Instances and On-Demand Instances, and what happens when a Reserved Instance expires.
 */
export const ec2PurchaseOptions1: Mission = {
  id: 'ec2-purchase-options-1',
  track: 'market',
  topicSlug: 'ec2-purchase-options',
  buildingId: 'central-market',
  title: 'Every stall, its price',
  client: { name: 'Rosa Condori', role: 'Manager of the Mercado Central' },
  intro: [
    'Come in, come in! I’m Rosa Condori and I manage the Mercado Central in Cusco. There are more than two hundred stalls here: fruit, cheese, flowers, alpaca clothing.',
    'Two years ago we launched a platform so neighbors and restaurants can place online orders with the stalls. Everything runs on Amazon EC2 servers.',
    'The problem is that we pay for every server the same way, at the On-Demand rate, whether it runs all year, only at night or just a few days. The merchants’ association says the bill is eating up the profits.',
    'I have to present a savings plan at the next assembly. If it isn’t convincing, several stalls will leave the platform. Will you help me choose the right way to pay for each server?',
  ],
  outro: {
    passed: [
      'Now this I understand! Each server now has the payment option that suits it: a commitment for what always runs, Spot for what can wait and On-Demand for the unpredictable.',
      'At the assembly I’m going to show how much we saved without putting the orders at risk. Thank you: next time you come, the Andean cheese is on the market.',
    ],
    failed: [
      'Hmm... with this plan I don’t know if we’re saving money or risking the neighbors’ orders. Some decisions just don’t add up for me.',
      'Review the theory on EC2 purchase options calmly and come back whenever you like. The market is open every day.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'steady-platform',
      prompt:
        'Let’s start with what never shuts down: the ordering platform runs 24 hours a day, all year round, with fairly steady usage. Also, next year we want to switch to another instance family and move part of the system to AWS Lambda. How do we get a discount without being tied to a configuration?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'ec2-instance-sp',
          label: 'EC2 Instance Savings Plans',
          definition:
            'A commitment to spend in USD per hour for 1 or 3 years, tied to an instance family in a Region, in exchange for a discount compared to On-Demand.',
          explanation:
            'It gives a good discount, but it requires committing to an instance family in a Region and doesn’t cover AWS Lambda, exactly what the market wants to change.',
          correct: false,
        },
        {
          id: 'compute-sp',
          label: 'Compute Savings Plans',
          definition:
            'A commitment to spend in USD per hour for 1 or 3 years that applies to EC2 regardless of family, size, operating system, tenancy or Region, and also to AWS Fargate and AWS Lambda.',
          explanation:
            'Usage is steady, so a commitment makes sense, and this plan keeps applying even if they change instance families or move part of the system to AWS Lambda. AWS recommends Savings Plans for that flexibility.',
          correct: true,
        },
        {
          id: 'spot-platform',
          label: 'Spot Instances',
          definition:
            'Instances that use spare EC2 capacity at a large discount and that AWS can reclaim with a two-minute warning.',
          explanation:
            'The ordering platform can’t stop suddenly in the middle of a purchase. Spot is for interruption-tolerant workloads, not for the main service.',
          correct: false,
        },
        {
          id: 'dedicated-instances',
          label: 'Dedicated Instances',
          definition:
            'Instances that run on hardware dedicated to a single AWS account, billed per instance.',
          explanation:
            'Dedicated hardware addresses isolation or compliance needs the market doesn’t have, and it isn’t a way to get a discount for steady usage.',
          correct: false,
        },
      ],
    },
    {
      id: 'nightly-reconciliation',
      prompt:
        'Every night a job runs that cross-checks orders against each stall’s inventory. If it gets cut off halfway, it’s simply relaunched and finishes before dawn. How do we pay for that server to save as much as possible?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'on-demand-nightly',
          label: 'On-Demand Instances',
          definition:
            'Instances paid by the hour or by the second of usage, with no upfront payment or long-term commitment.',
          explanation:
            'On-Demand is the base price, with no discount. It works, but it wastes the advantage that this job tolerates interruptions.',
          correct: false,
        },
        {
          id: 'capacity-reservation-nightly',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservations of EC2 capacity in a specific Availability Zone for as long as you need it.',
          explanation:
            'They guarantee capacity, but on their own they don’t give a discount. The nightly job doesn’t need guaranteed capacity: it can be retried.',
          correct: false,
        },
        {
          id: 'dedicated-host-nightly',
          label: 'Dedicated Hosts',
          definition:
            'An entire physical server dedicated to one customer, with visibility into sockets and cores, billed per host.',
          explanation:
            'They’re for per-socket or per-core licenses or for compliance. An inventory job that can be rerun doesn’t need its own physical server.',
          correct: false,
        },
        {
          id: 'spot-nightly',
          label: 'Spot Instances',
          definition:
            'Instances that use spare EC2 capacity at discounts of up to 90% compared to On-Demand and can be interrupted with a two-minute warning.',
          explanation:
            'The job tolerates interruptions: if AWS reclaims the instance, it’s relaunched and still finishes before dawn. It’s the ideal case for the biggest discount.',
          correct: true,
        },
      ],
    },
    {
      id: 'festival-week',
      prompt:
        'In June comes the week of Inti Raymi. Orders skyrocket, but every year is different and nobody can predict by how much. We need extra servers only on those days, without them being cut off and without signing anything long term. How do we pay for them?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'on-demand-festival',
          label: 'On-Demand Instances',
          definition:
            'Instances paid by the hour or by the second of usage, with no upfront payment or long-term commitment, and that aren’t interrupted.',
          explanation:
            'It’s the option for short, unpredictable workloads that can’t be interrupted: the market pays only for the festival days and doesn’t commit to any term.',
          correct: true,
        },
        {
          id: 'standard-ri-festival',
          label: 'Standard Reserved Instances for 1 year',
          definition:
            'A billing discount for 1 or 3 years applied to instances that match certain attributes; it can’t be canceled.',
          explanation:
            'It forces you to pay for a full year of commitment for servers used only one week. The discount doesn’t make up for the months without use.',
          correct: false,
        },
        {
          id: 'spot-festival',
          label: 'Spot Instances',
          definition:
            'Spare EC2 capacity at a large discount that AWS can reclaim with a two-minute warning.',
          explanation:
            'In the busiest week of the year, suddenly losing servers would mean losing sales. This workload doesn’t tolerate interruptions.',
          correct: false,
        },
        {
          id: 'instance-sp-festival',
          label: 'EC2 Instance Savings Plans for 1 year',
          definition:
            'A commitment to spend in USD per hour for 1 or 3 years on an instance family in a Region, in exchange for a discount.',
          explanation:
            'It requires a commitment of at least one year for a need that lasts a few days and is of unknown size. It doesn’t fit the rule of not signing anything long term.',
          correct: false,
        },
      ],
    },
    {
      id: 'expired-ri',
      prompt:
        'One last question. A year ago the accountant bought a Reserved Instance for the stalls’ payment server, and it expires next week. He’s afraid the server will shut down that day. What’s going to happen?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'ri-auto-renews',
          label: 'The Reserved Instance renews itself for another year',
          definition:
            'The idea that a Reserved Instance commitment is automatically extended when its term ends.',
          explanation:
            'A Reserved Instance doesn’t renew itself. If the market wants the discount again, it has to buy another one or move to a Savings Plan.',
          correct: false,
        },
        {
          id: 'server-stops',
          label: 'AWS stops the server until they buy another Reserved Instance',
          definition:
            'The idea that the Reserved Instance is the server itself and that, without it, the instance stops working.',
          explanation:
            'A Reserved Instance is a billing discount, not a server. Its expiration doesn’t stop any instance.',
          correct: false,
        },
        {
          id: 'runs-on-demand',
          label: 'The server keeps running, but it’s charged at the On-Demand rate',
          definition:
            'How an instance behaves when the term of the billing discount that covered it ends.',
          explanation:
            'The Reserved Instance was only a discount applied to a matching instance. When it expires, the server stays the same and is charged at the On-Demand rate, so it’s wise to plan the next purchase.',
          correct: true,
        },
        {
          id: 'becomes-spot',
          label: 'The server starts being charged as a Spot Instance',
          definition:
            'A purchase option that uses spare EC2 capacity at a discount and can be interrupted.',
          explanation:
            'Spot is another purchase option that you choose explicitly. An expired Reserved Instance doesn’t turn the instance into Spot.',
          correct: false,
        },
      ],
    },
  ],
};
