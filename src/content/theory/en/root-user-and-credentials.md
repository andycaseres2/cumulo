---
title: "Root user, MFA, and credential management"
summary: "Protect the root user, learn its exclusive tasks, the MFA types, access keys, password policies, and when to use Secrets Manager or Parameter Store."
domain: "security-compliance"
order: 3
examTasks: ["2.3"]
services: ["AWS Secrets Manager", "AWS Systems Manager", "AWS IAM", "AWS KMS"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html"
  - "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
  - "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html"
quiz:
  - prompt: "An online store in Medellín needs to keep its database password out of the code and have it rotated automatically. Which service should it use?"
    options:
      - label: "Parameter Store with a SecureString parameter"
        explanation: "Parameter Store can encrypt values with SecureString, but it does not offer automatic rotation; it is designed for configuration and simple values."
      - label: "AWS Secrets Manager"
        explanation: "AWS Secrets Manager stores secrets that are always encrypted with AWS KMS and offers automatic rotation with native integrations for databases."
        correct: true
      - label: "The IAM password policy"
        explanation: "The password policy sets rules for IAM users' passwords; it does not store or rotate a database password."
      - label: "Access keys of an IAM user"
        explanation: "Access keys are long-term credentials for programmatic access to AWS; they are not a place to store the database password."
  - prompt: "Your company created an administrative user for daily work and uses the root user only when required. Which of these tasks requires signing in as the root user?"
    options:
      - label: "Create a new IAM user"
        explanation: "Creating IAM users is not on the list of root-only tasks; an administrative identity with the right permissions does it."
      - label: "Launch an Amazon EC2 instance"
        explanation: "Launching instances is daily work done with lower-privilege identities; it is not a root-only task."
      - label: "Create an IAM role for an application"
        explanation: "Creating IAM roles is not among the tasks only the root user can perform; an IAM administrator does it."
      - label: "Configure MFA Delete on an Amazon S3 bucket"
        explanation: "Configuring MFA Delete on an S3 bucket is on the official list of tasks that only the root user can perform."
        correct: true
  - prompt: "The security team of an insurance company in Panama wants to enable MFA on its identities using the phishing-resistant option that AWS recommends. Which type of MFA should it choose?"
    options:
      - label: "Passkeys and FIDO security keys"
        explanation: "Passkeys and FIDO security keys use public key cryptography, are phishing-resistant, and are the option AWS recommends."
        correct: true
      - label: "Virtual authenticator app with TOTP codes"
        explanation: "A virtual authenticator app is a good interim option, but it is not the phishing-resistant option that AWS recommends."
      - label: "Hardware TOTP token"
        explanation: "A hardware TOTP token displays a six-digit code; it is a valid type, but it is not the recommended phishing-resistant option."
      - label: "MFA via SMS message"
        explanation: "AWS no longer allows enabling SMS MFA in IAM, so it is not an available option for these identities."
practice:
  - prompt: "A development team in Mérida wants to centralize non-sensitive configuration values, such as service URLs and AMI IDs, at no additional cost and with no need for rotation. Where should it store them?"
    options:
      - label: "In the IAM password policy"
        explanation: "The password policy sets rules for IAM users' passwords; it does not store configuration values."
      - label: "In access keys of an IAM user"
        explanation: "Access keys are long-term credentials for programmatic access; they cannot be used to store URLs or AMI IDs."
      - label: "In AWS Systems Manager Parameter Store"
        explanation: "Parameter Store is designed for configuration such as URLs, AMI IDs, and environment variables, and its standard tier has no additional cost."
        correct: true
      - label: "In the account root user"
        explanation: "The root user is the identity with full access to the account; it is not a configuration store and should be used only for tasks that require it."
  - prompt: "A company in Quito configured a password policy in its AWS account with a minimum length, expiration, and reuse prevention. Which identities does this policy apply to?"
    options:
      - label: "Only IAM users"
        explanation: "The account password policy sets rules for the passwords of IAM users only."
        correct: true
      - label: "The root user and IAM users"
        explanation: "The password policy does not apply to the root user; thinking it protects it is a classic exam trap."
      - label: "The access keys of all users"
        explanation: "The password policy does not apply to access keys; they are managed with best practices such as rotating them and deleting unused ones."
      - label: "Only the root user"
        explanation: "The root user is outside the password policy; it is protected with a strong password and MFA."
  - prompt: "A developer in Santo Domingo created access keys to use the AWS CLI but did not copy the secret access key and now needs it. What should the developer do?"
    options:
      - label: "Look it up in the IAM console, where it is always visible"
        explanation: "The secret access key can be viewed only when it is created; after that, the console never shows it again."
      - label: "Ask AWS Support to email it"
        explanation: "The secret key is shown only at creation; if it is lost, the solution is to create a new one, not to recover it."
      - label: "Use only the access key ID, which is enough to authenticate"
        explanation: "Access keys have two parts, the access key ID and the secret access key; the ID alone is not enough."
      - label: "Create a new access key, because the secret is visible only at creation"
        explanation: "The secret access key can be viewed only when it is created; if it is lost, you must create another access key."
        correct: true
  - prompt: "During an audit at a cooperative in Cochabamba, you discover that the root user has active access keys that nobody remembers creating. What should you do according to AWS best practices?"
    options:
      - label: "Share them only with the IT team so it can use them in scripts"
        explanation: "Root user credentials are never shared, and access keys should never be placed in scripts or code."
      - label: "Delete them"
        explanation: "AWS recommends not creating access keys for the root user and, if they exist, deleting them."
        correct: true
      - label: "Store them in Parameter Store as a SecureString"
        explanation: "Encrypting them in Parameter Store does not remove the risk; AWS explicitly advises against having access keys on the root user."
      - label: "Use them for daily work instead of an administrative user"
        explanation: "The root user should not be used for daily work; an administrative user with lower privilege is created for that."
  - prompt: "An advertising agency in Guadalajara has a standalone AWS account that does not belong to AWS Organizations and wants to close it permanently. Which identity must perform this task?"
    options:
      - label: "An IAM user with the AdministratorAccess policy"
        explanation: "Closing a standalone account is on the list of tasks only the root user can perform; an IAM user cannot replace it."
      - label: "An IAM role assumed by the finance team"
        explanation: "IAM roles provide temporary credentials for daily work; closing a standalone account is a root-only task."
      - label: "The root user"
        explanation: "Closing a standalone account is one of the tasks only the root user can perform, according to the official IAM list."
        correct: true
      - label: "An administrative user in AWS IAM Identity Center"
        explanation: "The IAM Identity Center administrative user is meant for daily work, but closing a standalone account requires the root user."
  - prompt: "The security team of a mining company in Antofagasta wants to monitor root user activity and receive alerts every time someone signs in with it. Which services does AWS mention as an example to achieve this?"
    options:
      - label: "AWS CloudTrail and Amazon EventBridge"
        explanation: "AWS recommends monitoring root user activity with alerts, for example with AWS CloudTrail and Amazon EventBridge."
        correct: true
      - label: "AWS Secrets Manager and AWS KMS"
        explanation: "Secrets Manager stores secrets encrypted with AWS KMS; it is not used to alert on root user activity."
      - label: "The IAM password policy"
        explanation: "The password policy sets rules for IAM users; it does not monitor or alert on root user activity."
      - label: "AWS Systems Manager Parameter Store"
        explanation: "Parameter Store stores configuration and simple values; it does not generate sign-in alerts."
---

## Why does it matter?

An online store in Medellín accidentally pushes a file containing its AWS account **access keys** and its database password to a public repository. Within a few hours, someone uses those keys to launch servers for their own purposes and the bill skyrockets. Even worse: the keys belonged to the **root user**, which can do absolutely everything.

This topic covers how to prevent that: protect the most powerful identity in the account, require a second authentication factor, handle keys properly, and store application secrets in a secure place.

## The root user: full power, minimal use

The **root user** is the identity created when you open the account, with the email address and password used to sign up. It has **complete access to all services and resources, including billing**. That is why AWS recommends using it **only for the tasks that require it** and creating an administrative user (ideally in AWS IAM Identity Center) for daily work.

### Tasks that only the root user can perform

According to the official IAM list, these include:

- Changing account settings: the **root user's email address, password, and access keys** (in standalone accounts that do not belong to AWS Organizations).
- **Closing the account** (in standalone accounts) and **reopening it** during the post-closure period.
- **Restoring the permissions** of the only IAM administrator if they were revoked by mistake.
- **Activating IAM access to the Billing and Cost Management console** and some other billing tasks.
- Registering as a **seller in the Amazon EC2 Reserved Instance Marketplace**.
- Configuring **MFA Delete** on an Amazon S3 bucket.
- Editing or deleting an **S3 bucket policy** or an **Amazon SQS** queue policy that denies access to all principals.
- Signing up for **AWS GovCloud (US)**.

In organizations that use AWS Organizations, several of these tasks can be performed centrally from the management account, and you can even **remove the root credentials** of member accounts.

### How to protect the root user

- Use a **strong, unique password**.
- Enable **MFA** (AWS requires it for the root user) and register more than one device.
- **Do not create access keys for the root user**; if any exist, delete them.
- Use a company **group email address** and protect the recovery mechanisms (email and phone).
- **Do not share** its credentials, and **monitor** its use with alerts (for example, with AWS CloudTrail and Amazon EventBridge).

## MFA: the second factor

**MFA** (*multi-factor authentication*) asks for something you have in addition to something you know (the password). IAM supports these types:

| Type | How it works | Note |
| --- | --- | --- |
| **Passkeys and security keys** (FIDO) | Public key cryptography; a physical key (for example, a YubiKey) or a passkey synced in a credential manager | **Phishing-resistant**; the option AWS recommends |
| **Virtual authenticator app** | A phone app that generates TOTP (time-based one-time password) codes | Good interim option |
| **Hardware TOTP token** | A physical device that displays a six-digit code | Must be purchased from AWS-supported vendors |

The root user and each IAM user can register **up to eight MFA devices**. AWS **no longer allows enabling SMS MFA**.

## Access keys and password policies

**Access keys** are **long-term** credentials for programmatic access (AWS CLI, SDK, or API). They have two parts: the **access key ID** and the **secret access key**. The secret key can be viewed **only when it is created**; if it is lost, you must create another one. Each user can have **at most two**, which makes rotating them easier. Best practices: prefer **temporary credentials** (roles), never put them in code or repositories, rotate them, and delete the ones you do not use.

The account **password policy** sets rules for **IAM users'** passwords: minimum length, required character types, **expiration**, and **reuse prevention**. It does not apply to the root user or to access keys, and it does not let you create lockouts after failed attempts; that is why AWS recommends combining it with MFA.

## Where to store secrets: Secrets Manager vs. Parameter Store

A **secret** is any sensitive data an application needs, such as a database password or an API key. It should never be *hardcoded* in the code.

| | **AWS Secrets Manager** | **Parameter Store** (part of AWS Systems Manager) |
| --- | --- | --- |
| Purpose | Secrets: database credentials, API keys, OAuth tokens | Configuration: URLs, AMI IDs, environment variables |
| Encryption | Always, with AWS KMS | Optional, with `SecureString` parameters and AWS KMS |
| Automatic rotation | **Yes**, with native integrations for databases | No |
| Cost | Charged per secret per month and per API call | Standard tier at no additional cost; the advanced tier is charged |

Rule of thumb: **credentials that must rotate → Secrets Manager**; **configuration and simple values (even if encrypted) → Parameter Store**. AWS recommends Secrets Manager for credentials and other secrets.

## Common exam traps

- **Using the root user for daily work.** Use it only for its exclusive tasks; daily work is done with lower-privilege identities.
- **Creating access keys for the root user.** AWS explicitly advises against it.
- **Thinking the password policy protects the root user.** It applies only to IAM users.
- **Choosing Parameter Store when the question asks for "automatic rotation" of credentials.** The answer is **Secrets Manager**.
- **Believing SMS is a current MFA type in IAM.** It can no longer be enabled.

## Exam summary

- Root user: full access; protect it with a strong password, MFA, and no access keys.
- Root only: change the root email/password, close the account, restore the only admin's permissions, become a seller in the RI Marketplace, MFA Delete on S3, among others.
- MFA: passkeys/security keys (recommended), virtual app, and hardware TOTP token; up to eight per identity.
- Access keys: ID + secret; at most two per user; prefer temporary credentials.
- Password policy: IAM users only.
- Secrets Manager = secrets with automatic rotation; Parameter Store = configuration, optional `SecureString`.
