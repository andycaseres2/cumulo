import type { Mission } from '../../../domain/Mission';

/**
 * Pastelería Dulce Nube: a bakery whose website crashes every December.
 * Practices elasticity, EC2 Auto Scaling, Elastic Load Balancing, Availability Zones and variable expense.
 */
export const bakeryElasticity: Mission = {
  id: 'bakery-elasticity',
  track: 'downtown',
  topicSlug: 'cloud-benefits',
  buildingId: 'bakery',
  title: 'The Christmas that crashed the website',
  client: { name: 'Rosa Quispe', role: 'Owner of Pastelería Dulce Nube' },
  intro: [
    'You’re finally here! I’m Rosa Quispe, owner of Pastelería Dulce Nube. I’ve been baking panettones and cakes here in Lima for fifteen years.',
    'Two years ago we started selling through our website. Most of the year about a hundred people visit per day, and everything works fine.',
    'But in December... in December thousands of people come in every hour! Our only server gets overloaded and the site goes down right when we sell the most.',
    'Last year we lost almost half of our Christmas orders. And I can’t buy ten servers just to use them for one month. Will you help me fix this?',
  ],
  outro: {
    passed: [
      'We did it! With Auto Scaling, the load balancer and several Availability Zones, the site will hold up all through Christmas.',
      'And in January the bill will go down on its own. Thank you so much. Drop by anytime, there will always be a panettone for you!',
    ],
    failed: [
      'Hmm... I’m not sure this will survive December. Some of these decisions don’t convince me.',
      'Review the theory calmly and come back whenever you like. I’ll be waiting right here!',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'concept',
      prompt:
        'First I want to understand what we need. Something that adds capacity when lots of customers arrive and removes it when they leave, without me having to do anything. What is that called in the cloud?',
      topicSlug: 'cloud-benefits',
      examTasks: ['1.1'],
      options: [
        {
          id: 'high-availability',
          label: 'High availability',
          definition: 'The ability of a system to keep working even when one of its components fails.',
          explanation:
            'High availability is about failures, not about changes in demand. It matters, but Rosa’s problem is that her number of customers multiplies in December.',
          correct: false,
        },
        {
          id: 'agility',
          label: 'Agility',
          definition: 'The ability of a business to try and launch new ideas faster, because resources are available in minutes.',
          explanation:
            'Agility is about how fast you can experiment and innovate, not about automatically adjusting capacity to the number of customers.',
          correct: false,
        },
        {
          id: 'elasticity',
          label: 'Elasticity',
          definition: 'The ability to acquire resources when you need them and release them when you no longer do, ideally automatically.',
          explanation:
            'Exactly. Elasticity matches capacity to demand in both directions: it grows in December and shrinks in January, so you don’t pay for servers nobody uses.',
          correct: true,
        },
        {
          id: 'economies-of-scale',
          label: 'Economies of scale',
          definition: 'Savings AWS achieves by operating at huge volumes and passes on to its customers as lower prices.',
          explanation:
            'Economies of scale explain why AWS can lower its prices, but they don’t make the shop grow and shrink with demand.',
          correct: false,
        },
      ],
    },
    {
      id: 'scaling-service',
      prompt:
        'Perfect: elasticity. Our website runs on Amazon EC2 virtual servers. Which service automatically adds servers when visits go up and removes them when they go down?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'ec2-auto-scaling',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'A service that automatically adds or removes EC2 instances based on rules and metrics, and replaces instances that fail.',
          explanation:
            'Correct. With an Auto Scaling group you set a minimum and a maximum number of servers: more are added in December and they are removed on their own in January.',
          correct: true,
        },
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition: 'A monitoring service that collects metrics and logs from your resources and can trigger alarms.',
          explanation:
            'CloudWatch measures the load and can alert you when it rises, but it doesn’t add servers by itself. In fact, Auto Scaling can use CloudWatch metrics to decide when to scale.',
          correct: false,
        },
        {
          id: 'elb',
          label: 'Elastic Load Balancing',
          definition: 'A service that distributes incoming traffic across multiple targets, such as EC2 instances.',
          explanation:
            'The load balancer spreads traffic across the servers that already exist, but it doesn’t create or remove servers. That’s what Auto Scaling is for.',
          correct: false,
        },
        {
          id: 'ebs',
          label: 'Amazon EBS',
          definition: 'Block storage that works as the hard drive of an EC2 instance.',
          explanation:
            'EBS is a server’s disk. Making it bigger doesn’t add capacity to serve more customers at the same time.',
          correct: false,
        },
      ],
    },
    {
      id: 'load-balancing',
      prompt:
        'Now we’re going to have several servers at once. How do we spread customers across them without sending anyone to a server that froze?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'ec2-auto-scaling',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'A service that automatically adds or removes EC2 instances based on rules and metrics, and replaces instances that fail.',
          explanation:
            'Auto Scaling decides how many servers there are, but it doesn’t spread visits across them. It works as a team with the load balancer: one adds servers and the other sends them traffic.',
          correct: false,
        },
        {
          id: 's3',
          label: 'Amazon S3',
          definition: 'Object storage for keeping files such as images, videos and backups.',
          explanation: 'S3 is great for storing the cake photos, but it doesn’t distribute traffic across servers.',
          correct: false,
        },
        {
          id: 'backup',
          label: 'AWS Backup',
          definition: 'A service that centralizes and automates backups across different AWS services.',
          explanation: 'Backups protect the data, but they don’t help serve thousands of customers at the same time.',
          correct: false,
        },
        {
          id: 'elb',
          label: 'Elastic Load Balancing',
          definition: 'A service that distributes incoming traffic across multiple targets, such as EC2 instances.',
          explanation:
            'Exactly. The load balancer spreads visits across the servers and, thanks to its health checks, only sends traffic to the healthy ones.',
          correct: true,
        },
      ],
    },
    {
      id: 'availability-zones',
      prompt:
        'I’m afraid the whole data center will go down right on Christmas Eve. Where should we put the servers so the shop keeps working?',
      topicSlug: 'global-infrastructure',
      examTasks: ['3.2'],
      options: [
        {
          id: 'bigger-server',
          label: 'On a single, much bigger server',
          definition: 'Vertical scaling: replacing a server with another one that has more CPU and memory.',
          explanation:
            'A bigger server handles more load, but it is still a single point of failure: if it goes down, everything goes down. And in January you’d be paying for that capacity without using it.',
          correct: false,
        },
        {
          id: 'multi-az',
          label: 'In several Availability Zones of the same Region',
          definition:
            'An Availability Zone is one or more data centers with redundant power, networking and connectivity, isolated from the other zones in its Region.',
          explanation:
            'Correct. Availability Zones don’t share single points of failure: if one goes down, the servers in the others keep serving. Auto Scaling and the load balancer can work across several zones.',
          correct: true,
        },
        {
          id: 'single-az',
          label: 'All together in a single Availability Zone',
          definition: 'Placing all the resources in the same group of data centers.',
          explanation: 'If that zone fails, the whole shop goes down. High availability uses at least two zones.',
          correct: false,
        },
        {
          id: 'edge-locations',
          label: 'In edge locations',
          definition:
            'Points of presence of the AWS network close to users, used by services such as Amazon CloudFront to deliver content with low latency.',
          explanation:
            'Edge locations bring content closer to users through services like CloudFront, but the shop’s EC2 servers don’t run there.',
          correct: false,
        },
      ],
    },
    {
      id: 'variable-expense',
      prompt:
        'One last question, and it’s the one that worries my accountant the most: are we going to pay all year for the servers we need in December?',
      topicSlug: 'cloud-economics',
      examTasks: ['1.4'],
      options: [
        {
          id: 'fixed-peak',
          label: 'Yes, you pay a fixed fee for peak capacity',
          definition: 'Buying and paying up front for the capacity planned for the moment of highest demand.',
          explanation:
            'That’s what happens with your own servers: you buy for the peak and pay even when you don’t use them. The cloud lets you stop guessing how much capacity you’ll need.',
          correct: false,
        },
        {
          id: 'reserved-all-year',
          label: 'You must buy Reserved Instances for the whole year',
          definition: 'A discount on EC2 instances in exchange for a one- or three-year usage commitment.',
          explanation:
            'Reserved Instances make sense for the steady load you have all year, not for a one-month peak. For the peak, the On-Demand capacity managed by Auto Scaling is the natural choice.',
          correct: false,
        },
        {
          id: 'pay-as-you-go',
          label: 'No: you pay only for what you use (variable expense)',
          definition: 'Pay-as-you-go model: the cost goes up and down with the resources consumed, without buying equipment up front.',
          explanation:
            'Correct. The cloud trades fixed expense for variable expense: in December you pay for more servers and in January, when Auto Scaling removes them, the bill goes down.',
          correct: true,
        },
        {
          id: 'free-scaling',
          label: 'You pay nothing for the servers Auto Scaling adds',
          definition: 'The idea that capacity added automatically has no cost.',
          explanation:
            'Auto Scaling itself has no additional cost, but you do pay for the EC2 instances it launches while they are running.',
          correct: false,
        },
      ],
    },
  ],
};
