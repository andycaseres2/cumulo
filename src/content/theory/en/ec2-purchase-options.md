---
title: "EC2 purchase options"
summary: "Choose between On-Demand, Savings Plans, Reserved Instances, Spot, dedicated options and Capacity Reservations based on the workload and the commitment you can make."
domain: "billing-pricing-support"
order: 1
examTasks: ["4.1"]
services: ["Amazon EC2", "AWS Lambda", "AWS Fargate", "AWS Organizations"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/ec2/pricing/"
  - "https://aws.amazon.com/ec2/spot/"
  - "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html"
  - "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-convertible-exchange.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ri-market-general.html"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-behavior.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html"
quiz:
  - prompt: "A company in Bogotá has steady Amazon EC2 usage across several families and Regions, plus AWS Fargate and AWS Lambda. It wants a discount in exchange for a 1- or 3-year commitment that covers all of that usage. Which option should it choose?"
    options:
      - label: "Compute Savings Plans"
        explanation: "Compute Savings Plans apply to EC2 regardless of family, size, operating system, tenancy or Region, and also to AWS Fargate and AWS Lambda."
        correct: true
      - label: "EC2 Instance Savings Plans"
        explanation: "EC2 Instance Savings Plans require you to commit to an instance family in one Region, so they do not give the flexibility across families and Regions that is required."
      - label: "Zonal Standard Reserved Instances"
        explanation: "A zonal RI only applies to one AZ and one exact size; it does not cover several families and Regions or Fargate and Lambda usage."
      - label: "Spot Instances"
        explanation: "Spot involves no 1- or 3-year commitment and its instances can be interrupted; it is not a commitment discount over all usage."
  - prompt: "An online store in Medellín runs a reporting job every night that can simply be rerun if it is interrupted. It wants the largest possible savings compared with On-Demand. Which purchase option should it use?"
    options:
      - label: "On-Demand Instances"
        explanation: "On-Demand is the base price, with no discount; it suits workloads that cannot be interrupted, not maximizing savings on an interruption-tolerant job."
      - label: "Spot Instances"
        explanation: "Spot uses spare EC2 capacity at discounts of up to 90% and can be interrupted with a two-minute notice, which is acceptable for a job that can be rerun."
        correct: true
      - label: "On-Demand Capacity Reservations"
        explanation: "Capacity Reservations guarantee capacity in an AZ, but on their own they give no discount."
      - label: "Dedicated Hosts"
        explanation: "Dedicated Hosts give you an entire physical server, useful for per-socket or per-core licenses; they are not the biggest-savings option for an interruptible job."
  - prompt: "An insurance company in Lima wants to move to EC2 a piece of software whose own license is charged per socket and per physical core, so it needs visibility into the server's sockets and cores. Which option should it choose?"
    options:
      - label: "Dedicated Instances"
        explanation: "Dedicated Instances run on hardware dedicated to a single account, but they do not give visibility into sockets and cores and have only partial BYOL support."
      - label: "Convertible Reserved Instances"
        explanation: "A Reserved Instance is a billing discount, not a server; it gives no visibility into the physical server for per-socket or per-core licensing."
      - label: "Spot Instances"
        explanation: "Spot gives a discount on spare capacity that can be interrupted; it offers no visibility into sockets and cores for your own licenses."
      - label: "Dedicated Hosts"
        explanation: "Dedicated Hosts give you an entire physical server with visibility into sockets and cores, and let you bring your own per-socket or per-core licenses (BYOL)."
        correct: true
practice:
  - prompt: "A startup in Asunción is launching a new app and, during a few trial weeks, does not know how much demand it will have. The server cannot be interrupted and the startup does not want to commit to any term. Which EC2 purchase option suits it?"
    options:
      - label: "Spot Instances"
        explanation: "Spot can be interrupted with a two-minute notice, which is unacceptable for a server that cannot stop."
      - label: "3-year Standard Reserved Instances"
        explanation: "An RI requires a 1- or 3-year commitment and cannot be canceled; the startup does not want to commit to any term."
      - label: "On-Demand Instances"
        explanation: "On-Demand charges by the hour or second, with no upfront payment or commitment, and is not interrupted: it fits short, new and unpredictable workloads."
        correct: true
      - label: "Dedicated Hosts"
        explanation: "Dedicated Hosts give you an entire physical server for per-socket or per-core licenses or compliance, needs this scenario does not mention."
  - prompt: "A distributor in Santa Cruz has already decided to buy 3-year Reserved Instances, but expects that during that time it will want to switch to another instance family and another operating system. Which class of RI should it buy?"
    options:
      - label: "Convertible Reserved Instances"
        explanation: "Convertible RIs can be exchanged for another Convertible RI with a different family, operating system or tenancy, of equal or greater value and in the same Region."
        correct: true
      - label: "Standard Reserved Instances"
        explanation: "Standard RIs give the largest discount, but only allow some attributes to be modified and cannot be exchanged for another family or operating system."
      - label: "Spot Instances"
        explanation: "Spot is not a class of Reserved Instance; it is spare capacity with no commitment that can be interrupted."
      - label: "On-Demand Capacity Reservations"
        explanation: "Capacity Reservations guarantee capacity in an AZ and give no discount on their own; they are not a class of RI."
  - prompt: "A hospital in Montevideo needs to guarantee EC2 capacity in a specific Availability Zone during one week of a critical migration, without committing to a 1- or 3-year term. Which option should it use?"
    options:
      - label: "Regional Reserved Instances"
        explanation: "A regional RI does not reserve capacity and also requires a 1- or 3-year commitment."
      - label: "Compute Savings Plans"
        explanation: "Compute Savings Plans give a discount in exchange for a 1- or 3-year commitment, but they do not reserve capacity in an AZ."
      - label: "Spot Instances"
        explanation: "Spot uses spare capacity that AWS can reclaim, the exact opposite of guaranteed capacity."
      - label: "On-Demand Capacity Reservations"
        explanation: "They reserve EC2 capacity in a specific AZ for as long as you want, and immediate-use reservations require no term commitment."
        correct: true
  - prompt: "A cooperative in Cochabamba bought a 1-year Reserved Instance for its accounting server. What happens to the instance when the RI expires?"
    options:
      - label: "The RI automatically renews for another year"
        explanation: "An RI does not renew on its own; if the cooperative wants the discount again, it must buy another one."
      - label: "The instance keeps running, but at the On-Demand rate"
        explanation: "When the RI expires, the instance keeps running and is charged at the On-Demand rate, because the RI was only a billing discount."
        correct: true
      - label: "AWS stops the instance until you buy another RI"
        explanation: "An RI is a billing discount, not the server; its expiration does not stop the instance."
      - label: "The instance starts being billed as a Spot Instance"
        explanation: "Spot is a different purchase option with interruptible capacity; an expired RI does not turn the instance into Spot."
  - prompt: "In an AWS Organizations organization with consolidated billing, the finance account bought Reserved Instances, and the sales account runs instances that match their attributes. By default, what happens?"
    options:
      - label: "The discount only applies to the finance account, which paid for it"
        explanation: "With consolidated billing, all accounts are treated as one for billing purposes, so the discount is not limited to the purchasing account."
      - label: "The sales account must buy its own RIs to get a discount"
        explanation: "There is no need to duplicate the purchase: an RI discount is shared by default among the organization's accounts."
      - label: "The RI discount can apply to the sales account's usage"
        explanation: "Consolidated billing treats the organization as a single account, so the discount can apply to matching instances in another account; the management account can turn this off."
        correct: true
      - label: "The RIs turn into Savings Plans to cover both accounts"
        explanation: "RIs and Savings Plans are different purchase options; sharing discounts does not turn one into the other."
  - prompt: "A team in Caracas buys a Reserved Instance with regional scope for Linux/Unix instances with default tenancy. Which statement is correct?"
    options:
      - label: "It reserves capacity in every AZ in the Region"
        explanation: "A regional RI does not reserve capacity; only a zonal RI reserves capacity, and only in the chosen AZ."
      - label: "It costs more than the same RI with zonal scope"
        explanation: "Scope does not change the price of the RI; regional and zonal cost the same."
      - label: "It only applies to the exact instance size that was purchased"
        explanation: "Applying only to the exact size is a trait of a zonal RI; a regional RI on Linux/Unix with default tenancy covers any size in the family."
      - label: "The discount applies in any AZ in the Region and to different sizes in the same family"
        explanation: "A regional RI applies its discount in any AZ in the Region and, on Linux/Unix with default tenancy, to different sizes in the same family."
        correct: true
---

## Why does it matter?

An online store in Medellín uses **Amazon EC2** servers (virtual servers in the cloud). It has a web server that runs 24 hours a day all year, a nightly job that generates reports and can be rerun if it is interrupted, and a three-day Black Friday campaign whose demand nobody can predict. If it pays for everything the same way, it is probably overspending.

AWS offers several EC2 **purchase options**, and choosing well based on the workload is a key exam skill.

## On-Demand: full flexibility

With **On-Demand Instances** you pay by the hour or by the second of use, **with no upfront payment or long-term commitment**. It is the reference price for comparing discounts.

Ideal for: short, unpredictable workloads or workloads that cannot be interrupted, such as the Black Friday campaign.

## Savings Plans and Reserved Instances: discounts for commitment

**Savings Plans:** you commit to a **consistent amount of usage, measured in USD per hour**, for **1 or 3 years**. AWS states that you can save **up to 72%** compared with On-Demand. There are four types:

- **Compute Savings Plans:** the most flexible (up to 66%). They apply to EC2 regardless of family, size, operating system, tenancy or Region, and also to **AWS Fargate** and **AWS Lambda**.
- **EC2 Instance Savings Plans:** up to 72%, in exchange for committing to an instance family in one Region.
- **Database Savings Plans** and **SageMaker AI Savings Plans:** for database services and for Amazon SageMaker AI.

**Reserved Instances (RIs):** they are not physical instances but a **billing discount** applied to instances that match certain attributes (instance type, Region, tenancy and platform). You buy them for **1 or 3 years**; the 3-year term gives a bigger discount, and in general paying more upfront (*All Upfront*, *Partial Upfront* or *No Upfront*) saves more. An RI **cannot be canceled** and **does not renew on its own**: when it expires, the instance keeps running at the On-Demand rate.

AWS **recommends Savings Plans over Reserved Instances** because they offer similar discounts with more flexibility: with RIs you commit to a specific configuration; with Savings Plans, to an amount of usage.

Ideal for: steady, predictable workloads, such as the web server that runs all year.

## Reserved Instance flexibility

The exam asks how "flexible" an RI is. There are two axes: the **offering class** and the **scope**.

| Class | Discount | What can you change? |
| --- | --- | --- |
| **Standard** | The largest | You can only **modify** some attributes; it cannot be exchanged. It can be sold in the Reserved Instance Marketplace. |
| **Convertible** | Smaller | It can be **exchanged** for another Convertible RI with a different family, operating system or tenancy, as long as it is of equal or greater value and in the same Region. |

| Scope | Reserves capacity? | Flexibility |
| --- | --- | --- |
| **Regional** | No | The discount applies in **any AZ** in the Region and, on Linux/Unix with default tenancy, to **any size** in the same family. |
| **Zonal** | **Yes**, in the chosen AZ | It only applies to that AZ and that exact size. |

Scope does not change the price of the RI.

## RIs and Savings Plans in AWS Organizations

With **AWS Organizations** **consolidated billing**, all accounts in the organization are treated as **a single account for billing**. That is why the discount of an RI or a Savings Plan purchased by one account can **apply to the usage of another account** in the organization that has matching instances. The management account can **turn off discount sharing** from the *Preferences* page of the Billing and Cost Management console.

## Spot Instances: spare capacity at a deep discount

**Spot Instances** use **spare EC2 capacity** at a discount of **up to 90%** compared with On-Demand. In exchange, AWS can **reclaim the instance** when it needs that capacity, with an **interruption notice two minutes in advance**.

Ideal for: **interruption-tolerant** or flexible workloads, such as the nightly reporting job, CI/CD or testing.

## Dedicated and capacity options

Both run your instances on **physical servers you do not share with other customers**, with no differences in performance or physical security.

| | **Dedicated Hosts** | **Dedicated Instances** |
| --- | --- | --- |
| What you get | An entire physical server dedicated to you | Hardware dedicated to a single account |
| Billing | Per host | Per instance |
| Visibility into sockets and cores | Yes | No |
| Control over placement and affinity | Yes | No |
| Bring your own per-socket or per-core licenses (BYOL) | Yes | Partial support |

**On-Demand Capacity Reservations** reserve EC2 capacity in a **specific Availability Zone** for as long as you want; immediate-use reservations require no term commitment. They **give no discount** on their own, but you can combine them with Savings Plans or regional RIs to get one.

## Quick comparison

| Option | Commitment | Savings vs. On-Demand | Can it be interrupted? | Ideal workload |
| --- | --- | --- | --- | --- |
| **On-Demand** | None | Base price | No | Short, unpredictable, new |
| **Savings Plans** | USD per hour, 1 or 3 years | Up to 72% | No | Steady usage with flexibility |
| **Reserved Instances** | Configuration, 1 or 3 years | Significant | No | Steady usage of a known configuration |
| **Spot** | None | Up to 90% | Yes, 2-minute notice | Fault-tolerant, flexible |
| **Dedicated Hosts** | Optional | — | No | Per-socket or per-core licenses, compliance |
| **Capacity Reservations** | Optional | None on their own | No | Guaranteed capacity for critical events |

## Common exam traps

- **Choosing Spot for a critical workload that cannot stop.** Spot can be interrupted; use On-Demand, Savings Plans or RIs.
- **Thinking a Reserved Instance is a server.** It is a billing discount applied to matching instances.
- **Confusing Dedicated Hosts with Dedicated Instances.** The clue "per-socket or per-core licenses" or "visibility into the physical server" points to **Dedicated Hosts**.
- **Believing a regional RI reserves capacity.** Only a **zonal** RI reserves capacity; to guarantee capacity with no term, use Capacity Reservations.
- **Thinking an RI discount only benefits the account that bought it.** In an organization with consolidated billing it is shared by default.
- **Confusing Standard with Convertible.** Convertible = exchangeable; Standard = largest discount, can only be modified.

## Exam summary

- On-Demand: no commitment; short-term or unpredictable.
- Savings Plans: USD/hour commitment for 1 or 3 years; up to 72%; recommended by AWS; Compute Savings Plans cover EC2, Fargate and Lambda.
- Reserved Instances: billing discount for 1 or 3 years; they cannot be canceled and do not renew on their own.
- Standard = bigger discount, can only be modified; Convertible = can be exchanged.
- Regional RI: flexible across AZs and sizes, no capacity reservation; zonal RI: reserves capacity in one AZ.
- In AWS Organizations, RI and Savings Plans discounts are shared across accounts (this can be turned off).
- Spot: up to 90%; interruptible with a 2-minute notice.
- Dedicated Hosts: your own physical server, BYOL per socket or core; Dedicated Instances: dedicated hardware without that visibility.
- Capacity Reservations: guarantee capacity in one AZ, not a discount.
