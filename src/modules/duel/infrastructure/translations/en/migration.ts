import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const migrationFamily: ServiceFamily = {
  id: 'migration',
  title: 'Migration',
  summary:
    'Each one covers a step: decide with costs (Migration Evaluator), discover servers and dependencies (Application Discovery Service), move servers (Application Migration Service), move databases (DMS), convert schemas (SCT) and track progress (Migration Hub).',
  services: [
    {
      name: 'AWS Application Discovery Service',
      summary: 'Collects configuration, usage and behavior data from your on-premises servers to plan the migration.',
    },
    {
      name: 'Migration Evaluator',
      summary: 'Builds a data-driven business case: projected cloud costs and licensing options before you decide.',
    },
    {
      name: 'AWS Application Migration Service',
      summary: 'Rehost (lift-and-shift): converts physical, virtual or other-cloud servers to run on AWS unchanged.',
    },
    {
      name: 'AWS DMS',
      summary: 'Migrates and replicates databases with minimal downtime: the source database keeps running during the migration.',
    },
    {
      name: 'AWS SCT',
      summary: 'Converts a database schema (and the SQL in your code) from one engine to a different one, for example Oracle to PostgreSQL.',
    },
    {
      name: 'AWS Migration Hub',
      summary: 'A single place to track the progress of your migrations, no matter which AWS or partner tools you use.',
    },
  ],
  cards: [
    {
      id: 'migration-1',
      prompt:
        'An insurer in Lima has 300 servers in its data center and nobody really knows which ones depend on which. Before planning, it needs to collect their configuration, usage and behavior.',
      options: [
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service collects configuration, usage and behavior data from on-premises servers to plan the migration.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub shows migration progress. It can display discovered data, but another service does the collecting.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service moves servers to AWS. Here you still do not know what to move or in what order.',
        },
      ],
      answer: 'AWS Application Discovery Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-2',
      prompt:
        'The IT team of a hospital in Barranquilla wants to know its on-premises servers in depth: what runs on each one, how much it is used and how they talk to each other, to plan migration waves.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migrates databases. It does not inventory servers or their usage to plan the waves.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts database schemas between engines. It does not analyze the servers in the data center.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service gathers server configuration, usage and behavior data: the foundation for planning waves.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service carries out the server move. First you need to discover and understand them.',
        },
      ],
      answer: 'AWS Application Discovery Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-3',
      prompt:
        'The board of a supermarket chain in Santa Cruz will not approve anything without a data-driven business case: how much its infrastructure would cost in the cloud and how much it could save.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub tracks migrations in progress. It does not build the business case before the decision.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator builds a data-driven business case, with projected cloud costs to decide.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service collects technical data for planning. The business case for the board is the job of Migration Evaluator.',
        },
      ],
      answer: 'Migration Evaluator',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-4',
      prompt:
        'A university in Trujillo wants to compare, before migrating, whether to bring its own Windows Server and SQL Server licenses or use license-included instances.',
      options: [
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service moves the servers once you have decided. It does not compare licensing scenarios.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub tracks migration progress; it does not evaluate licensing costs before you decide.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator compares scenarios such as bringing your own licenses (BYOL) or using license-included, as part of the business case.',
        },
      ],
      answer: 'Migration Evaluator',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-5',
      prompt:
        'An accounting firm in Mendoza wants to take its 20 virtual machines to AWS as they are, without changing the applications and with the least possible downtime.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migrates databases, not whole servers with their operating system and applications.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service rehosts: it converts the servers to run on AWS unchanged and with minimal downtime.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts database schemas between engines. Here you change nothing, you just move the servers.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub tracks progress, but it does not copy or convert the servers by itself.',
        },
      ],
      answer: 'AWS Application Migration Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-6',
      prompt:
        'An e-commerce company in Guadalajara will move its physical servers to AWS unchanged. Before cutover, it wants to launch tests on AWS that do not disrupt the store.',
      options: [
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service collects data for planning. It does not replicate servers or launch tests on AWS.',
        },
        {
          service: 'AWS DMS',
          why: 'AWS DMS handles databases. Whole servers and their pre-cutover tests belong to another service.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service lets you launch non-disruptive tests before migrating physical or virtual servers.',
        },
      ],
      answer: 'AWS Application Migration Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-7',
      prompt:
        'A marketing agency in Montevideo runs its servers on another cloud provider and wants to bring them to Amazon EC2 with the same automated process, without rewriting its applications.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub gathers the status of migrations. Another service does the actual server move.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts database schemas. It does not move servers between clouds.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service converts physical, virtual or other-cloud servers to run natively on AWS.',
        },
      ],
      answer: 'AWS Application Migration Service',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-8',
      prompt:
        'A store in Quito wants to move its on-premises MySQL database to Amazon RDS for MySQL, the same engine. The store must keep selling while the data is copied.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migrates the database while the source keeps running, so the store never stops selling.',
        },
        {
          service: 'AWS SCT',
          why: 'With the same engine at source and target there is no schema to convert: AWS SCT is not needed here.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service moves whole servers. To land on a managed database in RDS you use AWS DMS.',
        },
      ],
      answer: 'AWS DMS',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-9',
      prompt:
        'A distributor in San Salvador needs to continuously replicate its on-premises Oracle database to AWS for weeks, until cutover day, without stopping the ordering system.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub shows migration progress, but it does not copy or replicate data.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service collects server data for planning. It does not replicate databases.',
        },
        {
          service: 'AWS DMS',
          why: 'AWS DMS provides ongoing data replication while the source database keeps running, until you choose to cut over.',
        },
      ],
      answer: 'AWS DMS',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-10',
      prompt:
        'A restaurant chain in Lima wants to send the sales data from its MySQL and SQL Server databases to Amazon Redshift to consolidate and analyze it.',
      options: [
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts schemas between engines, but it does not continuously deliver data to the warehouse.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator builds business cases with costs. It does not move data between databases.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service moves servers; it does not send data from several databases to a data warehouse.',
        },
        {
          service: 'AWS DMS',
          why: 'AWS DMS can deliver data to Amazon Redshift from sources such as MySQL and SQL Server to consolidate and analyze it.',
        },
      ],
      answer: 'AWS DMS',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-11',
      prompt:
        'A credit union in Cuenca will migrate from Oracle to Aurora PostgreSQL. Before moving the data, it needs to convert its tables, views and database code to the new engine format.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS moves and replicates the data. Converting the schema between different engines is the classic job of AWS SCT.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts the schema from one engine to another, such as Oracle to Aurora PostgreSQL, and guides you on what does not convert automatically.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub tracks progress. It does not convert database schemas.',
        },
      ],
      answer: 'AWS SCT',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-12',
      prompt:
        'A fintech in Bogotá is moving from SQL Server to MySQL. Besides the schema, it has SQL queries written inside its Java code that must also be adapted to the new engine.',
      options: [
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service analyzes servers for planning. It does not touch schemas or SQL code.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator estimates costs and builds the business case. It does not convert databases.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts the schema between different engines and also the SQL embedded in Java or C# application code.',
        },
      ],
      answer: 'AWS SCT',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-13',
      prompt:
        'A logistics company in Panama migrates servers with one tool, databases with another and one system with a partner tool. It wants to see the progress of each application in a single place.',
      options: [
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub brings migration progress together in a single place, even when you use AWS and partner tools.',
        },
        {
          service: 'AWS Application Discovery Service',
          why: 'Application Discovery Service discovers servers before migrating. It does not track progress across several tools.',
        },
        {
          service: 'Migration Evaluator',
          why: 'Migration Evaluator helps you decide with costs before starting, not track a migration in progress.',
        },
        {
          service: 'AWS SCT',
          why: 'AWS SCT converts database schemas. It does not offer a view of progress across the whole portfolio.',
        },
      ],
      answer: 'AWS Migration Hub',
      topicSlug: 'migration-strategies',
    },
    {
      id: 'migration-14',
      prompt:
        'The person leading the migration at a government ministry in Santo Domingo needs a dashboard with the status of every application in the portfolio, no matter which tool moves each one.',
      options: [
        {
          service: 'AWS DMS',
          why: 'AWS DMS migrates databases. It is one of the tools whose progress you want to see, not the central dashboard.',
        },
        {
          service: 'AWS Application Migration Service',
          why: 'Application Migration Service moves servers. It shows its own work, but not the status of the whole portfolio.',
        },
        {
          service: 'AWS Migration Hub',
          why: 'Migration Hub gives visibility into the migration status of the whole portfolio, whatever tool you use.',
        },
      ],
      answer: 'AWS Migration Hub',
      topicSlug: 'migration-strategies',
    },
  ],
};
