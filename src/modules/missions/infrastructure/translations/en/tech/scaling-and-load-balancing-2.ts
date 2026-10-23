import type { Mission } from '../../../../domain/Mission';

/**
 * Taller Maker 3D: a 3D printing shop in Rosario whose online quote platform and network of partner printers keep growing.
 * Practices horizontal vs vertical scaling, the Network Load Balancer (layer 4, static IP), spreading an Auto Scaling group
 * across Availability Zones and AWS Auto Scaling scaling plans for several resources.
 */
export const scalingAndLoadBalancing2: Mission = {
  id: 'scaling-and-load-balancing-2',
  track: 'tech',
  topicSlug: 'scaling-and-load-balancing',
  buildingId: 'maker-workshop',
  title: 'Printers that never stop',
  client: { name: 'Martín Acosta', role: 'Owner of Taller Maker 3D' },
  intro: [
    'Welcome to Taller Maker 3D! I\'m Martín Acosta. I started in Rosario with two printers in a garage, and today we print prosthetics, spare parts and scale models for customers all over Argentina.',
    'Customers upload their 3D models to our platform on AWS and get a quote. On top of that, a network of partner workshops sends us the real-time status of their printers over TCP and UDP.',
    'The problem is that we grow in jumps: when a university launches a robotics contest, quotes multiply tenfold and the platform goes down. And the partner workshops complain that our connection address keeps changing and they have to reconfigure their firewalls.',
    'I don\'t want to lose customers right when they need us most. Will you help me design a platform that can keep up with our growth?',
  ],
  outro: {
    passed: [
      'Now this is nonstop printing! The platform now adds identical servers when contests come around, it\'s spread across several Availability Zones, and the partner workshops always connect to the same IP.',
      'And with a single scaling plan we adjust everything else. Thank you: the next scale model we print carries your name.',
    ],
    failed: [
      'Uh-oh... with this design the platform will go down again at the next contest.',
      'Review the theory on scaling and load balancing and come back to the workshop whenever you like. The printers are waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'maker-scale-direction',
      prompt:
        'My technician wants to buy one giant instance; my business partner prefers adding more identical instances behind a load balancer when contests come and removing them afterward. What is her approach called?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-scale-up',
          label: 'Vertical scaling (scale up)',
          definition:
            'Giving the same instance more capacity, for example by changing it to a larger instance type.',
          explanation:
            'That\'s what the technician is proposing. His partner doesn\'t enlarge one instance: she adds and removes identical instances.',
          correct: false,
        },
        {
          id: 'maker-scale-out',
          label: 'Horizontal scaling (scale out / scale in)',
          definition: 'Adding instances when load rises and removing them when it drops.',
          explanation:
            'Adding identical instances behind the load balancer is scaling out, and removing them afterward is scaling in. With Auto Scaling, the shop adjusts to demand in both directions.',
          correct: true,
        },
        {
          id: 'maker-scale-down',
          label: 'Vertical scaling (scale down)',
          definition: 'Reducing the capacity of the same instance by changing it to a smaller instance type.',
          explanation:
            'Scaling down shrinks a single instance; the partner is proposing to change the number of instances, not their size.',
          correct: false,
        },
        {
          id: 'maker-high-availability',
          label: 'Fault tolerance across Availability Zones',
          definition:
            'A system\'s ability to keep running despite failures, for example by using several Availability Zones.',
          explanation:
            'High availability is about withstanding failures. Adding instances because more quotes are coming in is scaling, not withstanding a failure.',
          correct: false,
        },
      ],
    },
    {
      id: 'maker-partner-telemetry',
      prompt:
        'Now, the partner workshops: they send their printers\' status over TCP and UDP, there are tons of connections, and they need a static IP address to allow in their firewalls. Which load balancer do we put in front of that service?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-alb',
          label: 'Application Load Balancer (ALB)',
          definition:
            'Layer 7 (HTTP/HTTPS) load balancer with flexible routing based on the request path or content.',
          explanation:
            'The ALB shines with HTTP/HTTPS web applications. For TCP/UDP connections with extreme performance and a static IP, the classic case is the NLB.',
          correct: false,
        },
        {
          id: 'maker-gwlb',
          label: 'Gateway Load Balancer (GWLB)',
          definition:
            'Load balancer that combines a layer 3 gateway with layer 4 load balancing to deploy and scale virtual network appliances.',
          explanation:
            'The GWLB is for deploying firewalls or traffic inspection systems, not for receiving telemetry from the partners\' printers.',
          correct: false,
        },
        {
          id: 'maker-ec2-auto-scaling',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'Service that maintains the right number of EC2 instances with groups that have minimum, maximum and desired capacity.',
          explanation:
            'EC2 Auto Scaling adjusts how many instances there are, but it isn\'t a load balancer and doesn\'t offer partners a static IP address.',
          correct: false,
        },
        {
          id: 'maker-nlb',
          label: 'Network Load Balancer (NLB)',
          definition:
            'Elastic Load Balancing load balancer that operates at layer 4 (TCP/UDP), designed for extreme performance or a static IP address.',
          explanation:
            'The NLB distributes TCP and UDP connections with extreme performance and can have a static IP, so partners configure their firewall just once.',
          correct: true,
        },
      ],
    },
    {
      id: 'maker-multi-az',
      prompt:
        'I read that an Availability Zone can have problems. If that happens in the middle of a contest, I don\'t want the whole quote platform to go down. How do we organize the Auto Scaling group?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-spread-azs',
          label: 'Spread the group\'s instances across several Availability Zones, behind the load balancer',
          definition:
            'Design in which an Auto Scaling group distributes its instances across several AZs and a load balancer distributes traffic among them.',
          explanation:
            'Auto Scaling can spread instances across several AZs and the load balancer only sends traffic to healthy ones. If one AZ fails, the others keep serving and the group restores the desired capacity.',
          correct: true,
        },
        {
          id: 'maker-single-az',
          label: 'Put all the instances in a single Availability Zone so they are closer together',
          definition: 'Design in which all the application\'s servers run in the same group of data centers.',
          explanation:
            'If all the instances are in a single AZ and that AZ fails, the entire platform goes down. It\'s the opposite of what Martín is asking for.',
          correct: false,
        },
        {
          id: 'maker-raise-max',
          label: 'Raise the group\'s maximum capacity, without changing where the instances are',
          definition:
            'Maximum capacity is the upper limit of instances an Auto Scaling group can have.',
          explanation:
            'A higher maximum allows more growth, but if all the instances are still in the same AZ, a failure in that AZ affects all of them.',
          correct: false,
        },
        {
          id: 'maker-bigger-instance',
          label: 'Switch to fewer but much larger instances in the same Availability Zone',
          definition: 'Vertical scaling: concentrating capacity in a few instances of a larger type.',
          explanation:
            'Larger instances in the same AZ don\'t withstand a failure of that AZ, and they also lose the flexibility of adding and removing instances.',
          correct: false,
        },
      ],
    },
    {
      id: 'maker-scaling-plan',
      prompt:
        'Last topic. The quote engine runs on Amazon ECS tasks, orders are in a DynamoDB table, and the catalog uses Aurora read replicas. I want to configure scaling for all of that from a single place. What do we use?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'maker-ec2-only',
          label: 'Amazon EC2 Auto Scaling',
          definition:
            'Service focused on maintaining the right number of EC2 instances within Auto Scaling groups.',
          explanation:
            'EC2 Auto Scaling focuses on EC2 instances; coordinating ECS tasks, DynamoDB tables and Aurora replicas is the job of AWS Auto Scaling.',
          correct: false,
        },
        {
          id: 'maker-elb',
          label: 'Elastic Load Balancing',
          definition:
            'Service that distributes incoming requests across multiple targets and checks their health.',
          explanation:
            'ELB distributes traffic; it doesn\'t adjust DynamoDB read and write capacity or the number of Aurora replicas.',
          correct: false,
        },
        {
          id: 'maker-aws-auto-scaling',
          label: 'AWS Auto Scaling',
          definition:
            'Service that configures scaling for several related resources of an application from a single place, using scaling plans.',
          explanation:
            'With a scaling plan, AWS Auto Scaling adjusts ECS tasks, DynamoDB table capacity and Aurora read replicas, and it offers scaling recommendations.',
          correct: true,
        },
        {
          id: 'maker-nlb-again',
          label: 'A second Network Load Balancer',
          definition: 'Layer 4 (TCP/UDP) load balancer for extreme performance or a static IP address.',
          explanation:
            'Another load balancer would distribute more traffic, but it doesn\'t scale database tables or container tasks.',
          correct: false,
        },
      ],
    },
  ],
};
