---
title: "Migration strategies and services"
summary: "Master the 7 Rs of migration, the AWS support resources and the services that discover workloads, migrate servers, replicate databases and convert schemas."
domain: "cloud-concepts"
order: 6
examTasks: ["1.3", "3.4"]
services: ["AWS Migration Hub", "AWS Application Discovery Service", "AWS Application Migration Service", "Migration Evaluator", "AWS DMS", "AWS SCT", "AWS Transform"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html"
  - "https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html"
  - "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html"
  - "https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html"
  - "https://aws.amazon.com/migration-evaluator/"
  - "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"
  - "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html"
  - "https://aws.amazon.com/migration-acceleration-program/"
  - "https://aws.amazon.com/prescriptive-guidance/"
  - "https://aws.amazon.com/professional-services/"
quiz:
  - prompt: "A hotel group in Cancún is preparing its migration to AWS and finds an internal application with no inbound connections in the last 90 days that no longer adds value. Which of the 7 Rs should it apply?"
    options:
      - label: "Retain"
        explanation: "Retain keeps the application in the source environment for now, for example because of data residency or pending dependencies; it does not apply to an application that no longer adds value."
      - label: "Rehost"
        explanation: "Rehost moves the application to AWS without changes; migrating something nobody uses would waste effort on a workload with no value."
      - label: "Repurchase"
        explanation: "Repurchase replaces the application with another product, usually SaaS; it makes no sense to buy a replacement for something nobody uses."
      - label: "Retire"
        explanation: "Retire means decommissioning or archiving applications that no longer add value, such as one with no inbound connections in the last 90 days."
        correct: true
  - prompt: "A fintech in Buenos Aires will migrate its database from Oracle to Aurora PostgreSQL. Before moving the data, it needs a tool that is downloaded to its computer and converts tables, views and database code to the new engine. Which one should it use?"
    options:
      - label: "AWS SCT (AWS Schema Conversion Tool)"
        explanation: "AWS SCT is downloaded to your computer and converts a database schema from one engine to another, such as from Oracle to Aurora PostgreSQL."
        correct: true
      - label: "AWS Migration Hub"
        explanation: "AWS Migration Hub tracks the status of each migration from a single place; it does not convert database schemas."
      - label: "AWS Application Migration Service"
        explanation: "AWS Application Migration Service automates server rehosting with block-level replication; it does not convert the schema from one database engine to another."
      - label: "AWS Application Discovery Service"
        explanation: "AWS Application Discovery Service discovers on-premises servers and databases and their dependencies; it does not convert schemas."
  - prompt: "A logistics company in Monterrey wants to quickly move dozens of physical and virtual servers to AWS without changes, with continuous block-level replication and cutover windows of minutes. Which AWS service should it use?"
    options:
      - label: "Migration Evaluator"
        explanation: "Migration Evaluator builds a data-driven business case and compares costs; it does not replicate or move servers."
      - label: "AWS Migration Hub"
        explanation: "AWS Migration Hub tracks the status of migrations, but it does not perform the rehosting of the servers."
      - label: "AWS Application Migration Service"
        explanation: "AWS Application Migration Service automates rehosting: it replicates physical, virtual or other-cloud servers with continuous block-level replication and cutovers of minutes."
        correct: true
      - label: "AWS SCT (AWS Schema Conversion Tool)"
        explanation: "AWS SCT converts database schemas between engines; it does not migrate entire servers to AWS."
practice:
  - prompt: "A distributor in Barranquilla uses a traditionally licensed CRM installed in its data center and, during the migration, decides to replace it with a SaaS CRM. Which of the 7 Rs is it applying?"
    options:
      - label: "Replatform"
        explanation: "Replatform keeps the same application and makes a few optimizations; here the company switches products."
      - label: "Repurchase"
        explanation: "Repurchase (drop and shop) replaces the application with another product, usually SaaS, such as moving to a SaaS CRM."
        correct: true
      - label: "Rehost"
        explanation: "Rehost moves the same application to AWS without changes; it does not replace it with a different product."
      - label: "Refactor"
        explanation: "Refactor redesigns the application itself to use cloud-native features; it does not buy a replacement SaaS product."
  - prompt: "A hospital in Rosario migrates its Microsoft SQL Server database to Amazon RDS for SQL Server to stop managing the engine, without changing the application's core architecture. Which of the 7 Rs applies?"
    options:
      - label: "Rehost"
        explanation: "Rehost moves the application without changes, for example to EC2 instances; moving to a managed service such as RDS adds optimizations."
      - label: "Refactor"
        explanation: "Refactor redesigns the application to take advantage of cloud-native features; here the core architecture does not change."
      - label: "Repurchase"
        explanation: "Repurchase switches to another product, usually SaaS; the hospital keeps using SQL Server."
      - label: "Replatform"
        explanation: "Replatform (lift, tinker and shift) moves the application with some optimizations, such as moving SQL Server to Amazon RDS for SQL Server."
        correct: true
  - prompt: "An e-commerce platform in Mexico City wants to break its monolithic application into microservices to scale faster and take advantage of cloud-native features, even though it is the most complex option. Which of the 7 Rs describes this?"
    options:
      - label: "Refactor / re-architect"
        explanation: "Refactor redesigns the application to use cloud-native features, such as breaking a monolith into microservices; it is the most complex and costly strategy."
        correct: true
      - label: "Relocate"
        explanation: "Relocate transfers servers or resources to another platform, VPC, Region or account without changing the application's architecture."
      - label: "Rehost"
        explanation: "Rehost moves the application to AWS without changes; the monolith would still be a monolith."
      - label: "Retain"
        explanation: "Retain keeps the application in the source environment for now; it does not redesign it into microservices."
  - prompt: "A retail chain in Lima wants to migrate to AWS with a three-phase methodology (Assess, Mobilize, Migrate & Modernize), training, partners and financial investment to offset the initial costs of migration. Which AWS resource offers this?"
    options:
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance offers expert guides and patterns; it does not include financial investment to offset migration costs."
      - label: "Migration Evaluator"
        explanation: "Migration Evaluator builds a data-driven business case and compares costs; it is not a program with phases and financial investment."
      - label: "AWS Migration Acceleration Program (MAP)"
        explanation: "MAP combines a three-phase methodology (Assess, Mobilize, Migrate & Modernize), tools, training, partners and financial investment to offset initial costs."
        correct: true
      - label: "AWS Application Discovery Service"
        explanation: "AWS Application Discovery Service collects server configuration, usage and dependencies; it is not a financial support program."
  - prompt: "An insurance company in Quito is migrating its on-premises MySQL database to Amazon RDS for MySQL. It wants to move the data and keep replicating changes so that source and target stay in sync until cutover. Which service should it use?"
    options:
      - label: "AWS DMS (AWS Database Migration Service)"
        explanation: "AWS DMS performs one-time migrations or replicates ongoing changes until cutover, and supports homogeneous migrations such as MySQL to MySQL."
        correct: true
      - label: "AWS SCT (AWS Schema Conversion Tool)"
        explanation: "AWS SCT converts schemas when you change engines; in a MySQL-to-MySQL migration there is no need to convert the schema, and it does not move the data."
      - label: "Migration Evaluator"
        explanation: "Migration Evaluator builds a business case and compares costs; it does not move or replicate data."
      - label: "AWS Migration Hub"
        explanation: "AWS Migration Hub tracks the status of migrations; it does not replicate database changes."
  - prompt: "The board of a mining company in Arequipa asks for a data-driven business case before approving the migration: inventory the on-premises environment, detect oversized servers and compare costs, including reusing licenses versus license-included options. Which service should it use?"
    options:
      - label: "AWS Migration Hub"
        explanation: "AWS Migration Hub tracks the status of each migration; it does not build the business case with a cost comparison."
      - label: "Migration Evaluator"
        explanation: "Migration Evaluator builds a data-driven business case: it inventories the environment, detects oversized servers and compares costs, including BYOL versus license included."
        correct: true
      - label: "AWS Application Migration Service"
        explanation: "AWS Application Migration Service performs rehosting by replicating servers; it does not build the business case before approval."
      - label: "AWS DMS (AWS Database Migration Service)"
        explanation: "AWS DMS migrates and replicates data between databases; it does not compare costs or detect oversized servers."
---

## Why does it matter?

A hotel group in Cancún has 200 servers in its data center: an old reservation system, an Oracle database, internal email and several applications nobody has used in months. Leadership wants to migrate to AWS, but not everything should move the same way: some applications are copied as they are, others are improved along the way and others are shut down.

The exam will give you scenarios like this and ask you to choose the right **migration strategy** and **AWS service**.

## The 7 Rs: migration strategies

A **migration strategy** is the approach for moving a workload to the cloud. AWS documents seven, known as the **7 Rs**:

| Strategy | What it means | Typical example |
| --- | --- | --- |
| **Retire** | Decommission or archive applications that no longer add value. | An application with no inbound connections in the last 90 days. |
| **Retain** | Keep the application in the source environment for now. | Data residency requirements, pending dependencies or a recent upgrade. |
| **Rehost** (*lift and shift*) | Move the application to AWS **without changes**. | Migrating many servers quickly to EC2 instances. |
| **Relocate** | Transfer many servers from an on-premises platform to the cloud version of that platform, or move resources to another VPC, Region or account. | Moving an Amazon RDS instance to another AWS account. |
| **Repurchase** (*drop and shop*) | Replace the application with another product or version, usually SaaS. | Moving from a traditionally licensed CRM to a SaaS CRM. |
| **Replatform** (*lift, tinker and shift*) | Move the application with **a few optimizations**, without changing its core architecture. | Moving a Microsoft SQL Server database to Amazon RDS for SQL Server. |
| **Refactor / re-architect** | Redesign the application to take advantage of **cloud-native** features. | Breaking a monolith into microservices to scale faster. |

Key points according to AWS:

- **Refactor** is the **most complex and costly** strategy. For large migrations, AWS recommends rehosting, relocating or replatforming first and **modernizing afterward**.
- **Relocate** is the fastest way to migrate and operate in the cloud because it does not change the application's architecture.
- With **rehost** and **relocate**, the application keeps serving users while it is migrated, which minimizes disruption.

## AWS services for migration

| Service | What it is for |
| --- | --- |
| **Migration Evaluator** | Building a data-driven **business case**: it inventories the on-premises environment, detects oversized servers and compares costs, including reusing licenses versus license included. |
| **AWS Application Discovery Service** | **Discovering** on-premises servers and databases: it collects configuration, usage and network dependencies, with or without an agent (the *Agentless Collector* for VMware vCenter). |
| **AWS Migration Hub** | A single place to discover servers, plan and **track** the status of each migration, regardless of the tool used. |
| **AWS Application Migration Service** | Automated **rehosting**: it replicates physical, virtual or other-cloud servers to AWS with continuous block-level replication and cutover windows of minutes. Its documentation now calls it **AWS Transform MGN**. |
| **AWS DMS** (*AWS Database Migration Service*) | Migrating databases, data warehouses and other data stores, with **one-time** migrations or **ongoing replication** of changes. |
| **AWS SCT** (*AWS Schema Conversion Tool*) | Converting a database **schema** from one engine to another (for example, from Oracle to Aurora PostgreSQL). |

**Recent changes worth knowing:** AWS Migration Hub **no longer accepts new customers** as of November 7, 2025, and AWS Application Discovery Service is not open to new customers either. For similar capabilities, AWS recommends **AWS Transform**. The CLF-C02 exam may still name these services, so you should know what they are for.

## Database migration: AWS DMS and AWS SCT

A **homogeneous migration** uses the same engine at the source and target (Oracle → Oracle). A **heterogeneous migration** changes engines (Oracle → PostgreSQL).

- **AWS DMS** is a server in the cloud that runs **replication** software. You can do a one-time migration or **replicate ongoing changes** to keep source and target in sync until cutover. AWS manages the migration infrastructure and you pay as you go. It supports homogeneous and heterogeneous migrations.
- **AWS SCT** is downloaded to your computer and converts schemas (tables, views, database code and even SQL embedded in application code) when you change engines. If something cannot be converted automatically, it gives guidance for creating it by hand.
- **DMS Schema Conversion** is the option within AWS DMS that assesses and converts schemas without downloading any tools.

Rule of thumb: **changing engines → first convert the schema (SCT or DMS Schema Conversion), then move the data with DMS**. Same engine → DMS alone is enough.

## Support resources for the migration journey

- **AWS Prescriptive Guidance:** guides and patterns from AWS experts for migrating, optimizing and modernizing.
- **AWS Professional Services:** a global team of AWS experts who help design, build and migrate workloads.
- **AWS Partners:** members of the AWS Partner Network, such as the **AWS Migration Competency Partners**.
- **AWS Migration Acceleration Program (MAP):** a program with a three-phase methodology (**Assess, Mobilize, Migrate & Modernize**), tools, training, partners and financial investment to offset the initial costs of migration.

## Common exam traps

- **Choosing refactor for a fast migration.** The fastest options are rehost or relocate; refactor is the most complex.
- **Confusing AWS DMS with AWS SCT.** DMS moves and replicates **data**; SCT converts the **schema**.
- **Using SCT in a homogeneous migration.** If the engine does not change, there is no need to convert the schema.
- **Confusing Migration Hub with Application Migration Service.** Migration Hub **tracks**; Application Migration Service **performs** the rehosting.
- **Confusing repurchase with replatform.** Repurchase switches products (for example, to SaaS); replatform keeps the application with optimizations.

## Exam summary

- 7 Rs: retire, retain, rehost, relocate, repurchase, replatform and refactor.
- Rehost = *lift and shift*; replatform = *lift, tinker and shift*; repurchase = *drop and shop*.
- Refactor = the most complex and costly; it takes advantage of cloud-native features.
- Migration Evaluator = business case; Application Discovery Service = inventory and dependencies.
- Migration Hub = tracking; Application Migration Service (AWS Transform MGN) = rehosting.
- AWS DMS = migrate and continuously replicate data; AWS SCT = convert schemas between engines.
- Support: AWS Prescriptive Guidance, AWS Professional Services, AWS Partners and MAP.
