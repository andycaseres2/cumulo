---
title: "AWS Cloud Adoption Framework (AWS CAF)"
summary: "Learn how the AWS CAF guides cloud adoption: business outcomes, transformation domains, six perspectives with their capabilities, and four phases."
domain: "cloud-concepts"
order: 5
examTasks: ["1.3"]
services: []
readingMinutes: 5
sources:
  - "https://aws.amazon.com/cloud-adoption-framework/"
  - "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/introduction.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/your-cloud-transformation-journey.html"
  - "https://docs.aws.amazon.com/pdfs/whitepapers/latest/overview-aws-cloud-adoption-framework/overview-aws-cloud-adoption-framework.pdf"
quiz:
  - prompt: "An insurance company in Mexico City discovers that its team lacks the skills to work in the cloud and that the organization's culture resists change. Which AWS CAF perspective addresses these capabilities?"
    options:
      - label: "People"
        explanation: "The People perspective is the bridge between technology and business: it focuses on culture, organizational structure, leadership and workforce transformation."
        correct: true
      - label: "Governance"
        explanation: "Governance orchestrates initiatives and manages the programs, projects and risks of the transformation; culture and skills belong to People."
      - label: "Platform"
        explanation: "Platform focuses on building a scalable cloud platform and modernizing applications; it does not address the team's culture or skills."
      - label: "Operations"
        explanation: "Operations ensures that cloud services are delivered at the level the business needs (observability, incidents, patches); it does not deal with organizational culture."
  - prompt: "A bank in Lima has already identified its opportunities and its capability gaps. It is now delivering pilots in production to demonstrate incremental value and learn from them. Which AWS CAF phase is it in?"
    options:
      - label: "Envision"
        explanation: "In Envision you show how the cloud will accelerate business outcomes and prioritize opportunities; pilots in production are not delivered yet."
      - label: "Align"
        explanation: "In Align you identify capability gaps, dependencies and stakeholder concerns; pilots in production come later."
      - label: "Launch"
        explanation: "In Launch you deliver pilots in production that demonstrate incremental value, and you learn from them."
        correct: true
      - label: "Scale"
        explanation: "In Scale you expand pilots and business value to the desired scale; those pilots must have been launched first."
  - prompt: "A retail chain in Bogotá adopts the cloud to create new products and services, reach new customers and enter new market segments. Which AWS CAF business outcome is it pursuing?"
    options:
      - label: "Reduced business risk"
        explanation: "Reducing business risk means lowering the risk profile through better reliability, performance and security, not creating products or reaching new customers."
      - label: "Increased revenue"
        explanation: "Increasing revenue is creating new products and services, reaching new customers and entering new market segments."
        correct: true
      - label: "Improved ESG performance"
        explanation: "Improving ESG performance is about using insights to improve sustainability and corporate transparency, not about opening new markets."
      - label: "Increased operational efficiency"
        explanation: "Increasing operational efficiency is reducing operating costs and increasing productivity; it does not describe creating products for new customers."
