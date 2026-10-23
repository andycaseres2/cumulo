import type { Mission } from '../../../../domain/Mission';

/**
 * Café de la Bolsa: a coffee chain from Montevideo whose ordering app grows into a new AWS account per country.
 * Practices AWS Control Tower (landing zone, Account Factory, control types) and SCPs versus the management account.
 */
export const multiAccountGovernance2: Mission = {
  id: 'multi-account-governance-2',
  track: 'financial',
  buildingId: 'stock-cafe',
  topicSlug: 'multi-account-governance',
  title: 'One café, many accounts',
  client: { name: 'Lucía Paredes', role: 'Owner of Café de la Bolsa' },
  intro: [
    'Hi! Coffee? I’m Lucía Paredes, owner of Café de la Bolsa. We started with a shop across from the Montevideo stock exchange, and today we have cafés in Uruguay, Paraguay and Argentina.',
    'Our ordering and loyalty app runs on AWS. My digital team wants one AWS account per country and others for development, and next year we’re opening in more countries.',
    'The problem is that we’re a small team and nobody is an expert in building multi-account environments. I’m afraid each account will end up configured its own way, with open buckets and no control.',
    'If I get this wrong, our regular customers’ data ends up exposed. Will you help me set it up right from the start?',
  ],
  outro: {
    passed: [
      'What a relief. We have a landing zone ready, every new country gets its account already configured and the controls warn us if something breaks the rules.',
      'And now I understand why the management account is looked after separately. Thank you: your coffee is on the house, forever.',
    ],
    failed: [
      'Hmm... with these decisions I think each account will end up being a world of its own.',
      'Review the theory on multi-account governance over a good coffee and come back whenever you like. I’ll save you the window table.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'landing-zone',
      prompt:
        'We need a multi-account environment with security best practices ready in a short time, without designing it ourselves from scratch. Which service do we use?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'control-tower',
          label: 'AWS Control Tower',
          definition:
            'A service to set up and govern a multi-account environment with best practices, which orchestrates AWS Organizations, AWS Service Catalog and AWS IAM Identity Center.',
          explanation:
            'Control Tower creates a predefined landing zone with OUs, accounts and controls ready to go, exactly what a small team without experts needs.',
          correct: true,
        },
        {
          id: 'organizations-diy',
          label: 'AWS Organizations, designing the OUs ourselves and writing every SCP',
          definition:
            'The foundational service for grouping accounts and applying policies, whose structure and policies the customer designs.',
          explanation:
            'Organizations is the foundation, but the design is left to the team. When you’re asked for a ready-to-use landing zone with best practices, the answer is Control Tower.',
          correct: false,
        },
        {
          id: 'ram-landing',
          label: 'AWS Resource Access Manager (AWS RAM)',
          definition:
            'A service to securely share resources across accounts, such as Amazon VPC subnets.',
          explanation:
            'RAM shares resources between accounts, but it doesn’t build a multi-account environment with governance controls.',
          correct: false,
        },
        {
          id: 'artifact-landing',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports and manage agreements.',
          explanation:
            'Artifact provides AWS compliance documents; it doesn’t create or govern accounts.',
          correct: false,
        },
      ],
    },
    {
      id: 'new-country-account',
      prompt:
        'Every time we open in a new country, I want its account to be born already configured and approved, just like the others. Which part of Control Tower handles that?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'dashboard-account',
          label: 'The Control Tower dashboard',
          definition:
            'A panel that shows the accounts, the active controls and the noncompliant resources in the environment.',
          explanation:
            'The dashboard shows the state of the environment, but it doesn’t create new accounts.',
          correct: false,
        },
        {
          id: 'iam-user-per-country',
          label: 'A new IAM user in the management account for each country',
          definition:
            'An individual IAM identity within a single account, with its own credentials and permissions.',
          explanation:
            'An IAM user isn’t an account: the country would end up inside the management account, without isolation.',
          correct: false,
        },
        {
          id: 'ram-account',
          label: 'Share the Uruguay account with AWS RAM',
          definition:
            'A service to securely share resources across accounts without duplicating them.',
          explanation:
            'RAM shares resources between existing accounts; it doesn’t create new, preconfigured accounts.',
          correct: false,
        },
        {
          id: 'account-factory',
          label: 'Account Factory',
          definition:
            'A Control Tower template for creating new accounts that are already configured and approved.',
          explanation:
            'Account Factory creates each new account with the approved configuration, so every country starts out the same.',
          correct: true,
        },
      ],
    },
    {
      id: 'detective-control',
      prompt:
        'My team asks which type of Control Tower control warns us if some account already has a resource that breaks our rules, like a public bucket created earlier. Which one is it?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'preventive',
          label: 'A preventive control',
          definition:
            'A control that prevents certain actions from being performed in the accounts.',
          explanation:
            'A preventive control blocks actions, but it doesn’t look for resources that are already noncompliant.',
          correct: false,
        },
        {
          id: 'proactive',
          label: 'A proactive control',
          definition:
            'A control that checks resources before they are created.',
          explanation:
            'A proactive control acts before the resource is created. The public bucket already exists, so it wouldn’t detect it.',
          correct: false,
        },
        {
          id: 'detective',
          label: 'A detective control',
          definition:
            'A control that detects noncompliance in the resources of the accounts.',
          explanation:
            'Detective controls find resources that don’t comply, like a public bucket that was already created, and the dashboard shows them as noncompliant.',
          correct: true,
        },
        {
          id: 'artifact-report-control',
          label: 'A report downloaded from AWS Artifact',
          definition:
            'An AWS compliance document, such as a SOC or ISO report, downloaded on demand.',
          explanation:
            'Artifact reports cover AWS’s side; they don’t check the resources in the café’s accounts.',
          correct: false,
        },
      ],
    },
    {
      id: 'management-account',
      prompt:
        'We put an SCP on the organization root that denies deleting audit logs. My partner says that also protects the management account. Is he right?',
      topicSlug: 'multi-account-governance',
      examTasks: ['2.2'],
      options: [
        {
          id: 'inherits-from-root',
          label: 'Yes: the SCP is on the root and everything in the organization inherits it',
          definition:
            'The idea that a policy attached to the organization root applies to every account without exception.',
          explanation:
            'SCPs are inherited by member accounts, but they don’t affect the management account.',
          correct: false,
        },
        {
          id: 'scp-not-management',
          label: 'No: SCPs don’t restrict the management account, only member accounts',
          definition:
            'SCPs set the maximum permissions for the identities in an organization’s member accounts.',
          explanation:
            'The management account is outside the reach of SCPs, so you need to protect who gets into it and what they can do by other means.',
          correct: true,
        },
        {
          id: 'root-user-confusion',
          label: 'Yes, because "organization root" and "root user" are the same thing and the SCP controls it',
          definition:
            'The assumption that the organization’s top-level container and an account’s full-access identity are the same concept.',
          explanation:
            'They are different concepts: the root is the top-level container of the organization’s hierarchy. And the SCP still doesn’t affect the management account.',
          correct: false,
        },
        {
          id: 'only-root-users',
          label: 'No, because SCPs only apply to the root users of member accounts',
          definition:
            'The idea that organization policies affect only each account’s full-access identity.',
          explanation:
            'SCPs affect every identity in member accounts, including their root user, not just that user.',
          correct: false,
        },
      ],
    },
  ],
};
