import type { Mission } from '../../../../domain/Mission';

/**
 * Aseguradora Pacífico: an insurer in Lima preparing evidence for the regulator after moving its policies system to AWS.
 * Practices AWS Artifact, compliance scope by service, AWS Config rules and the IAM credential report.
 */
export const complianceAndAuditing1: Mission = {
  id: 'compliance-and-auditing-1',
  track: 'financial',
  buildingId: 'insurer',
  topicSlug: 'compliance-and-auditing',
  title: 'The regulator’s folder',
  client: { name: 'Rosa Villanueva', role: 'Head of Compliance at Aseguradora Pacífico' },
  intro: [
    'Welcome to Aseguradora Pacífico. I’m Rosa Villanueva, head of Compliance. From Lima we insure the cars, homes and lives of more than two hundred thousand Peruvian families.',
    'Last year we moved our policies and claims system to AWS. It works wonderfully, but now the regulator wants to review how we comply with its rules in the cloud.',
    'They asked me for an evidence folder: which certifications AWS has, how we control the configuration of our resources and who has active credentials. And I don’t know where to start looking.',
    'If the folder arrives incomplete, they can issue findings and stop the launch of our new digital insurance product. Will you help me put it together?',
  ],
  outro: {
    passed: [
      'The folder is complete: the AWS reports, the scope check for each service, the rules that watch the configuration and the credential report.',
      'For the first time I feel I can sit down in front of the regulator with peace of mind. Thank you: at Aseguradora Pacífico we owe you one.',
    ],
    failed: [
      'Hmm... with this the folder still has gaps, and the regulator is going to find them.',
      'Review the theory on compliance and auditing calmly, and come back whenever you like. The folder will be waiting on my desk.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'aws-reports',
      prompt:
        'The first thing the regulator asks for is AWS’s SOC reports and ISO certifications, as evidence that the infrastructure our policies run on is audited. Where do I get them?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudtrail-reports',
          label: 'AWS CloudTrail',
          definition:
            'A service that records, as events, the actions of users, roles and services taken from the console, the CLI, the SDKs and the APIs.',
          explanation:
            'CloudTrail keeps the API activity inside the insurer’s account. AWS’s SOC and ISO reports aren’t there.',
          correct: false,
        },
        {
          id: 'artifact-reports',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS security and compliance documents on demand, such as reports and agreements.',
          explanation:
            'Artifact provides AWS’s SOC, PCI and ISO reports at no cost. They serve as audit evidence for the part that is AWS’s responsibility.',
          correct: true,
        },
        {
          id: 'config-reports',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources, their configuration history and rules to evaluate whether they comply with what you define.',
          explanation:
            'Config evaluates the configuration of the insurer’s resources, but it doesn’t publish AWS’s compliance reports.',
          correct: false,
        },
        {
          id: 'cloudwatch-reports',
          label: 'Amazon CloudWatch',
          definition:
            'A service that monitors resources and applications in real time with metrics, logs, dashboards and alarms.',
          explanation:
            'CloudWatch shows how the insurer’s systems are performing; it doesn’t contain AWS audit reports.',
          correct: false,
        },
      ],
    },
    {
      id: 'services-in-scope',
      prompt:
        'For the new digital insurance product we want to add several AWS services we don’t use yet. My team says that, since AWS is already certified, any service will do. How do we settle this?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'all-services-covered',
          label: 'Use any service: if AWS has a certification, all of its services are covered',
          definition:
            'The assumption that each of a provider’s compliance programs covers all of its services.',
          explanation:
            'Not every service is in scope for every compliance program. That assumption could leave the insurer with a service that isn’t covered.',
          correct: false,
        },
        {
          id: 'aws-certifies-app',
          label: 'Assume that AWS’s certification also certifies our application',
          definition:
            'The idea that the cloud provider’s compliance automatically transfers to the customer’s workloads.',
          explanation:
            'Under the shared responsibility model, the insurer is still responsible for demonstrating compliance for its own application.',
          correct: false,
        },
        {
          id: 'check-services-in-scope',
          label: 'Check on the AWS Services in Scope by Compliance Program page that each service is covered',
          definition:
            'The official page that shows, for each compliance program, which AWS services are covered by the current reports.',
          explanation:
            'Requirements vary by service, so before designing a regulated solution you verify that each chosen service is in scope for the program you’re required to meet.',
          correct: true,
        },
        {
          id: 'region-only',
          label: 'Just choose the Region closest to Lima, because compliance depends only on location',
          definition:
            'A criterion that treats geography as the only factor that defines compliance requirements.',
          explanation:
            'Geography matters, but requirements also vary by industry and by service. The Region doesn’t tell you whether a service is in scope for the program.',
          correct: false,
        },
      ],
    },
    {
      id: 'encrypted-volumes-rule',
      prompt:
        'The regulator requires all of our servers’ volumes to be encrypted, and wants to see that we monitor it all the time, not once a year. Which service flags the volumes that don’t comply?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'config-rules',
          label: 'AWS Config, with a rule that requires encrypted volumes',
          definition:
            'Rules that continuously evaluate the configuration of each resource and flag as noncompliant the ones that don’t meet what you defined.',
          explanation:
            'Config rules continuously evaluate each volume and flag the noncompliant ones. They also keep the configuration history as evidence for the regulator.',
          correct: true,
        },
        {
          id: 'cloudtrail-volumes',
          label: 'AWS CloudTrail',
          definition:
            'A service that records the account’s API calls, with who made them, when and from where.',
          explanation:
            'CloudTrail tells you who created or changed a volume, but it doesn’t evaluate whether its configuration meets the encryption rule.',
          correct: false,
        },
        {
          id: 'cloudwatch-volumes',
          label: 'An Amazon CloudWatch alarm on disk usage',
          definition:
            'An alarm that notifies you or runs an action when a metric, such as disk usage, crosses a threshold.',
          explanation:
            'A CloudWatch alarm watches performance metrics. Disk usage doesn’t tell you whether a volume is encrypted.',
          correct: false,
        },
        {
          id: 'credential-report-volumes',
          label: 'The IAM credential report',
          definition:
            'A CSV file listing every user in the account and the status of their passwords, access keys and MFA devices.',
          explanation:
            'The credential report is about users and their credentials, not about the configuration of volumes.',
          correct: false,
        },
      ],
    },
    {
      id: 'credentials-evidence',
      prompt:
        'Last piece of the folder: the regulator wants a file with all of the account’s IAM users, whether they have MFA and when each access key was rotated or used. What do we give them?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'last-accessed',
          label: 'IAM last accessed information',
          definition:
            'A view that shows which services, and in some cases which actions, each identity actually used, so you can remove unneeded permissions.',
          explanation:
            'Last accessed information helps trim permissions that aren’t used, but it doesn’t list the status of each user’s passwords, MFA and access keys.',
          correct: false,
        },
        {
          id: 'artifact-agreements',
          label: 'AWS Artifact agreements',
          definition:
            'The section of AWS Artifact to review, accept and track agreements with AWS, for an account or an organization.',
          explanation:
            'Artifact agreements are contracts with AWS. They don’t describe the credentials of the insurer’s users.',
          correct: false,
        },
        {
          id: 'event-history',
          label: 'AWS CloudTrail event history',
          definition:
            'A view in the console of the management events from the last 90 days, per Region.',
          explanation:
            'Event history shows actions, not a ready-to-deliver summary of the status of each user’s credentials.',
          correct: false,
        },
        {
          id: 'credential-report',
          label: 'The IAM credential report',
          definition:
            'A CSV file listing every user in the account and the status of their passwords, access keys and MFA devices.',
          explanation:
            'It’s exactly what the regulator is asking for: a CSV with each user, their MFA and when each key was last rotated or used. You can generate it and hand it to the auditor.',
          correct: true,
        },
      ],
    },
  ],
};