practice:
  - prompt: "At a mining company in Antofagasta, the chief risk officer (CRO) wants to orchestrate the cloud initiatives and manage the risks of the transformation's programs and projects. Which AWS CAF perspective covers these capabilities?"
    options:
      - label: "Security"
        explanation: "Security pursues the confidentiality, integrity and availability of data and workloads; managing the risks of transformation programs and projects is not its focus."
      - label: "Governance"
        explanation: "Governance orchestrates initiatives while maximizing benefits and minimizing risks, with capabilities such as program and project management and risk management."
        correct: true
      - label: "Business"
        explanation: "Business ensures that cloud investments accelerate business outcomes through strategy management and innovation; program risk management belongs to another perspective."
      - label: "Platform"
        explanation: "Platform focuses on building the cloud platform and modernizing applications with architects and engineers; it does not manage program risks."
  - prompt: "A pharmacy chain in Guayaquil is just starting its transformation: it wants to show how the cloud will accelerate its business outcomes, identify and prioritize opportunities, and assign them owners and metrics. Which AWS CAF phase is it in?"
    options:
      - label: "Envision"
        explanation: "In Envision you show how the cloud will accelerate business outcomes and identify and prioritize opportunities tied to owners and metrics."
        correct: true
      - label: "Align"
        explanation: "In Align you look for capability gaps across the six perspectives and dependencies between areas; it happens after prioritizing opportunities."
      - label: "Launch"
        explanation: "In Launch you deliver pilots in production that demonstrate incremental value; the chain has not reached that point yet."
      - label: "Scale"
        explanation: "In Scale you expand pilots and business value to the desired scale; pilots must have been launched first."
  - prompt: "The team of architects and engineers at a logistics company in Monterrey wants to build a scalable hybrid cloud platform, implement CI/CD and create cloud-native solutions. Which AWS CAF perspective applies?"
    options:
      - label: "People"
        explanation: "People addresses culture, leadership and workforce transformation; it is not in charge of the platform architecture or CI/CD."
      - label: "Governance"
        explanation: "Governance orchestrates initiatives and manages programs, risks and data governance; building the technical platform belongs to another perspective."
      - label: "Business"
        explanation: "Business is oriented toward strategy, portfolio and data monetization with stakeholders such as the CEO and CFO; it does not build the platform."
      - label: "Platform"
        explanation: "Platform pursues an enterprise-grade, scalable hybrid cloud platform, with capabilities such as platform architecture, modern application development and CI/CD."
        correct: true
  - prompt: "The CISO of a bank in Asunción asks to ensure the confidentiality, integrity and availability of data, with capabilities such as identity and access management and threat detection. Which AWS CAF perspective addresses this request?"
    options:
      - label: "People"
        explanation: "People focuses on culture, organizational structure and team skills; it does not protect data or detect threats."
      - label: "Business"
        explanation: "Business ensures that cloud investments accelerate business outcomes; it is not in charge of protecting data and workloads."
      - label: "Security"
        explanation: "Security pursues the confidentiality, integrity and availability of data and workloads, with capabilities such as identity and access management and threat detection."
        correct: true
      - label: "Governance"
        explanation: "Governance manages the programs, projects and risks of the transformation; data protection and threat detection belong to another perspective."
  - prompt: "A bottling company in San José, Costa Rica, wants to use insights from its cloud operations to improve its sustainability and its corporate transparency toward investors. Which AWS CAF business outcome is it pursuing?"
    options:
      - label: "Increased revenue"
        explanation: "Increasing revenue is creating new products and services and reaching new customers or markets; it is not about sustainability or transparency."
      - label: "Improved ESG performance"
        explanation: "Improving ESG (environmental, social and governance) performance is using insights to improve sustainability and corporate transparency."
        correct: true
      - label: "Increased operational efficiency"
        explanation: "Increasing operational efficiency is reducing operating costs and increasing productivity; the goal here is sustainability and transparency."
      - label: "Reduced business risk"
        explanation: "Reducing business risk is lowering the risk profile through better reliability, performance and security; it does not describe improving sustainability."
  - prompt: "According to the AWS CAF value chain, the four transformation domains enable one another in order. Which domain is the starting point that enables process transformation?"
    options:
      - label: "Product"
        explanation: "Product transformation (new value propositions and revenue models) is the last link in the chain, not the first."
      - label: "Organizational"
        explanation: "Organizational transformation (rethinking the operating model and organizing teams around products) is enabled by process transformation; it does not enable it."
      - label: "Process"
        explanation: "Process transformation (digitizing, automating and optimizing operations) is the one being enabled; the question asks for the domain that precedes it."
      - label: "Technology"
        explanation: "Technology transformation (migrating and modernizing infrastructure, applications and data) starts the chain and enables process transformation."
        correct: true
---

## Why does it matter?

An insurance company in Mexico City decided to "move to the cloud." The IT department started moving servers, but problems soon appeared that were not technical: managers did not know which benefits to measure, the team lacked the necessary skills, audit asked for new controls, and nobody had defined how to operate the systems once they were migrated.

Adopting the cloud is not just a technology project; it changes the whole organization. The **AWS Cloud Adoption Framework (AWS CAF)** exists to bring order to that change, and the exam asks about its **business outcomes**, its **perspectives** and its **phases**.

## What is the AWS CAF?

The AWS CAF brings together AWS experience and best practices to help organizations **digitally transform** with the cloud and reach their business goals. It identifies the **organizational capabilities** behind a successful transformation and groups them into **six perspectives**.

It is used to:

- Find and **prioritize transformation opportunities**.
- Assess **cloud readiness**: how prepared the organization is to take advantage of the cloud.
- Iteratively evolve the transformation **roadmap** over time.

