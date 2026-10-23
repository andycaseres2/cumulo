import type { Mission } from '../../../../domain/Mission';

/**
 * Ferretería El Tornillo: a family hardware store in Arequipa about to open its online shop on AWS with a fixed budget.
 * Practices AWS Pricing Calculator, the AWS Price List API, AWS Budgets actions and free account and billing support.
 */
export const costTools2: Mission = {
  id: 'cost-tools-2',
  track: 'market',
  topicSlug: 'cost-tools',
  buildingId: 'hardware-store',
  title: 'The spending toolbox',
  client: { name: 'Ernesto Paredes', role: 'Owner of Ferretería El Tornillo' },
  intro: [
    'Hello, hello. I’m Ernesto Paredes, owner of Ferretería El Tornillo. My grandfather opened this hardware store fifty years ago here in Arequipa, and now my daughter wants us to sell online.',
    'She’s going to set up the online shop on AWS, but I’m the one who signs the checks. And I know nothing about the cloud: I don’t know how much it will cost, or how to keep it from getting out of hand.',
    'We have a fixed budget for this year. If we go over it, there’s no online shop, and the competition down the block already sells online.',
    'They told me AWS has its own tools for costs, just like I have one for every screw. Will you help me pick the right one for each job?',
  ],
  outro: {
    passed: [
      'Now that’s having the right tool for every job! I have the estimate for the bank, up-to-date prices, a brake if we go over and I know whom to ask about the bill.',
      'My grandfather would be proud: the hardware store goes online with its books in order. Thank you: whenever you need a screw, you have a lifetime discount here.',
    ],
    failed: [
      'Hmm... I feel like we’re using a hammer to tighten nuts. With these decisions I don’t dare sign.',
      'Review the theory on cost tools and come back whenever you like. The hardware store is open Monday through Saturday.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'estimate-before',
      prompt:
        'First things first: the bank is asking me for an estimate of how much the online shop will cost each month, and we haven’t created anything on AWS yet. I need to put it together and send it to my accountant as a PDF. What do we use?',
      topicSlug: 'cost-tools',
      examTasks: ['4.2'],
      options: [
        {
          id: 'pricing-calculator',
          label: 'AWS Pricing Calculator',
          definition:
            'A free web tool to create cost estimates for AWS services, which you can share by link or export as CSV or PDF.',
          explanation:
            'It’s for modeling the solution before building it, it requires no prior AWS experience and it lets you export the estimate as a PDF. It’s an estimate: it doesn’t include taxes and only considers the data you enter.',
          correct: true,
        },
        {
          id: 'cost-explorer-estimate',
          label: 'AWS Cost Explorer',
          definition:
            'A tool to view and analyze an account’s costs and usage, with up to 13 months of history and a forecast for the next 18 months.',
          explanation:
            'Cost Explorer analyzes and forecasts based on spending that already exists. The hardware store hasn’t created anything yet, so there’s no data to analyze.',
          correct: false,
        },
        {
          id: 'budgets-estimate',
          label: 'AWS Budgets',
          definition:
            'A service to track cost and usage with budgets, alerts and actions when approaching or exceeding a threshold.',
          explanation:
            'Budgets watches spending once it exists and alerts you as you near the limit, but it doesn’t build the estimate for an architecture that doesn’t exist yet.',
          correct: false,
        },
        {
          id: 'support-center-estimate',
          label: 'A case in AWS Support Center',
          definition:
            'The channel for opening support cases with AWS, including account and billing cases.',
          explanation:
            'Billing support answers questions about the account and the bill; the estimate for a new architecture is built with the estimation tool.',
          correct: false,
        },
      ],
    },
    {
      id: 'programmatic-prices',
      prompt:
        'My daughter wants the shop’s inventory system to automatically look up the published prices of AWS services, by service and by Region, to update its calculations. Where does it get them from?',
      topicSlug: 'cost-tools',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-api',
          label: 'The AWS Cost Explorer API',
          definition:
            'Programmatic access to the account’s own cost and usage data, with a charge for each request.',
          explanation:
            'It returns what the account has already spent, not the published prices of each service by Region, and every request has a cost.',
          correct: false,
        },
        {
          id: 'budgets-prices',
          label: 'AWS Budgets alerts',
          definition:
            'Notifications by email or Amazon SNS when actual or forecasted spending approaches or exceeds a threshold.',
          explanation:
            'Alerts warn you about the account’s spending against a budget; they don’t provide price lists for services.',
          correct: false,
        },
        {
          id: 'price-list-api',
          label: 'AWS Price List API',
          definition:
            'An API to query AWS prices programmatically, with a Query API per product and a Bulk API with JSON or CSV files per service and Region.',
          explanation:
            'It’s the programmatic source of prices: the system can query by product or download the files per service and Region. The Pricing Calculator itself gets its prices from there.',
          correct: true,
        },
        {
          id: 'knowledge-center-prices',
          label: 'AWS Knowledge Center articles',
          definition:
            'A collection of articles on AWS re:Post with answers to frequent questions, including billing ones.',
          explanation:
            'It helps resolve common questions, but it isn’t a price source that a system can query automatically by service and Region.',
          correct: false,
        },
      ],
    },
    {
      id: 'budget-brake',
      prompt:
        'Now my biggest fear. This year’s budget is fixed. I want an email alert when forecasted spending is going to go over and, if we hit the limit, for a rule to kick in that prevents creating more servers. Which tool does that?',
      topicSlug: 'cost-tools',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-forecast',
          label: 'The AWS Cost Explorer forecast',
          definition:
            'An estimate of how much you are likely to spend over the next 18 months, based on the account’s usage.',
          explanation:
            'The forecast shows where spending is headed, but it doesn’t send alerts or apply any rule when a threshold is exceeded.',
          correct: false,
        },
        {
          id: 'calculator-brake',
          label: 'An estimate in AWS Pricing Calculator with the budget amount',
          definition:
            'A cost estimate for an architecture, built from the data you enter, which you can save and share.',
          explanation:
            'The estimate is for planning before building; it doesn’t watch actual spending or act when a limit is reached.',
          correct: false,
        },
        {
          id: 'billing-page-brake',
          label: 'Check the console’s Bills page by hand at the end of every month',
          definition:
            'The Billing and Cost Management console page that shows the detail of monthly charges.',
          explanation:
            'It would show charges after they happened, with no alerts on forecasted spending and no automatic rule to stop servers from being created.',
          correct: false,
        },
        {
          id: 'budgets-actions',
          label: 'AWS Budgets with forecasted spending alerts and a budget action',
          definition:
            'Cost budgets with alerts on actual or forecasted spending by email or Amazon SNS, and configurable actions such as applying an IAM policy.',
          explanation:
            'Budgets warns you before the spending happens if the alert is based on the forecast, and the budget action can apply an IAM policy that prevents creating more resources. By default it only notifies: you configure the action.',
          correct: true,
        },
      ],
    },
    {
      id: 'billing-question',
      prompt:
        'One last thing: the first bill has a charge I don’t recognize. We only have the Basic Support plan, and the accountant says you have to pay for a support plan to talk to AWS. What do we do?',
      topicSlug: 'cost-tools',
      examTasks: ['4.2'],
      options: [
        {
          id: 'buy-paid-support',
          label: 'Sign up for a paid support plan first and then ask',
          definition:
            'AWS support plans that are paid separately and include personalized technical support.',
          explanation:
            'Account and billing support is free for all account holders, even with Basic Support. Only personalized technical support requires a paid plan.',
          correct: false,
        },
        {
          id: 'billing-case',
          label: 'Open an Account and billing support case in AWS Support Center',
          definition:
            'The account and billing support channel available to all account holders, with responses by web or phone.',
          explanation:
            'Billing questions get free support even with Basic Support: you open an Account and billing support case in AWS Support Center and request a response by web or phone.',
          correct: true,
        },
        {
          id: 'new-estimate',
          label: 'Create a new estimate in AWS Pricing Calculator so AWS corrects the bill',
          definition:
            'A web tool to estimate the cost of AWS services based on the data you enter.',
          explanation:
            'An estimate doesn’t change or dispute the actual bill. To ask about a specific charge you have to contact billing support.',
          correct: false,
        },
        {
          id: 'wait-for-budgets',
          label: 'Wait for AWS Budgets to detect the charge and cancel it',
          definition:
            'A budgeting service that sends alerts and runs configured actions when cost or usage reaches a threshold.',
          explanation:
            'Budgets alerts you and runs the actions you configure, but it doesn’t review or cancel charges on the bill.',
          correct: false,
        },
      ],
    },
  ],
};
