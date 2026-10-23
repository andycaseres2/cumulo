---
title: "Benefits of the AWS Cloud"
summary: "Understand the AWS value proposition, its six official advantages and the benefits of the global infrastructure: high availability, elasticity and agility."
domain: "cloud-concepts"
order: 1
examTasks: ["1.1"]
services: []
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html"
  - "https://aws.amazon.com/about-aws/global-infrastructure/"
  - "https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html"
quiz:
  - prompt: "A startup in Montevideo gets lower pay-as-you-go prices on AWS than it could achieve by buying its own hardware, because AWS aggregates usage from hundreds of thousands of customers. Which cloud advantage does this situation describe?"
    options:
      - label: "Trade fixed expense for variable expense"
        explanation: "This advantage is about paying only when you consume and only for what you consume, not about lower prices from the aggregate volume of customers."
      - label: "Benefit from massive economies of scale"
        explanation: "By aggregating usage from hundreds of thousands of customers, AWS achieves lower costs that translate into lower pay-as-you-go prices."
        correct: true
      - label: "Stop guessing capacity"
        explanation: "This advantage refers to scaling up or down with only a few minutes' notice, not to the prices that come from AWS's scale."
      - label: "Go global in minutes"
        explanation: "This advantage is about deploying in multiple Regions around the world in a few clicks; the scenario is about prices, not geographic reach."
  - prompt: "An online store in Quito needs its application to keep running even if part of the infrastructure fails. Which concept is it looking for, and how does it achieve it on AWS?"
    options:
      - label: "Elasticity, adding and removing servers automatically based on traffic"
        explanation: "Elasticity responds to changes in demand, not to failures; the scenario asks to keep running when something fails."
      - label: "Agility, getting resources in minutes instead of weeks"
        explanation: "Agility is the speed of getting resources and experimenting; it does not protect the application from an infrastructure failure."
      - label: "Go global in minutes, deploying in a Region close to its users"
        explanation: "Bringing the application closer to users reduces latency, but the scenario asks to tolerate failures, not to improve response time."
      - label: "High availability, deploying the application across multiple Availability Zones"
        explanation: "High availability means continuing to run even if part of the infrastructure fails, and you achieve it by deploying across multiple AZs so you do not depend on a single point of failure."
        correct: true
  - prompt: "A bank in Bogotá used to wait weeks to get new servers; on AWS it gets them in minutes and can test a new app in an afternoon at low cost. Which cloud advantage is it taking advantage of?"
    options:
      - label: "Increase speed and agility"
        explanation: "With this advantage, new resources are a click away: the time to get them drops from weeks to minutes, and experimenting costs less."
        correct: true
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale explain lower prices thanks to the volume of AWS customers, not the speed of getting resources and experimenting."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "This advantage is about no longer racking, stacking and powering servers; the scenario highlights the speed of testing ideas."
      - label: "Go global in minutes"
        explanation: "This advantage is about reaching users in multiple Regions around the world; the bank wants speed to experiment, not global reach."
