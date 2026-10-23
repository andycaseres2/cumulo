import type { Mission } from '../../../../domain/Mission';

/**
 * Universidad Tecnológica: the IT office of a university in Asunción moving its course site, labs and enrollment system to AWS.
 * Practices S3 static websites, durability versus availability, EBS and its Availability Zone, and the EFS-on-Windows trap.
 */
export const s3EbsEfsStorage2: Mission = {
  id: 's3-ebs-efs-storage-2',
  track: 'tech',
  topicSlug: 's3-ebs-efs-storage',
  buildingId: 'university',
  title: 'Enrollment without the drama',
  client: { name: 'Lucía Cabrera', role: 'Technology Director at Universidad Tecnológica' },
  intro: [
    'Good afternoon, welcome to campus. I\'m Lucía Cabrera, Technology Director at the University. From here in Asunción, we serve eight thousand students.',
    'The rector\'s office approved moving our systems to AWS: the course website, the computer labs and the enrollment system. My team is small and has never worked with cloud storage.',
    'Every enrollment week, the website server goes down and students fill the hallways complaining. And at the university council they ask me questions I still can\'t answer.',
    'The next enrollment period starts in two months and I want to have everything ready. Will you help me choose the right storage?',
  ],
  outro: {
    passed: [
      'Perfect! The course website is served from S3, the Windows labs have their shared folder, and the enrollment system has its disk in the right zone.',
      'And when the council asks me about the eleven nines, I know what to say. Thank you: there\'s a lecture hall waiting for you whenever you want it.',
    ],
    failed: [
      'Hmm... with these decisions I\'m afraid the next enrollment will be just as chaotic. Some of these answers don\'t add up for me.',
      'Take your time reviewing the theory on S3, EBS and EFS and come back whenever you like. The university\'s doors are always open to anyone who wants to learn.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'course-website',
      prompt:
        'First, the course website. It\'s just HTML pages, stylesheets and images that don\'t change per user. I don\'t want to maintain any server that goes down during enrollment. Where do we publish it?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'site-efs',
          label: 'On Amazon EFS, mounted by the web servers',
          definition:
            'File system shared over NFS that many instances can mount at once and that grows elastically.',
          explanation:
            'EFS lets several servers share files, but you still need web servers in front of it. Lucía wants to stop maintaining servers.',
          correct: false,
        },
        {
          id: 'site-s3',
          label: 'As a static website in an Amazon S3 bucket',
          definition:
            'Object storage in buckets, accessible over the internet through an API and URLs, with pay-as-you-go pricing.',
          explanation:
            'A static website of HTML, CSS and images is a classic S3 use case: it is served directly from a bucket, with no servers to manage.',
          correct: true,
        },
        {
          id: 'site-ebs',
          label: 'On an Amazon EBS volume of a larger EC2 instance',
          definition:
            'Block storage volume that works as the disk of an EC2 instance in one Availability Zone.',
          explanation:
            'It would still be a server the university must maintain and that can go down during enrollment. The disk is not the problem: the server is what\'s unnecessary.',
          correct: false,
        },
        {
          id: 'site-instance-store',
          label: 'On the instance store of the current web server',
          definition:
            'Temporary block storage on the disks of the physical host where an EC2 instance runs.',
          explanation:
            'Instance store data is lost when the instance stops or terminates, and you still need a server. It solves none of what Lucía is asking for.',
          correct: false,
        },
      ],
    },
    {
      id: 'eleven-nines',
      prompt:
        'At the council, a dean read that S3 Standard is designed for 99.999999999% durability and concluded the website will never be offline. I\'m not sure that\'s right. What does that number measure?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'durability-not-losing',
          label: 'Durability: how well protected the objects are against loss',
          definition:
            'The distinction between keeping data without losing it (durability) and being able to access it when needed (availability).',
          explanation:
            'The eleven nines are about not losing objects. S3 Standard availability is a different number, designed for 99.99% over a year. Confusing the two concepts is a classic trap.',
          correct: true,
        },
        {
          id: 'availability-always-online',
          label: 'Availability: the site will be online 99.999999999% of the time',
          definition:
            'Percentage of time a service is online and responding to requests.',
          explanation:
            'That number does not measure uptime. Being able to access the objects is availability, and S3 Standard is designed for 99.99% over a year.',
          correct: false,
        },
        {
          id: 'speed',
          label: 'How fast S3 delivers each file to the students',
          definition:
            'Performance of a storage service, measured as latency or the amount of data delivered per second.',
          explanation:
            'Speed is a measure of performance, not durability. The eleven nines say nothing about how fast a file downloads.',
          correct: false,
        },
        {
          id: 'backup-other-region',
          label: 'That S3 automatically copies every object to another Region as a backup',
          definition:
            'Copying a bucket\'s objects to a Region different from the original to have a distant backup.',
          explanation:
            'S3 Standard stores objects redundantly across at least three Availability Zones within a Region. The eleven nines do not mean objects are copied to another Region.',
          correct: false,
        },
      ],
    },
    {
      id: 'enrollment-volume',
      prompt:
        'The enrollment system runs on an EC2 instance in one Availability Zone. My team created an Amazon EBS volume for the data, but in another Availability Zone, and they can\'t attach it. What\'s going on?',
      topicSlug: 's3-ebs-efs-storage',
      examTasks: ['3.6'],
      options: [
        {
          id: 'permissions-issue',
          label: 'It\'s a permissions problem: the team needs to be granted access to the volume',
          definition:
            'Situation in which an identity can\'t perform an action because its policies don\'t allow it.',
          explanation:
            'Even if the team had every permission, an EBS volume can only attach to instances in its own Availability Zone. The problem is where the volume is.',
          correct: false,
        },
        {
          id: 'use-multi-attach',
          label: 'Multi-Attach must be enabled so the volume can reach another zone',
          definition:
            'Feature of some EBS volume types that lets you attach the same volume to several instances at once.',
          explanation:
            'Multi-Attach connects a volume to several instances, only for some volume and instance types. It doesn\'t change the rule that the volume and instance must be in the same Availability Zone.',
          correct: false,
        },
        {
          id: 'same-az',
          label: 'The volume and the instance must be in the same Availability Zone; create the volume in the instance\'s zone',
          definition:
            'Amazon EBS rule under which a volume can only be attached to instances located in its own Availability Zone.',
          explanation:
            'EBS lives in a single Availability Zone, and forgetting that is a classic exam trap. The enrollment volume must be in the zone where its instance runs.',
          correct: true,
        },
        {
          id: 'use-instance-store',
          label: 'Switch to the instance store, which works in any zone',
          definition:
            'Temporary block storage on the physical disks of the host where the instance runs.',
          explanation:
            'The instance store doesn\'t move between instances or zones, and its data is lost when the instance stops. The enrollment data needs a persistent volume.',
          correct: false,
        },
      ],
    },
    {
      id: 'windows-labs',
      prompt:
        'Last topic: the computer labs have Windows servers, and the professors want a shared folder where everyone can leave class materials. A technician suggested Amazon EFS. What do you think?',
      topicSlug: 'hybrid-storage-and-backup',
      examTasks: ['3.6'],
      options: [
        {
          id: 'labs-efs',
          label: 'Amazon EFS, as the technician suggests',
          definition:
            'Elastic, serverless NFS file system that many instances can mount at once.',
          explanation:
            'This is the classic trap: Amazon EFS is not supported on Windows-based EC2 instances. The Windows labs need a different option.',
          correct: false,
        },
        {
          id: 'labs-ebs',
          label: 'An Amazon EBS volume attached to one lab server',
          definition:
            'Block storage volume that works as an EC2 instance\'s hard drive.',
          explanation:
            'An EBS volume is an instance\'s disk, usually for just one instance. It is not a shared folder for all the lab servers.',
          correct: false,
        },
        {
          id: 'labs-s3',
          label: 'An Amazon S3 bucket mounted as a network drive',
          definition:
            'Object storage in buckets, private by default and accessible through an API and URLs.',
          explanation:
            'S3 is used through an API and URLs; it is not mounted as a Windows network drive. It is not the shared folder the professors are asking for.',
          correct: false,
        },
        {
          id: 'labs-fsx-windows',
          label: 'Amazon FSx for Windows File Server',
          definition:
            'Fully managed shared file system built on Windows Server, with the SMB protocol and Active Directory integration.',
          explanation:
            'If the scenario says Windows and shared folders, the answer is FSx for Windows File Server: the lab servers access it over SMB, like any Windows folder.',
          correct: true,
        },
      ],
    },
  ],
};
