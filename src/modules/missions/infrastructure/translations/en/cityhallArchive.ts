import type { Mission } from '../../../domain/Mission';

/**
 * Archivo de la Municipalidad: a city hall that must keep scanned documents for ten years.
 * Practices S3 storage classes, S3 Lifecycle, AWS Storage Gateway, AWS Backup and AWS Artifact.
 */
export const cityhallArchive: Mission = {
  id: 'cityhall-archive',
  track: 'tech',
  topicSlug: 's3-storage-classes',
  buildingId: 'cityhall',
  title: 'Ten years of paperwork',
  client: { name: 'Patricia Huamán', role: 'Head of Records at City Hall' },
  intro: [
    'Welcome to City Hall. I’m Patricia Huamán, head of the records office. This is where we keep licenses, birth certificates, blueprints and resolutions for the whole city.',
    'We’ve already scanned almost everything, but the law requires us to keep every document for ten years. After the first month, hardly anyone asks for them again.',
    'Today everything lives on a file server in the basement. It’s running out of space, and if the basement ever floods, we lose a decade of the city’s history.',
    'And on top of that, every year the auditors come to check that everything is protected and in order. I want to move the archive to the cloud without overspending. Will you help me?',
  ],
  outro: {
    passed: [
      'What a relief! The old documents rest in the cheapest class, they move on their own with the lifecycle, and the basement folders now store their data in the cloud.',
      'And when the auditors arrive, I know where to download the AWS reports. Thank you so much. Here at City Hall our doors will always be open to you.',
    ],
    failed: [
      'Hmm... with this plan I don’t know if we’d pass the audit, or if the bill would be reasonable. Some decisions just don’t add up for me.',
      'Review the theory calmly and come back whenever you like. The paperwork isn’t going anywhere, I promise you!',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'archive-class',
      prompt:
        'Let’s start with the documents that are already years old. We look at them less than once a year and, if someone asks for one, they can wait until the next day. Which Amazon S3 class do we store them in to pay as little as possible?',
      topicSlug: 's3-storage-classes',
      examTasks: ['3.6'],
      options: [
        {
          id: 's3-standard',
          label: 'S3 Standard',
          definition:
            'The default Amazon S3 class, designed for frequently accessed data, with millisecond retrieval and no retrieval charge.',
          explanation:
            'S3 Standard is meant for data that is used often. For documents read less than once a year, City Hall would pay a frequent-access price it doesn’t benefit from.',
          correct: false,
        },
        {
          id: 'glacier-instant',
          label: 'S3 Glacier Instant Retrieval',
          definition:
            'An archive class with millisecond access, for data accessed roughly once a quarter.',
          explanation:
            'It works when the archive is consulted now and then and is needed instantly. Patricia can wait hours, so she can choose an even cheaper class.',
          correct: false,
        },
        {
          id: 'glacier-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'The lowest-cost storage class in AWS, for data accessed less than once a year; objects must be restored and retrieval takes hours.',
          explanation:
            'Correct. It is the cheapest option and is designed for retaining data for years for regulatory compliance. With Standard retrieval, the document is usually ready within 12 hours.',
          correct: true,
        },
        {
          id: 'one-zone-ia',
          label: 'S3 One Zone-IA',
          definition:
            'A class for infrequent access that stores data in a single Availability Zone, recommended only for data that can be re-created.',
          explanation:
            'The city’s scanned documents can’t be regenerated if they are lost. Keeping the only copy in a single zone is exactly what you should avoid with critical data.',
          correct: false,
        },
      ],
    },
    {
      id: 'lifecycle',
      prompt:
        'Now, the new documents: in the first month they’re consulted a lot, then almost never, and after ten years they can be deleted. I don’t want my team moving files by hand every month. What do we use?',
      topicSlug: 's3-storage-classes',
      examTasks: ['3.6'],
      options: [
        {
          id: 's3-lifecycle',
          label: 'An S3 Lifecycle policy',
          definition:
            'A set of rules S3 applies automatically to a group of objects: transitions to other classes after a certain time and expiration when they are due.',
          explanation:
            'Correct. Patricia’s pattern is predictable: a transition rule moves documents to colder classes as they age, and an expiration rule deletes them when the ten years are up.',
          correct: true,
        },
        {
          id: 'intelligent-tiering',
          label: 'S3 Intelligent-Tiering',
          definition:
            'A class that automatically moves each object between access tiers based on its usage, with a per-object monitoring charge.',
          explanation:
            'Intelligent-Tiering shines when the access pattern is unknown or changing. Here the pattern is already known, and besides, this class doesn’t delete documents when they reach ten years.',
          correct: false,
        },
        {
          id: 'manual-moves',
          label: 'A script the team runs by hand every month',
          definition:
            'A manual process in which a person periodically copies objects to another storage class.',
          explanation:
            'That’s exactly what Patricia wants to avoid: it depends on someone remembering. If the access pattern is predictable, the answer is a lifecycle policy.',
          correct: false,
        },
        {
          id: 'deep-archive-from-day-one',
          label: 'Store everything in S3 Glacier Deep Archive from day one',
          definition:
            'Putting every new object directly in the cheapest archive class, which requires restoring objects before reading them.',
          explanation:
            'During the first month the documents are consulted a lot, and in Deep Archive every request needs a restore that takes hours. It’s better to start in a fast-access class and archive later.',
          correct: false,
        },
      ],
    },
    {
      id: 'hybrid-storage',
      prompt:
        'The staff are used to saving to the shared folders on the basement server and I don’t want to change the way they work. How do we keep using it, but with the data stored in the cloud?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'elastic-disaster-recovery',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that continuously replicates servers to AWS so they can be launched as recovery instances within minutes after a disaster.',
          explanation:
            'It protects entire servers against a disaster, but it doesn’t turn the cloud into the everyday storage for the basement’s shared folders.',
          correct: false,
        },
        {
          id: 'fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'A fully managed shared file system built on Windows Server, with the SMB protocol and Active Directory integration.',
          explanation:
            'FSx is a great option for moving shared folders entirely to AWS, but Patricia wants to keep the same local access as always, with a cache in the basement and the data stored in the cloud.',
          correct: false,
        },
        {
          id: 'efs',
          label: 'Amazon EFS',
          definition: 'An elastic, serverless NFS file system offered by AWS.',
          explanation:
            'EFS is a file system in AWS, not a hybrid bridge: it doesn’t leave a local cache in the basement. To combine the local server with the cloud, the answer is Storage Gateway.',
          correct: false,
        },
        {
          id: 'storage-gateway',
          label: 'AWS Storage Gateway (Amazon S3 File Gateway)',
          definition:
            'A hybrid service that connects an appliance installed in your data center to AWS storage and keeps the most used data in a local cache.',
          explanation:
            'Correct. With S3 File Gateway the staff keep using NFS or SMB file shares, files are stored as objects in Amazon S3 and the most used ones stay in the local cache.',
          correct: true,
        },
      ],
    },
    {
      id: 'central-backup',
      prompt:
        'Besides the archive, we have the permits system on Amazon RDS and several Amazon EBS volumes. I want a single backup policy for everything, automatic and protected against deletion. Which service do I use?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'tape-gateway',
          label: 'Tape Gateway',
          definition:
            'A type of Storage Gateway that presents virtual tapes to backup software and stores the data in Amazon S3 or S3 Glacier.',
          explanation:
            'Tape Gateway replaces physical tapes in an existing backup workflow, but it doesn’t define a central policy for RDS, EBS and the rest of the AWS services.',
          correct: false,
        },
        {
          id: 'aws-backup',
          label: 'AWS Backup',
          definition:
            'A fully managed service to centralize and automate data protection across AWS services, in the cloud and on premises.',
          explanation:
            'Correct. With a backup plan you define when to back up and how long to retain, for RDS, EBS, S3 and Storage Gateway volumes. And AWS Backup Vault Lock prevents anyone from deleting the backups.',
          correct: true,
        },
        {
          id: 'elastic-disaster-recovery',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that continuously replicates servers to AWS so they can be launched as recovery instances within minutes after a disaster.',
          explanation:
            'Elastic Disaster Recovery keeps servers ready to start with little downtime. Patricia needs centralized copies to restore data, and that’s AWS Backup.',
          correct: false,
        },
        {
          id: 'aws-config',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources and their configuration history, and evaluates whether they comply with the rules you define.',
          explanation:
            'Config can tell you how each resource is configured, but it doesn’t create or store backups of the data.',
          correct: false,
        },
      ],
    },
    {
      id: 'compliance-reports',
      prompt:
        'Last question, and the most urgent one: the auditors are going to ask for proof that AWS complies with standards like ISO and SOC. Where do I get those reports?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'A service that records, as events, the actions of users, roles and services taken from the console, the CLI, the SDKs and the APIs.',
          explanation:
            'CloudTrail answers "who did what, and when" inside City Hall’s account, but it doesn’t contain the AWS compliance reports.',
          correct: false,
        },
        {
          id: 'credential-report',
          label: 'The IAM credential report',
          definition:
            'A CSV file listing every user in the account and the status of their passwords, access keys and MFA devices.',
          explanation:
            'It’s useful to show an auditor how City Hall manages credentials, but it doesn’t prove that AWS holds ISO or SOC certifications.',
          correct: false,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS security and compliance documents on demand and at no cost, such as SOC, PCI and ISO reports.',
          explanation:
            'Correct. In Artifact, Patricia downloads the AWS reports as audit evidence. Keep in mind: under shared responsibility, proving compliance for its own workload is still City Hall’s job.',
          correct: true,
        },
        {
          id: 'aws-config',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources and their configuration history, and evaluates whether they comply with the rules you define.',
          explanation:
            'Config shows whether City Hall’s resources follow its own rules, but the AWS SOC or ISO reports aren’t there: you download them from AWS Artifact.',
          correct: false,
        },
      ],
    },
  ],
};
