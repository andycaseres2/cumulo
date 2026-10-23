import type { Mission } from '../../../../domain/Mission';

/**
 * Florería Primavera: a flower shop in Arequipa with three branches and an online store on AWS.
 * Practices AWS Marketplace, the ISV partner type in the AWS Partner Network,
 * Private Marketplace and license entitlements with AWS License Manager.
 */
export const technicalResourcesAndPartners2: Mission = {
  id: 'technical-resources-and-partners-2',
  track: 'market',
  topicSlug: 'technical-resources-and-partners',
  buildingId: 'flower-shop',
  title: 'A market for flowers and software',
  client: { name: 'Rosa Ccama', role: 'Owner of Florería Primavera' },
  intro: [
    'Hi, come in, careful with the roses. I’m Rosa Ccama, owner of Florería Primavera. We started with a stall in a market in Arequipa, and today we have three branches and an online store.',
    'The online store runs on AWS, and each branch has its own AWS account within our organization. For Mother’s Day we get more orders than in an entire quarter.',
    'Now we need software we don’t want to build ourselves: security for the store and an inventory system. But my branch managers buy things on their own and we’ve already paid twice for the same thing.',
    'I want to buy wisely, pay only once and know who uses what. Will you help me get things in order before Mother’s Day?',
  ],
  outro: {
    passed: [
      'What a relief. Now we buy software in one place, with the charges on our AWS bill, and my managers can only choose what I approved.',
      'And each branch uses the licenses it should, without paying twice. Thank you: this Mother’s Day, the only things overflowing will be the flowers.',
    ],
    failed: [
      'Oh no... with these decisions we’d keep buying blindly and overpaying.',
      'Review the theory on technical resources, partners and Marketplace, and come back. I’ll save you a bouquet for when you return.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'buy-software',
      prompt:
        'First, the security software for the store. We want a ready-made one from a specialized vendor, with the charge arriving on the same AWS bill. Where do we look for it?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'prescriptive-buy',
          label: 'AWS Prescriptive Guidance',
          definition:
            'Resources from AWS experts with planning and implementation guides and patterns with steps, architectures and code.',
          explanation:
            'Prescriptive Guidance helps plan migrations and modernizations, but it doesn’t sell third-party software.',
          correct: false,
        },
        {
          id: 'professional-services-buy',
          label: 'AWS Professional Services',
          definition:
            'An AWS team that helps design, build, migrate and manage workloads on AWS together with AWS Partners.',
          explanation:
            'Professional Services carries out projects such as migrations or modernization; it isn’t a catalog for buying ready-made software.',
          correct: false,
        },
        {
          id: 'marketplace',
          label: 'AWS Marketplace',
          definition:
            'A curated digital catalog with thousands of software, data and service products, in formats such as AMI and SaaS.',
          explanation:
            'AWS Marketplace sells third-party software, such as security products, and its charges appear on the AWS bill alongside the rest of your spending.',
          correct: true,
        },
        {
          id: 'knowledge-center-buy',
          label: 'AWS Knowledge Center',
          definition:
            'Official AWS articles, within AWS re:Post, with answers to the most frequent questions.',
          explanation:
            'The Knowledge Center answers common problems; it doesn’t offer software products to buy.',
          correct: false,
        },
      ],
    },
    {
      id: 'vendor-type',
      prompt:
        'The inventory system we liked is made by a company in Lima: it builds software that integrates with AWS and sells it in AWS Marketplace. Within the AWS Partner Network, what type of partner is it?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'isv',
          label: 'Independent Software Vendor (ISV)',
          definition:
            'An AWS Partner Network partner type that builds software that runs on AWS or integrates with AWS.',
          explanation:
            'The Lima company builds its own software integrated with AWS and sells it in Marketplace: that’s what defines an ISV.',
          correct: true,
        },
        {
          id: 'system-integrator',
          label: 'System integrator (SI)',
          definition:
            'An AWS Partner Network partner type that designs, migrates, implements or manages solutions on AWS for its customers.',
          explanation:
            'A system integrator implements and manages solutions for the customer; the Lima company is defined by building and selling its own software.',
          correct: false,
        },
        {
          id: 'solutions-architect-vendor',
          label: 'AWS solutions architect',
          definition:
            'An AWS technical advisor who helps customers and partners design architectures, for example with Well-Architected reviews.',
          explanation:
            'Solutions architects are AWS advisors, not a partner company that sells software.',
          correct: false,
        },
        {
          id: 'private-marketplace-vendor',
          label: 'Private Marketplace',
          definition:
            'An AWS Marketplace governance feature that creates a custom catalog of approved products.',
          explanation:
            'Private Marketplace is a feature for limiting the purchasing catalog; it isn’t an APN partner type.',
          correct: false,
        },
      ],
    },
    {
      id: 'approved-catalog',
      prompt:
        'Now my headache: the branch managers buy whatever they like in AWS Marketplace. I want them to be able to buy only the products I approve. What do I use?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'private-offers-catalog',
          label: 'AWS Marketplace private offers',
          definition:
            'An AWS Marketplace option for agreeing on custom pricing and terms with a seller.',
          explanation:
            'Private offers are for negotiating prices and terms with a seller; they don’t limit which products the managers can buy.',
          correct: false,
        },
        {
          id: 'license-manager-catalog',
          label: 'AWS License Manager',
          definition:
            'A service that distributes, activates and tracks purchased software licenses, even across accounts in an organization.',
          explanation:
            'AWS License Manager manages licenses that have already been bought; it doesn’t define which products can be bought.',
          correct: false,
        },
        {
          id: 'prescriptive-catalog',
          label: 'AWS Prescriptive Guidance',
          definition:
            'Guides and patterns from AWS experts for planning and implementing migrations and modernizations.',
          explanation:
            'Prescriptive Guidance offers technical guides; it doesn’t control the organization’s purchases.',
          correct: false,
        },
        {
          id: 'private-marketplace',
          label: 'Private Marketplace',
          definition:
            'An AWS Marketplace governance feature that creates a custom catalog for an organization’s users.',
          explanation:
            'Private Marketplace limits the catalog to the products Rosa approves, so the managers can only buy what’s authorized.',
          correct: true,
        },
      ],
    },
    {
      id: 'share-licenses',
      prompt:
        'Finally, we bought the inventory system licenses for all the branches in Marketplace. How do we distribute, activate and track them across each branch’s AWS account?',
      topicSlug: 'technical-resources-and-partners',
      examTasks: ['4.3'],
      options: [
        {
          id: 'private-marketplace-licenses',
          label: 'With Private Marketplace',
          definition:
            'A custom catalog of approved products within AWS Marketplace for an organization’s users.',
          explanation:
            'Private Marketplace defines which products can be bought; it doesn’t distribute or track licenses already bought.',
          correct: false,
        },
        {
          id: 'license-manager',
          label: 'With AWS License Manager',
          definition:
            'A service to manage software licenses and their usage rights (entitlements) within an organization.',
          explanation:
            'AWS Marketplace manages entitlements with AWS License Manager, which distributes, activates and tracks the purchased licenses across the organization’s accounts.',
          correct: true,
        },
        {
          id: 'byol-licenses',
          label: 'With the bring your own license (BYOL) option',
          definition:
            'An AWS Marketplace pricing model for using a software license you already own.',
          explanation:
            'BYOL is a payment option for using your own licenses; it doesn’t distribute or track licenses across the branches’ accounts.',
          correct: false,
        },
        {
          id: 'repost-licenses',
          label: 'With AWS re:Post',
          definition:
            'A cloud knowledge service with questions and answers from the community and experts.',
          explanation:
            'On AWS re:Post you can ask how to do it, but it doesn’t manage the flower shop’s licenses.',
          correct: false,
        },
      ],
    },
  ],
};
