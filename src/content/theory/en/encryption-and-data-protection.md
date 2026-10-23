---
title: "Encryption and data protection"
summary: "Encryption in transit and at rest, AWS KMS versus AWS CloudHSM, TLS certificates with AWS Certificate Manager, and sensitive data discovery with Amazon Macie."
domain: "security-compliance"
order: 7
examTasks: ["2.2"]
services: ["AWS KMS", "AWS CloudHSM", "AWS Certificate Manager", "Amazon Macie", "Amazon S3", "Amazon RDS"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"
  - "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html"
  - "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html"
  - "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"
  - "https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html"
  - "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
  - "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html"
  - "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html"
  - "https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html"
quiz:
  - prompt: "A clinic in Quito must meet a regulatory requirement: its encryption keys have to live in a dedicated single-tenant HSM, and the clinic must have full control of the keys and the HSM users. Which service should it choose?"
    options:
      - label: "AWS KMS"
        explanation: "AWS KMS is a managed multi-tenant service where control of the keys is shared; it does not offer an HSM dedicated to a single customer."
      - label: "AWS Certificate Manager"
        explanation: "AWS Certificate Manager creates and renews SSL/TLS certificates; it does not provide a dedicated HSM for storing keys."
      - label: "AWS CloudHSM"
        explanation: "AWS CloudHSM provides dedicated single-tenant HSMs in which the customer has full control of the keys and the HSM users, exactly what the requirement demands."
        correct: true
      - label: "Amazon Macie"
        explanation: "Amazon Macie discovers sensitive data in Amazon S3; it does not store or manage encryption keys."
  - prompt: "A retail chain in Lima stores thousands of files in Amazon S3 and needs to find out which ones contain its customers' personally identifiable information (PII). Which AWS service should it use?"
    options:
      - label: "Amazon Macie"
        explanation: "Amazon Macie discovers sensitive data in Amazon S3, such as PII, using machine learning and pattern matching."
        correct: true
      - label: "Amazon GuardDuty"
        explanation: "Amazon GuardDuty detects threats and malicious activity in the account; it does not classify the contents of S3 objects looking for PII."
      - label: "Amazon Inspector"
        explanation: "Amazon Inspector looks for software vulnerabilities in workloads; it does not identify personal data stored in S3."
      - label: "AWS KMS"
        explanation: "AWS KMS creates and controls keys for encrypting data; encrypting the files does not tell you which ones contain PII."
  - prompt: "A startup in Santiago publishes its portal behind Elastic Load Balancing and wants to serve it over HTTPS with a certificate that renews automatically, without paying extra for the certificate. What should it do?"
    options:
      - label: "Import into ACM a certificate bought from another authority"
        explanation: "ACM does not automatically renew imported certificates; the team would have to renew and re-import it on its own."
      - label: "Store the site's key in AWS CloudHSM"
        explanation: "AWS CloudHSM provides a dedicated HSM for controlling keys, but it does not issue or renew SSL/TLS certificates for the site."
      - label: "Keep the default SSE-S3 encryption on the buckets"
        explanation: "SSE-S3 encrypts objects at rest inside S3; it does not protect the portal's traffic in transit or enable HTTPS."
      - label: "Request a public certificate in ACM with DNS validation"
        explanation: "ACM does not charge for public certificates you use with integrated services, such as Elastic Load Balancing, and it automatically renews the ones it issued with DNS validation, such as those associated with Elastic Load Balancing."
        correct: true
practice:
  - prompt: "An insurance company in Montevideo wants to prevent anyone from intercepting the data that travels between its customers' browsers and its web portal. What type of protection does it need?"
    options:
      - label: "Encryption at rest with AWS KMS keys"
        explanation: "Encryption at rest protects data stored on disks, databases, or buckets; it does not protect data while it travels over the network."
      - label: "Encryption in transit with TLS (HTTPS)"
        explanation: "Encryption in transit with TLS, that is HTTPS, protects data traveling over the network against interception."
        correct: true
      - label: "Sensitive data discovery with Amazon Macie"
        explanation: "Amazon Macie discovers sensitive data in Amazon S3; it does not encrypt the communication between the browsers and the portal."
      - label: "SSE-S3 encryption of the bucket's objects"
        explanation: "SSE-S3 encrypts objects at rest inside S3; it does not protect the traffic between customers and the portal."
  - prompt: "A developer in Lima asks whether he needs to turn something on so that the new objects he uploads to Amazon S3 are encrypted at rest. What should you tell him?"
    options:
      - label: "Yes, because S3 stores new objects unencrypted until you turn it on"
        explanation: "Since January 5, 2023, S3 automatically encrypts all new objects with SSE-S3, without you having to turn it on."
      - label: "Yes, he must provision a dedicated HSM in AWS CloudHSM"
        explanation: "CloudHSM is for when a dedicated single-tenant HSM is required; it is not needed for S3 to encrypt new objects."
      - label: "Yes, he must request a certificate in AWS Certificate Manager"
        explanation: "ACM issues SSL/TLS certificates for encryption in transit; it is not what encrypts objects at rest inside S3."
      - label: "No need: S3 automatically encrypts new objects with SSE-S3, at no additional cost"
        explanation: "Since January 5, 2023, Amazon S3 automatically encrypts all new objects with SSE-S3 at no additional cost, and you can choose KMS keys if you prefer."
        correct: true
  - prompt: "A fintech in Bogotá wants to create its own keys to encrypt data in Amazon S3, Amazon EBS, and Amazon RDS, control their policy, rotation, and deletion, and audit their use in AWS CloudTrail. What should it use?"
    options:
      - label: "AWS KMS customer managed keys"
        explanation: "You create customer managed keys and control their policy, rotation, and deletion; KMS integrates with S3, EBS, and RDS, and key usage is audited in CloudTrail."
        correct: true
      - label: "AWS KMS AWS managed keys"
        explanation: "AWS managed keys are created by a service in your account; you can view them, but you cannot manage their policy or deletion."
      - label: "AWS owned keys"
        explanation: "AWS owned keys are used by the service on your behalf to encrypt by default; you cannot see or control them."
      - label: "AWS Certificate Manager"
        explanation: "AWS Certificate Manager creates and renews SSL/TLS certificates; it does not create keys to encrypt data in S3, EBS, and RDS."
  - prompt: "An auditor at a mining company in Antofagasta finds AWS KMS keys in the account that a service created automatically. She can view them but not manage them, and they rotate every year. What type of keys are they?"
    options:
      - label: "Customer managed keys"
        explanation: "You create and control customer managed keys, including their policy, rotation, and deletion."
      - label: "AWS owned keys"
        explanation: "AWS owned keys are used by the service on your behalf and are not visible in your account, unlike the ones the auditor found."
      - label: "AWS managed keys"
        explanation: "AWS managed keys are created by a service in your account; you can view them but not manage them, and they rotate every year."
        correct: true
      - label: "Keys stored in AWS CloudHSM"
        explanation: "In AWS CloudHSM the customer has full control of the keys and the HSM users; they are not keys created by a service that you cannot manage."
  - prompt: "A digital news outlet in Guayaquil wants to use an AWS Certificate Manager certificate with Amazon CloudFront. In which Region must that certificate be?"
    options:
      - label: "In the Region closest to its readers"
        explanation: "ACM certificates are regional, and to use them with CloudFront they must be in US East (N. Virginia), regardless of where the readers are."
      - label: "In US East (N. Virginia)"
        explanation: "ACM certificates are regional and, to use them with CloudFront, they must be in the US East (N. Virginia) Region."
        correct: true
      - label: "In any Region, because ACM certificates are global"
        explanation: "ACM certificates are regional, not global; for CloudFront they must be in US East (N. Virginia)."
      - label: "In the same Region as its S3 bucket"
        explanation: "For CloudFront, the ACM certificate must be in US East (N. Virginia), regardless of the bucket's Region."
  - prompt: "A hospital in Rosario uses Amazon RDS and must encrypt the database and its snapshots at rest, as well as protect the application's connections. What does Amazon RDS offer for this?"
    options:
      - label: "Encryption at rest of instances and snapshots with AES-256, and SSL/TLS connections"
        explanation: "Amazon RDS lets you encrypt instances and snapshots at rest with AES-256 and use SSL/TLS connections for traffic."
        correct: true
      - label: "Scanning with Amazon Macie, which encrypts the database"
        explanation: "Amazon Macie discovers sensitive data in Amazon S3; it does not encrypt Amazon RDS databases."
      - label: "An AWS Certificate Manager certificate that encrypts the snapshots"
        explanation: "ACM issues SSL/TLS certificates to identify sites and enable HTTPS; it does not encrypt snapshots at rest."
      - label: "Turn on SSE-S3 on the RDS instance"
        explanation: "SSE-S3 is Amazon S3 encryption with S3 managed keys; it is not the way to encrypt an RDS instance."
---

## Why does it matter?

A clinic in Quito stores medical records and X-rays in Amazon S3, and its web portal lets patients download their results. Regulations require the data to be **encrypted**, that nobody can intercept it along the way, and that the clinic knows exactly **where personal data lives**. On top of that, the auditor asks: "who controls the keys?"

One of the benefits of security in the cloud is that AWS offers **built-in encryption and managed key services**, so protecting data does not require buying or operating your own cryptographic hardware.

## Encryption in transit vs. at rest

**Encryption** transforms data with a **key** so that only someone with the right key can read it.

| | In transit | At rest |
| --- | --- | --- |
| What it protects | Data traveling over the network | Data stored on disks, databases, or buckets |
| Typical threat | Someone intercepts the communication | Someone accesses the storage or a copy |
| How it is achieved | **TLS** (*Transport Layer Security*), that is, HTTPS | Server-side or client-side encryption with keys (for example, from AWS KMS) |
| Examples in AWS | HTTPS connections to websites and AWS APIs; SSL/TLS connections to Amazon RDS | Amazon S3 automatically encrypts every new object; encrypted volumes and databases |

Verified key facts:

- Since **January 5, 2023**, **Amazon S3 automatically encrypts all new objects** with SSE-S3 (S3 managed keys), at no additional cost. You can choose AWS KMS keys instead.
- **Amazon RDS** lets you encrypt instances and snapshots at rest (with AES-256) and use SSL/TLS connections.
- AWS APIs are called over TLS; for example, Amazon VPC requires TLS 1.2 and recommends TLS 1.3.

## AWS KMS: managed keys

**AWS Key Management Service (AWS KMS)** is a managed service for **creating and controlling the keys** you use to encrypt and sign data.

- KMS keys are protected by **hardware security modules** (**HSMs**) validated under **FIPS 140-3 Level 3**, and they **never leave KMS unencrypted**.
- It integrates with many services (S3, EBS, RDS, among others), and **key policies** define who can use the keys. Key usage can be audited in **AWS CloudTrail**.
- Key types:
  - **Customer managed**: you create them and control their policy, rotation, and deletion. They have a monthly and per-use charge.
  - **AWS managed**: a service creates them in your account; you can view them, but not manage them. They rotate every year.
  - **AWS owned**: the service uses them on your behalf to encrypt by default; you do not see them and they cost you nothing.

## AWS CloudHSM: your own dedicated HSM

**AWS CloudHSM** gives you **dedicated single-tenant HSMs** in the cloud. AWS automates hardware management (provisioning, backups, maintenance), but **you have full control of the keys and the users** of the HSM, outside of IAM.

| | AWS KMS | AWS CloudHSM |
| --- | --- | --- |
| Model | Managed, multi-tenant service | HSM dedicated to a single customer |
| Key control | Shared: AWS operates the service and you define policies | **Full customer control**, including HSM user management |
| Integration | Native with many AWS services | Through standard interfaces (PKCS #11, JCE, CNG/KSP) |
| Operational effort | Low | Higher: more responsibility for the customer |
| When to choose it | Almost always | Requirement for a dedicated HSM or exclusive control of the keys |

## AWS Certificate Manager: TLS certificates

An **SSL/TLS certificate** proves a website's identity and enables HTTPS. **AWS Certificate Manager (ACM)** creates, stores, and **renews** public and private certificates.

- **There is no additional charge for public certificates you use with ACM integrated services** (for example, Elastic Load Balancing or Amazon CloudFront); you pay for the resources you use. Exportable public certificates and private certificates from AWS Private CA do have a cost.
- **Managed renewal**: ACM automatically renews the certificates it issued (with DNS validation), for example those associated with Elastic Load Balancing or Amazon CloudFront. **Imported certificates are not renewed** automatically.
- Certificates are regional; to use them with CloudFront they must be in the US East (N. Virginia) Region.

## Amazon Macie: where the sensitive data is

**Amazon Macie** is a data security service that **discovers sensitive data in Amazon S3** using **machine learning and pattern matching**: personally identifiable information (**PII**), financial data, or credentials. It also maintains an **inventory of your buckets** and generates findings if, for example, a bucket becomes **public**. Its findings can be sent to Amazon EventBridge and AWS Security Hub CSPM.

## Common exam traps

- **Confusing KMS with CloudHSM.** "Dedicated hardware" or "exclusive control of the HSM" → **CloudHSM**; "managed keys integrated with services" → **KMS**.
- **Using Macie to detect threats or vulnerabilities.** Macie looks for **sensitive data in S3**; threats = GuardDuty; vulnerabilities = Inspector.
- **Thinking ACM renews any certificate.** **Imported** certificates do not renew on their own.
- **Confusing TLS (in transit) with disk encryption (at rest).**
- **Believing you must turn on encryption in S3 for new objects.** They are already encrypted by default.

## Exam summary

- In transit = TLS/HTTPS; at rest = storage encryption with keys.
- S3 automatically encrypts new objects (SSE-S3) since 2023.
- KMS = managed keys in FIPS 140-3 Level 3 HSMs, integrated with services and auditable in CloudTrail.
- KMS keys: customer managed, AWS managed, and AWS owned.
- CloudHSM = dedicated single-tenant HSM; the customer controls the keys.
- ACM = SSL/TLS certificates at no additional charge, with automatic renewal of the ones ACM issued.
- Macie = discover sensitive data (PII) in S3.
