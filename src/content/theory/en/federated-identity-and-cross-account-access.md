---
title: "IAM Identity Center, federation, and cross-account access"
summary: "Tell apart the authentication and identity management methods: IAM Identity Center, SAML/OIDC federation, cross-account roles, Amazon Cognito, and AWS Directory Service."
domain: "security-compliance"
order: 4
examTasks: ["2.3"]
services: ["AWS IAM Identity Center", "Amazon Cognito", "AWS Directory Service", "AWS IAM", "AWS Organizations"]
readingMinutes: 6
sources:
  - "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
  - "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"
  - "https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html"
quiz:
  - prompt: "An insurance company in Lima has 300 employees and six AWS accounts. It wants each employee to sign in from a single portal to the accounts assigned to them, with short-term credentials. Which service should it use?"
    options:
      - label: "Amazon Cognito user pools"
        explanation: "Amazon Cognito user pools are a directory for web and mobile app users, not for employees signing in to multiple AWS accounts."
      - label: "AWS IAM Identity Center"
        explanation: "IAM Identity Center is the recommended solution for workforce access to multiple accounts, with an access portal and short-term credentials."
        correct: true
      - label: "One IAM user per employee in each account"
        explanation: "Creating duplicate IAM users in each account is unmanageable with 300 employees and six accounts; it is exactly the trap to avoid."
      - label: "AWS Directory Service Simple AD"
        explanation: "Simple AD is a directory compatible with basic Active Directory features for small use cases; it does not offer an access portal to multiple AWS accounts."
  - prompt: "A pharmacy chain in Bogotá launches a mobile app where thousands of customers must sign up and sign in, including with their Google account. Which AWS service manages these identities?"
    options:
      - label: "AWS IAM Identity Center"
        explanation: "IAM Identity Center is designed for the workforce (employees and contractors), not for the customers of a mobile app."
      - label: "AWS Managed Microsoft AD"
        explanation: "AWS Managed Microsoft AD is a managed Active Directory for Windows users and computers, not a directory of app customers."
      - label: "A cross-account IAM role"
        explanation: "A cross-account role lets identities from one AWS account work in another; it does not offer sign-up or sign-in for customers."
      - label: "Amazon Cognito"
        explanation: "Amazon Cognito is the identity platform for web and mobile apps; its user pools allow sign-up and sign-in, including with social providers such as Google."
        correct: true
  - prompt: "A software company in Santiago wants its developers in the development account to work in the production account without creating duplicate users. What should it create in the production account?"
    options:
      - label: "An IAM role whose trust policy names the development account"
        explanation: "A cross-account role with a trust policy that names the source account can be assumed with sts:AssumeRole to receive temporary credentials."
        correct: true
      - label: "IAM users with access keys for each developer"
        explanation: "Creating users in the production account duplicates identities and hands out long-term keys, exactly what the company wants to avoid."
      - label: "An Amazon Cognito identity pool"
        explanation: "Identity pools give temporary credentials to users of a web or mobile app, not to developers working across AWS accounts."
      - label: "An AD Connector"
        explanation: "AD Connector is a proxy that redirects sign-in requests to an on-premises Active Directory; it does not provide access across AWS accounts."
