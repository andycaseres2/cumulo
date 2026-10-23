import type { Mission } from '../../../../domain/Mission';

/**
 * Inversiones Istmo: a wealth management firm in Panama City, with offices in the Torre Financiera, securing its investor portal.
 * Practices encryption in transit versus at rest, AWS Certificate Manager renewals, Amazon S3 default encryption and AWS KMS key types.
 */
export const encryptionAndDataProtection1: Mission = {
  id: 'encryption-and-data-protection-1',
  track: 'financial',
  buildingId: 'financial-tower',
  topicSlug: 'encryption-and-data-protection',
  title: 'The investor’s padlock',
  client: { name: 'Andrés Quintero', role: 'CTO of Inversiones Istmo' },
  intro: [
    'Come in, welcome to the 32nd floor of the Torre Financiera. I’m Andrés Quintero, CTO of Inversiones Istmo. From Panama City we manage the savings and investments of thousands of families.',
    'Our clients sign in to a portal on AWS to see their portfolios and download their account statements as PDFs, which we store in Amazon S3.',
    'Last month the portal’s certificate expired without anyone noticing and browsers showed a security warning. Several clients called in a panic, and now the regulator wants to review how we protect their data.',
    'If we don’t put the right padlock in each place, we lose our investors’ trust. Will you help me review everything?',
  ],
  outro: {
    passed: [
      'Excellent. Data travels encrypted, the certificate renews on its own, the account statements are encrypted in S3 and we control our own keys.',
      'The regulator was satisfied and the investors are at ease. Thank you: at Inversiones Istmo you’ll always have a trusted advisor.',
    ],
    failed: [
      'Hmm... with these decisions there’s still data without the right padlock.',
      'Review the theory on encryption and data protection, and come back whenever you like. The 32nd floor is waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'in-transit',
      prompt:
        'Let’s start with what the clients saw. We want nobody to be able to intercept the data while it travels between their browser and our portal. What kind of protection is that?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'ebs-at-rest',
          label: 'Encryption at rest for the servers’ volumes',
          definition:
            'Encryption of data stored on disks, databases or buckets, with keys such as those from AWS KMS.',
          explanation:
            'Encryption at rest protects stored data. It doesn’t protect the communication between the browser and the portal.',
          correct: false,
        },
        {
          id: 'tls-in-transit',
          label: 'Encryption in transit with TLS, that is, HTTPS',
          definition:
            'Protecting data while it travels across the network using Transport Layer Security (TLS).',
          explanation:
            'The threat is someone intercepting the communication, and that’s solved with TLS: the portal must be served over HTTPS.',
          correct: true,
        },
        {
          id: 'macie-transit',
          label: 'Amazon Macie',
          definition:
            'A service that discovers sensitive data, such as PII or financial data, in Amazon S3 using machine learning and pattern matching.',
          explanation:
            'Macie finds sensitive data in S3, but it doesn’t encrypt the communication between the browser and the portal.',
          correct: false,
        },
        {
          id: 'sse-s3-transit',
          label: 'Server-side encryption in Amazon S3 (SSE-S3)',
          definition:
            'Encryption that S3 applies to objects stored in its buckets with keys managed by S3.',
          explanation:
            'SSE-S3 encrypts the objects stored in the bucket, that is, at rest. It doesn’t protect data along the way.',
          correct: false,
        },
      ],
    },
    {
      id: 'certificate-renewal',
      prompt:
        'Now, the certificate that expired. We bought it from an external authority and imported it into ACM to use on our Application Load Balancer. I don’t want it to expire again. What do we do?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'reimport',
          label: 'Import the external certificate into ACM again, which will renew it on its own from now on',
          definition:
            'Uploading to AWS Certificate Manager a certificate issued by another certificate authority.',
          explanation:
            'Imported certificates aren’t renewed automatically. Reimporting it only postpones the same problem.',
          correct: false,
        },
        {
          id: 'kms-cert',
          label: 'Store the certificate in AWS KMS so it manages the expiration',
          definition:
            'A managed service to create and control the keys used to encrypt and sign data.',
          explanation:
            'KMS manages encryption keys, not SSL/TLS certificates or their renewal.',
          correct: false,
        },
        {
          id: 'cloudhsm-cert',
          label: 'Move the certificate to a dedicated AWS CloudHSM HSM',
          definition:
            'A service that provides dedicated, single-tenant hardware security modules whose keys and users the customer controls.',
          explanation:
            'CloudHSM gives exclusive control over keys on dedicated hardware, but it doesn’t renew the portal’s certificates.',
          correct: false,
        },
        {
          id: 'acm-issued',
          label: 'Request a public certificate issued by ACM, with DNS validation, and associate it with the load balancer',
          definition:
            'An SSL/TLS certificate created by AWS Certificate Manager for use with integrated services such as Elastic Load Balancing.',
          explanation:
            'ACM automatically renews the certificates it issues with DNS validation, and public ones used with integrated services have no additional charge.',
          correct: true,
        },
      ],
    },
    {
      id: 's3-default-encryption',
      prompt:
        'The PDF account statements are in Amazon S3. A previous consultant told us we have to turn on encryption so the new PDFs aren’t exposed. Is that right?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 's3-encrypts-new',
          label: 'There’s no need: S3 already encrypts new objects with SSE-S3, and you can choose AWS KMS keys if you want more control',
          definition:
            'Automatic Amazon S3 encryption for all new objects, with keys managed by S3 and at no additional cost.',
          explanation:
            'Since January 5, 2023, S3 automatically encrypts all new objects with SSE-S3. If the firm wants to control the keys, it can choose KMS keys.',
          correct: true,
        },
        {
          id: 's3-plain-default',
          label: 'Yes: S3 stores objects unencrypted until someone turns on encryption in each bucket',
          definition:
            'The assumption that object storage doesn’t apply encryption unless it is explicitly configured.',
          explanation:
            'This is a classic trap: S3 has encrypted all new objects by default since 2023.',
          correct: false,
        },
        {
          id: 'acm-objects',
          label: 'Yes, and you have to use AWS Certificate Manager to encrypt each PDF',
          definition:
            'A service that creates, stores and renews public and private SSL/TLS certificates.',
          explanation:
            'ACM is for TLS certificates, that is, for data in transit. It doesn’t encrypt the objects stored in S3.',
          correct: false,
        },
        {
          id: 'move-to-tls',
          label: 'Serving the portal over HTTPS is enough: that also encrypts the PDFs stored in the bucket',
          definition:
            'Using TLS to protect the connections between users and a web application.',
          explanation:
            'TLS protects data in transit; it doesn’t encrypt stored files. They are different protections.',
          correct: false,
        },
      ],
    },
    {
      id: 'key-control',
      prompt:
        'Last question: the regulator wants us to control who can use the key that encrypts the account statements and when it rotates, and for its use to be auditable. Without running our own hardware. Which key do we use?',
      topicSlug: 'encryption-and-data-protection',
      examTasks: ['2.2'],
      options: [
        {
          id: 'aws-owned-key',
          label: 'An AWS owned key',
          definition:
            'A key that a service uses on your behalf to encrypt by default; you don’t see it in your account and it has no cost for you.',
          explanation:
            'AWS owned keys don’t even appear in the account, so the firm couldn’t control their policy or rotation.',
          correct: false,
        },
        {
          id: 'aws-managed-key',
          label: 'An AWS managed key',
          definition:
            'A key that a service creates in your account; you can see it but not manage it, and it rotates every year.',
          explanation:
            'With an AWS managed key the firm can see it, but it can’t define its policy or its rotation.',
          correct: false,
        },
        {
          id: 'customer-managed-key',
          label: 'An AWS KMS customer managed key',
          definition:
            'A KMS key that the customer creates and whose policy, rotation and deletion it controls, with a monthly and per-use charge.',
          explanation:
            'With the key policy the firm defines who can use the key and controls its rotation; its use is audited in AWS CloudTrail, without running its own hardware.',
          correct: true,
        },
        {
          id: 'acm-key',
          label: 'A private certificate from AWS Certificate Manager',
          definition:
            'An SSL/TLS certificate for identifying internal resources, issued with AWS Private CA.',
          explanation:
            'A private certificate identifies resources in TLS connections; it isn’t the key that encrypts the stored account statements.',
          correct: false,
        },
      ],
    },
  ],
};
