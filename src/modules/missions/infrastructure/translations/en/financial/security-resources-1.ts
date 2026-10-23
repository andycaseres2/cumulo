import type { Mission } from '../../../../domain/Mission';

/**
 * Cooperativa San Martín: a savings cooperative in Mendoza with a small IT team and no security specialist.
 * Practices AWS Marketplace (third-party security products, BYOL), the AWS Knowledge Center and AWS Artifact.
 */
export const securityResources1: Mission = {
  id: 'security-resources-1',
  track: 'financial',
  topicSlug: 'security-resources',
  buildingId: 'credit-union',
  title: 'Where to look for help',
  client: { name: 'Valeria Godoy', role: 'Head of IT at Cooperativa San Martín' },
  intro: [
    'Hi, I’m glad you came. I’m Valeria Godoy, head of IT at Cooperativa San Martín, in Mendoza. We keep the savings of thousands of growers in the area.',
    'We just migrated to AWS. There are three of us in IT and none of us is a security specialist, so every question costs us days.',
    'Now I have four things pending: the firewall we use in the data center, a license we already paid for, a bucket that stopped working and an auditor asking for AWS paperwork.',
    'The members’ assembly is in two weeks and I want to arrive with everything solved. I’m not asking you to do it for me, just to tell me where to look for each thing. Can you give me a hand?',
  ],
  outro: {
    passed: [
      'This changes my life: our usual firewall from AWS Marketplace with our own license, the Knowledge Center for common problems and AWS Artifact for the auditor.',
      'I no longer feel like we’re alone with security. Thank you: at the assembly I’ll be able to look the members in the eye.',
    ],
    failed: [
      'Hmm... with these answers I’d keep looking in the wrong place. I still get lost among so many resources.',
      'Review the theory on security resources and come back whenever you like. I’ll be waiting with some mate.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'vendor-firewall',
      prompt:
        'In the data center we use a next-generation firewall from a well-known vendor, and the team already knows how to manage it. We want to deploy the same product on AWS and have the charge show up on our AWS bill. Where do we look for it?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'artifact-firewall',
          label: 'AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports, such as SOC, ISO or PCI, and manage agreements.',
          explanation:
            'Artifact provides AWS compliance reports. It doesn’t sell or deploy third-party software.',
          correct: false,
        },
        {
          id: 'knowledge-center-firewall',
          label: 'AWS Knowledge Center',
          definition:
            'A collection of articles on AWS re:Post with customers’ most frequent questions and their step-by-step solutions.',
          explanation:
            'The Knowledge Center helps solve specific problems. It doesn’t let you buy or deploy the vendor’s firewall.',
          correct: false,
        },
        {
          id: 'marketplace',
          label: 'AWS Marketplace',
          definition:
            'A curated digital catalog where you find, buy, deploy and manage third-party software, data and services.',
          explanation:
            'AWS Marketplace includes security products from well-known vendors, and their charges appear on the AWS bill. It’s the typical "I want the same firewall I already use, on AWS" scenario.',
          correct: true,
        },
        {
          id: 'security-blog-firewall',
          label: 'AWS Security Blog',
          definition:
            'An AWS blog with technical guides, news and best practices on identity, threat detection and cryptography.',
          explanation:
            'The Security Blog is for learning and keeping up with news. It isn’t a place to buy or deploy a vendor’s product.',
          correct: false,
        },
      ],
    },
    {
      id: 'own-license',
      prompt:
        'Good news: last year we already paid for a three-year license for that firewall. We want to use that same license with the product deployed on AWS from Marketplace. Which pricing model applies to us?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'hourly',
          label: 'Hourly',
          definition:
            'An AWS Marketplace pricing model that charges for software based on the hours it’s used.',
          explanation:
            'With the hourly model the cooperative would pay for the software again, instead of using the license it already has.',
          correct: false,
        },
        {
          id: 'free-trial',
          label: 'Free trial',
          definition:
            'An AWS Marketplace model that lets you evaluate a product for a period of time before paying for it.',
          explanation:
            'A trial is for evaluating a product for a while. It isn’t about reusing a license that’s already paid for.',
          correct: false,
        },
        {
          id: 'annual',
          label: 'Annual',
          definition:
            'An AWS Marketplace pricing model that purchases the product through a one-year subscription.',
          explanation:
            'An annual subscription would be a new purchase. The cooperative already has a valid license it wants to use.',
          correct: false,
        },
        {
          id: 'byol',
          label: 'Bring your own license (BYOL)',
          definition:
            'An AWS Marketplace model in which the customer uses a license it already owns with the product deployed on AWS.',
          explanation:
            'BYOL lets the cooperative use the license it already paid for with the firewall deployed from AWS Marketplace.',
          correct: true,
        },
      ],
    },
    {
      id: 'blocked-bucket',
      prompt:
        'Now the thing that has us stuck: one of the team wrote an Amazon S3 bucket policy and now nobody can access the bucket, not even us. Surely this has happened to others. Where do we find a step-by-step solution?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'knowledge-center',
          label: 'AWS Knowledge Center (on AWS re:Post)',
          definition:
            'A section of AWS re:Post that gathers articles with customers’ frequent questions and their step-by-step solutions.',
          explanation:
            'The Knowledge Center collects frequent problems with their solutions, for example how to fix an S3 bucket policy that blocks all access.',
          correct: true,
        },
        {
          id: 'marketplace-bucket',
          label: 'AWS Marketplace',
          definition:
            'A catalog of third-party software, data and services that you can buy and deploy on AWS.',
          explanation:
            'AWS Marketplace sells third-party products. It doesn’t offer articles with solutions to frequent problems like a badly written bucket policy.',
          correct: false,
        },
        {
          id: 'artifact-bucket',
          label: 'AWS Artifact',
          definition:
            'A service that provides access to AWS compliance reports and agreements with AWS.',
          explanation:
            'Artifact provides reports such as SOC or ISO. It doesn’t explain how to fix a bucket policy.',
          correct: false,
        },
        {
          id: 'trust-safety-bucket',
          label: 'AWS Trust & Safety Center',
          definition:
            'A center on AWS re:Post that explains how to report abuse involving AWS resources and what uses are prohibited.',
          explanation:
            'The Trust & Safety Center handles abuse reports. It doesn’t help configure or fix a bucket policy.',
          correct: false,
        },
      ],
    },
    {
      id: 'auditor-report',
      prompt:
        'Last item. The auditor from the agency that regulates cooperatives is asking for AWS’s SOC report to review our cloud provider’s controls. Where do we download it?',
      topicSlug: 'security-resources',
      examTasks: ['2.4'],
      options: [
        {
          id: 'security-blog-soc',
          label: 'On the AWS Security Blog',
          definition:
            'An AWS publication with articles, news and hands-on examples from security specialists.',
          explanation:
            'The Security Blog publishes guides and news. Looking for SOC reports there is a classic exam trap.',
          correct: false,
        },
        {
          id: 'artifact-soc',
          label: 'In AWS Artifact',
          definition:
            'A self-service portal to download AWS compliance reports, such as SOC, ISO or PCI.',
          explanation:
            'AWS Artifact provides access to AWS compliance reports, such as the SOC report the auditor is asking for.',
          correct: true,
        },
        {
          id: 'knowledge-center-soc',
          label: 'In the AWS Knowledge Center',
          definition:
            'AWS re:Post articles that answer customers’ frequent questions with step-by-step solutions.',
          explanation:
            'The Knowledge Center solves frequent technical problems. AWS SOC reports are downloaded from AWS Artifact.',
          correct: false,
        },
        {
          id: 'marketplace-soc',
          label: 'In AWS Marketplace',
          definition:
            'A curated catalog of third-party products whose charges appear on the AWS bill.',
          explanation:
            'AWS Marketplace sells third-party software. It isn’t where AWS publishes its own compliance reports.',
          correct: false,
        },
      ],
    },
  ],
};
