import type { Mission } from '../../../../domain/Mission';

/**
 * Estudio de Juegos Cóndor: an indie game studio in Valparaíso launching its first online game on AWS.
 * Practices choosing between Amazon S3, Amazon EBS, Amazon EFS and the EC2 instance store.
 */
export const s3EbsEfsStorage1: Mission = {
  id: 's3-ebs-efs-storage-1',
  track: 'tech',
  topicSlug: 's3-ebs-efs-storage',
  buildingId: 'game-studio',
  title: 'Four disks for one game',
  client: { name: 'Matías Rojas', role: 'Technical director at Estudio de Juegos Cóndor' },
  intro: [
    'Hi! Come in, sorry about the mess of cables. I\'m Matías Rojas, technical director at Estudio de Juegos Cóndor. We\'re fifteen people in Valparaíso making our first online game.',
    'We launch in three months and we\'re putting everything on AWS: the game installers, the servers where we compile builds, and the database with the players\' saved games.',
    'The problem is that every programmer stores things wherever they can. Yesterday the database server stopped and we lost saved games we thought were safe. I no longer know what goes in each type of storage.',
    'If something gets lost or won\'t load on launch day, players won\'t give us a second chance. Will you help me decide where everything goes?',
  ],
  outro: {
    passed: [
      'Now we\'re talking! The installers download from S3, the build servers share assets on EFS, the database has its EBS disk, and the cache lives on the instance store.',
      'Now every piece of data is in the storage it belongs in. Thank you: when the game comes out, your name goes in the credits.',
    ],
    failed: [
      'Hmm... with this plan I think something will get lost or won\'t load on launch day. Some of these decisions don\'t convince me.',
      'Take your time reviewing the theory on S3, EBS and EFS and come back whenever you like. The studio is still waiting for you with coffee and prototypes.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'game-installers',
      prompt:
        'Let\'s start with what players see: the game installer and its patches weigh several GB, and thousands of people will download them over the internet from the website. Where do we store them?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'installers-ebs',
          label: 'On an Amazon EBS volume attached to a web server',
          definition:
            'Block storage volume that attaches to an Amazon EC2 instance and is used as its hard drive.',
          explanation:
            'An EBS volume is an instance\'s disk in a single Availability Zone. For files that thousands of people download over the internet, the studio would have to run that server for no good reason.',
          correct: false,
        },
        {
          id: 'installers-efs',
          label: 'On an Amazon EFS file system',
          definition:
            'Serverless file storage that many instances mount over NFS and that grows and shrinks automatically.',
          explanation:
            'EFS is for shared folders that servers mount. Players don\'t mount an NFS file system: they download files over the internet.',
          correct: false,
        },
        {
          id: 'installers-instance-store',
          label: 'On the instance store of an Amazon EC2 instance',
          definition:
            'Temporary block storage on disks physically attached to the host server where the instance runs.',
          explanation:
            'Instance store data is lost if the instance stops or terminates. It is not the place for installers that every player needs to download.',
          correct: false,
        },
        {
          id: 'installers-s3',
          label: 'In an Amazon S3 bucket',
          definition:
            'Object storage: files and their metadata stored in buckets and accessible through an API and URLs.',
          explanation:
            'Files downloaded over the internet are a classic use case for object storage. S3 is pay-as-you-go, with no capacity to reserve, and is designed for eleven nines of durability.',
          correct: true,
        },
      ],
    },
    {
      id: 'shared-assets',
      prompt:
        'Now, the build servers. We have eight Linux EC2 instances, and all of them need to read and write at the same time to the same folder of textures and models. That folder grows every week. What do we use?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'assets-efs',
          label: 'Amazon EFS, mounted over NFS on all eight instances',
          definition:
            'Serverless file system mounted over NFS that allows parallel access from many instances and grows and shrinks automatically.',
          explanation:
            'This is the shared-folder case: all eight Linux instances mount it at once, and since EFS grows on its own, the studio doesn\'t have to provision capacity every time it uploads new textures.',
          correct: true,
        },
        {
          id: 'assets-ebs',
          label: 'An Amazon EBS volume attached to all eight instances',
          definition:
            'Block storage volume that works as an EC2 instance\'s hard drive within one Availability Zone.',
          explanation:
            'An EBS volume is generally attached to a single instance, and only some volume types support Multi-Attach. Choosing EBS to share files across many instances is a classic trap.',
          correct: false,
        },
        {
          id: 'assets-instance-store',
          label: 'The instance store of each build server',
          definition:
            'Temporary disks physically attached to an instance\'s host, included in the instance price.',
          explanation:
            'The instance store is not shared between instances and is lost when they stop. Each server would have its own copy and nobody would see the others\' changes.',
          correct: false,
        },
        {
          id: 'assets-s3-mounted',
          label: 'An Amazon S3 bucket mounted as an operating system disk',
          definition:
            'Object storage in buckets that applications access through an API and URLs.',
          explanation:
            'S3 is object storage accessed through an API; it is not mounted as an operating system disk. For a folder that many servers mount, the answer is EFS.',
          correct: false,
        },
      ],
    },
    {
      id: 'database-disk',
      prompt:
        'The database with the players\' saved games runs on an EC2 instance in one Availability Zone. Yesterday we lost data when a server stopped. What disk do we give it so the data persists?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'db-instance-store',
          label: 'The instance store, because it is the disk closest to the host',
          definition:
            'Temporary block storage on the host server\'s disks; the data survives an instance reboot.',
          explanation:
            'That is exactly what happened yesterday: instance store data is lost when the instance stops, hibernates or terminates. It won\'t do for the players\' saved games.',
          correct: false,
        },
        {
          id: 'db-ebs-same-az',
          label: 'An Amazon EBS volume in the same Availability Zone as the instance',
          definition:
            'Persistent block storage volume that attaches to an EC2 instance in the same Availability Zone.',
          explanation:
            'A database disk is the classic EBS use case: block storage that persists even if the instance stops and that attaches to the instance like a hard drive.',
          correct: true,
        },
        {
          id: 'db-ebs-other-az',
          label: 'An Amazon EBS volume created in another Availability Zone, to keep it separate',
          definition:
            'Block storage volume that lives in a different Availability Zone from the one the instance uses.',
          explanation:
            'An EBS volume can only attach to instances in its own Availability Zone. If it is created in another AZ, the database can\'t use it as a disk.',
          correct: false,
        },
        {
          id: 'db-s3',
          label: 'An Amazon S3 bucket as the database disk',
          definition:
            'Object storage service with buckets that are private by default and accessed through an API.',
          explanation:
            'S3 stores objects and is accessed through an API; it is not attached as an operating system disk. A database on EC2 needs block storage.',
          correct: false,
        },
      ],
    },
    {
      id: 'shader-cache',
      prompt:
        'Last one: when compiling, each server generates a shader cache. It\'s temporary data that can be regenerated at any time, and I don\'t want to pay for separate storage for it. Where do we put it?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'cache-efs',
          label: 'On an Amazon EFS file system',
          definition:
            'Elastic file storage shared over NFS and accessible by many instances at once.',
          explanation:
            'EFS is for data that several servers share. Here each server generates its own temporary cache, and EFS is billed separately from the instance.',
          correct: false,
        },
        {
          id: 'cache-s3',
          label: 'In an Amazon S3 bucket',
          definition:
            'Object storage accessed through an API and URLs, billed according to what is stored and requested.',
          explanation:
            'S3 is used through an API and charges for storage and requests. For a temporary cache that the server uses as a local disk, it is not the right option.',
          correct: false,
        },
        {
          id: 'cache-instance-store',
          label: 'On the instance store of each build server',
          definition:
            'Temporary block storage on disks physically attached to the host, included in the instance price.',
          explanation:
            'Caches, buffers and temporary working data are the typical use of the instance store. If the cache is lost when the instance stops, it is regenerated. Note: only some instance types include it.',
          correct: true,
        },
        {
          id: 'cache-ebs',
          label: 'On an additional Amazon EBS volume for each server',
          definition:
            'Persistent block storage volume billed separately based on provisioned capacity.',
          explanation:
            'EBS provides persistence, which this cache doesn\'t need, and is billed separately based on what is provisioned. Matías asked not to pay for extra storage for data that can be regenerated.',
          correct: false,
        },
      ],
    },
  ],
};
