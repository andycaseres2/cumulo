import type { Mission } from '../../../../domain/Mission';

/**
 * Electrónica Volta: an electronics retail chain in Guayaquil that already runs on AWS and fears a ransomware attack on its backups.
 * Practices Amazon FSx for Windows File Server and AWS Backup (backup plans with tags, Vault Lock, cross-Region and cross-account copies).
 */
export const hybridStorageAndBackup2: Mission = {
  id: 'hybrid-storage-and-backup-2',
  track: 'tech',
  topicSlug: 'hybrid-storage-and-backup',
  buildingId: 'electronics-store',
  title: 'Ransomware-Proof Backups',
  client: { name: 'Rosa Villacís', role: 'Operations Manager at Electrónica Volta' },
  intro: [
    'Hi, come on in. I\'m Rosa Villacís, operations manager at Electrónica Volta. We started with a spare parts shop in Guayaquil, and today we have twelve stores along the Ecuadorian coast.',
    'The online store already runs on AWS, with servers on Amazon EC2, the database on Amazon RDS and the shopping cart on Amazon DynamoDB. But at the office we\'re still using an old Windows file server.',
    'Last month, ransomware took a competing chain\'s data hostage, and it deleted their backups too. They paid a fortune and were closed for a week.',
    'Right now each service is backed up with a different script written by someone who no longer works here. I don\'t want to be the next headline. Will you help me sort this out?',
  ],
  outro: {
    passed: [
      'What a relief! The office folders live in FSx, all the backups follow the same plan, and nobody, not even me, can delete them ahead of time.',
      'And if an entire Region ran into trouble, we have copies in another Region and in another account. Thank you: at Volta you\'ll always get the friends-and-family discount.',
    ],
    failed: [
      'Hmm... with this plan, if ransomware hits us, I think we\'d lose our backups just like the competition did. Some of these decisions worry me.',
      'Review hybrid storage and backup theory and come back whenever you like. I\'ll be waiting with the network diagrams ready.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'office-file-server',
      prompt:
        'Let\'s start with the office. We have a Windows file server with SMB shared folders, and permissions are managed with Active Directory. I want to move it entirely to AWS without the employees changing the way they work. What do we use?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'office-efs',
          label: 'Amazon EFS',
          definition:
            'An elastic, serverless NFS file system that many instances can mount at the same time.',
          explanation:
            'Choosing EFS for Windows shared folders is a classic trap: EFS uses NFS and is not supported on Windows-based EC2 instances.',
          correct: false,
        },
        {
          id: 'office-fsx-lustre',
          label: 'Amazon FSx for Lustre',
          definition:
            'A managed high-performance file system built on Lustre, designed for high performance computing (HPC).',
          explanation:
            'FSx for Lustre is designed for high performance computing, not for an office\'s Windows folders. Also, it appears on the list of services out of scope for the exam.',
          correct: false,
        },
        {
          id: 'office-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'An AWS Storage Gateway type that presents virtual tapes to backup software and stores the data on AWS.',
          explanation:
            'Tape Gateway replaces backup tapes. It doesn\'t provide the Windows shared folders that employees use every day.',
          correct: false,
        },
        {
          id: 'office-fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'A fully managed shared file system built on Windows Server, with the SMB protocol and Microsoft Active Directory integration.',
          explanation:
            'Windows, SMB and Active Directory point to FSx for Windows File Server. AWS manages the hardware, patching and backups, and employees keep seeing their usual folders.',
          correct: true,
        },
      ],
    },
    {
      id: 'central-backup-plan',
      prompt:
        'Now, the backups. EC2, RDS, DynamoDB and the new files in FSx each have their own script, and nobody knows whether they all work. I want a single policy that says when to back up and how long to keep backups, applied to resources by tags. What do we use?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'plan-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that continuously replicates servers to a staging area on AWS to recover them in minutes.',
          explanation:
            'Elastic Disaster Recovery keeps servers ready to start in case of a disaster. It doesn\'t define centralized backup and retention policies for RDS, DynamoDB and FSx.',
          correct: false,
        },
        {
          id: 'plan-aws-backup',
          label: 'AWS Backup, with backup plans assigned by tags',
          definition:
            'A managed service to centralize and automate data protection across AWS services, in the cloud and on premises, through backup plans.',
          explanation:
            'A backup plan defines when to back up, how long to retain and where to copy, and it is assigned to resources by tags. AWS Backup supports EC2, RDS, DynamoDB and FSx, among others.',
          correct: true,
        },
        {
          id: 'plan-volume-gateway',
          label: 'Volume Gateway',
          definition:
            'An AWS Storage Gateway type that presents block volumes over iSCSI to on-premises servers.',
          explanation:
            'Volume Gateway extends a data center\'s block storage. It doesn\'t centralize backups of services that already run on AWS.',
          correct: false,
        },
        {
          id: 'plan-more-scripts',
          label: 'A new script per service, scheduled on a separate server',
          definition:
            'An approach in which each team writes and schedules its own backup code for each service.',
          explanation:
            'That\'s exactly the current problem: scattered backups that nobody audits. The point of a centralized service is to replace those scripts with policies in one place.',
          correct: false,
        },
      ],
    },
    {
      id: 'ransomware-lock',
      prompt:
        'What scares me most: if an attacker steals an administrator\'s password, they could delete the backups, just like what happened to the competition. I want nobody, not even us, to be able to delete them or shorten their retention. What do we turn on?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'lock-vault-lock',
          label: 'AWS Backup Vault Lock in compliance mode on the backup vault',
          definition:
            'An AWS Backup feature that enforces a write-once-read-many model on a vault, preventing backups from being deleted or having their retention changed ahead of time.',
          explanation:
            'In compliance mode, Vault Lock prevents anyone, including the account\'s root user, from deleting backups or shortening their retention. Even if an administrator\'s password is stolen, the backups are still there.',
          correct: true,
        },
        {
          id: 'lock-cold-lifecycle',
          label: 'A lifecycle rule that moves backups to cold storage',
          definition:
            'A rule that moves backups to cheaper storage after a certain amount of time.',
          explanation:
            'Moving backups to cold storage saves money, but it doesn\'t stop an administrator with permissions from deleting them.',
          correct: false,
        },
        {
          id: 'lock-tags',
          label: 'Tag all resources with "do-not-delete"',
          definition:
            'Tags are key-value pairs assigned to resources to organize or select them.',
          explanation:
            'A tag on its own protects nothing: it helps organize resources or assign them to a plan, but it doesn\'t stop anyone from deleting a backup.',
          correct: false,
        },
        {
          id: 'lock-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A recovery service that continuously replicates servers and lets you launch them on AWS in minutes.',
          explanation:
            'Elastic Disaster Recovery helps recover servers, but it isn\'t the mechanism that blocks the deletion of backups stored in a vault.',
          correct: false,
        },
      ],
    },
    {
      id: 'copies-elsewhere',
      prompt:
        'Last one: my boss asks what happens if the entire AWS Region we use had a problem, or if someone compromised our main account. He wants backups somewhere else. What do we configure?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'copies-one-zone',
          label: 'Store a second copy of the backups in S3 One Zone-IA',
          definition:
            'An Amazon S3 storage class for infrequent access that stores data in a single Availability Zone.',
          explanation:
            'One Zone-IA stores data in a single zone within the same Region. If the entire Region had a problem, that copy would be affected just the same.',
          correct: false,
        },
        {
          id: 'copies-ebs-volume',
          label: 'An additional EBS volume with the backups, in the same Availability Zone',
          definition:
            'A persistent block storage volume that attaches to an instance in the same Availability Zone.',
          explanation:
            'A volume in the same zone and the same account protects neither against a regional problem nor against a compromised account.',
          correct: false,
        },
        {
          id: 'copies-cross-region-account',
          label: 'Cross-Region and cross-account copies across AWS Organizations in the AWS Backup plan',
          definition:
            'An AWS Backup feature that copies backups to another Region and to another account in the organization, for business continuity and compliance.',
          explanation:
            'With copies in another Region, a regional problem doesn\'t take the backups with it; with copies in another account in the organization, they aren\'t lost either if someone compromises the main account.',
          correct: true,
        },
        {
          id: 'copies-fsx-file-gateway',
          label: 'Amazon FSx File Gateway',
          definition:
            'An AWS Storage Gateway type that provides cached local access to FSx for Windows File Server file shares.',
          explanation:
            'FSx File Gateway is no longer available to new customers, and its job is to provide local access to FSx folders, not to copy backups to another Region or account.',
          correct: false,
        },
      ],
    },
  ],
};
