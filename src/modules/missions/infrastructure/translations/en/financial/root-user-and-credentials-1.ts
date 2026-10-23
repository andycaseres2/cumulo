import type { Mission } from '../../../../domain/Mission';

/**
 * Café de la Bolsa: a coffee shop in Guadalajara whose online orders run on AWS and whose root user is poorly protected.
 * Practices phishing-resistant MFA, root-only tasks, access key handling and monitoring root user activity.
 */
export const rootUserAndCredentials1: Mission = {
  id: 'root-user-and-credentials-1',
  track: 'financial',
  topicSlug: 'root-user-and-credentials',
  buildingId: 'stock-cafe',
  title: 'Coffee with the root user',
  client: { name: 'Mariana Torres', role: 'Owner of Café de la Bolsa' },
  intro: [
    'Hi! Coffee? I’m Mariana Torres, owner of Café de la Bolsa, here in Guadalajara. The stockbrokers order their coffee from our app before the market opens.',
    'The app and the rewards program run on AWS. I opened the account with my email, and to this day that’s the key to everything.',
    'Last week I got a fake email imitating AWS and I almost typed in my password. Then my IT manager accidentally removed his own administrator permissions, and nobody can fix it.',
    'If someone takes over the account, the morning orders go down and my customers go to the competition. Will you help me lock this down?',
  ],
  outro: {
    passed: [
      'Done! The root user has a physical key, I only use it for what truly needs it and I get an alert if anyone signs in with it.',
      'Even my IT manager got his permissions back. The next coffee is on my account; well, the café’s account, not the root one.',
    ],
    failed: [
      'Oh no... with these decisions the account is still as exposed as a pastry in the display case.',
      'Review the theory on the root user and credentials, and come back. I’ll save you a table by the window.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'phishing-mfa',
      prompt:
        'That fake email scared me. I want to add a second factor to the root user, and I want it to be one of the kinds AWS recommends because it resists phishing. Which one do I choose?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'fido-key',
          label: 'A security key or passkey (FIDO)',
          definition:
            'An MFA method based on public key cryptography, with a physical key or a passkey synced in a credential manager.',
          explanation:
            'FIDO passkeys and security keys are phishing-resistant and are the option AWS recommends. It’s also a good idea to register more than one device.',
          correct: true,
        },
        {
          id: 'sms-code',
          label: 'A code by SMS to my phone',
          definition: 'A second factor based on codes sent by text message to the user’s phone.',
          explanation:
            'AWS no longer lets you enable SMS MFA in IAM, so it isn’t an option for the root user.',
          correct: false,
        },
        {
          id: 'longer-password',
          label: 'A longer password, with no second factor',
          definition:
            'Increasing the length and complexity of the password, which is still a single authentication factor.',
          explanation:
            'A strong password is necessary, but if Mariana types it into a fake page, the attacker gets it anyway. It isn’t a second factor.',
          correct: false,
        },
        {
          id: 'password-policy-root',
          label: 'A password policy with expiration every 30 days',
          definition:
            'Account rules for passwords, such as minimum length, character types, expiration and preventing reuse.',
          explanation:
            'The password policy only applies to IAM users, not to the root user, and it doesn’t add a second factor.',
          correct: false,
        },
      ],
    },
    {
      id: 'restore-admin',
      prompt:
        'Now, my IT manager. He was the only IAM administrator and he revoked his own permissions by mistake. No other user can give them back. What do we do?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'self-restore',
          label: 'Have him attach the administrator policy to himself again',
          definition:
            'Trying to modify your own permissions from an identity that no longer has permissions on IAM.',
          explanation:
            'Without permissions on IAM he can’t attach policies. That’s exactly why he got locked out.',
          correct: false,
        },
        {
          id: 'new-password-policy',
          label: 'Change the password policy to unlock him',
          definition:
            'Account rules for IAM users’ passwords, such as minimum length, expiration and reuse.',
          explanation:
            'The password policy governs what passwords look like, not what permissions each user has. It doesn’t give him back administrator access.',
          correct: false,
        },
        {
          id: 'root-restore',
          label: 'Sign in with the root user and restore his permissions',
          definition:
            'The root user has complete access to the account and is the only one that can perform certain tasks on IAM’s official list.',
          explanation:
            'Restoring the permissions of the only IAM administrator is one of the tasks only the root user can do. It’s a good example of occasional, justified use.',
          correct: true,
        },
        {
          id: 'root-keys-script',
          label: 'Create access keys for the root user to automate these fixes',
          definition:
            'Long-term credentials for programmatic access tied to the identity with full access to the account.',
          explanation:
            'AWS explicitly advises against creating access keys for the root user. If they leak, someone would have full control of the café on AWS.',
          correct: false,
        },
      ],
    },
    {
      id: 'lost-secret',
      prompt:
        'Another detail: the script that syncs the rewards points uses an IAM user’s access keys, and the programmer lost the secret access key. How do we recover it?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'view-secret-console',
          label: 'View it again in the IAM console',
          definition:
            'Looking up in the console the details of an existing access key, such as its ID, status and last use.',
          explanation:
            'The secret access key can only be viewed when it’s created. Afterward the console shows the access key ID, but not the secret part.',
          correct: false,
        },
        {
          id: 'create-new-key',
          label: 'Create a new access key and delete the one that was lost',
          definition:
            'Generating another access key ID and secret access key pair for the same user; each user can have at most two.',
          explanation:
            'Since the secret key can only be seen when it’s created, you have to create another one and delete the lost one. Even better if the script switches to temporary credentials with a role.',
          correct: true,
        },
        {
          id: 'root-key-meanwhile',
          label: 'Use the root user’s access key in the meantime',
          definition:
            'Long-term credentials for programmatic access belonging to the identity that has full access to the account.',
          explanation:
            'You shouldn’t create access keys for the root user. Using them in a script would give full control of the account to anyone who sees them.',
          correct: false,
        },
        {
          id: 'reset-password',
          label: 'Reset the user’s console password',
          definition:
            'Changing the password an IAM user uses to sign in to the AWS console.',
          explanation:
            'The console password and access keys are different credentials. Changing it doesn’t recover or replace the secret key.',
          correct: false,
        },
      ],
    },
    {
      id: 'root-alerts',
      prompt:
        'To finish, I want to find out every time someone uses the root user, even if it’s me. Which services do I monitor it with?',
      topicSlug: 'root-user-and-credentials',
      examTasks: ['2.3'],
      options: [
        {
          id: 'cost-explorer',
          label: 'AWS Cost Explorer',
          definition:
            'A tool to visualize and analyze AWS costs and usage over time.',
          explanation:
            'Cost Explorer shows where the money goes, not who signs in or which identity performs each action.',
          correct: false,
        },
        {
          id: 'artifact',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports and manage agreements.',
          explanation:
            'Artifact provides AWS compliance evidence, but it doesn’t record the root user’s activity in the café’s account.',
          correct: false,
        },
        {
          id: 'inspector',
          label: 'Amazon Inspector',
          definition:
            'A service that scans workloads, such as EC2 instances and container images, for software vulnerabilities.',
          explanation:
            'Inspector looks for vulnerabilities in workloads. It doesn’t alert you when someone uses the root user.',
          correct: false,
        },
        {
          id: 'cloudtrail-eventbridge',
          label: 'AWS CloudTrail together with Amazon EventBridge',
          definition:
            'CloudTrail records the actions taken in the account as events; EventBridge reacts to events with rules that trigger actions.',
          explanation:
            'CloudTrail records the root user’s activity, such as its sign-ins, and EventBridge can trigger an alert when it appears. Monitoring its use is part of protecting it.',
          correct: true,
        },
      ],
    },
  ],
};
