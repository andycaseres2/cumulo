---
title: "Global infrastructure: Regions, Availability Zones, and edge locations"
summary: "Understand how Regions, Availability Zones, and edge locations relate to each other, how to achieve high availability, and when to use multiple Regions."
domain: "technology-services"
order: 2
examTasks: ["3.2"]
services: ["Amazon CloudFront", "AWS Local Zones", "Amazon S3", "AWS Global Accelerator"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"
  - "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
  - "https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html"
  - "https://aws.amazon.com/blogs/architecture/what-to-consider-when-selecting-a-region-for-your-workloads/"
quiz:
  - prompt: "A bank in Bogotá wants its mobile app to keep working even if a data center loses power. What is the typical approach to achieve this high availability?"
    options:
      - label: "Run the app in CloudFront edge locations"
        explanation: "Edge locations are used mainly to deliver cached content with CloudFront, not to run the entire application."
      - label: "Choose the Region closest to the users"
        explanation: "Proximity reduces latency, but deploying in a single location does not protect against a data center failure."
      - label: "Deploy the app across multiple Availability Zones in the Region"
        explanation: "AZs do not share single points of failure; if one AZ has a problem, the instances in the others keep serving."
        correct: true
      - label: "Use larger instances in a single Availability Zone"
        explanation: "A larger instance in a single AZ still depends on that AZ; if it fails, the app stops working."
  - prompt: "A regulation requires an insurance company in Lima to keep its customers' data in a specific country. When choosing the AWS Region, which factor should weigh the most?"
    options:
      - label: "Compliance and data residency"
        explanation: "When there is a regulation about where data must be, compliance and data residency outweigh the other factors."
        correct: true
      - label: "Region pricing"
        explanation: "Prices vary between Regions, but a cheaper Region is no good if it violates the regulation on data location."
      - label: "Proximity to users"
        explanation: "Proximity improves latency, but it does not guarantee compliance with the legal requirement about where data is stored."
      - label: "Number of services available"
        explanation: "Available services matter, but under a data residency regulation, compliance weighs more."
  - prompt: "Which component of the AWS global infrastructure does Amazon CloudFront use to deliver cached content to users with lower latency?"
    options:
      - label: "Availability Zones"
        explanation: "Availability Zones are data centers within a Region that provide high availability; they are not CloudFront's caching points."
      - label: "AWS Local Zones"
        explanation: "Local Zones are extensions of a Region that bring compute and other services closer to large cities; they are not CloudFront's caching network."
      - label: "Regions"
        explanation: "A Region is a geographic area with multiple AZs; CloudFront's cached content is delivered from a different type of location."
      - label: "Edge locations"
        explanation: "CloudFront routes each request to the edge location with the lowest latency and delivers content that is already cached from there."
        correct: true
practice:
  - prompt: "An e-commerce company in Santiago stores its files in an Amazon S3 bucket in one Region. It then deploys its app in another Region and expects to find those same files there. What happens?"
    options:
      - label: "The files automatically appear in all Regions"
        explanation: "Resources and data created in one Region do not exist in another; Regions are isolated from each other."
      - label: "They are not in the other Region unless you explicitly replicate or copy them"
        explanation: "Data does not leave a Region without an explicit action, such as configuring replication or copying it with a service feature."
        correct: true
      - label: "They are stored permanently in all edge locations"
        explanation: "Edge locations keep temporary cached copies for CloudFront; they do not replace the data in another Region."
      - label: "They replicate on their own to the Region closest to the users"
        explanation: "This is the classic exam trap: data does not replicate between Regions on its own unless you configure it."
  - prompt: "The risk department of a bank in Lima requires its service to keep operating even if an entire AWS Region goes down. Which approach meets that requirement?"
    options:
      - label: "Deploy across multiple Availability Zones in a single Region"
        explanation: "Multiple AZs protect against the failure of a data center, but they are all inside the Region that could go down."
      - label: "Deliver content with Amazon CloudFront"
        explanation: "CloudFront delivers cached content with lower latency; it does not keep the application running if an entire Region goes down."
      - label: "Use larger instances in the current Region"
        explanation: "Larger instances still depend on the same Region; if it goes down, the service goes down too."
      - label: "Deploy across multiple Regions, for example with an active/active strategy"
        explanation: "Business continuity in the face of losing an entire Region requires multiple Regions, for example with active/active."
        correct: true
  - prompt: "A video game producer in a large city needs to run compute with very low latency close to its players, using an extension of an AWS Region. What should it use?"
    options:
      - label: "AWS Local Zones"
        explanation: "Local Zones are extensions of a Region that place compute and other services close to large population centers with very low latency."
        correct: true
      - label: "CloudFront edge locations"
        explanation: "Their main role on the exam is delivering cached content, not running the application's compute."
      - label: "Additional Availability Zones in the same Region"
        explanation: "AZs provide high availability within a Region; they are not extensions located near a specific city."
      - label: "A Region on another continent"
        explanation: "A distant Region increases the distance to the players, the opposite of the very low latency being sought."
  - prompt: "What correctly describes an AWS Availability Zone (AZ)?"
    options:
      - label: "A country where AWS has data centers"
        explanation: "An AZ is not a country or a city; it is part of a Region."
      - label: "Always a single data center"
        explanation: "This is the classic exam trap: an AZ can consist of one or more data centers."
      - label: "One or more data centers with redundant power, networking, and connectivity within a Region"
        explanation: "That is the definition of an AZ: discrete data centers with redundant power, networking, and connectivity within a Region."
        correct: true
      - label: "A CloudFront point of presence for cached content"
        explanation: "That describes an edge location, which is separate from Regions; an AZ is inside a Region."
  - prompt: "An insurance company in Panama is looking, among the disaster recovery strategies AWS describes, for the one with the lowest cost and complexity. Which is it?"
    options:
      - label: "Multi-site active/active"
        explanation: "Multi-site active/active is at the highest-cost, highest-complexity end of the strategies AWS describes."
      - label: "Backup and restore"
        explanation: "Backup and restore is the lowest-cost, lowest-complexity strategy on the scale AWS describes."
        correct: true
      - label: "Warm standby"
        explanation: "Warm standby has more cost and complexity than backup and restore and pilot light."
      - label: "Pilot light"
        explanation: "Pilot light is more costly and complex than backup and restore on the scale AWS describes."
  - prompt: "An online gaming company in São Paulo wants its users' traffic to enter the AWS backbone network as early as possible, taking advantage of the AWS edge network. Which service should it use?"
    options:
      - label: "AWS Local Zones"
        explanation: "Local Zones bring compute and storage close to large cities as an extension of a Region; they are not the service that carries traffic onto the backbone."
      - label: "Additional Availability Zones"
        explanation: "AZs provide high availability within a Region; they do not speed up traffic entering the AWS network."
      - label: "Amazon S3 Standard"
        explanation: "S3 Standard stores objects redundantly across multiple AZs; it does not direct user traffic onto the backbone network."
      - label: "AWS Global Accelerator"
        explanation: "Global Accelerator uses the AWS edge network to bring traffic onto the AWS backbone network as early as possible."
        correct: true
---

## Why does it matter?

A bank in Bogotá wants its mobile app to keep working even if a data center loses power. In addition, regulation requires it to know exactly which country its customers' data is stored in, its risk department wants a plan in case an entire geographic area goes down, and marketing wants promotional videos to load quickly across Latin America.

Resilience, data location, business continuity, and speed for the user: all of it comes down to how AWS organizes its **global infrastructure**.

## Regions

An **AWS Region** is a physical location in the world where AWS clusters data centers. Each Region consists of **multiple isolated and physically separate Availability Zones** within a geographic area; AWS states that each Region has **at least three**.

Regions are **isolated** from each other: if a service fails in one Region, the others keep operating normally. In addition, **the resources and data you create in one Region do not exist in another** unless you explicitly replicate or copy them with a service feature.

### How to choose a Region

- **Compliance and data residency:** where the law requires data to be. If there is a regulation, this factor outweighs the others.
- **Proximity to users:** a closer Region usually means lower **latency** (the delay in communication).
- **Available services:** not all services and features reach every Region at the same time.
- **Pricing:** prices can vary between Regions.

The number of Regions grows frequently; check the official global infrastructure page for the current figure.

## Availability Zones and high availability

An **Availability Zone (AZ)** is **one or more discrete data centers with redundant power, networking, and connectivity** within a Region. Each AZ has its own power, cooling, and physical security.

Key points for the exam:

- AZs **do not share single points of failure**: elements such as generators and cooling equipment are not shared between AZs, and they are fed by different power substations.
- They are separated by a meaningful distance, up to about 100 km (60 miles), to avoid correlated failures such as floods, fires, or power outages.
- They are interconnected with redundant high-bandwidth, low-latency networking, which allows synchronous replication between them.

**High availability** is the ability of a system to keep working even if one of its components fails. In AWS it is achieved by deploying the application across **multiple AZs**: if one AZ has a problem, the instances in the others keep serving. For example, Amazon S3 Standard stores objects redundantly across a minimum of three AZs, and a load balancer can distribute traffic among instances in multiple AZs.

## When to use multiple Regions

Multiple AZs protect against the failure of a data center. Using **multiple Regions** makes sense when you need:

| Need | Why multiple Regions |
| --- | --- |
| **Disaster recovery** | If your definition of a disaster includes losing an entire Region, you need a copy in another Region. |
| **Business continuity** | Keep the service running even if an entire Region goes down, for example with an active/active strategy across multiple Regions. |
| **Low latency for end users** | Serve users on different continents from the Region closest to each of them. |
| **Data sovereignty** | Comply with laws that require certain data to remain in a country or jurisdiction; for example, storing a country's customer data in a Region in that country. |

AWS describes disaster recovery strategies from lowest to highest cost and complexity: **backup and restore**, **pilot light**, **warm standby**, and **multi-site active/active**. To rebuild infrastructure in another Region, AWS recommends using infrastructure as code.

## Edge locations and Local Zones

- **Edge locations**: data centers distributed around the world, separate from Regions, used by **Amazon CloudFront**, the AWS content delivery network (CDN). When a user requests content, the request is routed to the edge location with the **lowest latency**. If the content is already **cached** (a temporary copy) there, it is delivered immediately; if not, CloudFront fetches it from the **origin** (for example, an S3 bucket) and caches it.
- **Benefits of edge locations:** lower latency for the end user, less load on the origin, and faster entry of traffic into the AWS network. **AWS Global Accelerator** also uses the AWS edge network to bring traffic onto the AWS backbone network as early as possible.
- **AWS Local Zones:** place compute, storage, databases, and other select services **close to large population and industry centers** to deliver very low latency. Each Local Zone is an extension of a Region.

| Component | What it is | What it's for |
| --- | --- | --- |
| **Region** | Geographic area with at least three isolated AZs | Data residency, proximity, fault isolation |
| **Availability Zone** | One or more data centers with redundant power and networking | High availability within a Region |
| **Edge location** | AWS network point of presence (CloudFront) | Delivering cached content with lower latency |
| **Local Zone** | Extension of a Region near large cities | Applications that need very low latency |

## Common exam traps

- **Confusing an AZ with a Region.** A Region *contains* multiple AZs; an AZ is not a country or a city.
- **Believing an AZ is always a single data center.** It is **one or more** data centers.
- **Thinking data replicates between Regions on its own.** It does not unless you configure it.
- **Choosing "multiple Regions" when high availability is enough.** To tolerate the failure of a data center, the typical answer is **multiple AZs**. Multiple Regions apply to regional disasters, data sovereignty, or global users.
- **Using edge locations to run the whole application.** Their main role on the exam is delivering cached content with CloudFront.

## Exam summary

- Region = geographic area with at least three isolated AZs; Regions are isolated from each other.
- Data does not leave a Region without an explicit action.
- Choose a Region based on compliance, proximity, available services, and pricing.
- AZ = one or more data centers with redundant power, networking, and connectivity.
- AZs do not share single points of failure → multiple AZs = high availability.
- Multiple Regions = disaster recovery, business continuity, low global latency, and data sovereignty.
- Edge locations = CloudFront, cached content close to the user.
- Local Zones = extension of a Region for very low latency.
