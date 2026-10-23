import type { Mission } from '../../../../domain/Mission';

/**
 * Casa de Cambio Inca: the digital channels team in La Paz launches a customer app and connects its Windows cashiers to AWS.
 * Practices Amazon Cognito user pools and identity pools, MFA for customers and AWS Directory Service AD Connector.
 */
export const federatedIdentityAndCrossAccountAccess2: Mission = {
  id: 'federated-identity-and-cross-account-access-2',
  track: 'financial',
  topicSlug: 'federated-identity-and-cross-account-access',
  buildingId: 'exchange-house',
  title: 'Customers and cashiers with an identity',
  client: { name: 'Javier Quispe', role: 'Head of Digital Channels at Casa de Cambio Inca' },
  intro: [
    'Hi, thanks for coming. I’m Javier Quispe, head of digital channels at Casa de Cambio Inca. I work out of our branch in La Paz, Bolivia.',
    'We’re going to launch an app so customers can reserve foreign currency before coming to the counter. They have to sign up, sign in and upload a photo of their ID document.',
    'On top of that, our cashiers use Windows computers with the Active Directory we have here in the office, and the new cashier tool on AWS has to recognize them.',
    'An intern suggested creating an IAM user for each app customer. Something tells me that’s not a good idea. Will you help me choose well?',
  ],
  outro: {
    passed: [
      'Excellent. Customers sign up with Cognito, upload their document with temporary credentials and the cashiers sign in with the same Windows account as always.',
      'And nobody had to create thousands of IAM users. When you come to La Paz, I’ll exchange your dollars at the best rate in town.',
    ],
    failed: [
      'Hmm... with these answers the app wouldn’t be ready for launch.',
      'Review the theory on identities and come back. The counter is still open for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'customer-signup',
      prompt:
        'First, the customers. They need to sign up and sign in to the app, and many want to sign in with their Google account. What do we use?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'user-pool',
          label: 'An Amazon Cognito user pool',
          definition:
            'A user directory for sign-up and sign-in to web and mobile apps, which issues tokens and supports social identity providers.',
          explanation:
            'Cognito user pools are the directory for an app’s customers: they let people sign up, sign in and use social providers such as Google.',
          correct: true,
        },
        {
          id: 'iam-user-per-customer',
          label: 'One IAM user for each app customer',
          definition:
            'An IAM identity with long-term credentials inside the company’s AWS account.',
          explanation:
            'You don’t create IAM users for an app’s customers. IAM controls access to the AWS account, not end-user sign-in.',
          correct: false,
        },
        {
          id: 'identity-center-customers',
          label: 'AWS IAM Identity Center',
          definition:
            'A service for workforce access to multiple AWS accounts and applications, with an access portal.',
          explanation:
            'IAM Identity Center is for employees and contractors. For an app’s customers you use an end-user directory.',
          correct: false,
        },
        {
          id: 'cross-account-customers',
          label: 'A cross-account IAM role for each customer',
          definition:
            'A role with a trust policy that allows identities from another AWS account to assume it.',
          explanation:
            'Cross-account roles connect AWS accounts to each other. The app’s customers don’t have AWS accounts.',
          correct: false,
        },
      ],
    },
    {
      id: 'upload-document',
      prompt:
        'When booking, the customer uploads the photo of their document to Amazon S3 from the app. The app needs AWS credentials on behalf of that customer, without storing keys on the phone. Which component solves this?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'keys-in-app',
          label: 'An IAM user’s access keys embedded in the app',
          definition:
            'Long-term credentials for programmatic access, made up of an access key ID and a secret access key.',
          explanation:
            'Anyone who downloads the app could extract those keys. Credentials must not be stored in the code.',
          correct: false,
        },
        {
          id: 'directory-upload',
          label: 'AWS Managed Microsoft AD',
          definition:
            'An actual Active Directory managed by AWS, which can have a trust relationship with an on-premises AD.',
          explanation:
            'Managed Microsoft AD is for Windows users and computers, not for giving AWS credentials to the customers of a mobile app.',
          correct: false,
        },
        {
          id: 'identity-pool',
          label: 'An Amazon Cognito identity pool',
          definition:
            'A Cognito component that exchanges a trusted token for temporary AWS credentials to access services on the user’s behalf.',
          explanation:
            'Identity pools provide temporary AWS credentials so the app can access, for example, S3 on behalf of the signed-in customer.',
          correct: true,
        },
        {
          id: 'permission-set-customer',
          label: 'An IAM Identity Center permission set',
          definition:
            'A permissions template provisioned across several AWS accounts and assigned to workforce users or groups.',
          explanation:
            'Permission sets are for employees across several accounts, not for the customers of a mobile app.',
          correct: false,
        },
      ],
    },
    {
      id: 'cashiers-ad',
      prompt:
        'Now the cashiers. The cashier tool on AWS must validate their users against the Active Directory we already have in the office, without syncing directories or creating a new one. Which AWS Directory Service option do we choose?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'managed-ad',
          label: 'AWS Managed Microsoft AD',
          definition:
            'An actual Active Directory managed by AWS, which can have a trust relationship with an on-premises AD.',
          explanation:
            'Managed Microsoft AD creates a new directory in AWS. Javier doesn’t want another directory, just to use the one he has.',
          correct: false,
        },
        {
          id: 'simple-ad-cashiers',
          label: 'Simple AD',
          definition:
            'A directory compatible with basic Active Directory features, for small, low-cost use cases.',
          explanation:
            'Simple AD is also a new directory, independent of the office AD. The cashiers would have to have other accounts.',
          correct: false,
        },
        {
          id: 'cognito-cashiers',
          label: 'An Amazon Cognito user pool for the cashiers',
          definition:
            'A user directory for sign-up and sign-in to web and mobile applications.',
          explanation:
            'A user pool is yet another user directory, and it’s designed for an app’s customers. It doesn’t use the existing Active Directory.',
          correct: false,
        },
        {
          id: 'ad-connector',
          label: 'AD Connector',
          definition:
            'A proxy that redirects sign-in requests to an existing on-premises Active Directory, without syncing directories.',
          explanation:
            'AD Connector redirects sign-ins to the office AD, so the cashiers use the same Windows accounts as always without a new directory.',
          correct: true,
        },
      ],
    },
    {
      id: 'customer-mfa',
      prompt:
        'Finally, for security I want to require a second factor from the app’s customers when they sign in. Where do we enforce it?',
      topicSlug: 'federated-identity-and-cross-account-access',
      examTasks: ['2.3'],
      options: [
        {
          id: 'iam-password-policy-customers',
          label: 'In the IAM password policy',
          definition:
            'Account rules for IAM users’ passwords, such as minimum length, expiration and reuse.',
          explanation:
            'The password policy applies to IAM users, and the app’s customers aren’t IAM users. Besides, it doesn’t add a second factor.',
          correct: false,
        },
        {
          id: 'cognito-mfa',
          label: 'In the app’s Amazon Cognito user pool',
          definition:
            'A multi-factor authentication setting within the user directory of a web or mobile application.',
          explanation:
            'Cognito user pools support MFA, so the second factor is required right where customers sign in.',
          correct: true,
        },
        {
          id: 'root-mfa-customers',
          label: 'By enabling MFA on the account’s root user',
          definition:
            'Protecting with a second factor the identity created when the AWS account was opened, which has full access.',
          explanation:
            'Protecting the root user is important, but it doesn’t affect how the app’s customers sign in.',
          correct: false,
        },
        {
          id: 'identity-center-mfa',
          label: 'In AWS IAM Identity Center',
          definition:
            'A service for workforce access to multiple AWS accounts, which also lets you require MFA from its users.',
          explanation:
            'Identity Center requires MFA from employees who use its access portal, not from customers who sign in to the app.',
          correct: false,
        },
      ],
    },
  ],
};
