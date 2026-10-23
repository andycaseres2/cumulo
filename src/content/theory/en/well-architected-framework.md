---
title: "AWS Well-Architected Framework: the six pillars"
summary: "Get to know the AWS Well-Architected Framework, its six pillars and their design principles, and how to tell each pillar apart in an exam scenario."
domain: "cloud-concepts"
order: 3
examTasks: ["1.2"]
services: ["AWS Well-Architected Tool"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-design.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-design-principles.html"
  - "https://aws.amazon.com/well-architected-tool/"
quiz:
  - prompt: "A fintech in Santiago decides to deploy frequent, small, reversible changes and to manage its operations as code. Which pillar of the AWS Well-Architected Framework does this practice belong to?"
    options:
      - label: "Operational excellence"
        explanation: "Making frequent, small, reversible changes and automating operations (for example, as code) are design principles of operational excellence."
        correct: true
      - label: "Security"
        explanation: "Security focuses on identity, traceability and data protection; small, reversible changes are not a principle of this pillar."
      - label: "Reliability"
        explanation: "Reliability focuses on recovering from failures and testing recovery; the scenario describes how to operate and deploy changes."
      - label: "Performance efficiency"
        explanation: "Performance efficiency is about choosing the right resources and using them efficiently, not about how changes are deployed."
  - prompt: "A logistics company in Lima wants to reduce the energy consumption and environmental footprint of its workload by maximizing utilization and avoiding idle resources. Which pillar guides this goal?"
    options:
      - label: "Cost optimization"
        explanation: "Cost optimization aims to deliver value at the lowest price point; the scenario's goal is to reduce energy consumption and environmental impact, not spending."
      - label: "Performance efficiency"
        explanation: "Performance efficiency aims to meet performance requirements with the right resources, not to reduce environmental impact."
      - label: "Sustainability"
        explanation: "Sustainability focuses on environmental impact, especially energy consumption, and one of its principles is to maximize utilization."
        correct: true
      - label: "Reliability"
        explanation: "Reliability is about performing the intended function correctly and consistently and recovering from failures, not reducing the environmental footprint."
  - prompt: "The team at an online store in Buenos Aires wants to review its workload with the framework. What does the AWS Well-Architected Tool do?"
    options:
      - label: "It automatically applies the changes needed to fix the architecture's risks"
        explanation: "The AWS Well-Architected Tool assesses and recommends; you decide on and implement the changes, it does not apply them automatically."
      - label: "It reviews and measures the workload, identifies high-risk issues (HRIs) and saves milestones of your progress"
        explanation: "The AWS WA Tool provides a consistent process to review and measure workloads, identify HRIs, get an improvement plan and save milestones."
        correct: true
      - label: "It performs a formal compliance audit of the AWS account"
        explanation: "AWS makes clear that a Well-Architected review is a constructive conversation, not an audit."
      - label: "It automatically scales the workload's resources based on demand"
        explanation: "Scaling resources based on demand is not a function of the AWS Well-Architected Tool; the tool is for reviewing the architecture, not scaling it."
practice:
  - prompt: "A bank in Asunción applies least privilege and separation of duties to its users, and encrypts its customers' data in transit and at rest. Which pillar of the AWS Well-Architected Framework is it following?"
    options:
      - label: "Operational excellence"
        explanation: "Operational excellence is about organizing teams, observing, automating and making small, reversible changes, not about identity and encryption."
      - label: "Security"
        explanation: "Security includes implementing a strong identity foundation with least privilege and separation of duties, and protecting data in transit and at rest."
        correct: true
      - label: "Reliability"
        explanation: "Reliability focuses on recovering from failures and testing recovery, not on controlling access or encrypting data."
      - label: "Cost optimization"
        explanation: "Cost optimization aims to deliver value at the lowest price point; the scenario is about protecting data and access."
  - prompt: "A government services portal in Mexico City periodically simulates failures to check that its workload recovers automatically, and spreads traffic across several small resources instead of one large one. Which pillar applies?"
    options:
      - label: "Performance efficiency"
        explanation: "Performance efficiency is about choosing and using the right resources; recovering from failures belongs to reliability."
      - label: "Security"
        explanation: "Security focuses on identity, traceability and data protection, not on testing recovery from failures."
      - label: "Sustainability"
        explanation: "Sustainability aims to reduce environmental impact and energy consumption; the scenario's goal is to stay up."
      - label: "Reliability"
        explanation: "Automatically recovering from failure, testing recovery procedures and scaling horizontally are reliability principles."
        correct: true
  - prompt: "A music app in Bogotá wants to serve users on other continents with lower latency: it decides to go global in minutes, use serverless architectures and experiment more often. Which pillar of the framework guides these decisions?"
    options:
      - label: "Performance efficiency"
        explanation: "Going global in minutes, using serverless architectures and experimenting more often are performance efficiency principles."
        correct: true
      - label: "Reliability"
        explanation: "Reliability is about performing the function consistently and recovering from failures; the scenario seeks lower latency and efficient resources."
      - label: "Operational excellence"
        explanation: "Operational excellence focuses on how to operate and evolve the workload, with observability and reversible changes, not on latency."
      - label: "Sustainability"
        explanation: "Sustainability aims to reduce environmental impact; the scenario's goal is performance for distant users."
  - prompt: "To reduce its AWS bill, a university in Córdoba shuts down its development environments outside business hours and attributes cloud spending to each workload owner. Which pillar applies?"
    options:
      - label: "Sustainability"
        explanation: "Sustainability aims to reduce environmental impact; here the stated goal is to spend less, which belongs to cost."
      - label: "Performance efficiency"
        explanation: "Performance efficiency is about meeting performance requirements with the right resources, not attributing spending."
      - label: "Cost optimization"
        explanation: "Adopting a consumption model, such as shutting down development environments after hours, and analyzing and attributing expenditure are cost optimization principles."
        correct: true
      - label: "Reliability"
        explanation: "Reliability focuses on recovering from failures; shutting down environments and attributing costs is not about avoiding outages."
  - prompt: "In an exam prep course in Lima, the instructor asks which of these is one of the six official pillars of the AWS Well-Architected Framework. What do you answer?"
    options:
      - label: "Scalability"
        explanation: "Scalability is not a pillar; scaling horizontally appears as a design principle within the reliability pillar."
      - label: "Sustainability"
        explanation: "Sustainability is the sixth official pillar, alongside operational excellence, security, reliability, performance efficiency and cost optimization."
        correct: true
      - label: "Compliance"
        explanation: "Compliance is not one of the six pillars; the pillars are operational excellence, security, reliability, performance efficiency, cost optimization and sustainability."
      - label: "Automation"
        explanation: "Automation is not a pillar; automating appears as a design principle in several pillars, such as operational excellence and security."
  - prompt: "An insurance company in Valparaíso reviewed its workload with the AWS Well-Architected Tool and wants to save a snapshot of the review's current state to compare its progress later. Which feature of the tool does it use?"
    options:
      - label: "A high-risk issue (HRI)"
        explanation: "An HRI is a high-risk problem the tool identifies in the workload, not a snapshot of the review's state."
      - label: "A custom lens"
        explanation: "Custom lenses let you review the workload with your own questions; they do not save the state to measure progress."
      - label: "A design principle"
        explanation: "Design principles are general rules in each pillar for making good decisions; they are not a feature for saving state."
      - label: "A milestone"
        explanation: "Milestones are point-in-time snapshots that the AWS WA Tool saves so you can measure your progress over time."
        correct: true
---

## Why does it matter?

A fintech in Santiago launched its payments app on AWS in a few weeks. It worked, but questions soon came up: what happens if an Availability Zone fails? Who has access to customer data? Why did the bill grow so much? Can we deploy changes without fear? Each question touches a different aspect of a good architecture.

The **AWS Well-Architected Framework** organizes those questions into six **pillars**. The exam will ask you to recognize each pillar and tell it apart from the others based on a short scenario.

## What is the AWS Well-Architected Framework?

It is a set of architectural **best practices** that AWS documents based on its experience reviewing thousands of customer architectures. It helps you understand the pros and cons of the decisions you make when building systems on AWS, and design and operate secure, reliable, efficient, cost-effective and sustainable workloads.

Key ideas:

- It is based on a set of **foundational questions** to evaluate whether an architecture follows cloud best practices.
- AWS makes clear that a review is **a constructive conversation, not an audit**.
- Each pillar has **design principles**: general rules for making good decisions.

The **AWS Well-Architected Tool (AWS WA Tool)** is a service in the console that provides a consistent process to **review and measure** your workloads against the framework. AWS states that the review is offered **at no cost**. With it you answer questions about your workload, identify **high-risk issues** (HRIs), get an action plan for improvement and save **milestones** (point-in-time snapshots) to measure your progress. It also supports *custom lenses*.

## The six pillars and their design principles

### 1. Operational excellence

AWS defines it as a commitment to build software correctly while consistently delivering a great customer experience. It brings together practices to **organize the team, design, operate at scale and evolve** the workload. Design principles: organize teams around business outcomes, implement observability for actionable insights, safely automate where possible (including operations as code), make **frequent, small, reversible changes**, refine operations procedures frequently, anticipate failure, learn from all operational events and use managed services.

### 2. Security

It covers the ability to **protect data, systems and assets**, taking advantage of the cloud to improve security. Principles: implement a **strong identity foundation** (least privilege, separation of duties), maintain **traceability**, apply security **at all layers**, automate security best practices, protect data **in transit and at rest**, keep people away from data and prepare for security events.

### 3. Reliability

It covers the ability of a workload to **perform its intended function correctly and consistently** when it is expected to, including the ability to operate and test it throughout its lifecycle. Principles: automatically recover from failure, **test recovery procedures**, scale horizontally to increase availability (several small resources instead of one large one), stop guessing capacity and manage change through automation.

### 4. Performance efficiency

It includes the ability to use cloud resources **efficiently** to meet performance requirements, and to maintain that efficiency as demand and technology change. Principles: democratize advanced technologies (consume them as a service), go global in minutes, use **serverless architectures**, experiment more often and consider "mechanical sympathy" (choose the technology that best fits the usage pattern).

### 5. Cost optimization

It includes the ability to run systems that **deliver business value at the lowest price point**. Principles: implement Cloud Financial Management, adopt a **consumption model** (pay only for what you need; for example, shut down development environments outside business hours), measure overall efficiency, stop spending money on undifferentiated heavy lifting and **analyze and attribute expenditure** to each workload owner.

### 6. Sustainability

It focuses on **environmental impact**, especially energy consumption and efficiency, to reduce resource usage. Principles: understand your impact, establish sustainability goals, **maximize utilization** (rightsize and avoid idle resources), adopt new, more efficient hardware and software offerings, use managed services and reduce the *downstream* impact (on your customers' devices).

## How to tell the pillars apart in a scenario

| Keywords in the question | Pillar |
| --- | --- |
| Runbooks, observability, small and reversible changes, operations as code | Operational excellence |
| Least privilege, encryption, traceability, incident response | Security |
| Recover from failures, test recovery, scale horizontally | Reliability |
| Choose the right resource type, serverless, lower latency, experiment | Performance efficiency |
| Pay only for what you need, remove idle resources to save money, attribute spending | Cost optimization |
| Reduce energy and environmental footprint, maximize utilization | Sustainability |

Some principles appear in more than one pillar. "Use managed services" is in operational excellence and in sustainability; "stop guessing capacity" is in reliability. Look at the scenario's **goal**: if the goal is to spend less, it is cost; if it is to pollute less, it is sustainability; if it is to stay up, it is reliability.

## Common exam traps

- **Confusing reliability with performance efficiency.** Recovering from failures is reliability; choosing the best-performing resource is performance efficiency.
- **Forgetting the sixth pillar.** Sustainability is an official pillar, not part of cost optimization.
- **Thinking a Well-Architected review is an audit.** AWS defines it as a constructive conversation.
- **Believing the AWS Well-Architected Tool applies changes automatically.** It assesses and recommends; you decide and implement.
- **Assigning "small, frequent, reversible changes" to security.** It is an operational excellence principle.

## Exam summary

- The framework brings together best practices for secure, reliable, efficient, cost-effective and sustainable workloads.
- Six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability.
- Operational excellence = operate, observe and improve; small, reversible changes.
- Security = strong identity, traceability, encryption, security at all layers.
- Reliability = recover from failures and test recovery.
- Performance efficiency = use the right resources, serverless, go global.
- Cost optimization = consumption model and attribution of spending.
- Sustainability = minimize environmental impact and maximize utilization.
- AWS Well-Architected Tool = review workloads, detect high risks and save milestones.
