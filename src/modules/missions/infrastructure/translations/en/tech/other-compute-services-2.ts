import type { Mission } from '../../../../domain/Mission';

/**
 * Robótica Kids: a robotics school for children in Guatemala City that needs a simple website and runs queued robot simulations.
 * Practices Amazon Lightsail (simple, low predictable monthly price, bundled databases), AWS Batch vs AWS Lambda,
 * and connecting a growing Lightsail project to other AWS services with VPC peering.
 */
export const otherComputeServices2: Mission = {
  id: 'other-compute-services-2',
  track: 'tech',
  topicSlug: 'other-compute-services',
  buildingId: 'robotics-school',
  title: 'Robots that learn in the cloud',
  client: { name: 'Sofía Herrera', role: 'Founder of Robótica Kids' },
  intro: [
    'Hi there! I\'m Sofía Herrera, founder of Robótica Kids. Here in Guatemala City we teach kids ages 8 to 14 to build and program robots.',
    'We need a website to show our courses and take sign-ups. We\'re a small school: we don\'t have anyone in IT, and I need to know how much I\'ll pay each month.',
    'Also, for the national tournament, the kids submit hundreds of robot simulations that can wait in a queue all night. Today we run them on a single old computer and we can\'t keep up.',
    'The tournament is in two months and families are already asking about sign-ups. Will you help me take Robótica Kids to the cloud?',
  ],
  outro: {
    passed: [
      'We did it! The site runs on Lightsail with a monthly price I can predict, sign-ups go to their database, and the tournament simulations are processed in a queue with AWS Batch.',
      'And when we grow, I know how to connect everything to other AWS services. Thank you: the kids have already named you an honorary mentor.',
    ],
    failed: [
      'Oh no... with these decisions I\'m not sure we\'ll make it to the tournament.',
      'Review the theory on other compute services and come back whenever you like. The robots are waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'kids-website',
      prompt:
        'First, the website. I want to publish a WordPress site with our courses in the simplest way possible, with a low, predictable monthly price. A friend recommended Elastic Beanstalk. What should I choose?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-beanstalk',
          label: 'AWS Elastic Beanstalk',
          definition:
            'Service for deploying web applications that handles capacity provisioning, load balancing, health monitoring and scaling.',
          explanation:
            'Elastic Beanstalk deploys applications without managing infrastructure, but you pay for the resources it creates. For a simple site with a low, predictable monthly price, Lightsail is the better fit.',
          correct: false,
        },
        {
          id: 'kids-outposts',
          label: 'AWS Outposts',
          definition:
            'Service that installs AWS infrastructure, operated by AWS, at the customer\'s own facilities.',
          explanation:
            'Outposts is for processing data locally with low latency; it is overkill for a small school\'s website.',
          correct: false,
        },
        {
          id: 'kids-lightsail',
          label: 'Amazon Lightsail',
          definition:
            'Service that, according to AWS, is the easiest way to get started, with virtual private servers, ready-made images and a low, predictable monthly price.',
          explanation:
            'Lightsail offers ready-made images such as WordPress and a low, predictable monthly price, designed for small projects without an IT team.',
          correct: true,
        },
        {
          id: 'kids-batch-site',
          label: 'AWS Batch',
          definition: 'Managed service for running batch computing jobs that wait in a queue.',
          explanation:
            'Batch processes queued jobs without user interaction; a website that families visit is not a batch job.',
          correct: false,
        },
      ],
    },
    {
      id: 'kids-signup-database',
      prompt:
        'For sign-ups I need a managed MySQL database, but without leaving the simple, predictable setup we already chose for the site. What should I use?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-lightsail-db',
          label: 'A Lightsail managed database with MySQL',
          definition:
            'Besides instances, Lightsail includes managed MySQL or PostgreSQL databases, load balancers, storage, CDN, static IPs and DNS.',
          explanation:
            'Lightsail includes managed MySQL databases, so Sofía keeps everything in the same simple service with a predictable price.',
          correct: true,
        },
        {
          id: 'kids-outpost-db',
          label: 'An Outpost at the school with a local database',
          definition: 'AWS compute and storage capacity installed at the customer\'s site and operated by AWS.',
          explanation:
            'An Outpost brings AWS infrastructure on site for low-latency or local processing use cases; it is not the simple, predictable option a small school is looking for.',
          correct: false,
        },
        {
          id: 'kids-batch-db',
          label: 'An AWS Batch environment that stores the sign-ups',
          definition: 'Compute environment that provisions resources to process batch jobs submitted to a queue.',
          explanation:
            'Batch runs batch jobs; it is not a database for storing the families\' sign-ups.',
          correct: false,
        },
        {
          id: 'kids-local-zone-db',
          label: 'A Local Zone with MySQL installed by hand',
          definition: 'AWS infrastructure locations near large cities, for lower latency to users there.',
          explanation:
            'A Local Zone is a place to run resources, not a managed database; installing MySQL by hand is exactly the complexity Sofía wants to avoid.',
          correct: false,
        },
      ],
    },
    {
      id: 'kids-tournament-sims',
      prompt:
        'Now the tournament: hundreds of robot simulations, some longer than an hour, that can wait in a queue all night. I want to save money with Spot Instances. An engineer dad suggests AWS Lambda. Which service fits best?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-lambda',
          label: 'AWS Lambda',
          definition: 'Service that runs short, event-driven functions without provisioning servers.',
          explanation:
            'Mixing up Batch and Lambda is a classic trap: Lambda runs short, event-driven functions, and a single invocation is not long enough for simulations that take more than an hour.',
          correct: false,
        },
        {
          id: 'kids-batch',
          label: 'AWS Batch',
          definition:
            'Fully managed service that runs batch computing workloads at any scale and provisions resources based on the jobs submitted.',
          explanation:
            'Batch manages the simulation queue, provisions compute automatically and can use EC2 Spot Instances, with no batch processing software to install.',
          correct: true,
        },
        {
          id: 'kids-lightsail-sims',
          label: 'A larger Amazon Lightsail instance',
          definition: 'Lightsail virtual private server with a predictable monthly price based on its size.',
          explanation:
            'A single larger instance repeats the old-computer problem: it does not manage a queue of hundreds of jobs or provision capacity based on the load.',
          correct: false,
        },
        {
          id: 'kids-beanstalk-sims',
          label: 'AWS Elastic Beanstalk',
          definition: 'Service for deploying and scaling web applications from their code.',
          explanation:
            'Elastic Beanstalk deploys web applications; it does not process hundreds of jobs waiting in a queue.',
          correct: false,
        },
      ],
    },
    {
      id: 'kids-grow',
      prompt:
        'If all goes well, next year we\'ll open locations in other cities, and I want to connect the Lightsail project to other AWS services. How do I do that?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'kids-outpost-office',
          label: 'By installing an Outpost at each location',
          definition: 'AWS capacity installed at the customer\'s facilities, as racks or servers.',
          explanation:
            'Outposts brings AWS infrastructure to your own site; it is not the mechanism for connecting Lightsail to other services.',
          correct: false,
        },
        {
          id: 'kids-batch-job',
          label: 'By turning the site into an AWS Batch job',
          definition: 'A batch job is a task that is submitted to a queue and processed without user interaction.',
          explanation:
            'A website that families visit is not a batch job; Batch does not connect Lightsail to other services.',
          correct: false,
        },
        {
          id: 'kids-local-zones-grow',
          label: 'By moving the site to a Local Zone',
          definition: 'AWS infrastructure locations near large cities, for lower latency to users there.',
          explanation:
            'A Local Zone brings resources closer to a city, but it is not the way to connect a Lightsail project to other AWS services.',
          correct: false,
        },
        {
          id: 'kids-vpc-peering',
          label: 'Through VPC peering',
          definition: 'Private network connection between two virtual networks so their resources can communicate.',
          explanation:
            'With VPC peering, the Robótica Kids Lightsail project communicates privately with resources in other AWS services as it grows.',
          correct: true,
        },
      ],
    },
  ],
};
