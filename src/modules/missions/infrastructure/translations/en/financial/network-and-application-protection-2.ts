import type { Mission } from '../../../../domain/Mission';

/**
 * Aseguradora Pacífico: an insurer in Guayaquil with many AWS accounts and a quote portal targeted by DDoS attacks.
 * Practices AWS Shield Advanced, AWS Firewall Manager, and network ACLs versus security groups.
 */
export const networkAndApplicationProtection2: Mission = {
  id: 'network-and-application-protection-2',
  track: 'financial',
  topicSlug: 'network-and-application-protection',
  buildingId: 'insurer',
  title: 'A shield for the insurer',
  client: { name: 'Andrés Villalobos', role: 'Head of Infrastructure at Aseguradora Pacífico' },
  intro: [
    'Come in, come in. I’m Andrés Villalobos, head of infrastructure at Aseguradora Pacífico. From Guayaquil we sell auto, health and home insurance all over Ecuador.',
    'Our quote portal runs on AWS, behind Application Load Balancers and Amazon CloudFront. Each department has its own account, and we’re up to twenty accounts in AWS Organizations.',
    'Last month we suffered a huge DDoS attack right at the close of the sales period, and every team has its firewall rules its own way. Nobody really knows what is protected and what isn’t.',
    'The board wants a serious plan before the next campaign. I need someone to help me raise a good shield. Are you up for it?',
  ],
  outro: {
    passed: [
      'Now this is a different story. Shield Advanced covers the portal with its response team, and Firewall Manager applies the same rules across all twenty accounts, even the ones we create tomorrow.',
      'And with network ACLs properly understood, the networking team finally speaks the same language. Thank you: the board is going to sleep soundly.',
    ],
    failed: [
      'Hmm... with this plan I don’t dare face the board. Some decisions would leave us exposed.',
      'Review the theory on Shield, Firewall Manager and VPC network controls, and come back whenever you like. The insurer is waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ddos-response',
      prompt:
        'The first thing is the quote portal. We want expanded DDoS protection for the load balancers and CloudFront, the ability to call a specialized AWS team during an attack, and for a cost spike caused by the attack not to ruin our month. What do we sign up for?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'shield-standard-ddos',
          label: 'AWS Shield Standard',
          definition:
            'Automatic protection at no additional charge against the most common layer 3 and 4 DDoS attacks.',
          explanation:
            'The insurer already has Shield Standard, but it doesn’t include the Shield Response Team or the cost protection the board is asking for.',
          correct: false,
        },
        {
          id: 'waf-only-ddos',
          label: 'Just AWS WAF with a web ACL on the portal',
          definition:
            'A web application firewall that filters HTTP(S) requests with rules associated with resources such as CloudFront or an Application Load Balancer.',
          explanation:
            'AWS WAF filters web requests at layer 7, but on its own it doesn’t give access to a DDoS response team or cost protection during an attack.',
          correct: false,
        },
        {
          id: 'shield-advanced',
          label: 'AWS Shield Advanced',
          definition:
            'A paid AWS Shield subscription with expanded DDoS protection for the chosen resources, plus detailed metrics and reports.',
          explanation:
            'Shield Advanced gives expanded protection to load balancers and CloudFront, access to the Shield Response Team and cost protection for spikes caused by an attack. To work with the SRT, AWS also requires a paid AWS Support plan.',
          correct: true,
        },
        {
          id: 'nacl-ddos',
          label: 'A network ACL on each of the portal’s subnets',
          definition:
            'Allow and deny rules by IP and port that apply to a subnet’s traffic, evaluated in numerical order.',
          explanation:
            'A network ACL controls traffic by IP and port in a subnet. It doesn’t include a response team or cost protection against a DDoS attack.',
          correct: false,
        },
      ],
    },
    {
      id: 'central-rules',
      prompt:
        'Now the mess of rules. We want to define our AWS WAF rules once and have them applied automatically across the organization’s twenty accounts, including new accounts that get created. Which service do we use?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'firewall-manager',
          label: 'AWS Firewall Manager',
          definition:
            'A service that defines protection policies once and applies them across the accounts and resources of an AWS Organizations organization.',
          explanation:
            'Firewall Manager automatically applies AWS WAF rules across all of the organization’s accounts and resources, even new ones. It requires AWS Organizations, which the insurer already uses.',
          correct: true,
        },
        {
          id: 'single-web-acl',
          label: 'An AWS WAF web ACL in the main account',
          definition:
            'A set of AWS WAF rules with a default action, associated with specific resources that receive HTTP(S) requests.',
          explanation:
            'A web ACL protects the resources it’s associated with. Choosing WAF alone when rules are needed in every account of the organization is a classic exam trap.',
          correct: false,
        },
        {
          id: 'shield-standard-central',
          label: 'AWS Shield Standard',
          definition:
            'The AWS Shield tier active for all customers that mitigates common DDoS attacks on the network and transport layers.',
          explanation:
            'Shield Standard protects against layer 3 and 4 DDoS. It doesn’t manage WAF rules across accounts.',
          correct: false,
        },
        {
          id: 'security-group-central',
          label: 'A security group copied into each account',
          definition:
            'A stateful, instance-level virtual firewall that controls traffic by IP, port and protocol.',
          explanation:
            'A security group works with IPs and ports on each instance. It doesn’t apply WAF rules or spread on its own to new accounts.',
          correct: false,
        },
      ],
    },
    {
      id: 'block-ip',
      prompt:
        'Insurance brokers upload files to an SFTP server on an EC2 instance. We detected an IP trying to brute-force its way in and we want to deny it for the server’s entire subnet. This isn’t web traffic. What do we use?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'sg-deny',
          label: 'A deny rule in the server’s security group',
          definition:
            'A set of rules associated with an instance’s network interface that evaluates all of its rules before deciding.',
          explanation:
            'Security groups only support allow rules. Blocking an IP with a security group is a classic exam trap.',
          correct: false,
        },
        {
          id: 'waf-sftp',
          label: 'An AWS WAF rule that blocks that IP',
          definition:
            'A web application firewall rule that filters HTTP(S) requests by conditions such as IP address or country of origin.',
          explanation:
            'AWS WAF filters HTTP(S) requests and is associated with resources such as ALB, CloudFront or API Gateway. SFTP traffic to an EC2 instance doesn’t go through WAF.',
          correct: false,
        },
        {
          id: 'shield-sftp',
          label: 'AWS Shield Standard',
          definition:
            'Automatic DDoS protection that mitigates common flooding attacks at the network and transport layers.',
          explanation:
            'Shield Standard protects against common DDoS attacks. It can’t be used to deny a specific IP that is trying to guess passwords.',
          correct: false,
        },
        {
          id: 'nacl-deny',
          label: 'A deny rule in the subnet’s network ACL',
          definition:
            'A subnet-level access control list that supports allow and deny rules by IP and port.',
          explanation:
            'Network ACLs support deny rules and apply to the whole subnet, so they block that IP for any protocol, including SFTP.',
          correct: true,
        },
      ],
    },
    {
      id: 'stateless-nacl',
      prompt:
        'When we added that rule, someone on the team asked a question that split us: if the network ACL allows the SFTP traffic coming into the subnet, do we also need a rule for the responses to go out? What do I tell them?',
      topicSlug: 'network-and-application-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'nacl-stateful',
          label: 'No: network ACLs are stateful and the response is allowed automatically',
          definition:
            'A stateful filter remembers allowed connections and automatically lets the response traffic through.',
          explanation:
            'Stateful describes security groups. Network ACLs are stateless and don’t remember the request they let in.',
          correct: false,
        },
        {
          id: 'nacl-stateless',
          label: 'Yes: network ACLs are stateless and the response must be explicitly allowed',
          definition:
            'A stateless filter evaluates each packet separately, without taking into account the connections it already allowed.',
          explanation:
            'Network ACLs are stateless: response traffic needs its own outbound rule. In a security group, by contrast, the response is allowed automatically.',
          correct: true,
        },
        {
          id: 'shield-responses',
          label: 'No: AWS Shield Standard allows responses automatically',
          definition:
            'A DDoS protection service that mitigates common attacks against the network of AWS resources.',
          explanation:
            'Shield Standard protects against DDoS. It doesn’t decide which response traffic a network ACL lets through.',
          correct: false,
        },
        {
          id: 'waf-outbound',
          label: 'Yes, but the outbound rule is created in AWS WAF',
          definition:
            'A layer 7 firewall that evaluates HTTP(S) requests with rules grouped in a web ACL.',
          explanation:
            'AWS WAF filters web requests to resources such as CloudFront or an ALB. A subnet’s outbound rules are defined in the network ACL itself.',
          correct: false,
        },
      ],
    },
  ],
};
