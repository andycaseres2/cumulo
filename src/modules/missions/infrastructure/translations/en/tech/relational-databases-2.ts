import type { Mission } from '../../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a video game store in San José (Costa Rica) whose self-managed MySQL on EC2 struggles at every launch.
 * Practices database on EC2 vs Amazon RDS, read replicas for read-heavy reports, the customer's duty to optimize queries,
 * and Amazon Aurora's MySQL compatibility and benefits.
 */
export const relationalDatabases2: Mission = {
  id: 'relational-databases-2',
  track: 'tech',
  topicSlug: 'relational-databases',
  buildingId: 'gaming-store',
  title: 'Game over for the server',
  client: { name: 'Diego Vargas', role: 'Owner of Tienda Gamer Pixel' },
  intro: [
    'Hey, player! I\'m Diego Vargas, owner of Tienda Gamer Pixel. From San José, Costa Rica, we sell video games, consoles and peripherals all across Central America.',
    'The online store keeps orders, inventory and customers in a MySQL database I installed myself on an Amazon EC2 instance. I\'m the only one who patches it and backs it up, usually in the middle of the night.',
    'Every time a much-awaited game comes out, the catalog and the sales reports overload the database and checkout gets painfully slow. We half-lost our last pre-sale.',
    'The biggest launch of the year is in three weeks. Will you help me keep the database from giving us a game over?',
  ],
  outro: {
    passed: [
      'Level cleared! The database moved to a managed service, the reports go to read replicas, and now I know that optimizing my queries is on me.',
      'And with Aurora we have a MySQL-compatible engine ready to grow. Thanks: your name is already on the store\'s high-score board.',
    ],
    failed: [
      'Ugh... with these decisions the launch will catch us with our health bar in the red again.',
      'Review the theory on relational databases and come back whenever you like. I\'ll save your game.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'pixel-managed-db',
      prompt:
        'First, I want to stop spending nights on patches and backups. I want AWS to handle patching, backups, failure detection and recovery, and I want to keep using MySQL. What should I do?',
      topicSlug: 'relational-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-bigger-ec2',
          label: 'Move MySQL to a larger EC2 instance',
          definition:
            'Self-managed database: AWS manages the hardware, and the customer installs, patches, backs up and scales the operating system and the engine.',
          explanation:
            'A larger instance gives more capacity, but Diego would still be doing all the patching and backups himself, which is exactly what he wants to stop.',
          correct: false,
        },
        {
          id: 'pixel-rds-mysql',
          label: 'Amazon RDS for MySQL',
          definition:
            'Managed relational database service that handles backups, patching, automatic failure detection and recovery.',
          explanation:
            'RDS is compatible with MySQL and takes care of patching, backups, failure detection and recovery. AWS recommends it as the default choice for most relational deployments.',
          correct: true,
        },
        {
          id: 'pixel-dynamodb',
          label: 'Amazon DynamoDB',
          definition: 'Serverless, fully managed NoSQL key-value database.',
          explanation:
            'DynamoDB is NoSQL and does not run the relational MySQL engine the store uses; the data and the application would have to be redesigned.',
          correct: false,
        },
        {
          id: 'pixel-redshift',
          label: 'Amazon Redshift',
          definition: 'AWS data warehouse, optimized for analyzing large volumes of historical data.',
          explanation:
            'Redshift is for analyzing historical data; it is not the transactional database where day-to-day orders are recorded.',
          correct: false,
        },
      ],
    },
    {
      id: 'pixel-read-heavy',
      prompt:
        'We\'re on RDS now. But at every launch, the sales reports and catalog searches, all read-only, overload the primary instance and slow down checkout. What should we add?',
      topicSlug: 'relational-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-multi-az',
          label: 'A standby instance with Multi-AZ',
          definition:
            'Deployment that replicates synchronously to a standby instance in another Availability Zone, with failover.',
          explanation:
            'In a Multi-AZ instance deployment the standby does not serve reads; its main purpose is high availability, not offloading the reports.',
          correct: false,
        },
        {
          id: 'pixel-snapshots',
          label: 'Manual snapshots every hour',
          definition: 'Point-in-time copies of the database used to restore it.',
          explanation:
            'Snapshots are for restoring the database; they do not serve queries from the reports or the catalog.',
          correct: false,
        },
        {
          id: 'pixel-read-replicas',
          label: 'Read replicas',
          definition:
            'Copies of the database that receive changes asynchronously from the primary instance and serve read-only queries.',
          explanation:
            'Sending the reports and catalog searches to read replicas scales reads and leaves the primary instance free for checkout.',
          correct: true,
        },
        {
          id: 'pixel-back-to-ec2',
          label: 'Reinstall the database on an EC2 instance',
          definition:
            'Self-managed database on a virtual server, with full control of the operating system and the engine.',
          explanation:
            'On EC2, Diego would go back to handling scaling and every other task himself; it is not the way to scale reads in RDS.',
          correct: false,
        },
      ],
    },
    {
      id: 'pixel-slow-queries',
      prompt:
        'Looking into it, we found that some catalog queries are badly written: they scan entire tables for no reason. Now that the database is managed, whose job is it to optimize them?',
      topicSlug: 'relational-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-customer-optimizes',
          label: 'The store\'s: optimizing the application and queries is still the customer\'s responsibility',
          definition:
            'Division of tasks in a managed database: AWS handles patching, backups and scaling; the customer designs the schema and optimizes the queries.',
          explanation:
            'With RDS, AWS takes care of tasks like patching and backups, but designing the schema and optimizing the queries is still the store\'s job.',
          correct: true,
        },
        {
          id: 'pixel-aws-engine',
          label: 'AWS\'s, because RDS manages the database engine',
          definition: 'The idea that managing the engine includes reviewing the customer\'s application queries.',
          explanation:
            'AWS managing the engine does not make it responsible for the queries; believing AWS optimizes them is a classic exam trap.',
          correct: false,
        },
        {
          id: 'pixel-aws-patches',
          label: 'AWS\'s, as part of the automatic software patching',
          definition: 'Software patches update the database engine and the operating system.',
          explanation:
            'Patches update the database software; they do not rewrite or optimize the store\'s queries.',
          correct: false,
        },
        {
          id: 'pixel-aws-scaling',
          label: 'AWS\'s, because in RDS scaling is AWS\'s responsibility',
          definition: 'In a managed database like RDS, AWS takes care of tasks such as scaling.',
          explanation:
            'AWS handling scaling does not include fixing badly written queries; that is still the store\'s job.',
          correct: false,
        },
      ],
    },
    {
      id: 'pixel-aurora',
      prompt:
        'For next year I want a fully managed relational engine with better performance than standard MySQL, storage that grows on its own and copies across several Availability Zones, without changing the store\'s code. Which one should I choose?',
      topicSlug: 'relational-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'pixel-redshift-engine',
          label: 'Amazon Redshift',
          definition: 'AWS data warehouse for complex analytical queries over large volumes of historical data.',
          explanation:
            'Redshift is designed for analytics, not for the online store\'s day-to-day transactions.',
          correct: false,
        },
        {
          id: 'pixel-dynamodb-engine',
          label: 'Amazon DynamoDB',
          definition: 'Serverless, fully managed NoSQL key-value database.',
          explanation:
            'DynamoDB is NoSQL and does not support JOINs; it would force a rewrite of the store instead of keeping its MySQL code.',
          correct: false,
        },
        {
          id: 'pixel-rds-sqlserver',
          label: 'Amazon RDS for SQL Server',
          definition: 'Amazon RDS managed relational database with the Microsoft SQL Server engine.',
          explanation:
            'Switching to SQL Server means changing engines and adapting the code, which is exactly what Diego wants to avoid.',
          correct: false,
        },
        {
          id: 'pixel-aurora-engine',
          label: 'Amazon Aurora (MySQL-compatible)',
          definition:
            'Fully managed relational database engine, part of Amazon RDS and compatible with MySQL and PostgreSQL.',
          explanation:
            'Aurora works with the same MySQL code and tools, delivers higher performance than standard MySQL, keeps copies across three Availability Zones, and its volume grows automatically with the data.',
          correct: true,
        },
      ],
    },
  ],
};
