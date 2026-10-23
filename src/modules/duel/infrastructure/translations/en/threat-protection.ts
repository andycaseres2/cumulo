import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const threatProtectionFamily: ServiceFamily = {
  id: 'threat-protection',
  title: 'Threat detection and protection',
  summary:
    'Some detect threats in logs, others look for vulnerabilities or sensitive data, others stop DDoS or filter web requests, and others aggregate findings, investigate, or apply rules across all accounts.',
  services: [
    { name: 'Amazon GuardDuty', summary: 'Detects threats by analyzing CloudTrail, VPC Flow Logs, and DNS; foundational detection needs no agents.' },
    { name: 'Amazon Inspector', summary: 'Scans EC2, ECR images, and Lambda for software vulnerabilities (CVEs) and network exposure.' },
    { name: 'Amazon Macie', summary: 'Discovers sensitive data such as personal data in S3 and evaluates bucket security.' },
    { name: 'AWS Shield', summary: 'DDoS protection: Standard is automatic and free; Advanced is paid and comes with a response team.' },
    { name: 'AWS WAF', summary: 'Layer 7 web firewall: filters HTTP(S) requests by IP, country, SQL injection, or rate.' },
    { name: 'AWS Security Hub', summary: 'Aggregates findings from several services and checks your environment against standards like CIS.' },
    { name: 'Amazon Detective', summary: 'Investigates the root cause of a finding with a behavior graph built from your logs.' },
    { name: 'AWS Firewall Manager', summary: 'Applies WAF, Shield Advanced, and security group rules across every account in the organization.' },
  ],
  cards: [
    {
      id: 'threat-protection-1',
      prompt:
        'An e-commerce company in Bogotá wants to know if any instance starts mining cryptocurrency or if someone uses its credentials from a malicious IP, without installing agents. Which service does it enable?',
      options: [
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty analyzes CloudTrail, VPC Flow Logs, and DNS with threat intelligence and detects unauthorized mining and compromised credentials.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector looks for vulnerable software and network exposure; it does not watch for malicious activity in progress.',
        },
        {
          service: 'Amazon Macie',
          why: 'Macie looks for sensitive data in S3; it does not detect mining or the use of stolen credentials.',
        },
      ],
      answer: 'Amazon GuardDuty',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-2',
      prompt:
        'A fintech in Santiago wants to check its container images in ECR and its Lambda functions for packages with known CVEs before going to production. Which service does it use?',
      options: [
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detects malicious behavior in your logs; it does not inventory vulnerable packages.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector scans ECR images, Lambda functions, and EC2 instances for software vulnerabilities.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub receives and aggregates Inspector findings, but it is not what scans the images.',
        },
      ],
      answer: 'Amazon Inspector',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-3',
      prompt:
        'A clinic in Medellín stores thousands of files in S3 and does not know which ones contain ID numbers, medical records, or credit cards. Which service finds them?',
      options: [
        {
          service: 'Amazon Inspector',
          why: 'Inspector looks for vulnerabilities in compute; it does not read the contents of S3 objects.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty can detect threats against S3, but it does not classify which files hold personal data.',
        },
        {
          service: 'Amazon Macie',
          why: 'Macie uses machine learning and pattern matching to discover sensitive data, such as personal and financial data, in S3.',
        },
        {
          service: 'Amazon Detective',
          why: 'Detective investigates the root cause of security findings; it does not inspect file contents.',
        },
      ],
      answer: 'Amazon Macie',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-4',
      prompt:
        'A digital newspaper in Lima has just moved to AWS with CloudFront and Route 53. It wants protection against the most common network and transport layer DDoS attacks without paying extra or configuring anything. What provides it?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF filters layer 7 web requests with rules you define and is billed by usage; it is not the automatic, free protection.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield Standard protects every AWS customer, automatically and at no extra cost, against common layer 3 and 4 DDoS attacks.',
        },
        {
          service: 'AWS Firewall Manager',
          why: 'Firewall Manager manages rules across many accounts; it is not the baseline defense against DDoS.',
        },
      ],
      answer: 'AWS Shield',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-5',
      prompt:
        'A ticketing company in Buenos Aires wants to block SQL injection attempts and limit how many requests per IP reach its Application Load Balancer when a presale opens. Which service does it use?',
      options: [
        {
          service: 'AWS Shield',
          why: 'Shield Standard mitigates network and transport DDoS; SQL injection and per-IP limit rules belong to a web firewall.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detects threats and alerts, but it does not block HTTP requests at the load balancer.',
        },
        {
          service: 'AWS WAF',
          why: 'WAF inspects HTTP(S) requests at the load balancer and blocks them with SQL injection rules and rate-based rules.',
        },
      ],
      answer: 'AWS WAF',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-6',
      prompt:
        'A bank in La Paz uses several security services and wants a single view that aggregates their findings and shows how well it complies with the CIS standard and AWS best practices. Which service does it enable?',
      options: [
        {
          service: 'Amazon Detective',
          why: 'Detective digs into a specific finding to find its cause; it does not measure compliance with standards.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub aggregates findings from GuardDuty, Inspector, Macie, and others, and checks your environment against CIS and AWS FSBP.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty generates its own threat findings, but it does not consolidate those of other services or evaluate standards.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector contributes vulnerability findings; it is not the central view of your whole security posture.',
        },
      ],
      answer: 'AWS Security Hub',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-7',
      prompt:
        'An alert shows that a role at an insurer in Montevideo made unusual API calls. The team wants to see, in a graph, what else that role did over the last few weeks and find the root cause.',
      options: [
        {
          service: 'Amazon Macie',
          why: 'Macie discovers sensitive data in S3; it does not reconstruct the activity of a role over time.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub aggregates and prioritizes findings, but graph-based root cause investigation belongs to another service.',
        },
        {
          service: 'Amazon Detective',
          why: 'Detective builds a behavior graph from CloudTrail, VPC Flow Logs, and findings to investigate the root cause.',
        },
      ],
      answer: 'Amazon Detective',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-8',
      prompt:
        'A retail group in Panama City has 20 accounts in its organization. It wants to apply the same web firewall rules and security groups in all of them, including new accounts. Which service does it use?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF defines the rules, but configuring it account by account does not apply them automatically to accounts added later.',
        },
        {
          service: 'AWS Firewall Manager',
          why: 'Firewall Manager applies WAF, Shield Advanced, and security group policies across the whole organization, including new accounts.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield protects against DDoS; it does not distribute web firewall rules or security groups across accounts.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub aggregates findings and checks standards; it does not deploy firewall rules.',
        },
      ],
      answer: 'AWS Firewall Manager',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-9',
      prompt:
        'A streaming platform in Mexico City suffered a large DDoS attack and wants 24/7 access to an AWS response team and cost protection for the scaling an attack causes. What does it sign up for?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF filters web requests, but on its own it includes neither a DDoS response team nor cost protection.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detects threats in your logs; it does not mitigate DDoS or refund scaling costs.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield Advanced, a paid tier, adds 24/7 access to the Shield Response Team and cost protection for DDoS-driven spikes.',
        },
      ],
      answer: 'AWS Shield',
      topicSlug: 'network-and-application-protection',
    },
    {
      id: 'threat-protection-10',
      prompt:
        'A hospital in Guayaquil has 60 EC2 instances. It wants to know which ones have vulnerable packages or unintentionally exposed ports, and have them reassessed automatically when a new CVE is published.',
      options: [
        {
          service: 'Amazon Macie',
          why: 'Macie analyzes data in S3; it does not check the packages installed on instances.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector continuously scans EC2 for vulnerabilities and network exposure, and reassesses when a new CVE comes out.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detects suspicious activity, not the vulnerable software you have installed.',
        },
        {
          service: 'AWS Security Hub',
          why: 'Security Hub would show those findings, but a different service scans the instances.',
        },
      ],
      answer: 'Amazon Inspector',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-11',
      prompt:
        'An insurer in Asunción wants an inventory of its buckets and to be alerted if any becomes public or holds customer personal data. Which service covers both?',
      options: [
        {
          service: 'AWS WAF',
          why: 'WAF filters web requests; it does not review bucket access settings or their contents.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty detects exfiltration attempts, but it does not classify which buckets hold personal data.',
        },
        {
          service: 'Amazon Macie',
          why: 'Macie keeps an inventory of buckets, alerts you if one becomes public, and discovers sensitive data in their objects.',
        },
      ],
      answer: 'Amazon Macie',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-12',
      prompt:
        'A startup in Quito wants to find out quickly if a leaked access key is used from an unusual location or if there is malware on its instances. It is not looking to investigate in depth, only to detect. What does it enable?',
      options: [
        {
          service: 'Amazon Detective',
          why: 'Detective is for investigating after a finding; it is not the service that generates the detection.',
        },
        {
          service: 'Amazon Inspector',
          why: 'Inspector finds software vulnerabilities; it does not detect anomalous use of credentials.',
        },
        {
          service: 'Amazon GuardDuty',
          why: 'GuardDuty monitors continuously and generates findings for compromised credentials and malware on EC2.',
        },
      ],
      answer: 'Amazon GuardDuty',
      topicSlug: 'threat-detection',
    },
    {
      id: 'threat-protection-13',
      prompt:
        'An online store in Guadalajara only sells in Mexico and receives suspicious traffic from other countries. It wants to block requests on its CloudFront distribution based on the country of origin.',
      options: [
        {
          service: 'AWS WAF',
          why: 'A WAF geographic match rule allows or blocks requests based on the country of origin of the IP.',
        },
        {
          service: 'AWS Shield',
          why: 'Shield mitigates DDoS; it does not block legitimate requests by country with rules you write.',
        },
        {
          service: 'AWS Firewall Manager',
          why: 'Firewall Manager distributes rules across many accounts; with a single store, the rule is defined directly in the web firewall.',
        },
      ],
      answer: 'AWS WAF',
      topicSlug: 'network-and-application-protection',
    },
  ],
};