practice:
  - prompt: "A mining company in Antofagasta federates its employees from its corporate identity provider to AWS with SAML 2.0. What credentials do the employees receive in AWS?"
    options:
      - label: "Temporary credentials"
        explanation: "With federation, AWS trusts the external IdP and the person receives temporary credentials, with no long-term keys."
        correct: true
      - label: "Permanent access keys"
        explanation: "This is the classic exam trap: federation provides temporary credentials, not permanent access keys."
      - label: "A new IAM user per employee"
        explanation: "Federation precisely avoids creating an IAM user per person; the identity stays in the IdP."
      - label: "The account root user password"
        explanation: "The root user has full access and is never shared; federation gives each person temporary credentials."
  - prompt: "A university in Lima wants sign-ins to its applications on AWS to be redirected to its existing on-premises Active Directory, without synchronizing directories. Which AWS Directory Service option should it use?"
    options:
      - label: "AWS Managed Microsoft AD"
        explanation: "AWS Managed Microsoft AD is an actual Active Directory managed by AWS, not a proxy that redirects to the on-premises AD."
      - label: "Simple AD"
        explanation: "Simple AD is a separate directory with basic AD features for small use cases; it does not redirect to the on-premises AD."
      - label: "AD Connector"
        explanation: "AD Connector is a proxy that redirects sign-in requests to the existing on-premises AD, without synchronizing directories."
        correct: true
      - label: "Amazon Cognito user pools"
        explanation: "Cognito user pools are a directory for web and mobile app users; they do not redirect to the on-premises Active Directory."
  - prompt: "A tourism mobile app from Cusco already authenticates its users and now needs each of them to upload photos directly to Amazon S3 with temporary AWS credentials; it also wants to give limited access to guests. Which component should it use?"
    options:
      - label: "Amazon Cognito user pools"
        explanation: "User pools are the sign-up and sign-in directory that issues tokens; exchanging them for AWS credentials is done by identity pools."
      - label: "Amazon Cognito identity pools"
        explanation: "Identity pools exchange a trusted token for temporary AWS credentials and can give limited access to guests."
        correct: true
      - label: "IAM Identity Center permission sets"
        explanation: "Permission sets are for the workforce signing in to AWS accounts, not for the customers of a mobile app."
      - label: "One IAM user for each app customer"
        explanation: "App customers do not get IAM users; their identities are managed with Amazon Cognito."
  - prompt: "A retail company in Bogotá uses IAM Identity Center and wants to create templates such as administrator and read-only that are provisioned across several accounts and assigned to groups of employees. Which feature should it use?"
    options:
      - label: "Simple AD"
        explanation: "Simple AD is a directory with basic AD features; it does not define permission templates for multiple accounts."
      - label: "Amazon Cognito identity pools"
        explanation: "Identity pools give AWS credentials to web and mobile app users, not permissions to employees across multiple accounts."
      - label: "The trust policy of a cross-account role"
        explanation: "A trust policy states who can assume a specific role; it is not a template provisioned across multiple accounts."
      - label: "Permission sets"
        explanation: "Permission sets are permission templates that IAM Identity Center provisions across multiple accounts and assigns to users or groups."
        correct: true
  - prompt: "Old documentation at a company in Panama mentions the AWS Single Sign-On service. Which current service does that name correspond to?"
    options:
      - label: "AWS IAM Identity Center"
        explanation: "AWS Single Sign-On is the former name of IAM Identity Center, the centralized workforce access service."
        correct: true
      - label: "Amazon Cognito"
        explanation: "Amazon Cognito is the identity platform for customers of web and mobile apps; it is not the former AWS Single Sign-On."
      - label: "AWS Directory Service"
        explanation: "AWS Directory Service offers Active Directory on AWS; it is not the former AWS Single Sign-On."
      - label: "AWS Organizations"
        explanation: "AWS Organizations groups and governs accounts; the former AWS Single Sign-On is a different service."
  - prompt: "In the production account of a software company in Santiago there is already a role whose trust policy names the development account. What is still missing so that certain developers in that account can use the role?"
    options:
      - label: "Create duplicate IAM users in the production account"
        explanation: "The cross-account role exists precisely to avoid duplicate users in the target account."
      - label: "Create an Amazon Cognito identity pool"
        explanation: "Identity pools give credentials to web and mobile app users, not to developers working across accounts."
      - label: "Grant them permission in the development account to call sts:AssumeRole on that role"
        explanation: "In the source account, certain identities are granted permission to call sts:AssumeRole; they then switch roles and receive temporary credentials."
        correct: true
      - label: "Set up an AD Connector in the production account"
        explanation: "AD Connector redirects sign-ins to an on-premises Active Directory; it does not enable assuming a cross-account role."
---

## Why does it matter?

An insurance company in Lima has 300 employees who already sign in every morning with their corporate Microsoft Active Directory account. It now uses six AWS accounts (development, testing, production…) and is also launching a mobile app for thousands of policyholders. Creating an IAM user per employee and per account would be unmanageable, and app customers should never get an IAM user.

The solution is to **separate identities**: employees sign in with their corporate identity to every account from a single place, and app customers sign up in a directory designed for end users.

## Core concepts