A **capability** is an organization's ability to use processes and resources (people, technology and other assets) to achieve a specific outcome.

## Business outcomes the AWS CAF pursues

The exam mentions four key outcomes, exactly as AWS describes them:

| Outcome | What it means |
| --- | --- |
| **Reduced business risk** | Lower the risk profile through better reliability, increased performance and enhanced security. |
| **Improved ESG performance** (environmental, social and governance) | Use insights to improve sustainability and corporate transparency. |
| **Increased revenue** | Create new products and services, reach new customers and enter new market segments. |
| **Increased operational efficiency** | Reduce operating costs, increase productivity and improve the employee and customer experience. |

These outcomes are achieved through a **value chain** of four **transformation domains**: **technology** transformation (migrating and modernizing infrastructure, applications and data) enables **process** transformation (digitizing, automating and optimizing operations), which enables **organizational** transformation (rethinking the operating model and organizing teams around products), which in turn enables **product** transformation (new value propositions and revenue models).

## The six perspectives and their capabilities

| Perspective | Focus | Typical stakeholders | Example capabilities |
| --- | --- | --- | --- |
| **Business** | Ensure cloud investments accelerate digital transformation and business outcomes | CEO, CFO, COO, CIO, CTO | Strategy management, portfolio management, innovation, data monetization |
| **People** | Bridge between technology and business: culture, organizational structure, leadership and workforce | CIO, COO, CTO, cloud director | Culture evolution, transformational leadership, workforce transformation, change acceleration |
| **Governance** | Orchestrate initiatives while maximizing benefits and minimizing transformation risks | CFO, CIO, CTO, CDO, CRO | Program and project management, risk management, data governance, application portfolio management |
| **Platform** | Build an enterprise-grade, scalable hybrid cloud platform; modernize and create cloud-native solutions | CTO, architects, engineers | Platform architecture, data engineering, modern application development, CI/CD |
| **Security** | Achieve the confidentiality, integrity and availability of data and workloads | CISO, CCO, internal audit | Security governance, identity and access management, threat detection, incident response |
| **Operations** | Ensure cloud services are delivered at the level the business needs | Infrastructure and operations leaders, SREs | Observability, incident and problem management, patch management, availability and continuity management |

Memory trick: **Business, People and Governance** are more **business**-oriented perspectives; **Platform, Security and Operations** are more **technical**.

## The four transformation phases

The AWS CAF recommends moving forward **iteratively and incrementally**, instead of trying to do everything at once:

1. **Envision:** show how the cloud will accelerate business outcomes; identify and prioritize opportunities, and tie them to owners and metrics.
2. **Align:** identify capability gaps across the six perspectives, cross-organizational dependencies and stakeholder concerns, to improve readiness.
3. **Launch:** deliver **pilots in production** that demonstrate incremental value, and learn from them.
4. **Scale:** expand pilots and business value to the desired scale, and ensure the benefits are sustained.

## Adoption strategies and support

A healthy adoption strategy is **incremental**: demonstrate value quickly, learn and adjust the plan. AWS and the **AWS Partner Network** offer tools and services for every step, and **AWS Professional Services** provides offerings aligned with the AWS CAF to achieve concrete transformation outcomes. Specific migration strategies (the "7 Rs") are covered in the migration topic.

## Common exam traps

- **Confusing perspectives with phases.** Business, People, Governance, Platform, Security and Operations are perspectives; Envision, Align, Launch and Scale are phases.
- **Assigning culture and skills to Governance.** That is the **People** perspective.
- **Assigning program risk management to Security.** Managing transformation and portfolio risks is **Governance**; Security protects data and workloads.
- **Thinking the CAF is only technical.** Half of its perspectives focus on the business and on people.
- **Forgetting the ESG outcome.** Improving environmental, social and governance performance is one of the four key outcomes.

## Exam summary

- The AWS CAF guides digital transformation with the cloud and measures the organization's readiness.
- Key outcomes: reduced business risk, improved ESG performance, increased revenue and increased operational efficiency.
- Transformation domains: technology → process → organizational → product.
- Six perspectives: Business, People, Governance, Platform, Security and Operations.
- Business/People/Governance = business; Platform/Security/Operations = technical.
- Four iterative phases: Envision, Align, Launch and Scale.
- Launch = pilots in production; Scale = expand and sustain the value.
