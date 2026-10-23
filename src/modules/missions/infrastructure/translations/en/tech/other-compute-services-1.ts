import type { Mission } from '../../../../domain/Mission';

/**
 * Universidad Tecnológica: a university in Córdoba (Argentina) with an enrollment app that collapses every term
 * and a research lab that must process data on campus.
 * Practices AWS Elastic Beanstalk (PaaS, no additional charge), AWS Outposts vs Local Zones, and who operates an Outpost.
 */
export const otherComputeServices1: Mission = {
  id: 'other-compute-services-1',
  track: 'tech',
  topicSlug: 'other-compute-services',
  buildingId: 'university',
  title: 'From Code to Campus',
  client: { name: 'Dra. Camila Rojas', role: 'Chief Technology Officer at Universidad Tecnológica' },
  intro: [
    'Welcome to Universidad Tecnológica. I\'m Dr. Camila Rojas, chief technology officer. From Córdoba, we serve twenty thousand engineering students.',
    'At the start of every term, the course registration system, a Java web application, collapses. My team is made up of developers, not infrastructure people, and they lose days configuring servers, load balancers and scaling.',
    'Also, the industrial robotics lab processes data from its robotic arms and needs near-instant responses on campus, but it wants to use the same AWS APIs as the rest of the university.',
    'The university president asked me for a proposal for next term. Will you help me put it together?',
  ],
  outro: {
    passed: [
      'Proposal approved! The developers upload the registration code, and Elastic Beanstalk takes care of capacity, load balancing and scaling, with no extra charge for the service.',
      'And the lab will have an Outpost on campus, operated by AWS. Thank you: consider yourself part of the faculty.',
    ],
    failed: [
      'Hmm... with this proposal, the president is going to make me retake the exam.',
      'Review the theory on other compute services and come back whenever you like. The university is still open to you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'uni-enrollment-deploy',
      prompt:
        'The urgent part: we want to upload the Java registration code and have AWS provision the servers, configure load balancing, monitor health and scale on its own. My developers want to focus on the code. Which service do we use?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-batch',
          label: 'AWS Batch',
          definition:
            'A managed service that runs batch computing jobs waiting in a queue, without user interaction.',
          explanation:
            'Batch processes queued jobs, such as simulations; it doesn\'t deploy or scale a web application that students use live.',
          correct: false,
        },
        {
          id: 'uni-beanstalk',
          label: 'AWS Elastic Beanstalk',
          definition:
            'A service for deploying web applications that provisions capacity, configures load balancing, monitors health and scales the environment.',
          explanation:
            'Elastic Beanstalk supports Java: the team uploads the application and the service takes care of the environment, like a PaaS. Exactly what developers who want to focus on the code need.',
          correct: true,
        },
        {
          id: 'uni-outposts-web',
          label: 'AWS Outposts',
          definition:
            'A service that extends AWS infrastructure and APIs to the customer\'s premises, operated by AWS.',
          explanation:
            'Outposts brings AWS capacity to your own site; it doesn\'t automate the deployment or scaling of the registration application.',
          correct: false,
        },
        {
          id: 'uni-local-zones-web',
          label: 'AWS Local Zones',
          definition: 'AWS infrastructure locations near large cities, for lower latency to users there.',
          explanation:
            'A Local Zone is a place to run resources; it doesn\'t deploy or scale an application from its code.',
          correct: false,
        },
      ],
    },
    {
      id: 'uni-beanstalk-cost',
      prompt:
        'The finance department asks how much Elastic Beanstalk itself costs. They don\'t want any surprises on the bill. What do I tell them?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-fee-per-env',
          label: 'A fixed monthly fee for each Elastic Beanstalk environment',
          definition: 'A pricing model with a recurring charge for each environment created in the service.',
          explanation:
            'Elastic Beanstalk doesn\'t charge per environment. Believing it has its own cost is a classic exam trap.',
          correct: false,
        },
        {
          id: 'uni-fee-per-deploy',
          label: 'A charge for each deployment of a new code version',
          definition: 'A pricing model in which each release of an application version has a price.',
          explanation:
            'Deploying new versions has no separate charge; the university pays for what its application\'s resources consume.',
          correct: false,
        },
        {
          id: 'uni-license-per-student',
          label: 'An annual license based on the number of students',
          definition: 'A per-end-user licensing model, common in traditional academic software.',
          explanation:
            'Elastic Beanstalk isn\'t licensed per user; you pay for the AWS resources the application uses.',
          correct: false,
        },
        {
          id: 'uni-no-extra-charge',
          label: 'There is no additional charge: they pay only for the AWS resources the application consumes',
          definition:
            'The AWS Elastic Beanstalk pricing model, in which the service isn\'t charged separately from the underlying resources.',
          explanation:
            'Elastic Beanstalk has no additional charge; the university pays for the instances, load balancers and other resources it creates for the application.',
          correct: true,
        },
      ],
    },
    {
      id: 'uni-robotics-lab',
      prompt:
        'Now the robotics lab: its robotic arms generate data that has to be processed on campus, with very low latency, using the same AWS APIs and tools. Which service fits?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-outposts',
          label: 'AWS Outposts',
          definition:
            'A fully managed service that extends AWS infrastructure, services, APIs and tools to the customer\'s premises.',
          explanation:
            'An Outpost installed on campus lets the lab process data locally with low latency and with the same APIs as in a Region: a hybrid deployment.',
          correct: true,
        },
        {
          id: 'uni-local-zones',
          label: 'AWS Local Zones',
          definition: 'AWS infrastructure locations near large cities, for lower latency to users there.',
          explanation:
            'Mixing up Outposts and Local Zones is a classic trap: Local Zones are at AWS locations, not inside the campus.',
          correct: false,
        },
        {
          id: 'uni-lightsail-lab',
          label: 'Amazon Lightsail',
          definition:
            'A service for launching simple virtual servers, websites and applications at a low, predictable monthly price.',
          explanation:
            'Lightsail runs in the AWS Cloud for simple projects; it doesn\'t install capacity inside the lab.',
          correct: false,
        },
        {
          id: 'uni-batch-lab',
          label: 'AWS Batch',
          definition: 'A managed service for running batch computing workloads of any scale.',
          explanation:
            'Batch manages queued jobs in the cloud; it doesn\'t bring AWS infrastructure to the campus or give the robots near-instant responses.',
          correct: false,
        },
      ],
    },
    {
      id: 'uni-outpost-operator',
      prompt:
        'The head of support is nervous: he thinks his team will have to operate and repair that equipment as if it were our own data center. Who operates and manages it?',
      topicSlug: 'other-compute-services',
      examTasks: ['3.3'],
      options: [
        {
          id: 'uni-own-it-team',
          label: 'The university\'s support team, as in its own data center',
          definition: 'The traditional on-premises model, in which the organization operates and maintains its own hardware.',
          explanation:
            'Believing that Outposts is a data center you manage yourself is a classic trap; the support team doesn\'t have to operate it.',
          correct: false,
        },
        {
          id: 'uni-marketplace-vendor',
          label: 'An AWS Marketplace vendor hired separately',
          definition: 'AWS Marketplace is a digital catalog for finding, buying and deploying third-party software.',
          explanation:
            'Operating an Outpost isn\'t contracted through AWS Marketplace; it\'s part of the AWS service.',
          correct: false,
        },
        {
          id: 'uni-aws-operates',
          label: 'AWS, as part of a Region: it operates, monitors and manages it',
          definition:
            'The AWS Outposts operating model: the capacity is at the customer\'s site, but AWS manages it.',
          explanation:
            'AWS operates, monitors and manages the Outpost installed on campus as part of a Region; the support team can rest easy.',
          correct: true,
        },
        {
          id: 'uni-storage-only',
          label: 'Nobody, because an Outpost only stores data and doesn\'t run resources',
          definition: 'A claim about the compute and storage capacity included in an Outpost.',
          explanation:
            'An Outpost has compute and storage capacity and can run resources such as EC2 instances, EBS volumes, ECS clusters and RDS instances.',
          correct: false,
        },
      ],
    },
  ],
};
