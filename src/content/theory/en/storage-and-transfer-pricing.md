---
title: "Storage and data transfer pricing"
summary: "Understand how AWS charges: pay-as-you-go, inbound and outbound data transfer, S3 and EBS pricing dimensions, and how the Free Tier works today."
domain: "billing-pricing-support"
order: 2
examTasks: ["4.1"]
services: ["Amazon S3", "Amazon EBS", "Amazon EC2", "Amazon CloudFront"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html"
  - "https://aws.amazon.com/pricing/"
  - "https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/key-principles.html"
  - "https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/"
  - "https://aws.amazon.com/ec2/pricing/on-demand/"
  - "https://aws.amazon.com/s3/pricing/"
  - "https://aws.amazon.com/ebs/pricing/"
  - "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html"
  - "https://aws.amazon.com/free/"
  - "https://aws.amazon.com/free/free-tier-faqs/"
quiz:
  - prompt: "An online course platform in Lima is reviewing its AWS bill. Which of these data movements generally does not incur a data transfer charge?"
    options:
      - label: "Students download the videos from the internet"
        explanation: "Data transfer out from AWS to the internet is charged per GB, with rates based on the source Region."
      - label: "The team uploads the videos from the internet to Amazon S3"
        explanation: "Data transfer in from the internet to AWS is generally not charged; in S3, data transfer in from the internet is free."
        correct: true
      - label: "The videos are replicated to a bucket in another Region"
        explanation: "Transfer between different Regions is typically charged, for example when replicating a bucket to another Region."
      - label: "An instance sends data to another one in a different Availability Zone in the same Region"
        explanation: "Transfer between Availability Zones in the same Region is typically charged; what is generally free is traffic within the same AZ."
  - prompt: "A design agency in Cali has reports in Amazon S3 that many users read every day. It wants to avoid data retrieval charges. Which storage class should it use?"
    options:
      - label: "S3 Glacier Deep Archive"
        explanation: "Deep Archive has the lowest storage cost, but it charges for restores and requires a 180-day minimum storage duration; it does not suit data read daily."
      - label: "S3 Standard-IA"
        explanation: "Standard-IA costs less for storage, but it charges for retrieval, so reading the reports daily would incur those charges."
      - label: "S3 Glacier Instant Retrieval"
        explanation: "Glacier Instant Retrieval has a retrieval charge and a 90-day minimum duration; it does not avoid daily access charges."
      - label: "S3 Standard"
        explanation: "S3 Standard costs more for storage than these other classes, but it has no retrieval charge, which fits data that is read every day."
        correct: true
  - prompt: "A team in Quito creates a 500 GB Amazon EBS volume for an EC2 instance, but only writes 50 GB of data. How is the volume's storage charged?"
    options:
      - label: "For the 50 GB written, in GB-months"
        explanation: "EBS does not charge only for what you actually write; it charges for the size you reserve."
      - label: "For the 500 GB provisioned, in GB-months, until the volume is released"
        explanation: "EBS charges for provisioned storage in GB-months: you pay for the size you reserve, not what you write, until you release the volume."
        correct: true
      - label: "Only for read and write requests"
        explanation: "Charging by request type (PUT, GET, LIST) is an Amazon S3 pricing dimension; in EBS you pay for provisioned storage."
      - label: "Only for the snapshots created from the volume"
        explanation: "Snapshots are charged separately for the space they use; the volume itself is charged for its provisioned size."
practice:
  - prompt: "A music streaming company in Buenos Aires notices that, as its storage in Amazon S3 grows, the price it pays per GB goes down. Which AWS pricing principle explains this?"
    options:
      - label: "Pay less per unit by using more"
        explanation: "S3 has tiered pricing: the more you store, the less you pay per GB, which is exactly what the company is seeing."
        correct: true
      - label: "Pay-as-you-go"
        explanation: "Pay-as-you-go means paying only for what you consume, without long-term contracts; it does not explain why the price per GB drops as usage grows."
      - label: "Save when you commit"
        explanation: "This principle lowers the price in exchange for a 1- or 3-year commitment, such as Savings Plans; the company did not sign any commitment."
      - label: "Always Free offers"
        explanation: "Always Free offers are permanent monthly allowances on some services; they do not explain a lower price per GB at higher volume."
  - prompt: "The CFO of a pharmacy chain in Asunción wants to know where AWS costs are concentrated. Which of these is one of the three fundamental cost drivers that AWS identifies?"
    options:
      - label: "Inbound data transfer from the internet"
        explanation: "Data transfer in from the internet is generally not charged, so it is not a fundamental cost driver."
      - label: "Outbound data transfer"
        explanation: "AWS identifies three fundamental cost drivers: compute, storage and outbound data transfer."
        correct: true
      - label: "The number of IAM users in the account"
        explanation: "IAM users are not among the fundamental drivers; the three are compute, storage and outbound data transfer."
      - label: "The taxes included in the published prices"
        explanation: "AWS published prices do not include taxes, and taxes are not one of the three cost drivers."
  - prompt: "A startup in Bogotá creates its AWS account with the Free account plan for a proof of concept. When does that plan end?"
    options:
      - label: "12 months after the account is created"
        explanation: "That duration belongs to the old description of the Free Tier; the current free plan lasts up to six months."
      - label: "Only when the credits run out, regardless of time"
        explanation: "Running out of credits is only one of the two conditions; the plan also ends after six months."
      - label: "When the startup first uses a service with a short-term trial"
        explanation: "Short-term trials apply to accounts on the paid plan; using them is not the rule that ends the free plan."
      - label: "After six months or when the credits run out, whichever comes first"
        explanation: "The Free account plan ends after six months or when the credits run out, whichever comes first; to continue, you must upgrade to the paid plan."
        correct: true
  - prompt: "A clinical laboratory in Montevideo stores results in Amazon S3, but does not know how often they will be accessed. It wants S3 to move objects between access tiers automatically. Which storage class should it choose?"
    options:
      - label: "S3 One Zone-IA"
        explanation: "One Zone-IA has a lower storage cost with a retrieval charge and a 30-day minimum; it does not move objects between tiers on its own."
      - label: "S3 Glacier Deep Archive"
        explanation: "Deep Archive is for archiving, with the lowest storage cost and a 180-day minimum; it does not relocate objects based on usage."
      - label: "S3 Intelligent-Tiering"
        explanation: "Intelligent-Tiering moves objects between access tiers automatically, in exchange for a per-object monitoring charge."
        correct: true
      - label: "Amazon EBS snapshots"
        explanation: "Snapshots are incremental copies of EBS volumes charged by space; they are not an S3 class and do not move objects between tiers."
  - prompt: "A digital newspaper in Santiago stores its images in Amazon S3. Which of these S3 data movements incurs a data transfer charge?"
    options:
      - label: "Sending the images from S3 to Amazon CloudFront"
        explanation: "In Amazon S3, transfer to Amazon CloudFront is free."
      - label: "Copying images between two buckets in the same Region"
        explanation: "In S3, transfer between buckets in the same Region is free."
      - label: "Reading the images from an EC2 instance in the same Region"
        explanation: "In S3, transfer to other AWS services in the same Region is free."
      - label: "Serving the images from S3 directly to readers over the internet"
        explanation: "Data transfer out from S3 to the internet is an S3 pricing dimension and is charged per GB."
        correct: true
  - prompt: "An insurance company in Guadalajara stores a file in S3 Standard-IA and deletes it after 10 days. How is that object's storage charged?"
    options:
      - label: "Only for the 10 days it was stored"
        explanation: "Standard-IA has a 30-day minimum storage duration; deleting earlier does not limit the charge to the actual days."
      - label: "The remainder up to the 30-day minimum duration is charged, prorated"
        explanation: "If you delete or move an object before its minimum duration, the remainder is charged on a prorated basis; in Standard-IA the minimum is 30 days."
        correct: true
      - label: "It is charged up to a full 180 days"
        explanation: "The 180-day minimum duration belongs to S3 Glacier Deep Archive, not Standard-IA."
      - label: "Only a per-object monitoring charge applies"
        explanation: "The per-object monitoring charge is specific to S3 Intelligent-Tiering, not Standard-IA."
---

## Why does it matter?

An online course platform in Lima stores its videos in AWS. In the first month, the storage bill is low, but an unexpected **data transfer** charge appears: thousands of students downloaded the videos from the internet. On top of that, the IT team replicated everything to another Region "just in case" and moved old backups to an archive class that charges to retrieve data.

To avoid surprises, you need to understand **what AWS charges for and how**. The exam tests these concepts qualitatively: it will not ask you for exact prices, but to recognize what generates cost and what is free.

## AWS pricing model fundamentals

AWS sums up its pricing approach in three ideas:

- **Pay-as-you-go:** for the vast majority of services you pay only for what you consume, with no long-term contracts.
- **Save when you commit:** models such as **Savings Plans** or Reserved Instances lower the price in exchange for a 1- or 3-year commitment.
- **Pay less per unit by using more:** some services have **tiered pricing**; for example, in Amazon S3 and in EC2 outbound data transfer, the more you use, the less you pay per GB.

AWS identifies three **fundamental cost drivers**: **compute**, **storage** and **outbound data transfer**. For compute you pay by the hour or second while the resource runs; for storage and transfer, usually per GB. Published prices **do not include taxes**.

## Data transfer: in, out and between locations

**Data transfer** is the movement of bytes into, out of or within AWS. The general rule:

| Traffic type | Is it charged? |
| --- | --- |
| **Inbound** from the internet to AWS | Generally **no** |
| **Outbound** from AWS to the internet | **Yes**, per GB, with rates based on the source Region |
| Between different **Regions** | **Yes**, typically |
| Between **Availability Zones** in the same Region | **Yes**, typically |
| Within the **same Availability Zone** | Generally free |
| Between AWS services in the **same Region** (for example, from S3 to another service) | In most cases, **no** |

Some key points:

- Outbound transfer to the internet is **aggregated across services** and appears on the bill as *AWS Data Transfer Out*. AWS includes a monthly amount of outbound transfer to the internet at no cost; check the official page for the current amount.
- In Amazon S3, data transfer in from the internet is free, as is transfer between buckets or to other services in the same Region, and to **Amazon CloudFront**.
- There are service-specific exceptions, so AWS recommends **checking the rates** of each service before designing.

In the Lima platform's case, the charge came from **outbound transfer to the internet** and from **cross-Region replication**; the original upload of the videos incurred no transfer cost.

## Storage pricing: S3 and EBS

Each storage service has its own **pricing dimensions**, that is, the items it charges for.

**Amazon S3** (object storage) charges for:

- **Storage:** based on the size of the objects, how long they are stored and the **storage class**.
- **Requests and retrievals:** based on the request type (PUT, GET, LIST, etc.) and **retrievals** from infrequent access or archive classes.
- **Data transfer** out to the internet and between Regions.
- **Management, analytics and replication**, among other optional features.

| S3 class | Storage cost | Access cost |
| --- | --- | --- |
| **S3 Standard** | Highest | No retrieval charge |
| **S3 Standard-IA / One Zone-IA** | Lower | Retrieval charge; 30-day minimum duration |
| **S3 Glacier Instant Retrieval** | Even lower | Retrieval charge; 90-day minimum |
| **S3 Glacier Flexible Retrieval / Deep Archive** | Lowest | Restore charges based on the chosen option; 90- and 180-day minimums |
| **S3 Intelligent-Tiering** | Variable, with a per-object monitoring charge | Moves objects between access tiers automatically |

If you delete or move an object before its minimum duration, the remainder is charged on a prorated basis.

**Amazon EBS** (block volumes for EC2) charges for:

- **Provisioned storage** in GB-months: you pay for the **size you reserve**, not what you actually write, until you release the volume.
- **Provisioned IOPS and throughput** on certain volume types.
- **Snapshots**, which are charged for the space the data uses (they are incremental).

## The AWS Free Tier today

The **AWS Free Tier** has changed: older study material describes a previous model. Today, when you create an account you choose between:

- **Free account plan:** to experiment and build proofs of concept **at no cost** for **up to six months**. You receive **USD 100 in AWS credits** and can earn up to USD 100 more by completing activities, plus access to selected services. It ends after six months or when the credits run out, whichever comes first; to continue, you must upgrade to the paid plan.
- **Paid account plan:** for production workloads; credits apply first, and then you pay standard pay-as-you-go prices.

On the free plan, only the **Always Free** offers (permanent monthly allowances on some services) are active; the **short-term trials** of selected services apply to accounts on the paid plan. Credit amounts and limits change, so check them on the official AWS Free Tier page.

## Common exam traps

- **Believing that uploading data to AWS costs money.** Data transfer **in** from the internet is generally free; what is charged is transfer **out**.
- **Forgetting traffic between AZs or between Regions.** Both usually incur charges; within the same AZ generally not.
- **Choosing S3 Glacier for data that is read daily.** Storage is cheap, but it charges for retrieval and has a minimum duration.
- **Thinking EBS only charges for what is used.** EBS charges for the **provisioned** size.
- **Using the old description of the Free Tier.** The current model uses a **free plan of up to six months with credits**, plus Always Free offers.

## Exam summary

- Principles: pay-as-you-go, savings for commitment and a lower price per unit with higher usage.
- Cost drivers: compute, storage and outbound data transfer.
- Data transfer in: generally free; transfer out to the internet: charged per GB.
- Between Regions and between AZs: usually charged; within the same AZ: generally free.
- S3 charges for storage, requests and retrievals, transfer and management features.
- Colder S3 classes = lower storage cost, but retrieval charges and minimum durations.
- EBS charges for provisioned storage, provisioned IOPS and throughput, and snapshots.
- Current Free Tier: free plan (up to six months or until credits run out) or paid plan with credits, plus Always Free offers.
