---
title: "Storage: S3, EBS, and EFS"
summary: "Compare object storage (S3), block storage (EBS and instance store), and file storage (EFS) to choose the right one in each exam scenario."
domain: "technology-services"
order: 12
examTasks: ["3.6"]
services: ["Amazon S3", "Amazon EBS", "Amazon EFS", "Amazon EC2"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html"
  - "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html"
  - "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html"
quiz:
  - prompt: "A streaming startup in Buenos Aires needs several Linux EC2 instances to mount the same shared configuration folder over NFS and read and write to it at the same time, without provisioning capacity. Which service should it use?"
    options:
      - label: "Amazon EBS"
        explanation: "An EBS volume is generally attached to a single instance and only some types support Multi-Attach; it is not the choice for a shared folder over NFS."
      - label: "Instance store"
        explanation: "Instance store is temporary storage on the physical disk of an instance's host; it is not shared between instances."
      - label: "Amazon EFS"
        explanation: "Amazon EFS provides files over NFS with parallel access from many instances and grows and shrinks automatically, exactly what the shared folder needs."
        correct: true
      - label: "Amazon S3"
        explanation: "Amazon S3 is object storage accessed through an API and URLs; it is not mounted as an NFS file system on instances."
  - prompt: "A logistics company in Quito stores working data on the instance store of an EC2 instance. What happens to that data if it stops the instance?"
    options:
      - label: "It is lost, because instance store is temporary storage"
        explanation: "Instance store data survives a reboot, but it is lost if the instance is stopped, hibernated, or terminated."
        correct: true
      - label: "It is kept, just like on an EBS volume"
        explanation: "Persistence independent of the instance is an EBS feature; instance store lasts only as long as the instance."
      - label: "It is automatically copied to Amazon S3"
        explanation: "AWS does not automatically copy instance store to S3; that is why valuable data should be stored on EBS, S3, or EFS."
      - label: "It is moved to another instance in the same Availability Zone"
        explanation: "Instance store is a physical disk on the host and cannot be moved to another instance; detaching and attaching is an EBS feature."
  - prompt: "Amazon S3 is designed for 99.999999999% (eleven nines) durability. What does that figure describe?"
    options:
      - label: "How long S3 takes to deliver an object"
        explanation: "Durability does not measure response speed; S3 storage classes differ in retrieval times, which is a different concept."
      - label: "Protection against loss of the stored objects"
        explanation: "Durability means not losing data; S3 achieves it by storing redundant copies of objects on multiple devices and, in most of its classes, across multiple Availability Zones."
        correct: true
      - label: "The ability to access the objects when you need them"
        explanation: "Being able to access the data when you need it is availability, which is 99.99% in S3 Standard, not durability."
      - label: "The percentage of objects that are public by default"
        explanation: "By default, S3 buckets and their objects are private; the eleven-nines figure has nothing to do with public access."
practice:
  - prompt: "A tourism agency in Cusco wants to publish a static website with HTML, CSS, and images, along with videos that visitors download over the internet, paying only for what it uses. Which storage service should it choose?"
    options:
      - label: "Amazon EBS"
        explanation: "Amazon EBS provides block volumes that attach to an EC2 instance as a disk; it does not serve files directly over the internet through URLs."
      - label: "Amazon EFS"
        explanation: "Amazon EFS is an NFS file system mounted by instances and compute services; it is not designed to serve a static site directly over the internet."
      - label: "Instance store"
        explanation: "Instance store is temporary storage on the host's physical disk; its data is lost when the instance is stopped or terminated."
      - label: "Amazon S3"
        explanation: "Amazon S3 stores objects accessible through an API and URLs, can serve static websites directly from a bucket, and charges only for what you use."
        correct: true
  - prompt: "A team in Cali created an Amazon EBS volume in one Availability Zone and wants to attach it to an EC2 instance that is in another AZ of the same Region. What should it keep in mind?"
    options:
      - label: "EBS automatically replicates the volume to all AZs in the Region"
        explanation: "An EBS volume is scoped to a single AZ; it is not replicated to the other AZs so it can be attached from any of them."
      - label: "The volume and the instance must be in the same Availability Zone"
        explanation: "An EBS volume can only be attached to an instance in its same AZ, so it cannot be connected to the instance in the other AZ."
        correct: true
      - label: "It must convert the EBS volume into instance store"
        explanation: "Instance store is a physical disk on the host that comes with the instance; it is not a way to move an EBS volume to another AZ."
      - label: "It can attach it as is because EBS is a regional service like S3"
        explanation: "S3 and EFS Regional work at the Region level, but EBS lives in a single AZ; that is why the volume cannot be attached to an instance in another AZ."
  - prompt: "An analytics company in Rosario needs space on an EC2 instance for buffers and temporary working data that is already replicated elsewhere, and prefers that storage to be included in the instance price. Which option fits best?"
    options:
      - label: "Instance store"
        explanation: "Instance store is included in the instance price and is ideal for buffers, caches, and temporary working data that you can afford to lose."
        correct: true
      - label: "Amazon EBS"
        explanation: "Amazon EBS is billed separately based on what you provision and can persist independently of the instance; the scenario asks for temporary storage included with the instance."
      - label: "Amazon EFS"
        explanation: "Amazon EFS is an elastic shared file system for shared folders; it is not temporary storage included in the instance price."
      - label: "Amazon S3 Glacier"
        explanation: "The S3 Glacier classes are for low-cost long-term archiving; they do not work as an instance's temporary working space."
  - prompt: "An accounting firm in San José has Windows EC2 instances that need a shared file folder, and a colleague proposes Amazon EFS. What should you tell him?"
    options:
      - label: "EFS works the same on Windows and Linux because it uses NFS"
        explanation: "Although EFS uses NFS, it is not supported on Windows-based EC2 instances, so it does not work for these instances."
      - label: "It is better to attach a single EBS volume to all the Windows instances"
        explanation: "An EBS volume is generally attached to a single instance and only some types support Multi-Attach; it is not the solution for a shared folder."
      - label: "EFS is not supported on Windows EC2 instances; Amazon FSx for Windows File Server exists for that"
        explanation: "EFS is not supported on Windows EC2 instances, and for shared files on Windows there is Amazon FSx for Windows File Server."
        correct: true
      - label: "It is better to share the instance store between the instances"
        explanation: "Instance store is a physical disk on an instance's host and is not shared between instances."
  - prompt: "An education platform in La Paz stores materials in Amazon S3 whose access pattern is unknown and changes over time. Which storage class is designed for that pattern?"
    options:
      - label: "S3 One Zone-IA"
        explanation: "S3 One Zone-IA is designed for infrequently accessed data; it is not the class for changing or unknown access patterns."
      - label: "S3 Intelligent-Tiering"
        explanation: "S3 Intelligent-Tiering is the class designed for changing or unknown access patterns, like that of these materials."
        correct: true
      - label: "S3 Standard"
        explanation: "S3 Standard is designed for frequently accessed data; the scenario describes an unknown and changing pattern."
      - label: "S3 Glacier"
        explanation: "The S3 Glacier classes are designed for low-cost archiving, not for materials with a changing or unknown access pattern."
  - prompt: "A developer in Tegucigalpa uploads photos to a new Amazon S3 bucket without changing any access settings. What happens with access to those photos?"
    options:
      - label: "Anyone with the URL can see them, because S3 makes objects public by default"
        explanation: "S3 does not make objects public by default; buckets and their objects start out private."
      - label: "Only EC2 instances in the same AZ can see them, because S3 lives in one AZ"
        explanation: "S3 Standard stores objects across a minimum of three Availability Zones in a Region; access is not defined by an instance's AZ."
      - label: "Any instance can see them by mounting the bucket over NFS"
        explanation: "S3 is object storage accessed through an API and URLs; it is not mounted over NFS like a file system."
      - label: "They are private, because S3 buckets and their objects are private by default"
        explanation: "By default, S3 buckets and objects are private, so the photos are not public when uploaded."
        correct: true
---

## Why does it matter?

A streaming startup in Buenos Aires has three needs. First, to store thousands of videos and thumbnails that users will download from the web. Second, to give its database a fast "hard drive" connected to the server. Third, to let several servers read and write to the same shared configuration folder.

These are three different storage problems, and AWS has a service for each one: **Amazon S3**, **Amazon EBS**, and **Amazon EFS**. The exam will ask you to choose the right one based on the scenario.

## Amazon S3: object storage

**Amazon Simple Storage Service (Amazon S3)** is an **object storage** service. An **object** is a file together with the metadata that describes it, and a **bucket** is the container for those objects. Each object is identified within the bucket by its **key** (name).

Key features:

- It is accessed over the internet through an API and URLs; it is not "mounted" as a server's disk.
- It is designed for **99.999999999%** (eleven nines) durability and **99.99%** availability of objects over a year (S3 Standard).
- S3 Standard and other classes store objects redundantly across **a minimum of three Availability Zones** in a Region.
- By default, buckets and their objects are **private**.
- It offers **storage classes** for different access patterns: S3 Standard (frequent access), S3 Standard-IA and S3 One Zone-IA (infrequent access), S3 Intelligent-Tiering (changing or unknown patterns), and the S3 Glacier classes for low-cost archiving.
- You pay only for what you use, without reserving capacity.

Typical **object storage** use cases:

- **Static websites** (HTML, CSS, images) served directly from a bucket.
- Long-term **backup and archiving**, combining cheaper storage classes.
- **Media files** (videos, photos, documents) downloaded over the internet.
- **Data lakes**: a central repository of raw data that is later analyzed with services such as Amazon Athena.
- **Application data**, such as logs or files uploaded by users.

## Amazon EBS: block storage

**Amazon Elastic Block Store (Amazon EBS)** provides **block storage volumes** that attach to **Amazon EC2** instances (virtual servers). Once attached, it is used like a **physical hard drive**. **Block** storage splits data into fixed-size blocks, which allows fast modifications, ideal for operating systems and databases.

Key features:

- The volume and the instance must be in the **same Availability Zone**.
- Volumes **persist independently** of the life of the EC2 instance. Exception: the root volume is deleted by default when the instance is terminated (the DeleteOnTermination attribute), and you can change that.
- An instance can have several EBS volumes. Generally, a volume is attached to a single instance; only some volume and instance types support **Multi-Attach** to connect to several at once.
- There are SSD and HDD types to balance performance and price.

Typical use cases: an instance's operating system disk, storage for a database.

## Instance store: temporary blocks

**Instance store** is also **block** storage, but **temporary** (ephemeral). It is provided by disks **physically attached to the host server** where the EC2 instance runs.

Key features:

- Data **survives a reboot** of the instance.
- Data **is lost** if the instance is **stopped**, **hibernated**, or **terminated**, or if the underlying disk fails.
- Not all instance types include it; the size depends on the instance type and size.

Typical use cases: buffers, caches, temporary working data (*scratch data*), and data that is already replicated across a fleet of servers. For valuable long-term data, use EBS, S3, or EFS.

| | Amazon EBS | Instance store |
| --- | --- | --- |
| Persistence | Persists independently of the instance's life | Lasts only as long as the instance; lost when it is stopped or terminated |
| Location | Network volume in the same AZ | Physical disk on the host |
| Can it move to another instance? | Yes, it is detached and attached | No |
| Cost | Billed separately based on what you provision | Included in the instance price |
| Ideal use | Operating system, databases | Caches, buffers, temporary data |

## Amazon EFS: shared file storage

**Amazon Elastic File System (Amazon EFS)** provides *serverless*, fully elastic **file storage**: it **grows and shrinks automatically** as you add or remove files, without provisioning capacity.

Key features:

- It uses the **NFS** (*Network File System*) protocol, with folders and files like a network drive.
- It allows **massively parallel access** from many instances and compute services at once (EC2, ECS, EKS, Lambda, Fargate).
- **Regional** file systems store data redundantly across **multiple AZs**; there is also a **One Zone** option.
- It is not supported on Windows-based EC2 instances.

Typical use cases: shared folders, content management systems, user home directories.

## Quick comparison

| | Amazon S3 | Amazon EBS | Amazon EFS |
| --- | --- | --- | --- |
| Type | Objects | Blocks (persistent) | Files (NFS) |
| How is it accessed? | API / URL over the internet | Disk attached to an EC2 instance | File system mounted by many instances |
| Scope | Regional (multiple AZs in most classes) | A single AZ | Regional (multiple AZs) or One Zone |
| Shared between instances | Yes, through the API | Usually not (limited Multi-Attach) | Yes, natively |
| Capacity | Pay for use, no provisioning | Volume size defined by you | Elastic, grows and shrinks on its own |
| Example | Videos and backups | A database's disk | Shared configuration folder |

## Common exam traps

- **Choosing EBS to share files among many instances.** The answer is **EFS**.
- **Forgetting that EBS lives in a single AZ.** You cannot attach a volume to an instance in another AZ.
- **Thinking S3 is mounted as an operating system disk.** S3 is object storage accessed through an API.
- **Confusing durability with availability.** Durability = not losing data (eleven nines in S3); availability = being able to access it when you need it.
- **Choosing EFS for Windows servers.** EFS is not supported on Windows EC2 instances (Amazon FSx for Windows File Server exists for that).
- **Storing important data on instance store.** It is lost when the instance is stopped or terminated; use EBS for persistent data.

## Exam summary

- S3 = objects in buckets; eleven nines of durability; ideal for files, static websites, and backups.
- S3 is private by default and has storage classes based on the access pattern.
- EBS = persistent blocks; an EC2 instance's disk in the same AZ.
- Instance store = temporary blocks on the host; ideal for caches; data is lost when the instance is stopped or terminated.
- EBS volumes persist even if the instance stops; when it is terminated, additional volumes remain and the root volume is deleted by default.
- EFS = shared files over NFS; elastic and accessible by many instances.
- EFS Regional stores data across multiple AZs.
- Keyword "shared" → EFS; "the instance's disk" → EBS; "temporary or cache on the host" → instance store; "objects or internet" → S3.
