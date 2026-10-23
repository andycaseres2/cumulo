import type { Mission } from '../../../../domain/Mission';

/**
 * Tienda Gamer Pixel: a gaming shop in Guadalajara whose owner is learning to run its online store on AWS.
 * Practices the ways to access AWS: the Management Console, the AWS CLI, the AWS SDKs and the APIs underneath them.
 */
export const accessAndProvisioning1: Mission = {
  id: 'access-and-provisioning-1',
  track: 'tech',
  topicSlug: 'access-and-provisioning',
  buildingId: 'gaming-store',
  title: 'Game over for clicking',
  client: { name: 'Mateo Quintero', role: 'Owner of Tienda Gamer Pixel' },
  intro: [
    "Welcome to Pixel! I'm Mateo Quintero. I started out selling used consoles in a tiny shop in Guadalajara, and today I have an online store that ships all over Mexico.",
    "The store runs on AWS, but I do everything myself, by hand, one click at a time. My nephew says there are other ways to work with AWS, but I don't know which one to use for what.",
    'Last month I forgot to shut down a test server for three weeks, and the bill hurt. And now my developer wants the store to upload product photos on its own.',
    "If we keep going like this, everything is going to blow up at the next console launch. Can you help me pick the right tool for each job?",
  ],
  outro: {
    passed: [
      'Level cleared! Now I know when the console is enough, when a script is the better call and what the store uses from its own code.',
      "The test server shuts itself down every night and the photos upload without anyone touching a thing. Whenever you want a game at the shop, it's on the house.",
    ],
    failed: [
      "Uh-oh... I think with these answers I'd end up doing everything by hand again and overpaying.",
      "Review the theory on how to access AWS and come back for a rematch. I'll keep the controller warm for you.",
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'explore-service',
      prompt:
        "Easy one first: I want to look at an AWS service I've never used, visually and without writing code, and run a single quick test to understand it. What should I use?",
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'explore-cli',
          label: 'AWS CLI',
          definition:
            'Open source tool for interacting with AWS services through commands typed in the terminal.',
          explanation:
            "The CLI requires typing commands in the terminal. To explore something new visually and without coding, there's a more direct option.",
          correct: false,
        },
        {
          id: 'explore-query-api',
          label: 'Direct calls to the Query API',
          definition:
            'Low-level access through HTTPS requests, where the application signs the requests and handles errors.',
          explanation:
            "The Query API is the most technical way in: you have to sign every request. It isn't visual, and it doesn't suit someone who doesn't want to code.",
          correct: false,
        },
        {
          id: 'explore-console',
          label: 'AWS Management Console',
          definition:
            'AWS web interface used from the browser to view and manage services visually.',
          explanation:
            "The console is visual, doesn't require coding and is ideal for learning, exploring services and doing one-off tasks like this test.",
          correct: true,
        },
        {
          id: 'explore-cloudformation',
          label: 'AWS CloudFormation',
          definition:
            'Infrastructure as code service that creates resources from templates written in JSON or YAML.',
          explanation:
            "CloudFormation is for repeatable processes with templates. For a single visual test, writing a template doesn't make sense.",
          correct: false,
        },
      ],
    },
    {
      id: 'nightly-stop',
      prompt:
        'Now the thing that hurt on the bill: I want a bash script that runs every night on the store computer and, with terminal commands, stops the test server. What do I write it with?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'nightly-cli',
          label: 'AWS CLI',
          definition:
            'Tool for using AWS services with commands in terminals such as bash, zsh or PowerShell, which can also go into scripts.',
          explanation:
            'The CLI gives you access to the AWS APIs from the terminal and lets you write scripts to automate repetitive tasks, like stopping the server every night.',
          correct: true,
        },
        {
          id: 'nightly-console',
          label: 'AWS Management Console, with a phone alarm as a reminder',
          definition:
            'AWS web interface for managing resources by hand from the browser.',
          explanation:
            "Keeping it manual in the console depends on someone remembering every night: that's exactly what failed. Clicks can't be scheduled like a script.",
          correct: false,
        },
        {
          id: 'nightly-cloudformation',
          label: 'AWS CloudFormation',
          definition:
            'Service that provisions a set of resources described in a template and manages them as a single unit.',
          explanation:
            "CloudFormation provisions infrastructure from templates; it isn't a command tool for a nightly administrative task like stopping a server.",
          correct: false,
        },
        {
          id: 'nightly-cdk',
          label: 'AWS CDK',
          definition:
            'Kit for defining infrastructure with programming languages, which is then provisioned through AWS CloudFormation.',
          explanation:
            'The CDK is for defining infrastructure as code, not for running administrative commands in the terminal every night.',
          correct: false,
        },
      ],
    },
    {
      id: 'upload-photos',
      prompt:
        'My developer wrote the store in JavaScript. He wants the photos of every new product to upload to AWS from the store\'s own code, without having to sign requests or code the retries by hand. What should he use?',
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'photos-cli',
          label: 'AWS CLI',
          definition:
            'Command line tool for working with AWS services from the terminal.',
          explanation:
            'The CLI is used from the terminal. When an application needs to use AWS from its own code, the right fit is an SDK.',
          correct: false,
        },
        {
          id: 'photos-console',
          label: 'AWS Management Console',
          definition:
            'Web interface in the browser for using AWS services by hand.',
          explanation:
            "The console is for people clicking; the store can't use it from its code to upload photos automatically.",
          correct: false,
        },
        {
          id: 'photos-cloudformation',
          label: 'AWS CloudFormation',
          definition:
            'Service that creates and updates infrastructure from JSON or YAML templates.',
          explanation:
            "CloudFormation provisions infrastructure; it isn't a library an application uses to upload files every time a product is created.",
          correct: false,
        },
        {
          id: 'photos-sdk',
          label: 'The AWS SDK for JavaScript',
          definition:
            'Library for each programming language, used inside an application\'s code to call AWS services.',
          explanation:
            'The SDK is used inside the store\'s code and takes care of signing requests, retrying and handling errors, exactly what the developer asked for.',
          correct: true,
        },
      ],
    },
    {
      id: 'console-only',
      prompt:
        "One last question: my nephew swears there are things in AWS you can only do from the console, so learning the CLI isn't worth it. Is he right?",
      topicSlug: 'access-and-provisioning',
      examTasks: ['3.1'],
      options: [
        {
          id: 'private-cli-api',
          label: 'Yes: the CLI uses a different private API, with fewer features than the console',
          definition:
            'The idea that each AWS tool connects to its own interface, different from the others.',
          explanation:
            'The CLI and the SDKs use the same public service APIs; they are just different ways of making those same calls.',
          correct: false,
        },
        {
          id: 'everything-is-api',
          label: 'No: every action is a call to the service API, which the console, the CLI and the SDKs all use under the hood',
          definition:
            'The idea that every action in AWS becomes an HTTPS call, signed with credentials, to the service\'s public API.',
          explanation:
            'In AWS everything ends up as an API call. AWS states that the console\'s IaaS management features are also available in the API and the CLI.',
          correct: true,
        },
        {
          id: 'cfn-only-alternative',
          label: 'Almost: outside the console, the only way to create resources is CloudFormation',
          definition:
            'The claim that infrastructure as code is the only way to access AWS other than the web interface.',
          explanation:
            "The CLI, the SDKs and the Query API also create resources, because they all use the service APIs. CloudFormation is one more option, not the only one.",
          correct: false,
        },
        {
          id: 'console-extra-features',
          label: "Yes: the console has IaaS management features that don't exist in the API",
          definition:
            "The idea that the web interface offers infrastructure operations that can't be invoked programmatically.",
          explanation:
            "It's a classic trap: AWS states that those console features are also in the API and the CLI, so the CLI is definitely worth learning.",
          correct: false,
        },
      ],
    },
  ],
};
