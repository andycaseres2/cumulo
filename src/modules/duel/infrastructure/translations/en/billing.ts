import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const billingFamily: ServiceFamily = {
  id: 'billing',
  title: 'Costs, purchasing and support',
  summary:
    'Analyze and forecast spend, get alerts when crossing a threshold, export the fine-grained detail to S3, right-size resources, buy third-party software and choose how much help you need from AWS.',
  services: [
    { name: 'AWS Cost Explorer', summary: 'Cost charts going back up to 13 months and a forecast for the next 18 months.' },
    { name: 'AWS Budgets', summary: 'Alerts when cost, usage or Savings Plans coverage crosses a threshold, actual or forecasted.' },
    { name: 'AWS Cost and Usage Reports', summary: 'The most complete cost and usage detail, by hour or resource, delivered to your S3 bucket.' },
    { name: 'AWS Compute Optimizer', summary: 'Recommends the right size for EC2, EBS, Lambda and more based on actual usage, and flags idle resources.' },
    { name: 'AWS Marketplace', summary: 'Curated catalog of third-party software, data and services billed on your AWS bill.' },
    { name: 'AWS Support', summary: 'Support plans: free Basic, Business Support+, Enterprise with a TAM, and Unified Operations.' },
  ],
  cards: [
    {
      id: 'billing-1',
      prompt:
        'A nonprofit in Quito has a USD 500 monthly cap on AWS. It wants an email when the month’s spend is on track to exceed that amount, before it happens. Which service does it set up?',
      options: [
        {
          service: 'AWS Budgets',
          why: 'Budgets creates a cost budget and alerts by email or SNS when actual or forecasted spend exceeds the threshold.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer shows and forecasts spend in charts, but threshold alerts are set up in another service.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports delivers detailed files to S3; it does not send alerts when you approach a cap.',
        },
      ],
      answer: 'AWS Budgets',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-2',
      prompt:
        'The manager of a distributor in Barranquilla wants to see in charts how much was spent per service over the last six months and how much will likely be spent next quarter. What does he use?',
      options: [
        {
          service: 'AWS Budgets',
          why: 'Budgets watches a threshold and alerts; it is not the tool to explore past spend by service.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer shows up to 13 months of history filtered by service and forecasts spend for the next 18 months.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports gives raw files for you to process; it does not come with ready-made charts or a forecast.',
        },
      ],
      answer: 'AWS Cost Explorer',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-3',
      prompt:
        'The finance team at a bank in La Paz wants every billing line item, by hour and by resource, delivered to its own bucket to query it with Athena. Which service delivers it?',
      options: [
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer offers views and CSV downloads, but the most complete detail delivered to your bucket comes from another service.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets tracks amounts and alerts; it does not export every billing line item to S3.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports publishes the most complete cost dataset, by hour or resource, to your bucket and integrates with Athena.',
        },
      ],
      answer: 'AWS Cost and Usage Reports',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-4',
      prompt:
        'A marketing agency in Córdoba suspects its Lambda functions have too much memory and its EBS volumes are oversized. It wants recommendations based on actual usage. What does it use?',
      options: [
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer analyzes usage metrics and recommends the right size for Lambda, EBS, EC2 and other resources.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer shows how much you spend, but Lambda memory and EBS size recommendations come from another service.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets alerts when spend crosses a threshold; it does not tell you which resource to shrink.',
        },
      ],
      answer: 'AWS Compute Optimizer',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-5',
      prompt:
        'A hotel chain in Punta Cana wants to buy a firewall from a well-known vendor, deploy it in a few clicks as an AMI and pay for it on the same AWS bill. Where does it get it?',
      options: [
        {
          service: 'AWS Support',
          why: 'AWS Support provides technical and billing help; it does not sell software from other vendors.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer recommends resource sizes; it is not a software catalog.',
        },
        {
          service: 'AWS Marketplace',
          why: 'Marketplace is a curated catalog of third-party software, as AMIs or SaaS, billed on your AWS bill.',
        },
      ],
      answer: 'AWS Marketplace',
      topicSlug: 'technical-resources-and-partners',
    },
    {
      id: 'billing-6',
      prompt:
        'A fintech in Lima is taking its app to production. It wants to talk to AWS engineers at any hour by phone or chat, and get a response in under an hour if production goes down. What does it sign up for?',
      options: [
        {
          service: 'AWS Marketplace',
          why: 'Marketplace has third-party services, but 24/7 access to AWS engineers comes from somewhere else.',
        },
        {
          service: 'AWS Support',
          why: 'Business Support+, the recommended minimum for production, gives 24/7 access and a response in under an hour if production goes down.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets controls spend with alerts; it does not offer technical help.',
        },
      ],
      answer: 'AWS Support',
      topicSlug: 'support-plans',
    },
    {
      id: 'billing-7',
      prompt:
        'An institute in Bogotá lets its students practice in an AWS account. When it reaches 90% of the monthly amount, it wants a policy applied automatically that prevents creating more resources. What does it use?',
      options: [
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer analyzes spend; it does not run actions when a percentage is reached.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer recommends sizes; it does not react to spend with automatic actions.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets actions apply, for example, an IAM policy that denies creating resources when the threshold is crossed.',
        },
      ],
      answer: 'AWS Budgets',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-8',
      prompt:
        'A software company in Monterrey bought Savings Plans. It wants to be notified on the day its utilization drops below 80%, so it does not pay for commitment it does not use. Which service does this?',
      options: [
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports includes Savings Plans columns, but it does not notify you when utilization drops.',
        },
        {
          service: 'AWS Budgets',
          why: 'A Savings Plans utilization budget in Budgets notifies you when usage drops below the percentage you set.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer shows utilization reports, but the threshold notification is set up in another service.',
        },
      ],
      answer: 'AWS Budgets',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-9',
      prompt:
        'A construction company in Santa Cruz tags its resources with "project". It wants to see in the console, without writing any code, which project spent the most last quarter. Which tool does it open?',
      options: [
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer groups and filters spend by cost allocation tag and shows it in ready-made charts.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports also has the tags, but in files you would have to process with other tools.',
        },
        {
          service: 'AWS Budgets',
          why: 'Budgets can track a tag’s spend against an amount, but it is not for comparing projects over past periods.',
        },
      ],
      answer: 'AWS Cost Explorer',
      topicSlug: 'consolidated-billing-and-tags',
    },
    {
      id: 'billing-10',
      prompt:
        'The data team at a regional airline in Panama wants to build its own cost dashboard in Amazon Quick Sight with the most granular detail of its billing. Which service does it get the data from?',
      options: [
        {
          service: 'AWS Marketplace',
          why: 'Marketplace sells third-party software and data; it does not export your own billing.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer comes with its own charts, but the complete, granular dataset for your dashboards is another service.',
        },
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports delivers the most complete detail to S3 and can be prepared for Quick, Athena or Redshift.',
        },
      ],
      answer: 'AWS Cost and Usage Reports',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-11',
      prompt:
        'An education platform in Caracas runs ECS services on Fargate and Auto Scaling groups. It wants to know whether their CPU and memory are sized correctly based on the last 14 days of usage.',
      options: [
        {
          service: 'AWS Budgets',
          why: 'Budgets alerts on amounts and usage against a threshold; it does not analyze whether a resource is sized correctly.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer analyzes 14 days of metrics by default and recommends sizes for Fargate, Auto Scaling, EC2 and more.',
        },
        {
          service: 'AWS Marketplace',
          why: 'Marketplace is a catalog of third-party software; it does not review your resources.',
        },
        {
          service: 'AWS Cost Explorer',
          why: 'Cost Explorer shows how much those resources cost, but usage-based right-sizing analysis comes from another service.',
        },
      ],
      answer: 'AWS Compute Optimizer',
      topicSlug: 'cost-tools',
    },
    {
      id: 'billing-12',
      prompt:
        'A supermarket chain in Asunción negotiated a private offer with special pricing from a BI vendor. It wants to accept it on AWS and have the charge show up on its AWS bill. Where does it do this?',
      options: [
        {
          service: 'AWS Cost and Usage Reports',
          why: 'Cost and Usage Reports would show that charge afterward, but it is not where you buy or accept the offer.',
        },
        {
          service: 'AWS Marketplace',
          why: 'Marketplace lets you accept private offers with their own pricing and contract, and AWS bills you and pays the seller.',
        },
        {
          service: 'AWS Support',
          why: 'AWS Support does not sell third-party licenses; it provides technical and account help.',
        },
      ],
      answer: 'AWS Marketplace',
      topicSlug: 'technical-resources-and-partners',
    },
    {
      id: 'billing-13',
      prompt:
        'A bank in San Salvador runs critical workloads and wants a designated Technical Account Manager who knows its account, plus a response in under 15 minutes if a critical system goes down. What does it sign up for?',
      options: [
        {
          service: 'AWS Marketplace',
          why: 'Marketplace offers third-party software and services; it does not assign an AWS TAM.',
        },
        {
          service: 'AWS Compute Optimizer',
          why: 'Compute Optimizer gives automatic sizing recommendations; it is not help from people.',
        },
        {
          service: 'AWS Support',
          why: 'The AWS Support Enterprise plan includes a designated TAM and a response in under 15 minutes for critical outages.',
        },
      ],
      answer: 'AWS Support',
      topicSlug: 'support-plans',
    },
  ],
};
