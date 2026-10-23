import type { Mission } from '../../../../domain/Mission';

/**
 * Estudio de Juegos Cóndor: a mobile game studio in Santiago de Chile drowning in player events and server logs.
 * Practices Amazon Data Firehose, Amazon EMR, Amazon Redshift versus Amazon Athena, and Amazon OpenSearch Service.
 */
export const dataAnalytics2: Mission = {
  id: 'data-analytics-2',
  track: 'tech',
  topicSlug: 'data-analytics',
  buildingId: 'game-studio',
  title: 'Millions of matches to analyze',
  client: { name: 'Tomás Riquelme', role: 'Data lead at Estudio de Juegos Cóndor' },
  intro: [
    'Hi, come on in. I\'m Tomás Riquelme, data lead at Estudio de Juegos Cóndor. From Santiago de Chile we make mobile games played by people all across Latin America.',
    'Our latest game, a llama race through the Andes, blew up: millions of matches a day. Every match generates events, and our servers write gigabytes of logs.',
    'Right now that data gets lost or sits on disks nobody checks. Design wants to know where players quit, finance wants purchase reports, and support can\'t find the errors.',
    'If we don\'t understand our players, we\'ll be flying blind into the game\'s next season. I need to build our analytics platform on AWS. Can you help me?',
  ],
  outro: {
    passed: [
      'Now we\'re talking. Events land in S3 on their own, the data science team runs Spark without wrestling with servers, and finance has its data warehouse.',
      'And support finds any error in the logs in seconds. We\'ll design next season with data. Thank you!',
    ],
    failed: [
      'Ugh... with these decisions we\'d still be playing blind. Some pieces don\'t fit what we need.',
      'Review the data analytics theory and come back. The studio is saving you a spot on the team.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'events-to-s3',
      prompt:
        'First things first: every match sends streaming events, like "started," "bought a skin" or "quit." I want those events loaded continuously into our data lake in Amazon S3, without writing or maintaining a program to receive them. What should I use?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'athena-ingest',
          label: 'Amazon Athena',
          definition:
            'Serverless interactive query service using standard SQL on data stored in Amazon S3.',
          explanation:
            'Athena queries data that is already in S3, but it doesn\'t receive an event stream or load it into the data lake.',
          correct: false,
        },
        {
          id: 'quicksight-ingest',
          label: 'Amazon Quick Sight',
          definition:
            'Business intelligence service to create interactive dashboards and visualizations.',
          explanation:
            'Quick Sight shows dashboards with data that is already available. It doesn\'t capture the match events or deliver them to S3.',
          correct: false,
        },
        {
          id: 'firehose-ingest',
          label: 'Amazon Data Firehose',
          definition:
            'Service in the Kinesis family that loads streaming data into destinations such as Amazon S3, Amazon Redshift or Amazon OpenSearch Service.',
          explanation:
            'Firehose receives the event stream and delivers it continuously to S3, the destination you need, without you maintaining your own program to receive them.',
          correct: true,
        },
        {
          id: 'redshift-ingest',
          label: 'Amazon Redshift',
          definition:
            'Cloud data warehouse for complex analytical SQL queries over large volumes of data.',
          explanation:
            'Redshift is a data warehouse for analyzing data, not a service for loading an event stream into a data lake in S3.',
          correct: false,
        },
      ],
    },
    {
      id: 'spark-jobs',
      prompt:
        'The data science team already has jobs written in Apache Spark to figure out which level players quit on. They want to run them over terabytes of matches without having to provision or tune clusters by hand. Which service should I recommend?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'emr-spark',
          label: 'Amazon EMR',
          definition:
            'Big data platform to process large volumes of data with open-source frameworks such as Apache Spark, Hive, HBase, Flink, Hudi and Presto.',
          explanation:
            'EMR is the choice for running big data frameworks like Spark over large volumes, and it automates tasks such as provisioning capacity and tuning clusters.',
          correct: true,
        },
        {
          id: 'quicksight-spark',
          label: 'Amazon Quick Sight',
          definition:
            'Business intelligence service to create dashboards and reports you can view in the browser or on mobile.',
          explanation:
            'Quick Sight is for visualizing results in dashboards. It doesn\'t run the data science team\'s Spark jobs.',
          correct: false,
        },
        {
          id: 'kinesis-streams-spark',
          label: 'Amazon Kinesis Data Streams',
          definition:
            'Service to capture real-time data streams from applications, devices and websites.',
          explanation:
            'Kinesis Data Streams captures data as it arrives. Processing terabytes of historical matches with Spark is a batch big data job, which is EMR territory.',
          correct: false,
        },
        {
          id: 'opensearch-spark',
          label: 'Amazon OpenSearch Service',
          definition:
            'Managed service to search, analyze and visualize data in near real time, such as logs or full text.',
          explanation:
            'OpenSearch Service focuses on search and log analytics. It isn\'t the platform for running the Apache Spark jobs the team already has.',
          correct: false,
        },
      ],
    },
    {
      id: 'finance-warehouse',
      prompt:
        'Finance is a whole other world. Every morning they run the same complex reports that cross years of purchases, players and campaigns, all structured data, and they want to load it into a data warehouse they can query with SQL from their BI tool. What should I choose?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'kinesis-warehouse',
          label: 'Amazon Kinesis Data Streams',
          definition:
            'Service to capture and process real-time data streams, such as clicks or application events.',
          explanation:
            'Kinesis Data Streams captures streaming data. Finance needs a warehouse for complex, recurring analysis of historical data.',
          correct: false,
        },
        {
          id: 'athena-warehouse',
          label: 'Amazon Athena',
          definition:
            'Serverless service that queries files directly in Amazon S3 with standard SQL, without loading the data into another system.',
          explanation:
            'This is the classic exam mix-up: Athena queries files right where they are, in S3. Finance is asking for a data warehouse for complex, recurring analysis at scale, and that\'s Redshift.',
          correct: false,
        },
        {
          id: 'opensearch-warehouse',
          label: 'Amazon OpenSearch Service',
          definition:
            'Managed OpenSearch service for full-text search, log analytics and application monitoring.',
          explanation:
            'OpenSearch Service is designed to search and analyze logs, not to be the data warehouse for financial reports.',
          correct: false,
        },
        {
          id: 'redshift-warehouse',
          label: 'Amazon Redshift',
          definition:
            'Cloud data warehouse with columnar storage and massively parallel processing to analyze large volumes of data with standard SQL.',
          explanation:
            'Redshift is the AWS data warehouse: it loads structured data, runs complex analytical SQL queries and connects to the BI tools finance already uses.',
          correct: true,
        },
      ],
    },
    {
      id: 'search-logs',
      prompt:
        'Finally, support. When a player reports that the game crashed, they want to search for the error text in the server logs and see error charts in near real time. Which service do I give them?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'glue-logs',
          label: 'AWS Glue',
          definition:
            'Fully managed ETL service to prepare and load data for analytics, with a metadata catalog.',
          explanation:
            'Glue prepares and catalogs data to be analyzed later. Support needs to search text in the logs and see them in near real time.',
          correct: false,
        },
        {
          id: 'opensearch-logs',
          label: 'Amazon OpenSearch Service',
          definition:
            'Managed service to deploy, operate and scale OpenSearch, used to search, analyze and visualize data in near real time.',
          explanation:
            'Log analytics and full-text search are the classic OpenSearch Service use cases, and OpenSearch Dashboards gives support its error charts.',
          correct: true,
        },
        {
          id: 'redshift-logs',
          label: 'Amazon Redshift',
          definition:
            'Data warehouse for complex analytical SQL queries over structured and semi-structured data.',
          explanation:
            'Redshift is strong at analytical SQL reports, like finance\'s. Searching for error text in logs in near real time is OpenSearch Service territory.',
          correct: false,
        },
        {
          id: 'kinesis-video-logs',
          label: 'Amazon Kinesis Video Streams',
          definition:
            'Service to capture and process video sent by connected devices.',
          explanation:
            'Kinesis Video Streams works with video from devices. It can\'t search text in the game servers\' logs.',
          correct: false,
        },
      ],
    },
  ],
};
