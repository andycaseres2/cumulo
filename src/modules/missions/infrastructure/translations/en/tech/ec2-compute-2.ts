import type { Mission } from '../../../../domain/Mission';

/**
 * Estudio de Juegos Cóndor: a game studio from Quito choosing EC2 hardware for a multiplayer launch.
 * Practices matching workloads to EC2 instance families (compute, accelerated, memory) and vertical scaling.
 */
export const ec2Compute2: Mission = {
  id: 'ec2-compute-2',
  track: 'tech',
  topicSlug: 'ec2-compute',
  buildingId: 'game-studio',
  title: 'Hardware to soar high',
  client: { name: 'Sofía Paucar', role: 'Technical director of Estudio de Juegos Cóndor' },
  intro: [
    'Hi, so nice to meet you. I\'m Sofía Paucar, technical director of Estudio de Juegos Cóndor. We\'re from Quito and we make games inspired by Andean legends.',
    'In three months we\'re launching our first online multiplayer game. We\'re going to use Amazon EC2, but there are dozens of instance types and the team picks them at random.',
    'During the beta, the match servers froze up, training our AI characters took weeks and the leaderboard was slow to respond.',
    'If the launch fails, players won\'t come back. Can you help me pick the right hardware for each workload?',
  ],
  outro: {
    passed: [
      'We\'re soaring! Every workload now has the instance family it needs, and we know how to grow an instance when it falls short.',
      'The launch went off without a hitch and players are already asking for season two. Your name is going in the game\'s credits.',
    ],
    failed: [
      'Hmm... with these choices I think the beta would repeat itself on launch day.',
      'Review the theory on EC2 instance families and come back whenever you like. The condor is waiting.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'match-servers',
      prompt:
        'First, the dedicated match servers: they calculate the physics and positions of hundreds of players at once, and during the beta the CPU was pegged at one hundred percent. Which instance family should we choose?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'match-memory',
          label: 'Memory optimized',
          definition:
            'Instance family that delivers fast performance for large datasets in memory.',
          explanation:
            'You choose these when memory is the problem; here the clue is a maxed-out CPU.',
          correct: false,
        },
        {
          id: 'compute-optimized',
          label: 'Compute optimized',
          definition:
            'Instance family with high-performance processors for CPU-heavy workloads.',
          explanation:
            'Dedicated game servers are a typical workload for this family: they prioritize high-performance processors, exactly what was missing during the beta.',
          correct: true,
        },
        {
          id: 'match-storage',
          label: 'Storage optimized',
          definition:
            'Instance family with low-latency, high-throughput I/O on large local datasets.',
          explanation:
            'This family is for lots of reads and writes on local storage; the bottleneck for the matches is the CPU.',
          correct: false,
        },
        {
          id: 'match-general',
          label: 'General purpose',
          definition:
            'Instance family that balances compute, memory and networking without prioritizing any of them.',
          explanation:
            'General purpose is chosen when no resource stands out; here the CPU clearly stands out.',
          correct: false,
        },
      ],
    },
    {
      id: 'train-npcs',
      prompt:
        'Now the AI: we want to train a machine learning model to control the game\'s characters, and the data team says they need GPUs. Which instance family do we use?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'accelerated',
          label: 'Accelerated computing',
          definition:
            'Instance family that uses hardware accelerators or co-processors, such as GPUs.',
          explanation:
            'GPUs and other accelerators are the clue: this family is the right fit for machine learning and graphics processing.',
          correct: true,
        },
        {
          id: 'train-memory',
          label: 'Memory optimized',
          definition:
            'Instance family designed to work with large volumes of data in memory.',
          explanation:
            'They provide lots of memory, but not the GPUs the data team is asking for to train the model.',
          correct: false,
        },
        {
          id: 'train-storage',
          label: 'Storage optimized',
          definition:
            'Instance family focused on fast I/O on local storage.',
          explanation:
            'You choose these for fast local reads and writes, not for having GPUs to train models.',
          correct: false,
        },
        {
          id: 'train-general',
          label: 'General purpose',
          definition:
            'Balanced instance family for workloads such as web servers or code repositories.',
          explanation:
            'The GPU clue points to a family with hardware accelerators, not a balanced one.',
          correct: false,
        },
      ],
    },
    {
      id: 'leaderboard',
      prompt:
        'The leaderboard uses a database that keeps every player\'s progress in memory to respond instantly, and during the beta it ran out of memory. Which family fits?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'leaderboard-compute',
          label: 'Compute optimized',
          definition:
            'Instance family with high-performance processors, typical for batch processing and transcoding.',
          explanation:
            'This is the classic trap: choosing compute when the problem is memory. The clue here is the in-memory database.',
          correct: false,
        },
        {
          id: 'leaderboard-accelerated',
          label: 'Accelerated computing',
          definition:
            'Instance family with GPUs or other accelerators for specialized calculations.',
          explanation:
            'Accelerators are for graphics and machine learning, not for keeping a database in memory.',
          correct: false,
        },
        {
          id: 'leaderboard-storage',
          label: 'Storage optimized',
          definition:
            'Instance family that prioritizes low-latency I/O on data stored on local disks.',
          explanation:
            'This family focuses on local disk; the leaderboard works with data in memory.',
          correct: false,
        },
        {
          id: 'memory-optimized',
          label: 'Memory optimized',
          definition:
            'Instance family that delivers fast performance for large datasets in memory.',
          explanation:
            'In-memory databases are a typical workload for this family: they\'ll give the leaderboard the memory it lacked during the beta.',
          correct: true,
        },
      ],
    },
    {
      id: 'build-server',
      prompt:
        'One last detail: our only server that builds the game is running short on CPU and memory. We decided to switch it to a larger instance type. What is that kind of scaling called?',
      topicSlug: 'ec2-compute',
      examTasks: ['3.3'],
      options: [
        {
          id: 'horizontal',
          label: 'Horizontal scaling',
          definition:
            'Increasing or decreasing capacity by adding or removing instances.',
          explanation:
            'No instances are being added here: you\'re changing the capacity of the same instance.',
          correct: false,
        },
        {
          id: 'change-ami',
          label: 'Changing the AMI',
          definition:
            'Launching the instance from a different template with a different operating system or software.',
          explanation:
            'The AMI defines the software; changing it doesn\'t give the server more CPU or memory.',
          correct: false,
        },
        {
          id: 'vertical',
          label: 'Vertical scaling',
          definition:
            'Giving more or less capacity to the same instance by changing its type (scale up/down).',
          explanation:
            'Changing the instance type to give more capacity to the same instance is vertical scaling, exactly what you decided for the build server.',
          correct: true,
        },
        {
          id: 'bigger-security-group',
          label: 'Expanding the security group',
          definition:
            'Modifying the rules of the virtual firewall that controls traffic to an instance.',
          explanation:
            'The security group controls network traffic; it doesn\'t change the server\'s compute capacity.',
          correct: false,
        },
      ],
    },
  ],
};
