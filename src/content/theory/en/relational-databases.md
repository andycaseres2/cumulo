---
title: "Relational databases: RDS and Aurora"
summary: "Compare databases on EC2 with managed databases, learn the Amazon RDS engines, Multi-AZ vs read replicas, and the benefits of Amazon Aurora."
domain: "technology-services"
order: 7
examTasks: ["3.4"]
services: ["Amazon RDS", "Amazon Aurora", "Amazon EC2", "Amazon Redshift"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html"
quiz:
  - prompt: "An insurance company in Guadalajara is migrating its MySQL database to AWS and wants AWS to handle patching, backups, failure detection, and recovery, with as little administration as possible. Which option should it choose?"
    options:
      - label: "Install MySQL on an Amazon EC2 instance"
        explanation: "With a database on EC2 you install, patch, back up, and scale the operating system and the engine; it gives full control, but more work."
      - label: "Amazon RDS for MySQL"
        explanation: "Amazon RDS is a managed relational database that handles backups, patching, failure detection, and recovery, and it supports MySQL."
        correct: true
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is a data warehouse for analyzing large volumes of historical data; it is not the choice for the transactional policy system."
      - label: "Amazon DynamoDB"
        explanation: "DynamoDB is a NoSQL database; it does not run the relational MySQL engine the insurance company already uses."
  - prompt: "A bank in Lima uses Amazon RDS and needs high availability: a standby instance in another Availability Zone, with synchronous replication and failover if the primary fails. What should it enable?"
    options:
      - label: "Read replicas"
        explanation: "Read replicas use asynchronous replication and their main purpose is to scale reads, not failover with a synchronous standby."
      - label: "Manual snapshots"
        explanation: "Manual snapshots are for restoring the database; they do not keep a standby instance ready for failover."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is a data warehouse for analyzing historical data; it does not give high availability to an RDS instance."
      - label: "Multi-AZ"
        explanation: "Multi-AZ replicates synchronously to a standby instance in another AZ and provides failover for high availability."
        correct: true
  - prompt: "A startup in Bogotá uses PostgreSQL and is looking for a fully managed, compatible relational engine with higher performance than standard PostgreSQL and data copied across three Availability Zones. Which one should it choose?"
    options:
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora is compatible with MySQL and PostgreSQL, delivers up to 6 times the throughput of those standard engines, and keeps copies in three AZs."
        correct: true
      - label: "PostgreSQL installed on Amazon EC2"
        explanation: "On EC2 you manage the operating system, the engine, backups, and scaling; it is not a fully managed engine."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is the AWS data warehouse for analytical queries; it is not a PostgreSQL-compatible transactional engine as the scenario asks."
      - label: "Amazon DynamoDB"
        explanation: "DynamoDB is NoSQL and does not support JOIN; it is not compatible with PostgreSQL code and tools."
practice:
  - prompt: "An e-commerce company in Lima uses Amazon RDS, and its reports overload the primary instance with read-only queries. It wants to scale reads without putting more load on the primary instance. What should it add?"
    options:
      - label: "A standby instance with Multi-AZ"
        explanation: "In a Multi-AZ instance the standby does not serve reads; its main purpose is high availability and failover."
      - label: "Manual snapshots"
        explanation: "Manual snapshots are for restoring the database; they do not serve read-only queries for reports."
      - label: "Read replicas"
        explanation: "Read replicas copy data asynchronously from the primary instance and serve read-only queries, such as reports."
        correct: true
      - label: "Migrate the database to an Amazon EC2 instance"
        explanation: "Installing the database on EC2 gives full control, but you handle scaling and everything else; it is not the way to scale reads in RDS."
  - prompt: "A restaurant chain in Arequipa migrated its database to Amazon RDS, and now its queries are slow because they are poorly written. In a managed database, who should optimize them?"
    options:
      - label: "The customer, because optimizing the application and queries is still its responsibility"
        explanation: "With RDS, AWS handles tasks such as patching and backups, but designing the schema and optimizing queries is still the customer's responsibility."
        correct: true
      - label: "AWS, because RDS manages the database engine"
        explanation: "AWS managing the engine does not make it responsible for your queries; optimizing them is still the customer's job."
      - label: "AWS, as part of automatic software patching"
        explanation: "Patches update the database software; they do not rewrite or optimize the application's queries."
      - label: "AWS, because in RDS scaling is AWS's responsibility"
        explanation: "In RDS, AWS takes care of scaling, but that does not include optimizing poorly written queries, which is still the customer's job."
  - prompt: "A company in Montevideo wants to move its Microsoft SQL Server database to a managed relational service without changing engines, and a consultant proposes Amazon Aurora. Which option should it choose?"
    options:
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora is compatible with MySQL and PostgreSQL; it does not run the Microsoft SQL Server engine the company uses."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB is a NoSQL database; it does not run the relational Microsoft SQL Server engine."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is a data warehouse for analyzing historical data; it is not a service for running SQL Server without changing engines."
      - label: "Amazon RDS for SQL Server"
        explanation: "Amazon RDS supports Microsoft SQL Server, so the company gets a managed database without changing engines."
        correct: true
  - prompt: "A bank in Panama City needs a database engine configuration and version that Amazon RDS does not offer, and it accepts taking care of the operating system, patching, and backups. Which option fits?"
    options:
      - label: "Amazon RDS"
        explanation: "Amazon RDS manages backups and patching, but the scenario calls for a configuration and version that RDS does not offer."
      - label: "A database installed on Amazon EC2"
        explanation: "A database on EC2 gives full control, for example for configurations or versions a managed service does not offer, in exchange for managing it yourself."
        correct: true
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora is a fully managed engine that is part of RDS; it does not give you full control over configurations beyond what the service offers."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB is a serverless NoSQL database; it does not let you install the relational engine version and configuration the bank needs."
  - prompt: "An airline in Bogotá wants a copy of its Amazon RDS database in another Region that it can promote to a standalone instance if the primary Region suffers a disaster. Which feature should it use?"
    options:
      - label: "A read replica in another Region"
        explanation: "Read replicas can be in another Region and can be promoted to a standalone instance for disaster recovery."
        correct: true
      - label: "Multi-AZ"
        explanation: "Multi-AZ keeps a synchronous standby in another AZ within the same Region; it does not create a copy in another Region."
      - label: "Aurora's copies across three Availability Zones"
        explanation: "Aurora keeps copies in three AZs of the same Region; that does not leave a copy of the RDS database in another Region."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is a data warehouse for analyzing historical data; it is not a promotable copy of the RDS database."
  - prompt: "A retail group in Guayaquil records its daily sales in Amazon RDS and now wants to analyze ten years of historical sales with complex queries on large volumes of data. Which service is designed for that analysis?"
    options:
      - label: "Enable Multi-AZ on RDS"
        explanation: "Multi-AZ provides high availability with a synchronous standby; it does not turn RDS into a data warehouse for historical analysis."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB is a NoSQL key-value database and does not support JOIN; it is not a data warehouse for complex analytical queries."
      - label: "Amazon Redshift"
        explanation: "Amazon Redshift is the AWS data warehouse, optimized for analyzing large volumes of historical data with complex queries."
        correct: true
      - label: "Amazon Aurora"
        explanation: "Amazon Aurora is a relational database optimized for day-to-day transactions; for data warehousing the answer is Redshift."
---

## Why does it matter?

An insurance company in Guadalajara runs its policy system on a MySQL database installed on its own server. Its only database administrator spends nights applying patches, checking backups, and worrying that the disk will fail. The company wants to migrate to AWS and is asking itself: do we install MySQL on an EC2 instance or use a managed service?

That decision, **database on EC2 vs managed database**, is one of the exam's favorite questions.

## What is a relational database?

A **relational database** stores information in **tables** with rows and columns, and relates the tables through keys. It is queried with **SQL** (*Structured Query Language*). It is ideal when the data has a fixed structure and consistent transactions are needed, as in a billing, policy, or inventory system.

## Database on EC2 vs managed database

| Task | On-premises | Database on Amazon EC2 | Amazon RDS (managed) |
| --- | --- | --- | --- |
| Optimizing the application and queries | Customer | Customer | Customer |
| Scaling | Customer | Customer | AWS |
| High availability | Customer | Customer | AWS |
| Database backups | Customer | Customer | AWS |
| Installing and patching the database software | Customer | Customer | AWS |
| Installing and patching the operating system | Customer | Customer | AWS |
| Server maintenance and hardware lifecycle | Customer | AWS | AWS |
| Power, networking, and cooling | Customer | AWS | AWS |

- **Database on EC2:** AWS manages the hardware, but you install, patch, back up, and scale the operating system and the engine. It gives you **full control** (for example, for configurations or versions a managed service does not offer), but also more work and more risk of human error.
- **Managed database (AWS managed):** AWS takes care of most administrative tasks. You are still responsible for designing the schema and **optimizing queries**. AWS recommends Amazon RDS as the default option for most relational deployments.

## Amazon RDS

**Amazon Relational Database Service (Amazon RDS)** makes it easy to **set up, operate, and scale** a relational database in the cloud.

- **Supported engines:** IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database, and PostgreSQL, plus Amazon Aurora.
- **Administration:** RDS handles backups, software patching, automatic failure detection, and recovery.
- **Backups:** you can turn on automated backups or create manual snapshots to restore the database.
- **Security:** you control access with IAM and can protect the database inside a VPC.

### Multi-AZ vs read replicas

| | **Multi-AZ** | **Read replicas** |
| --- | --- | --- |
| Main purpose | **High availability** and failover | **Scaling reads** |
| Replication | **Synchronous** to a standby instance in another AZ | **Asynchronous** from the primary instance |
| Does it serve reads? | In a Multi-AZ instance, the standby does **not** serve reads (in a Multi-AZ cluster, the readers do) | Yes, read-only |
| Another Region? | Within the same Region | Can be in the same Region or another one |
| Additional use | Reduces disruption from failures or maintenance | Reports, and it can be **promoted** to a standalone instance for disaster recovery |

## Amazon Aurora

**Amazon Aurora** is a **fully managed** relational database engine that is **compatible with MySQL and PostgreSQL**: you can use the same code, tools, and applications you already use with those engines. It is part of Amazon RDS.

Key benefits:

- **High performance:** AWS states that it delivers **up to 6 times** the throughput of standard MySQL and PostgreSQL. Older material mentions 5 and 3 times; the current figure is 6.
- **Distributed, resilient storage:** data is stored in a cluster volume with **copies in three Availability Zones** of a Region, which provides high durability and availability during a *failover*.
- **Storage that grows on its own:** the volume grows automatically as data increases, and you pay only for the space you use.
- **Automated clustering and replication**, one of the most complex tasks to manage on your own.

## Relational vs data warehouse

A relational database such as RDS or Aurora is optimized for day-to-day **transactions** (recording a sale, updating a customer). A **data warehouse** is optimized for **analyzing large volumes of historical data** with complex queries. In AWS, the data warehouse is **Amazon Redshift**, which is covered in the analytics topic.

## Common exam traps

- **Choosing EC2 when the scenario asks for "less administration".** The answer is a managed service such as **RDS** or **Aurora**.
- **Confusing Multi-AZ with read replicas.** Multi-AZ = availability (synchronous); read replicas = read performance (asynchronous).
- **Believing that with RDS, AWS optimizes your queries.** Query optimization is still your responsibility.
- **Thinking Aurora is compatible with any engine.** It is compatible with **MySQL and PostgreSQL**.
- **Using RDS for massive analysis of historical data.** For data warehousing, the answer is **Amazon Redshift**.

## Exam summary

- Relational = tables, SQL, and a fixed structure.
- Database on EC2 = full control, but you manage the OS, the engine, backups, and scaling.
- RDS = managed relational; AWS handles patching, backups, failure detection, and recovery.
- RDS engines: Db2, MariaDB, SQL Server, MySQL, Oracle, PostgreSQL, and Aurora.
- Multi-AZ = high availability with a synchronous replica in another AZ.
- Read replicas = scale reads with asynchronous replication; they can be in another Region.
- Aurora = compatible with MySQL and PostgreSQL, high performance, data copied across three AZs.
- Data warehouse = Amazon Redshift.
