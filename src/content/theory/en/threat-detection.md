---
title: "Threat and vulnerability detection"
summary: "Tell apart GuardDuty, Inspector, Security Hub, Detective, and the Trusted Advisor security checks to detect, prioritize, and investigate security issues."
domain: "security-compliance"
order: 9
examTasks: ["2.2", "2.4"]
services: ["Amazon GuardDuty", "Amazon Inspector", "AWS Security Hub", "Amazon Detective", "AWS Trusted Advisor", "Amazon Macie", "AWS Config"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"
  - "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"
  - "https://docs.aws.amazon.com/securityhub/latest/userguide/what-are-securityhub-services.html"
  - "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"
  - "https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html"
  - "https://docs.aws.amazon.com/awssupport/latest/user/security-checks.html"
quiz:
  - prompt: "A logistics company in Guadalajara wants AWS to alert it continuously if any EC2 instance communicates with IP addresses associated with cryptocurrency mining or if credentials are compromised, without installing agents. Which service should it enable?"
    options:
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector scans for software vulnerabilities and network exposure; it does not detect malicious behavior such as communication with mining IP addresses."
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty continuously monitors CloudTrail, VPC Flow Logs, and DNS logs with threat intelligence and machine learning, and it detects cryptocurrency mining and compromised credentials."
        correct: true
      - label: "Amazon Macie"
        explanation: "Amazon Macie discovers sensitive data in Amazon S3; it does not monitor the network activity of EC2 instances."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor recommends best practices, such as MFA on the root account or open ports; it does not detect active threats in the account."
  - prompt: "A fintech in Santiago needs to continuously scan its EC2 instances and its container images in Amazon ECR for known vulnerabilities (CVEs). Which service should it use?"
    options:
      - label: "Amazon Detective"
        explanation: "Amazon Detective investigates the root cause of findings with a behavior graph; it does not scan software for CVEs."
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty detects active threats based on behavior; scanning software for vulnerabilities is Inspector's job."
      - label: "Amazon Macie"
        explanation: "Amazon Macie looks for sensitive data in Amazon S3; it does not check container images or instances for CVEs."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector automatically discovers EC2 instances, ECR images, and Lambda functions, and continuously scans them for CVEs."
        correct: true
  - prompt: "After receiving a GuardDuty finding, the security team of an airline in Lima wants to analyze the root cause and see which resources were affected, using behavior graph visualizations. Which service should it use?"
    options:
      - label: "Amazon Detective"
        explanation: "Amazon Detective uses CloudTrail data, VPC Flow Logs, and GuardDuty findings to build a behavior graph and investigate the root cause."
        correct: true
      - label: "AWS Security Hub CSPM"
        explanation: "AWS Security Hub CSPM aggregates findings and checks standards with security scores; it does not build a behavior graph to investigate the root cause."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector looks for software vulnerabilities; it does not investigate what an attacker did based on a GuardDuty finding."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor runs best-practice checks; it does not analyze the activity related to a security finding."
practice:
  - prompt: "A network of clinics in Quito stores thousands of patient documents in Amazon S3 buckets and needs to discover which ones contain sensitive personal data (PII). Which service should it use?"
    options:
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector looks for software vulnerabilities in EC2, ECR, and Lambda; it does not review the content of S3 objects for personal data."
      - label: "AWS Config"
        explanation: "AWS Config shows whether a resource complies with a configuration rule; it does not analyze document content to find PII."
      - label: "Amazon Macie"
        explanation: "Amazon Macie discovers sensitive data, such as PII, in Amazon S3, which is exactly what the clinics need."
        correct: true
      - label: "Amazon Detective"
        explanation: "Amazon Detective investigates the root cause of findings with a behavior graph; it does not classify bucket content."
  - prompt: "A bank in Bogotá wants a single place to view findings from GuardDuty, Inspector, and Macie, check its accounts against standards such as CIS and PCI DSS, and get a security score. Which service should it use?"
    options:
      - label: "AWS Security Hub CSPM"
        explanation: "AWS Security Hub CSPM runs checks against standards such as CIS and PCI DSS, calculates security scores, and aggregates findings from GuardDuty, Inspector, and Macie."
        correct: true
      - label: "Amazon Detective"
        explanation: "Amazon Detective investigates what happened after a finding; it does not check accounts against standards or calculate a security score."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector produces its own vulnerability findings; it does not aggregate those from GuardDuty and Macie or evaluate standards such as PCI DSS."
      - label: "Amazon Macie"
        explanation: "Amazon Macie finds sensitive data in S3; it is one of the sources of findings, not the central view the bank is asking for."
  - prompt: "A travel agency in Cusco wants best-practice recommendations that warn it if its root account has no MFA and if any security group leaves ports open to the entire internet. Which service should it consult?"
    options:
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty detects active threats based on behavior, such as compromised credentials; it is not a list of configuration best-practice checks."
      - label: "Amazon Detective"
        explanation: "Amazon Detective investigates the root cause of existing findings; it does not recommend enabling MFA or closing ports."
      - label: "Amazon Macie"
        explanation: "Amazon Macie looks for sensitive data in Amazon S3; it does not review the configuration of the root account or security groups."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor includes security checks such as MFA on root account and Security Groups – Specific Ports Unrestricted."
        correct: true
  - prompt: "A startup in Asunción has the Basic Support plan and wants to know which AWS Trusted Advisor checks it can use. Which statement is correct?"
    options:
      - label: "It has access to the full set of Trusted Advisor checks"
        explanation: "The full set of checks requires AWS Business Support+, AWS Enterprise Support, or AWS Unified Operations, not Basic Support."
      - label: "It has selected security and fault tolerance checks, and all service limit checks"
        explanation: "With Basic Support, you get access to selected security and fault tolerance checks, and to all service limit checks."
        correct: true
      - label: "Trusted Advisor is only available with AWS Enterprise Support"
        explanation: "Basic Support already includes selected checks; Enterprise Support is one of the plans that provide the full set, not the only one with access."
      - label: "It only has cost optimization checks"
        explanation: "With Basic Support, the available checks cover security, fault tolerance, and service limits, not just cost."
  - prompt: "The IT manager of a mining company in Antofagasta proposes turning off GuardDuty and Inspector because the company just enabled AWS Security Hub. Which statement correctly describes the relationship between these services?"
    options:
      - label: "Security Hub replaces GuardDuty and Inspector, so they can be turned off"
        explanation: "Security Hub does not detect threats or scan for CVEs on its own; it relies on the findings that GuardDuty and Inspector generate."
      - label: "Security Hub scans for CVEs on its own, so only Inspector is redundant"
        explanation: "Continuous CVE scanning of EC2, ECR, and Lambda is done by Amazon Inspector, not Security Hub."
      - label: "Security Hub aggregates and correlates findings from GuardDuty and Inspector, without replacing them"
        explanation: "Security Hub centralizes, correlates, and helps prioritize findings from other services; if GuardDuty and Inspector are turned off, those detections are lost."
        correct: true
      - label: "GuardDuty and Inspector send their findings only to Amazon Detective"
        explanation: "Security Hub CSPM aggregates findings from GuardDuty, Inspector, and Macie, so they do not depend only on Detective to be centralized."
  - prompt: "A savings cooperative in Montevideo wants every Amazon GuardDuty finding to automatically trigger a response, such as isolating the affected instance. To which service should it send the findings?"
    options:
      - label: "Amazon Detective"
        explanation: "Amazon Detective is used to investigate the root cause of a finding; it is not designed to trigger automatic responses."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector scans for software vulnerabilities; it does not receive GuardDuty findings to automate responses."
      - label: "AWS Trusted Advisor"
        explanation: "AWS Trusted Advisor recommends best practices; it does not react to GuardDuty findings with automatic actions."
      - label: "Amazon EventBridge"
        explanation: "GuardDuty can send its findings to Amazon EventBridge, which lets you automate the response to each one."
        correct: true
---

## Why does it matter?

A logistics company in Guadalajara gets an alert on a Saturday: one of its EC2 instances is communicating with an IP address associated with **cryptocurrency mining**. The team needs to answer four questions: What is happening? What vulnerable software allowed the attack? What is the overall picture of our security? And what else did the attacker touch?

AWS has a specialized service for each question. The exam tests whether you know **which one to choose**.

## Amazon GuardDuty: threat detection

**Amazon GuardDuty** is a **threat detection** service that **continuously monitors** the activity in your account. It uses **threat intelligence** (lists of malicious IP addresses and domains) and **machine learning** to find suspicious behavior.

- Once enabled, it automatically analyzes its **foundational data sources**: **AWS CloudTrail** management events, **VPC Flow Logs**, and **DNS logs**. No agents need to be installed for this.
- It offers optional **protection plans**, for example for Amazon S3, Amazon EKS, Amazon RDS, AWS Lambda, malware on EC2 and S3, and runtime monitoring.
- It detects, for example, **compromised credentials**, unauthorized cryptocurrency mining, malware, and potential data exfiltration.
- It generates **findings** that you can send to Amazon EventBridge to automate responses.

Key question: **"Is someone attacking or misusing my account right now?"**

## Amazon Inspector: vulnerability management

**Amazon Inspector** **automatically discovers** your workloads and **continuously scans** them for **software vulnerabilities** (CVEs, publicly known vulnerabilities) and **unintended network exposure**.

- It scans **Amazon EC2 instances**, **container images in Amazon ECR**, and **AWS Lambda functions**.
- It rescans when something changes, for example when a package is installed or a new CVE is published.
- It assigns a **risk score** adjusted to your environment and closes the finding when it detects that you fixed it.

Key question: **"What software do I have that is unpatched or exposed?"**

## AWS Security Hub: a centralized view

AWS currently offers two complementary services with this name:

- **AWS Security Hub CSPM** (*Cloud Security Posture Management*, previously called simply Security Hub): runs **automated checks** against best practices and standards (such as AWS Foundational Security Best Practices, CIS, PCI DSS, and NIST), calculates **security scores**, and **aggregates findings** from GuardDuty, Inspector, Macie, and partner products in a single place. It uses AWS Config for most of its controls.
- **AWS Security Hub**: a unified experience that **correlates** findings from Security Hub CSPM, Inspector, GuardDuty, and Macie to identify the most critical **exposures** and help you prioritize and respond.

Key question: **"What is my overall security posture, and what should I address first?"**

## Amazon Detective: investigation

**Amazon Detective** helps you **analyze and investigate the root cause** of findings or suspicious activity. It automatically collects data from CloudTrail, VPC Flow Logs, and GuardDuty findings, and uses machine learning, statistical analysis, and graph theory to build a **behavior graph** with visualizations. It lets you review up to a year of historical event data.

Key question: **"What exactly happened, and which resources were affected?"**

## AWS Trusted Advisor: security checks

**AWS Trusted Advisor** inspects your environment and recommends improvements in cost, performance, fault tolerance, service limits, and **security**. Examples of security checks:

- **MFA on root account** and **Root User Access Key**.
- **Security Groups – Specific Ports Unrestricted** (ports open to the entire internet).
- **Amazon S3 Bucket Permissions** (buckets with open access).
- **Exposed Access Keys**, **IAM Password Policy**, and **IAM Access Key Rotation**.

With the **Basic Support** plan, you get access to **selected checks** for security and fault tolerance, and to all service limit checks. The full set of checks requires **AWS Business Support+**, **AWS Enterprise Support**, or **AWS Unified Operations**.

## Which service do I use?

| If the question says… | Service |
| --- | --- |
| "Detect malicious activity, compromised credentials, or cryptocurrency mining" | **Amazon GuardDuty** |
| "Scan for vulnerabilities (CVEs) in EC2, container images, or Lambda" | **Amazon Inspector** |
| "Central view of findings and checks against standards" | **AWS Security Hub CSPM** / **AWS Security Hub** |
| "Investigate the root cause of a finding" | **Amazon Detective** |
| "Best-practice recommendations, such as MFA on root or open ports" | **AWS Trusted Advisor** |
| "Find sensitive data (PII) in S3" | **Amazon Macie** |
| "Know whether a resource complies with a configuration rule" | **AWS Config** |

## Common exam traps

- **Confusing GuardDuty with Inspector.** GuardDuty = **active threats** (behavior); Inspector = software **vulnerabilities**.
- **Confusing GuardDuty with Detective.** GuardDuty **detects**; Detective **investigates** what was detected.
- **Thinking Security Hub replaces GuardDuty or Inspector.** It **aggregates and correlates** them; it does not replace them.
- **Choosing Inspector for sensitive data.** That is **Macie**.
- **Believing the full Trusted Advisor is free.** With Basic Support, only selected checks are available.

## Exam summary

- GuardDuty: continuous threat detection with CloudTrail, VPC Flow Logs, and DNS; ML and threat intelligence.
- Inspector: automated, continuous vulnerability scanning of EC2, ECR, and Lambda.
- Security Hub CSPM: security posture, standards, and aggregated findings; Security Hub: correlation and prioritization.
- Detective: root cause investigation with behavior graphs.
- Trusted Advisor: security checks such as MFA on root, open ports, and S3 permissions.
- Detect = GuardDuty; vulnerabilities = Inspector; centralize = Security Hub; investigate = Detective.
