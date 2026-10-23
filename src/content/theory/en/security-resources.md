---
title: "Security resources and documentation"
summary: "Where to find AWS security documentation and help (Security Center, Knowledge Center, Security Blog), third-party products in AWS Marketplace, and how to report abuse."
domain: "security-compliance"
order: 10
examTasks: ["2.4"]
services: ["AWS Marketplace", "AWS WAF", "AWS Artifact"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/security/"
  - "https://aws.amazon.com/security/"
  - "https://aws.amazon.com/blogs/security/"
  - "https://repost.aws/knowledge-center"
  - "https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html"
  - "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html"
  - "https://aws.amazon.com/security/vulnerability-reporting/"
  - "https://aws.amazon.com/about-aws/whats-new/2024/10/aws-trust-safety-center-re-post/"
  - "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"
quiz:
  - prompt: "A savings cooperative in Asunción already uses a well-known vendor's next-generation firewall in its data center and wants to deploy the same product on AWS, with the charge on its AWS bill. Where should it look for it?"
    options:
      - label: "AWS Artifact"
        explanation: "AWS Artifact is used to download AWS compliance reports such as SOC, ISO, or PCI; it does not sell third-party software."
      - label: "AWS Knowledge Center"
        explanation: "The Knowledge Center on re:Post offers step-by-step solutions to frequently asked questions; it does not let you buy or deploy products."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace is a curated catalog of third-party software, including security products, and its charges appear on your AWS bill."
        correct: true
      - label: "AWS Security Blog"
        explanation: "The Security Blog publishes news and best practices; it is not a place to buy or deploy a vendor's firewall."
  - prompt: "A media company in San José detects that an EC2 instance with an AWS IP address is sending malicious traffic to its network. To whom should it report this?"
    options:
      - label: "To AWS Trust & Safety, using the AWS abuse form"
        explanation: "When an AWS resource is used for abusive purposes, such as an EC2 instance sending malicious traffic, the channel is AWS Trust & Safety through the abuse form."
        correct: true
      - label: "By opening a technical support case in AWS Support"
        explanation: "AWS Support handles issues with your own account; opening a technical case to report abuse from an AWS IP address is a classic exam trap."
      - label: "To the AWS vulnerability disclosure program"
        explanation: "That program is for reporting vulnerabilities in AWS services, not someone else's abusive use of an AWS resource."
      - label: "By downloading a report in AWS Artifact"
        explanation: "AWS Artifact provides AWS compliance reports; it cannot be used to report abusive activity."
  - prompt: "A developer at a startup in Medellín configured an Amazon S3 bucket policy that blocks all access and needs a step-by-step solution to this common problem. Which resource should the developer consult?"
    options:
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace sells third-party software, data, and services; it does not offer articles with solutions to common problems."
      - label: "AWS Artifact"
        explanation: "AWS Artifact provides access to AWS compliance reports such as SOC or ISO; it does not explain how to fix a bucket policy."
      - label: "AWS Trust & Safety Center"
        explanation: "The Trust & Safety Center explains how to report abuse and the prohibited uses of the services; it does not cover bucket policy configuration."
      - label: "AWS Knowledge Center (on AWS re:Post)"
        explanation: "The Knowledge Center gathers customers' frequently asked questions with step-by-step solutions, for example how to fix an S3 bucket policy that blocks all access."
        correct: true
practice:
  - prompt: "The external auditor of an insurance company in Quito asks for the AWS SOC report to review the cloud provider's controls. Where does the company download it?"
    options:
      - label: "From the AWS Security Blog"
        explanation: "The Security Blog publishes technical guides, news, and best practices; SOC reports are not downloaded there."
      - label: "From AWS Artifact"
        explanation: "AWS Artifact provides access to AWS compliance reports, such as SOC, ISO, or PCI."
        correct: true
      - label: "From the AWS Trust & Safety Center"
        explanation: "The Trust & Safety Center explains how to report abuse and prohibited uses; it does not provide compliance reports."
      - label: "From AWS Marketplace"
        explanation: "AWS Marketplace sells third-party software, data, and services; it is not where AWS publishes its compliance reports."
  - prompt: "A developer at a payments company in Lima needs to know how to configure encryption, access control, and logging for Amazon S3. Which resource should the developer consult?"
    options:
      - label: "AWS Artifact"
        explanation: "AWS Artifact provides AWS compliance reports; it does not explain how to configure a service's security."
      - label: "The AWS Trust & Safety Center"
        explanation: "The Trust & Safety Center covers abuse reports and prohibited uses; it does not document S3 security configuration."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace is used to buy and deploy third-party products; it is not the S3 configuration guide."
      - label: "The Amazon S3 security chapter in the AWS Security Documentation"
        explanation: "The security documentation has a chapter for each service; the S3 chapter explains encryption, access control, and logging."
        correct: true
  - prompt: "A security researcher in Mexico City finds a possible vulnerability in an AWS service. Through which channel should it be reported?"
    options:
      - label: "Through the AWS vulnerability disclosure program"
        explanation: "Vulnerabilities in AWS services are reported through the vulnerability disclosure program."
        correct: true
      - label: "Through the AWS Trust & Safety abuse form"
        explanation: "Trust & Safety receives reports of AWS resources used for abusive purposes, not vulnerabilities in the services."
      - label: "By downloading a report in AWS Artifact"
        explanation: "AWS Artifact provides compliance reports; it is not a channel for reporting vulnerabilities."
      - label: "By buying a security product in AWS Marketplace"
        explanation: "AWS Marketplace sells third-party software; buying a product does not report the vulnerability to AWS."
  - prompt: "The head of security at a supermarket chain in Santiago wants to keep up with news and read practical examples written by AWS specialists on threat detection and cryptography. Which resource should she follow?"
    options:
      - label: "AWS Artifact"
        explanation: "AWS Artifact is used to download compliance reports such as SOC or ISO; it does not publish news or practical examples."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace is a catalog of third-party software and services; it is not a source of articles by AWS specialists."
      - label: "AWS Security Blog"
        explanation: "The Security Blog publishes news, technical guides, and practical examples by AWS specialists on identity, threat detection, and cryptography."
        correct: true
      - label: "The AWS abuse form"
        explanation: "The abuse form is used to report AWS resources used for abusive purposes; it does not offer learning content."
  - prompt: "A university in Bogotá has already paid for a license for a third-party security product and wants to deploy it on AWS from AWS Marketplace using that same license. Which Marketplace pricing model applies?"
    options:
      - label: "Free trial"
        explanation: "A free trial lets you evaluate a product for a period of time; it is not about reusing a license you already paid for."
      - label: "Hourly"
        explanation: "The hourly model charges based on usage time; the university would pay again instead of using its license."
      - label: "Annual"
        explanation: "The annual model is a new one-year subscription; it does not take advantage of the license the university already has."
      - label: "Bring your own license (BYOL)"
        explanation: "BYOL is the AWS Marketplace model for using a license you already own with the product deployed on AWS."
        correct: true
  - prompt: "Before buying a security product in AWS Marketplace, the procurement team of a bank in Panama wants to review the vendor's security and compliance documents. Which Marketplace feature helps?"
    options:
      - label: "AWS Security Blog"
        explanation: "The Security Blog publishes AWS articles on best practices; it does not collect compliance documents from Marketplace vendors."
      - label: "AWS Trust & Safety Center"
        explanation: "The Trust & Safety Center explains how to report abuse; it does not show vendors' security documents."
      - label: "AWS Marketplace Vendor Insights"
        explanation: "Vendor Insights lets you review security and compliance documents from some AWS Marketplace vendors."
        correct: true
      - label: "The AWS abuse form"
        explanation: "The abuse form is used to report AWS resources used for abusive purposes, not to evaluate a vendor."
---

## Why does it matter?

A small team at a savings cooperative in Asunción has just migrated to AWS. It has no full-time security specialist and asks very specific questions: How do I configure encryption for this service? Where can I read up-to-date best practices? Can I buy a firewall from a vendor I already know? And if I see strange traffic coming from an AWS IP address, whom do I notify?

AWS publishes a lot of security information, and the exam expects you to know **which resource to use for each need**.

## Security documentation offered by AWS

### AWS Security Documentation

At **docs.aws.amazon.com/security** you will find the index of the **AWS security documentation**. It brings together:

- Links to the **shared responsibility model**, the **security best practices** of the AWS Architecture Center, and **security learning** resources (blog posts, whitepapers, tutorials, and training).
- Links to **compliance** resources, such as AWS Artifact and the list of HIPAA-eligible services.
- A **security chapter for each service**, organized by category (compute, storage, databases, networking, and so on). For example, the Amazon S3 chapter explains encryption, access control, and logging for S3.

When the question is "How do I securely configure service X?", the answer is usually **the security section of that service's documentation**.

### AWS Security Center

The **AWS Security Center** (the **aws.amazon.com/security** page, "Cloud Security") is the general entry point for security on AWS. From there you can access:

- **Security services**, use cases, **compliance**, and data protection.
- **Partner solutions** and security offerings in AWS Marketplace.
- **Learning** resources, such as the AWS Security Fundamentals training and the AWS Security Reference Architecture.
- How to **report vulnerabilities** and suspicious activity. AWS also publishes public notices such as **Security Bulletins**.

### AWS Knowledge Center

The **AWS Knowledge Center** now lives on **AWS re:Post** (repost.aws/knowledge-center). It contains articles with customers' **most frequently asked questions** and their step-by-step solutions, for example how to fix an S3 bucket policy that blocks all access or how to review and respond to an abuse notice. It is ideal for solving a specific problem quickly.

### AWS Security Blog

The **AWS Security Blog** (aws.amazon.com/blogs/security) publishes **technical guides and best practices** on identity and access management, threat detection, cryptography, and other topics. It is the source for keeping up with **news** and seeing **practical examples** written by AWS specialists.

| Need | Resource |
| --- | --- |
| Configure security for a specific service | The service's security documentation (AWS Security Documentation) |
| Overview, services, and compliance | AWS Security Center |
| Step-by-step solution to a common problem | AWS Knowledge Center (on re:Post) |
| News, articles, and best practices | AWS Security Blog |
| AWS compliance reports (SOC, ISO, PCI) | AWS Artifact |

## Third-party security products: AWS Marketplace

**AWS Marketplace** is a **curated digital catalog** where you can **find, buy, deploy, and manage third-party software, data, and services**. It includes thousands of products in categories such as **security**, networking, and storage.

- Deployment formats: for example, **Amazon Machine Images (AMIs)**, **software as a service (SaaS)**, or CloudFormation templates. There are even **rule sets for AWS WAF** from specialized vendors, which can also be used with AWS Firewall Manager.
- Flexible pricing models: free trial, hourly, monthly, annual, multi-year, or **bring your own license** (*BYOL*).
- **Charges appear on your AWS bill**, which simplifies purchasing.
- All products go through a **curation** process.
- With **AWS Marketplace Vendor Insights**, you can review security and compliance documents from some vendors, which are also accessible from AWS Artifact.

Typical scenario: "the company already uses a well-known vendor's next-generation firewall and wants the same one on AWS" → **AWS Marketplace**.

## Reporting abuse: AWS Trust & Safety

If you detect that **an AWS resource is being used for abusive purposes** (for example, an EC2 instance sending malicious traffic to your network or an S3 bucket hosting fraudulent content), you should notify the **AWS Trust & Safety** team:

- Fill out the **AWS abuse form** or write to the Trust & Safety email address listed on the official page.
- The **AWS Trust & Safety Center**, available on AWS re:Post, explains how to submit a report, the **prohibited uses** of AWS services, and how to respond if **you** receive an abuse notice.

Do not confuse this channel with others: **vulnerabilities in AWS services** are reported through the vulnerability disclosure program, and issues with your own account are handled with AWS Support.

## Common exam traps

- **Looking for SOC or ISO reports in the Security Blog or the Knowledge Center.** They are downloaded from **AWS Artifact**.
- **Opening a technical support case to report abuse from an AWS IP address.** The channel is **AWS Trust & Safety** (abuse form).
- **Thinking AWS Marketplace only sells AWS products.** It sells **third-party** software, billed to your AWS account.
- **Confusing the Knowledge Center with the Security Blog.** Knowledge Center = answers to frequently asked questions; Blog = articles and news.

## Exam summary

- AWS Security Documentation: a security chapter per service and general guides.
- AWS Security Center: entry point to services, compliance, learning, and reporting.
- AWS Knowledge Center (re:Post): solutions to frequently asked questions.
- AWS Security Blog: news and best practices.
- AWS Marketplace: third-party security products, charged on your AWS bill.
- Abuse involving AWS resources → AWS Trust & Safety (abuse form).
