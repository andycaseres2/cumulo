import type { Mission } from '../../../../domain/Mission';

/**
 * Tienda Andes: an outdoor gear shop in La Paz whose new online store must work with an inventory server that stays in the back room.
 * Practices the hybrid and on-premises deployment models, AWS Outposts, "private cloud" and how service and deployment models combine.
 */
export const serviceAndDeploymentModels2: Mission = {
  id: 'service-and-deployment-models-2',
  track: 'downtown',
  topicSlug: 'service-and-deployment-models',
  buildingId: 'store',
  title: 'With one foot in the back room',
  client: { name: 'Mariela Choque', role: 'Owner of Tienda Andes' },
  intro: [
    'Come in, come in! I’m Mariela Choque, owner of Tienda Andes. From La Paz we sell mountain clothing and gear to the people who climb Huayna Potosí and Illimani.',
    'We want to open our online store on AWS. The problem is the inventory system: it runs on a server in the back room, and the vendor who maintains it asked for one more year before moving it.',
    'Besides, the store’s checkout registers need immediate responses, and the internet connection here is sometimes slow. Everyone gives me different advice: my cousin says we should build a "private cloud" in the back room.',
    'I don’t want to get wrong a decision that will last us for years. Will you help me see where each thing should live?',
  ],
  outro: {
    passed: [
      'How clear! The online store on AWS, the inventory connected from the back room in the meantime, and the registers getting fast responses right here.',
      'And now I can explain to my cousin what this private cloud thing is. Thank you: when you head up the mountain, your jacket is on the house.',
    ],
    failed: [
      'Hmm... it’s still not clear to me where each system should live. Some answers don’t convince me.',
      'Review the theory on deployment models calmly and come back whenever you like. The shop is waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'inventory-stays',
      prompt:
        'First things first: the online store will run on AWS, but the inventory will stay on the back-room server for one more year, and the online store needs to query it to know what’s in stock. Which deployment model will we have?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'cloud',
          label: 'Cloud',
          definition:
            'A deployment model in which the application is fully deployed in the cloud and all of its parts run there.',
          explanation:
            'Not everything will be in the cloud: the inventory stays in the back room and the online store depends on it for another year.',
          correct: false,
        },
        {
          id: 'many-services',
          label: 'Multi-service: using several AWS services at once',
          definition:
            'Combining different AWS services, such as compute, storage and databases, within the same solution.',
          explanation:
            'Using several AWS services doesn’t define a deployment model. What matters here is that one part lives in the cloud and another in the back room.',
          correct: false,
        },
        {
          id: 'on-premises',
          label: 'On-premises',
          definition:
            'A deployment model in which resources are on the company’s own premises, using virtualization and management tools.',
          explanation:
            'On-premises would mean having everything in the back room. The online store, however, is going to run on AWS.',
          correct: false,
        },
        {
          id: 'hybrid',
          label: 'Hybrid',
          definition:
            'A deployment model that connects cloud resources with infrastructure that is not in the cloud, usually on premises.',
          explanation:
            'The online store on AWS connects to the inventory that remains in the back room. Linking the cloud with existing on-premises infrastructure is the most common hybrid deployment case.',
          correct: true,
        },
      ],
    },
    {
      id: 'checkout-latency',
      prompt:
        'The store’s registers need responses in milliseconds and to process the data right here, without every request having to travel over the internet. But I want to use the same AWS APIs and tools as the online store. Which service makes that possible?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'ec2-region',
          label: 'Amazon EC2 instances in an AWS Region',
          definition:
            'Virtual servers that run in the data centers of an AWS Region and are rented for as long as they are used.',
          explanation:
            'Instances in a Region are outside the store: every response to the registers would have to travel over the internet, which is exactly what Mariela wants to avoid.',
          correct: false,
        },
        {
          id: 'outposts',
          label: 'AWS Outposts',
          definition:
            'A fully managed service that brings AWS infrastructure, services, APIs and tools to the customer’s premises.',
          explanation:
            'Outposts puts AWS capacity inside your premises for low latency and local data processing, with the same APIs as in the cloud. It’s a typical piece of a hybrid scenario, although it needs a stable connection to its Region.',
          correct: true,
        },
        {
          id: 'beanstalk',
          label: 'AWS Elastic Beanstalk',
          definition:
            'A service where the customer uploads its application and AWS provisions the EC2 instances, load balancing, health monitoring and scaling.',
          explanation:
            'Elastic Beanstalk makes it easy to deploy applications on AWS, but it doesn’t bring AWS infrastructure into the store to process the registers’ data on site.',
          correct: false,
        },
        {
          id: 'route53',
          label: 'Amazon Route 53',
          definition:
            'A DNS service that translates domain names into IP addresses and directs users to applications.',
          explanation:
            'Route 53 helps customers find the online store, but it doesn’t process data inside the shop or reduce the registers’ latency.',
          correct: false,
        },
      ],
    },
    {
      id: 'private-cloud',
      prompt:
        'My cousin insists: "buy servers, virtualize them in the back room and you’ll have your own private cloud." What exactly would that be?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'on-premises-private',
          label: 'An on-premises deployment: dedicated resources, but without many of the benefits of the cloud',
          definition:
            'Deploying resources on your own premises using virtualization and management tools; it is sometimes called a private cloud.',
          explanation:
            'That’s how AWS describes a private cloud: it provides dedicated resources on your own premises, but it doesn’t offer many of the benefits of the cloud, such as pay-as-you-go or global reach.',
          correct: true,
        },
        {
          id: 'aws-private-service',
          label: 'An AWS service called "private cloud" that AWS runs in the back room',
          definition:
            'The idea that "private cloud" is an AWS product you sign up for like any other service.',
          explanation:
            'Private cloud is not an AWS service. What the cousin is describing is the store’s own virtualized servers, operated by the store.',
          correct: false,
        },
        {
          id: 'hybrid',
          label: 'A hybrid deployment',
          definition:
            'A deployment model that connects cloud resources with infrastructure that is not in the cloud, usually on premises.',
          explanation:
            'In the cousin’s proposal no part is in the cloud: everything would stay in the back room, so it isn’t hybrid.',
          correct: false,
        },
        {
          id: 'cloud',
          label: 'A cloud deployment with all its benefits',
          definition:
            'A deployment model in which the application is fully deployed in the cloud and all of its parts run there.',
          explanation:
            'Virtualizing your own servers doesn’t turn them into the AWS Cloud: the store would keep buying and maintaining its hardware.',
          correct: false,
        },
      ],
    },
    {
      id: 'full-picture',
      prompt:
        'To wrap up, I want to describe everything in one sentence for the bank that lends us money. Our programmer uploads the online store’s code to AWS Elastic Beanstalk, without touching servers, and the inventory stays connected from the back room. How do I describe it?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'iaas-hybrid',
          label: 'IaaS with a hybrid deployment',
          definition:
            'A combination of a service model where the customer manages the operating system with a deployment that joins the cloud and its own premises.',
          explanation:
            'The deployment is indeed hybrid, but the programmer doesn’t manage servers or the operating system: he just uploads his code, and that isn’t IaaS.',
          correct: false,
        },
        {
          id: 'paas-cloud',
          label: 'PaaS with a cloud deployment',
          definition:
            'A combination of a service model where the customer only manages its application with a deployment where everything runs in the cloud.',
          explanation:
            'The service model is PaaS, but the inventory stays in the back room, so not everything runs in the cloud.',
          correct: false,
        },
        {
          id: 'paas-hybrid',
          label: 'PaaS with a hybrid deployment',
          definition:
            'A combination of a service model where the customer only manages its application with a deployment that joins the cloud and its own premises.',
          explanation:
            'Uploading code to Elastic Beanstalk is a PaaS approach, and connecting the cloud to the back-room inventory is a hybrid deployment. They are separate axes that combine.',
          correct: true,
        },
        {
          id: 'saas-on-premises',
          label: 'SaaS with an on-premises deployment',
          definition:
            'A combination of a service model where the customer just uses a finished application with a deployment where everything is on its own premises.',
          explanation:
            'The store deploys its own code, so it isn’t SaaS, and the online store runs on AWS, so not everything is on premises.',
          correct: false,
        },
      ],
    },
  ],
};
