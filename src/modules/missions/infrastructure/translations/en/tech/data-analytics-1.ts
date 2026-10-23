import type { Mission } from '../../../../domain/Mission';

/**
 * Robótica Kids: a store in Guadalajara that sells robotics kits and runs weekend workshops for children.
 * Practices choosing analytics services: Amazon Athena, Amazon Kinesis, AWS Glue and Amazon Quick Sight.
 */
export const dataAnalytics1: Mission = {
  id: 'data-analytics-1',
  track: 'tech',
  topicSlug: 'data-analytics',
  buildingId: 'robotics-school',
  title: 'Robots that speak in data',
  client: { name: 'Mariana Villaseñor', role: 'Owner of Robótica Kids' },
  intro: [
    'Hi there! Welcome to Robótica Kids! I\'m Mariana Villaseñor. Here in Guadalajara we sell robotics kits for kids, and every weekend we run workshops where they build and program their own robots.',
    'The business grew fast: we now have an online store and three franchises in Jalisco. Every sale ends up as a file in Amazon S3, and the workshop robots send their sensor readings nonstop.',
    'The problem is I have mountains of data and zero answers. I don\'t know which kits sell best or which robots break down in the workshops, and the franchises ask me for numbers every week.',
    'I want to make data-driven decisions before back-to-school season, which is when we sell the most. Can you help me pick the right analytics tools?',
  ],
  outro: {
    passed: [
      'We did it! Now I query sales with SQL, I see in real time which robots are failing, and the data stays clean and cataloged.',
      'And the franchises finally have their dashboards on their phones. This back-to-school season we\'re planning with data. Thank you!',
    ],
    failed: [
      'Hmm... I think with these decisions I\'d still be drowning in files with no answers.',
      'Review the data analytics theory and come back whenever you like. The robots and I will be waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'query-sales-files',
      prompt:
        'Let\'s start with sales. I have three years of sales files in Amazon S3. I want to ask them questions with SQL, like which kit sells best each month, without setting up servers and paying only when I run a query. What should I use?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'athena-sales',
          label: 'Amazon Athena',
          definition:
            'Serverless interactive query service that analyzes data stored in Amazon S3 using standard SQL and charges for the queries you run.',
          explanation:
            'It fits exactly what you need: Athena queries the files directly in S3 with standard SQL, there are no servers to manage, and you pay only for the queries you run.',
          correct: true,
        },
        {
          id: 'kinesis-sales',
          label: 'Amazon Kinesis',
          definition:
            'Family of services to collect, process and analyze streaming data in real time, such as clicks or telemetry.',
          explanation:
            'Kinesis works with data that arrives continuously. Your sales are historical files already stored in S3, and what you need is to query them with SQL.',
          correct: false,
        },
        {
          id: 'quicksight-sales',
          label: 'Amazon Quick Sight',
          definition:
            'Business intelligence service to create interactive dashboards and visualizations you can view in the browser or on mobile.',
          explanation:
            'Quick Sight shows dashboards with the results, but it\'s not the service that runs SQL queries directly against the files stored in S3.',
          correct: false,
        },
        {
          id: 'opensearch-sales',
          label: 'Amazon OpenSearch Service',
          definition:
            'Managed service to deploy and scale OpenSearch, geared toward full-text search and near real-time log analytics.',
          explanation:
            'OpenSearch Service shines at searching text and analyzing logs. To query sales files in S3 with SQL and no servers, the choice is Athena.',
          correct: false,
        },
      ],
    },
    {
      id: 'robot-telemetry',
      prompt:
        'Now the workshops. Each robot sends several readings per second: battery, motors, sensors. I want to capture and process that stream while the workshop is running so I can alert the instructor when a robot is about to run out of battery. Which service goes here?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'redshift-telemetry',
          label: 'Amazon Redshift',
          definition:
            'Cloud data warehouse with columnar storage for complex analytical SQL queries over large volumes of data.',
          explanation:
            'Redshift is for complex, recurring analysis of data that is already stored. What you\'re asking for is to capture a continuous stream and react while the workshop is happening.',
          correct: false,
        },
        {
          id: 'athena-telemetry',
          label: 'Amazon Athena',
          definition:
            'Serverless service to query data stored in Amazon S3 using standard SQL.',
          explanation:
            'Athena queries data that is already stored in S3. To capture and process readings as they arrive, in real time, you use Kinesis.',
          correct: false,
        },
        {
          id: 'kinesis-telemetry',
          label: 'Amazon Kinesis',
          definition:
            'Family of services to collect, process and analyze streaming data in real time, such as IoT telemetry, logs or clicks.',
          explanation:
            'This is the classic streaming case: Kinesis Data Streams captures the robots\' readings as they arrive, so you can process them while the workshop keeps running.',
          correct: true,
        },
        {
          id: 'quicksight-telemetry',
          label: 'Amazon Quick Sight',
          definition:
            'Business intelligence service to create interactive dashboards and reports for decision-making.',
          explanation:
            'Quick Sight shows dashboards, but it doesn\'t capture or process the data stream the robots send. That streaming job belongs to Kinesis.',
          correct: false,
        },
      ],
    },
    {
      id: 'clean-and-catalog',
      prompt:
        'I ran into another mess: the online store saves sales as JSON, the franchises as CSV, and each one names the columns its own way. I need to clean and combine that data, and have a catalog with each table\'s schema so the queries know how to read it. What should I use?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'quicksight-catalog',
          label: 'Amazon Quick Sight',
          definition:
            'Business intelligence service to create interactive dashboards and visualizations that can be embedded in applications.',
          explanation:
            'This is a classic trap: dashboards belong to Quick Sight, but preparing data with ETL and cataloging its schemas is a job for AWS Glue.',
          correct: false,
        },
        {
          id: 'redshift-catalog',
          label: 'Amazon Redshift',
          definition:
            'Cloud data warehouse to analyze large volumes of structured and semi-structured data with standard SQL.',
          explanation:
            'Redshift is the destination where already-prepared data gets analyzed. What you need now is to transform the files and store their metadata in a catalog, and Glue does that.',
          correct: false,
        },
        {
          id: 'kinesis-video-catalog',
          label: 'Amazon Kinesis Video Streams',
          definition:
            'Kinesis service to capture and process video sent by connected devices.',
          explanation:
            'Kinesis Video Streams works with video from devices. Your problem is sales files in different formats that need to be cleaned and cataloged.',
          correct: false,
        },
        {
          id: 'glue-catalog',
          label: 'AWS Glue',
          definition:
            'Fully managed ETL service that discovers data, prepares it and stores its metadata in the AWS Glue Data Catalog.',
          explanation:
            'Glue extracts, transforms and loads the data to unify it, and its Glue Data Catalog stores the table definitions and schema, which Athena uses to know how to read them.',
          correct: true,
        },
      ],
    },
    {
      id: 'franchise-dashboards',
      prompt:
        'Last step. The franchise owners don\'t know SQL: they want to open their phones and see a dashboard with their store\'s sales, with charts they can filter. Which service do I give them?',
      topicSlug: 'data-analytics',
      examTasks: ['3.7'],
      options: [
        {
          id: 'emr-dashboards',
          label: 'Amazon EMR',
          definition:
            'Big data platform to process large volumes of data with open-source frameworks such as Apache Spark, Hive or HBase.',
          explanation:
            'EMR processes large volumes with frameworks like Spark, but it doesn\'t give franchise owners business dashboards to view on their phones.',
          correct: false,
        },
        {
          id: 'quicksight-dashboards',
          label: 'Amazon Quick Sight',
          definition:
            'Business intelligence service to create interactive dashboards and visualizations you can view from the browser or on mobile.',
          explanation:
            'Quick Sight is the AWS BI capability: it creates interactive dashboards that franchise owners can view in the browser or on their phones, without writing SQL.',
          correct: true,
        },
        {
          id: 'glue-dashboards',
          label: 'AWS Glue',
          definition:
            'Managed ETL service that prepares and loads data for analytics and maintains a metadata catalog.',
          explanation:
            'Glue prepares and catalogs the data that feeds the dashboards, but it doesn\'t create the visualizations. BI dashboards belong to Quick Sight.',
          correct: false,
        },
        {
          id: 'firehose-dashboards',
          label: 'Amazon Data Firehose',
          definition:
            'Service that loads streaming data into destinations such as Amazon S3, Amazon Redshift or Amazon OpenSearch Service.',
          explanation:
            'Firehose delivers streaming data to a storage or analytics destination. It doesn\'t offer dashboards for franchise owners to see their sales.',
          correct: false,
        },
      ],
    },
  ],
};
