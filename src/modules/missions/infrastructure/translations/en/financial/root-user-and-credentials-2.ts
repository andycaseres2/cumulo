import type { Mission } from '../../../../domain/Mission';

/**
 * Imprenta Rápida: a print shop in San José, Costa Rica, whose online order system leaks credentials.
 * Practices AWS Secrets Manager vs. Parameter Store, the IAM password policy and responding to leaked access keys.
 */
export const rootUserAndCredentials2: Mission = {
  id: 'root-user-and-credentials-2',
  track: 'financial',
  topicSlug: 'root-user-and-credentials',
  buildingId: 'print-shop',
  title: 'Print shop secrets',
  client: { name: 'Andrés Brenes', role: 'Owner of Imprenta Rápida' },
  intro: [
    'Pura vida, I’m glad you came. I’m Andrés Brenes, owner of Imprenta Rápida in San José. We print business cards, flyers and menus for half the country.',
    'Customers upload their designs to our website, which runs on AWS. My nephew programmed it with lots of enthusiasm... and with the database password written right into the code.',
    'Yesterday a friend warned me that one of our access keys showed up in a public repository. And the five designers are still using the same password they’ve had for three years.',
    'If someone uses those keys, the AWS bill could be bigger than everything we bill in a year. Will you help me keep these secrets properly?',
  ],
  outro: {
    passed: [
      'Now the database password rotates on its own, the configuration is where it belongs and the leaked key is useless.',
      'My designers even complained about the new password policy, which is a good sign. Whenever you need business cards, the first thousand are on the house.',
    ],
    failed: [
      'Hmm... with these answers the print shop’s secrets are still in plain sight for anyone.',
      'Review the theory on credentials and secrets, and come back. The press never stops, but I’ll wait for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'leaked-key',
      prompt:
        'Urgent things first: the access key that showed up in the public repository belongs to an IAM user that the print queue script uses. What do we do right now?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'change-console-password',
          label: 'Change that user’s console password',
          definition:
            'Replacing the password an IAM user uses to sign in to the AWS console.',
          explanation:
            'The console password and access keys are different credentials. The leaked key would keep working.',
          correct: false,
        },
        {
          id: 'private-repo',
          label: 'Make the repository private and leave the key as it is',
          definition:
            'Restricting who can see the contents of a code repository that used to be public.',
          explanation:
            'The key was already exposed and someone may have copied it. Hiding the repository doesn’t invalidate it.',
          correct: false,
        },
        {
          id: 'remove-key-use-role',
          label: 'Deactivate and delete that access key, and move the script to temporary credentials with a role',
          definition:
            'Invalidating an exposed long-term credential and replacing it with a mechanism that provides temporary credentials.',
          explanation:
            'A leaked key must stop working as soon as possible. Best practice is to prefer temporary credentials with roles and not keep keys in the code.',
          correct: true,
        },
        {
          id: 'third-key',
          label: 'Create a third access key for the user and keep using the other two',
          definition:
            'Adding more access key ID and secret access key pairs to the same IAM user.',
          explanation:
            'Each user can have at most two access keys. And as long as the leaked one stays active, the risk doesn’t go away.',
          correct: false,
        },
      ],
    },
    {
      id: 'db-password',
      prompt:
        'Now, the database password that’s written in the code. I want to get it out of there, have it encrypted and have it change automatically every so often. Where do I store it?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'env-in-code',
          label: 'In a constant inside a configuration file in the code',
          definition:
            'Leaving a sensitive value written directly in the code or in files that travel with it, also called hardcoding.',
          explanation:
            'It’s the same as today, under another name. Secrets must not be hardcoded in the code or in repositories.',
          correct: false,
        },
        {
          id: 'parameter-store-db',
          label: 'In Parameter Store, as a SecureString parameter',
          definition:
            'An AWS Systems Manager capability for storing configuration, with optional encryption through SecureString parameters and AWS KMS.',
          explanation:
            'Parameter Store can encrypt the value, but it doesn’t offer automatic rotation. When the question asks to rotate credentials, the answer is something else.',
          correct: false,
        },
        {
          id: 'kms-store',
          label: 'In AWS KMS, as if it were an encryption key',
          definition:
            'A managed service to create and control the keys used to encrypt and sign data.',
          explanation:
            'KMS manages encryption keys; it isn’t designed to store or rotate a database password.',
          correct: false,
        },
        {
          id: 'secrets-manager',
          label: 'In AWS Secrets Manager',
          definition:
            'A service to store secrets such as database credentials, API keys and tokens, always encrypted with AWS KMS.',
          explanation:
            'Secrets Manager encrypts secrets and offers automatic rotation, with native integrations for databases. It’s what AWS recommends for credentials.',
          correct: true,
        },
      ],
    },
    {
      id: 'app-config',
      prompt:
        'We also have configuration values that aren’t secret: the shipping service’s URL and the servers’ AMI ID. They don’t need to rotate and I want to avoid extra costs. Where do I store them?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'parameter-store-config',
          label: 'In Parameter Store, from AWS Systems Manager',
          definition:
            'The AWS Systems Manager configuration store for values such as URLs, AMI IDs and environment variables.',
          explanation:
            'Parameter Store is designed for configuration, and its standard tier has no additional cost. If any value were sensitive, it could be stored as a SecureString.',
          correct: true,
        },
        {
          id: 'hardcode-config',
          label: 'Written directly into the website’s code',
          definition:
            'Leaving fixed configuration values inside the application’s source code.',
          explanation:
            'Every change of URL or AMI would force you to modify and deploy the code. A configuration store keeps those values separate from the code.',
          correct: false,
        },
        {
          id: 'cloudtrail-config',
          label: 'In AWS CloudTrail',
          definition:
            'A service that records, as events, the actions of users, roles and services taken in the account.',
          explanation:
            'CloudTrail records who did what, and when. It isn’t a place to store configuration values.',
          correct: false,
        },
        {
          id: 'kms-config',
          label: 'In AWS KMS',
          definition:
            'A managed service to create and control encryption keys, protected by hardware security modules.',
          explanation:
            'KMS manages keys for encrypting data; it doesn’t store configuration values like URLs or AMI IDs.',
          correct: false,
        },
      ],
    },
    {
      id: 'designers-passwords',
      prompt:
        'Last topic: the five designers sign in to the console as IAM users, with passwords from three years ago. I want to require long passwords that expire and can’t be reused. What do I configure?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'secrets-rotation-people',
          label: 'Automatic rotation of their passwords with AWS Secrets Manager',
          definition:
            'A Secrets Manager feature that periodically changes application secrets, such as database credentials.',
          explanation:
            'Secrets Manager manages application secrets. The rules for IAM users’ console passwords are defined somewhere else.',
          correct: false,
        },
        {
          id: 'iam-password-policy',
          label: 'The account password policy',
          definition:
            'Rules for IAM users’ passwords: minimum length, character types, expiration and preventing reuse.',
          explanation:
            'The password policy covers exactly what Andrés is asking for his IAM users. AWS recommends combining it with MFA.',
          correct: true,
        },
        {
          id: 'cognito-pool',
          label: 'An Amazon Cognito user pool for the designers',
          definition:
            'A user directory for sign-up and sign-in to web and mobile applications.',
          explanation:
            'Cognito is for an application’s users, not for IAM users’ console passwords.',
          correct: false,
        },
        {
          id: 'rotate-access-keys',
          label: 'Rotate each designer’s access keys',
          definition:
            'Periodically replacing a user’s long-term credentials for programmatic access.',
          explanation:
            'Access keys are for the CLI, the SDK or the API. Rotating them doesn’t change the rules for console passwords.',
          correct: false,
        },
      ],
    },
  ],
};
