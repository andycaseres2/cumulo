import type { Mission } from '../../../../domain/Mission';

/**
 * Agencia de Viajes Rumbo: a travel agency in Cartagena moving its booking website, email and accounting system to AWS.
 * Practices the service models (IaaS, PaaS with AWS Elastic Beanstalk, SaaS) and the cloud deployment model.
 */
export const serviceAndDeploymentModels1: Mission = {
  id: 'service-and-deployment-models-1',
  track: 'downtown',
  topicSlug: 'service-and-deployment-models',
  buildingId: 'travel-agency',
  title: 'Three systems, three paths',
  client: { name: 'Lucía Restrepo', role: 'Operations Manager at Agencia de Viajes Rumbo' },
  intro: [
    'Welcome to Rumbo! I’m Lucía Restrepo, operations manager. We’re a travel agency in Cartagena: we sell packages to the Rosario Islands, the Walled City and half the Caribbean.',
    'All our technology lives on an old server in the back room of the office: the booking website Julián programmed, the email for our twenty agents and an old accounting system.',
    'That server has already shut down twice in high season, and each time we lost bookings. We decided to move to the cloud, but in meetings everyone talks about IaaS, PaaS and SaaS, and I don’t know what to choose for each thing.',
    'I need to decide this week which path each system takes. Will you help me sort it out?',
  ],
  outro: {
    passed: [
      'Now I get it! Julián uploads his code without worrying about servers, the agents just use their email, and the accounting system has the control it needs.',
      'And with everything in the cloud, the back room is finally going to be a meeting room. Thank you: your next trip to the islands is on the agency.',
    ],
    failed: [
      'Hmm... I’m not sure these are the right decisions for each system.',
      'Review the theory on service and deployment models and come back whenever you like. I’ll be waiting with a glass of corozo juice.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'booking-website',
      prompt:
        'Let’s start with the booking website. Julián programmed it himself and wants to keep improving it, but he doesn’t want to patch operating systems or configure load balancers: he just wants to upload his code. Which model suits him?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'iaas-ec2',
          label: 'IaaS, renting servers on Amazon EC2 that Julián manages',
          definition:
            'A service model that provides the basic building blocks of IT (compute, networking and storage), where the customer installs and updates the operating system.',
          explanation:
            'With IaaS, Julián would keep patching the operating system and configuring everything, exactly what he wants to avoid. It would give him more control than he needs.',
          correct: false,
        },
        {
          id: 'saas-booking',
          label: 'SaaS, subscribing to a finished booking software',
          definition:
            'A service model in which the provider delivers a complete application that it runs and manages itself, and the customer just uses it.',
          explanation:
            'With SaaS the agency would use someone else’s application and leave behind the website Julián programmed. Lucía wants to keep and improve her own code.',
          correct: false,
        },
        {
          id: 'paas-beanstalk',
          label: 'PaaS, uploading the code to AWS Elastic Beanstalk',
          definition:
            'A service model in which the provider manages the infrastructure and the operating system, and the customer deploys and manages its application.',
          explanation:
            'Julián uploads his application and Elastic Beanstalk provisions the EC2 instances, load balancing, health monitoring and scaling. He focuses on the code.',
          correct: true,
        },
        {
          id: 'on-premises',
          label: 'Keep the website on a new server inside the office',
          definition:
            'Deploying resources on the company’s own premises, in a data center or server room it operates itself.',
          explanation:
            'A new server in the office forces Julián to keep managing hardware and the operating system, and it doesn’t take advantage of the benefits of the cloud.',
          correct: false,
        },
      ],
    },
    {
      id: 'team-email',
      prompt:
        'Now the email. The twenty agents just need to send and receive messages from the browser. We don’t want to install, configure or update anything. Which model is that?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'saas-email',
          label: 'SaaS: a ready-to-use web email service',
          definition:
            'A service model in which the provider delivers a complete application that it runs and manages itself, and the customer just uses it.',
          explanation:
            'The agents just use the product: there’s no code of their own to deploy and no servers to look after. Web-based email is a common example of SaaS.',
          correct: true,
        },
        {
          id: 'paas-email',
          label: 'PaaS: programming an email system and uploading it to a platform',
          definition:
            'A service model in which the provider manages the infrastructure and the operating system, and the customer deploys and manages its application.',
          explanation:
            'PaaS is useful when you have your own application to deploy. Programming email from scratch would be a lot of work for something the agency only needs to use.',
          correct: false,
        },
        {
          id: 'iaas-email',
          label: 'IaaS: installing an email server on an Amazon EC2 instance',
          definition:
            'A service model that provides the basic building blocks of IT (compute, networking and storage), where the customer installs and updates the operating system.',
          explanation:
            'With IaaS the agency would have to install, patch and maintain the email server, the opposite of what Lucía is asking for.',
          correct: false,
        },
        {
          id: 'hybrid-email',
          label: 'A hybrid email deployment',
          definition:
            'A deployment model that connects cloud resources with infrastructure that is not in the cloud, usually on premises.',
          explanation:
            'Hybrid describes where the systems live, not how much the agency manages. Lucía’s question is which service model spares her from managing email.',
          correct: false,
        },
      ],
    },
    {
      id: 'accounting-system',
      prompt:
        'The accounting system is another story. It’s old, it needs a specific version of the operating system and our technician has to configure the server by hand. We need as much control as possible. Which model do we choose?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['1.1', '3.1'],
      options: [
        {
          id: 'saas-accounting',
          label: 'SaaS, because the provider takes care of everything',
          definition:
            'A service model in which the provider delivers a complete application that it runs and manages itself, and the customer just uses it.',
          explanation:
            'SaaS gives the least control: the provider decides how the application runs. The accounting system needs the opposite.',
          correct: false,
        },
        {
          id: 'paas-accounting',
          label: 'PaaS, because it gives more control than IaaS',
          definition:
            'A service model in which the provider manages the infrastructure and the operating system, and the customer deploys and manages its application.',
          explanation:
            'This is a common mix-up: PaaS gives a medium level of control, because the provider manages the operating system. The technician couldn’t configure it his own way.',
          correct: false,
        },
        {
          id: 'private-cloud-service',
          label: 'Sign up for AWS’s "private cloud" service',
          definition:
            'A term sometimes used to describe an on-premises deployment that uses virtualization and management tools on the company’s own premises.',
          explanation:
            'Private cloud isn’t an AWS service model: it’s another name for an on-premises deployment. It doesn’t answer how much control the service gives.',
          correct: false,
        },
        {
          id: 'iaas-accounting',
          label: 'IaaS, with Amazon EC2 instances where the technician manages the operating system',
          definition:
            'A service model that provides the basic building blocks of IT (compute, networking and storage), where the customer installs and updates the operating system.',
          explanation:
            'IaaS offers the most flexibility and control: on Amazon EC2 the technician chooses and configures the operating system the accounting system needs.',
          correct: true,
        },
      ],
    },
    {
      id: 'deployment-model',
      prompt:
        'Last question. If the website, email and accounting system run entirely in the cloud and we turn off the back-room server for good, which deployment model will we have?',
      topicSlug: 'service-and-deployment-models',
      examTasks: ['3.1'],
      options: [
        {
          id: 'hybrid',
          label: 'Hybrid, because we use several different services',
          definition:
            'A deployment model that connects cloud resources with infrastructure that is not in the cloud, usually on premises.',
          explanation:
            'Hybrid doesn’t mean using several services or service models. It means connecting the cloud with resources outside it, and the agency won’t have any left.',
          correct: false,
        },
        {
          id: 'cloud',
          label: 'Cloud',
          definition:
            'A deployment model in which the application is fully deployed in the cloud and all of its parts run there.',
          explanation:
            'All of the agency’s systems will run in the cloud and no infrastructure of its own will remain. Mixing IaaS, PaaS and SaaS doesn’t change the deployment model.',
          correct: true,
        },
        {
          id: 'on-premises',
          label: 'On-premises',
          definition:
            'A deployment model in which resources are on the company’s own premises, using virtualization and management tools.',
          explanation:
            'On-premises would mean keeping everything in the back room. Lucía is describing exactly the opposite: turning off that server for good.',
          correct: false,
        },
        {
          id: 'private-cloud',
          label: 'Private cloud',
          definition:
            'A term sometimes used to describe an on-premises deployment that uses virtualization and management tools on the company’s own premises.',
          explanation:
            'Private cloud is another name for an on-premises deployment, with resources on the company’s own premises. The agency won’t have any.',
          correct: false,
        },
      ],
    },
  ],
};