practice:
  - prompt: "A handicrafts store in Oaxaca makes almost all its sales in peak season. It used to buy servers with a large upfront payment; on AWS its bill goes up in peak season and down the rest of the year, based on what it uses. Which cloud advantage does this change describe?"
    options:
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale explain lower prices because AWS aggregates many customers; the scenario is about paying only for what you consume."
      - label: "Go global in minutes"
        explanation: "This advantage is about deploying in multiple Regions around the world in a few clicks; it does not describe the change in how you pay."
      - label: "Trade fixed expense for variable expense"
        explanation: "This advantage means no longer investing upfront and paying only when you consume and only for what you consume."
        correct: true
      - label: "Increase speed and agility"
        explanation: "This advantage is about getting resources in minutes instead of weeks; the scenario focuses on the payment model."
  - prompt: "A ticketing company in Bogotá never knows how much demand it will have: it used to buy too many servers or fall short. On AWS it scales up or down with only a few minutes' notice. Which advantage is it taking advantage of?"
    options:
      - label: "Stop guessing capacity"
        explanation: "With this advantage you no longer guess how much infrastructure you need: you scale up or down with only a few minutes' notice."
        correct: true
      - label: "Go global in minutes"
        explanation: "Go global in minutes is about reaching users in multiple Regions; unpredictable demand is solved with stop guessing capacity."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "This advantage is about no longer racking, stacking and powering servers; it does not describe scaling to uncertain demand."
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale explain lower prices thanks to the volume of AWS customers, not the ability to scale with minutes' notice."
  - prompt: "A cooperative in Arequipa closed its server room when it migrated to AWS: it no longer replaces failed disks or maintains the cooling, and its team spends that time on what differentiates its business. Which cloud advantage does this case describe?"
    options:
      - label: "Increase speed and agility"
        explanation: "This advantage is about getting resources in minutes and experimenting at low cost; the scenario highlights no longer operating servers."
      - label: "Trade fixed expense for variable expense"
        explanation: "This advantage is about paying only for what you consume; the scenario is about freeing the team from physical work with servers."
      - label: "Stop guessing capacity"
        explanation: "This advantage is about scaling with minutes' notice without guessing capacity; it does not describe no longer racking and stacking servers."
      - label: "Stop spending money running and maintaining data centers"
        explanation: "With this advantage you focus on what differentiates your business instead of racking, stacking and powering servers."
        correct: true
  - prompt: "An online learning platform in Santiago wants to reach students in Mexico and Spain with lower latency, deploying its application in multiple Regions in a few clicks and at minimal cost. Which cloud advantage is it taking advantage of?"
    options:
      - label: "Stop guessing capacity"
        explanation: "This advantage is about scaling to demand with minutes' notice; the scenario wants to get closer to users in other countries."
      - label: "Go global in minutes"
        explanation: "This advantage lets you deploy in multiple Regions around the world in a few clicks, with lower latency for customers and at minimal cost."
        correct: true
      - label: "Trade fixed expense for variable expense"
        explanation: "This advantage is about paying only for what you consume; it does not describe deploying in other Regions to reduce latency."
      - label: "Benefit from massive economies of scale"
        explanation: "Economies of scale explain lower prices thanks to the volume of AWS customers; they are not about geographic reach."
  - prompt: "A news site in Buenos Aires gets unpredictable traffic spikes and wants to add and remove servers automatically based on demand, without overprovisioning or falling short. Which concept describes this need?"
    options:
      - label: "High availability"
        explanation: "High availability responds to infrastructure failures; the scenario is about changes in demand."
      - label: "Agility"
        explanation: "Agility is the speed of getting resources and experimenting; it does not describe automatic adjustment to traffic."
      - label: "Elasticity"
        explanation: "Elasticity is increasing or decreasing resources automatically based on demand, adding and removing servers as traffic rises or falls."
        correct: true
      - label: "Global reach"
        explanation: "Global reach is about placing the application close to users to reduce latency, not about adjusting to traffic spikes."
  - prompt: "The finance manager of a distributor in Asunción believes that migrating to AWS will make all of the company's technology costs disappear. Which statement is correct?"
    options:
      - label: "The cloud eliminates all technology costs"
        explanation: "The cloud changes the type of expense, but it does not make it disappear; the company keeps paying for what it consumes."
      - label: "The cloud trades capital expense (CapEx) for variable operational expense (OpEx), but does not make it disappear"
        explanation: "With the cloud you stop investing upfront in physical assets and pay as you consume; the expense changes type, but it still exists."
        correct: true
      - label: "The cloud turns variable operational expense into capital expense"
        explanation: "It is the other way around: the cloud trades upfront capital expense for variable expense that you pay based on consumption."
      - label: "The cloud requires paying upfront for a full year of capacity"
        explanation: "The cloud works on a pay-as-you-go basis: you pay as you consume, instead of investing upfront in capacity."
---

## Why does it matter?

Imagine a bakery in Lima that sells panettone online. For eleven months of the year its online store gets few visits, but in December visits multiply and the site goes down just when the most customers want to buy. To avoid this, the owner would have two traditional paths: buy large servers that will sit unused most of the year, or risk losing sales at Christmas.

Cloud computing offers a third path: use technology resources **when you need them and pay only for what you use**. That change in mindset is the foundation of the entire AWS Certified Cloud Practitioner exam, and AWS sums it up in six advantages worth knowing by name.

## The AWS Cloud value proposition

**Cloud computing** is the on-demand delivery of technology resources, such as servers, storage, databases and networking, over the internet with **pay-as-you-go** pricing.

The **value proposition** is the answer to "why would a company choose the AWS Cloud?". In short: pay only for what you consume, get lower prices thanks to AWS's scale, have resources in minutes, stop guessing capacity, stop putting effort into operating data centers, and reach customers all over the world.

