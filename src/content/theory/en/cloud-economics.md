---
title: "Cloud economics: fixed costs, variable costs and savings"
summary: "Compare fixed and variable costs, the hidden costs of your own data center, BYOL versus license-included, rightsizing and the savings from automation."
domain: "cloud-concepts"
order: 4
examTasks: ["1.4"]
services: ["AWS License Manager", "AWS Compute Optimizer", "Amazon RDS"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-dp.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html"
  - "https://docs.aws.amazon.com/wellarchitected/latest/life-sciences-lens/lsperf06-bp02.html"
  - "https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html"
  - "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"
  - "https://aws.amazon.com/economics/"
quiz:
  - prompt: "A supermarket chain in Bogotá buys servers up front, sized for its peak demand, and pays for them even when they sit idle. It wants to pay only when it consumes resources and only for what it consumes. Which cloud advantage describes this change?"
    options:
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale explain why AWS offers lower prices thanks to the aggregate volume of its customers, not the shift from paying up front to paying for consumption."
      - label: "Trade fixed expense for variable expense"
        explanation: "Trading fixed expense (CapEx on servers bought before you know how they will be used) for variable expense means paying only when you consume and only for what you consume."
        correct: true
      - label: "Stop spending money running and maintaining data centers"
        explanation: "This advantage is about leaving the heavy lifting of racking, stacking and powering servers to AWS, not about moving from a fixed up-front payment to one based on consumption."
      - label: "Rightsizing with AWS Compute Optimizer"
        explanation: "Rightsizing matches the type and size of resources to actual usage, but it is not the advantage that describes trading a fixed payment for one based on consumption."
  - prompt: "A company in Lima has already paid for valid Oracle licenses and wants to use them with Amazon RDS for Oracle instead of paying for new licenses. Which licensing strategy should it choose?"
    options:
      - label: "License included"
        explanation: "With license included, AWS holds the license and its cost is built into the service price; it suits you when you have no licenses, not when you want to reuse the ones you already paid for."
      - label: "Use AWS License Manager to estimate the cost of the cloud"
        explanation: "AWS License Manager manages licenses and helps avoid non-compliance, but it does not calculate or estimate cloud costs."
      - label: "BYOL (Bring Your Own License)"
        explanation: "With BYOL you reuse the licenses you already bought, always following the vendor's licensing rules."
        correct: true
      - label: "Rightsizing the database instance"
        explanation: "Rightsizing matches the type and size of resources to actual usage; it does not decide who provides the Oracle license."
  - prompt: "A startup in Santiago suspects that several of its instances are oversized and others are idle. It wants recommendations based on configuration and usage metrics to adjust their type and size. Which AWS service should it use?"
    options:
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages licenses from vendors such as Microsoft or Oracle across accounts and Regions; it does not give resource sizing recommendations."
      - label: "Amazon RDS with license included"
        explanation: "This is a managed database option with the license built into the price; it does not analyze your resource usage to recommend size adjustments."
      - label: "BYOL (Bring Your Own License)"
        explanation: "BYOL is a strategy to reuse licenses you already own; it does not identify oversized or idle resources."
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer analyzes configuration and usage metrics to give rightsizing recommendations and identify idle resources, reducing costs."
        correct: true
practice:
  - prompt: "A transportation company in Córdoba asks why AWS can charge lower pay-as-you-go prices than what it would cost to buy its own hardware. The answer is that AWS aggregates the usage of hundreds of thousands of customers. Which cloud advantage does this describe?"
    options:
      - label: "Trade fixed expense for variable expense"
        explanation: "This advantage is about paying only for what you consume instead of investing up front; it does not explain why the unit price is lower."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "This advantage is about leaving the work of racking, stacking and powering servers to AWS, not about the aggregate volume of customers."
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale lower the cost per unit as volume grows; the aggregate usage of many customers translates into lower pay-as-you-go prices."
        correct: true
      - label: "Rightsizing resources"
        explanation: "Rightsizing matches the type and size of your resources to actual usage; it does not explain why AWS offers lower prices."
  - prompt: "The CFO of an insurance company in Panama compares the cloud with its data center by looking only at the price of the servers. For a total cost of ownership (TCO) analysis, which other costs must be added?"
    options:
      - label: "Power, cooling, physical space and specialized staff"
        explanation: "The TCO of your own environment includes, besides hardware and licenses, power, cooling, physical space and the staff who install and repair the equipment."
        correct: true
      - label: "Only software licenses, because the hardware is already in the price"
        explanation: "Licenses are part of TCO, but this leaves out power, cooling, space and staff."
      - label: "Only the periodic replacement of hardware"
        explanation: "Hardware replacement is only one part; TCO also adds power, cooling, physical space and staff."
      - label: "The volume discounts that AWS offers"
        explanation: "Volume discounts are a benefit of the cloud, not a cost of running your own data center."
  - prompt: "A startup in Medellín needs an Amazon RDS for Oracle database, has no Oracle licenses and wants the simplest option, with the license cost built into the service price. Which licensing model should it choose?"
    options:
      - label: "BYOL (Bring Your Own License)"
        explanation: "BYOL is for reusing licenses you already bought; the startup has no Oracle licenses."
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages licenses and helps avoid non-compliance; it is not a licensing model that includes the license in the price."
      - label: "Rightsizing the instance"
        explanation: "Rightsizing adjusts the type and size of the resource; it does not settle who provides the Oracle license."
      - label: "License included"
        explanation: "With license included, AWS holds the license and its cost is built into the service price, ideal when you have no licenses and want simplicity."
        correct: true
  - prompt: "An industrial group in São Paulo uses Microsoft and Oracle licenses across several AWS accounts and Regions. It wants to define rules with limits to prevent overuse and have dashboards for audits. Which service should it use?"
    options:
      - label: "AWS Compute Optimizer"
        explanation: "AWS Compute Optimizer gives rightsizing recommendations based on usage metrics; it does not enforce license limits."
      - label: "AWS License Manager"
        explanation: "AWS License Manager manages licenses from vendors such as Microsoft and Oracle across accounts and Regions, with limit rules and dashboards for audits."
        correct: true
      - label: "Amazon RDS with license included"
        explanation: "This is a database option with the license built into the price; it does not let you define rules to control license usage across several accounts."
      - label: "Rightsizing the instances"
        explanation: "Rightsizing adjusts the type and size of resources; it does not prevent violations of licensing rules."
  - prompt: "The development and test environments of a software factory in Montevideo are used about eight hours a day, Monday to Friday, but stay running all 168 hours of the week. Which practice directly tackles this spending?"
    options:
      - label: "Automate shutting down the environments outside working hours"
        explanation: "Stopping the environments outside the 40 hours of weekly use allows potential savings of about 75%, according to the AWS example."
        correct: true
      - label: "Size the environments for peak demand and leave them running"
        explanation: "Sizing for the peak and leaving it running is exactly paying for idle capacity, the opposite of the goal."
      - label: "Move them to an on-premises data center to turn the spending into CapEx"
        explanation: "Buying your own infrastructure turns the spending into a fixed cost, which you pay even when the environments are not used."
      - label: "Use AWS License Manager to control the environments' schedule"
        explanation: "AWS License Manager manages licenses and their compliance; it does not shut down environments outside working hours."
  - prompt: "A restaurant chain in Lima wants its IT team to stop racking, stacking and powering servers and to focus on improving its customers' experience. Which cloud advantage describes this goal?"
    options:
      - label: "Trade fixed expense for variable expense"
        explanation: "This advantage is about trading up-front payments for payments based on consumption, not about freeing the team from the physical work of the data center."
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale explain lower prices due to AWS's volume, not the team no longer operating servers."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "AWS takes care of the heavy lifting of running data centers, such as racking, stacking and powering servers, so your team can focus on your customers."
        correct: true
      - label: "BYOL (Bring Your Own License)"
        explanation: "BYOL is a strategy for reusing existing licenses; it does not free the team from operating servers."
---

## Why does it matter?

A supermarket chain in Bogotá has to replace the servers in its data center. The vendor asks for a large up-front payment, the lease on the building that houses the equipment goes up every year, and the IT department needs two more technicians to handle failures. On top of that, the company has already paid for database licenses it does not want to lose.

The finance team asks: how much would we save in the cloud, and why? To answer, you need the **cloud economics** concepts the exam tests.

## Fixed costs versus variable costs

- **Fixed cost:** you pay it even when the resource is not used. Buying servers is the classic example: it is a **capital expenditure (CapEx)** made before you know how much they will be used.
- **Variable cost:** it rises or falls with actual consumption. It is an **operating expense (OpEx)**.

The first of AWS's six advantages of cloud computing is precisely **trade fixed expense for variable expense**: instead of investing heavily in data centers and servers before you know how you will use them, you pay only when you consume resources and only for what you consume.

| | On-premises | AWS Cloud |
| --- | --- | --- |
| Type of spending | Mostly fixed (CapEx) | Mostly variable (OpEx) |
| Capacity | Bought with peak demand in mind | Adjusts to actual demand |
| Idle resources | You pay for them anyway | You can turn them off and stop paying |

## The costs of an on-premises environment

When comparing with the cloud, looking at the price of the server is not enough. A **total cost of ownership** (**TCO**) analysis adds up everything it costs to own infrastructure over its useful life:

- **Hardware:** servers, storage and networking, and their periodic replacement.
- **Software licenses.**
- **Power** to run the equipment.
- **Cooling** for the data center.
- **Physical space** (the building or the server room).
- Specialized **staff** to install, maintain and repair.

AWS takes care of the heavy lifting of running data centers, such as racking, stacking and powering servers, so your team can focus on your customers. This corresponds to the **stop spending money running and maintaining data centers** advantage and to the cost design principle "stop spending money on undifferentiated heavy lifting".

## Economies of scale

**Economies of scale** mean that the cost per unit drops as volume rises. Because AWS aggregates the usage of hundreds of thousands of customers, it achieves lower costs that translate into **lower pay-as-you-go prices**. A single company buying its own hardware cannot reach that volume. On the exam, "lower prices because AWS operates at massive scale" = economies of scale.

## Licensing strategies: BYOL versus license included

| | **License included** | **BYOL** (*Bring Your Own License*) |
| --- | --- | --- |
| Who holds the license? | AWS; the cost is built into the service price | You; you reuse licenses you already bought |
| When it makes sense | You have no licenses or want simplicity | You already paid for valid licenses and want to use them |
| Example | Amazon RDS for Oracle Standard Edition 2 with license included | Amazon RDS for Oracle with your own Oracle licenses |

With BYOL you must follow the vendor's licensing rules. For example, in a Multi-AZ deployment of RDS for Oracle with BYOL, you need a license for the primary instance and also for the standby.

**AWS License Manager** helps you manage licenses from vendors such as Microsoft, SAP, Oracle and IBM across accounts and Regions. It lets you define rules with limits to prevent overuse and non-compliance, offers dashboards for audits and makes it easier to take advantage of BYOL. In supported cases, it also lets you switch between AWS-provided licenses and BYOL without redeploying.

## Rightsizing

**Rightsizing** means matching the type and size of resources to what the workload actually needs. An oversized server wastes money; an undersized one hurts performance. **AWS Compute Optimizer** analyzes the configuration and usage metrics of your resources to give rightsizing recommendations and identify idle resources, with the goal of reducing costs and improving performance.

## Benefits of automation

Automating tasks that used to be done by hand also saves money:

- **Consistent** responses to events, **fewer human errors** and less repetitive work for the team (an operational excellence principle).
- **Turning resources off when they are not in use.** AWS gives an example: development and test environments are typically used about eight hours a day, Monday to Friday; if they are stopped outside those hours, the potential savings are **75%** (40 hours versus 168).
- Scaling automatically with demand, without paying for idle capacity.

## How moving to the cloud saves costs

In short: you pay only for what you consume, benefit from low prices due to scale, eliminate the costs of your own facilities and hardware, rightsize your resources and automate. AWS also points out that the value of the cloud goes beyond TCO: it includes staff productivity, operational resilience and business agility.

## Common exam traps

- **Thinking your own data center only costs the hardware.** Power, cooling, space and staff count too.
- **Confusing BYOL with license included.** If the company already has licenses and wants to reuse them, it is BYOL.
- **Confusing economies of scale with variable expense.** "Low prices due to AWS's volume" is scale; "pay only for what I use" is variable expense.
- **Believing rightsizing always means making resources bigger.** It usually means shrinking oversized ones.
- **Choosing AWS License Manager to estimate prices.** License Manager manages licenses; it does not calculate cloud costs.

## Exam summary

- Fixed cost = paid even when unused; variable cost = based on consumption.
- The cloud trades CapEx for variable OpEx.
- On-premises TCO: hardware, licenses, power, cooling, space and staff.
- Economies of scale = lower prices due to AWS's aggregate volume.
- BYOL = reuse your licenses; license included = the license is in the price.
- AWS License Manager = manage licenses and avoid non-compliance.
- Rightsizing = match type and size to actual usage, supported by AWS Compute Optimizer.
- Automation reduces errors and lets you turn off idle resources.
