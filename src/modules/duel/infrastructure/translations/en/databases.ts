import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const databasesFamily: ServiceFamily = {
  id: 'databases',
  title: 'Databases',
  summary:
    'Each one serves a data model: relational (RDS, Aurora), key-value (DynamoDB), in-memory (ElastiCache), data warehouse for analytics (Redshift), graph (Neptune), and MongoDB-compatible documents (DocumentDB).',
  services: [
    {
      name: 'Amazon RDS',
      summary: 'Managed relational database with well-known engines: MySQL, MariaDB, PostgreSQL, Oracle, SQL Server, and Db2.',
    },
    {
      name: 'Amazon Aurora',
      summary: 'MySQL- and PostgreSQL-compatible relational database, faster than the standard engines, with storage replicated across three AZs.',
    },
    {
      name: 'Amazon DynamoDB',
      summary: 'Serverless key-value and document NoSQL database with single-digit millisecond latency at any scale.',
    },
    {
      name: 'Amazon ElastiCache',
      summary: 'In-memory cache (Valkey, Redis OSS, Memcached) with microsecond latency in front of your database.',
    },
    {
      name: 'Amazon Redshift',
      summary: 'Petabyte-scale data warehouse for analytics with SQL and BI tools.',
    },
    {
      name: 'Amazon Neptune',
      summary: 'Graph database for highly connected data: recommendations, fraud detection, social networks.',
    },
    {
      name: 'Amazon DocumentDB',
      summary: 'MongoDB-compatible JSON document database: you keep the same drivers and tools.',
    },
  ],
  cards: [
    {
      id: 'databases-1',
      prompt:
        'A clinic in Medellín runs medical records software that only works with Microsoft SQL Server. It wants to stop managing the server and have AWS handle patching and backups.',
      options: [
        {
          service: 'Amazon Aurora',
          why: 'Aurora is only compatible with MySQL and PostgreSQL. Software tied to SQL Server would not run without switching engines.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS offers SQL Server as a managed engine and automates provisioning, patching, and backups.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB stores MongoDB-compatible JSON documents. It does not run a relational engine like SQL Server.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is a data warehouse for analytics, not the transactional database behind a medical records app.',
        },
      ],
      answer: 'Amazon RDS',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-2',
      prompt:
        'A bakery in Arequipa tracks orders and inventory in a small MySQL database with related tables. It wants to move it to AWS in a few clicks and stop installing patches and taking backups.',
      options: [
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB is key-value NoSQL. For related MySQL tables you would have to redesign your data and your code.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache is an in-memory cache that speeds up reads. It does not replace the main orders database.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS gives you managed MySQL in a few clicks and automates patching and backups: exactly what a small business needs.',
        },
      ],
      answer: 'Amazon RDS',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-3',
      prompt:
        'A fintech in Bogotá uses PostgreSQL and is growing fast. It wants to keep the same engine, but with more performance, storage that grows on its own, and data replicated across three Availability Zones.',
      options: [
        {
          service: 'Amazon RDS',
          why: 'RDS for PostgreSQL is managed too, but shared storage with six copies across three AZs that grows automatically up to 128 TiB is unique to Aurora.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune is a graph database. It is not compatible with PostgreSQL or with an existing relational application.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora is PostgreSQL-compatible, faster than standard PostgreSQL, and its storage grows automatically and is replicated across three AZs.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB is NoSQL. Switching to it would mean rewriting an application built for PostgreSQL.',
        },
      ],
      answer: 'Amazon Aurora',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-4',
      prompt:
        'An online store in Guadalajara runs on MySQL and queries are already slow in peak season. It wants a relational engine compatible with its current code that is several times faster than standard MySQL.',
      options: [
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB is compatible with MongoDB, not MySQL. You would have to change the data model and the code.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'A cache can relieve repeated reads, but it does not change the engine or speed up the queries that reach the database.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora is MySQL-compatible, and AWS states it is up to five times faster than standard MySQL.',
        },
      ],
      answer: 'Amazon Aurora',
      topicSlug: 'relational-databases',
    },
    {
      id: 'databases-5',
      prompt:
        'A delivery app in Lima stores each order’s cart by its ID. At lunchtime peaks it gets millions of requests and needs single-digit millisecond latency without managing servers.',
      options: [
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB is key-value, has no servers to manage, and delivers single-digit millisecond latency at any scale.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS is relational and runs on instances you choose and size. It is not ideal for simple key lookups at massive scale.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune is for traversing relationships in a graph. Reading a cart by its ID does not need a graph.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is built for analytical queries over large volumes, not for thousands of small reads and writes per second.',
        },
      ],
      answer: 'Amazon DynamoDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-6',
      prompt:
        'A game studio in Santiago saves each account’s progress by its ID. It needs no joins between tables, expects huge spikes at every launch, and wants a serverless NoSQL database.',
      options: [
        {
          service: 'Amazon Aurora',
          why: 'Aurora is relational. Its strengths (SQL, joins, MySQL compatibility) are not needed to read and write by ID.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache is an in-memory cache that speeds up reads. Game progress needs a durable database as its primary store.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB is serverless key-value NoSQL, designed for high-traffic games and apps that access data by key.',
        },
      ],
      answer: 'Amazon DynamoDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-7',
      prompt:
        'A digital newspaper in Caracas has a front page read thousands of times per second. Its relational database is overloaded answering the same queries over and over. It wants an in-memory layer in front of it.',
      options: [
        {
          service: 'Amazon RDS',
          why: 'RDS is already the relational database that is overloaded. Adding another database does not fix repeated reads; a cache does.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is for analyzing historical data, not for serving the same page thousands of times per second.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache keeps the most requested results in memory and serves them with microsecond latency, taking load off the database.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB is a full NoSQL database. Here you do not want to move your data, just put a cache in front of the current database.',
        },
      ],
      answer: 'Amazon ElastiCache',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-8',
      prompt:
        'A live trivia contest in Asunción shows a score leaderboard that changes every second while thousands of people answer. It needs ultra-fast in-memory reads and writes.',
      options: [
        {
          service: 'Amazon Neptune',
          why: 'Neptune stores relationships between data in a graph. A score leaderboard does not need to traverse connections.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'Gaming leaderboards and sessions are classic ElastiCache use cases: in-memory data with microsecond latency.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB stores JSON documents on disk. It is not an in-memory layer for a leaderboard that changes every second.',
        },
      ],
      answer: 'Amazon ElastiCache',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-9',
      prompt:
        'A pharmacy chain in Guayaquil wants to analyze five years of sales from all its branches with complex SQL queries and connect its business intelligence tool.',
      options: [
        {
          service: 'Amazon Aurora',
          why: 'Aurora is a transactional (OLTP) database for day-to-day operations. Analytical queries over years of history belong in a data warehouse.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is a petabyte-scale data warehouse built for analytics with SQL and BI tools.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB shines at fast key lookups. It is not designed for analytical SQL queries across years of sales.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'databases-10',
      prompt:
        'A university in Córdoba wants to bring enrollment, grades, and payment data from several systems into one place to run institution-wide analytical reports with SQL.',
      options: [
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache speeds up repeated reads in memory. It is not the place to consolidate years of data and analyze it.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune is for highly connected data in a graph, not for analytical SQL reports on consolidated data.',
        },
        {
          service: 'Amazon RDS',
          why: 'RDS is ideal for an application’s daily operations, but high-volume analytical reports fit better in a data warehouse.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is the AWS data warehouse: it consolidates data from several sources and answers analytical queries with SQL.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'databases-11',
      prompt:
        'A network of women entrepreneurs in San José, Costa Rica, wants to suggest "you know someone who knows this person" contacts by traversing millions of connections between profiles.',
      options: [
        {
          service: 'Amazon Neptune',
          why: 'Neptune is a graph database optimized for relationships: traversing friends of friends is its typical use case.',
        },
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB reads fast by key, but traversing many levels of relationships forces many chained queries.',
        },
        {
          service: 'Amazon RDS',
          why: 'In a relational database these queries need many joins and get slow as connections grow.',
        },
      ],
      answer: 'Amazon Neptune',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-12',
      prompt:
        'A credit union in La Paz wants to detect fraud by finding accounts that share phone numbers, addresses, and devices, even when the link is several hops away.',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift analyzes large volumes with SQL, but it is not optimized for traversing chains of relationships between entities.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB stores JSON documents. Following connections across many documents is not its strength.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora is relational. Finding links several hops away requires costly joins that a graph handles better.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Fraud detection is a classic Neptune use case: it follows relationships between accounts, devices, and addresses in a graph.',
        },
      ],
      answer: 'Amazon Neptune',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-13',
      prompt:
        'A publisher in Buenos Aires keeps its catalog in MongoDB, as JSON documents. It wants a managed database on AWS and to keep using the same drivers and tools without rewriting the application.',
      options: [
        {
          service: 'Amazon DynamoDB',
          why: 'DynamoDB also stores documents, but it is not MongoDB-compatible: you would have to change the drivers and part of the code.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB is MongoDB-compatible, so the application keeps using its current drivers and tools.',
        },
        {
          service: 'Amazon Neptune',
          why: 'Neptune is a graph database. A catalog of JSON documents does not need to traverse relationships.',
        },
      ],
      answer: 'Amazon DocumentDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
    {
      id: 'databases-14',
      prompt:
        'A museum in Mexico City manages artwork records in JSON, each with different fields. Its team already works with MongoDB tools and wants a managed document service.',
      options: [
        {
          service: 'Amazon RDS',
          why: 'RDS is relational: it requires a fixed table schema and is not compatible with MongoDB tools.',
        },
        {
          service: 'Amazon ElastiCache',
          why: 'ElastiCache is an in-memory cache. It is not the durable database where the museum’s catalog lives.',
        },
        {
          service: 'Amazon Aurora',
          why: 'Aurora is relational and compatible with MySQL or PostgreSQL, not MongoDB.',
        },
        {
          service: 'Amazon DocumentDB',
          why: 'DocumentDB is a managed, MongoDB-compatible JSON document database: it fits variable fields and the team’s skills.',
        },
      ],
      answer: 'Amazon DocumentDB',
      topicSlug: 'nosql-and-in-memory-databases',
    },
  ],
};
