---
title: "S3 storage classes and lifecycle policies"
summary: "Choose the S3 class based on access frequency and retrieval speed, and automate moving objects with S3 Lifecycle to lower costs."
domain: "technology-services"
order: 13
examTasks: ["3.6", "4.1"]
services: ["Amazon S3 Glacier", "Amazon S3"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html"
  - "https://aws.amazon.com/s3/pricing/"
quiz:
  - prompt: "A clinic in Lima must keep its patients' X-rays for years. They are viewed roughly once a quarter, but when a doctor opens them they must load in milliseconds. They cannot be recreated. Which S3 class is the best fit?"
    options:
      - label: "S3 Glacier Flexible Retrieval"
        explanation: "S3 Glacier Flexible Retrieval requires restoring objects and takes minutes to hours; it does not meet millisecond access."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive is the cheapest option, but retrieval takes hours; it does not work if doctors need milliseconds."
      - label: "S3 Glacier Instant Retrieval"
        explanation: "S3 Glacier Instant Retrieval is for archives accessed about once a quarter, with millisecond access and across multiple AZs."
        correct: true
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA stores data in a single AZ and AWS recommends it for data that can be recreated; the X-rays cannot be recreated."
  - prompt: "An education platform in Quito does not know how often its videos will be viewed and wants S3 to move them between access tiers on its own, with no retrieval charges. Which class should it use?"
    options:
      - label: "S3 Intelligent-Tiering"
        explanation: "S3 Intelligent-Tiering is for unknown or changing patterns: it moves each object between tiers and charges no retrieval fees, only a per-object monitoring fee."
        correct: true
      - label: "S3 Standard-IA"
        explanation: "S3 Standard-IA is for known infrequent access, charges per GB retrieved, and does not move objects between tiers on its own."
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA stores data in a single AZ, charges per GB retrieved, and does not move objects automatically based on usage."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive is for data accessed less than once a year, with retrieval in hours; it does not adapt to an unknown pattern."
  - prompt: "A fintech in Buenos Aires stores logs in S3: it queries them daily for the first month, then almost never, and must delete them once they turn one year old. It wants this to happen automatically. What should it configure?"
    options:
      - label: "Store all logs in S3 Glacier Deep Archive from day one"
        explanation: "Deep Archive takes hours to retrieve and has a 180-day minimum duration; it does not work for logs queried daily and does not delete them on its own."
      - label: "Store all logs in S3 Express One Zone"
        explanation: "S3 Express One Zone is for highly latency-sensitive applications in a single AZ; it does not move objects to cheaper classes or delete them."
      - label: "Request Expedited restores from S3 Glacier Flexible Retrieval"
        explanation: "An Expedited restore creates a temporary copy of an archived object; it does not move logs between classes or delete them when they expire."
      - label: "An S3 Lifecycle configuration with transition and expiration actions"
        explanation: "Transition actions move the logs to a cheaper class after a certain time, and expiration actions delete them when they turn one year old."
        correct: true
practice:
  - prompt: "A video game studio in Santiago has a highly latency-sensitive application that constantly reads data from S3. It needs single-digit millisecond latency and accepts storing the data in a single AZ chosen by its team. Which S3 class is the best fit?"
    options:
      - label: "S3 Glacier Flexible Retrieval"
        explanation: "S3 Glacier Flexible Retrieval stores archived objects that must be restored first, with waits of minutes to hours; it does not work for constant reads."
      - label: "S3 Express One Zone"
        explanation: "S3 Express One Zone is designed for highly latency-sensitive applications: it delivers single-digit milliseconds in an AZ you choose."
        correct: true
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA also uses a single AZ, but it is for infrequent access to recreatable data and charges per GB retrieved; it is not aimed at constant low-latency reads."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive is for data accessed less than once a year and retrieval takes hours; it does not fit a latency-sensitive application."
  - prompt: "A construction company in Medellín stored backups in S3 Glacier Deep Archive and decided to delete them after 30 days because it no longer needed them. For how many days of storage will S3 charge for those objects?"
    options:
      - label: "Only for the 30 days they were stored"
        explanation: "Deep Archive has a minimum duration: if you delete an object before that period, you still pay for the rest of it, not just the actual days."
      - label: "For 90 days"
        explanation: "90 days is the minimum duration of S3 Glacier Instant Retrieval and Flexible Retrieval; Deep Archive has a longer minimum."
      - label: "For 180 days"
        explanation: "The minimum storage duration of S3 Glacier Deep Archive is 180 days, so deleting after 30 days still charges the full 180 days."
        correct: true
      - label: "For 0 days, because deleting objects cancels the storage charge"
        explanation: "Deleting an object before its class's minimum duration incurs a charge for the remaining period; deleting does not cancel what was already committed."
  - prompt: "An insurance company in Guatemala City needs to restore a large volume of backups stored in S3 Glacier Flexible Retrieval. It can wait between 5 and 12 hours and wants to avoid the retrieval charge. Which retrieval option should it choose?"
    options:
      - label: "Expedited"
        explanation: "Expedited typically restores in 1 to 5 minutes; it is for urgent needs, not for when you can wait hours to save money."
      - label: "Standard"
        explanation: "Standard typically restores in 3 to 5 hours; the option designed for large volumes with no retrieval charge is a different one."
      - label: "Bulk"
        explanation: "Bulk typically restores in 5 to 12 hours and has no retrieval charge in Glacier Flexible Retrieval, exactly what the insurance company is looking for."
        correct: true
      - label: "Read the objects directly in real time, without restoring"
        explanation: "Glacier Flexible Retrieval objects are archived and cannot be read in real time; you first request a restore, which creates a temporary copy."
  - prompt: "An audiovisual production company in Montevideo uploads several terabytes of video from the internet to an S3 bucket and then distributes them to its clients. Which part of this flow does NOT generate any S3 charge?"
    options:
      - label: "Storing the videos in the bucket"
        explanation: "Storage is charged based on object size, how long objects are stored, and the class; it does generate a cost."
      - label: "The PUT requests to upload each file"
        explanation: "S3 charges by request type, including PUT; uploading the files generates request charges."
      - label: "Data transfer out of the videos to the clients"
        explanation: "Data transfer out of S3 is charged; distributing the videos to the clients generates that charge."
      - label: "Data transfer in from the internet to S3"
        explanation: "Data transfer in from the internet to S3 is free; what is charged is data transfer out."
        correct: true
  - prompt: "A photo app in Cali generates thumbnails that it can recreate at any time from the original images. The thumbnails are viewed about once a month, and the company accepts storing them in a single AZ to save money. Which S3 class is the best fit?"
    options:
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA is for infrequent access and recreatable data, in a single AZ; AWS recommends it precisely for this kind of data."
        correct: true
      - label: "S3 Standard"
        explanation: "S3 Standard is for frequent access, more than once a month; it does not take advantage of the savings of an infrequent access class."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive requires restoring objects and takes hours; it does not work for thumbnails the app displays when they are requested."
      - label: "S3 Express One Zone"
        explanation: "S3 Express One Zone is for highly latency-sensitive applications; it is not geared toward infrequently accessed data."
  - prompt: "A savings cooperative in La Paz must keep its financial records for ten years by regulation. It almost never accesses them, less than once a year, and can wait hours to retrieve them. It is looking for the lowest possible storage cost. Which S3 class should it use?"
    options:
      - label: "S3 Standard"
        explanation: "S3 Standard is the default class for frequent access; paying that rate for records almost nobody opens wastes money."
      - label: "S3 Glacier Deep Archive"
        explanation: "S3 Glacier Deep Archive is the lowest-cost storage option in AWS, designed for retaining data for years for compliance and accessed less than once a year."
        correct: true
      - label: "S3 Glacier Instant Retrieval"
        explanation: "S3 Glacier Instant Retrieval is for archives accessed about once a quarter with millisecond access; the cooperative does not need that speed, and there is a cheaper class for storage."
      - label: "S3 Express One Zone"
        explanation: "S3 Express One Zone is for highly latency-sensitive applications in a single AZ; it is not a long-term archive class."
---

## Why does it matter?

A clinic in Lima stores its patients' X-rays in Amazon S3. During the first month doctors view them daily; after that, almost never. By regulation, they must keep them for several years. Paying the frequent-access price for files nobody opens is a waste of money.

S3 offers **storage classes** with different costs and speeds, and **S3 Lifecycle** to move objects automatically from one class to another. The exam frequently asks which class fits a given access pattern.

## The storage classes

Every S3 object has a **storage class**. If you don't specify one, **S3 Standard** is used. All classes are designed for the same **eleven nines (99.999999999%)** of durability; what changes is availability, the number of Availability Zones (AZs), the minimums, and the retrieval charges.

| Class | Access pattern | AZs | Minimum duration | Minimum billable size | Retrieval |
| --- | --- | --- | --- | --- | --- |
| S3 Standard | Frequent (more than once a month) | 3 or more | None | None | Milliseconds, no retrieval charge |
| S3 Intelligent-Tiering | Unknown or changing | 3 or more | None | None (objects < 128 KB are not monitored) | Milliseconds in its access tiers; no retrieval charge, but a per-object monitoring charge |
| S3 Standard-IA | Infrequent (≈ once a month) | 3 or more | 30 days | 128 KB | Milliseconds, with a per-GB retrieval charge |
| S3 One Zone-IA | Infrequent and **data you can recreate** | 1 | 30 days | 128 KB | Milliseconds, with a per-GB retrieval charge |
| S3 Express One Zone | Highly latency-sensitive applications | 1 (you choose it) | None | None | Single-digit milliseconds |
| S3 Glacier Instant Retrieval | Archive accessed ≈ once a quarter | 3 or more | 90 days | 128 KB | Milliseconds, with a retrieval charge |
| S3 Glacier Flexible Retrieval | Archive accessed ≈ once or twice a year | 3 or more | 90 days | — | Minutes to hours (requires restore) |
| S3 Glacier Deep Archive | Archive accessed less than once a year | 3 or more | 180 days | — | Hours (requires restore) |

Key points:

- **IA** stands for *Infrequent Access*. These classes are cheaper to store in, but they charge for retrieval.
- **S3 One Zone-IA** and **S3 Express One Zone** store data in **a single AZ**: they do not withstand the physical loss of that AZ. AWS recommends One Zone-IA only for data that can be regenerated or for replicas.
- **S3 Intelligent-Tiering** moves each object automatically between tiers: if it is not accessed for 30 consecutive days it moves to Infrequent Access, and after 90 days to Archive Instant Access. You can optionally turn on asynchronous archive tiers (Archive Access and Deep Archive Access).
- **Minimum duration**: if you delete or move an object before that period, you still pay for the rest of it.

## The S3 Glacier classes

**Amazon S3 Glacier** is the family of low-cost archive classes within S3. Objects remain in S3 buckets and are managed with the S3 APIs.

- **S3 Glacier Instant Retrieval**: millisecond access, like Standard-IA, but with cheaper storage and more expensive access. Example: medical images viewed at occasional appointments.
- **S3 Glacier Flexible Retrieval**: objects are **archived** and cannot be read in real time; you first request a **restore**, which creates a temporary copy. Retrieval options: **Expedited** (typically 1–5 minutes), **Standard** (typically 3–5 hours), and **Bulk** (typically 5–12 hours, free). Ideal for backups and disaster recovery.
- **S3 Glacier Deep Archive**: the **lowest-cost** storage option in AWS. **Standard** retrieval typically within 12 hours and **Bulk** typically within 48 hours. Ideal for retaining data for years for regulatory compliance.

## Lifecycle policies (S3 Lifecycle)

An **S3 Lifecycle configuration** is a set of rules that S3 applies automatically to a group of objects. There are two types of actions:

- **Transition actions**: move objects to another class after a certain time. Example: move to S3 Standard-IA after 30 days and to S3 Glacier Flexible Retrieval after a year.
- **Expiration actions**: delete objects when they expire, for example at the end of a regulatory retention period.

Typical use cases according to the AWS documentation:

- **Logs** that are needed for a week or a month and can then be deleted.
- **Documents** that are accessed heavily at first, rarely afterward, and must be archived by regulation.
- **Archive data**: financial or health records, long-term database backups, data that must be kept for compliance.

Rules apply to both existing and new objects. Transition requests have a cost, and expiring objects before their class's minimum duration incurs the corresponding charge.

## S3 pricing dimensions

The cost of S3 is not just "GB stored". The main dimensions are:

1. **Storage**: based on object size, how long objects are stored, and the class.
2. **Requests and retrievals**: charges per request type (PUT, COPY, GET, LIST, lifecycle transitions) and retrieval charges in the IA and Glacier classes.
3. **Data transfer**: data transfer out is charged; **data transfer in from the internet is free**.
4. **Management and analytics**, **replication**, and other optional features.

General rule: the cheaper it is to store, the more expensive (or slower) it is to retrieve. Exact prices are on the official S3 pricing page.

## Common exam traps

- **Choosing One Zone-IA for the only copy of critical data.** It lives in a single AZ; for data that cannot be recreated, use Standard-IA.
- **Choosing Glacier Flexible Retrieval or Deep Archive when immediate access is required.** For archives with millisecond access, the answer is **Glacier Instant Retrieval**.
- **Forgetting the minimum duration.** Deleting a Deep Archive object after 30 days still charges 180 days.
- **Thinking Intelligent-Tiering charges for retrieval.** It does not; it charges a small per-object monitoring fee.
- **Moving objects by hand.** If the access pattern is predictable, the answer is a **lifecycle policy**.

## Exam summary

- S3 Standard = frequent access; it is the default class.
- Intelligent-Tiering = unknown or changing pattern; moves objects on its own.
- Standard-IA = infrequent and across multiple AZs; One Zone-IA = infrequent, one AZ, recreatable data.
- Express One Zone = single-digit millisecond latency in one AZ.
- Glacier Instant Retrieval (milliseconds), Flexible Retrieval (minutes to hours), and Deep Archive (hours, the cheapest).
- Lifecycle = automatic transitions between classes + object expiration.
- S3 price = storage + requests and retrievals + data transfer out.
