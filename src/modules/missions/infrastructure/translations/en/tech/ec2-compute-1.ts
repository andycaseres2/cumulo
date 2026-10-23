import type { Mission } from '../../../../domain/Mission';

/**
 * Café Hacker: a coffee shop in Medellín that hosts hackathons and runs its booking site and coding platform on Amazon EC2.
 * Practices the EC2 basics: general purpose instances, AMIs, EBS versus instance store and who patches the operating system.
 */
export const ec2Compute1: Mission = {
  id: 'ec2-compute-1',
  track: 'tech',
  topicSlug: 'ec2-compute',
  buildingId: 'hacker-cafe',
  title: 'Servers with coffee',
  client: { name: 'Samuel Ospina', role: 'Owner of Café Hacker' },
  intro: [
    'Welcome to Café Hacker! I\'m Samuel Ospina. In Medellín we serve the best tinto coffee for programmers, and every month we host a hackathon that packs the place.',
    'We have a page for booking tables and a platform where teams upload their challenges. It all runs on Amazon EC2 servers that I set up by reading tutorials.',
    'At the last hackathon, three teams lost their projects, setting up the servers took us all night, and nobody knew who was supposed to update the operating system.',
    'The next hackathon has big sponsors coming, and I can\'t let them down. Can you help me really understand EC2?',
  ],
  outro: {
    passed: [
      'Awesome! The servers come out identical in minutes, the projects stay saved even if the instance is stopped, and now I know the patches are on me.',
      'The hackathon was a hit and the sponsors are coming back next year. Your coffee is on the house for life.',
    ],
    failed: [
      'Ugh... with these decisions I think we\'d lose projects all over again.',
      'Review the Amazon EC2 theory with a good tinto coffee and come back whenever you like. The counter is waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'booking-site',
      prompt:
        'Let\'s start with the booking page: a simple website with steady traffic that doesn\'t use much CPU, memory or disk. Which EC2 instance family suits it?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'general-purpose',
          label: 'General purpose',
          definition:
            'Instance family that balances compute, memory and networking resources.',
          explanation:
            'When the scenario doesn\'t emphasize any particular resource, the answer is general purpose, the typical choice for web servers like this booking page.',
          correct: true,
        },
        {
          id: 'booking-compute',
          label: 'Compute optimized',
          definition:
            'Instance family with high-performance processors for CPU-intensive workloads.',
          explanation:
            'You choose these when the CPU is the bottleneck, as in batch processing; the booking page doesn\'t put the CPU front and center.',
          correct: false,
        },
        {
          id: 'booking-memory',
          label: 'Memory optimized',
          definition:
            'Instance family that delivers fast performance for large datasets in memory.',
          explanation:
            'These are for things like in-memory databases; a simple booking site doesn\'t have that need.',
          correct: false,
        },
        {
          id: 'booking-accelerated',
          label: 'Accelerated computing',
          definition:
            'Instance family that uses hardware accelerators, such as GPUs, for calculations and graphics processing.',
          explanation:
            'GPUs are for machine learning or graphics; a booking page doesn\'t need them.',
          correct: false,
        },
      ],
    },
    {
      id: 'identical-servers',
      prompt:
        'For the hackathon I need to launch fifteen identical instances, all with the same operating system and the same tools already installed, without configuring them one by one. Which EC2 component defines that?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'instance-type',
          label: 'The instance type',
          definition:
            'The combination of CPU, memory, storage, networking capacity and graphics hardware of an instance.',
          explanation:
            'The instance type defines the hardware, not the operating system or the installed tools.',
          correct: false,
        },
        {
          id: 'security-group',
          label: 'The security group',
          definition:
            'Virtual firewall that defines which network traffic can reach an instance.',
          explanation:
            'The security group controls traffic to the instances; it doesn\'t contain the operating system or the software.',
          correct: false,
        },
        {
          id: 'key-pair',
          label: 'The key pair',
          definition:
            'Credentials to log in securely to an instance: AWS stores the public key and the user keeps the private key.',
          explanation:
            'The key pair is for getting into the instance; it doesn\'t define what software comes installed.',
          correct: false,
        },
        {
          id: 'ami',
          label: 'The AMI (Amazon Machine Image)',
          definition:
            'Preconfigured template with the components a server needs, including the operating system and additional software.',
          explanation:
            'From a single AMI you can launch many identical instances. You prepare an AMI with the hackathon tools and launch all fifteen from it.',
          correct: true,
        },
      ],
    },
    {
      id: 'lost-projects',
      prompt:
        'What hurt the most: the teams saved their projects on the instance\'s storage, we stopped it when we closed up, and the next day they were gone. Where should they be saved so they survive a stop?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'instance-store',
          label: 'On instance store volumes',
          definition:
            'Temporary storage of an instance, which is erased when you stop, hibernate or terminate it.',
          explanation:
            'That\'s exactly what happened to you: instance store is temporary and is lost when the instance stops. It\'s not suitable for important data.',
          correct: false,
        },
        {
          id: 'ebs',
          label: 'On Amazon EBS volumes',
          definition:
            'Persistent block storage used with Amazon EC2 instances.',
          explanation:
            'EBS volumes are persistent storage: the projects are kept even if the instance is stopped overnight.',
          correct: true,
        },
        {
          id: 'projects-in-ami',
          label: 'Inside the AMI the instance was launched from',
          definition:
            'The template with the operating system and software from which instances are created.',
          explanation:
            'The AMI is a template for launching instances, not the place to save work that changes during the hackathon.',
          correct: false,
        },
        {
          id: 'projects-in-key',
          label: 'In each team\'s key pair',
          definition:
            'Asymmetric credentials that let you log in securely to an instance.',
          explanation:
            'The key pair is access credentials; it doesn\'t store files or projects.',
          correct: false,
        },
      ],
    },
    {
      id: 'os-patches',
      prompt:
        'Last question, the one that started the argument: on these EC2 instances, who is responsible for applying operating system patches?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'aws-managed',
          label: 'AWS, because EC2 is a fully managed service',
          definition:
            'The idea that with Amazon EC2 the provider maintains the operating system of the customer\'s instances.',
          explanation:
            'This is a classic trap: EC2 is not a managed service where AWS patches your operating system.',
          correct: false,
        },
        {
          id: 'aws-general-purpose',
          label: 'AWS, as long as the instances are general purpose',
          definition:
            'The idea that the chosen instance family changes who maintains the server\'s software.',
          explanation:
            'The instance family only defines the hardware; it doesn\'t change who patches the operating system.',
          correct: false,
        },
        {
          id: 'customer-iaas',
          label: 'Café Hacker, because EC2 is IaaS and gives full control of the operating system',
          definition:
            'The idea that with infrastructure as a service, the customer configures, updates and secures the operating system of their virtual servers.',
          explanation:
            'With EC2 you have full control of the operating system: you configure it, update it and secure it. That\'s why EC2 is an example of IaaS.',
          correct: true,
        },
        {
          id: 'ami-self-update',
          label: 'Nobody: the AMI automatically updates every launched instance',
          definition:
            'The idea that the launch template keeps the software of already-running instances up to date.',
          explanation:
            'The AMI is only used to launch instances; once they\'re launched, maintaining the operating system is the customer\'s responsibility.',
          correct: false,
        },
      ],
    },
  ],
};
