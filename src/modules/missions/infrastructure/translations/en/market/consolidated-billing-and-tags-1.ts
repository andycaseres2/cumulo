import type { Mission } from '../../../../domain/Mission';

/**
 * Panadería La Espiga: a bakery franchise in Rosario that receives one AWS bill per account and wants to bring them together.
 * Practices AWS Organizations consolidated billing, the management account, Free account plans joining an organization and shared Reserved Instance discounts.
 */
export const consolidatedBillingAndTags1: Mission = {
  id: 'consolidated-billing-and-tags-1',
  track: 'market',
  topicSlug: 'consolidated-billing-and-tags',
  buildingId: 'neighborhood-bakery',
  title: 'One bill for the whole batch',
  client: { name: 'Héctor Villalba', role: 'Owner of the Panadería La Espiga franchise' },
  intro: [
    'Come in, the croissants just came out of the oven! I’m Héctor Villalba, owner of La Espiga, a bakery franchise with eighteen shops in Rosario and the surrounding area.',
    'Over the years we kept opening separate AWS accounts: one for the online store, another for the delivery app, another for the shops’ system and one more for the developers to try things out.',
    'Now every month I get four different bills, the accountant adds them up by hand and I feel like we’re overpaying, as if we were four small customers instead of one medium-sized one.',
    'I want to sort this out before opening the shops in Santa Fe. They told me you know about AWS billing. Will you help me knead everything into a single bill, without losing the separation between the four accounts?',
  ],
  outro: {
    passed: [
      'What a relief! Now a single bill arrives, the usage of the four accounts adds up for discounts and nobody loses their credits or the savings from the reservations.',
      'The accountant no longer has to add things up by hand, and I can think about Santa Fe in peace. Thank you: at La Espiga there will always be a dozen croissants with your name on them.',
    ],
    failed: [
      'Hmm... with these decisions I think we’d still have scattered accounts and be overpaying.',
      'Review the theory on consolidated billing and come back whenever you like. La Espiga’s oven will be on and waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'one-bill',
      prompt:
        'Let’s start with what bothers me most: four accounts, four bills. I want a single bill and for the usage of all the accounts to add up so we reach the lower volume prices sooner, but without lumping everything into one account: each area has to stay separate. What do we use?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'cost-explorer-bill',
          label: 'AWS Cost Explorer',
          definition:
            'A tool to view and analyze costs and usage, with filters by service, account or tag, and forecasts.',
          explanation:
            'Cost Explorer helps analyze spending, but it doesn’t merge the bills or combine the usage of independent accounts for volume discounts.',
          correct: false,
        },
        {
          id: 'organizations-consolidated',
          label: 'AWS Organizations with consolidated billing',
          definition:
            'A service that groups several AWS accounts into a centrally managed organization, with a single bill for all of them.',
          explanation:
            'With consolidated billing, La Espiga gets a single bill and the usage of the four accounts is combined, which lets them share volume, Reserved Instance and Savings Plans discounts.',
          correct: true,
        },
        {
          id: 'tags-bill',
          label: 'Cost allocation tags on every resource',
          definition:
            'Key-value pairs activated in the billing console to organize costs by them.',
          explanation:
            'Tags help you know who spends what, but they don’t merge the bills of separate accounts or combine their usage for discounts.',
          correct: false,
        },
        {
          id: 'one-account',
          label: 'Move everything to a single account and close the other three',
          definition:
            'The strategy of concentrating all workloads in a single AWS account.',
          explanation:
            'You’d lose the separation between areas and environments, which is also a simple way to allocate costs. Consolidated billing gives you a single bill without lumping everything into one account.',
          correct: false,
        },
      ],
    },
    {
      id: 'who-pays',
      prompt:
        'The accountant asks two things before signing: once the organization is set up, who pays the bill? And how much does AWS charge us for consolidating?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'each-member-pays',
          label: 'Each member account keeps paying its own bill',
          definition:
            'A model in which each AWS account separately pays the charges for its own usage.',
          explanation:
            'In an organization the management account pays. The member accounts’ bills are for information only.',
          correct: false,
        },
        {
          id: 'fee-per-account',
          label: 'The management account pays for everything, plus a monthly fee for each member account',
          definition:
            'The idea that grouping accounts into an organization has an additional cost per account.',
          explanation:
            'Who pays is right, but consolidated billing is free: there’s no charge per member account.',
          correct: false,
        },
        {
          id: 'split-equally',
          label: 'AWS splits the bill into equal parts among the four accounts',
          definition:
            'The idea that an organization’s total cost is divided into equal amounts among its accounts.',
          explanation:
            'AWS doesn’t split the bill into equal parts: the management account pays and can see a cost report for each member account based on its usage.',
          correct: false,
        },
        {
          id: 'management-pays-free',
          label: 'The management account pays the charges for all accounts, at no extra cost for consolidating',
          definition:
            'How consolidated billing works: the paying account in the organization covers the member accounts’ charges.',
          explanation:
            'The management account pays the charges for all member accounts and sees a combined view with per-account detail. Consolidated billing has no additional cost.',
          correct: true,
        },
      ],
    },
    {
      id: 'free-plan-joins',
      prompt:
        'Important detail: we opened the developers’ test account two months ago with the Free account plan and it still has credits. If we add it to the organization, what happens to it?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'moves-to-paid',
          label: 'It automatically moves to the paid plan and any remaining credits apply to its future bills',
          definition:
            'The behavior of an account on the Free account plan when it joins an AWS Organizations organization.',
          explanation:
            'When it joins AWS Organizations, the account automatically moves to the paid plan, but it doesn’t lose what it has left: the remaining credits apply to its future bills.',
          correct: true,
        },
        {
          id: 'keeps-free-plan',
          label: 'It stays on the Free account plan until the six months are up',
          definition:
            'The idea that an account keeps its free plan even after becoming part of an organization.',
          explanation:
            'An account on the free plan that joins AWS Organizations automatically moves to the paid plan; it doesn’t keep the free plan inside the organization.',
          correct: false,
        },
        {
          id: 'loses-credits',
          label: 'It moves to the paid plan and loses all the credits it had left',
          definition:
            'The idea that changing an account’s plan wipes out the AWS credits that weren’t used.',
          explanation:
            'The account does move to the paid plan, but its remaining credits aren’t lost: they apply to its future bills.',
          correct: false,
        },
        {
          id: 'cannot-join',
          label: 'It can’t join the organization until its free plan ends',
          definition:
            'The idea that an account on the Free account plan is not allowed to join an organization.',
          explanation:
            'The account can join; what happens is that it automatically moves to the paid plan and keeps its credits for future bills.',
          correct: false,
        },
      ],
    },
    {
      id: 'shared-ri',
      prompt:
        'Finally: the online store’s account bought Reserved Instances last year, and the delivery app runs instances with the same attributes in another account. Once inside the organization, what happens to that discount?',
      topicSlug: 'consolidated-billing-and-tags',
      examTasks: ['4.2'],
      options: [
        {
          id: 'only-buyer',
          label: 'Only the store’s account benefits, because it’s the one that paid',
          definition:
            'The idea that a Reserved Instance discount is limited to the account that bought it.',
          explanation:
            'For billing purposes, the organization is treated as a single account, so the discount isn’t limited to the account that bought it.',
          correct: false,
        },
        {
          id: 'buy-again',
          label: 'The delivery account has to buy its own Reserved Instances',
          definition:
            'The strategy of having each account buy the discounts it needs separately.',
          explanation:
            'There’s no need to duplicate the purchase: inside the organization the discount is shared by default between accounts with matching instances.',
          correct: false,
        },
        {
          id: 'shared-by-default',
          label: 'It can apply to the matching delivery instances; the management account can turn this off',
          definition:
            'Sharing of Reserved Instance and Savings Plans discounts among the accounts of an organization with consolidated billing.',
          explanation:
            'The organization is treated as a single account for billing, so the RI benefit can apply to matching instances in another account. The management account can turn this off on the Billing and Cost Management Preferences page.',
          correct: true,
        },
        {
          id: 'becomes-sp',
          label: 'The Reserved Instances turn into Savings Plans to cover both accounts',
          definition:
            'The idea that joining an organization transforms one purchasing model into another.',
          explanation:
            'Reserved Instances and Savings Plans are different purchase options; sharing discounts in the organization doesn’t turn one into the other.',
          correct: false,
        },
      ],
    },
  ],
};
