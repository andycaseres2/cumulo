import type { Mission } from '../../../../domain/Mission';

/**
 * FotoRuta: a travel-photo startup from Córdoba, Argentina, with an office at Startup Hub, testing its app on the Free account plan.
 * Practices the current AWS Free Tier plans, data transfer charges, Amazon EBS provisioned storage and tiered pricing.
 */
export const storageAndTransferPricing1: Mission = {
  id: 'storage-and-transfer-pricing-1',
  track: 'market',
  topicSlug: 'storage-and-transfer-pricing',
  buildingId: 'startup',
  title: 'Photos that weigh on the bill',
  client: { name: 'Joaquín Herrera', role: 'Co-founder of FotoRuta' },
  intro: [
    'Hi! I’m Joaquín Herrera, co-founder of FotoRuta. We’re three people from Córdoba, Argentina, with a tiny office here at the Startup Hub.',
    'We built an app where travelers upload their photos of each route and others download them to plan their trip. The photos go to Amazon S3 and the backend runs on Amazon EC2.',
    'We started a proof of concept on AWS, but I don’t really understand what we’re going to be charged: when the free stuff ends, which data movements cost money, or why the server’s disk is so expensive.',
    'Next week I’m presenting numbers to some investors and I don’t want a surprise bill to sink us. Will you help me understand how AWS charges?',
  ],
  outro: {
    passed: [
      'Great! Now I know when the free plan ends, which traffic is paid, why the disk charges for what we reserved and why the price per GB drops as we grow.',
      'With these numbers the investors will see that we have costs under control. Thank you: when FotoRuta is big, your photo goes on the cover.',
    ],
    failed: [
      'Hmm... I still have doubts about what we’re going to be charged. I don’t dare present the numbers like this.',
      'Review the theory on storage and transfer pricing and come back whenever you like. I’ll be waiting with some mate.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'free-plan-end',
      prompt:
        'We created the account with the Free account plan for the proof of concept. One friend told me the free part lasts a year, another that it lasts forever. When does our plan actually end?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'twelve-months',
          label: '12 months after creating the account',
          definition:
            'The duration associated with the free tier in the previous description of the AWS Free Tier.',
          explanation:
            'That belongs to the old free tier model. The current Free account plan lasts up to six months.',
          correct: false,
        },
        {
          id: 'never-ends',
          label: 'Never, as long as they only use the Always Free offers',
          definition:
            'Always Free offers are permanent monthly allowances on some AWS services.',
          explanation:
            'Always Free offers exist, but they don’t extend the Free account plan: the plan ends by time or by credits, and to keep going you have to move to the paid plan.',
          correct: false,
        },
        {
          id: 'six-months-or-credits',
          label: 'After six months or when the credits run out, whichever comes first',
          definition:
            'The end rule of the Free account plan, the AWS plan for experimenting and building proofs of concept with AWS credits.',
          explanation:
            'The free plan lasts up to six months and also ends if FotoRuta uses up its credits sooner. To continue afterward, they must move to the Paid account plan, where any remaining credits apply first.',
          correct: true,
        },
        {
          id: 'first-trial',
          label: 'When they first use a service with a short-term trial',
          definition:
            'Short-term trials are trial offers for select services within the free tier.',
          explanation:
            'Short-term trials apply to accounts on the paid plan; using them isn’t what ends the Free account plan.',
          correct: false,
        },
      ],
    },
    {
      id: 'photo-transfer',
      prompt:
        'Now the traffic. Travelers upload photos from their phones, the photos are processed on EC2 in the same Region and then other users download them directly from S3 over the internet. Which of those movements generates a data transfer charge for us?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'upload-from-internet',
          label: 'Travelers uploading photos from the internet to Amazon S3',
          definition:
            'Inbound data transfer: bytes arriving from the internet to an AWS service.',
          explanation:
            'Data coming into AWS from the internet generally isn’t charged, and in S3 inbound data from the internet is free.',
          correct: false,
        },
        {
          id: 'download-to-internet',
          label: 'Users downloading the photos from S3 over the internet',
          definition:
            'Outbound data transfer: bytes leaving AWS for the internet, which appear on the bill as AWS Data Transfer Out.',
          explanation:
            'Data going out to the internet is charged per GB, with rates depending on the source Region. It’s one of the three fundamental cost drivers, along with compute and storage.',
          correct: true,
        },
        {
          id: 's3-to-ec2-same-region',
          label: 'EC2 reading the photos from S3 in the same Region to process them',
          definition:
            'Data transfer between AWS services located in the same Region.',
          explanation:
            'In S3, transfer to other AWS services in the same Region is free, so processing the photos on EC2 doesn’t add a transfer charge.',
          correct: false,
        },
        {
          id: 'no-transfer-charges',
          label: 'None, because on AWS you only pay for compute and storage',
          definition:
            'The idea that moving data into, out of or within AWS isn’t part of what you pay for.',
          explanation:
            'Transfer does have a price in several cases: outbound to the internet, between Regions and between Availability Zones are usually charged.',
          correct: false,
        },
      ],
    },
    {
      id: 'ebs-volume',
      prompt:
        'Something I don’t understand: we gave the server a 1 TB Amazon EBS volume "just in case," but it only has 80 GB of data. And the disk bill is high. How does EBS charge us?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'ebs-provisioned',
          label: 'For the 1 TB provisioned, in GB-months, until they release the volume',
          definition:
            'The Amazon EBS pricing dimension based on provisioned storage, measured in GB-months.',
          explanation:
            'EBS charges for the size you reserve, not what you write, until you release the volume. The 1 TB "just in case" is exactly what drives up the bill; it’s better to provision what they need.',
          correct: true,
        },
        {
          id: 'ebs-written',
          label: 'Only for the 80 GB that contain data',
          definition:
            'A billing model in which you pay only for the space the written data takes up.',
          explanation:
            'EBS doesn’t charge only for what’s written: it charges for provisioned storage. That’s why they pay for the volume’s full size.',
          correct: false,
        },
        {
          id: 'ebs-requests',
          label: 'Only for the PUT and GET requests the server makes',
          definition:
            'Charging by request type, such as PUT, GET or LIST, on the stored objects.',
          explanation:
            'Charging by request type is an Amazon S3 pricing dimension. In EBS you pay for provisioned storage, plus provisioned IOPS and throughput on certain volume types.',
          correct: false,
        },
        {
          id: 'ebs-snapshots-only',
          label: 'Only for the snapshots created from the volume',
          definition:
            'Incremental copies of an EBS volume that are charged for the space the data takes up.',
          explanation:
            'Snapshots are charged separately. The volume itself is charged for its provisioned size, whether or not it has snapshots.',
          correct: false,
        },
      ],
    },
    {
      id: 'tiered-pricing',
      prompt:
        'Last question for the investors. We project going from 2 to 200 TB of photos in S3. My partner says the price per GB will go down as we grow. Is he right? Which AWS pricing principle explains it?',
      topicSlug: 'storage-and-transfer-pricing',
      examTasks: ['4.1'],
      options: [
        {
          id: 'pay-as-you-go',
          label: 'Pay-as-you-go',
          definition:
            'The principle by which, for the vast majority of services, you pay only for what you consume, with no long-term contracts.',
          explanation:
            'Pay-as-you-go explains why they pay based on what they store, but not why the price of each GB drops as they grow.',
          correct: false,
        },
        {
          id: 'save-when-commit',
          label: 'Save when you commit',
          definition:
            'The principle by which models like Savings Plans or Reserved Instances lower the price in exchange for a 1- or 3-year commitment.',
          explanation:
            'FotoRuta isn’t signing any commitment for its S3 storage; the drop in price per GB comes from volume, not from a term.',
          correct: false,
        },
        {
          id: 'always-free',
          label: 'Always Free offers',
          definition:
            'Permanent monthly allowances that some AWS services include at no cost.',
          explanation:
            'Always Free offers are fixed monthly amounts on some services; they don’t explain a drop in price per GB as volume grows.',
          correct: false,
        },
        {
          id: 'pay-less-using-more',
          label: 'Pay less per unit by using more (tiered pricing)',
          definition:
            'The principle by which some services have volume-based price tiers (tiered pricing): the more you use, the less you pay per unit.',
          explanation:
            'His partner is right: Amazon S3 has tiered pricing, so once FotoRuta passes certain volume tiers, each additional GB will cost it less.',
          correct: true,
        },
      ],
    },
  ],
};