Two terms you will see a lot:

- **Capital expense (CapEx):** money invested upfront in physical assets, such as buying servers.
- **Operational expense (OpEx) or variable expense:** money paid as you consume a service, like an electricity bill.

## The six advantages of cloud computing according to AWS

AWS officially describes six advantages. The exam uses their official names, so learn them as written.

| Advantage (official name) | What it means | Example |
| --- | --- | --- |
| **Trade fixed expense for variable expense** | Instead of investing heavily in data centers before you know how you will use them, you pay only when you consume and only for what you consume. | The bakery pays for more servers only in December. |
| **Benefit from massive economies of scale** | Because AWS aggregates usage from hundreds of thousands of customers, it achieves lower costs that translate into lower pay-as-you-go prices. | A startup gets prices it could not achieve buying hardware on its own. |
| **Stop guessing capacity** | You no longer have to guess how much infrastructure you will need; you scale up or down with only a few minutes' notice. | No idle servers and no site going down for lack of capacity. |
| **Increase speed and agility** | New resources are "a click away"; the time to get them drops from weeks to minutes, and experimenting costs less. | A bank in Bogotá tests a new app in an afternoon. |
| **Stop spending money running and maintaining data centers** | You focus on what differentiates your business, not on racking, stacking and powering servers. | The IT team spends its time improving the online store. |
| **Go global in minutes** | You deploy your application in multiple Regions around the world in a few clicks, with lower latency for your customers and at minimal cost. | A Chilean streaming platform reaches users in Mexico and Spain. |

## Benefits of the global infrastructure

The AWS infrastructure is organized into **Regions** and **Availability Zones (AZs)**. A **Region** is a physical location in the world with multiple AZs. An **AZ** consists of one or more discrete data centers, each with redundant power, networking and connectivity. The number of Regions and AZs changes often; check it on the official global infrastructure page.

What you do need to know are their benefits:

- **Speed of deployment:** you can launch an application in a new Region in a few clicks, without building or renting a data center in that country.
- **Global reach:** you place the application close to your users to give them **lower latency** (less response time) and a better experience.
- **Availability and fault tolerance:** by spreading an application across multiple AZs, you get systems that are more highly available, fault tolerant and scalable than with a single data center.

## High availability, elasticity and agility

These three ideas come up again and again on the exam:

| Concept | Definition | How you achieve it on AWS |
| --- | --- | --- |
| **High availability** | The application keeps running even if part of the infrastructure fails. | Deploy across multiple AZs so you do not depend on a single point of failure. |
| **Elasticity** | Increase or decrease resources automatically based on demand, without overprovisioning or falling short. | Add and remove servers automatically as traffic rises or falls. |
| **Agility** | Speed of getting resources, experimenting and innovating at low cost. | Resources available in minutes instead of weeks. |

A closely related concept is **scalability**: a system's ability to grow and handle more load. Elasticity is scalability that is **automatic and works in both directions** (growing and shrinking). In AWS terms, "agility" does not mean the code runs faster, but that the business can move faster.

## Common exam traps

- **Confusing economies of scale with variable expense.** "Lower prices because AWS aggregates many customers" is *economies of scale*; "paying only for what I use" is *trade fixed expense for variable expense*.
- **Thinking the cloud eliminates all costs.** The cloud changes the type of expense (from CapEx to variable OpEx); it does not make it disappear.
- **Associating "agility" with technical performance.** In AWS, agility means reducing the time to get resources and experiment.
- **Confusing elasticity with high availability.** Elasticity responds to changes in **demand**; high availability responds to **failures**.
- **Choosing "go global in minutes" when the question is about unpredictable demand.** Variable demand is solved with *stop guessing capacity* and elasticity.

## Exam summary

- The cloud delivers IT resources over the internet with pay-as-you-go pricing.
- Memorize the six advantages by their official names.
- Variable expense = paying only when you consume and for what you consume.
- Economies of scale = lower prices thanks to the aggregate volume of customers.
- *Stop guessing capacity* = scaling with minutes' notice, without overprovisioning.
- Global infrastructure = speed of deployment and global reach with lower latency.
- High availability = continuing to run despite failures, using multiple AZs.
- Elasticity = growing and shrinking automatically based on demand.
- Agility = resources in minutes instead of weeks.
