---
title: "Technical resources, AWS Partners and Marketplace"
summary: "Find the official AWS documentation and technical resources, understand the role of the AWS Partner Network and AWS Marketplace, and get to know Professional Services and solutions architects."
domain: "billing-pricing-support"
order: 6
examTasks: ["4.3"]
services: ["AWS Marketplace", "AWS License Manager", "AWS Support"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html"
  - "https://aws.amazon.com/whitepapers/"
  - "https://aws.amazon.com/prescriptive-guidance/"
  - "https://aws.amazon.com/about-aws/whats-new/2023/03/aws-re-post-includes-knowledge-center-articles/"
  - "https://aws.amazon.com/partners/"
  - "https://aws.amazon.com/partners/training/"
  - "https://docs.aws.amazon.com/marketplace/latest/buyerguide/what-is-marketplace.html"
  - "https://aws.amazon.com/marketplace/features/governance"
  - "https://aws.amazon.com/professional-services/"
  - "https://aws.amazon.com/blogs/training-and-certification/engaging-a-solutions-architect/"
quiz:
  - prompt: "A company in Guayaquil develops electronic invoicing software that integrates with AWS and sells it to customers in AWS Marketplace. Within the AWS Partner Network, what type of partner is it?"
    options:
      - label: "Independent Software Vendor (ISV)"
        explanation: "An ISV builds software that runs on AWS or integrates with AWS and can sell it, for example, in AWS Marketplace."
        correct: true
      - label: "System integrator (SI)"
        explanation: "A system integrator designs, migrates, implements or manages solutions for its customers; it is not defined by building and selling its own software."
      - label: "AWS Professional Services"
        explanation: "AWS Professional Services is an AWS team that helps design, build and migrate workloads; it is not an APN partner type."
      - label: "AWS solutions architect"
        explanation: "Solutions architects are AWS technical advisors who help design architectures; they are not a type of partner that sells software."
  - prompt: "The procurement department of a chain of clinics in Bogotá wants its users to be able to buy only the software products it has approved in AWS Marketplace. What should it use?"
    options:
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance offers guides and patterns for migrating and modernizing; it does not control which software users can buy."
      - label: "AWS Knowledge Center"
        explanation: "The Knowledge Center has articles answering frequently asked questions; it does not restrict the purchasing catalog."
      - label: "Private Marketplace"
        explanation: "Private Marketplace creates a custom catalog of approved products so that the organization's users only buy what is authorized."
        correct: true
      - label: "AWS Professional Services"
        explanation: "AWS Professional Services runs projects such as migrations or modernization; it does not govern which Marketplace products can be bought."
  - prompt: "An IT team in La Paz is going to plan the migration of its appointment system and is looking for resources from AWS experts with implementation guides and patterns that include steps, architectures and code. Which resource should it consult?"
    options:
      - label: "AWS re:Post"
        explanation: "AWS re:Post is a community question-and-answer service, useful for specific questions, not a set of migration guides and patterns."
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace is a catalog for buying third-party software, data and services; it does not publish migration guides or patterns."
      - label: "AWS Knowledge Center"
        explanation: "The Knowledge Center answers frequently asked questions about common issues; it does not offer patterns with steps, architectures and code for migrating."
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance brings together planning and implementation guides and patterns with steps, architectures and code for migrations and modernizations."
        correct: true
practice:
  - prompt: "A consulting firm in Lima is an AWS partner and focuses on migrating, implementing and managing solutions on AWS for its customers, without selling its own software. What type of AWS Partner Network partner is it?"
    options:
      - label: "Independent Software Vendor (ISV)"
        explanation: "An ISV is defined by building software that runs on AWS or integrates with AWS; the consulting firm does not sell its own software."
      - label: "System integrator (SI) or services partner"
        explanation: "System integrators and services partners design, migrate, implement or manage solutions on AWS for their customers."
        correct: true
      - label: "Private Marketplace"
        explanation: "Private Marketplace is an AWS Marketplace governance feature for restricting the catalog; it is not a partner type."
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages licenses and entitlements; it is not an APN partner category."
  - prompt: "A mining company in Antofagasta bought software licenses in AWS Marketplace and wants to distribute, activate and track them across several accounts in its organization. Which service does it use?"
    options:
      - label: "Private Marketplace"
        explanation: "Private Marketplace defines which approved products users can buy; it does not distribute or track licenses that have already been purchased."
      - label: "AWS Prescriptive Guidance"
        explanation: "AWS Prescriptive Guidance offers guides and patterns for migrating and modernizing; it does not manage licenses."
      - label: "AWS re:Post"
        explanation: "AWS re:Post is a community question-and-answer service; it does not manage software usage rights."
      - label: "AWS License Manager"
        explanation: "AWS Marketplace manages entitlements with AWS License Manager, which distributes, activates and tracks purchased licenses, including across accounts in the organization."
        correct: true
  - prompt: "The procurement department of a hotel chain in Cancún wants to negotiate custom pricing and terms with an AWS Marketplace seller for a large contract. Which Marketplace option applies?"
    options:
      - label: "Private offers"
        explanation: "AWS Marketplace private offers let you agree on custom pricing and terms negotiated with the seller."
        correct: true
      - label: "Private Marketplace"
        explanation: "Private Marketplace restricts the catalog to approved products; it is not for negotiating prices with a seller."
      - label: "Bring your own license (BYOL)"
        explanation: "BYOL is for using a license you already own; it is not a mechanism for negotiating new prices and terms."
      - label: "AWS License Manager"
        explanation: "AWS License Manager distributes and tracks purchased licenses; it does not negotiate prices with the seller."
  - prompt: "An airline in Bogotá wants an AWS team to run a large-scale migration and application modernization project together with it. What should it engage?"
    options:
      - label: "AWS Support, by opening technical cases"
        explanation: "AWS Support handles technical cases according to the plan you have; it does not run migration projects, which is the role of AWS Professional Services."
      - label: "AWS re:Post"
        explanation: "AWS re:Post offers community questions and answers; it does not run migration projects."
      - label: "AWS Professional Services"
        explanation: "AWS Professional Services is the AWS team that helps design, build, migrate and manage workloads, including large-scale migrations and modernization."
        correct: true
      - label: "AWS Whitepapers & Guides"
        explanation: "Whitepapers offer written best practices and reference architectures; they are not a team that runs the project."
  - prompt: "A health startup in Montevideo wants an AWS technical advisor to review its architecture design with an AWS Well-Architected review. Who fills that role?"
    options:
      - label: "AWS Knowledge Center"
        explanation: "The Knowledge Center contains articles answering frequently asked questions; it is not an advisor who reviews your architecture."
      - label: "An AWS solutions architect"
        explanation: "Solutions architects are technical advisors who help design architectures, for example through AWS Well-Architected reviews."
        correct: true
      - label: "AWS Marketplace"
        explanation: "AWS Marketplace is a catalog of third-party software, data and services; it does not offer architecture reviews with AWS advisors."
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages software licenses; it plays no part in architecture design."
  - prompt: "The architect at an energy company in Medellín is looking for material written by AWS and the community with security and compliance best practices, decision guides and reference architecture diagrams. Which resource should they consult?"
    options:
      - label: "AWS re:Post"
        explanation: "AWS re:Post is for resolving specific technical questions through community questions and answers, not a repository of reference architectures."
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages software licenses; it does not publish guides or architecture diagrams."
      - label: "AWS Whitepapers & Guides"
        explanation: "AWS Whitepapers & Guides brings together technical whitepapers, decision guides and reference architecture diagrams on best practices, security and compliance."
        correct: true
      - label: "Private Marketplace"
        explanation: "Private Marketplace restricts which Marketplace products users can buy; it does not offer technical material."
---

## Why does it matter?

A chain of clinics in Bogotá wants to migrate its appointment system to AWS. The internal team has specific technical questions, needs ready-to-use third-party security software and has no experience planning a large migration. Before paying for a higher support plan, it is worth knowing **which free resources exist** and **who else can help**: AWS partners, the AWS Marketplace catalog or AWS teams.

The exam tests whether you know **where to look** for each type of help.

## Official documentation and technical resources

| Resource | What it offers | When to use it |
| --- | --- | --- |
| **AWS Documentation** (docs.aws.amazon.com) | User guides, API and CLI references for each service | Learning how a service works and is configured |
| **AWS Whitepapers & Guides** (aws.amazon.com/whitepapers) | Technical whitepapers, decision guides, reference material and reference architecture diagrams, written by AWS and the community | Best practices, architecture, security and compliance |
| **AWS Blogs** (aws.amazon.com/blogs) | Announcements, use cases and tutorials by topic | News and hands-on examples |
| **AWS Prescriptive Guidance** | Resources from AWS experts to accelerate adoption and modernization: planning and implementation **guides** and **patterns** with steps, architectures and code | Planning or running migrations and modernizations |
| **AWS re:Post** | A cloud knowledge service with community questions and answers | Resolving technical questions with help from the community and experts |
| **AWS Knowledge Center** | Articles with authoritative answers to the most frequently asked questions, produced by an AWS team and marked with the *AWS Official* badge; today they live inside AWS re:Post | Common issues, for example with billing or configuration |

In the clinics' case, the team starts with the documentation and AWS Prescriptive Guidance to plan the migration, and uses re:Post and the Knowledge Center for specific questions.

## AWS Partner Network (APN)

The **AWS Partner Network (APN)** is a global community of organizations that use AWS technologies, programs, funding and tools to build solutions for customers. There are two broad types of partners:

- **Independent Software Vendors (ISVs):** companies that build **software** that runs on AWS or integrates with AWS, and that can sell it, for example, in AWS Marketplace.
- **System integrators (SIs) and services or consulting partners:** companies that **design, migrate, implement or manage** solutions on AWS for their customers, and offer training, professional or managed services.

**Benefits of being an AWS Partner** (the exam guide mentions training and certification, events and volume discounts):

- **Training and certification:** a partner-exclusive digital training catalog, learning paths and certification preparation resources.
- **Events:** webinars, virtual workshops and in-person events for partners.
- **Discounts and funding:** funding programs and financial benefits; check the current terms in AWS Partner Central.
- **Commercial visibility:** selling their solutions to AWS customers worldwide, for example through AWS Marketplace.

## AWS Marketplace

**AWS Marketplace** is a **curated digital catalog** where you can find, buy, deploy and manage **third-party software, data and services**. It includes thousands of products in categories such as security, networking, storage, machine learning, databases and DevOps, in formats such as **AMI**, **SaaS** and others, plus data products from AWS Data Exchange.

Key services it offers buyers:

- **Cost management:** flexible pricing options (free trial, hourly, monthly, annual, multi-year or **BYOL**) and **integrated billing**: the charges appear on your AWS bill alongside the rest of your spend.
- **Governance:** **Private Marketplace** lets you create a custom catalog of **approved** products so that the organization's users only buy what is authorized.
- **Entitlement management:** distribute, activate and track licenses purchased in Marketplace through **AWS License Manager**, including across accounts in your organization.
- **Private offers:** custom pricing and terms negotiated with the seller.

In the example, the clinics buy the security software in AWS Marketplace and their procurement department restricts the catalog with Private Marketplace.

## AWS technical assistance

- **AWS Professional Services:** an AWS team that helps **design, build, migrate and manage** workloads on AWS, including large-scale migrations, modernization, data and AI, and security. It works together with AWS Partners.
- **AWS solutions architects:** technical advisors who help customers and partners **design architectures**, for example through **AWS Well-Architected** reviews and design sessions. If hands-on implementation is needed, they can connect the customer with Professional Services or the APN.
- **AWS Support:** technical support according to the plan you have, from Basic to Unified Operations.

## Common exam traps

- **Thinking AWS Marketplace only sells AWS services.** It sells **third-party** software, data and services, billed to your AWS account.
- **Confusing an ISV with a system integrator.** The ISV builds **software**; the SI **implements and manages** solutions for the customer.
- **Looking for answers to frequently asked questions in a whitepaper.** For common, concrete issues, the right resource is the **AWS Knowledge Center**.
- **Confusing AWS Professional Services with AWS Support.** Professional Services runs **projects** (migrations, modernization); Support handles **cases** according to the plan.
- **Forgetting Private Marketplace.** It is the answer when the question asks to **control which software** users can buy.

## Exam summary

- Documentation: guides and references for each service; whitepapers: best practices and architecture; blogs: news and examples.
- AWS Prescriptive Guidance: expert guides and patterns for migrating and modernizing.
- AWS re:Post: community questions and answers; Knowledge Center: official answers to frequently asked questions.
- APN: ISVs (software) and system integrators or services partners (implementation).
- Partner benefits: training and certification, events, discounts and funding.
- AWS Marketplace: curated third-party catalog; integrated billing; Private Marketplace for governance; AWS License Manager for entitlements.
- AWS Professional Services and solutions architects: technical assistance for projects and architecture design.
