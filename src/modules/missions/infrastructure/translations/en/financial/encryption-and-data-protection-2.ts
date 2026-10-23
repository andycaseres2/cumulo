import type { Mission } from '../../../../domain/Mission';

/**
 * Fintech PagoYa: a payments startup in Guadalajara that must meet a card network contract and find customer data in its buckets.
 * Practices AWS CloudHSM versus AWS KMS, Amazon Macie, encryption at rest and in transit on Amazon RDS, and auditing key usage.
 */
export const encryptionAndDataProtection2: Mission = {
  id: 'encryption-and-data-protection-2',
  track: 'financial',
  buildingId: 'fintech',
  topicSlug: 'encryption-and-data-protection',
  title: 'Hardware keys',
  client: { name: 'Fernanda Ruiz', role: 'Head of Security at Fintech PagoYa' },
  intro: [
    'I’m so glad you made it! I’m Fernanda Ruiz, head of Security at Fintech PagoYa. From Guadalajara we process card payments for thousands of small businesses across Mexico.',
    'Everything runs on AWS: the transactions database on Amazon RDS and millions of merchant files in Amazon S3. We grew so fast that nobody really knows what data is in each bucket.',
    'Now we want to sign with a major card network, and its contract comes with very specific encryption requirements. On top of that, an investment fund is going to audit us before investing.',
    'If we don’t comply, we lose the contract and the investment in one blow. Will you help me get the keys in order?',
  ],
  outro: {
    passed: [
      'We did it. We have dedicated HSMs for the card network, we know where the personal data is, the transactions database is encrypted at rest and in transit, and we can prove who uses each key.',
      'The contract is signed and the fund was impressed. Thank you: at PagoYa we always pay you on time.',
    ],
    failed: [
      'Oops... with these decisions the card network won’t sign the contract with us.',
      'Review the theory on encryption and data protection, and come back whenever you like. We’ll be waiting here with the keys.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'dedicated-hsm',
      prompt:
        'The card network’s contract requires our keys to be in a hardware module dedicated only to us, and for us to have full control over the HSM’s keys and users. Which service meets that?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'kms-shared',
          label: 'AWS Key Management Service (AWS KMS)',
          definition:
            'A managed, multi-tenant service to create and control encryption keys, integrated with many AWS services.',
          explanation:
            'KMS is multi-tenant: AWS operates the service and PagoYa defines policies. It doesn’t meet the requirement of an HSM dedicated only to them.',
          correct: false,
        },
        {
          id: 'acm-hsm',
          label: 'AWS Certificate Manager (ACM)',
          definition:
            'A service that creates, stores and renews public and private SSL/TLS certificates.',
          explanation:
            'ACM manages TLS certificates; it doesn’t offer a dedicated HSM for storing the fintech’s keys.',
          correct: false,
        },
        {
          id: 'cloudhsm',
          label: 'AWS CloudHSM',
          definition:
            'A service that offers dedicated, single-tenant hardware security modules in the cloud.',
          explanation:
            'CloudHSM provides HSMs dedicated to a single customer: AWS manages the hardware, but PagoYa has full control over the HSM’s keys and users, outside of IAM.',
          correct: true,
        },
        {
          id: 'macie-hsm',
          label: 'Amazon Macie',
          definition:
            'A data security service that discovers sensitive data in Amazon S3 using machine learning and pattern matching.',
          explanation:
            'Macie discovers sensitive data in S3; it doesn’t store or manage encryption keys.',
          correct: false,
        },
      ],
    },
    {
      id: 'find-pii',
      prompt:
        'We have thousands of files that merchants upload to Amazon S3, and we don’t know which ones contain personal data or card numbers. The fund wants to know. What do we use to find them?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'guardduty-pii',
          label: 'Amazon GuardDuty',
          definition:
            'A security service focused on detecting threats in the AWS account.',
          explanation:
            'GuardDuty detects threats; it doesn’t look for personal data inside files. Confusing it with Macie is a classic mistake.',
          correct: false,
        },
        {
          id: 'inspector-pii',
          label: 'Amazon Inspector',
          definition:
            'A service that scans workloads for software vulnerabilities.',
          explanation:
            'Inspector looks for vulnerabilities, not for personal data in S3 files.',
          correct: false,
        },
        {
          id: 'config-pii',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources, their configuration history and rules to evaluate whether they comply with what you define.',
          explanation:
            'Config evaluates the buckets’ configuration, but it doesn’t inspect the content of the files to find personal data.',
          correct: false,
        },
        {
          id: 'macie-pii',
          label: 'Amazon Macie',
          definition:
            'A data security service that discovers sensitive data in Amazon S3 using machine learning and pattern matching.',
          explanation:
            'Macie discovers personally identifiable information (PII), financial data or credentials in S3, and keeps an inventory of the buckets.',
          correct: true,
        },
      ],
    },
    {
      id: 'rds-encryption',
      prompt:
        'The transactions database is on Amazon RDS. The card network requires the data to be encrypted both while stored in the database and while traveling between the app and the database. How do we solve it?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'rds-both',
          label: 'Encrypt the RDS instance at rest with an AWS KMS key and use SSL/TLS connections',
          definition:
            'A combination of encrypting the database’s storage and encrypting the connections that reach it.',
          explanation:
            'Amazon RDS encrypts instances and snapshots at rest with KMS keys (you turn it on when creating the instance; an existing database moves to an encrypted copy of its snapshot) and accepts SSL/TLS connections, so both requirements are covered.',
          correct: true,
        },
        {
          id: 'tls-covers-disk',
          label: 'Only use SSL/TLS connections: with that, the data on disk is encrypted too',
          definition:
            'Using TLS to encrypt the communications between the application and the database.',
          explanation:
            'TLS protects data in transit, not data stored on disk. Encryption at rest would be missing.',
          correct: false,
        },
        {
          id: 'rest-only',
          label: 'Only encrypt at rest: with the database encrypted, the connections are protected',
          definition:
            'Encryption of the database’s storage and its snapshots.',
          explanation:
            'Encryption at rest protects stored data, but not what travels across the network. The card network asks for both protections.',
          correct: false,
        },
        {
          id: 'macie-rds',
          label: 'Turn on Amazon Macie for the database so it encrypts it',
          definition:
            'A data security service that discovers sensitive data in Amazon S3.',
          explanation:
            'Macie discovers sensitive data in S3; it doesn’t encrypt databases or connections.',
          correct: false,
        },
      ],
    },
    {
      id: 'key-audit',
      prompt:
        'For the rest of our data we use AWS KMS. The fund asks two things: how we decide who can use each key and how we prove who used it. What do we tell them?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'export-keys',
          label: 'We export the keys in plaintext to a file with restricted access and note down who opens it',
          definition:
            'The practice of taking the key material out of the service that protects it to store and control it by hand.',
          explanation:
            'KMS keys never leave the service unencrypted. Besides, a manual file isn’t reliable evidence of each key’s use.',
          correct: false,
        },
        {
          id: 'key-policy-cloudtrail',
          label: 'KMS key policies define who can use them, and AWS CloudTrail records each use',
          definition:
            'KMS mechanisms to control access to each key and to audit the operations performed with it.',
          explanation:
            'Key policies control who uses each key, and their use can be audited in CloudTrail, which is the evidence the fund is asking for.',
          correct: true,
        },
        {
          id: 'acm-audit',
          label: 'AWS Certificate Manager defines who uses the keys and keeps the usage log',
          definition:
            'A service that creates, stores and renews public and private SSL/TLS certificates.',
          explanation:
            'ACM manages TLS certificates; it doesn’t control access to KMS keys or record their use.',
          correct: false,
        },
        {
          id: 'macie-audit',
          label: 'Amazon Macie controls access to the keys and records each use',
          definition:
            'A data security service that discovers sensitive data in Amazon S3.',
          explanation:
            'Macie finds sensitive data in S3, but it doesn’t manage access to KMS keys or audit their use.',
          correct: false,
        },
      ],
    },
  ],
};
