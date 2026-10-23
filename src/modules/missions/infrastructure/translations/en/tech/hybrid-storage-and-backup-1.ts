import type { Mission } from '../../../../domain/Mission';

/**
 * Taller Maker 3D: a 3D printing workshop in Córdoba (Argentina) whose local servers are full and whose backups live on tapes.
 * Practices the AWS Storage Gateway types (S3 File Gateway, Tape Gateway, Volume Gateway) and AWS Elastic Disaster Recovery.
 */
export const hybridStorageAndBackup1: Mission = {
  id: 'hybrid-storage-and-backup-1',
  track: 'tech',
  topicSlug: 'hybrid-storage-and-backup',
  buildingId: 'maker-workshop',
  title: 'The Workshop That Outgrew the Basement',
  client: { name: 'Joaquín Ferreyra', role: 'Owner of Taller Maker 3D' },
  intro: [
    'Welcome to the workshop! Careful with that printer, it\'s halfway through a part. I\'m Joaquín Ferreyra, owner of Taller Maker 3D. I started out in a garage in Córdoba, and today we print spare parts and prototypes for factories all over the province.',
    'Our clients\' designs are huge files, and our local servers just can\'t keep up anymore. I don\'t want to throw out what we have or change the way my team works.',
    'Also, we make our backups on tapes that I take home every Friday, and the orders server sits in the same room as the printers. If there\'s a fire, the business is over.',
    'I want to use AWS as an extension of the workshop while we keep working here. Will you help me decide what to use in each case?',
  ],
  outro: {
    passed: [
      'Great! The designs are stored in S3 without the team noticing any difference, the tapes are now virtual, and the render server\'s disk array has plenty of room in the cloud.',
      'And if the server room suffers a disaster, the orders system starts up on AWS in minutes. Thank you: your first printed part is on the house.',
    ],
    failed: [
      'Hmm... with this plan I think we\'d still be out of space, or worse, without a backup on the day we need it most. Some decisions don\'t convince me.',
      'Review hybrid storage and backup theory and come back whenever you like. The printers never stop, so we\'ll be here.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'design-shares',
      prompt:
        'First, the designs. My team keeps them in NFS shared folders on the workshop server. I want them to keep working the same way, with the files stored in Amazon S3 and the most-used ones responding quickly here. What do we use?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'shares-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'An AWS Storage Gateway type that presents virtual tapes to backup software and stores the data in Amazon S3 or S3 Glacier.',
          explanation:
            'Tape Gateway replaces backup tapes; it doesn\'t present shared folders. For everyday working files, you use S3 File Gateway.',
          correct: false,
        },
        {
          id: 'shares-s3-file-gateway',
          label: 'Amazon S3 File Gateway',
          definition:
            'An AWS Storage Gateway type that presents NFS or SMB file shares and stores the files as objects in Amazon S3.',
          explanation:
            'The team keeps using its usual NFS folders, the files are stored as objects in S3, and the most-used ones stay in the workshop\'s local cache for low-latency access.',
          correct: true,
        },
        {
          id: 'shares-volume-gateway',
          label: 'Volume Gateway',
          definition:
            'An AWS Storage Gateway type that presents block storage volumes over iSCSI to local servers.',
          explanation:
            'Volume Gateway delivers block volumes over iSCSI, not NFS shared folders. Joaquín\'s team works with files.',
          correct: false,
        },
        {
          id: 'shares-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that continuously replicates source servers to AWS so they can be launched as recovery instances in minutes.',
          explanation:
            'Elastic Disaster Recovery prepares the recovery of entire servers in case of a disaster. It doesn\'t turn S3 into the everyday storage for the workshop\'s folders.',
          correct: false,
        },
      ],
    },
    {
      id: 'backup-tapes',
      prompt:
        'Now, the backups. Our backup software only knows how to write to tapes, and I don\'t want to change it, but I\'m tired of hauling physical tapes home every Friday. What do we do?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'tapes-s3-file-gateway',
          label: 'Amazon S3 File Gateway',
          definition:
            'An AWS Storage Gateway type that presents NFS or SMB file shares backed by Amazon S3.',
          explanation:
            'S3 File Gateway presents file folders, not tapes. Joaquín\'s backup software only knows how to write to tapes, and he doesn\'t want to change it.',
          correct: false,
        },
        {
          id: 'tapes-fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'A fully managed shared file system built on Windows Server, using the SMB protocol.',
          explanation:
            'FSx for Windows File Server offers Windows shared folders on AWS. It doesn\'t replace the tapes used by the workshop\'s backup software.',
          correct: false,
        },
        {
          id: 'tapes-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'An AWS Storage Gateway type that presents virtual tapes to existing backup software and stores the data in Amazon S3 or S3 Glacier.',
          explanation:
            'The backup software keeps writing to tapes, except now they\'re virtual and their data lives on AWS. Joaquín stops hauling physical tapes without changing his backup workflow.',
          correct: true,
        },
        {
          id: 'tapes-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that keeps servers replicated in a staging area on AWS, ready to launch in case of a disaster.',
          explanation:
            'Elastic Disaster Recovery replicates servers to recover them in minutes, but it doesn\'t replace the tapes used by the backup software.',
          correct: false,
        },
      ],
    },
    {
      id: 'orders-server',
      prompt:
        'The orders server is what worries me most. If there\'s a fire in the workshop, I need it running on AWS in minutes with the most recent data, and then to move back here once we\'ve repaired everything. What do we use?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'orders-drs',
          label: 'AWS Elastic Disaster Recovery',
          definition:
            'A service that continuously replicates on-premises or cloud servers to a staging area on AWS, with drills, recovery in minutes and failback.',
          explanation:
            'It keeps the orders server continuously replicated. If there\'s a fire, Joaquín launches the recovery instance in minutes with the most recent state, and later fails back to the workshop.',
          correct: true,
        },
        {
          id: 'orders-aws-backup',
          label: 'AWS Backup',
          definition:
            'A managed service to centralize and automate backups with plans, vaults and retention policies.',
          explanation:
            'AWS Backup stores copies to restore data. Joaquín needs something different: the entire server ready to start on AWS in minutes, with little downtime.',
          correct: false,
        },
        {
          id: 'orders-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'An AWS Storage Gateway type that replaces physical backup tapes with virtual tapes stored on AWS.',
          explanation:
            'Having backups on virtual tapes doesn\'t get the orders server running on AWS in minutes. It\'s a backup tool, not a server recovery tool.',
          correct: false,
        },
        {
          id: 'orders-fsx-openzfs',
          label: 'Amazon FSx for OpenZFS',
          definition:
            'A managed file system built on OpenZFS, accessed over NFS, designed for migrating workloads that already use ZFS.',
          explanation:
            'FSx for OpenZFS is a managed file server. It doesn\'t replicate the orders server or bring it up on AWS in case of a disaster.',
          correct: false,
        },
      ],
    },
    {
      id: 'render-blocks',
      prompt:
        'Last one: the server that prepares models for printing uses a disk array connected over iSCSI, as block storage, and it\'s already full. I want to extend it with the cloud while keeping the most-used data here. What type of gateway do we use?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'render-s3-file-gateway',
          label: 'Amazon S3 File Gateway',
          definition:
            'An AWS Storage Gateway type that exposes NFS or SMB file shares and stores the files in Amazon S3.',
          explanation:
            'S3 File Gateway presents files over NFS or SMB. The workshop server needs block volumes over iSCSI, which isn\'t what this gateway type offers.',
          correct: false,
        },
        {
          id: 'render-tape-gateway',
          label: 'Tape Gateway',
          definition:
            'An AWS Storage Gateway type that presents virtual tapes to backup software.',
          explanation:
            'Tape Gateway is for backups on virtual tapes. The models server needs block disks for daily work, not tapes.',
          correct: false,
        },
        {
          id: 'render-fsx-file-gateway',
          label: 'Amazon FSx File Gateway',
          definition:
            'An AWS Storage Gateway type that provides cached local access to FSx for Windows File Server file shares.',
          explanation:
            'FSx File Gateway is no longer available to new customers, and it works with Windows shared folders anyway, not with block volumes over iSCSI.',
          correct: false,
        },
        {
          id: 'render-volume-gateway',
          label: 'Volume Gateway',
          definition:
            'An AWS Storage Gateway type that presents block volumes over iSCSI to local servers, in a cached or stored architecture, with the data stored in Amazon S3.',
          explanation:
            'This is the gateway for extending local block storage: the server keeps seeing iSCSI volumes, the data is stored on AWS, and the most-used data stays cached at the workshop.',
          correct: true,
        },
      ],
    },
  ],
};
