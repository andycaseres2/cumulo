import type { Mission } from '../../../../domain/Mission';

/**
 * Pedalea: a bike-sharing startup in Montevideo whose relational database cannot keep up with weekend peaks.
 * Practices Amazon DynamoDB, its on-demand capacity mode and global tables, and Amazon ElastiCache as a cache.
 */
export const nosqlAndInMemoryDatabases1: Mission = {
  id: 'nosql-and-in-memory-databases-1',
  track: 'tech',
  topicSlug: 'nosql-and-in-memory-databases',
  buildingId: 'startup-lab',
  title: 'Bikes That Don\'t Wait',
  client: { name: 'Martina Olivera', role: 'Co-founder and CTO of Pedalea' },
  intro: [
    'Hi! I\'m Martina Olivera, co-founder and CTO of Pedalea. Our office is here at the Startup Lab, but our bikes roll all over Montevideo.',
    'With the app, you unlock a bike, ride it and leave it at any station. Every trip generates dozens of reads and writes: where the bike is, who\'s using it, how far it has gone.',
    'The problem is that everything lives in a single relational database. On Saturday mornings, when half the city heads out for a ride along the rambla, the waterfront promenade, the app gets painfully slow and people end up standing in front of a bike that won\'t unlock.',
    'The investors want us to reach Santiago and São Paulo next year, and at this rate we won\'t even make it to the corner. I need to choose the right databases. Will you help me?',
  ],
  outro: {
    passed: [
      'That\'s it! DynamoDB for the trips, paying only for what we use, an in-memory cache for the leaderboard and the sessions, and global tables for when we cross the border.',
      'Next Saturday I\'m going for a ride along the rambla just to watch the app fly. Thank you, truly: at Pedalea there will always be a bike waiting for you.',
    ],
    failed: [
      'Hmm... I\'m not sure we\'d survive next Saturday with this plan. Some decisions still don\'t sit right with me.',
      'Review NoSQL and in-memory database theory and come back whenever you like. The bikes are waiting for you at the station.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'trip-store',
      prompt:
        'Let\'s start with the heart of the app: the state of each trip. We always look it up by the trip ID, we don\'t need to join tables, and at peak times we get a huge number of requests per second. I want responses in milliseconds and no servers or patches to manage. Which database do I use?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'rds-mysql',
          label: 'Amazon RDS for MySQL',
          definition:
            'A managed relational database with fixed-schema tables, SQL queries and joins between tables.',
          explanation:
            'Choosing a relational database for a huge volume of key-value requests is the classic trap. RDS scales with larger instances and read replicas, and it has maintenance windows.',
          correct: false,
        },
        {
          id: 'dynamodb',
          label: 'Amazon DynamoDB',
          definition:
            'A serverless, fully managed NoSQL key-value and document database with single-digit millisecond performance at any scale.',
          explanation:
            'Each trip is looked up by its key, with no joins, and DynamoDB responds in single-digit milliseconds at any scale. Because it\'s serverless, Pedalea doesn\'t provision servers or apply patches.',
          correct: true,
        },
        {
          id: 'neptune',
          label: 'Amazon Neptune',
          definition:
            'A fully managed graph database optimized for storing and querying relationships between entities.',
          explanation:
            'Neptune shines when the relationships between data are what matter, as in social networks or fraud detection. For reading and writing a trip\'s state by its ID, the key-value model is a better fit.',
          correct: false,
        },
        {
          id: 'redshift',
          label: 'Amazon Redshift',
          definition:
            'A managed data warehouse for analyzing large volumes of historical data with complex SQL queries.',
          explanation:
            'Redshift is for analytics and reporting on lots of data, not for handling every bike unlock in the app within milliseconds.',
          correct: false,
        },
      ],
    },
    {
      id: 'capacity-mode',
      prompt:
        'Our traffic is a roller coaster: on Saturdays it multiplies, in the early morning hours almost nobody rides, and when there\'s an event in the city we have no idea what will happen. I don\'t want to guess capacity. How do I configure the DynamoDB table?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'bigger-instance',
          label: 'Choose a larger instance for the table',
          definition:
            'Vertical scaling: replacing the database server with another one that has more CPU and memory.',
          explanation:
            'DynamoDB is serverless: there are no instances to choose for the table. Thinking in terms of bigger servers belongs to databases like RDS.',
          correct: false,
        },
        {
          id: 'fixed-peak',
          label: 'Manually set a capacity equal to the worst Saturday, all day long',
          definition:
            'Reserving a fixed number of reads and writes per second calculated for the moment of highest demand.',
          explanation:
            'Pedalea would pay for peak capacity even in the early morning hours, and if an event exceeded that number, the app would suffer again. It\'s exactly the guesswork Martina wants to avoid.',
          correct: false,
        },
        {
          id: 'elasticache-instead',
          label: 'Replace the table with Amazon ElastiCache to absorb the peaks',
          definition:
            'A managed in-memory data store or distributed cache, compatible with Valkey, Memcached and Redis OSS.',
          explanation:
            'ElastiCache is normally used as a caching layer in front of the primary database, not as its replacement. The trips table\'s capacity problem is solved within DynamoDB itself.',
          correct: false,
        },
        {
          id: 'on-demand',
          label: 'Use DynamoDB on-demand mode',
          definition:
            'A DynamoDB capacity mode in which you pay for the reads and writes performed and the table scales automatically.',
          explanation:
            'With on-demand mode, the table scales on its own with the Saturday peaks, even down to zero in the early morning hours, and Pedalea pays only for the reads and writes it performs.',
          correct: true,
        },
      ],
    },
    {
      id: 'leaderboard-cache',
      prompt:
        'Now the fun part: a weekly kilometer leaderboard that everyone checks at the same time, and user sessions, which today we query over and over in the primary database. My team already works with Redis OSS. Which service do I put in front to respond from memory?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'elasticache',
          label: 'Amazon ElastiCache',
          definition:
            'A managed in-memory data store or distributed cache service, with Valkey, Memcached and Redis OSS engines, in serverless or node-based mode.',
          explanation:
            'User sessions and leaderboards are classic ElastiCache use cases. It keeps data in RAM to respond extremely fast, works with Redis OSS, and AWS takes care of the nodes and the patches.',
          correct: true,
        },
        {
          id: 'documentdb',
          label: 'Amazon DocumentDB (with MongoDB compatibility)',
          definition:
            'A fully managed, MongoDB-compatible document database for records with a flexible structure in JSON format.',
          explanation:
            'DocumentDB is a document database for those who use MongoDB. What Pedalea is looking for is an in-memory caching layer, and its team works with Redis OSS.',
          correct: false,
        },
        {
          id: 'neptune-ranking',
          label: 'Amazon Neptune',
          definition:
            'A graph database for highly connected data, with languages such as Gremlin, openCypher and SPARQL.',
          explanation:
            'A kilometer leaderboard and some sessions aren\'t complex relationships between entities. Neptune isn\'t an in-memory cache in front of the primary database.',
          correct: false,
        },
        {
          id: 'sct',
          label: 'AWS Schema Conversion Tool (AWS SCT)',
          definition:
            'A downloadable tool that converts a source database\'s schema to the format of a different engine.',
          explanation:
            'SCT is for migrating between different engines by converting schemas. It doesn\'t keep data in memory or speed up repeated queries.',
          correct: false,
        },
      ],
    },
    {
      id: 'multi-region',
      prompt:
        'Last topic, the one the investors ask about most: when we open in Santiago and São Paulo, we want each country\'s app to read and write in a nearby AWS Region, and the trip data to be replicated across all of them. What do we use?',
      topicSlug: 'nosql-and-in-memory-databases',
      examTasks: ['3.4'],
      options: [
        {
          id: 'dax',
          label: 'DynamoDB Accelerator (DAX)',
          definition: 'A managed in-memory cache built specifically for Amazon DynamoDB that speeds up a table\'s reads.',
          explanation:
            'DAX speeds up reads with a cache, but it doesn\'t replicate the table across Regions or allow writes in several of them.',
          correct: false,
        },
        {
          id: 'separate-tables',
          label: 'An independent table in each Region, with no connection between them',
          definition: 'Creating isolated tables in different Regions, each with its own data and no synchronization.',
          explanation:
            'Each country would end up with different data: a Montevideo user traveling to Santiago wouldn\'t find their history. Martina asked for data replicated across all Regions.',
          correct: false,
        },
        {
          id: 'global-tables',
          label: 'DynamoDB global tables',
          definition: 'A DynamoDB feature that replicates a table across multiple Regions, with all of them active for reads and writes.',
          explanation:
            'Global tables provide multi-Region, multi-active replication: each country\'s app reads and writes in its nearby Region, and the trips are replicated across all of them.',
          correct: true,
        },
        {
          id: 'three-azs',
          label: 'Nothing extra: DynamoDB already replicates data across three Availability Zones',
          definition: 'Automatic DynamoDB replication across three Availability Zones within a single Region.',
          explanation:
            'That replication protects against the failure of one AZ, but it happens within a single Region. To read and write in Santiago and São Paulo, you need global tables.',
          correct: false,
        },
      ],
    },
  ],
};
