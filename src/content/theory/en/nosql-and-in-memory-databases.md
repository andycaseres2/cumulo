---
title: "NoSQL and in-memory databases: DynamoDB, ElastiCache, DocumentDB, and Neptune"
summary: "Tell relational and NoSQL databases apart, and choose between DynamoDB, ElastiCache, DocumentDB, and Neptune; includes AWS DMS and AWS SCT for migrating databases."
domain: "technology-services"
order: 8
examTasks: ["3.4"]
services: ["Amazon DynamoDB", "Amazon ElastiCache", "Amazon DocumentDB", "Amazon Neptune", "AWS Database Migration Service", "AWS Schema Conversion Tool"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"
  - "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html"
  - "https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html"
  - "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html"
  - "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"
quiz:
  - prompt: "A mobile game app in Bogotá stores the progress of millions of players as key-value data and needs single-digit millisecond responses even when traffic multiplies, without managing servers. Which database should it choose?"
    options:
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune is a graph database for highly connected data; it is not the choice for storing key-value progress at large scale."
      - label: "Amazon RDS"
        explanation: "Amazon RDS is relational, with fixed-schema tables; for key-value data with millions of requests, the typical answer is DynamoDB."
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB is a serverless NoSQL key-value and document database, with single-digit millisecond performance at any scale."
        correct: true
      - label: "AWS Database Migration Service (AWS DMS)"
        explanation: "AWS DMS migrates databases to AWS or between environments; it is not a database for storing player progress."
  - prompt: "An online store in Mexico City repeats many slow queries against its primary database. It wants an in-memory caching layer in front of it, with engines such as Valkey or Redis OSS. Which service should it use?"
    options:
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache is an in-memory data store or distributed cache compatible with Valkey, Memcached, and Redis OSS, ideal as a caching layer."
        correct: true
      - label: "Amazon DocumentDB"
        explanation: "Amazon DocumentDB is a MongoDB-compatible document database; it is not an in-memory cache with Valkey or Redis OSS."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune is a graph database for complex relationships; it does not work as an in-memory caching layer."
      - label: "AWS Schema Conversion Tool (AWS SCT)"
        explanation: "AWS SCT converts a database schema to another engine; it does not store data in memory or act as a cache."
  - prompt: "A fintech in Santiago has an application that uses MongoDB and wants to move it to a fully managed document database, using the same code, drivers, and tools. Which service should it choose?"
    options:
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache is an in-memory data store and cache; it is not a MongoDB-compatible document database."
      - label: "Amazon DynamoDB"
        explanation: "DynamoDB supports documents, but it is not MongoDB-compatible; the clue \"MongoDB-compatible\" points to DocumentDB."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune is a graph database with Gremlin, openCypher, and SPARQL; it is not compatible with MongoDB code."
      - label: "Amazon DocumentDB (with MongoDB compatibility)"
        explanation: "Amazon DocumentDB is a fully managed, MongoDB-compatible document database, so it lets you use the same code and tools."
        correct: true
practice:
  - prompt: "A fintech in Lima wants to detect fraud by analyzing the relationships between accounts, devices, and transfers, with billions of relationships queried in milliseconds. Which database should it choose?"
    options:
      - label: "Amazon DynamoDB"
        explanation: "Amazon DynamoDB is a NoSQL key-value and document database; for highly connected data and fraud detection, the clue points to a graph database."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune is a graph database optimized for billions of relationships with millisecond latency; fraud detection is a typical use case."
        correct: true
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache is an in-memory data store used as a cache; it is not a graph database for analyzing relationships."
      - label: "Amazon RDS"
        explanation: "Amazon RDS is relational, with fixed-schema tables; highly connected relationships, as in fraud detection, point to Neptune."
  - prompt: "An insurance company in Caracas will migrate its database from Oracle to PostgreSQL and first needs a downloadable tool that converts the source schema to the new engine's format. Which one should it use?"
    options:
      - label: "Amazon DocumentDB"
        explanation: "Amazon DocumentDB is a MongoDB-compatible document database; it does not convert schemas from Oracle to PostgreSQL."
      - label: "DynamoDB Accelerator (DAX)"
        explanation: "DAX is a managed in-memory cache specific to DynamoDB; it does not convert schemas between engines."
      - label: "Amazon Neptune"
        explanation: "Amazon Neptune is a graph database; it is not a tool for converting a relational database schema."
      - label: "AWS Schema Conversion Tool (AWS SCT)"
        explanation: "AWS SCT is a downloadable tool that converts the source database schema to the format of a different engine, for example from Oracle to PostgreSQL."
        correct: true
  - prompt: "A hotel chain in Cancún wants to migrate its on-premises MySQL database to MySQL on AWS and keep source and target in sync, replicating ongoing changes until cutover day. Which service should it use?"
    options:
      - label: "AWS Database Migration Service (AWS DMS)"
        explanation: "AWS DMS migrates databases to AWS, between the same or different engines, and can replicate ongoing changes to keep source and target in sync."
        correct: true
      - label: "AWS Schema Conversion Tool (AWS SCT)"
        explanation: "AWS SCT converts the schema when you change engines; it does not move the data or replicate ongoing changes."
      - label: "Amazon ElastiCache"
        explanation: "Amazon ElastiCache is an in-memory data store for caching; it does not migrate databases or replicate changes from on premises."
      - label: "DynamoDB global tables"
        explanation: "Global tables replicate DynamoDB tables across Regions; they do not migrate an on-premises MySQL database to AWS."
  - prompt: "An online game in Santiago uses Amazon DynamoDB and now needs multi-Region, multi-active replication to serve players in the Americas and Europe. Which feature should it use?"
    options:
      - label: "DynamoDB Accelerator (DAX)"
        explanation: "DAX is a managed in-memory cache for DynamoDB; it does not replicate tables across Regions."
      - label: "On-demand mode"
        explanation: "On-demand mode charges per read and write and scales the table automatically; it does not replicate data to other Regions."
      - label: "DynamoDB global tables"
        explanation: "Global tables provide multi-Region, multi-active replication for global applications, exactly what the game needs."
        correct: true
      - label: "Amazon RDS read replicas"
        explanation: "Read replicas are a feature of relational Amazon RDS; they do not replicate DynamoDB tables."
  - prompt: "A developer in Guatemala City is designing tables in Amazon DynamoDB and plans to combine data from two tables with a JOIN, as he did in SQL. What should you recommend?"
    options:
      - label: "Use JOIN as usual, because DynamoDB is a relational database"
        explanation: "DynamoDB is a NoSQL key-value and document database, not relational, and it does not support JOIN."
      - label: "Design the data to answer each query without joins, because DynamoDB does not support JOIN"
        explanation: "DynamoDB does not support JOIN, so the recommendation is to design the data to answer each query without joins."
        correct: true
      - label: "Turn on DynamoDB Accelerator (DAX) to enable JOIN"
        explanation: "DAX is a managed in-memory cache specific to DynamoDB; it does not add JOIN support."
      - label: "Use Amazon Neptune to run the JOINs in SQL"
        explanation: "Amazon Neptune is a graph database that uses Gremlin, openCypher, and SPARQL; it does not run SQL JOINs on DynamoDB tables."
  - prompt: "An events startup in Medellín has very irregular traffic on Amazon DynamoDB and wants to pay only for the reads and writes it performs, with a table that scales automatically, even to zero. What should it configure?"
    options:
      - label: "DynamoDB global tables"
        explanation: "Global tables replicate data across Regions; they do not set up paying per read and write or scaling to zero."
      - label: "DynamoDB Accelerator (DAX)"
        explanation: "DAX adds an in-memory cache in front of DynamoDB; it does not change the table's billing model."
      - label: "A node-based Amazon ElastiCache cluster"
        explanation: "A node-based ElastiCache cluster is an in-memory cache with more control; it does not make the DynamoDB table charge per read and write."
      - label: "DynamoDB on-demand mode"
        explanation: "In on-demand mode you pay for the reads and writes you perform, and the table scales automatically, even to zero."
        correct: true
---

## Why does it matter?

A mobile game app in Bogotá has millions of players. It needs to save each player's progress with millisecond responses even when traffic multiplies during a tournament, show the leaderboard instantly, store profiles with fields that change with every game update, and recommend friends based on who plays with whom.

A single relational database is not the best tool for all of that. AWS offers **purpose-built databases**, and the exam will ask you to recognize which one fits each need.

## Relational vs NoSQL

| | Relational (RDS, Aurora) | NoSQL (DynamoDB, DocumentDB, Neptune) |
| --- | --- | --- |
| Data model | Tables with a fixed schema | Key-value, documents, graphs, and other flexible models |
| Language | SQL, with joins (JOIN) between tables | APIs or languages specific to each model |
| Typical scaling | Larger instances and read replicas | Designed to scale horizontally |
| Typical use cases | Billing, ERP, transactional systems with a stable structure | High traffic, low latency, semi-structured or highly connected data |

**NoSQL** (*not only SQL*) covers databases that do not use the relational table model. For example, DynamoDB **does not support JOIN**: the recommendation is to design the data to answer each query without joins.

## Amazon DynamoDB

**Amazon DynamoDB** is a **serverless, fully managed, distributed NoSQL** database with **single-digit millisecond performance at any scale**.

- **Data models:** key-value and documents.
- **Serverless:** you don't provision servers or apply patches; there are no versions or maintenance windows.
- **On-demand mode**: you pay for the reads and writes you perform, and the table scales automatically, even to zero.
- **Resilience:** it automatically replicates data across **three Availability Zones**.
- **Global tables:** multi-Region, multi-active replication for global applications.
- **DynamoDB Accelerator (DAX):** a managed in-memory cache, specific to DynamoDB.

Typical use cases: shopping carts, game state, user profiles, and serverless applications.

## Amazon ElastiCache: in-memory database

An **in-memory database** keeps data in RAM instead of on disk, which allows much faster responses. It is widely used as a **cache**: a temporary copy of frequently queried data so you don't repeat slow queries against the primary database.

**Amazon ElastiCache** makes it easy to set up, manage, and scale an **in-memory data store or distributed cache** in the cloud.

- It works with the **Valkey, Memcached, and Redis OSS** engines.
- It offers a **serverless** option, which scales on its own without capacity planning, or node-based clusters for more control.
- AWS handles hardware provisioning, monitoring, node replacement, and patching.

Typical use cases: query caching, user sessions, and leaderboards.

## Amazon DocumentDB and Amazon Neptune

- **Amazon DocumentDB (with MongoDB compatibility):** a fully managed **document** database that is **MongoDB-compatible**. You can use the same application code, drivers, and tools you use with MongoDB. A **document** is a record with a flexible structure, usually in JSON format.
- **Amazon Neptune:** a fully managed **graph** database for **highly connected** data. A **graph** represents entities (nodes) and their relationships. Neptune is optimized to store billions of relationships and query them with millisecond latency, and it supports the Gremlin, openCypher, and SPARQL languages. Typical use cases: recommendation engines, fraud detection, knowledge graphs, and network security.

| Need | Service |
| --- | --- |
| Key-value at large scale, serverless, milliseconds | **Amazon DynamoDB** |
| Caching or in-memory data with minimal latency | **Amazon ElastiCache** |
| JSON documents, MongoDB compatibility | **Amazon DocumentDB** |
| Complex relationships: social networks, fraud, recommendations | **Amazon Neptune** |

## Database migration: AWS DMS and AWS SCT

- **AWS Database Migration Service (AWS DMS):** migrates relational databases, data warehouses, NoSQL databases, and other data stores **to AWS** or between cloud and on-premises environments. It supports **one-time** migrations or **replicating ongoing changes** to keep source and target in sync. It supports migrations between the **same engine** or between **different engines**.
- **AWS Schema Conversion Tool (AWS SCT):** a downloadable tool that **converts the schema** of the source database to the format of a different engine (for example, from Oracle to PostgreSQL). AWS DMS also offers **DMS Schema Conversion** as a managed alternative.

Rule of thumb: if you change engines, first **convert the schema** (SCT or DMS Schema Conversion) and then **migrate the data** (DMS). Migration is covered in more detail in the migration topic.

## Common exam traps

- **Choosing RDS for millions of requests per second with key-value data.** The typical answer is **DynamoDB**.
- **Thinking ElastiCache replaces the primary database.** It is normally a **caching layer** in front of it.
- **Confusing DocumentDB with DynamoDB.** The clue "MongoDB-compatible" points to **DocumentDB**.
- **Not recognizing graphs.** "Relationships", "social networks", or "fraud detection" point to **Neptune**.
- **Believing DMS converts schemas between different engines on its own.** To convert the schema you use **AWS SCT** or **DMS Schema Conversion**; DMS moves the data.

## Exam summary

- NoSQL = flexible models (key-value, documents, graphs), designed to scale.
- DynamoDB = serverless NoSQL, single-digit milliseconds at any scale.
- DynamoDB replicates across three AZs; global tables for multiple Regions.
- ElastiCache = in-memory and caching; Valkey, Memcached, and Redis OSS engines.
- DocumentDB = documents, MongoDB-compatible.
- Neptune = graphs for highly connected data.
- AWS DMS = migrate data, with optional continuous replication.
- AWS SCT = convert schemas between different engines.
