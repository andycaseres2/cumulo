import type { Mission } from '../../../../domain/Mission';

/**
 * Consultora Nube Clara: a consulting firm in Asunción hosting an ERP for farming cooperatives on Amazon EC2.
 * Practices Dedicated Hosts for per-socket licenses, Convertible Reserved Instances, On-Demand Capacity Reservations and regional Reserved Instances.
 */
export const ec2PurchaseOptions2: Mission = {
  id: 'ec2-purchase-options-2',
  track: 'market',
  topicSlug: 'ec2-purchase-options',
  buildingId: 'cloud-consultancy',
  title: 'Licenses, harvests and reservations',
  client: { name: 'Lucía Benítez', role: 'Director of Operations at Consultora Nube Clara' },
  intro: [
    'Welcome to Nube Clara. I’m Lucía Benítez, director of operations. We’re a consulting firm from Asunción and we run the management system for twenty farming cooperatives in Paraguay.',
    'That system now lives on Amazon EC2. It works, but we make every purchasing decision blindly: software with complicated licenses, a three-year commitment that scares us and a harvest closing week that can’t fail.',
    'If we choose wrong, either we overpay or we run out of servers right when the cooperatives settle their soybean sales. Either way, it costs us clients.',
    'I need someone who knows EC2 purchase options well to review these decisions with me. Will you join me?',
  ],
  outro: {
    passed: [
      'Perfect. The licenses are in compliance, the three-year commitment no longer ties us to a configuration and harvest week has its capacity secured.',
      'I’m going to present this plan to the cooperatives with complete confidence. Thank you for the clarity: you lived up to the firm’s name.',
    ],
    failed: [
      'Hmm... with these decisions I see risks: badly handled licenses or servers that could run short in the middle of the harvest.',
      'Review the theory on EC2 purchase options and come back whenever you like. The cooperatives can wait a little longer.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'socket-licenses',
      prompt:
        'The most delicate part first: the accounting module uses software whose license is charged per socket and per physical core. The vendor requires us to prove how many sockets and cores the server it runs on has. Which EC2 option do we use?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'dedicated-instances-license',
          label: 'Dedicated Instances',
          definition:
            'Instances that run on hardware dedicated to a single AWS account, billed per instance.',
          explanation:
            'The hardware isn’t shared with other customers, but it doesn’t give visibility into sockets and cores and has only partial support for bringing your own licenses, so it doesn’t meet the vendor’s requirement.',
          correct: false,
        },
        {
          id: 'capacity-reservation-license',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservations of EC2 capacity in a specific Availability Zone for as long as you need it.',
          explanation:
            'They make sure capacity is available, but they say nothing about the physical server or its sockets and cores.',
          correct: false,
        },
        {
          id: 'convertible-ri-license',
          label: 'Convertible Reserved Instances',
          definition:
            'A billing discount for 1 or 3 years that can be exchanged for another Convertible with a different family, operating system or tenancy.',
          explanation:
            'A Reserved Instance is a billing discount, not a server. It doesn’t give visibility into the physical hardware for per-socket or per-core licensing.',
          correct: false,
        },
        {
          id: 'dedicated-hosts',
          label: 'Dedicated Hosts',
          definition:
            'An entire physical server dedicated to one customer, billed per host, with visibility into sockets and cores and control over placement.',
          explanation:
            'With its own physical server, Nube Clara sees the sockets and cores and can use its own per-socket or per-core licenses (BYOL), which is what the vendor requires.',
          correct: true,
        },
      ],
    },
    {
      id: 'three-year-commitment',
      prompt:
        'Now the commitment. We want to buy 3-year Reserved Instances for the rest of the system, but during that time we’ll surely move to another instance family and maybe to another operating system. Which class of Reserved Instance suits us?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'convertible-ri',
          label: 'Convertible Reserved Instances',
          definition:
            'A Reserved Instance class that can be exchanged for another Convertible with a different family, operating system or tenancy, of equal or greater value and in the same Region.',
          explanation:
            'Nube Clara keeps the discount for the 3 years and can exchange the reservation when it changes family or operating system, in exchange for a smaller discount than Standard.',
          correct: true,
        },
        {
          id: 'standard-ri',
          label: 'Standard Reserved Instances',
          definition:
            'The Reserved Instance class with the largest discount, which allows modifying some attributes and selling on the Reserved Instance Marketplace.',
          explanation:
            'It gives a bigger discount, but only some attributes can be modified and it can’t be exchanged for another family or operating system, exactly the change they’re planning.',
          correct: false,
        },
        {
          id: 'spot-commitment',
          label: 'Spot Instances',
          definition:
            'Spare EC2 capacity at a large discount, with no commitment, that AWS can reclaim with a two-minute warning.',
          explanation:
            'Spot isn’t a Reserved Instance class and its capacity can be interrupted, something a production management system can’t tolerate.',
          correct: false,
        },
        {
          id: 'capacity-reservation-commitment',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservations of EC2 capacity in a specific Availability Zone, which on their own don’t give a discount.',
          explanation:
            'They aren’t a Reserved Instance class and don’t give a discount on their own. They don’t answer the question of how to commit for 3 years with flexibility.',
          correct: false,
        },
      ],
    },
    {
      id: 'harvest-week',
      prompt:
        'In March comes the harvest closing week: the cooperatives settle their soybean sales and the system absolutely must have extra servers in the Availability Zone where the database is. It’s only one week and we don’t want to commit for 1 or 3 years. What do we use?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'regional-ri-harvest',
          label: 'Reserved Instances with regional scope',
          definition:
            'A billing discount for 1 or 3 years that applies in any Availability Zone of the Region.',
          explanation:
            'A regional RI doesn’t reserve capacity and also requires a 1- or 3-year commitment, the opposite of what Nube Clara needs for a single week.',
          correct: false,
        },
        {
          id: 'compute-sp-harvest',
          label: 'Compute Savings Plans',
          definition:
            'A commitment to spend in USD per hour for 1 or 3 years that applies to EC2, AWS Fargate and AWS Lambda.',
          explanation:
            'It gives a discount in exchange for a 1- or 3-year commitment, but it doesn’t guarantee capacity in any Availability Zone.',
          correct: false,
        },
        {
          id: 'capacity-reservations',
          label: 'On-Demand Capacity Reservations',
          definition:
            'Reservations of EC2 capacity in a specific Availability Zone for as long as you need it; immediate-use ones require no term commitment.',
          explanation:
            'They secure capacity in the database’s Availability Zone during closing week, without a 1- or 3-year commitment. They don’t give a discount on their own, but what matters here is not running out of servers.',
          correct: true,
        },
        {
          id: 'spot-harvest',
          label: 'Spot Instances',
          definition:
            'Spare EC2 capacity at a large discount that AWS can reclaim when it needs it.',
          explanation:
            'Spot is exactly the opposite of guaranteed capacity: AWS could reclaim the instances right in the middle of the harvest settlement.',
          correct: false,
        },
      ],
    },
    {
      id: 'ri-scope',
      prompt:
        'Finally, for some Linux/Unix servers with default tenancy we’re going to buy Standard Reserved Instances. We want the discount to keep applying even if we move the instances from one Availability Zone to another or change size within the same family. Which scope do we choose?',
      topicSlug: 'ec2-purchase-options',
      examTasks: ['4.1'],
      options: [
        {
          id: 'zonal-scope',
          label: 'Zonal scope',
          definition:
            'A Reserved Instance scope that reserves capacity in the chosen Availability Zone and applies only to that zone and that exact size.',
          explanation:
            'It would reserve capacity, but the discount would be tied to a single Availability Zone and an exact size, the opposite of the flexibility they’re asking for.',
          correct: false,
        },
        {
          id: 'regional-scope',
          label: 'Regional scope',
          definition:
            'A Reserved Instance scope whose discount applies in any Availability Zone of the Region, without reserving capacity.',
          explanation:
            'The discount applies in any Availability Zone of the Region and, for Linux/Unix with default tenancy, to the different sizes of the same family. And the scope doesn’t change the RI’s price.',
          correct: true,
        },
        {
          id: 'dedicated-instances-scope',
          label: 'Buy them with Dedicated Instances tenancy',
          definition:
            'The option to run instances on hardware dedicated to a single AWS account, billed per instance.',
          explanation:
            'Tenancy defines whether the hardware is shared, not where the discount applies. Besides, a regional RI’s size flexibility is for default tenancy.',
          correct: false,
        },
        {
          id: 'convert-to-sp',
          label: 'Ask AWS to convert the Reserved Instances into Savings Plans',
          definition:
            'The idea that a purchased Reserved Instance can be transformed into another purchase model to gain flexibility.',
          explanation:
            'Reserved Instances and Savings Plans are different purchase options; one doesn’t transform into the other. The flexibility they want comes from the RI’s scope.',
          correct: false,
        },
      ],
    },
  ],
};
