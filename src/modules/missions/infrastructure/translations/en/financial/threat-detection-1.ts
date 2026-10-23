import type { Mission } from '../../../../domain/Mission';

/**
 * Notaría Central: a notary office in San José, Costa Rica, that suspects one of its servers was compromised.
 * Practices Amazon GuardDuty, Amazon Macie, Amazon Inspector and the security checks of AWS Trusted Advisor.
 */
export const threatDetection1: Mission = {
  id: 'threat-detection-1',
  track: 'financial',
  topicSlug: 'threat-detection',
  buildingId: 'notary',
  title: 'The notary office under the magnifying glass',
  client: { name: 'Lucía Araya', role: 'Notary and Managing Partner of Notaría Central' },
  intro: [
    'Good afternoon. I’m Lucía Araya, managing partner of Notaría Central, here in San José. We certify home sales, powers of attorney and wills for thousands of Costa Rican families.',
    'A year ago we digitized everything: the scanned deeds live in Amazon S3 and our appointment system runs on EC2 instances. We’re notaries, not security experts.',
    'Last week the AWS bill went up for no reason and a technician told us one of the servers was "talking to strange sites." I haven’t slept since.',
    'If our clients’ documents leak, the notary office loses the only thing it sells: trust. Will you help me find out what’s going on and prevent what’s coming?',
  ],
  outro: {
    passed: [
      'Now I see the big picture: GuardDuty watches the account, Inspector warns us about unpatched software and Macie told us which buckets hold personal data.',
      'And with the Trusted Advisor checks we close the most basic oversights. Thank you: today I can attest that our notary office is better protected.',
    ],
    failed: [
      'Hmm... with these answers I still don’t really know what each service watches. I’m not at ease.',
      'Review the theory on threat detection and come back whenever you like. The deeds will still be here, waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'suspicious-server',
      prompt:
        'Urgent things first. We want AWS to continuously alert us if any EC2 instance communicates with IP addresses associated with cryptocurrency mining or if someone uses stolen credentials, without installing agents on the servers. What do we turn on?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'guardduty',
          label: 'Amazon GuardDuty',
          definition:
            'A threat detection service that continuously monitors account activity using threat intelligence and machine learning.',
          explanation:
            'GuardDuty analyzes CloudTrail, VPC Flow Logs and DNS logs without installing agents, and detects cryptocurrency mining and compromised credentials: exactly the notary office’s suspicion.',
          correct: true,
        },
        {
          id: 'inspector-threat',
          label: 'Amazon Inspector',
          definition:
            'A service that discovers workloads and continuously scans them for software vulnerabilities and network exposure.',
          explanation:
            'Inspector finds vulnerable software, but it doesn’t detect malicious behavior like a server communicating with cryptocurrency mining IPs.',
          correct: false,
        },
        {
          id: 'macie-threat',
          label: 'Amazon Macie',
          definition:
            'A data security service that discovers sensitive data, such as personal information, in Amazon S3 buckets.',
          explanation:
            'Macie analyzes the content of S3 buckets. It doesn’t watch the network activity of the notary office’s EC2 instances.',
          correct: false,
        },
        {
          id: 'trusted-advisor-threat',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that inspects the environment and recommends improvements in cost, performance, fault tolerance, service limits and security.',
          explanation:
            'Trusted Advisor recommends configuration best practices. It doesn’t detect active threats like a compromised server.',
          correct: false,
        },
      ],
    },
    {
      id: 'sensitive-deeds',
      prompt:
        'Now the documents. We have thousands of scanned deeds spread across several Amazon S3 buckets, with ID numbers and our clients’ data. I need to know which buckets contain sensitive personal data. Which service do we use?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'inspector-pii',
          label: 'Amazon Inspector',
          definition:
            'A vulnerability management service that scans EC2 instances, container images in Amazon ECR and Lambda functions.',
          explanation:
            'Inspector looks for software vulnerabilities. Choosing Inspector to find sensitive data is a classic exam trap.',
          correct: false,
        },
        {
          id: 'config-pii',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources, their configuration history and rules to evaluate whether they comply with what you define.',
          explanation:
            'Config tells you whether a bucket’s configuration follows a rule. It doesn’t analyze the content of the deeds to find personal data.',
          correct: false,
        },
        {
          id: 'macie-pii',
          label: 'Amazon Macie',
          definition:
            'A service that uses machine learning and pattern matching to discover sensitive data, such as PII or financial data, in Amazon S3.',
          explanation:
            'Macie discovers sensitive data such as PII in Amazon S3, so it shows which buckets hold the ID numbers and the notary office’s client data.',
          correct: true,
        },
        {
          id: 'detective-pii',
          label: 'Amazon Detective',
          definition:
            'A service that helps investigate the root cause of security findings with a behavior graph.',
          explanation:
            'Detective investigates what happened based on findings and suspicious activity. It doesn’t classify the content of buckets.',
          correct: false,
        },
      ],
    },
    {
      id: 'unpatched-software',
      prompt:
        'The technician suspects they got in through an old package in the appointment system. We want something to continuously check the EC2 instances for known vulnerabilities (CVEs) and check again whenever a new one is published. What do we use?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'guardduty-cve',
          label: 'Amazon GuardDuty',
          definition:
            'A service that detects suspicious behavior in the account based on CloudTrail, VPC Flow Logs and DNS logs.',
          explanation:
            'GuardDuty detects active threats by their behavior. Confusing it with software vulnerability scanning is a classic exam trap.',
          correct: false,
        },
        {
          id: 'detective-cve',
          label: 'Amazon Detective',
          definition:
            'A service that brings together data from CloudTrail, VPC Flow Logs and GuardDuty findings to analyze suspicious activity.',
          explanation:
            'Detective is for investigating what happened after a finding. It doesn’t scan software packages for CVEs.',
          correct: false,
        },
        {
          id: 'trusted-advisor-cve',
          label: 'AWS Trusted Advisor',
          definition:
            'A service with best-practice checks, such as MFA on the root account or ports open to the whole internet.',
          explanation:
            'Trusted Advisor reviews the account’s configuration with best-practice checks. It doesn’t scan the software installed on the instances.',
          correct: false,
        },
        {
          id: 'inspector-cve',
          label: 'Amazon Inspector',
          definition:
            'A service that automatically discovers workloads and continuously scans them for known software vulnerabilities.',
          explanation:
            'Inspector scans the EC2 instances for CVEs and rescans when something changes, for example when a new CVE is published. That way the notary office knows what to patch first.',
          correct: true,
        },
      ],
    },
    {
      id: 'basic-hygiene',
      prompt:
        'Finally, I want to close the basic oversights. I’d like a list of recommendations that warns me if the root account doesn’t have MFA or if any security group leaves ports open to the whole internet. Which service do I check?',
      topicSlug: 'threat-detection',
      examTasks: ['2.4'],
      options: [
        {
          id: 'macie-checks',
          label: 'Amazon Macie',
          definition:
            'A service that finds sensitive data in Amazon S3 using machine learning and pattern matching.',
          explanation:
            'Macie focuses on the sensitive data stored in S3. It doesn’t review the configuration of the root account or the security groups.',
          correct: false,
        },
        {
          id: 'trusted-advisor-checks',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that inspects the AWS environment and recommends improvements, with security checks on the account’s configuration.',
          explanation:
            'Trusted Advisor includes security checks such as MFA on root account and Security Groups – Specific Ports Unrestricted. Basic Support includes selected checks; the full set requires a higher support plan.',
          correct: true,
        },
        {
          id: 'guardduty-checks',
          label: 'Amazon GuardDuty',
          definition:
            'A continuous threat detection service that generates findings about malicious activity in the account.',
          explanation:
            'GuardDuty detects active threats, such as compromised credentials. It isn’t a list of configuration best-practice recommendations.',
          correct: false,
        },
        {
          id: 'detective-checks',
          label: 'Amazon Detective',
          definition:
            'A service that builds a behavior graph to analyze the root cause of security findings.',
          explanation:
            'Detective investigates findings that already exist. It doesn’t recommend turning on MFA or closing open ports.',
          correct: false,
        },
      ],
    },
  ],
};
