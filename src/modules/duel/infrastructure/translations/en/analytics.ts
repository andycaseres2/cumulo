import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const analyticsFamily: ServiceFamily = {
  id: 'analytics',
  title: 'Data analytics',
  summary:
    'SQL directly on S3 (Athena), ETL and catalog (Glue), real-time data (Kinesis), Spark and Hadoop on a cluster (EMR), data warehouse (Redshift), BI dashboards (Quick Sight) and search or log analytics (OpenSearch Service).',
  services: [
    {
      name: 'Amazon Athena',
      summary: 'Serverless interactive SQL queries directly on data in S3; you pay for the queries you run.',
    },
    {
      name: 'AWS Glue',
      summary: 'Serverless data integration: ETL to prepare data and a Data Catalog with crawlers that discover schemas.',
    },
    {
      name: 'Amazon Kinesis',
      summary: 'Collects and processes real-time data streams, such as clicks, logs or sensor readings.',
    },
    {
      name: 'Amazon EMR',
      summary: 'Managed clusters for big data frameworks such as Apache Spark, Hadoop and Hive.',
    },
    {
      name: 'Amazon Redshift',
      summary: 'Managed petabyte-scale data warehouse for analytics with SQL and BI tools.',
    },
    {
      name: 'Amazon Quick Sight',
      summary: 'Business intelligence: interactive dashboards and visualizations you can share or embed in apps.',
    },
    {
      name: 'Amazon OpenSearch Service',
      summary: 'Managed search and analytics engine: text search, log analytics and near real-time monitoring.',
    },
  ],
  cards: [
    {
      id: 'analytics-1',
      prompt:
        'A coffee cooperative in Cusco keeps years of sales in CSV files in S3. It wants to run SQL queries now and then, without loading the data into a database or managing servers, and pay only for what it queries.',
      options: [
        {
          service: 'Amazon Athena',
          why: 'Correct: Athena is serverless, queries the files already in S3 with standard SQL, and you pay for the queries you run.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is a data warehouse where you usually load the data; for occasional queries on files in S3 it is more than you need.',
        },
        {
          service: 'Amazon EMR',
          why: 'EMR spins up Spark or Hadoop clusters for big data; here occasional SQL without managing anything is enough.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight shows BI dashboards; it is not the service that runs SQL queries on the files in S3.',
        },
      ],
      answer: 'Amazon Athena',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-2',
      prompt:
        'A hotel in Cartagena stores its load balancer access logs in S3. Once a month someone from security wants to review them with SQL to look for patterns, without leaving any infrastructure running between reviews.',
      options: [
        {
          service: 'Amazon OpenSearch Service',
          why: 'OpenSearch Service is used for log analytics, but you would have to index the logs in a domain; for occasional SQL on S3 there is something simpler.',
        },
        {
          service: 'Amazon Redshift',
          why: 'A data warehouse is meant for frequent analytics on loaded data; you do not need one to review logs once a month.',
        },
        {
          service: 'Amazon Athena',
          why: 'Correct: you point Athena at the logs in S3, query with SQL, and there is nothing to keep running between reviews.',
        },
      ],
      answer: 'Amazon Athena',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-3',
      prompt:
        'A hardware store chain in Lima has sales data in a relational database and supplier files in S3. Before analyzing them it needs to clean, join and transform them, without managing servers.',
      options: [
        {
          service: 'Amazon Kinesis',
          why: 'Kinesis captures streaming data in real time; it is not the tool to clean and transform data that is already stored.',
        },
        {
          service: 'AWS Glue',
          why: 'Correct: Glue is serverless data integration; you create ETL jobs, even with a visual editor, to clean, join and load the data.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena queries data with SQL, but the service built to extract, transform and load data from several sources is a different one.',
        },
      ],
      answer: 'AWS Glue',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-4',
      prompt:
        'A fintech in Bogotá has a data lake in S3 that grows every day. It wants to automatically discover the schema of new files and keep a central catalog of tables for its query tools.',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift stores and queries data in its own warehouse; it does not crawl the data lake to discover and catalog schemas.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight builds BI dashboards; it does not do ETL or maintain a metadata catalog.',
        },
        {
          service: 'AWS Glue',
          why: 'Correct: Glue crawlers infer the schema and store it in the Glue Data Catalog, which Athena, EMR and Redshift Spectrum can use.',
        },
      ],
      answer: 'AWS Glue',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-5',
      prompt:
        'A delivery app in Mexico City receives the GPS location of thousands of couriers every second. It needs to process those positions as soon as they arrive to calculate the estimated delivery time. Which service captures that stream?',
      options: [
        {
          service: 'Amazon Kinesis',
          why: 'Correct: Kinesis Data Streams collects continuous data streams and your apps can read them almost instantly, typically in under a second.',
        },
        {
          service: 'AWS Glue',
          why: 'Glue prepares and catalogs data with ETL; it is not the core service to capture thousands of events per second in real time.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Redshift is a data warehouse for SQL analytics; it is not the entry point for streaming data.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena queries files already stored in S3; it does not process the positions as they arrive.',
        },
      ],
      answer: 'Amazon Kinesis',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-6',
      prompt:
        'An online store in Rosario wants to capture every click on its site in real time. One app must compute totals on the fly while another archives the same data in S3 at the same time. Which service do you use as the entry point?',
      options: [
        {
          service: 'Amazon EMR',
          why: 'EMR runs Spark or Hadoop on clusters; it can read a stream, but it is not the service that captures the clicks in real time.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight shows BI dashboards; it does not collect or process clicks as they arrive.',
        },
        {
          service: 'Amazon Kinesis',
          why: 'Correct: several applications can read the same Kinesis stream independently, one to aggregate and another to archive.',
        },
      ],
      answer: 'Amazon Kinesis',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-7',
      prompt:
        'A research institute in Concepción already has Apache Spark and Hadoop jobs to analyze terabytes of genomic data. It wants to move them to AWS on a managed cluster, choosing the frameworks and machine sizes.',
      options: [
        {
          service: 'AWS Glue',
          why: 'Glue also uses Spark, but as serverless ETL; it does not give you a cluster with Hadoop and the other frameworks under your control.',
        },
        {
          service: 'Amazon EMR',
          why: 'Correct: EMR is a managed cluster platform to run Spark, Hadoop and other big data frameworks.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena runs serverless SQL queries on S3; it does not run your existing Hadoop jobs on a cluster.',
        },
      ],
      answer: 'Amazon EMR',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-8',
      prompt:
        'A telecom operator in Guayaquil has a Hadoop and Hive cluster in its data center that processes call records every night. It wants to move it to AWS with as few changes as possible.',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift is a SQL data warehouse; migrating there forces you to rebuild the Hadoop and Hive jobs.',
        },
        {
          service: 'Amazon Kinesis',
          why: 'Kinesis processes streaming data in real time; it does not run Hadoop batch jobs.',
        },
        {
          service: 'Amazon EMR',
          why: 'Correct: EMR runs Hadoop, Hive and Spark on managed clusters, so your current jobs change very little.',
        },
      ],
      answer: 'Amazon EMR',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-9',
      prompt:
        'A supermarket chain in Santiago wants a central store with the sales of all its stores for complex, frequent SQL queries from its BI tools, at petabyte scale. Which service do you choose?',
      options: [
        {
          service: 'Amazon Athena',
          why: 'Athena is ideal for occasional queries on files in S3; for a central store with complex, frequent queries, the exam expects a data warehouse.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'OpenSearch Service is for search and log analytics; it is not a data warehouse for sales reports.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Correct: Redshift is the AWS managed data warehouse, at petabyte scale and with SQL for BI tools.',
        },
        {
          service: 'Amazon EMR',
          why: 'EMR runs big data frameworks such as Spark; it is not the data store your BI tools query.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-10',
      prompt:
        'An insurer in Panama wants to replace its on-premises data warehouse with a managed one in the cloud. It prefers an option where it does not have to configure capacity and does not pay while nobody is querying.',
      options: [
        {
          service: 'AWS Glue',
          why: 'Glue moves and transforms data into the warehouse, but it is not the warehouse where the data is stored and queried.',
        },
        {
          service: 'Amazon Redshift',
          why: 'Correct: Redshift is the AWS data warehouse, and Redshift Serverless scales capacity automatically and does not charge while idle.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Quick Sight visualizes data in dashboards; it does not replace the store where the data lives.',
        },
      ],
      answer: 'Amazon Redshift',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-11',
      prompt:
        'The management of a restaurant chain in Mendoza wants to see sales per location in interactive dashboards from a browser or phone, and share them with each manager. Which service do you use?',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift stores and queries the data, but it does not build the dashboards management looks at.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena runs SQL queries; it returns results, not interactive dashboards to share.',
        },
        {
          service: 'Amazon Quick Sight',
          why: 'Correct: Quick Sight is the AWS BI service to create and share interactive dashboards and visualizations.',
        },
      ],
      answer: 'Amazon Quick Sight',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-12',
      prompt:
        'A nonprofit in Tegucigalpa wants to show interactive charts with its project progress on its own website, so donors can explore them without signing in to AWS. Which service lets you embed those dashboards?',
      options: [
        {
          service: 'Amazon Quick Sight',
          why: 'Correct: Quick Sight builds BI dashboards and lets you embed that analytics in your applications and portals.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'OpenSearch Service includes OpenSearch Dashboards to explore searches and logs, but the BI service for business dashboards is a different one.',
        },
        {
          service: 'AWS Glue',
          why: 'Glue prepares and catalogs data with ETL; it does not create or display charts.',
        },
      ],
      answer: 'Amazon Quick Sight',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-13',
      prompt:
        'An online bookstore in Quito wants its search box to find books by title, author or passages of the synopsis, ranked by relevance in milliseconds. Which managed service do you use as the search engine?',
      options: [
        {
          service: 'Amazon Redshift',
          why: 'Redshift is built for analytical SQL queries on large volumes; it is not a text search engine for your site.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'Correct: OpenSearch Service manages OpenSearch clusters, a search and analytics engine for full-text search.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena queries files in S3 with SQL; it is not designed to answer your visitors’ text searches in milliseconds.',
        },
      ],
      answer: 'Amazon OpenSearch Service',
      topicSlug: 'data-analytics',
    },
    {
      id: 'analytics-14',
      prompt:
        'A startup in Lima wants to centralize its application logs, search for errors in near real time and view monitoring dashboards, without running the search engine itself. Which service do you choose?',
      options: [
        {
          service: 'Amazon Kinesis',
          why: 'Kinesis can carry the logs in real time, but it does not index them for search or offer monitoring dashboards.',
        },
        {
          service: 'Amazon Athena',
          why: 'Athena queries logs stored in S3 with on-demand SQL, but it does not index the data for near real-time search and monitoring.',
        },
        {
          service: 'Amazon OpenSearch Service',
          why: 'Correct: OpenSearch Service is used for log analytics and application monitoring, with OpenSearch Dashboards for visualization.',
        },
      ],
      answer: 'Amazon OpenSearch Service',
      topicSlug: 'data-analytics',
    },
  ],
};
