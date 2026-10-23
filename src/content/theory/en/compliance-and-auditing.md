---
title: "Compliance, auditing and security logs"
summary: "Where to find compliance reports with AWS Artifact and how to monitor, audit and report with CloudWatch, CloudTrail, Config and IAM access reports."
domain: "security-compliance"
order: 5
examTasks: ["2.2"]
services: ["AWS Artifact", "AWS CloudTrail", "AWS Config", "Amazon CloudWatch", "AWS IAM", "Amazon S3"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html"
  - "https://aws.amazon.com/compliance/services-in-scope/"
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
  - "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
  - "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
quiz:
  - prompt: "The compliance team of a digital bank in Mexico City asks to download AWS's SOC reports and PCI compliance report for its audit. Where does it get them?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail records the API calls in your account; it does not contain AWS compliance reports."
      - label: "AWS Config"
        explanation: "AWS Config records the configuration of your resources and evaluates rules; it does not publish AWS SOC or PCI reports."
      - label: "AWS Artifact"
        explanation: "AWS Artifact is the self-service portal for downloading reports such as SOC, PCI and ISO on demand and at no cost."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitors the metrics, logs and alarms of your resources; it does not offer AWS compliance documents."
  - prompt: "An auditor asks an insurance company in Bogotá which user deleted an Amazon DynamoDB table on Tuesday and from where. Which service answers that question?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail records API calls by users, roles and services as events, and answers who did what, when and from where."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch gathers metrics, logs and alarms to show how something is performing; auditing who made each API call is CloudTrail's job."
      - label: "AWS Config"
        explanation: "AWS Config shows how a resource was configured and how it changed; who made the change is answered by CloudTrail."
      - label: "AWS Artifact"
        explanation: "AWS Artifact provides AWS compliance reports and agreements; it does not record activity in your account."
  - prompt: "An auditor asks a cooperative in Asunción for a CSV file with all the users in the account and the status of their passwords, access keys and MFA devices. What should it generate?"
    options:
      - label: "IAM last accessed information"
        explanation: "Last accessed information shows which services and actions each identity used so you can trim permissions; it is not the CSV with credential status."
      - label: "An AWS Artifact report"
        explanation: "AWS Artifact provides AWS compliance reports, such as SOC or ISO; it does not list the users in your account."
      - label: "An AWS Config rule"
        explanation: "An AWS Config rule evaluates whether resources comply with a configuration; it does not produce the CSV with each user's passwords, access keys and MFA."
      - label: "The IAM credential report"
        explanation: "The credential report is a CSV file with all the users in the account and the status of their passwords, access keys and MFA devices, ready to hand to an auditor."
        correct: true
practice:
  - prompt: "A healthcare company in Montevideo wants to continuously evaluate whether all its volumes are encrypted and have noncompliant resources flagged automatically. Which service should it use?"
    options:
      - label: "AWS CloudTrail"
        explanation: "AWS CloudTrail records who made each API call and when; it does not evaluate whether resource configuration complies with a rule."
      - label: "AWS Config"
        explanation: "AWS Config rules continuously evaluate whether each resource complies with what you define, such as encrypted volumes, and flag noncompliant ones."
        correct: true
      - label: "Amazon CloudWatch"
        explanation: "Amazon CloudWatch monitors metrics, logs and alarms to show how something is performing; it does not evaluate configuration compliance."
      - label: "AWS Artifact"
        explanation: "AWS Artifact provides AWS compliance reports and agreements; it does not review the configuration of your resources."
  - prompt: "An e-commerce company in Lima already uses several AWS Config rules and now wants to deploy together, as a single package, all the rules its compliance framework requires. What should it use?"
    options:
      - label: "An AWS CloudTrail trail"
        explanation: "A CloudTrail trail stores the record of API calls; it does not group or deploy configuration rules."
      - label: "The IAM credential report"
        explanation: "The IAM credential report lists users and the status of their credentials; it does not evaluate resource configuration."
      - label: "AWS Artifact"
        explanation: "AWS Artifact provides AWS compliance reports and agreements; it does not deploy rules on your resources."
      - label: "An AWS Config conformance pack"
        explanation: "Conformance packs group AWS Config rules so they can be deployed together and continuously evaluate whether resources comply; remediation can also be configured."
        correct: true
  - prompt: "A fintech in Bogotá wants to apply least privilege: it needs to know which services and actions each identity actually used in order to remove unneeded permissions. Which IAM tool should it check?"
    options:
      - label: "IAM last accessed information"
        explanation: "Last accessed information shows which services (and, for some, which actions) each identity actually used, so you can remove unneeded permissions and apply least privilege."
        correct: true
      - label: "The IAM credential report"
        explanation: "The credential report is a CSV with the status of users' passwords, access keys and MFA; it does not detail which services and actions each identity used."
      - label: "An AWS Artifact SOC report"
        explanation: "AWS Artifact SOC reports are audit evidence for AWS's side; they do not analyze the permissions of your identities."
      - label: "An AWS Config conformance pack"
        explanation: "A conformance pack groups Config rules to evaluate resource configuration; it does not show which actions each identity used."
  - prompt: "A payment gateway in Santiago is going to migrate to AWS, and its manager states: \"Since AWS is PCI DSS certified, our application is already PCI DSS compliant\". What is correct?"
    options:
      - label: "It is true, because AWS's certification automatically covers its customers' applications"
        explanation: "AWS being certified does not automatically certify your application; this is a classic exam trap."
      - label: "It is true, as long as it downloads the PCI report from AWS Artifact"
        explanation: "The PCI report in AWS Artifact is audit evidence for AWS's side; downloading it does not prove the customer's application is compliant."
      - label: "It is false: the company is still responsible for demonstrating the compliance of its own application and workloads"
        explanation: "Under the shared responsibility model, the customer is still responsible for demonstrating the compliance of its company and its workloads."
        correct: true
      - label: "It is true, as long as it turns on AWS CloudTrail in all Regions"
        explanation: "CloudTrail records API activity, but turning it on does not make the application PCI DSS compliant."
  - prompt: "A medical software company in Medellín that serves US hospitals will design a solution subject to HIPAA and wants to confirm first that each AWS service it chose is covered by that program. What should it check?"
    options:
      - label: "AWS CloudTrail event history"
        explanation: "CloudTrail event history shows recent API activity in the account; it does not indicate which services a compliance program covers."
      - label: "The AWS Services in Scope by Compliance Program page"
        explanation: "The Services in Scope page shows, for each compliance program, which services are covered by the current reports."
        correct: true
      - label: "An Amazon CloudWatch dashboard"
        explanation: "CloudWatch dashboards show metrics and logs for your resources; they do not report the scope of compliance programs."
      - label: "The IAM credential report"
        explanation: "The credential report lists the status of users' credentials; it does not say which services are in scope for HIPAA."
  - prompt: "An electricity distributor in Quito must keep, for several years, the record of who made each API call in its account, beyond what CloudTrail event history shows. What should it configure?"
    options:
      - label: "Nothing, because event history keeps events indefinitely"
        explanation: "CloudTrail event history shows only the last 90 days of management events per Region."
      - label: "VPC Flow Logs to Amazon S3"
        explanation: "VPC Flow Logs records IP traffic on the VPC's network interfaces; it does not record who made each API call."
      - label: "An AWS Config rule"
        explanation: "An AWS Config rule evaluates whether resources comply with a configuration; it does not keep the record of API calls."
      - label: "A CloudTrail trail that delivers events to an Amazon S3 bucket"
        explanation: "To keep events beyond the 90-day event history, you create a trail that delivers them to an Amazon S3 bucket."
        correct: true
---

## Why does it matter?

A digital bank in Mexico City wants to migrate to AWS. First, its compliance team asks three things: "Does AWS hold certifications such as ISO 27001 or PCI DSS?", "Which services can we use to process cards?" and "If an auditor asks who deleted an Amazon DynamoDB table on Tuesday, how do we prove it?". Answering well requires knowing **where the compliance documentation is** and **which service records each type of evidence**.

## Where to find compliance information

### AWS Artifact

**AWS Artifact** is the self-service portal for **downloading on demand** AWS security and compliance documents, **at no cost**:

- **Reports**: for example, **SOC** (*System and Organization Controls*) reports, **PCI** (card payments) compliance reports and **ISO** certifications. It also includes documents from some independent software vendors in AWS Marketplace.
- **Agreements**: review, accept and track agreements with AWS, for a single account or for the whole organization.

These documents serve as **audit evidence** for AWS's side. Note: under the shared responsibility model, **the customer is still responsible for demonstrating the compliance of its own company and its workloads**. AWS being certified does not automatically certify your application.

### Requirements vary by geography, industry and service

- **Geography**: there are national or regional programs. The official *AWS Services in Scope by Compliance Program* page includes, among many others, C5 (Germany), ENS High (Spain), IRAP (Australia) and ISMAP (Japan).
- **Industry**: healthcare in the US is governed by **HIPAA**; anyone who processes cards, by **PCI DSS**; US government suppliers, by **FedRAMP**.
- **Service**: **not every service is in scope for every program**. The *Services in Scope* page shows, for each program, which services are covered by the current reports. That is why, before designing a regulated solution, you verify that each chosen service is in scope.

## Security logs: what is captured and where

A **log** is a timestamped history of what happened. The main ones for the exam:

| Log | What it answers | Where it is viewed or stored |
| --- | --- | --- |
| **AWS CloudTrail** | Who made which API call, when and from where? | Event history in the console; *trails* to an **Amazon S3** bucket and, optionally, CloudWatch Logs; CloudTrail Lake |
| **Amazon CloudWatch Logs** | What did my applications, systems and services write? | Log groups in CloudWatch |
| **AWS Config** | How was this resource configured and how did it change? | Configuration history and snapshots in an S3 bucket |
| **VPC Flow Logs** | What IP traffic goes in and out of my VPC's network interfaces? | CloudWatch Logs, Amazon S3 or Amazon Data Firehose |

## Governance services: monitor, audit and report

### Monitor: Amazon CloudWatch

**Amazon CloudWatch** monitors resources and applications in real time. It collects **metrics** (for example, CPU usage), centralizes **logs**, offers **dashboards** and lets you create **alarms** that notify you or take actions when a threshold is crossed. Key question: "How is it performing?".

### Audit activity: AWS CloudTrail

**AWS CloudTrail** records the actions of users, roles and services taken from the console, the CLI, the SDKs and the APIs as **events**.

- **Event history** shows the **last 90 days** of management events per Region, at no cost and with no setup.
- To keep them longer, you create a **trail** that delivers events to an **Amazon S3** bucket. With AWS Organizations, you can create an organization trail that member accounts cannot turn off or modify.
- **CloudTrail Lake** is a managed data lake for storing and querying events for years.

Key question: "Who did what, and when?".

### Audit configuration: AWS Config

**AWS Config** keeps an **inventory** of your resources, their **configuration history** and their relationships. With **Config rules** it continuously evaluates whether each resource complies with what you define (for example, "volumes must be encrypted") and flags the **noncompliant** ones. **Conformance packs** group rules so they can be deployed together, and **remediation** can be configured. Key question: "How is it configured, and does it comply with the policy?".

### Report: IAM access reports

- **Credential report**: a **CSV** file with all the users in the account and the status of their passwords, access keys and MFA devices (for example, when each key was last rotated or used). It can be generated at most once every four hours and handed to an auditor.
- **Last accessed information**: shows which services (and, for some, which actions) each identity actually used, so you can remove unneeded permissions and apply least privilege.

## Common exam traps

- **Looking for AWS SOC or ISO reports in CloudTrail or Config.** Compliance reports are downloaded from **AWS Artifact**.
- **Confusing CloudTrail with CloudWatch.** CloudTrail = **API activity** (auditing); CloudWatch = **metrics, logs and alarms** (performance).
- **Confusing CloudTrail with Config.** CloudTrail tells you **who** changed something; Config tells you **what the configuration ended up as** and whether it complies with the rules.
- **"If AWS has PCI DSS, my application is already PCI DSS compliant."** False: your part of compliance is still yours.
- **Assuming every service is in scope for every program.** You have to check *Services in Scope*.

## Exam summary

- AWS Artifact: reports (SOC, PCI, ISO) and agreements with AWS, on demand and at no cost.
- Compliance varies by geography, industry and service; check *Services in Scope*.
- CloudWatch = monitor (metrics, logs, alarms).
- CloudTrail = audit API calls; 90 days in event history; trails to S3 to keep more.
- Config = inventory, configuration history and compliance rules.
- Credential report = status of passwords, access keys and MFA in CSV.
- Last accessed = trim unused permissions.
