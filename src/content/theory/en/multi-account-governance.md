---
title: "Multi-account governance: Organizations, Control Tower, and RAM"
summary: "Why use multiple AWS accounts and how to govern them with AWS Organizations, OUs, SCPs, the AWS Control Tower landing zone, and sharing with AWS RAM."
domain: "security-compliance"
order: 6
examTasks: ["2.2"]
services: ["AWS Organizations", "AWS Control Tower", "AWS RAM", "AWS IAM Identity Center", "Amazon VPC"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html"
  - "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html"
  - "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/benefits-of-using-multiple-aws-accounts.html"
  - "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html"
  - "https://docs.aws.amazon.com/ram/latest/userguide/what-is.html"
quiz:
  - prompt: "A pharmacy chain in Bogotá uses AWS Organizations and wants nobody in the accounts of the Production OU, not even an administrator with AdministratorAccess, to be able to launch resources outside the approved Regions. What should it use?"
    options:
      - label: "AWS RAM"
        explanation: "AWS RAM shares resources across accounts; it does not limit the maximum permissions of the identities in an OU."
      - label: "Organizations consolidated billing"
        explanation: "Consolidated billing groups the accounts' costs; it does not restrict which Regions they can use."
      - label: "A service control policy (SCP) on the OU"
        explanation: "An SCP attached to the OU sets the maximum permissions of its member accounts, so not even an administrator with AdministratorAccess can use unapproved Regions."
        correct: true
      - label: "AWS Control Tower Account Factory"
        explanation: "Account Factory is for creating new, preconfigured accounts; it is not the mechanism that limits Regions in an existing OU."
  - prompt: "An insurance company in Quito wants to quickly set up a multi-account environment with security best practices: a predefined landing zone, prepackaged preventive and detective controls, and a dashboard. Which service should it use?"
    options:
      - label: "AWS Control Tower"
        explanation: "AWS Control Tower sets up a predefined landing zone with preventive, detective, and proactive controls, Account Factory, and a dashboard."
        correct: true
      - label: "AWS Organizations on its own"
        explanation: "AWS Organizations is the foundational service for grouping accounts, but you design the structure yourself; it does not come with a ready-made landing zone."
      - label: "AWS RAM"
        explanation: "AWS RAM shares resources across accounts; it does not create or govern a multi-account environment."
      - label: "A service control policy (SCP)"
        explanation: "An SCP limits maximum permissions that you write; on its own it does not create a landing zone or a governance dashboard."
  - prompt: "A mining company in Lima has a central networking account with an Amazon VPC and wants its other accounts in the organization to use those subnets without duplicating them in each account. Which service should it use?"
    options:
      - label: "AWS Control Tower"
        explanation: "AWS Control Tower sets up and governs the landing zone; it is not the service for sharing subnets across accounts."
      - label: "A service control policy (SCP)"
        explanation: "An SCP only limits maximum permissions and does not grant access, so it does not let other accounts use the subnets."
      - label: "Organizations consolidated billing"
        explanation: "Consolidated billing groups the accounts' payments; it does not share network resources among them."
      - label: "AWS Resource Access Manager (AWS RAM)"
        explanation: "AWS RAM shares resources across accounts, such as Amazon VPC subnets from a central networking account, without duplicating them and at no additional charge."
        correct: true
practice:
  - prompt: "A distributor in Guadalajara attached to the Development OU an SCP that allows all Amazon S3 actions. An IAM user in a member account of that OU has no IAM policy attached. Can the user use Amazon S3?"
    options:
      - label: "No, because the SCP does not grant permissions; the user also needs an IAM policy that allows it"
        explanation: "An SCP only sets the maximum permissions; the effective permission is the intersection of the SCP and the IAM policy, and this user has none."
        correct: true
      - label: "Yes, because the SCP grants access to Amazon S3"
        explanation: "This is the classic exam trap: an SCP only limits the maximum permissions; permissions are granted by IAM, and this user has no policy."
      - label: "Yes, as long as the organization has consolidated billing"
        explanation: "Consolidated billing groups the accounts' costs; it does not grant permissions or change how the SCP and the IAM policy combine."
      - label: "Yes, if the management account shares permissions with the user through AWS RAM"
        explanation: "AWS RAM shares resources across accounts, not permissions; the user still needs an IAM policy that allows using Amazon S3."
  - prompt: "A logistics company in Monterrey attached to the root of its organization an SCP that denies a service. It then notices that an administrator in the management account can still use that service. Why?"
    options:
      - label: "Because an SCP attached to the root only applies to nested OUs"
        explanation: "An SCP on the root is inherited downward and limits the member accounts across the whole hierarchy; the reason here is different."
      - label: "Because the administrator has the AdministratorAccess policy"
        explanation: "In a member account, an SCP limits even someone with AdministratorAccess; what changes here is that this is the management account."
      - label: "Because SCPs do not affect the management account"
        explanation: "SCPs only affect the identities in member accounts; the management account is outside their scope."
        correct: true
      - label: "Because consolidated billing has not been turned on"
        explanation: "SCPs require all features of Organizations to be enabled, and even then they do not affect the management account."
  - prompt: "A university in Córdoba uses AWS Control Tower and wants to identify resources that already exist in its accounts and do not comply with its policies, without blocking any action. What type of control does it need?"
    options:
      - label: "A preventive control"
        explanation: "Preventive controls block actions; the scenario asks to find noncompliance without blocking anything."
      - label: "A detective control"
        explanation: "Control Tower detective controls detect noncompliance, such as existing resources that do not comply with policies."
        correct: true
      - label: "A proactive control"
        explanation: "Proactive controls check resources before they are created; the scenario is about resources that already exist."
      - label: "Account Factory"
        explanation: "Account Factory is a template for creating new, preconfigured accounts; it is not a control that detects noncompliance."
  - prompt: "A hotel group in Cancún creates an AWS account every time it opens a hotel and wants each account to start out already configured and approved according to its standards, inside its AWS Control Tower landing zone. Which feature should it use?"
    options:
      - label: "AWS RAM"
        explanation: "AWS RAM shares resources across accounts that already exist; it does not create new configured accounts."
      - label: "An SCP attached to the root"
        explanation: "An SCP limits the maximum permissions of member accounts; it does not create or configure accounts."
      - label: "The Control Tower dashboard"
        explanation: "The dashboard shows accounts, active controls, and noncompliant resources; it is not the template for creating accounts."
      - label: "Account Factory"
        explanation: "Account Factory is the Control Tower template for creating new accounts that are already configured and approved."
        correct: true
  - prompt: "A supermarket chain in Santiago has development, testing, and production in a single AWS account. What benefit does it get from separating those environments into multiple accounts?"
    options:
      - label: "Limit the impact of an incident or a mistake to a single account"
        explanation: "An account is a natural boundary for security and workloads, so a mistake in testing stays isolated from production."
        correct: true
      - label: "No longer need IAM policies to grant permissions"
        explanation: "Separating into multiple accounts does not change where permissions come from: they still come from each account's IAM policies."
      - label: "Data is automatically shared among all the accounts"
        explanation: "Separating accounts is for isolating and restricting access to sensitive data; to share resources you use AWS RAM."
      - label: "SCPs start applying to the management account as well"
        explanation: "SCPs affect only member accounts; having more accounts does not change the fact that the management account is excluded."
  - prompt: "An insurance company in La Paz has the Production OU and, inside it, the nested Payments OU. It attaches to Production an SCP that denies using unapproved Regions. What happens to the accounts in the Payments OU?"
    options:
      - label: "They are not affected, because the SCP only applies to the direct accounts of Production"
        explanation: "Policies applied to an OU are inherited downward, so they also reach nested OUs and their accounts."
      - label: "They are restricted only if the root user of each account accepts the SCP"
        explanation: "SCPs affect all identities in member accounts, including their root user, without anyone having to accept them."
      - label: "They are restricted too, because an OU's policies are inherited by nested OUs"
        explanation: "An account only has what every level above it allows; the Production SCP reaches the Payments accounts."
        correct: true
      - label: "They are restricted only if the SCP is shared with AWS RAM"
        explanation: "AWS RAM shares resources across accounts; SCPs are inherited through the organization hierarchy without using RAM."
---

## Why does it matter?

A pharmacy chain in Bogotá started with a single AWS account. Today, that account holds the developers' test environment, the prescriptions database, and the sales website. A configuration mistake in testing nearly exposed patient data, and nobody knows how much each department spends.

AWS recommends using **multiple accounts** and governing them centrally. This topic explains how.

## Why multiple accounts?

An **AWS account** is a natural boundary for **permissions, security, costs, and workloads**. According to the official AWS guidance, separating into multiple accounts lets you:

- **Group workloads** by business purpose and by owning team.
- Apply **different security controls per environment** (for example, stricter in production than in development).
- **Restrict access to sensitive data** by isolating it in dedicated accounts.
- **Limit the impact** of an incident or a mistake to a single account.
- Give teams freedom to **innovate** in sandbox accounts without risk to production.
- **Manage costs** per account and distribute **service quotas** (limits) across accounts.

## AWS Organizations: the foundation

**AWS Organizations** lets you **centrally manage and govern** multiple accounts:

- **Organization**: the set of accounts you manage together.
- **Management account**: the one that creates the organization. The others are **member accounts**.
- **Root**: the top-level container of the hierarchy (not to be confused with an account's root user).
- **Organizational units** (**OUs**): groups of accounts, for example "Production", "Development", or "Security". They can be nested, and policies applied to an OU are inherited downward.

Besides policies, Organizations lets you create accounts programmatically, delegate administration of security services, turn on an AWS CloudTrail trail for the whole organization, and get **consolidated billing** (see the billing topic).

### Service control policies (SCPs)

**SCPs** (*service control policies*) are **guardrails** that set the **maximum permissions** available to the users and roles in member accounts.

- An SCP **does not grant permissions**: it only limits them. Permissions still come from IAM policies. The effective permission is the **intersection** of what the SCP and the IAM policy allow.
- They are attached to the **root**, an **OU**, or an **account**, and an account only has what **every level above it** allows.
- They affect all identities in member accounts, **including their root user**.
- They **do not affect the management account** or service-linked roles.
- They require **all features** of Organizations to be enabled.

Example: an SCP on the "Production" OU that denies using Regions outside the approved ones. Even if an administrator has `AdministratorAccess`, they will not be able to launch resources in another Region.

## AWS Control Tower: a ready-made landing zone

**AWS Control Tower** is the easiest way to **set up and govern** a multi-account environment following best practices. It **orchestrates** other services, such as AWS Organizations, AWS Service Catalog, and AWS IAM Identity Center.

- **Landing zone**: a well-architected multi-account environment, based on security and compliance best practices, that contains your OUs, accounts, and users.
- **Controls** (also called *guardrails*): high-level rules, expressed in plain language, for ongoing governance. There are three kinds: **preventive** (block actions), **detective** (detect noncompliance), and **proactive** (check resources before they are created). They are classified as mandatory, strongly recommended, or elective.
- **Account Factory**: a template for creating new accounts that are already configured and approved.
- **Dashboard**: shows accounts, active controls, and noncompliant resources.

| | AWS Organizations | AWS Control Tower |
| --- | --- | --- |
| What it is | Foundational service for grouping accounts and applying policies | Layer that automates a multi-account environment with best practices |
| Setup | You design it | Predefined landing zone, ready in a short time |
| Controls | SCPs and other policies you write | Prepackaged preventive, detective, and proactive controls |

## AWS RAM: share without duplicating

**AWS Resource Access Manager (AWS RAM)** lets you securely **share resources** across accounts: with the whole organization, with specific OUs, or with specific accounts. You create the resource **once** and other accounts use it as if it were their own.

- Typical example: sharing **Amazon VPC subnets** from a central networking account.
- The owning account **keeps ownership**; the IAM policies and SCPs of the consuming account still apply.
- Sharing with accounts outside the organization requires accepting an invitation.
- It has **no additional charge**; you only pay for the use of the shared resource.

## Common exam traps

- **"An SCP grants permissions to a user."** False: it only limits the maximum; IAM grants the permissions.
- **"SCPs restrict the management account."** False: they only affect member accounts.
- **Choosing Organizations when the question asks for a "landing zone" or "ready-to-use best practices".** That is **Control Tower**.
- **Copying the same resource into every account.** To share it, the answer is **AWS RAM**.
- **Confusing the organization root with the root user.** They are different concepts.

## Exam summary

- Multiple accounts = isolation of security, data, costs, and incidents.
- Organizations: management account, member accounts, root, and OUs.
- SCP = maximum-permissions guardrail; does not grant permissions; does not affect the management account.
- Control Tower = landing zone + controls + Account Factory + dashboard, built on Organizations.
- AWS RAM = share resources (for example, subnets) across accounts without duplicating them.
