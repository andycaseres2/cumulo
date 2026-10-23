import type { Mission } from '../../../../domain/Mission';

/**
 * Logística Pacífico: a port logistics company in Valparaíso that must justify its migration and move its databases without stopping the port.
 * Practices Migration Evaluator, AWS SCT, AWS DMS continuous replication and the replatform strategy.
 */
export const migrationStrategies2: Mission = {
  id: 'migration-strategies-2',
  track: 'downtown',
  buildingId: 'logistics',
  topicSlug: 'migration-strategies',
  title: 'Moving without stopping the port',
  client: { name: 'Camila Fuentes', role: 'Technology Manager at Logística Pacífico' },
  intro: [
    'I’m glad you made it. I’m Camila Fuentes, technology manager at Logística Pacífico. We coordinate the loading and unloading of containers at the port of Valparaíso, around the clock.',
    'Our data center is getting old and the board is divided: some want to migrate to AWS and others say it will be more expensive. Nobody has numbers, just opinions.',
    'On top of that, the heart of the operation is an Oracle database with the record of every container. If it stops, the trucks are left lined up at the port entrance.',
    'I need to convince the board and plan moving the data without stopping the port for even a minute. Will you help me?',
  ],
  outro: {
    passed: [
      'Excellent! The board approved the migration with numbers in hand, and now I know how to convert the Oracle schema and keep the data in sync until the cutover.',
      'The tracking system has a clear path too. Thank you: when you come through Valparaíso, I’ll show you the port from the tallest crane.',
    ],
    failed: [
      'Ugh... with these answers I won’t convince the board, and I risk leaving the trucks lined up. Some decisions worry me.',
      'Review the migration theory, especially the database services, and come back whenever you like. The port is still running and waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'business-case',
      prompt:
        'First, the board. I need a business case with real data: an inventory of our servers, which ones are oversized and how much it would cost on AWS, also comparing whether we reuse our licenses. What do I use?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'migration-hub-case',
          label: 'AWS Migration Hub',
          definition:
            'A single place to discover servers, plan and track the status of each migration, regardless of the tool used.',
          explanation:
            'Migration Hub is for tracking the progress of migrations. The business case with costs and licenses is built by Migration Evaluator.',
          correct: false,
        },
        {
          id: 'migration-evaluator-case',
          label: 'Migration Evaluator',
          definition:
            'A service that builds a data-driven business case: it inventories the on-premises environment, detects oversized servers and compares costs.',
          explanation:
            'It’s exactly what the board is asking for: an inventory, oversized servers and a cost comparison that includes reusing licenses versus license included.',
          correct: true,
        },
        {
          id: 'mgn-case',
          label: 'AWS Application Migration Service',
          definition:
            'A service that replicates physical, virtual or other-cloud servers to AWS with continuous block-level replication.',
          explanation:
            'Application Migration Service carries out the rehosting of servers. It’s useful once the decision to migrate is made, not for justifying that decision to the board.',
          correct: false,
        },
        {
          id: 'dms-case',
          label: 'AWS Database Migration Service (AWS DMS)',
          definition:
            'A service that migrates databases and other data stores, with one-time migrations or ongoing replication of changes.',
          explanation:
            'DMS moves the data during the migration. It doesn’t inventory servers or build a business case with costs.',
          correct: false,
        },
      ],
    },
    {
      id: 'schema-conversion',
      prompt:
        'Approved! We’ve decided to leave Oracle and move the container registry to Amazon Aurora PostgreSQL. The tables, views and procedures are written for Oracle. Which tool converts that schema to the new engine?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3', '3.4'],
      options: [
        {
          id: 'migration-evaluator-schema',
          label: 'Migration Evaluator',
          definition:
            'A service that builds a data-driven business case: it inventories the on-premises environment, detects oversized servers and compares costs.',
          explanation:
            'Migration Evaluator already did its job with the business case. It doesn’t convert database schemas.',
          correct: false,
        },
        {
          id: 'mgn-schema',
          label: 'AWS Application Migration Service',
          definition:
            'A service that replicates physical, virtual or other-cloud servers to AWS with continuous block-level replication.',
          explanation:
            'Application Migration Service copies servers as they are. When switching from Oracle to PostgreSQL, the schema has to be converted.',
          correct: false,
        },
        {
          id: 'migration-hub-schema',
          label: 'AWS Migration Hub',
          definition:
            'A single place to discover servers, plan and track the status of each migration, regardless of the tool used.',
          explanation:
            'Migration Hub tracks progress, but it doesn’t convert tables, views or procedures from one engine to another.',
          correct: false,
        },
        {
          id: 'sct-schema',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'A tool that converts a database schema from one engine to another, for example from Oracle to Aurora PostgreSQL.',
          explanation:
            'This is a heterogeneous migration: the engine changes. SCT converts tables, views and database code, and gives guidance for whatever it can’t convert automatically.',
          correct: true,
        },
      ],
    },
    {
      id: 'continuous-sync',
      prompt:
        'With the schema ready, the most delicate part remains: moving the data. The port can’t stop, so the Oracle database has to keep receiving records while we copy everything, and the target must stay in sync until the cutover. Which service do we use?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3', '3.4'],
      options: [
        {
          id: 'dms-sync',
          label: 'AWS Database Migration Service (AWS DMS)',
          definition:
            'A service that migrates databases and other data stores, with one-time migrations or ongoing replication of changes.',
          explanation:
            'DMS replicates ongoing changes to keep the Oracle source and the Aurora PostgreSQL target in sync until the cutover, while the port keeps operating.',
          correct: true,
        },
        {
          id: 'sct-sync',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'A tool that converts a database schema from one engine to another, for example from Oracle to Aurora PostgreSQL.',
          explanation:
            'This is the trap of confusing SCT with DMS: SCT converts the schema, but moving and replicating the data is DMS’s job.',
          correct: false,
        },
        {
          id: 'migration-hub-sync',
          label: 'AWS Migration Hub',
          definition:
            'A single place to discover servers, plan and track the status of each migration, regardless of the tool used.',
          explanation:
            'Migration Hub shows the status of migrations, but it doesn’t copy or sync the database’s data.',
          correct: false,
        },
        {
          id: 'migration-evaluator-sync',
          label: 'Migration Evaluator',
          definition:
            'A service that builds a data-driven business case: it inventories the on-premises environment, detects oversized servers and compares costs.',
          explanation:
            'Migration Evaluator is for deciding on and justifying the migration. It doesn’t move data between databases.',
          correct: false,
        },
      ],
    },
    {
      id: 'tracking-database',
      prompt:
        'That leaves the truck tracking system, which uses Microsoft SQL Server on our own server. We don’t want to redesign the application, but we do want to stop patching and backing up the database ourselves by moving it to Amazon RDS for SQL Server. Which strategy is that?',
      topicSlug: 'migration-strategies',
      examTasks: ['1.3'],
      options: [
        {
          id: 'rehost-tracking',
          label: 'Rehost (lift and shift)',
          definition:
            'A migration strategy that moves the application to AWS without changes, for example to Amazon EC2 instances.',
          explanation:
            'With rehost the SQL Server machine would move as is to EC2, and the team would keep managing the database. Moving to Amazon RDS is an optimization along the way.',
          correct: false,
        },
        {
          id: 'refactor-tracking',
          label: 'Refactor / re-architect',
          definition:
            'A migration strategy that redesigns the application to take advantage of cloud-native features, such as splitting a monolith into microservices.',
          explanation:
            'Refactor means redesigning the application, and Camila said she doesn’t want to change its architecture. It’s also the most complex and expensive strategy.',
          correct: false,
        },
        {
          id: 'replatform-tracking',
          label: 'Replatform (lift, tinker and shift)',
          definition:
            'A migration strategy that moves the application with some optimizations, without changing its core architecture.',
          explanation:
            'Moving a Microsoft SQL Server database to Amazon RDS for SQL Server is the textbook example of replatform: the same application, with the advantage of a managed database.',
          correct: true,
        },
        {
          id: 'repurchase-tracking',
          label: 'Repurchase (drop and shop)',
          definition:
            'A migration strategy that replaces the application with a different product or version, usually a SaaS offering.',
          explanation:
            'Repurchase swaps the system for another product. Logística Pacífico wants to keep its tracking application.',
          correct: false,
        },
      ],
    },
  ],
};
