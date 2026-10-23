import type { Mission } from '../../../domain/Mission';

/**
 * Banco Andino: a bank in Bogotá moving its customer app to AWS while auditors ask who touches customer data.
 * Practices the shared responsibility model, IAM least privilege, root user protection, AWS KMS and AWS CloudTrail.
 */
export const bankAccess: Mission = {
  id: 'bank-access',
  track: 'financial',
  topicSlug: 'iam-fundamentals',
  buildingId: 'bank',
  title: 'The keys to the bank',
  client: { name: 'Carlos Mendoza', role: 'IT Manager at Banco Andino' },
  intro: [
    'Thanks for coming. I’m Carlos Mendoza, IT manager at Banco Andino. From here in Bogotá we serve thousands of customers who use our app to pay and transfer money.',
    'We’re moving that app to AWS, with the customer database on Amazon RDS. The technical migration is going well, but the auditors stopped us dead in our tracks.',
    'They want to know who accesses customer data, and I don’t know what to tell them: all twelve developers sign in to the account with the same administrator user. And nobody is clear on who patches what.',
    'If we don’t sort this out before the next audit, they won’t let us go to production. I need someone to help me put the keys to the bank in order. Will you join me?',
  ],
  outro: {
    passed: [
      'Excellent. Now I know what AWS patches and what’s on us, every developer has their own identity with just the right permissions, and the root user is under lock and key.',
      'With the data encrypted with AWS KMS and CloudTrail recording every action, I can finally look the auditors in the eye. Thank you: the doors of this bank will always be open to you.',
    ],
    failed: [
      'Hmm... with these answers I don’t think we’ll pass the audit. Some decisions still worry me.',
      'Review the theory calmly and come back whenever you like. The keys to the bank will be waiting for you.',
    ],
  },
  passingScore: 0.8,
  decisions: [
    {
      id: 'rds-responsibility',
      prompt:
        'Let’s start with the basics. Our customer database is going to run on Amazon RDS. Who patches the operating system and the database engine, and who takes care of the data and of who can get in?',
      topicSlug: 'shared-responsibility',
      examTasks: ['2.1'],
      options: [
        {
          id: 'bank-patches-all',
          label: 'The bank patches the operating system and the engine; AWS only looks after the building',
          definition:
            'A model in which the customer installs and patches all of the server’s software, as happens with the guest operating system on Amazon EC2.',
          explanation:
            'That would apply to Amazon EC2, not RDS. On Amazon RDS, AWS patches the operating system and the database engine during a maintenance window.',
          correct: false,
        },
        {
          id: 'shared-rds',
          label: 'AWS patches the operating system and the engine; the bank manages data, users, encryption and permissions',
          definition:
            'The split of responsibilities for a managed database: AWS operates the hardware, the operating system and the engine; the customer controls access and data.',
          explanation:
            'Correct. On RDS, AWS applies patches during the maintenance window you choose, but the data, the database users, encryption, security groups and IAM permissions always belong to the bank.',
          correct: true,
        },
        {
          id: 'aws-does-everything',
          label: 'AWS takes care of everything, including the data and who can see it',
          definition:
            'The idea that a managed service shifts all security responsibility to AWS, including access permissions.',
          explanation:
            'This is a classic trap. The more managed a service is, the fewer operational tasks you have, but the data, encryption and access permissions always belong to the bank.',
          correct: false,
        },
        {
          id: 'bank-os-aws-engine',
          label: 'The bank patches the operating system and AWS patches the database engine',
          definition:
            'A split in which the customer maintains the database server’s operating system and the provider maintains only the engine software.',
          explanation:
            'On Amazon RDS the bank doesn’t manage the operating system: AWS patches it together with the engine. The bank’s job is to choose the maintenance window.',
          correct: false,
        },
      ],
    },
    {
      id: 'developer-access',
      prompt:
        'Now, the problem that bothers the auditors the most: twelve developers sign in with the same administrator user. How do we give them access to the account the right way?',
      topicSlug: 'iam-fundamentals',
      examTasks: ['2.3'],
      options: [
        {
          id: 'shared-admin',
          label: 'Keep sharing the administrator user, but with a longer password',
          definition:
            'A single identity with full permissions whose credentials are used by several people at once.',
          explanation:
            'A longer password solves nothing: if everyone uses the same identity, nobody can tell who did what, and everyone has more permissions than they need.',
          correct: false,
        },
        {
          id: 'root-for-devs',
          label: 'Give them the root user credentials so they never lack a permission',
          definition:
            'The root user is the identity created when the account is opened, with complete access to all services and resources, including billing.',
          explanation:
            'That’s the opposite of what we want. AWS recommends not using the root user for everyday tasks and creating identities with limited permissions for daily work.',
          correct: false,
        },
        {
          id: 'group-least-privilege',
          label: 'One identity per developer, with permissions assigned through a group and least-privilege policies',
          definition:
            'Individual IAM identities grouped together to receive permissions at once, through policies that grant only what each task needs.',
          explanation:
            'Correct. Each person is identified separately, and the group lets you assign the same permissions to all twelve at once. With custom policies you apply least privilege; ideally, people sign in with federation and temporary credentials through AWS IAM Identity Center.',
          correct: true,
        },
        {
          id: 'keys-in-code',
          label: 'Create administrator access keys and store them in the app’s code',
          definition:
            'Access keys are long-term credentials for programmatic access, made up of an access key ID and a secret access key.',
          explanation:
            'Access keys must never be put in code or in repositories: if they leak, anyone can use them. Besides, they are still shared credentials that don’t identify each person.',
          correct: false,
        },
      ],
    },
    {
      id: 'root-user',
      prompt:
        'I just found out that several managers know the email and password we opened the account with, and someone uses them every day. What do we do with that root user?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'protect-root',
          label: 'Change the password, enable MFA, create no access keys for it and use it only for the tasks that require it',
          definition:
            'Best practices for the root user: a strong, unique password, multi-factor authentication, no access keys and no sharing of its credentials.',
          explanation:
            'Correct. The root user can do absolutely everything, so you protect it with MFA, don’t share it and reserve it for the tasks only it can do. Daily work is done with lower-privilege identities.',
          correct: true,
        },
        {
          id: 'password-policy',
          label: 'Set up a password policy with expiration every 90 days',
          definition:
            'The account password policy defines rules such as minimum length, character types, expiration and preventing reuse.',
          explanation:
            'The password policy applies only to IAM users, not to the root user. It doesn’t fix several managers sharing the root user and using it every day.',
          correct: false,
        },
        {
          id: 'root-access-keys',
          label: 'Create access keys for the root user and automate daily tasks with them',
          definition:
            'Long-term credentials for programmatic access tied to the identity with full access to the account.',
          explanation:
            'AWS explicitly advises against creating access keys for the root user; if they exist, you should delete them. If they leak, someone would have full control of the bank on AWS.',
          correct: false,
        },
        {
          id: 'sms-mfa',
          label: 'Keep sharing it, but with SMS MFA to a manager’s phone',
          definition:
            'A second authentication factor based on codes sent by text message to the phone.',
          explanation:
            'IAM no longer lets you enable SMS MFA, and the underlying problem would still be there: the root user must not be shared or used for daily work.',
          correct: false,
        },
      ],
    },
    {
      id: 'encryption-at-rest',
      prompt:
        'The auditors also require customer data to be encrypted while it is stored in the database, and they ask who controls the keys. Which service do we use?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'acm',
          label: 'AWS Certificate Manager (ACM)',
          definition:
            'A service that creates, stores and renews public and private SSL/TLS certificates, which make HTTPS possible.',
          explanation:
            'ACM protects data in transit with TLS, for example between the app and the customers. It doesn’t encrypt the data stored in the database.',
          correct: false,
        },
        {
          id: 'macie',
          label: 'Amazon Macie',
          definition:
            'A data security service that discovers sensitive data, such as PII or financial data, in Amazon S3 using machine learning and pattern matching.',
          explanation:
            'Macie helps you find where sensitive data lives in S3, but it doesn’t encrypt the database or manage keys.',
          correct: false,
        },
        {
          id: 'guardduty',
          label: 'Amazon GuardDuty',
          definition: 'A security service focused on detecting threats in the AWS account.',
          explanation:
            'GuardDuty is for detecting threats, not for encrypting data at rest or controlling encryption keys.',
          correct: false,
        },
        {
          id: 'kms',
          label: 'AWS Key Management Service (AWS KMS)',
          definition:
            'A managed service to create and control the keys used to encrypt and sign data, protected by hardware security modules (HSMs).',
          explanation:
            'Correct. KMS integrates with Amazon RDS to encrypt the database at rest, key policies define who can use the keys, and their use can be audited in CloudTrail. With customer managed keys, the bank controls their policy and rotation.',
          correct: true,
        },
      ],
    },
    {
      id: 'audit-trail',
      prompt:
        'Last question, the one that keeps me up at night: if an auditor asks who changed the configuration of the customer database’s Amazon RDS instance last Tuesday, which service lets us prove it?',
      topicSlug: 'compliance-and-auditing',
      examTasks: ['2.2'],
      options: [
        {
          id: 'cloudwatch',
          label: 'Amazon CloudWatch',
          definition:
            'A service that monitors resources and applications in real time with metrics, logs, dashboards and alarms.',
          explanation:
            'CloudWatch answers "how is it performing?", with performance metrics and alarms. To find out who made each API call, you use CloudTrail.',
          correct: false,
        },
        {
          id: 'cloudtrail',
          label: 'AWS CloudTrail',
          definition:
            'A service that records, as events, the actions of users, roles and services taken from the console, the CLI, the SDKs and the APIs.',
          explanation:
            'Correct. CloudTrail answers "who did what, and when?". Event history keeps 90 days, and with a trail to Amazon S3 the bank can keep the evidence longer for the auditors.',
          correct: true,
        },
        {
          id: 'config',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources, their configuration history and rules to evaluate whether they comply with what you define.',
          explanation:
            'Config tells you how a resource ended up configured and whether it follows the rules. To answer who made the API call, the source is CloudTrail.',
          correct: false,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports, such as SOC, PCI and ISO, at no cost and to manage agreements.',
          explanation:
            'Artifact provides compliance evidence for the AWS side, but it doesn’t record what people do inside the bank’s account.',
          correct: false,
        },
      ],
    },
  ],
};
