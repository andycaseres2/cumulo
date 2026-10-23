import type { Mission } from '../../../../domain/Mission';

/**
 * Bolsa de Valores Andina: a stock exchange in Santiago de Chile whose trading platform, tests and analytics share one AWS account.
 * Practices why to use several accounts, AWS Organizations with OUs, how SCPs limit permissions and sharing subnets with AWS RAM.
 */
export const multiAccountGovernance1: Mission = {
  id: 'multi-account-governance-1',
  track: 'financial',
  buildingId: 'stock-exchange',
  topicSlug: 'multi-account-governance',
  title: 'Divide to govern',
  client: { name: 'Daniela Fuentes', role: 'Director of Cloud Architecture at Bolsa de Valores Andina' },
  intro: [
    'Welcome to the Bolsa de Valores Andina. I’m Daniela Fuentes, director of cloud architecture. From Santiago we run the platform where shares of hundreds of companies are traded.',
    'It all started in a single AWS account: the trading platform, the developers’ test environments and the market data analytics. It was convenient, until it wasn’t.',
    'Last week, a test mistakenly deleted a configuration that production was using, and trading stopped for several minutes. The board is furious, and regulators don’t forgive scares like that.',
    'I need to separate and govern our accounts without losing control. Will you help me put the house in order?',
  ],
  outro: {
    passed: [
      'Excellent. Production lives in its own account, the accounts are grouped into OUs with guardrails nobody can skip, and the network is shared without duplicating it.',
      'The board can breathe easy now. Thank you: at the Exchange we know how to recognize a good investment.',
    ],
    failed: [
      'Hmm... with these decisions I think the next production scare is only a matter of time.',
      'Review the theory on multi-account governance and come back whenever you like. The opening bell will still be waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'why-accounts',
      prompt:
        'First, the board’s question: how do we keep a mistake in testing from taking down the trading platform again?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'more-iam-users',
          label: 'Create more IAM users within the same account, one per developer',
          definition:
            'Individual identities within a single AWS account, which share its resources, quotas and billing.',
          explanation:
            'Identifying each person is good, but everything would still be in the same account: a mistake in testing could still reach production resources.',
          correct: false,
        },
        {
          id: 'separate-accounts',
          label: 'Separate production, development and analytics into different AWS accounts',
          definition:
            'Using multiple accounts as boundaries for permissions, security, costs and workloads.',
          explanation:
            'The account is a natural boundary: separating environments allows stricter controls in production and limits the impact of a mistake to a single account.',
          correct: true,
        },
        {
          id: 'tags-only',
          label: 'Tag the production resources to tell them apart',
          definition:
            'Key-value pairs assigned to resources to identify and organize them.',
          explanation:
            'Tags help identify resources, but on their own they don’t isolate production from testing within the same account.',
          correct: false,
        },
        {
          id: 'one-bigger-account',
          label: 'Keep a single account and ask the developers to be more careful',
          definition:
            'The strategy of keeping all workloads together, relying on the team’s discipline.',
          explanation:
            'That’s what already failed. Without separation, any mistake in testing still has the potential to affect production.',
          correct: false,
        },
      ],
    },
    {
      id: 'central-governance',
      prompt:
        'We now have five new accounts, and more are coming. I want to group them into "Production," "Development" and "Analytics," and apply policies to each group from a single place. Which service do we use?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'ram-groups',
          label: 'AWS Resource Access Manager (AWS RAM)',
          definition:
            'A service to securely share resources across accounts, with an organization, with OUs or with specific accounts.',
          explanation:
            'RAM is for sharing resources between accounts, not for grouping them or applying policies to them centrally.',
          correct: false,
        },
        {
          id: 'iam-groups',
          label: 'IAM groups',
          definition:
            'Collections of IAM users within an account that receive the same permissions together.',
          explanation:
            'IAM groups live inside a single account and group users, not accounts.',
          correct: false,
        },
        {
          id: 'config-groups',
          label: 'AWS Config',
          definition:
            'A service that keeps an inventory of resources, their configuration history and rules to evaluate whether they comply with what you define.',
          explanation:
            'Config evaluates the configuration of resources, but it doesn’t group accounts into a hierarchy or manage organization policies.',
          correct: false,
        },
        {
          id: 'organizations-ous',
          label: 'AWS Organizations, with organizational units (OUs)',
          definition:
            'A service to centrally manage and govern multiple accounts, grouped into OUs within a hierarchy.',
          explanation:
            'Organizations groups the accounts into OUs such as "Production" or "Development," and the policies applied to an OU are inherited downward.',
          correct: true,
        },
      ],
    },
    {
      id: 'scp-region',
      prompt:
        'We applied an SCP to the "Production" OU that denies using Regions outside the approved ones. An administrator in a production account, with AdministratorAccess, wants to launch servers in another Region. What happens?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'admin-wins',
          label: 'They can, because AdministratorAccess ranks above any SCP',
          definition:
            'The idea that an IAM policy with full permissions overrides the organization’s policies.',
          explanation:
            'The SCP sets the maximum permissions of the member account. Even if IAM says AdministratorAccess, whatever the SCP denies is off-limits.',
          correct: false,
        },
        {
          id: 'scp-intersection',
          label: 'They can’t: the effective permission is the intersection of the SCP and their IAM policy',
          definition:
            'SCPs are guardrails that set the maximum permissions for the users and roles in member accounts.',
          explanation:
            'Their IAM policy allows everything, but the SCP denies those Regions. What’s effective is what both allow, so they can’t launch servers there.',
          correct: true,
        },
        {
          id: 'scp-grants',
          label: 'They can, and the SCP also gives them permissions in the approved Regions even without IAM policies',
          definition:
            'The idea that an organization policy grants permissions directly to identities.',
          explanation:
            'An SCP doesn’t grant permissions: it only limits them. Permissions still come from IAM policies.',
          correct: false,
        },
        {
          id: 'only-root-bypasses',
          label: 'Only the root user of that production account could bypass the SCP',
          definition:
            'The assumption that a member account’s root user is outside the organization’s policies.',
          explanation:
            'SCPs affect every identity in member accounts, including their root user.',
          correct: false,
        },
      ],
    },
    {
      id: 'share-subnets',
      prompt:
        'Last topic: the networking team created the Amazon VPC subnets in a central account. The trading and analytics accounts need to use them without us copying the network into each one. How do we do it?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'copy-subnets',
          label: 'Create identical subnets in each account',
          definition:
            'The strategy of duplicating the same network resources in every account that needs them.',
          explanation:
            'Duplicating the network in each account is exactly what they want to avoid: more work and more configurations to keep aligned.',
          correct: false,
        },
        {
          id: 'scp-share',
          label: 'An SCP that allows the other accounts to use the subnets',
          definition:
            'A service control policy that sets the maximum permissions available in member accounts.',
          explanation:
            'An SCP only limits permissions; it doesn’t share resources between accounts.',
          correct: false,
        },
        {
          id: 'ram-subnets',
          label: 'Share the subnets with AWS Resource Access Manager (AWS RAM)',
          definition:
            'A service to securely share resources across accounts, with an organization, with OUs or with specific accounts.',
          explanation:
            'With RAM the networking account creates the subnets once and shares them; the other accounts use them, and the central account keeps ownership.',
          correct: true,
        },
        {
          id: 'identity-center-share',
          label: 'AWS IAM Identity Center',
          definition:
            'A service to give people access to multiple accounts and applications with a single sign-in.',
          explanation:
            'Identity Center manages people’s access to accounts; it doesn’t share network resources between accounts.',
          correct: false,
        },
      ],
    },
  ],
};
