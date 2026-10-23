---
title: "IAM: users, groups, roles, and policies"
summary: "Understand how AWS IAM controls who can do what: users, groups, roles, managed, inline, and custom policies, and least privilege."
domain: "security-compliance"
order: 2
examTasks: ["2.3"]
services: ["AWS IAM", "AWS IAM Identity Center", "Amazon EC2", "Amazon S3"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_last-accessed.html"
quiz:
  - prompt: "A travel agency in Panama City has an application on an Amazon EC2 instance that must read files from Amazon S3. The developer proposes storing access keys in the code. What should be used instead?"
    options:
      - label: "An IAM role assigned to the instance"
        explanation: "An IAM role provides temporary credentials to the application on EC2 so it can read from S3 without storing keys in the code."
        correct: true
      - label: "An IAM user group"
        explanation: "A group only collects IAM users to assign them permissions; it has no credentials of its own that the instance could use."
      - label: "An IAM user with long-term access keys"
        explanation: "An IAM user with access keys is exactly what should be avoided: long-term credentials stored in the code."
      - label: "An inline policy on the root user"
        explanation: "The root user has full access and AWS recommends not using it for everyday tasks; besides, you do not attach IAM policies to the root user, and it does not give credentials to the instance."
  - prompt: "A cooperative in Quito attached to a user one policy that allows all Amazon S3 actions and another that explicitly denies deleting objects. What happens when the user tries to delete an object?"
    options:
      - label: "It is allowed, because an Allow overrides any Deny"
        explanation: "This is the classic exam trap: an Allow does not override a Deny; the explicit deny wins."
      - label: "It is allowed, because the most recent policy takes priority"
        explanation: "Policy evaluation does not depend on which policy was attached first or last; the explicit Deny decides the result."
      - label: "It is denied, because an explicit deny always wins"
        explanation: "An explicit deny (Deny) always wins over any Allow, so the user cannot delete the object."
        correct: true
      - label: "It is denied only if the user does not have MFA enabled"
        explanation: "MFA protects sign-in, but here the deletion is denied by the explicit Deny, with or without MFA."
  - prompt: "A fintech in Lima needs a permissions policy scoped to its exact use case that it can edit and reuse across several users and roles. What type of policy should it create?"
    options:
      - label: "An AWS managed policy"
        explanation: "AWS managed policies cannot be edited and, because they are generic, they often grant more permissions than needed."
      - label: "An inline policy"
        explanation: "An inline policy lives inside a single identity (a one-to-one relationship), so it cannot be reused across identities."
      - label: "An Amazon S3 bucket policy"
        explanation: "A bucket policy is a resource-based policy attached to a bucket, not to users and roles."
      - label: "A customer managed policy"
        explanation: "Customer managed policies are custom: you write them for your exact use case, and you can edit and reuse them across several identities."
        correct: true
practice:
  - prompt: "A construction company in Arequipa has 15 accountants who need the same permissions. What is the most practical way to assign them with IAM?"
    options:
      - label: "Attach an inline policy to each accountant"
        explanation: "An inline policy lives inside a single identity, so you would have to repeat it 15 times and maintain each copy separately."
      - label: "Create an IAM group with the permissions and add the accountants"
        explanation: "A user group lets you assign permissions to several users at once; each accountant inherits the group's permissions."
        correct: true
      - label: "Share the root user credentials with them"
        explanation: "The root user has full access and AWS recommends not using it for everyday tasks; sharing it contradicts least privilege."
      - label: "Create one IAM role per accountant with long-term access keys"
        explanation: "A role has no long-term credentials; it provides temporary credentials to whoever assumes it."
  - prompt: "An engineer at an insurance company in Caracas wants to create the IAM group IT inside the group Employees so that IT inherits its permissions. What happens?"
    options:
      - label: "It works, and IT inherits the permissions of Employees"
        explanation: "IAM groups contain only users; they do not allow other groups inside, so there is no inheritance between groups."
      - label: "It works only if both groups use AWS managed policies"
        explanation: "The policy type does not change the rule: IAM groups cannot be nested."
      - label: "It works if the IT group appears as the Principal in a policy"
        explanation: "A group cannot be a Principal in a policy, because groups assign permissions and do not authenticate."
      - label: "It is not possible, because IAM groups cannot be nested"
        explanation: "A group contains only users; a user can belong to several groups, but a group cannot be inside another group."
        correct: true
  - prompt: "A newly created IAM user at a distributor in Barranquilla has no policies attached and tries to list the Amazon S3 buckets. What happens?"
    options:
      - label: "It is denied, because by default everything is implicitly denied"
        explanation: "Without a policy that allows it, the request is implicitly denied."
        correct: true
      - label: "It is allowed, because new users have read-only access by default"
        explanation: "A new user has no permissions until a policy allows them; ReadOnlyAccess is a policy that would have to be attached."
      - label: "It is allowed, because the user belongs to the default group that contains all users"
        explanation: "IAM has no default group that contains all users."
      - label: "It is denied only if some policy has an explicit Deny"
        explanation: "No explicit Deny is needed: without any Allow, the implicit deny already blocks the action."
  - prompt: "A telecommunications company in Santo Domingo applies least privilege and wants to find which services allowed to a role are never used, so it can remove them. Which IAM feature helps?"
    options:
      - label: "Require MFA on the role"
        explanation: "MFA protects sign-in with a second factor; it does not show which services are used or not."
      - label: "Attach the AdministratorAccess policy"
        explanation: "AdministratorAccess grants full access, the opposite of trimming permissions under least privilege."
      - label: "Last accessed information"
        explanation: "IAM last accessed information shows which services and actions are not used so you can remove them."
        correct: true
      - label: "Turn its permissions into an inline policy"
        explanation: "An inline policy changes how the permission is attached; it does not report which services are used."
  - prompt: "The administrator of a startup in Guatemala wants to remove some services from the ReadOnlyAccess policy, which is AWS managed. What should she do?"
    options:
      - label: "Edit it directly in the IAM console"
        explanation: "AWS managed policies are maintained by AWS and cannot be edited."
      - label: "Copy its content into a customer managed policy and trim it"
        explanation: "The best practice is to start from the AWS policy, copy it into a custom policy, and remove what is not needed."
        correct: true
      - label: "Attach it to a group so it becomes editable"
        explanation: "Attaching it to a group does not change the fact that an AWS managed policy cannot be edited."
      - label: "Add an Allow to it in an inline policy"
        explanation: "An additional Allow adds permissions instead of removing them, and it does not modify the AWS managed policy."
  - prompt: "The lead developer at a company in Quito needs full access to AWS services but limited access to IAM and AWS Organizations. Which AWS managed job function policy fits that profile?"
    options:
      - label: "AdministratorAccess"
        explanation: "AdministratorAccess grants full access, including IAM, and is intended only for administrators."
      - label: "ReadOnlyAccess"
        explanation: "ReadOnlyAccess grants read-only access to all services; the developer needs full access to the services."
      - label: "PowerUserAccess"
        explanation: "PowerUserAccess grants full access to services, but limited access to IAM and AWS Organizations."
        correct: true
      - label: "An Amazon S3 bucket policy"
        explanation: "A bucket policy is a resource-based policy attached to a bucket; it is not a job function policy for a person."
---

## Why does it matter?

A travel agency in Panama City opens its AWS account and, to move fast, shares with the whole team the email and password used to create the account. An intern accidentally deletes the bookings database, and nobody can tell who did it. The problem is not AWS: it is that **everyone was using the identity with full access and nobody had permissions tailored to them**.

**AWS Identity and Access Management (IAM)** is the service that solves this. It lets you securely control **who is authenticated** (signed in) and **what they are authorized** to do with each resource. **Authentication** answers "who are you?"; **authorization** answers "what can you do?".

## Starting point: the root user

When you create an AWS account, an identity with full access to everything is created: the **root user**. AWS recommends not using it for everyday tasks, protecting it with **MFA** (multi-factor authentication), and creating identities with limited permissions for daily work. How to protect it is covered in the topic "Root user, MFA, and credential management".

## Identities: users, groups, and roles

| Identity | What it is | Credentials | Typical use |
| --- | --- | --- | --- |
| **IAM user** | Identity associated with a person or application | Long-term (password and/or access keys) | Cases that do not support federation or roles |
| **User group** | Collection of IAM users | Has no credentials of its own | Assign permissions to several users at once |
| **IAM role** | Identity with permissions that whoever needs it **assumes** | **Temporary**, per session | Services such as EC2, cross-account access, federation |

Details the exam likes to test:

- **Groups:** a user can belong to several groups, but groups **cannot be nested** (they only contain users). There is no default group with all users. A group **cannot be a `Principal`** in a policy, because groups are for assigning permissions, not for authenticating.
- **Roles:** a role **has no long-term credentials**. Assuming it gives you temporary credentials. For example, an application on an **Amazon EC2** instance uses a role to read from **Amazon S3** without storing keys in the code.
- **People:** AWS recommends that people access through **federation** with temporary credentials, ideally through **AWS IAM Identity Center**, instead of creating many IAM users.

## Policies: the language of permissions

A **policy** is an object that, when associated with an identity or a resource, defines permissions. Most are **JSON documents** with elements such as `Effect` (`Allow` or `Deny`), `Action` (which actions), `Resource` (on which resources), and, optionally, `Condition` (under which conditions).

- **Identity-based policies:** attached to users, groups, or roles.
- **Resource-based policies:** attached to a resource. The most common example is the Amazon S3 **bucket policy**.

### AWS managed, customer managed, and inline

Identity-based policies can be of three types:

| Type | Who creates and maintains it | Can you edit it? | How many identities can it be attached to? |
| --- | --- | --- | --- |
| **AWS managed** | AWS | No | Many |
| **Customer managed** | You | Yes | Many |
| **Inline** | You | Yes | Only one (one-to-one relationship) |

- **AWS managed** policies are quick to use and AWS updates them, for example, when it launches a new service. One example is `ReadOnlyAccess` (read access to all services). There are also **job function** policies, such as `AdministratorAccess` (full access, only for administrators) and `PowerUserAccess` (full access to services, but limited access to IAM and AWS Organizations). Because they are generic, they often grant **more permissions than needed**.
- **Customer managed** policies are **custom policies**: you write them for your exact use case and reuse them across several identities. A good practice is to start from an AWS policy, copy it, and trim it. When you edit it, the change applies to every identity that has it.
- **Inline** policies live inside a single identity and are **deleted along with it**. Use them only when you want a strict one-to-one relationship; if the policy could serve more than one identity, a managed policy is better.

### How they are evaluated

- By default, **everything is implicitly denied** until a policy allows it.
- An **explicit deny** (`Deny`) **always wins** over any `Allow`.

## Least privilege and best practices

The **principle of least privilege** means granting **only the permissions needed** for a task, and nothing more. In practice:

- Start with AWS managed policies if you need to get going, and replace them with narrower **custom policies**.
- Use IAM **last accessed information** to see which services and actions are never used and remove them.
- Workloads use **roles**; people use **federation and temporary credentials**.
- Require **MFA** and remove users, roles, permissions, and credentials that are no longer used.

## Common exam traps

- **Putting access keys on an EC2 instance.** The correct answer is to assign an **IAM role** to the instance.
- **Believing you can edit an AWS managed policy.** You cannot: copy its content into a customer managed policy.
- **Believing groups can be nested** or that a group can be the `Principal` in a bucket policy. Neither is possible.
- **Thinking an `Allow` overrides a `Deny`.** An explicit deny always prevails.
- **Assigning `AdministratorAccess` "just in case".** It contradicts least privilege.

## Exam summary

- IAM controls authentication (who you are) and authorization (what you can do).
- Users: long-term credentials. Roles: temporary credentials.
- Groups: collect users; cannot be nested; are not a `Principal`.
- Policies in JSON; identity-based or resource-based.
- AWS managed (not editable, reusable), customer managed (custom, reusable), inline (a single identity).
- Implicit deny by default; an explicit `Deny` always wins.
- Least privilege: only the permissions needed; review last accessed information to trim.
