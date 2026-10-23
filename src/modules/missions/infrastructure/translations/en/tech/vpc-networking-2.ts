import type { Mission } from '../../../../domain/Mission';

/**
 * Café Hacker: a coworking café in Guadalajara whose booking app on AWS must survive an Availability Zone outage.
 * Practices subnets per Availability Zone, security groups, stateful versus stateless rules and VPC Flow Logs.
 */
export const vpcNetworking2: Mission = {
  id: 'vpc-networking-2',
  track: 'tech',
  topicSlug: 'vpc-networking',
  buildingId: 'hacker-cafe',
  title: 'Firewall with a side of coffee',
  client: { name: 'Valentina Gallardo', role: 'Owner of Café Hacker' },
  intro: [
    'Hi! Order whatever you like, it\'s on the house. I\'m Valentina Gallardo, owner of Café Hacker. I opened the first one in Guadalajara: specialty coffee, good Wi-Fi and tables for coding.',
    'Today we have three locations and an app where the community books tables, rooms and spots at our hackathons. The app runs on a few EC2 instances inside a VPC I set up myself by watching tutorials.',
    'Last week the app went down in the middle of a hackathon and nobody could sign up. On top of that, a customer asked me whether the network was well protected, and I didn\'t know what to say.',
    'In a café full of hackers, I can\'t have a network full of holes. Will you help me review it? The coffee\'s on me.',
  ],
  outro: {
    passed: [
      'Now I get it: one subnet per AZ, security groups as the main firewall that remember the responses, and Flow Logs to know who\'s knocking at the door.',
      'The next hackathon won\'t go down. And if any of my hacker customers tries something, I\'ll have a way to see it. You\'ve got free coffee for life!',
    ],
    failed: [
      'Hmm... with these answers I think my network would still have holes. And around here, customers notice fast.',
      'Review the theory on Amazon VPC over a good cup of coffee and come back whenever you like. I\'ll save you the table by the window.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'subnets-per-az',
      prompt:
        'What hurt the most was the outage in the middle of the hackathon. Everything was in a single Availability Zone. I read that I should spread the instances across two AZs. How do I set up the subnets?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'one-subnet-two-azs',
          label: 'One big subnet that spans both AZs',
          definition: 'A range of IP addresses within the VPC that extends across several Availability Zones.',
          explanation:
            'This is a classic trap: each subnet lives in a single Availability Zone, so there\'s no such thing as a subnet that spans two.',
          correct: false,
        },
        {
          id: 'two-subnets-same-az',
          label: 'Two subnets in the same AZ, with instances in each',
          definition: 'Splitting the VPC\'s IP range into several subnets located in the same Availability Zone.',
          explanation:
            'If that AZ fails, both subnets go down together. For high availability, the subnets have to be in different AZs.',
          correct: false,
        },
        {
          id: 'subnet-per-az',
          label: 'One subnet in each AZ, with instances spread across both',
          definition: 'Creating subnets in different Availability Zones, each with its own range of IP addresses.',
          explanation:
            'Each subnet lives in a single AZ, which is why for high availability you create one subnet in each AZ. If one AZ fails, the instances in the other keep serving.',
          correct: true,
        },
        {
          id: 'bigger-instance',
          label: 'A single larger instance in the current subnet',
          definition: 'Vertical scaling: replacing an instance with another one that has more CPU and memory.',
          explanation:
            'A larger instance handles more load, but it\'s still in a single AZ. If that AZ fails, the app goes down anyway.',
          correct: false,
        },
      ],
    },
    {
      id: 'instance-firewall',
      prompt:
        'Now for protection. I want each app instance to receive only HTTPS traffic from the load balancer. What should I use as the main instance-level control, the one AWS recommends?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'security-group',
          label: 'A security group',
          definition:
            'Virtual firewall that controls traffic in and out of resources such as EC2 instances, with allow rules.',
          explanation:
            'AWS recommends the security group as the primary mechanism for network access control. It works at the instance level and lets you open only HTTPS from the load balancer.',
          correct: true,
        },
        {
          id: 'network-acl',
          label: 'A network ACL',
          definition: 'Access control list that filters traffic for an entire subnet with allow and deny rules.',
          explanation:
            'The network ACL works at the subnet level and is useful as an additional layer of defense, but it isn\'t the main control at the level of each instance.',
          correct: false,
        },
        {
          id: 'inspector',
          label: 'Amazon Inspector',
          definition: 'Service that continuously scans workloads for vulnerabilities and network exposure.',
          explanation:
            'Inspector detects weaknesses, but it doesn\'t control what traffic reaches each instance. It isn\'t a firewall.',
          correct: false,
        },
        {
          id: 'internet-gateway',
          label: 'An internet gateway',
          definition: 'Component that connects a VPC to the internet.',
          explanation:
            'The internet gateway provides internet access, but it doesn\'t filter what traffic can reach each instance.',
          correct: false,
        },
      ],
    },
    {
      id: 'return-traffic',
      prompt:
        'I already allowed inbound HTTPS in the security group. A friend tells me I also need to create a rule to let the responses out, because otherwise users won\'t get anything back. Is he right?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'yes-stateless',
          label: 'Yes: every AWS firewall is stateless and needs a rule for the response',
          definition: 'A stateless control evaluates the response separately, so it needs its own rule.',
          explanation:
            'That describes the network ACL. The security group is stateful: if you allow the inbound traffic, the response goes out on its own.',
          correct: false,
        },
        {
          id: 'yes-route-table',
          label: 'Yes, and you also have to allow the response in the route table',
          definition: 'The route table defines where traffic leaving a subnet is directed.',
          explanation:
            'Route tables indicate where traffic goes; they don\'t allow or block responses. And in the security group, the response is already allowed.',
          correct: false,
        },
        {
          id: 'no-numeric-order',
          label: 'No, because rules are evaluated in numerical order and the first one already allows it',
          definition: 'Evaluating rules one by one, by number, until the first match is found.',
          explanation:
            'Numerical order is how the network ACL evaluates its rules. The security group evaluates all of its rules, and the reason the response goes out is that it\'s stateful.',
          correct: false,
        },
        {
          id: 'no-stateful',
          label: 'No: the security group is stateful and allows the response automatically',
          definition: 'A stateful control remembers allowed connections and lets their response traffic through.',
          explanation:
            'If the security group allows an inbound request, the response goes out automatically. A rule for the response would be needed in a network ACL, which is stateless.',
          correct: true,
        },
      ],
    },
    {
      id: 'traffic-records',
      prompt:
        'Last topic: after the outage, I want a record of which IP addresses connect to my instances\' network interfaces and which traffic is accepted or rejected, so I can investigate if anything strange happens again. What do I turn on?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition: 'Service that records actions taken by users, roles and services through AWS APIs as events.',
          explanation:
            'CloudTrail answers who made which API call, such as creating an instance. It doesn\'t record the IP traffic reaching the network interfaces.',
          correct: false,
        },
        {
          id: 'inspector-records',
          label: 'Amazon Inspector',
          definition: 'Vulnerability management service that generates findings about vulnerable software and network exposure.',
          explanation:
            'Inspector finds weaknesses, but it doesn\'t keep a record of every connection that reaches the instances.',
          correct: false,
        },
        {
          id: 'flow-logs',
          label: 'VPC Flow Logs',
          definition: 'Feature that captures information about the IP traffic going to and from network interfaces in the VPC.',
          explanation:
            'Flow Logs record the network interfaces\' IP traffic, with data such as the source and whether it was accepted or rejected. It\'s the foundation for investigating suspicious connections.',
          correct: true,
        },
        {
          id: 'nat-gateway',
          label: 'A NAT gateway',
          definition: 'Network address translation service that gives instances in private subnets outbound internet access.',
          explanation:
            'The NAT gateway gives private subnets a way out to the internet; it isn\'t a tool for recording the traffic that reaches the instances.',
          correct: false,
        },
      ],
    },
  ],
};
