import type { Mission } from '../../../../domain/Mission';

/**
 * Fintech PagoYa: a payments startup in Buenos Aires whose employees juggle duplicated IAM users across several AWS accounts.
 * Practices AWS IAM Identity Center, permission sets, cross-account roles and the temporary credentials of federation.
 */
export const federatedIdentityAndCrossAccountAccess1: Mission = {
  id: 'federated-identity-and-cross-account-access-1',
  track: 'financial',
  topicSlug: 'federated-identity-and-cross-account-access',
  buildingId: 'fintech',
  title: 'One sign-in for PagoYa',
  client: { name: 'Valentina Ruiz', role: 'Platform Lead at Fintech PagoYa' },
  intro: [
    'Hi! I’m Valentina Ruiz, platform lead at PagoYa. From this office in Buenos Aires we process QR code payments for thousands of merchants.',
    'We grew fast: today we have five AWS accounts, between development, testing, production and tooling. And eighty people who already sign in every morning to our corporate identity provider.',
    'The problem is that we create IAM users by hand in each account. Some people have five passwords, and when someone leaves, we always forget to delete one of their accounts.',
    'The central bank is asking us to prove that we control access, and we can’t like this. Will you help me organize PagoYa’s identities?',
  ],
  outro: {
    passed: [
      'Perfect. Now each person signs in with their corporate identity to the accounts they should have, and when someone leaves, we offboard them in a single place.',
      'And the pipeline deploys to production without stored keys. Thank you: at PagoYa your next payment is commission-free.',
    ],
    failed: [
      'Hmm... with these answers we’d keep handing out users and passwords across every account.',
      'Review the theory on federation and cross-account access, and come back. The team is waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'workforce-access',
      prompt:
        'First, the people. I want our eighty employees to sign in to the five AWS accounts with the corporate identity they already use, from a single portal. Which service do we use?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'cognito-workforce',
          label: 'Amazon Cognito',
          definition:
            'An identity platform for web and mobile applications, with user directories and credentials for end users.',
          explanation:
            'Cognito is for an application’s customers. For employees to sign in to several AWS accounts, you use a different service.',
          correct: false,
        },
        {
          id: 'identity-center',
          label: 'AWS IAM Identity Center',
          definition:
            'A service for workforce access to multiple AWS accounts and applications, with an access portal and short-term credentials.',
          explanation:
            'IAM Identity Center is the recommended solution for employees across several accounts. It can connect the corporate identity provider with SAML 2.0, and each person sees their accounts in the access portal.',
          correct: true,
        },
        {
          id: 'iam-users-each',
          label: 'One IAM user per person in each account, with stronger passwords',
          definition:
            'IAM identities created separately in each account, each with its own long-term credentials.',
          explanation:
            'That’s exactly what they have today. Creating duplicate users in each account is the classic trap that centralized access avoids.',
          correct: false,
        },
        {
          id: 'simple-ad',
          label: 'Simple AD from AWS Directory Service',
          definition:
            'A directory compatible with basic Active Directory features, designed for small, low-cost use cases.',
          explanation:
            'Simple AD offers a basic directory, not a portal to access several AWS accounts with the identity people already use.',
          correct: false,
        },
      ],
    },
    {
      id: 'permission-templates',
      prompt:
        'Now the permissions. I want two templates, "read-only" and "developer," and to apply them across several accounts at once depending on the team. What is that called in the service we chose?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'inline-each',
          label: 'Inline policies inside each person',
          definition:
            'Policies that live inside a single identity, in a one-to-one relationship, and are deleted along with it.',
          explanation:
            'An inline policy isn’t a template: you’d have to repeat it in every identity and in every account.',
          correct: false,
        },
        {
          id: 'bucket-policies',
          label: 'Amazon S3 bucket policies',
          definition:
            'Resource-based policies attached to an S3 bucket that define who can access it.',
          explanation:
            'A bucket policy protects a specific bucket. It doesn’t work as a permissions template for people across several accounts.',
          correct: false,
        },
        {
          id: 'identity-pools',
          label: 'Amazon Cognito identity pools',
          definition:
            'A Cognito component that exchanges a trusted token for temporary AWS credentials for an app’s users.',
          explanation:
            'Identity pools give credentials to an application’s users, not permission templates for employees across several accounts.',
          correct: false,
        },
        {
          id: 'permission-sets',
          label: 'Permission sets',
          definition:
            'Permission templates that are provisioned across several accounts and assigned to users or groups, with an organization instance.',
          explanation:
            'IAM Identity Center permission sets are those templates. They require an organization instance of Identity Center and are assigned to each team’s groups.',
          correct: true,
        },
      ],
    },
    {
      id: 'pipeline-cross-account',
      prompt:
        'The deployment pipeline lives in the tooling account and has to deploy to the production account. Today it uses a production IAM user with access keys. How do we do this right?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'cross-account-role',
          label: 'A role in production that trusts the tooling account, assumed with sts:AssumeRole',
          definition:
            'A role whose trust policy names another account as a trusted entity, so that its identities can assume it and receive temporary credentials.',
          explanation:
            'A cross-account role avoids duplicate users and long-term keys. The pipeline assumes the role and, while using it, has only that role’s permissions.',
          correct: true,
        },
        {
          id: 'copy-keys',
          label: 'Copy the production user’s access keys to the tooling account',
          definition:
            'Moving long-term credentials from one account to another so a process can use them.',
          explanation:
            'They’re still long-term keys of a duplicate user. That’s what a cross-account role lets you avoid.',
          correct: false,
        },
        {
          id: 'cognito-pipeline',
          label: 'An Amazon Cognito user pool for the pipeline',
          definition:
            'A user directory for sign-up and sign-in to web and mobile applications.',
          explanation:
            'Cognito is for an application’s end users, not for giving a deployment process access across AWS accounts.',
          correct: false,
        },
        {
          id: 'nested-group',
          label: 'Put the tooling group inside the production group',
          definition:
            'Trying to make one IAM group contain another group in order to inherit its permissions.',
          explanation:
            'IAM groups can’t be nested, and they also belong to a single account. They don’t give access to another account.',
          correct: false,
        },
      ],
    },
    {
      id: 'federation-credentials',
      prompt:
        'One last question from the central bank’s auditor: when an employee signs in with their corporate identity, what kind of AWS credentials do they receive?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'permanent-keys',
          label: 'Permanent access keys generated for each employee',
          definition:
            'Long-term credentials for programmatic access, made up of an access key ID and a secret access key.',
          explanation:
            'This is a classic trap: federation doesn’t hand out permanent access keys.',
          correct: false,
        },
        {
          id: 'iam-user-created',
          label: 'An IAM user created automatically in each account',
          definition:
            'An IAM identity with its own long-term credentials inside an AWS account.',
          explanation:
            'The whole idea of federation is precisely not to create IAM users: AWS trusts the external identity provider.',
          correct: false,
        },
        {
          id: 'temporary-creds',
          label: 'Temporary, short-term credentials',
          definition:
            'Credentials that expire after a period of time and are obtained by authenticating or by assuming a role.',
          explanation:
            'Federation always delivers temporary credentials. The person authenticates with their identity provider and AWS gives them short-term access.',
          correct: true,
        },
        {
          id: 'root-shared',
          label: 'The root user credentials of each account',
          definition:
            'The root user is the identity created when the account is opened, with complete access to all services and resources.',
          explanation:
            'The root user isn’t shared or used day to day. Federation gives access with limited, temporary permissions.',
          correct: false,
        },
      ],
    },
  ],
};
