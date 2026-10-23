import type { Mission } from '../../../../domain/Mission';

/**
 * Bolsa de Valores Andina: a stock exchange in Quito responding to a security alert across its AWS accounts.
 * Practices Amazon Detective, AWS Security Hub, how Security Hub relates to GuardDuty and Inspector,
 * and automating responses to GuardDuty findings with Amazon EventBridge.
 */
export const threatDetection2: Mission = {
  id: 'threat-detection-2',
  track: 'financial',
  topicSlug: 'threat-detection',
  buildingId: 'stock-exchange',
  title: 'Red alert at the exchange',
  client: { name: 'Diego Salinas', role: 'Director of Cybersecurity at Bolsa de Valores Andina' },
  intro: [
    'Thanks for getting here so fast. I’m Diego Salinas, director of cybersecurity at the Bolsa de Valores Andina, in Quito. Every day, the buy and sell orders of hundreds of investors go through our platforms.',
    'We already have Amazon GuardDuty, Amazon Inspector and Amazon Macie running in several AWS accounts. Detecting things, we do; the problem is what comes after.',
    'Last night GuardDuty generated a finding: an operator’s credentials were used from an unusual location. We have findings spread across three services and five accounts, and nobody knows where to start.',
    'The regulator wants an incident report and a plan to respond faster next time. Will you help me put the house in order before the market opens?',
  ],
  outro: {
    passed: [
      'Now we have a process: Detective tells us what happened, Security Hub gives us a single view with our score against PCI DSS and EventBridge reacts to every GuardDuty finding.',
      'And nobody is going to turn off GuardDuty or Inspector by mistake. The report for the regulator is spotless. Thank you: today the market opens in the green.',
    ],
    failed: [
      'Hmm... I’m not facing the regulator with this plan. We’re still mixing up what each service does.',
      'Review the theory on threat detection calmly and come back whenever you like. The exchange never closes for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'root-cause',
      prompt:
        'Let’s start with last night’s finding. We want to analyze the root cause: what that identity did, from where and which resources it touched, with visualizations we can show the regulator. Which service do we use?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'security-hub-cspm-investigate',
          label: 'AWS Security Hub CSPM',
          definition:
            'A service that runs checks against security standards, calculates scores and aggregates findings from several services.',
          explanation:
            'Security Hub CSPM aggregates findings and checks standards, but it doesn’t build a behavior graph to investigate the root cause of a finding.',
          correct: false,
        },
        {
          id: 'detective',
          label: 'Amazon Detective',
          definition:
            'A service that uses data from CloudTrail, VPC Flow Logs and GuardDuty findings to build a behavior graph with visualizations.',
          explanation:
            'Detective is for investigating the root cause of a finding and seeing which resources were affected. GuardDuty detected it; Detective investigates what was detected.',
          correct: true,
        },
        {
          id: 'inspector-investigate',
          label: 'Amazon Inspector',
          definition:
            'A service that continuously scans EC2 instances, images in Amazon ECR and Lambda functions for CVEs.',
          explanation:
            'Inspector finds software vulnerabilities. It doesn’t reconstruct what an identity did based on a GuardDuty finding.',
          correct: false,
        },
        {
          id: 'trusted-advisor-investigate',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that recommends improvements in cost, performance, fault tolerance, service limits and security.',
          explanation:
            'Trusted Advisor runs best-practice checks. It doesn’t analyze the activity related to a security incident.',
          correct: false,
        },
      ],
    },
    {
      id: 'single-view',
      prompt:
        'Second headache: the findings from GuardDuty, Inspector and Macie are scattered across five accounts. The regulator also asks us to check our accounts against PCI DSS and show them a security score. Which service gives us all of that in one place?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2', '2.4'],
      options: [
        {
          id: 'security-hub-cspm',
          label: 'AWS Security Hub CSPM',
          definition:
            'A cloud security posture management service that checks best practices and standards, and centralizes findings.',
          explanation:
            'Security Hub CSPM runs checks against standards such as PCI DSS and CIS, calculates security scores and aggregates the findings from GuardDuty, Inspector and Macie in a single place.',
          correct: true,
        },
        {
          id: 'detective-view',
          label: 'Amazon Detective',
          definition:
            'An investigation service that analyzes suspicious activity with machine learning, statistical analysis and graph theory.',
          explanation:
            'Detective investigates what happened after a finding. It doesn’t check accounts against PCI DSS or calculate a security score.',
          correct: false,
        },
        {
          id: 'macie-view',
          label: 'Amazon Macie',
          definition:
            'A service that discovers sensitive data in Amazon S3 and generates findings when it finds it.',
          explanation:
            'Macie is one of the exchange’s sources of findings, not the central view the regulator is asking for.',
          correct: false,
        },
        {
          id: 'guardduty-view',
          label: 'Amazon GuardDuty',
          definition:
            'A continuous threat detection service that generates findings about malicious behavior in the account.',
          explanation:
            'GuardDuty produces its own threat findings. It doesn’t aggregate Inspector’s and Macie’s findings or evaluate the accounts against PCI DSS.',
          correct: false,
        },
      ],
    },
    {
      id: 'keep-detectors',
      prompt:
        'Now the finance manager proposes saving money: "since we turned on Security Hub, let’s turn off GuardDuty and Inspector." It sounds logical, but I have a bad feeling about it. Which statement correctly describes the relationship between these services?',
      topicSlug: 'threat-detection',
      examTasks: ['2.4'],
      options: [
        {
          id: 'hub-replaces',
          label: 'Security Hub replaces GuardDuty and Inspector, so they can be turned off',
          definition:
            'The idea that a central security view generates threat and vulnerability detections on its own.',
          explanation:
            'Security Hub doesn’t detect threats or scan for CVEs by itself: it relies on the findings that GuardDuty and Inspector generate.',
          correct: false,
        },
        {
          id: 'hub-scans-cve',
          label: 'Security Hub scans for CVEs on its own, so only Inspector is redundant',
          definition:
            'The idea that the central findings view includes its own software vulnerability scanner.',
          explanation:
            'Continuous CVE scanning on EC2, ECR and Lambda is done by Amazon Inspector, not Security Hub.',
          correct: false,
        },
        {
          id: 'hub-aggregates',
          label: 'Security Hub aggregates and correlates the findings from GuardDuty and Inspector, without replacing them',
          definition:
            'A relationship in which a central service receives, correlates and helps prioritize the findings that other services generate.',
          explanation:
            'Security Hub centralizes and prioritizes what GuardDuty and Inspector detect. If they’re turned off, the exchange loses those detections and Security Hub is left without those findings.',
          correct: true,
        },
        {
          id: 'only-detective',
          label: 'GuardDuty and Inspector send their findings only to Amazon Detective',
          definition:
            'The idea that findings from detection services can only be centralized in the investigation service.',
          explanation:
            'Security Hub CSPM aggregates findings from GuardDuty, Inspector and Macie, so they don’t depend solely on Detective to be centralized.',
          correct: false,
        },
      ],
    },
    {
      id: 'auto-response',
      prompt:
        'Last decision. Last night it took us three hours to react. We want every GuardDuty finding to automatically trigger a response, like isolating the affected instance and notifying the on-call team. Which service do we send the findings to?',
      topicSlug: 'threat-detection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'detective-response',
          label: 'Amazon Detective',
          definition:
            'A service that lets you review up to a year of historical event data to investigate suspicious activity.',
          explanation:
            'Detective is for investigating the root cause. It isn’t designed to trigger automatic responses to every finding.',
          correct: false,
        },
        {
          id: 'inspector-response',
          label: 'Amazon Inspector',
          definition:
            'A service that assigns a risk score to the software vulnerabilities found in workloads.',
          explanation:
            'Inspector scans for vulnerabilities. It doesn’t receive GuardDuty findings to automate responses.',
          correct: false,
        },
        {
          id: 'trusted-advisor-response',
          label: 'AWS Trusted Advisor',
          definition:
            'A service that reviews the environment with best-practice checks, such as S3 bucket permissions or access key rotation.',
          explanation:
            'Trusted Advisor recommends best practices. It doesn’t react to GuardDuty findings with automatic actions.',
          correct: false,
        },
        {
          id: 'eventbridge',
          label: 'Amazon EventBridge',
          definition:
            'An event service that receives events from AWS services and routes them, based on rules, to targets that run actions.',
          explanation:
            'GuardDuty can send its findings to Amazon EventBridge, which lets you automate the response to each one, such as isolating the instance and notifying the on-call team.',
          correct: true,
        },
      ],
    },
  ],
};
