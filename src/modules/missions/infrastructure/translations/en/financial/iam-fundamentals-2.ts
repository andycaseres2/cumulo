import type { Mission } from '../../../../domain/Mission';

/**
 * Ferreira & Olivera Auditores: an audit firm in Montevideo storing working papers in Amazon S3.
 * Practices IAM roles for workloads, customer managed policies, explicit and implicit deny, and last accessed information.
 */
export const iamFundamentals2: Mission = {
  id: 'iam-fundamentals-2',
  track: 'financial',
  topicSlug: 'iam-fundamentals',
  buildingId: 'audit-firm',
  title: 'Permissions under audit',
  client: { name: 'Lucía Ferreira', role: 'Technology Partner at Ferreira & Olivera Auditores' },
  intro: [
    'Come in, have a seat. I’m Lucía Ferreira, technology partner at Ferreira & Olivera Auditores. From these offices in Montevideo we audit banks and cooperatives all over Uruguay.',
    'We keep the working papers for each audit in Amazon S3, and an application on Amazon EC2 generates the final reports. Everything works, but the permissions grew without any order.',
    'The irony is that now a client wants to audit us. They’re going to review who can read, change or delete those papers, and today I couldn’t justify half the permissions.',
    'An audit firm with messy permissions loses clients very quickly. Will you help me get them in order?',
  ],
  outro: {
    passed: [
      'Excellent work. The application uses a role, the permissions are tailor-made and the archived papers can’t be deleted.',
      'For the first time I can explain every permission with a reason. If you ever want to change careers, this firm will always have room for someone so organized.',
    ],
    failed: [
      'Hmm... if the client reviews these permissions, our report is going to come back with several findings.',
      'Review the IAM theory calmly and come back. The working papers are waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ec2-app-access',
      prompt:
        'The reporting application on Amazon EC2 reads the working papers from S3. Today it does that with access keys stored in a configuration file on the server. What should it use?',
      topicSlug: 'iam-fundamentals',
      examTasks: ['2.3'],
      options: [
        {
          id: 'iam-user-keys',
          label: 'An IAM user dedicated to the app, with its own access keys',
          definition:
            'An IAM identity with long-term credentials, made up of an access key ID and a secret access key, for programmatic access.',
          explanation:
            'They would still be long-term credentials stored on the server. That’s exactly what you want to avoid for an application on EC2.',
          correct: false,
        },
        {
          id: 'instance-role',
          label: 'An IAM role assigned to the instance',
          definition:
            'An identity with permissions that whoever needs it assumes, and that provides temporary credentials per session, without long-term credentials.',
          explanation:
            'With a role assigned to the instance, the application gets temporary credentials to read from S3 without storing keys in any file.',
          correct: true,
        },
        {
          id: 'auditors-group',
          label: 'An IAM group called "applications" with read permissions',
          definition:
            'A collection of IAM users used to assign permissions to all of them at once; it has no credentials of its own.',
          explanation:
            'A group has no credentials the instance can use. It only serves to give permissions to IAM users.',
          correct: false,
        },
        {
          id: 'bucket-policy-group',
          label: 'A bucket policy that names that group as the Principal',
          definition:
            'A resource-based policy attached to an Amazon S3 bucket that defines who can access it.',
          explanation:
            'A group can’t be a Principal in a policy, because groups assign permissions and don’t authenticate. And the app would still have no credentials.',
          correct: false,
        },
      ],
    },
    {
      id: 'trim-readonly',
      prompt:
        'The junior auditors have the ReadOnlyAccess policy, managed by AWS. It gives them read access to every service, and they only need to read the papers in S3. How do we adjust it?',
      topicSlug: 'iam-fundamentals',
      examTasks: ['2.3'],
      options: [
        {
          id: 'edit-aws-managed',
          label: 'Edit ReadOnlyAccess in the console and remove the services that aren’t needed',
          definition:
            'AWS managed policies are created and maintained by AWS, and AWS updates them, for example, when it launches a new service.',
          explanation:
            'AWS managed policies can’t be edited. You need to create your own policy to trim permissions.',
          correct: false,
        },
        {
          id: 'add-power-user',
          label: 'Replace it with PowerUserAccess, which limits access to IAM',
          definition:
            'An AWS managed job function policy that gives full access to services, but limited access to IAM and AWS Organizations.',
          explanation:
            'PowerUserAccess gives far more permissions than read-only. It goes in the opposite direction from least privilege.',
          correct: false,
        },
        {
          id: 'inline-per-junior',
          label: 'Write a different inline policy inside each junior auditor',
          definition:
            'A policy that lives inside a single identity, in a one-to-one relationship, and is deleted along with it.',
          explanation:
            'An inline policy isn’t reusable: you’d have to repeat it in each auditor and maintain each copy separately.',
          correct: false,
        },
        {
          id: 'customer-managed',
          label: 'Copy it into a customer managed policy and keep only the S3 read access',
          definition:
            'A custom policy the customer writes for its exact case, which it can edit and attach to several identities.',
          explanation:
            'Best practice is to start from the AWS policy, copy it into a customer managed policy and trim it down. It’s reused across all the juniors and every change applies to all of them.',
          correct: true,
        },
      ],
    },
    {
      id: 'archive-delete',
      prompt:
        'The managers have a policy that allows all S3 actions, and we added another that explicitly denies deleting objects from the closed-audits bucket. If a manager tries to delete an archived paper, what happens?',
      topicSlug: 'iam-fundamentals',
      examTasks: ['2.3'],
      options: [
        {
          id: 'deny-wins',
          label: 'It’s denied, because an explicit deny wins over any Allow',
          definition:
            'An IAM policy evaluation rule: an explicit Deny overrides every Allow that applies to the same request.',
          explanation:
            'An explicit deny always wins. Even though the other policy allows all of S3, the manager can’t delete papers from the closed-audits bucket.',
          correct: true,
        },
        {
          id: 'allow-wins',
          label: 'It’s allowed, because the policy with more permissions takes priority',
          definition:
            'The idea that, when policies conflict, the one granting the broader permission applies.',
          explanation:
            'This is the classic exam trap: an Allow doesn’t override a Deny. The explicit deny is what decides.',
          correct: false,
        },
        {
          id: 'newest-wins',
          label: 'It’s allowed or not depending on which policy was attached last',
          definition:
            'The idea that the order in which policies are attached to an identity changes the result of the evaluation.',
          explanation:
            'Evaluation doesn’t depend on the order in which policies were attached. The explicit Deny decides the result.',
          correct: false,
        },
        {
          id: 'mfa-decides',
          label: 'It’s allowed if the manager signed in with MFA',
          definition:
            'Multi-factor authentication: a second factor, in addition to the password, for signing in.',
          explanation:
            'MFA protects sign-in, but it doesn’t override an explicit Deny. The deletion is denied with or without MFA.',
          correct: false,
        },
      ],
    },
    {
      id: 'unused-permissions',
      prompt:
        'Finally, the reporting application’s role has permissions on several services I suspect it never uses. How do I check before removing them?',
      topicSlug: 'iam-fundamentals',
      examTasks: ['2.3'],
      options: [
        {
          id: 'require-mfa-role',
          label: 'Require MFA to use the role',
          definition:
            'A condition that requires presenting a second authentication factor before using certain credentials.',
          explanation:
            'MFA strengthens authentication, but it doesn’t show which services the role does or doesn’t use.',
          correct: false,
        },
        {
          id: 'move-to-inline',
          label: 'Turn the role’s permissions into an inline policy',
          definition:
            'A change in how permissions are attached: from a reusable policy to one that lives inside a single identity.',
          explanation:
            'An inline policy changes how permissions are attached; it doesn’t report which ones are used.',
          correct: false,
        },
        {
          id: 'last-accessed',
          label: 'Review the IAM last accessed information',
          definition:
            'IAM data that shows when an identity last used the services it’s allowed to use and, for many of them, each action.',
          explanation:
            'Last accessed information shows which services and actions go unused, so you can remove them and apply least privilege with evidence.',
          correct: true,
        },
        {
          id: 'admin-access',
          label: 'Attach AdministratorAccess and see what breaks when you remove it',
          definition:
            'An AWS managed job function policy that gives full access, including IAM, designed for administrators.',
          explanation:
            'Giving full access "just in case" contradicts least privilege and doesn’t tell you which services the role actually uses.',
          correct: false,
        },
      ],
    },
  ],
};
