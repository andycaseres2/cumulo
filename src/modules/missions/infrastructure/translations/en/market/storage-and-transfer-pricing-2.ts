import type { Mission } from '../../../../domain/Mission';

/**
 * Retail Andes: a supermarket chain in La Paz whose Amazon S3 bill grew after picking storage classes and replicas "just in case".
 * Practices Amazon S3 storage classes, data transfer between Availability Zones and Regions, S3 Intelligent-Tiering and minimum storage durations.
 */
export const storageAndTransferPricing2: Mission = {
  id: 'storage-and-transfer-pricing-2',
  track: 'market',
  topicSlug: 'storage-and-transfer-pricing',
  buildingId: 'retail-chain',
  title: 'The cost of storing just in case',
  client: { name: 'Gabriela Mamani', role: 'Head of Infrastructure at Retail Andes' },
  intro: [
    'Thanks for coming all the way up to our office. I’m Gabriela Mamani, head of infrastructure at Retail Andes, a supermarket chain with forty stores in La Paz and El Alto.',
    'We keep almost everything in Amazon S3: the catalog photos, the checkout logs, the campaign files. Each department chose the storage class "that seemed cheapest" and replicated things elsewhere just in case.',
    'The result: retrieval charges nobody understands, charges for days we didn’t use and a data transfer line item that grows every month.',
    'The board asked me to sort out storage before the quarter closes. I need someone who knows how AWS charges. Can you give me a hand?',
  ],
  outro: {
    passed: [
      'Now we’re talking! Every piece of data is in the S3 class that matches how it’s used, we know which traffic is paid and nobody deletes files before their minimum duration without knowing what it costs.',
      'I’m going to show the board a clear plan with no surprises. Thank you: at Retail Andes there will always be a cup of api with buñuelos waiting for you.',
    ],
    failed: [
      'Hmm... with these decisions I think the S3 bill would keep surprising us. Something still doesn’t add up.',
      'Review the theory on storage and transfer pricing and come back whenever you like. The office is still open for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'catalog-images',
      prompt:
        'Let’s start with the catalog. The product photos are accessed every day by the website, the app and the screens in all forty stores. Someone moved them to a cheaper class and retrieval charges appeared. Where should they be?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'catalog-standard-ia',
          label: 'S3 Standard-IA',
          definition:
            'An S3 class for infrequent access, with a lower storage cost, a retrieval charge and a 30-day minimum duration.',
          explanation:
            'Storage costs less, but every read generates a retrieval charge. With photos read every day, that’s exactly what inflates the bill.',
          correct: false,
        },
        {
          id: 'catalog-glacier-instant',
          label: 'S3 Glacier Instant Retrieval',
          definition:
            'An S3 archive class with immediate access, an even lower storage cost, a retrieval charge and a 90-day minimum duration.',
          explanation:
            'It’s designed for archive data that is rarely accessed. The catalog’s daily access would generate constant retrieval charges.',
          correct: false,
        },
        {
          id: 'catalog-deep-archive',
          label: 'S3 Glacier Deep Archive',
          definition:
            'The S3 archive class with the lowest storage cost, restore charges and a 180-day minimum duration.',
          explanation:
            'It’s for data that is almost never read. The catalog photos are needed instantly and every day; here you’d have permanent restores.',
          correct: false,
        },
        {
          id: 'catalog-standard',
          label: 'S3 Standard',
          definition:
            'The general-purpose S3 class, with the highest storage cost among these options and no retrieval charge.',
          explanation:
            'It costs more per GB stored, but it doesn’t charge for retrieving the data. For photos read every day, it’s the class that avoids access charges.',
          correct: true,
        },
      ],
    },
    {
      id: 'free-transfer',
      prompt:
        'Now the transfer. The checkout servers send data to other instances, the IT department replicated everything to another Region just in case and some instances talk across different Availability Zones. Which of these movements generally does NOT generate a charge?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'same-az',
          label: 'Traffic between instances within the same Availability Zone, using private IP addresses',
          definition:
            'Data transfer between resources located in the same Availability Zone of a Region.',
          explanation:
            'Traffic within the same Availability Zone over private IP addresses is generally free. Retail Andes’ charges come from the other movements.',
          correct: true,
        },
        {
          id: 'cross-region',
          label: 'Replicating the buckets to another Region',
          definition:
            'Data transfer between different AWS Regions, for example when replicating an S3 bucket.',
          explanation:
            'Transfer between Regions is typically charged. The "just in case" replica adds transfer and, on top of that, the storage for the copy.',
          correct: false,
        },
        {
          id: 'cross-az',
          label: 'Traffic between instances in different Availability Zones of the same Region',
          definition:
            'Data transfer between resources located in different Availability Zones within the same Region.',
          explanation:
            'Transfer between Availability Zones in the same Region is typically charged; what is generally free is traffic within the same AZ.',
          correct: false,
        },
        {
          id: 'egress-internet',
          label: 'Downloads from the deals website to customers over the internet',
          definition:
            'Outbound data transfer from AWS to the internet, aggregated across services as AWS Data Transfer Out.',
          explanation:
            'Data going out to the internet is charged per GB, with rates depending on the source Region.',
          correct: false,
        },
      ],
    },
    {
      id: 'unknown-access',
      prompt:
        'The checkout logs are a mystery: some months the audit team looks at them a lot and other months nobody touches them. We can’t predict the pattern. Is there an S3 class that arranges them on its own based on usage?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'logs-one-zone-ia',
          label: 'S3 One Zone-IA',
          definition:
            'An S3 class for infrequent access in a single Availability Zone, with a retrieval charge and a 30-day minimum duration.',
          explanation:
            'It has a lower storage cost, but it doesn’t move objects between tiers on its own: in heavy audit months, every read would pay for retrieval.',
          correct: false,
        },
        {
          id: 'intelligent-tiering',
          label: 'S3 Intelligent-Tiering',
          definition:
            'An S3 class that automatically moves objects between access tiers, with a per-object monitoring charge.',
          explanation:
            'With an unpredictable access pattern, S3 arranges the logs across tiers based on usage, in exchange for a per-object monitoring charge. Nobody has to guess the pattern.',
          correct: true,
        },
        {
          id: 'logs-ebs',
          label: 'A large Amazon EBS volume for all the logs',
          definition:
            'Block storage for EC2 instances, charged for the provisioned size in GB-months.',
          explanation:
            'EBS charges for the reserved size even if it isn’t used, and it isn’t an S3 class; it doesn’t arrange the logs based on their access.',
          correct: false,
        },
        {
          id: 'logs-standard',
          label: 'S3 Standard forever',
          definition:
            'The general-purpose S3 class, with no retrieval charge and a higher storage cost than the infrequent access and archive classes.',
          explanation:
            'It avoids retrieval charges, but in the months when nobody touches the logs they’d keep paying for storage that costs more than the infrequent access classes. It doesn’t adapt to usage on its own.',
          correct: false,
        },
      ],
    },
    {
      id: 'early-deletion',
      prompt:
        'Last mystery: marketing stored a campaign’s videos in S3 Glacier Instant Retrieval to save money, and deleted them after 20 days because the campaign ended. We were still charged for more days of storage. Why?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'only-twenty-days',
          label: 'It was a mistake: they should only charge for the 20 days',
          definition:
            'The idea that S3 storage is always charged only for the actual days the object was stored.',
          explanation:
            'S3’s colder classes have minimum durations. Deleting early doesn’t limit the charge to the actual days.',
          correct: false,
        },
        {
          id: 'up-to-180',
          label: 'You’re charged until 180 days are completed',
          definition:
            'A 180-day minimum storage duration, specific to S3’s lowest-cost archive class.',
          explanation:
            'The 180 days belong to S3 Glacier Deep Archive. Glacier Instant Retrieval has a different minimum.',
          correct: false,
        },
        {
          id: 'prorated-to-90',
          label: 'You’re charged a prorated amount for the rest of the 90-day minimum duration',
          definition:
            'An S3 rule by which deleting or moving an object before its class’s minimum duration generates a prorated charge for the remaining time.',
          explanation:
            'S3 Glacier Instant Retrieval has a 90-day minimum duration; deleting at 20 days means you’re charged the prorated remainder. For short-lived files, a colder class can end up costing more.',
          correct: true,
        },
        {
          id: 'monitoring-fee',
          label: 'It’s the per-object monitoring charge',
          definition:
            'A per-object charge from the S3 class that automatically moves data between access tiers.',
          explanation:
            'The per-object monitoring charge belongs to S3 Intelligent-Tiering, not Glacier Instant Retrieval.',
          correct: false,
        },
      ],
    },
  ],
};
