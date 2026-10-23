---
title: "Monitoring and operations: CloudWatch, Systems Manager, and more"
summary: "Monitor with CloudWatch, audit with CloudTrail, operate with Systems Manager, and optimize with Health Dashboard, Service Quotas, Compute Optimizer, and Trusted Advisor."
domain: "technology-services"
order: 20
examTasks: ["2.2", "3.1"]
services: ["Amazon CloudWatch", "AWS Systems Manager", "AWS Health Dashboard", "Service Quotas", "AWS Compute Optimizer", "AWS License Manager", "AWS Service Catalog", "AWS Trusted Advisor", "AWS CloudTrail", "AWS Config"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
  - "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
  - "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
  - "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html"
  - "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html"
  - "https://docs.aws.amazon.com/health/latest/ug/aws-health-dashboard-status.html"
  - "https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"
  - "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"
  - "https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html"
  - "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html"
quiz:
  - prompt: "A logistics company in Panama discovers that someone deleted an S3 bucket over the weekend. It needs to know which user did it and when. Which service should it check?"
    options:
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitors performance with metrics, logs, and alarms; the question of who performed an action belongs to auditing."
      - label: "AWS Systems Manager"
        explanation: "AWS Systems Manager is for operating nodes at scale, with patching and remote commands; it does not record who deleted a resource."
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail records the actions of users, roles, and services as events, and answers who did what, on which resource, and when."
        correct: true
      - label: "AWS Health Dashboard"
        explanation: "AWS Health Dashboard shows the health of AWS services and the events that affect your account; it does not identify which user deleted a bucket."
  - prompt: "The IT team at a pharmacy chain in Guayaquil spends hours patching servers one by one across hundreds of EC2 instances and wants to connect to them without opening port 22. Which service should it use?"
    options:
      - label: "AWS Systems Manager"
        explanation: "AWS Systems Manager patches many servers at once and, with Session Manager, lets you connect without opening inbound ports or using SSH."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch collects metrics and logs and triggers alarms, but it is not the tool for patching servers or connecting to them."
      - label: "AWS Service Catalog"
        explanation: "AWS Service Catalog lets users launch only approved IT products; it does not patch existing instances."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer gives rightsizing recommendations based on usage; it does not apply patches or provide remote access to nodes."
  - prompt: "A startup in Medellín suspects its EC2 instances are oversized and wants rightsizing recommendations based on actual usage metrics. Which service should it turn on?"
    options:
      - label: "Service Quotas"
        explanation: "Service Quotas is for viewing service quotas and requesting increases; it does not analyze whether an instance is oversized."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer analyzes configuration and usage metrics to recommend rightsizing and identify idle resources."
        correct: true
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages software licenses from vendors such as Microsoft or Oracle; it does not evaluate instance sizes."
      - label: "AWS Health Dashboard"
        explanation: "AWS Health Dashboard reports on AWS service events and outages; it does not give rightsizing recommendations."
practice:
  - prompt: "A sales portal in Santo Domingo wants to receive an alert, and run an automatic action, when the CPU usage of its EC2 instances exceeds 80%. Which service should it use?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail records who performed each API action; it does not watch performance metrics against a threshold."
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch collects metrics such as CPU usage, and its alarms watch a threshold, send alerts, and can run automatic actions."
        correct: true
      - label: "AWS Config"
        explanation: "AWS Config records resource configurations and their changes; it does not measure CPU usage in real time."
      - label: "AWS Service Catalog"
        explanation: "AWS Service Catalog defines which approved products teams can launch; it does not monitor performance."
  - prompt: "An auditor at an insurance company in San José asks to see how an AWS resource was configured last month, what changes it had, and whether it complies with the defined internal rules. Which service answers that question?"
    options:
      - label: "AWS Config"
        explanation: "AWS Config records the configuration of your resources and their changes to evaluate whether they comply with the defined rules."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitors performance metrics, logs, and alarms; it does not evaluate compliance with configuration rules."
      - label: "AWS Health Dashboard"
        explanation: "AWS Health Dashboard shows the health of AWS services and events affecting the account, not a resource's configuration history."
      - label: "AWS License Manager"
        explanation: "AWS License Manager controls software licenses from vendors; it does not record resource configurations."
  - prompt: "A payments application in Tegucigalpa starts failing, and the team wants to know whether an AWS event is affecting the resources in its account, including planned activities. Which tool should it check?"
    options:
      - label: "Service Quotas"
        explanation: "Service Quotas shows service limits and lets you request increases; it does not report AWS events affecting the account."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer recommends the right size for resources based on their usage; it does not report AWS events."
      - label: "AWS Health Dashboard"
        explanation: "The Your account health view of AWS Health Dashboard shows the events that affect your account and resources, including planned activities."
        correct: true
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail records the actions of users, roles, and services in your account; it does not report on the status of AWS services."
  - prompt: "A video game company in Mexico City has reached the maximum value of a resource allowed in its account and needs to view that limit and request an increase from a single place. Which service should it use?"
    options:
      - label: "AWS Systems Manager"
        explanation: "AWS Systems Manager operates nodes at scale with patching and remote commands; it does not manage service limits."
      - label: "AWS License Manager"
        explanation: "AWS License Manager sets consumption limits for software licenses, not quotas for AWS services."
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail audits who performed each action; it does not show quotas or let you request increases."
      - label: "Service Quotas"
        explanation: "Service Quotas lets you view and manage AWS service quotas from a single place and request increases when they are adjustable."
        correct: true
  - prompt: "A university in Concepción wants its schools to self-serve and launch only IT products approved by the central department, organized into portfolios with constraints. Which service should it use?"
    options:
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace is a store for third-party software; it is not a catalog of internally approved products."
      - label: "AWS Service Catalog"
        explanation: "AWS Service Catalog lets you create catalogs of approved IT services in portfolios with constraints, which users launch through self-service."
        correct: true
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer gives rightsizing recommendations; it does not control which products users can launch."
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitors metrics, logs, and alarms; it does not define which products are approved for launch."
  - prompt: "An agricultural exporter in Trujillo has the Basic Support plan and wants access to the full set of AWS Trusted Advisor checks and its API. What does it need?"
    options:
      - label: "Nothing; the Basic Support plan already includes all checks"
        explanation: "Basic Support includes only all Service limits checks and some Security and Fault tolerance checks, not the full set."
      - label: "Opt in to AWS Compute Optimizer"
        explanation: "Turning on Compute Optimizer gives rightsizing recommendations, but it does not unlock the full set of Trusted Advisor checks."
      - label: "Create a trail in AWS CloudTrail"
        explanation: "A trail continuously stores API events in S3; it does not give access to more Trusted Advisor checks."
      - label: "Sign up for AWS Business Support+, AWS Enterprise Support, or AWS Unified Operations"
        explanation: "The full set of Trusted Advisor checks and its API require AWS Business Support+, AWS Enterprise Support, or AWS Unified Operations."
        correct: true
---

## Why does it matter?

A logistics company in Panama has hundreds of EC2 instances. One Monday, the tracking application slows down and nobody knows whether it is the CPU, a configuration change someone made over the weekend, or an AWS outage in the Region. On top of that, the team spends hours patching servers one by one, and the bill keeps growing because of oversized instances.

AWS has tools to **see** what is happening (monitoring), **know who did what** (auditing), **operate at scale**, and **optimize**. The exam will ask you to choose the right one.

## Monitoring with CloudWatch vs. auditing with CloudTrail

**Amazon CloudWatch** monitors your AWS resources and applications **in real time**:

- **Metrics**: performance data such as CPU usage. Many AWS services send them automatically, and you can publish your own custom metrics.
- **Logs**: CloudWatch Logs collects, stores, and queries logs from AWS services and your applications.
- **Alarms**: watch a metric against a threshold; they alert you and can **run automatic actions**.
- **Dashboards**: metrics and logs in one place.

**AWS CloudTrail** supports **auditing, governance, and compliance**: it records as **events** the actions taken by a user, a role, or an AWS service, whether from the console, the AWS CLI, the SDKs, or the APIs. It answers **who did what, on which resource, and when**. **Event history** shows management events from the **last 90 days** in a Region for free; with a **trail** you continuously store events in an S3 bucket.

**AWS Config**, which the guide also mentions for auditing, records the **configuration** of your resources and their changes to evaluate whether they comply with the defined rules.

| Question | Service |
| --- | --- |
| How is **performance** right now? Do I want an alarm if CPU exceeds 80%? | CloudWatch |
| **Who** deleted this bucket and **when**? | CloudTrail |
| How was this resource **configured**, and does it comply with the rules? | AWS Config |

## Operating at scale with AWS Systems Manager

**AWS Systems Manager** lets you **view, manage, and operate nodes at scale** centrally across AWS, on-premises, and multicloud environments. A **managed node** is a machine with the **SSM Agent** installed. Typical capabilities:

- **Patch** many servers at once.
- **Run commands remotely** (Run Command).
- **Connect securely** to nodes **without opening inbound ports**, with no bastion hosts or SSH (Session Manager).
- **Store configuration data** that applications use (Parameter Store).
- **Automate common** administrative tasks (Automation).

This fits task 3.1 of the guide: choosing **repeatable processes** over one-time manual operations.

## Visibility and optimization tools

**AWS Health Dashboard**: shows the health of AWS services. The **Service health** view shows **public** events for all services and Regions, without signing in. The **Your account health** view shows the events that **affect your account** and your resources, including planned activities. It is available to all customers at no additional cost.

**Service Quotas**: lets you **view and manage service quotas from a single place** (also called limits) for AWS services, meaning the maximum values for resources or operations in your account, and **request increases** when a quota is adjustable. Some quotas are per account and others per Region.

**AWS Compute Optimizer**: analyzes the configuration and **usage metrics** of your resources to give **rightsizing recommendations** and identify idle resources. It tells you whether a resource is optimal and how to reduce costs or improve performance. It covers, among others, EC2 instances, Auto Scaling groups, EBS volumes, Lambda functions, and RDS databases. You have to *opt in*.

**AWS License Manager**: manages **software licenses** from vendors such as Microsoft, SAP, Oracle, and IBM in AWS and on premises. With licensing rules you can set limits to **avoid non-compliance** and license overages, and take advantage of the **BYOL** (*bring your own license*) model.

**AWS Service Catalog**: lets organizations **create and manage catalogs of approved IT services** for use on AWS. Administrators build **portfolios** of products with constraints; end users **self-serve** and launch only what is approved. The result: governance and standardization.

**AWS Trusted Advisor**: inspects your environment and **recommends best practices** to save money, improve availability and performance, and close security gaps. Its check categories are:

1. **Cost optimization**
2. **Performance**
3. **Security**
4. **Fault tolerance**
5. **Service limits**
6. **Operational Excellence**

With the **Basic Support** plan you get all Service limits checks and selected Security and Fault tolerance checks. The full set, and the Trusted Advisor API, require **AWS Business Support+**, **AWS Enterprise Support**, or **AWS Unified Operations**.

## Which service do I use?

| I need… | Service |
| --- | --- |
| Metrics, logs, dashboards, and alarms | Amazon CloudWatch |
| A record of who made each API call | AWS CloudTrail |
| To patch and manage many servers without SSH | AWS Systems Manager |
| To know whether an AWS outage affects my account | AWS Health Dashboard |
| To view or increase a service's limits | Service Quotas |
| To know whether my instances are oversized | AWS Compute Optimizer |
| To control Oracle or Microsoft licenses | AWS License Manager |
| Teams to launch only approved products | AWS Service Catalog |
| Recommendations on cost, security, performance, and fault tolerance | AWS Trusted Advisor |

## Common exam traps

- **Confusing CloudWatch with CloudTrail.** CloudWatch = performance and alarms; CloudTrail = auditing of API actions.
- **Choosing Trusted Advisor to rightsize an instance based on actual usage.** Trusted Advisor gives general recommendations; usage analysis for *rightsizing* belongs to **Compute Optimizer**.
- **Thinking everyone has all the Trusted Advisor checks.** The Basic plan includes only a subset.
- **Opening port 22 to manage servers.** Systems Manager Session Manager connects without opening inbound ports.
- **Confusing Service Catalog with AWS Marketplace.** Service Catalog contains **internally approved** products; Marketplace is a store for third-party software.

## Exam summary

- CloudWatch = real-time metrics, logs, alarms, and dashboards.
- CloudTrail = who did what and when; 90-day Event history.
- AWS Config = configuration history and rule compliance.
- Systems Manager = patching, remote commands, and secure access to nodes at scale.
- Health Dashboard = status of AWS services and events that affect your account.
- Service Quotas = view quotas and request increases; Compute Optimizer = rightsizing with usage metrics.
- License Manager = licenses; Service Catalog = catalog of approved products.
- Trusted Advisor = six categories; the full set requires Business Support+, Enterprise, or Unified Operations.
