---
title: "FSx, Storage Gateway, AWS Backup, and Elastic Disaster Recovery"
summary: "Managed file systems with Amazon FSx, hybrid storage with Storage Gateway, centralized backups with AWS Backup, and recovery with Elastic Disaster Recovery."
domain: "technology-services"
order: 14
examTasks: ["3.6"]
services: ["Amazon FSx", "AWS Storage Gateway", "AWS Backup", "AWS Elastic Disaster Recovery"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/fsx/"
  - "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html"
  - "https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html"
  - "https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html"
  - "https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html"
  - "https://aws.amazon.com/storagegateway/"
  - "https://docs.aws.amazon.com/filegateway/latest/filefsxw/what-is-file-fsxw.html"
  - "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"
  - "https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-out-of-scope-services.html"
quiz:
  - prompt: "A pharmacy chain in Guadalajara wants to move its Windows shared folders, which use the SMB protocol and integrate with Microsoft Active Directory, to AWS without changing how employees work. Which service should it choose?"
    options:
      - label: "Amazon EFS"
        explanation: "Amazon EFS is an NFS file system that is not supported on Windows EC2 instances, so it does not work for Windows shared folders with SMB."
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server is built on Windows Server, uses SMB, and integrates with Active Directory: it is the choice for Windows shared folders."
        correct: true
      - label: "Tape Gateway"
        explanation: "Tape Gateway presents virtual tapes to backup software; it does not offer shared file folders for employees."
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery replicates servers so they can be recovered in minutes after a disaster; it is not a shared file server."
  - prompt: "A distributor in Bogotá backs up its servers to physical tapes and wants to stop buying them, without changing the workflow of its backup software and while storing the data in Amazon S3 or S3 Glacier. Which type of AWS Storage Gateway should it use?"
    options:
      - label: "Volume Gateway"
        explanation: "Volume Gateway presents iSCSI block volumes to extend local storage; it does not present virtual tapes to backup software."
      - label: "Amazon FSx for NetApp ONTAP"
        explanation: "FSx for NetApp ONTAP is a managed multiprotocol file system; it does not replace physical tapes in a backup workflow."
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery keeps replicated servers ready to start in AWS; it does not emulate tapes for backup software."
      - label: "Tape Gateway"
        explanation: "Tape Gateway presents virtual tapes to your backup software and stores the data in Amazon S3 or S3 Glacier, without changing the backup workflow."
        correct: true
  - prompt: "An insurance company in Santiago wants to define in one place when to back up its Amazon EC2, Amazon RDS, and Amazon DynamoDB resources, assign those policies using tags, and prevent anyone from deleting the backups. Which service meets this goal?"
    options:
      - label: "AWS Backup"
        explanation: "AWS Backup centralizes backups with backup plans that can be assigned by tags, and AWS Backup Vault Lock prevents deleting backups or changing their retention."
        correct: true
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery keeps complete replicated servers to recover in minutes; it does not define centralized backup policies by tags."
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presents NFS or SMB file shares backed by S3; it does not manage backup policies for EC2, RDS, and DynamoDB."
      - label: "Amazon FSx for OpenZFS"
        explanation: "FSx for OpenZFS is a managed file system built on OpenZFS; it does not centralize or protect backups of other services."
practice:
  - prompt: "An engineering firm in Monterrey already uses NetApp in its data center and wants a managed file system in AWS that Linux, Windows, and macOS machines can access over NFS, SMB, and iSCSI. Which service should it choose?"
    options:
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server is built on Windows Server and uses SMB; it is not the choice for a company that already uses NetApp and needs access over NFS, SMB, and iSCSI."
      - label: "Amazon EFS"
        explanation: "Amazon EFS is an NFS file system that is not supported on Windows EC2 instances; it does not cover the multiprotocol access of a company that already uses NetApp."
      - label: "Amazon FSx for NetApp ONTAP"
        explanation: "FSx for NetApp ONTAP is built on NetApp ONTAP and offers access over NFS, SMB, iSCSI, and NVMe from Linux, Windows, and macOS."
        correct: true
      - label: "Volume Gateway"
        explanation: "Volume Gateway presents iSCSI volumes from a device in your data center to extend local storage; it is not a managed multiprotocol file system in AWS."
  - prompt: "A hospital in Barranquilla wants to continuously replicate its on-premises servers to AWS, run drills without disrupting operations, and, if its data center floods, bring the servers up in AWS within minutes and later return to its primary site. Which service should it use?"
    options:
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery continuously replicates servers to a staging area, allows drills, launches recovery instances in minutes, and supports failback."
        correct: true
      - label: "AWS Backup"
        explanation: "AWS Backup centralizes copies for restoring data; it does not keep complete replicated servers ready to start in minutes with failback."
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presents NFS or SMB file shares backed by Amazon S3; it does not replicate complete servers to recover them after a disaster."
      - label: "Amazon FSx for OpenZFS"
        explanation: "FSx for OpenZFS is a managed file system built on OpenZFS; it does not replicate or recover on-premises servers after a disaster."
  - prompt: "A publisher in Córdoba wants its local servers to keep saving files to NFS file shares, but wants those files to end up as objects in Amazon S3 to feed a data lake, with the most-used ones in a local cache. Which type of AWS Storage Gateway fits?"
    options:
      - label: "Volume Gateway"
        explanation: "Volume Gateway presents iSCSI block volumes; it does not offer NFS file shares whose files are stored as objects in S3."
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presents NFS or SMB file shares, stores files as objects in Amazon S3, and keeps the most-used data in a local cache."
        correct: true
      - label: "Tape Gateway"
        explanation: "Tape Gateway presents virtual tapes to backup software; it does not offer file shares to feed a data lake."
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery replicates servers to recover them after a disaster; it does not present NFS file shares connected to S3."
  - prompt: "A manufacturing plant in Puebla wants to extend the block storage of its local servers with cloud-backed iSCSI volumes, so it can recover them from AWS. Which type of AWS Storage Gateway should it use?"
    options:
      - label: "Amazon S3 File Gateway"
        explanation: "S3 File Gateway presents NFS or SMB file shares; it does not present iSCSI block volumes to local servers."
      - label: "Tape Gateway"
        explanation: "Tape Gateway presents virtual tapes for backup software; it does not extend block storage with iSCSI volumes."
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server offers Windows shared folders over SMB; it is not a hybrid gateway that presents iSCSI volumes to local servers."
      - label: "Volume Gateway"
        explanation: "Volume Gateway presents iSCSI block volumes, in a cached or stored architecture, stores the data in Amazon S3, and enables recovery in the cloud."
        correct: true
  - prompt: "A university in Valparaíso wants to move some Linux file servers that already use ZFS to AWS, with a fully managed service that uses NFS. Which Amazon FSx option should it choose?"
    options:
      - label: "Amazon FSx for Lustre"
        explanation: "FSx for Lustre is a high-performance file system for HPC compute and is out of scope for CLF-C02; it is not the choice for workloads that already use ZFS."
      - label: "Amazon FSx for OpenZFS"
        explanation: "FSx for OpenZFS is built on OpenZFS, uses NFS, and is the choice for migrating workloads that already use ZFS or other Linux file servers."
        correct: true
      - label: "Amazon FSx for Windows File Server"
        explanation: "FSx for Windows File Server is built on Windows Server and uses SMB with Active Directory; it is not the choice for Linux servers with ZFS."
      - label: "Tape Gateway"
        explanation: "Tape Gateway replaces physical tapes with virtual tapes for backups; it is not a managed file system for ZFS servers."
  - prompt: "A financial cooperative in Cuenca must keep copies of its backups in another Region and in another account in its AWS Organizations organization, and prove to the regulator that all its resources are backed up. Which service meets both requirements?"
    options:
      - label: "AWS Elastic Disaster Recovery"
        explanation: "AWS Elastic Disaster Recovery keeps replicated servers ready to recover in minutes; it is not the centralized backup service with compliance auditing the regulator asks for."
      - label: "Tape Gateway"
        explanation: "Tape Gateway presents virtual tapes to local backup software; it does not manage cross-Region and cross-account copies or audit backup compliance."
      - label: "AWS Backup"
        explanation: "AWS Backup lets you copy backups across Regions and across AWS Organizations accounts, and AWS Backup Audit Manager helps prove compliance."
        correct: true
      - label: "Amazon FSx for NetApp ONTAP"
        explanation: "FSx for NetApp ONTAP is a managed multiprotocol file system; it does not centralize backups of other services or prove their compliance."
---

## Why does it matter?

A pharmacy chain in Guadalajara has a Windows file server at its head office and an inventory system on its own servers. It wants three things: to move its Windows shared folders to the cloud without changing how employees work, to keep using its data center while using AWS as unlimited storage, and to be able to recover in minutes if its data center floods.

For these scenarios, the exam expects you to recognize **Amazon FSx**, **AWS Storage Gateway**, **AWS Backup**, and **AWS Elastic Disaster Recovery**.

## Amazon FSx: managed file servers

**Amazon FSx** offers **fully managed** shared file systems built on popular file technologies. AWS takes care of the hardware, patching, failure detection, and backups.

| Option | Built on | Use it when… |
| --- | --- | --- |
| Amazon FSx for Windows File Server | Windows Server; **SMB** protocol; Microsoft Active Directory integration | You need Windows shared folders or want to move Windows applications without changes |
| Amazon FSx for NetApp ONTAP | NetApp ONTAP file system; access over NFS, SMB, iSCSI, and NVMe | You already use NetApp in your data center or need multiprotocol access from Linux, Windows, and macOS |
| Amazon FSx for OpenZFS | OpenZFS file system; NFS protocol | You want to migrate workloads that already use ZFS or other Linux file servers |
| Amazon FSx for Lustre | Lustre high-performance file system | High performance computing (HPC) |

**Important for the exam:** Amazon FSx is in scope, but **Amazon FSx for Lustre appears on the official list of services out of scope** for CLF-C02. It is enough to know it exists.

**FSx vs. EFS:** Amazon EFS is an elastic, serverless NFS file system that is not supported on Windows EC2 instances. If the scenario says "Windows", "SMB", or "Active Directory", think **FSx for Windows File Server**.

## AWS Storage Gateway: hybrid storage with a local cache

A **hybrid** environment combines your data center (*on-premises*) with the cloud. **AWS Storage Gateway** connects a software device installed in your data center (a virtual machine or a hardware appliance) to AWS storage. Local applications keep using familiar protocols, while the data is stored in the cloud and the most-used data stays in a **local cache** for low-latency access. That is why the exam guide mentions it as an example of **cached file systems**.

| Gateway type | What it presents to your servers | Where the data lives | Typical use |
| --- | --- | --- | --- |
| Amazon S3 File Gateway | **NFS or SMB** file shares | Objects in Amazon S3 | Feeding data lakes, archiving files, backing up databases to S3 |
| Volume Gateway | **iSCSI** block volumes (*cached* or *stored* architecture) | Amazon S3, with the option to move to Amazon EBS | Extending local block storage with recovery in the cloud |
| Tape Gateway | **Virtual tapes** for your backup software | Amazon S3 or S3 Glacier | Replacing physical tapes without changing the backup workflow |
| Amazon FSx File Gateway | Local access to FSx for Windows File Server file shares | Amazon FSx for Windows File Server | **No longer available to new customers**; existing customers can keep using it |

## AWS Backup: centralized backups

**AWS Backup** is a fully managed service for **centralizing and automating data protection** across AWS services, in the cloud and on premises. Instead of configuring backups service by service with your own scripts, you define policies in one place.

Key concepts:

- **Backup plans**: policies that say when to back up, how long to retain, and where to copy. They can be assigned to resources using **tags**.
- **Backup vaults**: encrypted containers where backups are stored, separate from the source resources. **AWS Backup Vault Lock** protects backups with a *write-once-read-many* model: in compliance mode, nobody (not even the root user) can delete them or shorten their retention; in governance mode, only someone with special IAM permissions can do so.
- **Cross-Region and cross-account copies** within AWS Organizations, useful for business continuity and compliance.
- Backup **lifecycle** to cheaper cold storage and **AWS Backup Audit Manager** to prove compliance.

Supported services include, among others: Amazon EC2, Amazon EBS, Amazon S3, Amazon RDS, Amazon Aurora, Amazon DynamoDB, Amazon EFS, Amazon FSx, and Storage Gateway volumes.

Use cases: meeting regulatory retention requirements, applying the same backup policy across the whole organization, protecting backups against accidental or malicious deletion, and auditing that everything is backed up.

## AWS Elastic Disaster Recovery

**AWS Elastic Disaster Recovery** (AWS DRS) minimizes downtime and data loss with fast, reliable recovery of **on-premises or cloud-based** applications into AWS.

How it works:

- It continuously replicates your source servers to a **staging area** in the AWS Region you choose, using low-cost storage and minimal compute to reduce costs.
- It lets you run **drills** without disrupting operations.
- In a disaster, you launch recovery instances in AWS **within minutes**, using the most recent state or an earlier point in time.
- Once the problem is resolved, you can **fail back** to your primary site.

**Backup vs. Disaster Recovery:** AWS Backup keeps copies for restoring data; Elastic Disaster Recovery keeps complete servers ready to start in AWS with little downtime.

## Common exam traps

- **Choosing EFS for Windows shared folders.** The answer is **Amazon FSx for Windows File Server**.
- **Studying FSx for Lustre in depth.** It is on the official list of services out of scope for CLF-C02.
- **Confusing Storage Gateway with a one-time migration.** Storage Gateway is for an **ongoing hybrid** environment with a local cache.
- **Using Tape Gateway for file shares.** Tape Gateway replaces backup tapes; for files, use S3 File Gateway.
- **Confusing AWS Backup with Elastic Disaster Recovery.** Backup = centralized copies; DRS = replicated servers ready to recover in minutes.

## Exam summary

- Amazon FSx = managed file servers: Windows File Server (SMB, Active Directory), NetApp ONTAP, OpenZFS, and Lustre.
- FSx for Lustre is out of scope for the exam.
- Storage Gateway = hybrid bridge with a local cache: S3 File Gateway (NFS/SMB), Volume Gateway (iSCSI), and Tape Gateway (virtual tapes).
- AWS Backup = centralized backups with plans, vaults, cross-Region and cross-account copies, and Vault Lock.
- AWS Elastic Disaster Recovery = continuous replication and recovery in minutes, with failback.
- Keyword "Windows + shared folders" → FSx for Windows File Server; "on-premises + cloud with cache" → Storage Gateway.
