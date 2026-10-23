---
title: "Other compute services: Elastic Beanstalk, Lightsail, Batch, and Outposts"
summary: "What AWS Elastic Beanstalk, Amazon Lightsail, AWS Batch, and AWS Outposts are for, who they are aimed at, and how to tell them apart on the exam."
domain: "technology-services"
order: 6
examTasks: ["3.3"]
services: ["AWS Elastic Beanstalk", "Amazon Lightsail", "AWS Batch", "AWS Outposts"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"
  - "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html"
  - "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html"
  - "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html"
quiz:
  - prompt: "A freelance designer in Montevideo wants to publish her studio's WordPress site in the simplest way, with a low, predictable monthly price. Which service should she choose?"
    options:
      - label: "AWS Batch"
        explanation: "AWS Batch runs batch jobs that wait in a queue; it is not designed for publishing a small website."
      - label: "AWS Outposts"
        explanation: "AWS Outposts installs AWS infrastructure at the customer's premises; it is overkill for a small WordPress site."
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail is the easiest way to get started, with ready-made images such as WordPress and a low, predictable monthly price."
        correct: true
      - label: "AWS Elastic Beanstalk"
        explanation: "Elastic Beanstalk deploys web apps without managing infrastructure, but you pay for the resources it creates; the predictable monthly price clue points to a different service."
  - prompt: "A genomics lab in São Paulo needs to run thousands of analyses that can wait in a queue, without installing batch processing software and with automatic provisioning of compute. Which service should it use?"
    options:
      - label: "AWS Batch"
        explanation: "AWS Batch runs batch computing workloads of any scale and automatically provisions resources based on the jobs submitted."
        correct: true
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail offers simple servers and sites at a predictable price; it does not manage batch job queues."
      - label: "AWS Outposts"
        explanation: "AWS Outposts brings AWS infrastructure to your site for low local latency; the scenario does not ask for processing on its premises."
      - label: "AWS Elastic Beanstalk"
        explanation: "Elastic Beanstalk is for deploying web applications; it does not manage queues of thousands of batch jobs."
  - prompt: "A mining company in Antofagasta must process data at its own plant with very low latency, using the same AWS APIs and without operating the hardware itself. Which service should it use?"
    options:
      - label: "AWS Local Zones"
        explanation: "Local Zones are in AWS locations near large cities, not inside the customer's plant."
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail runs in the AWS Cloud for simple projects; it does not install capacity at the customer's premises."
      - label: "AWS Batch"
        explanation: "AWS Batch manages batch jobs in the cloud; it does not bring AWS infrastructure to the mining company's plant."
      - label: "AWS Outposts"
        explanation: "AWS Outposts extends AWS infrastructure and APIs to your premises, and AWS operates and manages it; it is used for low latency and local processing."
        correct: true
practice:
  - prompt: "A development team in Quito has a Node.js web application packaged in Docker containers. It wants to deploy it without managing the underlying infrastructure, taking advantage of the service's support for Node.js and Docker. Which service should it use?"
    options:
      - label: "AWS Batch"
        explanation: "AWS Batch processes batch jobs that wait in a queue; it does not deploy or scale a web application."
      - label: "AWS Elastic Beanstalk"
        explanation: "Elastic Beanstalk supports Node.js and Docker containers: you upload the application and it provisions capacity, load balancing, health monitoring, and scaling."
        correct: true
      - label: "AWS Outposts"
        explanation: "AWS Outposts brings AWS infrastructure to the customer's premises; it does not automate deploying a web application."
      - label: "AWS Local Zones"
        explanation: "Local Zones are AWS locations near large cities; they do not deploy or scale an application from its code."
  - prompt: "A team in Bucaramanga already uses AWS Elastic Beanstalk and wants its application to run on Amazon EKS instead of directly on Amazon EC2. Which Elastic Beanstalk mode should it choose?"
    options:
      - label: "Standard mode"
        explanation: "Standard mode runs applications directly on Amazon EC2, not on Amazon EKS."
      - label: "A 1U Outposts server"
        explanation: "An Outposts server is AWS capacity installed at the customer's site, not an Elastic Beanstalk execution mode."
      - label: "Cluster mode"
        explanation: "Elastic Beanstalk's Cluster mode runs applications on Amazon EKS."
        correct: true
      - label: "A Lightsail instance with a LAMP image"
        explanation: "Lightsail is a separate service for simple servers at a predictable price; it is not an Elastic Beanstalk mode."
  - prompt: "An engineering consulting firm in Monterrey wants to save money by running hundreds of long simulations that can wait in a queue on EC2 Spot Instances. A colleague suggests AWS Lambda. Which service is the better fit?"
    options:
      - label: "AWS Batch"
        explanation: "AWS Batch manages batch job queues at any scale, provisions resources automatically, and can use EC2 Spot Instances."
        correct: true
      - label: "AWS Lambda"
        explanation: "AWS Lambda runs short event-driven functions; it is not the batch job queue service."
      - label: "Amazon Lightsail"
        explanation: "Amazon Lightsail offers simple servers and sites with a predictable monthly price; it does not manage simulation queues."
      - label: "AWS Elastic Beanstalk"
        explanation: "Elastic Beanstalk deploys web applications; it does not process hundreds of jobs waiting in a queue."
  - prompt: "A brewery in Arequipa will install AWS Outposts at its plant, and the IT manager asks who will operate and manage that equipment. What do you tell him?"
    options:
      - label: "The brewery's IT team, as in its own data center"
        explanation: "Outposts is not a data center you manage yourself; that is exactly the mistake of confusing Outposts with traditional on-premises."
      - label: "An AWS Marketplace vendor hired separately"
        explanation: "AWS Marketplace sells third-party software; operating an Outpost is not something you buy there."
      - label: "Nobody, because an Outpost only stores data and does not run resources"
        explanation: "An Outpost has compute and storage capacity and can run EC2 instances, EBS volumes, ECS clusters, and RDS instances."
      - label: "AWS, which operates, monitors, and manages it as part of a Region"
        explanation: "AWS operates, monitors, and manages the Outpost installed at the customer's site as part of a Region."
        correct: true
  - prompt: "A pharmacy chain in Santa Cruz needs to process data locally with AWS APIs at each branch, but its stores have very little space for equipment. Which AWS Outposts form factor suits it?"
    options:
      - label: "42U racks"
        explanation: "42U racks are the large Outposts form factor; they do not fit in branches with little space."
      - label: "1U or 2U servers"
        explanation: "Outposts is offered as 1U or 2U servers precisely for sites with little space."
        correct: true
      - label: "An Amazon Lightsail instance"
        explanation: "Lightsail runs in the AWS Cloud; it does not process data inside each branch."
      - label: "An AWS Batch environment"
        explanation: "AWS Batch manages batch jobs in the cloud; it does not install AWS capacity at the branches."
  - prompt: "An entrepreneur in Valparaíso launched his store on Amazon Lightsail and, as the project grew, now wants to connect it to other AWS services. How can he do it?"
    options:
      - label: "By installing an Outpost in his office"
        explanation: "Outposts brings AWS infrastructure to the customer's premises; it is not the mechanism for connecting Lightsail to other services."
      - label: "By turning the store into an AWS Batch job"
        explanation: "AWS Batch processes queued jobs without user interaction; a web store is not a batch job."
      - label: "Through VPC peering"
        explanation: "When a Lightsail project grows, it can connect to other AWS services through VPC peering."
        correct: true
      - label: "By enabling Elastic Beanstalk's Cluster mode"
        explanation: "Cluster mode runs Elastic Beanstalk applications on Amazon EKS; it does not connect Lightsail resources to other services."
---

## Why does it matter?

Four organizations in Latin America come to AWS with very different needs:

- A development team in Quito wants to upload its Java web application and forget about configuring load balancers and scaling.
- A freelance designer in Montevideo wants to publish her studio's WordPress site with a low, predictable monthly price.
- A genomics lab in São Paulo needs to run thousands of analyses that can wait in a queue.
- A mining company in Antofagasta needs to process data at its own plant with very low latency, using the same AWS APIs.

Amazon EC2 could handle all of these, but AWS offers simpler or more specialized services. The exam will give you the scenario and you will have to choose.

## AWS Elastic Beanstalk

**AWS Elastic Beanstalk** lets you **deploy web applications** in the AWS Cloud without building the infrastructure by hand. You build and upload your application; Elastic Beanstalk **provisions the EC2 instances (or EKS clusters), configures load balancing, sets up health monitoring, and scales the environment** dynamically.

- It supports applications in Go, Java, .NET, Node.js, PHP, Python, and Ruby, as well as Docker containers.
- There are two modes: **Standard**, which runs applications directly on Amazon EC2, and **Cluster**, which runs them on Amazon EKS.
- **There is no additional charge:** you pay only for the AWS resources your application consumes.

It works as a **PaaS** (platform as a service): you focus on the code and AWS takes care of the environment.

## Amazon Lightsail

**Amazon Lightsail** is, according to AWS, the easiest way to get started on AWS for anyone who needs **websites or web applications**. It includes everything needed to launch a project quickly for a **low, predictable monthly price**:

- Virtual private servers (instances) with ready-made images, such as WordPress, LAMP, or Nginx.
- Container services, managed databases (MySQL or PostgreSQL), load balancers, block and object storage, CDN distributions, static IPs, DNS, and snapshots.

It is designed for individual developers, hobbyists, small projects, and anyone who wants to learn. If the project grows, it can connect to other AWS services through VPC peering.

## AWS Batch

**AWS Batch** runs **batch computing workloads** of any scale. A **batch job** is a task that is submitted to a queue and processed when resources are available, without user interaction: simulations, data analysis, or model training.

- It is **fully managed**: it automatically provisions compute resources based on the number and scale of the jobs submitted.
- You don't need to install or manage batch processing software.
- It runs on Amazon ECS and Amazon EKS, and uses EC2 instances (On-Demand or Spot), AWS Fargate, or Amazon ECS Managed Instances.

## AWS Outposts

**AWS Outposts** is a fully managed service that **extends AWS infrastructure, services, APIs, and tools to customer premises** (*on-premises*).

- An **Outpost** is a pool of AWS compute and storage capacity installed at your site. **AWS operates, monitors, and manages it** as part of a Region.
- It is offered as 42U **racks** or as 1U or 2U **servers** for sites with little space.
- You can run resources locally such as EC2 instances, EBS volumes, ECS clusters, and RDS instances (availability depends on the form factor).
- It is useful when you need **low latency** to on-premises systems or to **process data locally**, using the same APIs as in a Region.

It is an example of a **hybrid deployment**.

## Quick comparison

| Service | What it solves | Who it's for | Exam keyword |
| --- | --- | --- | --- |
| **AWS Elastic Beanstalk** | Deploying web apps without managing infrastructure | Developers who want to focus on code | "Upload the code and let AWS handle capacity, load balancing, and scaling" |
| **Amazon Lightsail** | Simple servers, sites, and apps with a predictable monthly price | Beginners, small projects, sites such as WordPress | "Simple", "predictable price", "small website" |
| **AWS Batch** | Running batch jobs at any scale | Scientists, engineers, data teams | "Batch jobs", "job queues", "compute-intensive" |
| **AWS Outposts** | Running AWS services in your own data center | Companies with latency or local processing requirements | "On premises with the same AWS APIs", "hybrid" |

## Common exam traps

- **Choosing Elastic Beanstalk for a small site with a fixed monthly price.** The clue "simple, predictable price" points to **Lightsail**.
- **Thinking Elastic Beanstalk has its own cost.** There is no additional charge; you pay for the resources it creates.
- **Confusing AWS Batch with AWS Lambda.** Batch manages batch job queues; Lambda runs short event-driven functions.
- **Believing Outposts is a data center you manage yourself.** **AWS** installs, operates, and maintains the equipment at your site.
- **Confusing Outposts with Local Zones.** Local Zones are in AWS locations near large cities; Outposts is installed at **your premises**.

## Exam summary

- Elastic Beanstalk = PaaS: you upload the code and AWS handles capacity, load balancing, scaling, and health.
- Elastic Beanstalk has no additional cost; you pay for the underlying resources.
- Lightsail = the easiest way to get started, with a low, predictable monthly price.
- Lightsail includes instances, containers, databases, load balancers, and a CDN.
- AWS Batch = batch jobs at any scale, with automatic provisioning.
- AWS Outposts = AWS infrastructure and APIs at your premises, managed by AWS.
- Outposts is used for low latency and local data processing (hybrid).
