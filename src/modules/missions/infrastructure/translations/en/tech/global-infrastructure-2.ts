import type { Mission } from '../../../../domain/Mission';

/**
 * Electrónica Volta: an electronics retailer from Montevideo expanding its smart-camera service across the region.
 * Practices choosing a Region for data residency, AWS Local Zones, AWS Global Accelerator and disaster recovery strategies.
 */
export const globalInfrastructure2: Mission = {
  id: 'global-infrastructure-2',
  track: 'tech',
  topicSlug: 'global-infrastructure',
  buildingId: 'electronics-store',
  title: 'Voltage across the map',
  client: { name: 'Rosario Benítez', role: 'Owner of Electrónica Volta' },
  intro: [
    'Hi! I\'m Rosario Benítez, owner of Electrónica Volta. We opened in Montevideo selling radio parts, and today we sell smart security cameras in several countries.',
    'The cameras send their video to an application of ours on AWS, which detects motion and alerts the customer\'s phone. Now we want to grow, and every country brings us a different challenge.',
    'One country tells us where we have to store the data, customers in a big city say the alerts arrive late, and distributors on other continents complain about slowness.',
    'And the accountant wants a plan in case we lose a Region, but without overspending. That\'s a lot of loose wires. Can you help me connect them?',
  ],
  outro: {
    passed: [
      'All plugged in! Now I know where to put the data, how to bring compute closer to the city that needs it and how to get faraway traffic into AWS fast.',
      'And the accountant approved the most affordable recovery plan. Thank you: you\'ll get to test our next camera model before anyone else.',
    ],
    failed: [
      'Hmm... with these decisions I think we\'d blow a fuse in some country.',
      'Review the theory on the AWS global infrastructure and come back whenever you like. The Volta counter is still open.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'data-residency',
      prompt:
        'The first wire: the government of one of the countries where we sell requires that its citizens\' videos be stored within its borders. When choosing the Region for those customers, which factor should weigh the most?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'compliance-residency',
          label: 'Compliance and data residency',
          definition:
            'Region selection factor based on where the law requires data to be stored and processed.',
          explanation:
            'When a regulation says where the data must be, this factor outweighs the others: you have to store that data in a Region within that jurisdiction.',
          correct: true,
        },
        {
          id: 'region-price',
          label: 'The Region\'s pricing',
          definition:
            'Region selection factor based on the cost of services, which can vary from one Region to another.',
          explanation:
            'Prices vary between Regions, but a cheaper Region is no good if it breaks the law on where data must be stored.',
          correct: false,
        },
        {
          id: 'region-closeness',
          label: 'Proximity to the Volta office in Montevideo',
          definition:
            'Region selection factor based on the physical distance between the Region and a reference location.',
          explanation:
            'Proximity helps with latency, but it doesn\'t guarantee compliance with the legal requirement on where the data is located.',
          correct: false,
        },
        {
          id: 'region-services',
          label: 'The number of available services',
          definition:
            'Region selection factor based on which AWS services and features are already offered there.',
          explanation:
            'Available services matter, but when there\'s a data residency regulation, compliance weighs more.',
          correct: false,
        },
      ],
    },
    {
      id: 'low-latency-city',
      prompt:
        'In a big city far from the Region we use, motion alerts arrive late. We need to run the analysis with very low latency close to those customers, using an extension of an AWS Region. What do we use?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'edge-cache',
          label: 'CloudFront edge locations',
          definition:
            'Data centers in the AWS network, separate from the Regions, that deliver cached content to users.',
          explanation:
            'Their main job is delivering cached content, not running the application\'s compute that analyzes the video.',
          correct: false,
        },
        {
          id: 'extra-azs',
          label: 'More Availability Zones in the current Region',
          definition:
            'Additional isolated zones within a Region, with redundant power and networking.',
          explanation:
            'Availability Zones provide high availability within the Region, but they\'re still just as far from that city.',
          correct: false,
        },
        {
          id: 'local-zones',
          label: 'AWS Local Zones',
          definition:
            'Extensions of a Region that place compute, storage, databases and other select services close to large population centers.',
          explanation:
            'Local Zones bring compute closer to large cities to achieve very low latency, and each one is an extension of a Region: exactly what the video analysis needs.',
          correct: true,
        },
        {
          id: 'far-region',
          label: 'A Region on another continent',
          definition:
            'AWS geographic area with multiple Availability Zones, located far from the users.',
          explanation:
            'A faraway Region increases the distance to customers, the opposite of the very low latency you need.',
          correct: false,
        },
      ],
    },
    {
      id: 'distributors-traffic',
      prompt:
        'Distributors on other continents use our ordering portal and say it\'s slow. We want their traffic to enter the AWS backbone network as soon as possible, using the AWS edge network. Which service is it?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'traffic-local-zones',
          label: 'AWS Local Zones',
          definition:
            'Extensions of a Region located near large cities to run workloads with very low latency.',
          explanation:
            'Local Zones bring compute closer to specific cities; they aren\'t the service that carries traffic from users on other continents to the backbone network.',
          correct: false,
        },
        {
          id: 'traffic-azs',
          label: 'Additional Availability Zones',
          definition:
            'Isolated data centers within a Region that let you spread out an application.',
          explanation:
            'Availability Zones provide high availability within a Region; they don\'t speed up how traffic enters the AWS network.',
          correct: false,
        },
        {
          id: 'traffic-s3',
          label: 'Amazon S3 Standard',
          definition:
            'Object storage class that stores data redundantly across multiple Availability Zones.',
          explanation:
            'S3 Standard is for storing objects; it doesn\'t direct the distributors\' traffic to the AWS backbone network.',
          correct: false,
        },
        {
          id: 'global-accelerator',
          label: 'AWS Global Accelerator',
          definition:
            'Networking service that uses the AWS edge network to direct user traffic to applications.',
          explanation:
            'Global Accelerator uses the AWS edge network to get traffic onto the AWS backbone network as soon as possible, exactly what faraway distributors need.',
          correct: true,
        },
      ],
    },
    {
      id: 'cheapest-dr',
      prompt:
        'Finally, the accountant: they want a disaster recovery plan in another Region, but the one with the lowest cost and complexity, even if recovery takes longer. Of the strategies AWS describes, which one is it?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'warm-standby',
          label: 'Warm standby',
          definition:
            'Disaster recovery strategy that keeps a scaled-down, fully functional copy of the workload running in another Region.',
          explanation:
            'Warm standby costs more and is more complex than backup and restore and pilot light, because it keeps a working copy running all the time.',
          correct: false,
        },
        {
          id: 'backup-restore',
          label: 'Backup and restore',
          definition:
            'Disaster recovery strategy based on backing up data and restoring it when a disaster occurs.',
          explanation:
            'It\'s the lowest-cost, least complex strategy on the spectrum AWS describes, in exchange for slower recovery, which the accountant accepts.',
          correct: true,
        },
        {
          id: 'pilot-light',
          label: 'Pilot light',
          definition:
            'Disaster recovery strategy that keeps only the essential elements in another Region, ready to switch on the rest.',
          explanation:
            'Pilot light is more costly and complex than backup and restore on the spectrum AWS describes.',
          correct: false,
        },
        {
          id: 'multi-site',
          label: 'Multi-site active/active',
          definition:
            'Disaster recovery strategy that runs the full workload in multiple Regions at the same time.',
          explanation:
            'Multi-site active/active sits at the highest-cost, most complex end, the opposite of what the accountant is asking for.',
          correct: false,
        },
      ],
    },
  ],
};
