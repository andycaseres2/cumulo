---
title: "Shared responsibility model"
summary: "Learn what AWS protects (security of the cloud), what you protect (security in the cloud), and how the line shifts between Amazon EC2, Amazon RDS, and AWS Lambda."
domain: "security-compliance"
order: 1
examTasks: ["2.1"]
services: ["Amazon EC2", "Amazon RDS", "AWS Lambda", "Amazon S3", "Amazon DynamoDB", "AWS IAM"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html"
  - "https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/security-overview-aws-lambda/the-shared-responsibility-model.html"
quiz:
  - prompt: "A fintech in Santiago, Chile, runs its payments app on Amazon EC2 instances. According to the shared responsibility model, which task belongs to the fintech?"
    options:
      - label: "Physical security of the data centers"
        explanation: "Physical security of the data centers is part of security OF the cloud, which is the responsibility of AWS."
      - label: "The host operating system and the virtualization layer"
        explanation: "AWS protects and patches the host operating system and virtualization; they are not the fintech's job."
      - label: "Patching the guest operating system of the instances"
        explanation: "On Amazon EC2, the customer installs, configures, and patches the guest operating system; it is the model where the customer does the most."
        correct: true
      - label: "The AWS global network infrastructure"
        explanation: "The hardware and the global network infrastructure are the responsibility of AWS as part of security OF the cloud."
  - prompt: "An insurance company in Bogotá migrates its database to Amazon RDS. Which task becomes the responsibility of AWS?"
    options:
      - label: "Patching the operating system and the database engine"
        explanation: "On Amazon RDS, AWS operates the operating system and the database engine and applies their patches during the maintenance window."
        correct: true
      - label: "Choosing the maintenance window"
        explanation: "On RDS, the customer decides the maintenance window; AWS performs maintenance within it."
      - label: "Configuring the security groups that control who connects"
        explanation: "The security groups that control connections to the database remain the customer's responsibility on RDS."
      - label: "Managing the database users"
        explanation: "The customer manages the database users, along with encryption and IAM permissions."
  - prompt: "The compliance team of a mining company in Antofagasta is classifying its IT controls on AWS. Which of these is an example of an inherited control?"
    options:
      - label: "Patching the guest operating system and applications"
        explanation: "Patch management is a shared control: AWS fixes its infrastructure and the customer patches its guest operating system and applications."
      - label: "Security training for employees"
        explanation: "Awareness and training is a shared control: AWS trains its employees and the customer trains its own."
      - label: "Deciding in which security environments certain data is routed or segregated"
        explanation: "This decision depends only on the customer and its application, which is why it is a customer-specific control."
      - label: "The physical and environmental controls of the data centers"
        explanation: "The physical and environmental controls of the data centers are the example of an inherited control: the customer fully inherits them from AWS."
        correct: true
practice:
  - prompt: "A delivery startup in Lima processes orders with AWS Lambda functions. According to the shared responsibility model, what is the startup responsible for?"
    options:
      - label: "Patching the operating system where the functions run"
        explanation: "With Lambda, AWS manages the infrastructure, the operating system, and the platform, including patching."
      - label: "Patching the functions' runtime"
        explanation: "With Lambda, AWS patches the core software or runtime, not the customer."
      - label: "Physical security of the servers"
        explanation: "Physical security and hardware are security OF the cloud, the responsibility of AWS in every service."
      - label: "The dependencies it includes in its function code"
        explanation: "With Lambda, the customer is responsible for its code, the dependencies it includes, the function's IAM permissions, and its data."
        correct: true
  - prompt: "A travel agency in Cartagena discovers that some files containing customer data in Amazon S3 were accessible to anyone. According to the shared responsibility model, who should have configured that access?"
    options:
      - label: "AWS, because it manages the Amazon S3 infrastructure"
        explanation: "AWS manages the infrastructure and platform of S3, but it does not decide who can see your files."
      - label: "The agency, because access permissions to its data are the customer's responsibility"
        explanation: "On S3, the customer takes care of its data: encryption options, classification, and access permissions through IAM."
        correct: true
      - label: "AWS, because S3 is a highly abstracted service"
        explanation: "More abstraction reduces the customer's operational tasks, but the data and the access permissions are still the customer's."
      - label: "AWS, because it is an inherited control"
        explanation: "The example of an inherited control is the physical and environmental controls of the data centers, not the permissions on customer data."
  - prompt: "At a restaurant chain in Monterrey, AWS configures its infrastructure devices and the IT team configures its operating systems, databases, and applications. What type of control does this describe?"
    options:
      - label: "An inherited control"
        explanation: "The customer fully inherits an inherited control from AWS, like the physical controls; here both parties do their part."
      - label: "A customer-specific control"
        explanation: "A customer-specific control depends only on the customer and its application; here AWS also configures its infrastructure."
      - label: "A shared control"
        explanation: "Configuration management is a shared control: AWS configures its infrastructure and the customer configures its operating systems, databases, and applications."
        correct: true
      - label: "Security OF the cloud, handled only by AWS"
        explanation: "Security OF the cloud covers the AWS infrastructure; configuring the customer's systems is part of security IN the cloud."
  - prompt: "A video game company in Santiago uses AWS Regions, Availability Zones, and edge locations. Who is responsible for the security of that infrastructure?"
    options:
      - label: "AWS, as part of security OF the cloud"
        explanation: "AWS protects the infrastructure that runs its services, including Regions, Availability Zones, and edge locations."
        correct: true
      - label: "The company, because it chooses which Regions to deploy in"
        explanation: "Choosing Regions does not shift the security of that infrastructure to the customer; protecting it is security OF the cloud."
      - label: "Both, as a shared control"
        explanation: "Shared controls are patching, configuration, and training; the security of Regions and AZs belongs only to AWS."
      - label: "The company, as a customer-specific control"
        explanation: "Customer-specific controls depend on the customer's application, such as segregating certain data; they do not include the AWS infrastructure."
  - prompt: "A logistics company in Quito is comparing AWS services for its new application. In which of these does it take on the most security tasks, including patching the operating system?"
    options:
      - label: "AWS Lambda"
        explanation: "With Lambda, AWS manages servers, the operating system, and the runtime; the customer takes care of its code, dependencies, permissions, and data."
      - label: "Amazon EC2"
        explanation: "Amazon EC2 is IaaS: the customer installs, configures, and patches the guest operating system, the software, and the network rules; it is where the customer does the most."
        correct: true
      - label: "Amazon RDS"
        explanation: "On Amazon RDS, AWS patches the operating system and the database engine within the maintenance window."
      - label: "Amazon DynamoDB"
        explanation: "With DynamoDB, AWS manages the infrastructure, the operating system, and the platform; the customer focuses on its data."
  - prompt: "A hospital in Guadalajara stores patient data in Amazon DynamoDB. Who is responsible for complying with the laws and regulations that apply to that data?"
    options:
      - label: "AWS, because DynamoDB is a managed service"
        explanation: "A managed service reduces operational tasks, but it does not shift compliance with the regulations on customer data to AWS."
      - label: "AWS, because it manages the operating system and the platform"
        explanation: "AWS manages the operating system and platform of DynamoDB, but that does not make it responsible for the regulations that apply to the hospital's data."
      - label: "AWS, as an inherited control of the data centers"
        explanation: "Inherited controls are the physical and environmental controls of the data centers; they do not cover compliance for customer data."
      - label: "The hospital, because it remains responsible for the regulations that apply to its data"
        explanation: "Even when a service is highly managed, the customer remains responsible for complying with the laws and regulations that apply to its data."
        correct: true
---

## Why does it matter?

A fintech in Santiago, Chile, launches its payments app on AWS. One day it discovers that some files containing customer data were accessible to anyone. The manager asks: "Wasn't AWS supposed to be secure?" AWS did protect its data centers and hardware, but **configuring access to those files was the fintech's responsibility**.

This misunderstanding is so common that AWS formalizes it in the **shared responsibility model**, one of the most frequently tested topics on the exam.

## Security "of" the cloud vs. security "in" the cloud

The core idea comes down to two sentences:

- **AWS is responsible for security OF the cloud**: it protects the infrastructure that runs all of its services, that is, the hardware, software, networking, and facilities, including Regions, Availability Zones, and edge locations.
- **The customer is responsible for security IN the cloud**: it protects what it builds and stores on AWS. How much work this involves **depends on the services it chooses**.

The **guest operating system** (*guest OS*) is the operating system that runs inside your virtual server. **Encryption** is transforming data so that only someone with the key can read it.

| AWS responsibility (of the cloud) | Customer responsibility (in the cloud) |
| --- | --- |
| Physical security of the data centers | Customer data and its classification |
| Hardware and global network infrastructure | Data encryption (choosing and configuring it) |
| Host operating system and virtualization layer | EC2 guest operating system and its patches |
| Regions, Availability Zones, and edge locations | Applications and code it deploys |
| | Security group rules (virtual firewall) |
| | IAM permissions (who can do what) |

## Components of the model: three types of controls

AWS classifies **IT controls** (security measures) into three groups:

- **Inherited controls**: the customer fully inherits them from AWS. Example: the physical and environmental controls of the data centers.
- **Shared controls**: they apply both to the infrastructure and to what the customer does, each in its own context:
  - **Patch management**: AWS fixes its infrastructure; the customer patches its guest operating system and applications.
  - **Configuration management**: AWS configures its infrastructure devices; the customer configures its operating systems, databases, and applications.
  - **Awareness and training**: AWS trains its employees; the customer trains its own.
- **Customer-specific controls**: they depend only on the customer and its application. Example: deciding in which security environments certain data is routed or segregated.

## Responsibility changes by service

The dividing line is not fixed: it moves depending on how much AWS manages.

- **Amazon EC2 (IaaS, infrastructure as a service):** you get virtual servers. You install, configure, and **patch the guest operating system**, the software, and the network rules. It is the model where the customer does the most.
- **Amazon RDS (managed database):** AWS operates the hardware, the **operating system**, and the **database engine**, and performs their maintenance (including security patches) during a **maintenance window**. The customer does not manage the operating system, but it does decide the window, when to apply optional updates, the security groups that control who connects, the database users, encryption, and IAM permissions.
- **AWS Lambda (serverless, with no servers to manage):** AWS manages the infrastructure, the operating system, and the platform where the functions run, including patching. The customer is responsible for **its code**, the **dependencies** it includes, the function's **IAM permissions**, and its data.

| Task | Amazon EC2 | Amazon RDS | AWS Lambda |
| --- | --- | --- | --- |
| Physical security and hardware | AWS | AWS | AWS |
| Patching the operating system | **Customer** | AWS | AWS |
| Patching the core software (engine or runtime) | Customer | AWS (the customer chooses the window) | AWS |
| Application code | Customer | Customer (queries and schema) | **Customer** |
| Network rules (security groups) | Customer | Customer | Customer (if the function connects to a VPC) |
| IAM permissions | Customer | Customer | Customer |
| Data encryption and classification | Customer | Customer | Customer |

In even more abstracted services, such as **Amazon S3** or **Amazon DynamoDB**, AWS manages the infrastructure, the operating system, and the platform; the customer focuses on its data: encryption options, classification, and access permissions through IAM.

Notice the pattern: **the more managed the service, the fewer operational tasks you have, but the data, the encryption, and the access permissions are always yours**. In addition, the customer remains responsible for complying with the laws and regulations that apply to its data.

## Common exam traps

- **"AWS patches the operating system of my EC2 instances."** False: on EC2, the customer patches the guest operating system. AWS patches the host and the virtualization layer.
- **"On Amazon RDS, I patch the database's operating system."** False: AWS does it; you choose the maintenance window.
- **"With AWS Lambda, I have no security responsibilities."** False: your code, its dependencies, and the function's IAM permissions are yours.
- **"If I use S3, AWS decides who can see my files."** False: data permissions and encryption are always the customer's responsibility.
- **Mixing up "of" and "in".** AWS = security **of** the cloud (infrastructure). Customer = security **in** the cloud (what it puts inside).
- **Forgetting shared controls.** Patching, configuration, and training are the answer when the question asks for something that "both" parties do.

## Exam summary

- AWS: security OF the cloud (hardware, facilities, network, virtualization).
- Customer: security IN the cloud (data, encryption, applications, IAM and, depending on the service, the operating system and network).
- Inherited controls (physical), shared controls (patching, configuration, training), and customer-specific controls.
- EC2: the customer patches the guest operating system.
- RDS: AWS patches the operating system and engine; the customer manages access, users, encryption, and the maintenance window.
- Lambda: AWS manages servers and the runtime; the customer manages code, dependencies, and permissions.
- More abstraction = fewer tasks for the customer, but the data and permissions are always theirs.
