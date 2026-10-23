import type { Mission } from '../../../../domain/Mission';

/**
 * Telecom Andina: a telecom company in La Paz whose self-service portal is slow at peak hours and released by hand.
 * Practices CI/CD concepts, AWS CodePipeline, AWS X-Ray versus CloudWatch and CloudTrail, and AWS Amplify for a mobile frontend.
 */
export const developerAndFrontendTools2: Mission = {
  id: 'developer-and-frontend-tools-2',
  track: 'tech',
  topicSlug: 'developer-and-frontend-tools',
  buildingId: 'telecom',
  title: 'The portal that crawls',
  client: { name: 'Gabriel Mamani', role: 'Head of digital platforms at Telecom Andina' },
  intro: [
    'Hello, come on in. I\'m Gabriel Mamani, head of digital platforms at Telecom Andina. From La Paz we provide internet and mobile service to half a million customers in Bolivia.',
    'Our self-service portal lets people pay bills, top up their balance and change plans. Under the hood it\'s six microservices, and we release every version by hand on a Friday night.',
    'At the end of the month, when everyone pays, the portal crawls and nobody knows which microservice is eating up the time. And the manual releases go wrong more often than I\'d like to admit.',
    'On top of that, management wants a new mobile web app before the end of the year. If we don\'t get our act together on how we build and deliver software, we won\'t make it. Can you give me a hand?',
  ],
  outro: {
    passed: [
      'This changes everything. Every change goes through build, tests and deployment on its own, and now we know exactly which microservice is slowing down the portal.',
      'And the mobile team ships without wrestling with servers. This end of the month is going to be a calm one. Thank you!',
    ],
    failed: [
      'Hmm... with these decisions I think we\'d still be releasing by hand and guessing where the slowness is.',
      'Review the developer and frontend tools theory and come back. We\'ll be waiting for you with a piping hot api morado, our purple corn drink.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'ci-concept',
      prompt:
        'First I want to get the team on the same page with the vocabulary. What do you call the practice where every time someone pushes code to the repository, it gets built and tested automatically to catch errors early?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'continuous-delivery',
          label: 'Continuous delivery or deployment (CD)',
          definition:
            'Practice in which changes that pass the tests automatically move forward to test and production environments.',
          explanation:
            'Continuous delivery takes care of moving what already passed the tests into the environments. Building and testing every change when it\'s pushed is continuous integration.',
          correct: false,
        },
        {
          id: 'distributed-tracing',
          label: 'Distributed tracing',
          definition:
            'Technique that follows a request\'s path through an application\'s services to find errors and latency.',
          explanation:
            'Distributed tracing diagnoses requests while the application is running; it doesn\'t build or test code when someone pushes it to the repository.',
          correct: false,
        },
        {
          id: 'manual-release',
          label: 'Scheduled manual release',
          definition:
            'Process in which a person builds, tests and uploads changes on a fixed date.',
          explanation:
            'That\'s exactly what you do today on Friday nights. What you\'re describing happens automatically with every change.',
          correct: false,
        },
        {
          id: 'continuous-integration',
          label: 'Continuous integration (CI)',
          definition:
            'Practice in which every change pushed to the repository is built and tested automatically.',
          explanation:
            'That\'s continuous integration: automatically building and testing every change to catch errors early, before they reach customers.',
          correct: true,
        },
      ],
    },
    {
      id: 'release-pipeline',
      prompt:
        'Now I want to get rid of those Friday nights. Every time there\'s a change in GitHub, it should automatically go through build, tests and deployment to production, following the stages we define. Which service orchestrates that flow?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'codebuild-pipeline',
          label: 'AWS CodeBuild',
          definition:
            'Managed build service that compiles source code, runs tests and produces packages ready to deploy.',
          explanation:
            'CodeBuild builds and tests, but it\'s one stage within the flow. To orchestrate source, build, tests and deployment, the service is CodePipeline.',
          correct: false,
        },
        {
          id: 'codepipeline-pipeline',
          label: 'AWS CodePipeline',
          definition:
            'Fully managed continuous delivery service that automates the build, test and deploy phases every time the code changes.',
          explanation:
            'CodePipeline automates the entire release pipeline based on the model you define, integrates with GitHub and uses CodeBuild as the stage that builds and tests.',
          correct: true,
        },
        {
          id: 'cli-pipeline',
          label: 'AWS CLI',
          definition:
            'Tool to interact with AWS services using commands in the terminal.',
          explanation:
            'The CLI is for running commands and scripts, but it\'s not a continuous delivery service that reacts to every change in GitHub with defined stages.',
          correct: false,
        },
        {
          id: 'cloudwatch-pipeline',
          label: 'Amazon CloudWatch',
          definition:
            'Service that monitors resources and applications with metrics, logs, dashboards and alarms.',
          explanation:
            'CloudWatch monitors what is already in production. It doesn\'t build, test or deploy changes from the repository.',
          correct: false,
        },
      ],
    },
    {
      id: 'find-bottleneck',
      prompt:
        'The end-of-month pain: a payment request goes through six microservices and the database, and it takes eight seconds. I need to follow each request\'s path and see a map that tells me which service is slowing it down. What should I use?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'xray-bottleneck',
          label: 'AWS X-Ray',
          definition:
            'Service that collects data about the requests an application serves and generates a trace map with its calls to other services.',
          explanation:
            'X-Ray does distributed tracing: it follows each request through the microservices and the database, and its trace map shows where the bottlenecks and latency spikes are.',
          correct: true,
        },
        {
          id: 'cloudtrail-bottleneck',
          label: 'AWS CloudTrail',
          definition:
            'Service that records AWS API calls made by users, roles and services for auditing.',
          explanation:
            'This is a classic trap: CloudTrail answers who made which API call, not why a request from your customers takes eight seconds.',
          correct: false,
        },
        {
          id: 'cloudwatch-bottleneck',
          label: 'An Amazon CloudWatch alarm on the portal\'s latency',
          definition:
            'Alarm that notifies you or takes an action when a metric, such as latency, crosses a threshold.',
          explanation:
            'An alarm tells you the portal is slow, but it doesn\'t follow each request across the microservices or show the trace map that tells you which one is slowing it down.',
          correct: false,
        },
        {
          id: 'codebuild-bottleneck',
          label: 'AWS CodeBuild',
          definition:
            'Managed build service that compiles code and runs tests.',
          explanation:
            'CodeBuild works before deployment, building and testing. It doesn\'t observe real customer requests in production.',
          correct: false,
        },
      ],
    },
    {
      id: 'mobile-frontend',
      prompt:
        'Finally, the new app. The frontend team wants to ship it quickly without managing infrastructure, with one branch for production and another for testing, plus a preview of every pull request so marketing can review it. Which service should I recommend?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'cli-frontend',
          label: 'AWS CLI',
          definition:
            'Open-source tool to run AWS commands from the terminal and automate them with scripts.',
          explanation:
            'With the CLI the team would have to build the whole release process by hand. It doesn\'t offer per-environment branches or pull request previews.',
          correct: false,
        },
        {
          id: 'codebuild-frontend',
          label: 'AWS CodeBuild',
          definition:
            'Managed service that compiles source code, runs tests and produces packages ready to deploy.',
          explanation:
            'CodeBuild builds and tests, but it doesn\'t host the application or offer previews so marketing can review each pull request.',
          correct: false,
        },
        {
          id: 'amplify-frontend',
          label: 'AWS Amplify',
          definition:
            'Service to build and deploy web and mobile apps, with Git-based hosting, per-environment branches, custom domains and pull request previews.',
          explanation:
            'Amplify is designed so a frontend team can ship web and mobile apps without managing infrastructure, with per-environment branches and previews of every pull request.',
          correct: true,
        },
        {
          id: 'cloudtrail-frontend',
          label: 'AWS CloudTrail',
          definition:
            'Service that records actions taken in the AWS account as events.',
          explanation:
            'CloudTrail is for auditing actions in the account. It doesn\'t publish applications or create per-branch environments.',
          correct: false,
        },
      ],
    },
  ],
};
