import type { Mission } from '../../../../domain/Mission';

/**
 * Banco Andino: the bank's security operations team in Bogotá organizing the logs of its new card payments platform.
 * Practices Amazon CloudWatch, VPC Flow Logs, organization trails of AWS CloudTrail and IAM last accessed information.
 */
export const complianceAndAuditing2: Mission = {
  id: 'compliance-and-auditing-2',
  track: 'financial',
  buildingId: 'bank',
  topicSlug: 'compliance-and-auditing',
  title: 'The vault’s records',
  client: { name: 'Valentina Arango', role: 'Security Operations Center Lead at Banco Andino' },
  intro: [
    'Hi, come in. I’m Valentina Arango and I lead the Security Operations Center at Banco Andino, here in Bogotá. My team watches everything that happens in our systems, day and night.',
    'We just launched the new card payments platform on AWS, spread across several accounts in the organization. The problem is that each team keeps its logs however it wants, and some keep nothing at all.',
    'I need to know when something is malfunctioning, what traffic enters our network, keep the evidence the Superintendency asks for and trim permissions that aren’t needed.',
    'If an incident happens and we don’t have the right logs, we won’t be able to explain what happened. Will you help me put the vault’s records in order?',
  ],
  outro: {
    passed: [
      'Perfect. Now we have alarms when payments fail, logs of the network traffic, API evidence kept for years and permissions trimmed to what’s actually used.',
      'My team can finally sleep a little better. Thank you: the Operations Center is open to you anytime.',
    ],
    failed: [
      'Hmm... with these decisions we’d still have blind spots in an incident.',
      'Review the theory on logging and auditing, and come back whenever you like. We’ll keep watch in the meantime.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'payments-alarm',
      prompt:
        'Last night the payments service slowed down and nobody noticed until customers called. I want it to alert us only when the CPU of those servers goes over a threshold. What do we use?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudtrail-alarm',
          label: 'AWS CloudTrail',
          definition:
            'A service that records, as events, the actions of users, roles and services taken from the console, the CLI, the SDKs and the APIs.',
          explanation:
            'CloudTrail answers who made each API call. It doesn’t measure the servers’ CPU or alert you when it crosses a threshold.',
          correct: false,
        },
        {
          id: 'config-alarm',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources, their configuration history and rules to evaluate whether they comply with what you define.',
          explanation:
            'Config watches how resources are configured, not their real-time performance.',
          correct: false,
        },
        {
          id: 'cloudwatch-alarm',
          label: 'Amazon CloudWatch, with an alarm on the CPU metric',
          definition:
            'A service that monitors resources and applications in real time with metrics, logs, dashboards and alarms.',
          explanation:
            'CloudWatch collects the CPU metric of the payments servers and the alarm notifies you or runs an action when it crosses the threshold. It answers "how is it performing?".',
          correct: true,
        },
        {
          id: 'artifact-alarm',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports on demand, such as SOC, PCI and ISO, and manage agreements.',
          explanation:
            'Artifact provides AWS compliance documents; it doesn’t monitor the performance of the bank’s servers.',
          correct: false,
        },
      ],
    },
    {
      id: 'network-traffic',
      prompt:
        'My team saw strange connections to the payments platform’s network. We need a log of the IP traffic going in and out of that VPC’s network interfaces. What do we turn on?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'flow-logs',
          label: 'VPC Flow Logs',
          definition:
            'Logs of the IP traffic going in and out of a VPC’s network interfaces, sent to CloudWatch Logs, Amazon S3 or Amazon Data Firehose.',
          explanation:
            'Flow Logs capture exactly the IP traffic of the VPC’s network interfaces, so you can analyze the suspicious connections.',
          correct: true,
        },
        {
          id: 'cloudtrail-traffic',
          label: 'AWS CloudTrail',
          definition:
            'A service that records the account’s API calls, with who made them, when and from where.',
          explanation:
            'CloudTrail records AWS API activity, not the network traffic reaching the platform’s servers.',
          correct: false,
        },
        {
          id: 'config-traffic',
          label: 'AWS Config',
          definition:
            'A service that keeps the inventory, configuration history and relationships of resources.',
          explanation:
            'Config tells you how the VPC is configured and how it changed, but it doesn’t log the traffic passing through it.',
          correct: false,
        },
        {
          id: 'credential-report-traffic',
          label: 'The IAM credential report',
          definition:
            'A CSV file listing every user in the account and the status of their passwords, access keys and MFA devices.',
          explanation:
            'The credential report describes users and their credentials; it contains nothing about network traffic.',
          correct: false,
        },
      ],
    },
    {
      id: 'long-retention',
      prompt:
        'The Superintendency requires us to keep evidence of API activity across all of the bank’s accounts for five years, and no account can be able to turn that logging off. How do we set it up?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'event-history-only',
          label: 'Check the CloudTrail event history in each account whenever the Superintendency asks',
          definition:
            'A view in the console of an account’s recent management events, per Region, available without configuring anything.',
          explanation:
            'Event history only shows the last 90 days. It isn’t enough to keep five years of evidence.',
          correct: false,
        },
        {
          id: 'flow-logs-retention',
          label: 'Turn on VPC Flow Logs in every account',
          definition:
            'Logs of the IP traffic going in and out of the network interfaces of VPCs.',
          explanation:
            'Flow Logs record network traffic, not who made each API call. They don’t cover the evidence the Superintendency is asking for.',
          correct: false,
        },
        {
          id: 'yearly-artifact',
          label: 'Download AWS’s SOC reports from AWS Artifact every year',
          definition:
            'A self-service portal with AWS compliance reports, such as SOC, PCI and ISO.',
          explanation:
            'Artifact reports are evidence for AWS’s side. They don’t record what people do inside the bank’s accounts.',
          correct: false,
        },
        {
          id: 'organization-trail',
          label: 'A CloudTrail trail for the whole organization that delivers events to an Amazon S3 bucket',
          definition:
            'A trail created from AWS Organizations that logs the events of every account and delivers them to an Amazon S3 bucket.',
          explanation:
            'A trail to S3 lets you keep events beyond 90 days, and an organization trail covers every account without member accounts being able to turn it off or modify it.',
          correct: true,
        },
      ],
    },
    {
      id: 'unused-permissions',
      prompt:
        'To finish: the IAM role used by the analytics team has permissions on dozens of services, and I suspect it uses very few. How do we find out which ones it really uses so we can trim the rest?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'credential-report-role',
          label: 'The IAM credential report',
          definition:
            'A CSV file listing every user in the account and the status of their passwords, access keys and MFA devices.',
          explanation:
            'The credential report lists users and the status of their credentials. It doesn’t show which services a role actually used.',
          correct: false,
        },
        {
          id: 'last-accessed-role',
          label: 'The role’s IAM last accessed information',
          definition:
            'A view that shows which services, and in some cases which actions, each identity actually used.',
          explanation:
            'It shows which services the analytics role used, so the bank can remove the unneeded permissions and apply least privilege.',
          correct: true,
        },
        {
          id: 'cloudwatch-dashboard-role',
          label: 'An Amazon CloudWatch dashboard',
          definition:
            'A panel that shows metrics and logs from resources and applications in a single place.',
          explanation:
            'A CloudWatch dashboard shows how systems are performing, not which IAM permissions each role uses.',
          correct: false,
        },
        {
          id: 'config-role',
          label: 'An AWS Config rule',
          definition:
            'A rule that continuously evaluates whether each resource’s configuration complies with what you define.',
          explanation:
            'A Config rule evaluates how a resource is configured, but it doesn’t tell you which services the analytics role actually used.',
          correct: false,
        },
      ],
    },
  ],
};
