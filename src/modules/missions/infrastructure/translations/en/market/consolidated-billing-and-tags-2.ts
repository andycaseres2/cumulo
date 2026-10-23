import type { Mission } from '../../../../domain/Mission';

/**
 * Agencia Creativa Llama: an advertising agency in Medellín that must bill each of its clients for the AWS resources of their campaigns.
 * Practices cost allocation tag activation, AWS-generated tags, tag best practices and the AWS Cost and Usage Report through AWS Data Exports.
 */
export const consolidatedBillingAndTags2: Mission = {
  id: 'consolidated-billing-and-tags-2',
  track: 'market',
  topicSlug: 'consolidated-billing-and-tags',
  buildingId: 'creative-agency',
  title: 'Every campaign with its tag',
  client: { name: 'Camila Restrepo', role: 'Chief Financial Officer at Agencia Creativa Llama' },
  intro: [
    'Hi! Welcome to Llama! I’m Camila Restrepo, the agency’s chief financial officer. We’re a team from Medellín that makes digital campaigns for brands all over Colombia.',
    'Every campaign needs its own infrastructure on AWS: sites, contests, videos. Everything lives in an AWS Organizations organization, and the consolidated bill arrives in full at the management account.',
    'The problem is that at the end of the month I have to charge each client for what their campaign spent, and I don’t know how to separate the costs. We tag the resources, but the tags don’t show up anywhere.',
    'If I undercharge, the agency loses money; if I overcharge, I lose the client. Will you help me make sure every peso is assigned to its campaign?',
  ],
  outro: {
    passed: [
      'Finally! The tags show up in the reports, I know who created each resource and I have each campaign’s hourly detail ready to query.',
      'This month every client gets a clear, fair invoice. Thank you: if you ever launch your own campaign, the agency will design it for you.',
    ],
    failed: [
      'Hmm... with these decisions I still can’t tell each client how much they spent. I can’t close the month like this.',
      'Review the theory on consolidated billing and tags and come back whenever you like. I’ll be waiting with a cup of coffee.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'activate-tags',
      prompt:
        'A week ago we put the "Client" tag with the brand’s name on every resource, and the teams did it from their own accounts. But in Cost Explorer we can’t group by that tag. What’s missing?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'activate-in-members',
          label: 'Each member account has to activate the tag from its own console',
          definition:
            'The idea that each account in an organization manages its own cost allocation tags.',
          explanation:
            'In an organization, only the management account has access to the cost allocation tags manager; member accounts can’t activate them.',
          correct: false,
        },
        {
          id: 'just-wait',
          label: 'Nothing: tags show up in Cost Explorer on their own over time',
          definition:
            'The idea that any tag placed on a resource is automatically included in cost reports.',
          explanation:
            'A tag doesn’t appear in Cost Explorer just because it exists: first it has to be activated as a cost allocation tag.',
          correct: false,
        },
        {
          id: 'activate-in-management',
          label: 'Activate "Client" as a cost allocation tag from the management account',
          definition:
            'Activating a user-defined tag in the Billing and Cost Management console so that AWS organizes costs by it.',
          explanation:
            'Tags must be activated as cost allocation tags, and in an organization the management account does that. They can take up to 24 hours to appear; after that you can filter and group by "Client."',
          correct: true,
        },
        {
          id: 'separate-bills',
          label: 'Remove the accounts from the organization so each one gets its own bill',
          definition:
            'The strategy of no longer using consolidated billing so that each account pays separately.',
          explanation:
            'You’d lose the single bill and the shared discounts, and the tags would still not be activated. The problem is solved by activating the tag.',
          correct: false,
        },
      ],
    },
    {
      id: 'who-created',
      prompt:
        'Another thing: resources nobody recognizes keep showing up. From now on I want to know who creates each resource, without depending on each person remembering to tag them by hand. Which tag helps us?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'aws-created-by',
          label: 'The AWS-generated aws:createdBy tag, activated as a cost allocation tag',
          definition:
            'A tag that AWS assigns to resources with the aws: prefix, indicating who created the resource.',
          explanation:
            'AWS assigns it, not people, and it indicates who created each resource. Like any cost allocation tag, it must be activated separately to see it in reports, and it only applies to resources created after activation.',
          correct: true,
        },
        {
          id: 'user-creator-tag',
          label: 'A user-defined "Creator" tag that each designer fills in when creating a resource',
          definition:
            'A key-value tag created by users themselves, which appears in reports with the user: prefix.',
          explanation:
            'It depends on each person remembering to add it, exactly what Camila wants to avoid. Untagged resources would remain a mystery.',
          correct: false,
        },
        {
          id: 'consolidated-creator',
          label: 'Consolidated billing, which already shows who created each resource',
          definition:
            'An AWS Organizations feature that combines the charges of all accounts into a single bill.',
          explanation:
            'Consolidated billing shows charges by account, not who created each resource within them.',
          correct: false,
        },
        {
          id: 'calculator-creator',
          label: 'One estimate per person in AWS Pricing Calculator',
          definition:
            'A tool to estimate the cost of AWS services before using them, based on the data you enter.',
          explanation:
            'An estimate plans future costs; it doesn’t tell you who created the resources that already exist.',
          correct: false,
        },
      ],
    },
    {
      id: 'tag-values',
      prompt:
        'A designer suggests tagging every resource with the email and phone number of each brand’s contact, "to have everything at hand." What do I tell him?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'more-tags-better',
          label: 'Yes: the more data the tags have, the better the reports will be',
          definition:
            'The idea that it’s worth storing all available information about the client in tags.',
          explanation:
            'Reports only need a value to group costs by. And it’s a best practice not to include sensitive information in tags.',
          correct: false,
        },
        {
          id: 'no-sensitive-data',
          label: 'No: tags shouldn’t contain sensitive information; a client code is enough',
          definition:
            'A tagging best practice: use values that identify the project or client without including personal or confidential data.',
          explanation:
            'A best practice is not to include sensitive information in tags. A code like "Client = brand-042" is enough to allocate costs without exposing contact details.',
          correct: true,
        },
        {
          id: 'aws-prefix',
          label: 'Yes, but with the aws: prefix so they’re protected',
          definition:
            'The prefix that identifies tags generated by AWS or by AWS Marketplace ISV sellers.',
          explanation:
            'The aws: prefix belongs to tags that AWS generates, not to the ones the agency creates, and it doesn’t make a tag a suitable place for sensitive data.',
          correct: false,
        },
        {
          id: 'only-management',
          label: 'Yes, as long as only the management account can see them',
          definition:
            'The idea that restricting who manages cost allocation tags makes them suitable for any data.',
          explanation:
            'The management account managing the cost allocation tags doesn’t change the best practice: you shouldn’t include sensitive information in them.',
          correct: false,
        },
      ],
    },
    {
      id: 'hourly-detail',
      prompt:
        'Last question: a big client demands their campaign’s detail by the hour and by resource, with the tags, and I want to query it with SQL in Amazon Athena. Where do I get that data?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-hourly',
          label: 'A screenshot from AWS Cost Explorer',
          definition:
            'A console tool to visualize and analyze costs and usage with filters and groupings.',
          explanation:
            'Cost Explorer is for visualizing and analyzing in the console; the most granular detail, such as files you can query with Athena, comes from the CUR.',
          correct: false,
        },
        {
          id: 'budgets-hourly',
          label: 'An AWS Budgets budget per client',
          definition:
            'Cost or usage budgets with alerts when spending approaches or exceeds a threshold.',
          explanation:
            'A budget watches spending and alerts you, but it doesn’t provide the hourly, per-resource detail of what was spent.',
          correct: false,
        },
        {
          id: 'member-invoices',
          label: 'The informational invoices of each member account',
          definition:
            'Invoices that show the charges of each member account within an organization, without that account paying them.',
          explanation:
            'They show charges by account, not the hourly, per-resource detail with tags that you could query with Athena.',
          correct: false,
        },
        {
          id: 'cur-data-exports',
          label: 'A CUR 2.0 export from AWS Data Exports to Amazon S3',
          definition:
            'The AWS Cost and Usage Report contains the most comprehensive set of cost and usage data; AWS Data Exports lets you create it in its CUR 2.0 format.',
          explanation:
            'The CUR breaks down costs by hour, day or month, by resource and by the activated tags, and it’s delivered to an S3 bucket you can query with Athena. CUR 2.0 in Data Exports is the recommended way today.',
          correct: true,
        },
      ],
    },
  ],
};