- **Identity provider** (*IdP*): a system that stores identities and verifies who each person is; for example, Active Directory, Okta, or Google.
- **Identity federation**: AWS **trusts** an external IdP. The person authenticates there and receives **temporary credentials** in AWS, without creating an IAM user or handing out long-term keys.
- **SAML 2.0** and **OIDC** (*OpenID Connect*): open standards that IdPs use to tell AWS who the user is. SAML is typical of corporate directories; OIDC connects, for example, applications that do not run on AWS.
- **Single sign-on** (*SSO*): sign in once and access multiple accounts or applications.

## Authentication methods the exam asks about

### MFA

**Multi-factor authentication** adds a second factor (security key, passkey, or a code from an app) to the password. It can be required in IAM, IAM Identity Center, and Amazon Cognito.

### AWS IAM Identity Center

**AWS IAM Identity Center** (formerly AWS Single Sign-On) is the AWS recommended solution for **workforce access** (employees and contractors) to **multiple AWS accounts** and applications.

- **Identity source**: you can create users in Identity Center's own directory, connect Active Directory, or connect an external IdP that supports **SAML 2.0**.
- **AWS access portal**: a web page where each person sees the accounts and applications assigned to them.
- **Permission sets**: permission templates (for example, "administrator" or "read-only") that are provisioned across multiple accounts and assigned to users or groups. This feature requires an **organization instance**, deployed from the AWS Organizations management account.
- Users receive **short-term credentials**.

### Cross-account IAM roles

A **cross-account role** lets identities from one account work in another **without creating duplicate users**:

1. In the **target account**, you create a role whose **trust policy** names the source account as a trusted entity, plus a permissions policy with what the role can do.
2. In the **source account**, certain identities are granted permission to call `sts:AssumeRole` on that role.
3. The user **switches role** in the console or calls AWS STS from the CLI or SDK, and receives **temporary credentials**. While using the role, they only have the role's permissions.

## Types of identity management

| Need | Service | Who the users are |
| --- | --- | --- |
| Employees accessing many AWS accounts | **AWS IAM Identity Center** | Workforce |
| A single account, small deployments, or machines | **Direct federation with IAM** (SAML 2.0 or OIDC) and roles | Short-term people, workloads |
| Sign-up and sign-in for a web or mobile app | **Amazon Cognito** | Customers (end users) |
| Microsoft Active Directory in the cloud | **AWS Directory Service** | Windows users and computers |

### Amazon Cognito: customer identities

**Amazon Cognito** is an identity platform for **web and mobile applications**. It has two components that can be used separately or together:

- **User pools**: a **user directory** for sign-up and sign-in. It issues tokens for your app or API. It supports sign-in with social providers (Google, Apple, Facebook, Amazon) and with SAML or OIDC enterprise IdPs. It supports MFA.
- **Identity pools**: exchange a trusted token for **temporary AWS credentials** so the app can access, for example, Amazon S3 or DynamoDB on the user's behalf. They can also give limited access to **guests** who have not signed in.

### AWS Directory Service: managed Active Directory

**AWS Directory Service** offers several ways to use **Microsoft Active Directory (AD)** with AWS:

- **AWS Managed Microsoft AD**: an actual Active Directory managed by AWS; it can have a trust relationship with your on-premises AD.
- **AD Connector**: a proxy that redirects sign-in requests to your **existing on-premises AD**, without synchronizing directories.
- **Simple AD**: a directory compatible with basic AD features, for small, low-cost use cases.

## Common exam traps

- **Using Amazon Cognito so employees can sign in to multiple AWS accounts.** That is **IAM Identity Center**; Cognito is for the users of your applications.
- **Creating duplicate IAM users in each account.** The answer is a **cross-account role** or **IAM Identity Center**.
- **Thinking federation hands out permanent access keys.** It always provides **temporary credentials**.
- **Confusing Directory Service with IAM.** Directory Service offers **Active Directory**; IAM controls permissions in AWS.
- **Forgetting the old name.** "AWS Single Sign-On" is now **IAM Identity Center**.

## Exam summary

- Federation = trust an external IdP (SAML 2.0 or OIDC) and receive temporary credentials.
- IAM Identity Center: centralized workforce access to multiple accounts and applications, with an access portal and permission sets.
- Cross-account role: trust policy + `sts:AssumeRole` = temporary credentials in another account.
- Amazon Cognito: customer identities; user pools (sign-in) and identity pools (AWS credentials).
- AWS Directory Service: Managed Microsoft AD, AD Connector, and Simple AD.
- MFA can be required in IAM, Identity Center, and Cognito.
