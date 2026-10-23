import type { Mission } from '../../../../domain/Mission';

/**
 * TeleVida: the telemedicine service of Clínica Vida in Barranquilla, swamped by video consultations every flu-season morning.
 * Practices EC2 Auto Scaling groups (minimum, maximum, desired), Application Load Balancer path routing,
 * health-check replacement and scaling in to stop paying for idle capacity.
 */
export const scalingAndLoadBalancing1: Mission = {
  id: 'scaling-and-load-balancing-1',
  track: 'tech',
  topicSlug: 'scaling-and-load-balancing',
  buildingId: 'clinic',
  title: 'The virtual waiting room',
  client: { name: 'Valeria Ortiz', role: 'IT Coordinator at TeleVida, the telemedicine service of Clínica Vida' },
  intro: [
    'Hi, I\'m so glad you made it. I\'m Valeria Ortiz, and I coordinate technology at TeleVida, the telemedicine service of Clínica Vida in Barranquilla.',
    'Our patients book appointments and have video consultations from their phones. In the early hours almost nobody logs in, but during flu season, between seven and ten in the morning, thousands of people connect at once.',
    'Today everything runs on three fixed servers on Amazon EC2. In the mornings the app gets painfully slow and patients abandon the virtual waiting room; at night, those servers stay on doing nothing.',
    'Management asked me for a solution before the next flu peak. Will you help me make TeleVida grow when people need it and shrink when they don\'t?',
  ],
  outro: {
    passed: [
      'We did it! Now the Auto Scaling group adds servers when the waiting room fills up, the load balancer sends each request where it belongs, and failed instances are replaced automatically.',
      'And at night the platform shrinks on its own, so we stopped paying for idle servers. Thank you: TeleVida\'s patients don\'t have to wait anymore.',
    ],
    failed: [
      'Hmm... with this plan the waiting room will fill up again next flu season.',
      'Review the theory on Auto Scaling and Elastic Load Balancing and come back whenever you like. I\'ll be waiting for you here.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'televida-asg-limits',
      prompt:
        'First things first: I want us never to have fewer than 2 servers, never more than 12 so we don\'t blow the budget, and to add or remove them based on demand. What do we configure?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-alb-twelve-targets',
          label: 'An Application Load Balancer with 12 instances registered from the start',
          definition:
            'Layer 7 load balancer that distributes HTTP/HTTPS requests across its registered targets.',
          explanation:
            'The load balancer distributes traffic, but it doesn\'t add or remove servers. With 12 fixed instances, TeleVida would pay for the peak every night.',
          correct: false,
        },
        {
          id: 'televida-asg-min-max',
          label: 'An Amazon EC2 Auto Scaling group with minimum capacity 2, maximum 12 and scaling policies',
          definition:
            'Set of EC2 instances treated as a logical unit, with minimum, maximum and desired capacity, and rules that launch or terminate instances.',
          explanation:
            'Scaling policies launch instances when demand rises and terminate them when it drops, always between the minimum of 2 and the maximum of 12 that TeleVida defined.',
          correct: true,
        },
        {
          id: 'televida-scale-up',
          label: 'Replace the three servers with a much larger instance type',
          definition:
            'Vertical scaling (scale up): giving the same instance more capacity by changing it to a larger type.',
          explanation:
            'A larger instance is still fixed capacity: it doesn\'t shrink in the early hours or grow beyond its size at the flu peak.',
          correct: false,
        },
        {
          id: 'televida-gwlb',
          label: 'A Gateway Load Balancer in front of the servers',
          definition:
            'Load balancer that combines a layer 3 gateway with layer 4 load balancing to deploy and scale virtual network appliances.',
          explanation:
            'The GWLB is for inserting firewalls or intrusion detection systems into the traffic path; it doesn\'t adjust the number of app servers.',
          correct: false,
        },
      ],
    },
    {
      id: 'televida-path-routing',
      prompt:
        'The app has two parts: requests to /appointments are lightweight and requests to /video-consultation are heavy. I want to send each path to its own group of servers. Which load balancer do we use?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-alb',
          label: 'Application Load Balancer (ALB)',
          definition:
            'Elastic Load Balancing load balancer that operates at layer 7 (HTTP/HTTPS) and can route based on the request path or content.',
          explanation:
            'The ALB reads the URL path, so it can send /appointments to one group of servers and /video-consultation to another.',
          correct: true,
        },
        {
          id: 'televida-nlb',
          label: 'Network Load Balancer (NLB)',
          definition:
            'Load balancer that operates at layer 4 (TCP/UDP), designed for extreme performance or for having a static IP address.',
          explanation:
            'The NLB works with TCP/UDP connections and doesn\'t route by HTTP path; URL path routing is an ALB feature.',
          correct: false,
        },
        {
          id: 'televida-classic',
          label: 'Classic Load Balancer',
          definition: 'Previous-generation Elastic Load Balancing load balancer.',
          explanation:
            'It\'s the previous generation and AWS recommends migrating to a current load balancer. For routing by URL path, the right choice is the ALB.',
          correct: false,
        },
        {
          id: 'televida-aws-auto-scaling',
          label: 'AWS Auto Scaling',
          definition:
            'Service that configures scaling for multiple related resources from a single place using scaling plans.',
          explanation:
            'AWS Auto Scaling adjusts resource capacity, but it doesn\'t distribute requests or route by URL path.',
          correct: false,
        },
      ],
    },
    {
      id: 'televida-unhealthy-instance',
      prompt:
        'Last night, at three in the morning, one of the video consultation servers stopped responding to health checks. The group has a desired capacity of 4. What should happen without anyone getting out of bed?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-alb-launches',
          label: 'The load balancer launches a new instance to replace the one that failed',
          definition:
            'The idea that the load balancer creates new servers when it detects an unhealthy target.',
          explanation:
            'The load balancer stops sending traffic to the unhealthy target, but it doesn\'t launch instances. Thinking the load balancer adds servers is a classic trap.',
          correct: false,
        },
        {
          id: 'televida-raise-max',
          label: 'Auto Scaling raises the maximum of 12 to cover the failed server',
          definition:
            'Maximum capacity is the upper limit of instances the Auto Scaling group never exceeds.',
          explanation:
            'TeleVida sets the maximum capacity and it doesn\'t change because of a failure; what Auto Scaling maintains is the desired capacity.',
          correct: false,
        },
        {
          id: 'televida-replace-instance',
          label: 'The load balancer stops sending it traffic and EC2 Auto Scaling replaces it to get back to 4 instances',
          definition:
            'Elastic Load Balancing and EC2 Auto Scaling working together: health checks, traffic only to healthy targets and automatic instance replacement.',
          explanation:
            'The load balancer only sends requests to healthy targets, and Auto Scaling automatically replaces the failed instance to maintain the desired capacity of 4.',
          correct: true,
        },
        {
          id: 'televida-wait-admin',
          label: 'Valeria gets an alarm and launches another instance by hand to get back to 4',
          definition:
            'Manual recovery in which a person launches a new server after detecting the failure.',
          explanation:
            'EC2 Auto Scaling automatically replaces unhealthy instances; TeleVida doesn\'t depend on someone waking up in the middle of the night.',
          correct: false,
        },
      ],
    },
    {
      id: 'televida-night-costs',
      prompt:
        'The CFO asked me two questions: what happens to the extra servers when the morning peak ends? And how much does AWS charge us for using Auto Scaling?',
      topicSlug: 'scaling-and-load-balancing',
      examTasks: ['3.3'],
      options: [
        {
          id: 'televida-keep-running',
          label: 'They stay on for tomorrow\'s peak, and Auto Scaling charges a flat fee per group',
          definition:
            'Scenario in which capacity only grows and each Auto Scaling group has its own monthly charge.',
          explanation:
            'Elasticity also means shrinking: leaving the extra servers running means paying for idle capacity. Also, EC2 Auto Scaling has no charge of its own per group.',
          correct: false,
        },
        {
          id: 'televida-per-policy',
          label: 'They shut down only if someone orders it, and there\'s a charge for each scaling policy run',
          definition:
            'Scenario in which reducing capacity is a manual task and each scaling policy run is billed separately.',
          explanation:
            'Scaling policies also terminate instances when demand drops, without manual intervention, and they aren\'t billed separately.',
          correct: false,
        },
        {
          id: 'televida-high-availability',
          label: 'They move to another Availability Zone, because shrinking is part of high availability',
          definition:
            'High availability is the ability to keep running despite failures, for example by using several Availability Zones.',
          explanation:
            'Confusing elasticity with high availability is a classic trap. Matching capacity to demand is elasticity, not moving servers between AZs.',
          correct: false,
        },
        {
          id: 'televida-scale-in',
          label: 'Auto Scaling terminates them when demand drops, and you only pay for the resources you use',
          definition:
            'Elasticity: acquiring resources when you need them and releasing them when you don\'t, with EC2 Auto Scaling at no additional cost beyond the resources it launches.',
          explanation:
            'When the peak ends, scaling policies terminate instances (scale in) without going below the minimum. EC2 Auto Scaling has no additional cost: TeleVida pays for the instances, volumes and alarms it uses.',
          correct: true,
        },
      ],
    },
  ],
};
