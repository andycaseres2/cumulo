---
title: "Data analytics"
summary: "What each AWS analytics service is for: Athena, Kinesis, Glue, Quick Sight, Redshift, EMR, and OpenSearch Service, with a table to choose based on the need."
domain: "technology-services"
order: 16
examTasks: ["3.7"]
services: ["Amazon Athena", "Amazon Kinesis", "AWS Glue", "Amazon Quick Sight", "Amazon Redshift", "Amazon EMR", "Amazon OpenSearch Service", "Amazon Data Firehose"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/analytics.html"
  - "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html"
quiz:
  - prompt: "An airline in Medellín has historical sales files in Amazon S3 and wants to query them with standard SQL without managing servers, paying only for the queries it runs. Which service should it use?"
    options:
      - label: "Amazon Kinesis"
        explanation: "Amazon Kinesis collects and processes streaming data in real time; it is not for querying historical files already stored in S3 with SQL."
      - label: "Amazon Athena"
        explanation: "Amazon Athena is a serverless interactive query service that uses standard SQL on data in S3, and you pay only for the queries you run."
        correct: true
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight creates BI dashboards and visualizations; it is not the service that runs SQL queries directly on the files in S3."
      - label: "AWS Glue"
        explanation: "AWS Glue prepares data with ETL and stores its metadata in the Glue Data Catalog; it is not the interactive SQL query service."
  - prompt: "The sales department of an airline in Bogotá wants to capture clicks on its website as they arrive so it can detect in real time when demand for a route spikes. Which AWS service fits?"
    options:
      - label: "Amazon Athena"
        explanation: "Amazon Athena queries data that is already in S3 with SQL; it does not capture click streams as they arrive."
      - label: "AWS Glue"
        explanation: "AWS Glue is managed ETL for preparing and cataloging data; it is not designed to capture streaming data in real time."
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight displays BI dashboards; it does not collect or process clicks as they arrive."
      - label: "Amazon Kinesis"
        explanation: "Amazon Kinesis is used to collect, process, and analyze streaming data in real time, such as clicks on a website."
        correct: true
  - prompt: "A supermarket chain in Lima needs a fully managed ETL service that discovers its data in S3 and stores the table and schema definitions so Athena knows how to read it. Which one should it choose?"
    options:
      - label: "AWS Glue"
        explanation: "AWS Glue is fully managed ETL and stores table and schema metadata in the AWS Glue Data Catalog, which Athena uses to read the data."
        correct: true
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight creates interactive BI dashboards; it does not do ETL or maintain a metadata catalog."
      - label: "Amazon OpenSearch Service"
        explanation: "Amazon OpenSearch Service is used for full-text search and log analytics; it is not the metadata catalog Athena uses."
      - label: "Amazon Kinesis Video Streams"
        explanation: "Kinesis Video Streams captures video from connected devices; it does not discover data in S3 or store table schemas."
practice:
  - prompt: "The management team of a movie theater chain in Asunción wants interactive dashboards with the day's sales that it can view from a browser or a phone. Which service should it use?"
    options:
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight is the BI service for creating interactive dashboards and visualizations that can be viewed from a browser or a phone."
        correct: true
      - label: "AWS Glue"
        explanation: "AWS Glue prepares and catalogs data with ETL; it does not create the dashboards management is asking for."
      - label: "Amazon EMR"
        explanation: "Amazon EMR processes large amounts of data with frameworks such as Spark or Hive; it is not a BI dashboard service."
      - label: "Amazon Kinesis Data Streams"
        explanation: "Kinesis Data Streams captures data streams in real time; it does not offer BI dashboards for management."
  - prompt: "A bank in Santo Domingo needs a data warehouse to run complex, recurring analytical queries with SQL on large volumes of structured data, using its existing BI tools. Which service fits?"
    options:
      - label: "Amazon Athena"
        explanation: "Amazon Athena queries files directly in S3 without loading data; it is not the data warehouse for complex, recurring analysis at scale."
      - label: "Amazon Kinesis"
        explanation: "Amazon Kinesis collects and processes streaming data in real time; it is not a data warehouse for analytical SQL queries."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is the AWS data warehouse for analyzing large volumes of data with standard SQL and existing BI tools."
        correct: true
      - label: "Amazon OpenSearch Service"
        explanation: "Amazon OpenSearch Service is used mainly for full-text search and log analytics; it is not the data warehouse the bank needs."
  - prompt: "A data science team in Rosario wants to run Apache Spark and Apache Hive on clusters to process large amounts of data, letting AWS automate capacity provisioning and cluster tuning. Which service should it choose?"
    options:
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is a data warehouse queried with SQL; it is not the platform for running Spark and Hive on clusters."
      - label: "Amazon EMR"
        explanation: "Amazon EMR is the big data platform for running Spark, Hive, and other open source frameworks, and it automates cluster provisioning and tuning."
        correct: true
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight creates BI dashboards; it does not run big data frameworks such as Spark or Hive."
      - label: "Amazon Data Firehose"
        explanation: "Amazon Data Firehose loads streaming data into destinations such as S3 or Redshift; it does not run Spark or Hive on clusters."
  - prompt: "The IT team at an airline in Cartagena wants to search for errors in its application logs with full-text search and visualize them in near real time. Which service fits?"
    options:
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is a data warehouse for analytical SQL queries; it is not the full-text search service for logs."
      - label: "AWS Glue"
        explanation: "AWS Glue prepares and catalogs data with ETL; it does not run full-text searches on logs or visualize them."
      - label: "Amazon Quick Sight"
        explanation: "Amazon Quick Sight creates BI dashboards for the business; it is not the service for searching logs for errors with full text."
      - label: "Amazon OpenSearch Service"
        explanation: "Amazon OpenSearch Service is used to search, analyze, and visualize data in real time, with typical use cases such as log analytics and full-text search."
        correct: true
  - prompt: "An IoT company in Montevideo already captures streaming telemetry and needs to continuously load that data into destinations such as Amazon S3 and Amazon Redshift. Which service is designed for that loading?"
    options:
      - label: "Amazon Kinesis Video Streams"
        explanation: "Kinesis Video Streams captures video from connected devices; it is not the service for loading telemetry into S3 or Redshift."
      - label: "Amazon Managed Service for Apache Flink"
        explanation: "Amazon Managed Service for Apache Flink is used to analyze streams; loading data into destinations such as S3 or Redshift is the job of Data Firehose."
      - label: "Amazon Data Firehose"
        explanation: "Amazon Data Firehose loads streaming data into destinations such as Amazon S3, Amazon Redshift, or OpenSearch Service."
        correct: true
      - label: "Amazon Kinesis Data Streams"
        explanation: "Kinesis Data Streams captures data streams in real time, and the company already captures them; loading into S3 or Redshift is the job of Data Firehose."
  - prompt: "A consulting firm in Lima explains basic analytics concepts to a client. Which of these definitions describes a data lake?"
    options:
      - label: "A central repository, usually in Amazon S3, where data is stored in its original format"
        explanation: "A data lake is a central repository, usually in S3, that stores data in its original format to be analyzed later."
        correct: true
      - label: "A database optimized for complex analytical queries on structured data"
        explanation: "That is the definition of a data warehouse, such as Amazon Redshift, not a data lake."
      - label: "A process to extract, transform, and load data into a destination"
        explanation: "That process is ETL, which AWS offers through AWS Glue; it is not a data repository."
      - label: "A set of dashboards and reports for making business decisions"
        explanation: "That describes business intelligence (BI), which AWS offers through Amazon Quick Sight, not a data lake."
---

## Why does it matter?

A low-cost airline in Medellín generates data all the time: clicks on its website, ticket sales, *logs* from its applications, and historical files stored in Amazon S3. Management wants dashboards with the day's sales, the IT team wants to search the logs for errors, and the sales department wants to detect in real time when demand for a route spikes.

Each need has a different analytics service. The exam does not ask you to configure them, but to recognize **what each one is for**.

## Basic concepts

- **ETL** (*extract, transform, load*): extracting data from a source, transforming it (cleaning, joining, changing format), and loading it into a destination for analysis.
- **Data lake**: a central repository, usually in Amazon S3, where data is stored in its original format.
- **Data warehouse**: a database optimized for complex analytical queries on large volumes of structured data.
- **Streaming**: data that arrives continuously and is processed as it arrives, not in batches.
- **BI** (*business intelligence*): dashboards and reports for making business decisions.

## The analytics services

**Amazon Athena**: an **interactive query** service for analyzing data in **Amazon S3 using standard SQL**. It is **serverless**: there is no infrastructure to manage and you pay only for the queries you run. You point to your data in S3, define the schema, and start querying.

**Amazon Kinesis**: used to **collect, process, and analyze streaming data in real time**, such as website clicks, application logs, IoT telemetry, video, or audio. It includes **Kinesis Data Streams** (captures data streams in real time), **Kinesis Video Streams** (video from connected devices), **Amazon Data Firehose** (loads streaming data into destinations such as S3, Redshift, or OpenSearch Service), and **Amazon Managed Service for Apache Flink** (stream analytics).

**AWS Glue**: a **fully managed ETL** service for preparing and loading data for analytics. It discovers your data and stores its metadata (table definitions and schema) in the **AWS Glue Data Catalog**, which other services such as Athena use to know how to read the data.

**Amazon Quick Sight**: a **business intelligence (BI)** service for creating **interactive dashboards** and visualizations that can be viewed from a browser or a phone and embedded in applications. Current fact: Amazon QuickSight evolved into **Amazon Quick**, an AI-powered service for automating tasks and analyzing data; **Amazon Quick Sight** continues as the BI capability within Quick.

**Amazon Redshift**: a cloud **data warehouse** for analyzing large volumes of structured and semi-structured data with **standard SQL** and your existing BI tools. It uses columnar storage and massively parallel execution. There is also **Amazon Redshift Serverless**, which provisions and scales capacity automatically.

**Amazon EMR**: a **big data** platform for processing large amounts of data with open source tools such as **Apache Spark, Apache Hive, Apache HBase, Apache Flink, Apache Hudi, and Presto**. It automates tasks such as provisioning capacity and tuning clusters.

**Amazon OpenSearch Service**: makes it easy to deploy, operate, and scale **OpenSearch** to **search, analyze, and visualize data in real time**. Typical use cases: **log analytics**, **full-text search**, application monitoring, and clickstream analytics. It includes OpenSearch Dashboards for visualization.

## Which service do I use?

| I need to… | Service |
| --- | --- |
| Query files that are already in **S3** with **SQL**, without servers | **Amazon Athena** |
| Capture and process **streaming data in real time** | **Amazon Kinesis** |
| Do **ETL** or have a **metadata catalog** of my data | **AWS Glue** |
| Create **BI dashboards and reports** for management | **Amazon Quick Sight** |
| A **data warehouse** for complex analytical queries at scale | **Amazon Redshift** |
| Run **Spark, Hadoop, Hive**, or other big data frameworks | **Amazon EMR** |
| **Search** text or **analyze logs** in near real time | **Amazon OpenSearch Service** |

A typical pipeline combines several of them: Kinesis captures the clicks, Firehose stores them in S3, Glue catalogs and transforms the data, Athena or Redshift queries it, and Quick Sight displays the dashboards.

## Common exam traps

- **Confusing Athena with Redshift.** Athena queries files directly in S3 without loading data or managing anything; Redshift is a data warehouse for complex, recurring analysis at scale.
- **Choosing Glue for dashboards.** Glue prepares and catalogs data; dashboards belong to **Quick Sight**.
- **Choosing Kinesis for historical batch analysis.** Kinesis is for **real-time** data.
- **Confusing EMR with Glue.** Both process data, but EMR is the option for running big data frameworks such as Spark or Hadoop on clusters; Glue is managed ETL.
- **Thinking OpenSearch Service is just a database.** Its strength is search and log analytics.

## Exam summary

- Athena = serverless SQL on data in S3; you pay per query.
- Kinesis = real-time streaming data (Data Streams, Video Streams, Data Firehose).
- Glue = managed ETL + Glue Data Catalog.
- Quick Sight = BI dashboards; it is now part of Amazon Quick.
- Redshift = data warehouse with SQL.
- EMR = big data with Spark, Hive, HBase, and other open source frameworks.
- OpenSearch Service = real-time search and log analytics.
