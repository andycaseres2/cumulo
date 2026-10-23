import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const identityFamily: ServiceFamily = {
  id: 'identity',
  title: 'Identity, keys, and compliance',
  summary:
    'Who signs in (your workforce or your app’s customers), which accounts you govern, which keys you encrypt with, where you keep secrets and certificates, and where you get AWS compliance reports.',
  services: [
    { name: 'AWS IAM', summary: 'Users, groups, roles, and policies that control who can do what inside an account.' },
    { name: 'AWS IAM Identity Center', summary: 'Workforce single sign-on to multiple AWS accounts and applications, using your directory.' },
    { name: 'Amazon Cognito', summary: 'Sign-up and sign-in for the end users of your web and mobile apps, even with Google.' },
    { name: 'AWS Organizations', summary: 'Groups accounts, applies SCPs across the company, and delivers a single consolidated bill.' },
    { name: 'AWS KMS', summary: 'Creates and controls the encryption keys used by your data and AWS services.' },
    { name: 'AWS Secrets Manager', summary: 'Stores passwords, tokens, and API keys, and rotates them automatically.' },
    { name: 'AWS Certificate Manager', summary: 'Issues, stores, and renews SSL/TLS certificates for HTTPS on integrated services.' },
    { name: 'AWS Artifact', summary: 'Free download of AWS compliance reports (SOC, ISO, PCI) and agreement management.' },
  ],
  cards: [
    {
      id: 'identity-1',
      prompt:
        'A clinic in Medellín launches a mobile app so its patients can sign up, sign in with their Google account, and see their appointments. Which service manages those users?',
      options: [
        {
          service: 'Amazon Cognito',
          why: 'Cognito is the identity platform for web and mobile app users: sign-up, sign-in, and federation with Google or Facebook.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center gives company staff access to AWS accounts and applications; it is not meant for patients using an app.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM controls who manages resources inside the AWS account; it is not a directory of thousands of customers who sign up on their own.',
        },
      ],
      answer: 'Amazon Cognito',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-2',
      prompt:
        'A bank in La Paz has 40 employees working across six AWS accounts. It wants them to sign in once with their corporate directory user and pick the account from a portal. Which service do you use?',
      options: [
        {
          service: 'AWS Organizations',
          why: 'Organizations groups accounts and applies policies, but it does not provide the single sign-on portal for staff.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center connects your directory and gives staff an access portal with single sign-on to multiple AWS accounts.',
        },
        {
          service: 'Amazon Cognito',
          why: 'Cognito authenticates the users of your own apps; it does not hand out staff access to the company’s AWS accounts.',
        },
        {
          service: 'AWS IAM',
          why: 'With IAM you would have to create users or roles in each of the six accounts; it offers no central single sign-on portal.',
        },
      ],
      answer: 'AWS IAM Identity Center',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-3',
      prompt:
        'A school in Quito has an app on an EC2 instance that must read files from a bucket. It does not want to store access keys in the code or on the server. Which service grants that permission?',
      options: [
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager stores secrets, but AWS recommends against storing AWS credentials there: that is what IAM roles are for.',
        },
        {
          service: 'AWS KMS',
          why: 'KMS manages encryption keys; it does not give the instance permission to read the bucket.',
        },
        {
          service: 'AWS IAM',
          why: 'An IAM role attached to the instance gives it temporary credentials with read permission, with no stored keys.',
        },
      ],
      answer: 'AWS IAM',
      topicSlug: 'iam-fundamentals',
    },
    {
      id: 'identity-4',
      prompt:
        'A fintech in Santiago has twelve accounts and wants to stop its workload accounts, even their administrators, from creating resources outside approved Regions. Which service applies that limit to all of them?',
      options: [
        {
          service: 'AWS IAM',
          why: 'An IAM policy applies inside one account, and an administrator of that account could change it; it does not limit all accounts at once.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center assigns staff access to accounts; it does not put a permissions ceiling on an entire account.',
        },
        {
          service: 'AWS Organizations',
          why: 'Organizations SCPs set the maximum permissions for entire accounts and OUs, for example which Regions can be used.',
        },
      ],
      answer: 'AWS Organizations',
      topicSlug: 'multi-account-governance',
    },
    {
      id: 'identity-5',
      prompt:
        'A pharmacy chain in Lima must encrypt its volumes and buckets with keys it controls: deciding who can use them and seeing every use in the audit trail. Which service do you use?',
      options: [
        {
          service: 'AWS KMS',
          why: 'KMS creates and controls encryption keys integrated with AWS services; key policies define who uses them and CloudTrail logs every use.',
        },
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager stores passwords and tokens; for encryption keys AWS recommends KMS.',
        },
        {
          service: 'AWS Certificate Manager',
          why: 'Certificate Manager handles SSL/TLS certificates for HTTPS traffic; it does not encrypt volumes or buckets at rest.',
        },
      ],
      answer: 'AWS KMS',
      topicSlug: 'encryption-and-data-protection',
    },
    {
      id: 'identity-6',
      prompt:
        'A delivery app in Guadalajara has its database password hardcoded. You want to take it out of the code, fetch it at runtime, and change it automatically every 30 days. Which service do you choose?',
      options: [
        {
          service: 'AWS KMS',
          why: 'KMS encrypts data and protects keys, but it does not store the database password or rotate it for you.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM manages AWS identities and permissions; it does not store the database engine’s password.',
        },
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager stores credentials, the app fetches them with an API call instead of keeping them in code, and it rotates them on a schedule.',
        },
      ],
      answer: 'AWS Secrets Manager',
      topicSlug: 'encryption-and-data-protection',
    },
    {
      id: 'identity-7',
      prompt:
        'An online store in Bogotá needs HTTPS for its domain behind an Application Load Balancer and does not want to remember to renew the certificate every year. Which service do you use?',
      options: [
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager rotates passwords and tokens; for certificates and their private keys AWS recommends Certificate Manager.',
        },
        {
          service: 'AWS Certificate Manager',
          why: 'Certificate Manager issues SSL/TLS certificates for integrated services like the load balancer and renews them at no additional cost.',
        },
        {
          service: 'AWS KMS',
          why: 'KMS manages data encryption keys; it does not issue or renew certificates for a website domain.',
        },
      ],
      answer: 'AWS Certificate Manager',
      topicSlug: 'encryption-and-data-protection',
    },
    {
      id: 'identity-8',
      prompt:
        'The auditor of an insurance company in Montevideo asks for the SOC 2 report and the ISO 27001 certification of the AWS infrastructure the company uses. Where do you download them?',
      options: [
        {
          service: 'AWS KMS',
          why: 'KMS manages encryption keys; it does not publish AWS compliance documents.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM controls permissions inside the account; it does not provide AWS audit reports.',
        },
        {
          service: 'AWS Artifact',
          why: 'Artifact offers free, on-demand downloads of AWS SOC, ISO, and PCI reports to hand to auditors.',
        },
      ],
      answer: 'AWS Artifact',
      topicSlug: 'compliance-and-auditing',
    },
    {
      id: 'identity-9',
      prompt:
        'A cooperative in Cochabamba wants to create one AWS account per branch and pay for everything with a single bill that combines usage for volume discounts. Which service does it use?',
      options: [
        {
          service: 'AWS Organizations',
          why: 'Organizations creates accounts, groups them, and provides consolidated billing with one payment method for all of them.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center gives staff single sign-on; it does not create accounts or consolidate the bill.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM works inside one account; it does not create new accounts or combine the billing of several.',
        },
      ],
      answer: 'AWS Organizations',
      topicSlug: 'consolidated-billing-and-tags',
    },
    {
      id: 'identity-10',
      prompt:
        'A university in Arequipa built its own web portal for grades. Its 8,000 students must create their account, sign in with MFA, and reset their password on their own. Which service manages those accounts?',
      options: [
        {
          service: 'AWS IAM Identity Center',
          why: 'Identity Center is for staff who access AWS accounts and managed apps; not for user sign-up in your own portal.',
        },
        {
          service: 'Amazon Cognito',
          why: 'Cognito is a user directory for your apps, with sign-up, sign-in, MFA, and password recovery.',
        },
        {
          service: 'AWS IAM',
          why: 'IAM is not for thousands of app end users: it is for identities that manage AWS resources.',
        },
      ],
      answer: 'Amazon Cognito',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-11',
      prompt:
        'A consulting firm in Asunción wants to define a "read-only" set of permissions once, assign it to its analysts in three accounts, and remove all of a person’s access in one place when they leave.',
      options: [
        {
          service: 'Amazon Cognito',
          why: 'Cognito manages the users of your apps; it does not assign staff access to AWS accounts.',
        },
        {
          service: 'AWS Organizations',
          why: 'Organizations limits entire accounts with SCPs, but it does not assign permissions to specific people.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'With Identity Center permission sets you define access once, assign it across multiple accounts, and revoke it from one place.',
        },
      ],
      answer: 'AWS IAM Identity Center',
      topicSlug: 'federated-identity-and-cross-account-access',
    },
    {
      id: 'identity-12',
      prompt:
        'A hospital in Guayaquil uses a single AWS account, with no organization. Five analysts must read one bucket with MFA and nothing else, following least privilege. Which service do you configure it with?',
      options: [
        {
          service: 'AWS IAM',
          why: 'An IAM group with a policy that only allows reading that bucket, plus MFA, applies least privilege inside the account.',
        },
        {
          service: 'AWS IAM Identity Center',
          why: 'Account access with Identity Center requires an organization instance; with a standalone account and five people, IAM is enough.',
        },
        {
          service: 'AWS Organizations',
          why: 'Organizations governs multiple accounts; there is no organization here and it does not grant permissions to people.',
        },
        {
          service: 'Amazon Cognito',
          why: 'Cognito is for web and mobile app users, not for staff who sign in to the AWS Management Console.',
        },
      ],
      answer: 'AWS IAM',
      topicSlug: 'iam-fundamentals',
    },
    {
      id: 'identity-13',
      prompt:
        'A payment gateway in Mexico City requires its encryption keys to live in FIPS 140-3 validated hardware modules and their key material to rotate automatically every year. Which service meets this?',
      options: [
        {
          service: 'AWS Secrets Manager',
          why: 'Secrets Manager rotates passwords and tokens; it is not the service that creates and protects encryption keys in HSMs.',
        },
        {
          service: 'AWS Certificate Manager',
          why: 'Certificate Manager handles SSL/TLS certificates; it does not manage keys to encrypt data.',
        },
        {
          service: 'AWS Artifact',
          why: 'Artifact provides compliance reports; it does not store or rotate any keys.',
        },
        {
          service: 'AWS KMS',
          why: 'KMS keys are protected by FIPS 140-3 validated HSMs, and automatic yearly rotation is turned on with one click.',
        },
      ],
      answer: 'AWS KMS',
      topicSlug: 'encryption-and-data-protection',
    },
  ],
};
