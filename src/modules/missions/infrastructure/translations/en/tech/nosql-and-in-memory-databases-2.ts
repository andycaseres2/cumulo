import type { Mission } from '../../../../domain/Mission';

/**
 * StreamLlama's recommendations team in Lima: a growing streaming catalog spread across the wrong databases.
 * Practices Amazon Neptune, Amazon DocumentDB, AWS DMS after a schema conversion, and DynamoDB versus a relational trap.
 */
export const nosqlAndInMemoryDatabases2: Mission = {
  id: 'nosql-and-in-memory-databases-2',
  track: 'tech',
  topicSlug: 'nosql-and-in-memory-databases',
  buildingId: 'streaming',
  title: 'If You Liked This Series...',
  client: { name: 'Ximena Cárdenas', role: 'Recommendations Team Lead at StreamLlama' },
  intro: [
    'Hi, come in. I\'m Ximena Cárdenas, and I lead the recommendations team at StreamLlama, here in Lima. While other teams make sure the videos load fast, our job is to make sure you know what to watch.',
    'The catalog grows every week: series, movies, documentaries, each with different data. And our viewers follow each other, share lists and watch what their friends watch.',
    'The problem is that all of that is crammed into databases that weren\'t designed for it. Recommendations are slow, the catalog is a jigsaw puzzle, and the subscription system is still on an old server.',
    'If we don\'t sort this out, people will get tired of searching and move to another platform. I need to choose the right database for each thing. Are you up for it?',
  ],
  outro: {
    passed: [
      'Perfect. Neptune for the relationships, DocumentDB for the catalog without touching the code, DMS to bring over the subscriptions and DynamoDB for the watch history.',
      'Every piece of data in the database where it belongs. Now we can say with confidence, "if you liked this series, you\'re going to love this one." Thank you!',
    ],
    failed: [
      'Hmm... with these choices, recommendations would still be slow. Some pieces just don\'t fit.',
      'Review NoSQL and in-memory database theory and come back whenever you like. I\'ll save you a spot on the team couch.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'recommendation-graph',
      prompt:
        'Let\'s start with my favorite: we want to recommend titles based on what the people you follow watch, and what your friends\' friends watch. There are millions of viewers and billions of relationships between them and with the titles. Which database do I use?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'elasticache',
          label: 'Amazon ElastiCache',
          definition:
            'A managed in-memory data store or distributed cache, compatible with Valkey, Memcached and Redis OSS.',
          explanation:
            'ElastiCache speeds up repeated queries by keeping data in memory, but it isn\'t designed for traversing relationships between viewers and titles.',
          correct: false,
        },
        {
          id: 'rds-joins',
          label: 'Amazon RDS for PostgreSQL with lots of JOINs between tables',
          definition: 'A managed relational database that relates fixed-schema tables through SQL queries with JOINs.',
          explanation:
            'Traversing "friends of friends" across billions of relationships with chains of JOINs becomes slow and complex. For data this connected, there\'s a graph database.',
          correct: false,
        },
        {
          id: 'dynamodb-graph',
          label: 'Amazon DynamoDB',
          definition: 'A serverless NoSQL key-value and document database with single-digit milliseconds at any scale.',
          explanation:
            'DynamoDB is ideal for looking up data by its key, but it doesn\'t support JOINs and isn\'t optimized for traversing multi-hop relationships.',
          correct: false,
        },
        {
          id: 'neptune',
          label: 'Amazon Neptune',
          definition:
            'A fully managed graph database optimized for storing relationships between entities and traversing them with low latency.',
          explanation:
            'Viewers and titles are nodes, and "follows" or "watched" are relationships: a graph. Recommendation engines are a classic Neptune use case, and it supports Gremlin, openCypher and SPARQL.',
          correct: true,
        },
      ],
    },
    {
      id: 'catalog-documents',
      prompt:
        'Now the catalog. Each title is a JSON document with different fields: a series has seasons, a documentary has sources, a movie has versions. Today it runs on a MongoDB we maintain ourselves, and we want a managed one without rewriting the code or changing the drivers. Which one do I choose?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'documentdb',
          label: 'Amazon DocumentDB (with MongoDB compatibility)',
          definition:
            'A fully managed, MongoDB-compatible document database that supports the same code, drivers and tools.',
          explanation:
            'DocumentDB is compatible with MongoDB: it stores JSON documents with a flexible structure, and the team keeps its code, its drivers and its tools.',
          correct: true,
        },
        {
          id: 'dynamodb-catalog',
          label: 'Amazon DynamoDB',
          definition: 'A serverless NoSQL key-value and document database with automatic replication across three Availability Zones.',
          explanation:
            'Mixing up DocumentDB and DynamoDB is a classic trap. DynamoDB has its own API, so the team would have to rewrite the code that currently uses the MongoDB drivers.',
          correct: false,
        },
        {
          id: 'neptune-catalog',
          label: 'Amazon Neptune',
          definition: 'A managed graph database for highly connected data, such as social networks or knowledge graphs.',
          explanation:
            'Neptune already covers the relationships for the recommendations. The catalog consists of independent JSON documents that currently live in MongoDB, and Neptune isn\'t compatible with MongoDB.',
          correct: false,
        },
        {
          id: 'aurora',
          label: 'Amazon Aurora',
          definition: 'A managed relational database, compatible with MySQL and PostgreSQL, with fixed-schema tables.',
          explanation:
            'Aurora is relational: it would force documents with variable fields into fixed-schema tables and require rewriting the code built for MongoDB.',
          correct: false,
        },
      ],
    },
    {
      id: 'subscriptions-migration',
      prompt:
        'The subscription system runs on Oracle on our old server, and we\'re moving it to Amazon Aurora PostgreSQL. We already converted the schema with AWS SCT. Now we need to move the data and keep both databases in sync while customers keep paying, until cutover day. What do I use?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'datasync',
          label: 'AWS DataSync',
          definition: 'A service that transfers files and objects between on-premises storage and AWS storage services.',
          explanation:
            'DataSync copies files and objects; it doesn\'t replicate ongoing changes from an Oracle database to Aurora.',
          correct: false,
        },
        {
          id: 'dms',
          label: 'AWS Database Migration Service (AWS DMS)',
          definition:
            'A service that migrates databases to AWS, either one time or by replicating ongoing changes, between the same engine or different engines.',
          explanation:
            'With the schema already converted, DMS moves the data and can replicate ongoing changes to keep Oracle and Aurora in sync until cutover day.',
          correct: true,
        },
        {
          id: 'global-tables',
          label: 'DynamoDB global tables',
          definition: 'Multi-Region, multi-active replication of Amazon DynamoDB tables.',
          explanation:
            'Global tables replicate DynamoDB tables across Regions. They don\'t migrate data from Oracle and have nothing to do with Aurora PostgreSQL.',
          correct: false,
        },
        {
          id: 'elasticache-sync',
          label: 'Amazon ElastiCache between both databases',
          definition: 'A managed in-memory caching layer that keeps temporary copies of frequently queried data.',
          explanation:
            'A cache speeds up repeated reads, but it doesn\'t migrate data or keep two databases in sync.',
          correct: false,
        },
      ],
    },
    {
      id: 'watch-history',
      prompt:
        'Last topic: "continue watching." Every few seconds we save which minute each viewer is at, always by their ID and the title\'s ID. During a premiere that\'s a huge number of writes per second. A coworker suggests using RDS because "it\'s what we know." What do I tell them?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'rds-history',
          label: 'That they\'re right: Amazon RDS with a larger instance for premieres',
          definition: 'A managed relational database that scales mainly with larger instances and read replicas.',
          explanation:
            'This is the classic exam trap: key-value data with a huge volume of requests points to DynamoDB, which is designed to scale horizontally.',
          correct: false,
        },
        {
          id: 'elasticache-only',
          label: 'Store the history only in Amazon ElastiCache, with no primary database',
          definition: 'A managed in-memory store, normally used as a cache in front of a primary database.',
          explanation:
            'ElastiCache is normally used as a caching layer, not as a replacement for the primary database. Each viewer\'s history needs a database that stores it durably.',
          correct: false,
        },
        {
          id: 'dynamodb',
          label: 'Amazon DynamoDB is better, because it\'s key-value and scales without managing servers',
          definition:
            'A serverless, fully managed NoSQL database with single-digit millisecond performance at any scale.',
          explanation:
            'Progress is saved and read by the viewer\'s ID and the title\'s ID, with no joins. DynamoDB handles that volume in milliseconds, with no servers or patches to manage.',
          correct: true,
        },
        {
          id: 'neptune-history',
          label: 'Amazon Neptune is better, since we\'re already going to use it for recommendations',
          definition: 'A graph database for storing and querying relationships between highly connected entities.',
          explanation:
            'Saving which minute each viewer is at isn\'t a relationship problem. For massive key-value writes, the right database is DynamoDB.',
          correct: false,
        },
      ],
    },
  ],
};
