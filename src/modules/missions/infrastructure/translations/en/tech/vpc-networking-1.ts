import type { Mission } from '../../../../domain/Mission';

/**
 * Electrónica Volta: an electronics shop in Santa Cruz de la Sierra opening its online store on AWS after a scare.
 * Practices public and private subnets, the NAT gateway, network ACL deny rules and Amazon Inspector.
 */
export const vpcNetworking1: Mission = {
  id: 'vpc-networking-1',
  track: 'tech',
  topicSlug: 'vpc-networking',
  buildingId: 'electronics-store',
  title: 'Wired the right way',
  client: { name: 'Rodrigo Saavedra', role: 'Owner of Electrónica Volta' },
  intro: [
    'Welcome to Electrónica Volta! I\'m Rodrigo Saavedra, the owner. I started out selling cables and plugs at a little stall in Santa Cruz de la Sierra, and today we sell phones, consoles and computers all over Bolivia.',
    'We\'re moving the online store to AWS: a few web servers, a load balancer and a database with orders and customer data.',
    'Last month we had a scare: someone found our test server open to the internet and used it to send spam. Now I\'m afraid the same thing could happen to the customer database.',
    'You know networks and I know circuits. This time I want everything wired the right way from the start. Will you help me design the network?',
  ],
  outro: {
    passed: [
      'Now we\'re talking: the website facing the internet, the database tucked away in its private subnet, patches through the NAT gateway, and that annoying IP blocked in the network ACL.',
      'And with Amazon Inspector keeping watch, I\'ll find out before the attackers do. Thank you: drop by anytime, there will always be a free charger for you.',
    ],
    failed: [
      'Hmm... with this design I still see loose wires. I don\'t want another scare like last month\'s.',
      'Take your time reviewing the theory on Amazon VPC and come back whenever you like. I\'ll be waiting for you here, soldering iron on.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'subnet-layout',
      prompt:
        'First the basics: we have the load balancer, the web servers and the customer database. Customers must be able to reach the store from the internet, but the database must not be exposed. How do we lay everything out in the VPC?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'all-public',
          label: 'Everything in public subnets, so nothing has connection problems',
          definition: 'Subnets whose route table has a direct route to an internet gateway.',
          explanation:
            'Putting the database in a public subnet is the classic trap: it would have a direct path from the internet, exactly what Rodrigo wants to avoid.',
          correct: false,
        },
        {
          id: 'public-web-private-db',
          label: 'Load balancer and web servers in public subnets; database in private subnets',
          definition:
            'Design that separates resources by their route: public ones with a route to an internet gateway, and internal ones in subnets without that direct route.',
          explanation:
            'The store stays reachable through the public subnets, while the database lives in private subnets with no direct route to an internet gateway.',
          correct: true,
        },
        {
          id: 'public-db-password',
          label: 'The database in a public subnet, but with a very long password',
          definition: 'Exposing a resource with a route to the internet and relying only on its credentials to protect it.',
          explanation:
            'A good password helps, but the database would still be exposed to the internet. Databases go in private subnets.',
          correct: false,
        },
        {
          id: 'separate-vpc-peering',
          label: 'Everything in private subnets, with customers coming in through VPC peering',
          definition: 'Connection between two VPCs that lets you route traffic between them.',
          explanation:
            'VPC peering connects two VPCs to each other, not to shoppers arriving from the internet. Without public subnets, nobody could get into the store.',
          correct: false,
        },
      ],
    },
    {
      id: 'database-patches',
      prompt:
        'The database servers are in the private subnet, perfect. But every week they need to download operating system updates, and I don\'t want to open any inbound door to them from the internet. What do I add?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'igw-route',
          label: 'A direct route from the private subnet to the internet gateway',
          definition: 'Route table entry that sends the subnet\'s traffic directly to the internet through the internet gateway.',
          explanation:
            'With a direct route to the internet gateway, the subnet would stop being private and become public, leaving the database more exposed.',
          correct: false,
        },
        {
          id: 'open-security-group',
          label: 'A security group that allows inbound traffic from any IP address',
          definition: 'Virtual firewall for resources such as EC2 instances, with rules that allow inbound and outbound traffic.',
          explanation:
            'Opening inbound traffic to any IP is the opposite of what Rodrigo is asking for, and it doesn\'t give a private subnet an outbound path to the internet.',
          correct: false,
        },
        {
          id: 'nat-gateway',
          label: 'A NAT gateway in a public subnet and a route to it from the private subnet',
          definition:
            'Network address translation service that lets instances in private subnets connect to services outside the VPC.',
          explanation:
            'The NAT gateway lets the private servers go out to download patches, and nobody outside can initiate a connection to them through it.',
          correct: true,
        },
        {
          id: 'vpc-peering-patches',
          label: 'A VPC peering connection with another VPC',
          definition: 'Connection between two VPCs to route traffic between them as if they were on the same network.',
          explanation:
            'Peering joins two VPCs; it doesn\'t give the private subnet a controlled way out to patch servers on the internet.',
          correct: false,
        },
      ],
    },
    {
      id: 'block-ip-range',
      prompt:
        'Today we saw thousands of connection attempts from one specific IP address range. I want to block that range for the entire web server subnet. Where do I do it?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'network-acl-deny',
          label: 'A deny rule in the subnet\'s network ACL',
          definition:
            'Access control list that controls traffic for an entire subnet, with allow and deny rules evaluated in numerical order.',
          explanation:
            'The network ACL applies to the whole subnet and supports deny rules, so it\'s the right tool to block a specific IP range as an additional layer of defense.',
          correct: true,
        },
        {
          id: 'security-group-deny',
          label: 'A deny rule in the servers\' security group',
          definition: 'Virtual firewall that controls traffic for its associated instances and evaluates all of its rules before deciding.',
          explanation:
            'This is the classic trap: security groups only have allow rules. To deny an IP range, you use a network ACL.',
          correct: false,
        },
        {
          id: 'inspector-block',
          label: 'Amazon Inspector',
          definition:
            'Vulnerability management service that continuously scans workloads and generates findings with recommendations.',
          explanation:
            'Inspector detects vulnerabilities and network exposure, but it doesn\'t block traffic. It isn\'t a firewall.',
          correct: false,
        },
        {
          id: 'flow-logs-block',
          label: 'VPC Flow Logs',
          definition: 'Feature that captures information about the IP traffic going to and from network interfaces in the VPC.',
          explanation:
            'Flow Logs help you see where the attempts come from, but they only record traffic; they don\'t block it.',
          correct: false,
        },
      ],
    },
    {
      id: 'vulnerability-scan',
      prompt:
        'Last topic, because of last month\'s scare: I want something to continuously check our EC2 instances and alert us if they have software with known vulnerabilities or ports open to the internet for no reason. Which service do we use?',
      topicSlug: 'vpc-networking',
      examTasks: ['3.5'],
      options: [
        {
          id: 'network-acl-scan',
          label: 'A stricter network ACL',
          definition: 'Subnet-level access control list with stateless allow and deny rules.',
          explanation:
            'A network ACL controls traffic, but it doesn\'t check the instances\' software or warn about vulnerabilities.',
          correct: false,
        },
        {
          id: 'route-table-scan',
          label: 'Manually review the route tables every month',
          definition: 'Tables that define where traffic leaving each subnet of the VPC is directed.',
          explanation:
            'Route tables say nothing about software vulnerabilities, and a monthly manual review is not a continuous scan.',
          correct: false,
        },
        {
          id: 'security-group-scan',
          label: 'A new security group for each instance',
          definition: 'Stateful virtual firewall that controls traffic in and out of resources such as EC2 instances.',
          explanation:
            'Security groups control traffic, but they don\'t detect vulnerable software or warn about weaknesses.',
          correct: false,
        },
        {
          id: 'inspector',
          label: 'Amazon Inspector',
          definition:
            'Vulnerability management service that continuously discovers and scans EC2 instances, container images in ECR and Lambda functions.',
          explanation:
            'Inspector continuously scans for software vulnerabilities and unintended network exposure, and generates findings with remediation recommendations.',
          correct: true,
        },
      ],
    },
  ],
};
