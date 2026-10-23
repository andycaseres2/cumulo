import type { Mission } from '../../../../domain/Mission';

/**
 * Café Hacker: a coffee shop for programmers in Quito that wants its own ordering web app and loyalty program.
 * Practices AWS Amplify Hosting, the AWS CLI, the AWS SDKs and AWS CodeBuild.
 */
export const developerAndFrontendTools1: Mission = {
  id: 'developer-and-frontend-tools-1',
  track: 'tech',
  topicSlug: 'developer-and-frontend-tools',
  buildingId: 'hacker-cafe',
  title: 'One coffee, one commit',
  client: { name: 'Daniela Andrade', role: 'Owner and developer of Café Hacker' },
  intro: [
    'Hi! Can I get you an espresso? I\'m Daniela Andrade, owner of Café Hacker, right here in Quito. It\'s a coffee shop for programmers: great Wi-Fi, outlets at every table and high-altitude coffee.',
    'Before opening the café I was a developer, so I built a React website myself for ordering from the table, plus a Python backend for the loyalty points program.',
    'But I do everything by hand: I publish the website by copying files, I test the code on my laptop, and every morning I update the menu of the day by clicking around in the AWS console. I\'ve already pushed a bug to production in the middle of rush hour.',
    'I want to focus on coffee, not on putting out fires. Can you help me choose the AWS tools to work like a professional team?',
  ],
  outro: {
    passed: [
      'I love it! The website publishes itself on every change, the menu updates with a script, and the backend gets built and tested without my laptop.',
      'Now I can finally serve coffee in peace. Your next espresso is on me.',
    ],
    failed: [
      'Hmm... with these decisions I\'d still be doing everything by hand and putting out fires.',
      'Review the developer and frontend tools theory and come back. The coffee maker is always on.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'host-web-app',
      prompt:
        'Let\'s start with the React ordering website. The code is on GitHub, and I want every change I push to publish automatically, with my own domain, without managing servers. Which service should I use?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'ec2-web',
          label: 'An Amazon EC2 instance with your own web server',
          definition:
            'Virtual server in the cloud where the customer installs, configures and maintains the operating system and software.',
          explanation:
            'This is the classic trap: with EC2 you\'d have to manage the server and set up publishing yourself. For a web app with continuous deployment from Git, the answer is Amplify.',
          correct: false,
        },
        {
          id: 'amplify-web',
          label: 'AWS Amplify (Amplify Hosting)',
          definition:
            'Service to build and deploy web and mobile apps; Amplify Hosting publishes apps connected to a Git repository with continuous deployment on the AWS global CDN.',
          explanation:
            'Amplify Hosting connects to your GitHub repository and automatically publishes every change on the AWS global CDN, supports React and allows custom domains.',
          correct: true,
        },
        {
          id: 'xray-web',
          label: 'AWS X-Ray',
          definition:
            'Distributed tracing service that collects data about an application\'s requests and shows a trace map.',
          explanation:
            'X-Ray helps diagnose requests and latency, but it doesn\'t host or publish your ordering website.',
          correct: false,
        },
        {
          id: 'cloudtrail-web',
          label: 'AWS CloudTrail',
          definition:
            'Service that records actions taken in the account from the console, the CLI, the SDKs and the APIs as events.',
          explanation:
            'CloudTrail audits who did what in the account. It doesn\'t publish web applications from a repository.',
          correct: false,
        },
      ],
    },
    {
      id: 'daily-menu-script',
      prompt:
        'Every morning I upload the menu of the day to an Amazon S3 bucket by clicking around in the console. I want to automate it with a script that runs from my Mac\'s terminal. Which tool should I use?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'console-menu',
          label: 'AWS Management Console',
          definition:
            'Web interface to manage AWS services with clicks from the browser.',
          explanation:
            'The console is exactly what you use today: it\'s manual and can\'t be automated with a script in the terminal.',
          correct: false,
        },
        {
          id: 'xray-menu',
          label: 'AWS X-Ray',
          definition:
            'Service that traces an application\'s requests across its services to find bottlenecks.',
          explanation:
            'X-Ray is for diagnosing an application\'s performance. It doesn\'t run commands to upload files to S3.',
          correct: false,
        },
        {
          id: 'cli-menu',
          label: 'AWS CLI',
          definition:
            'Open-source tool to interact with AWS services using commands in the Linux, macOS or Windows terminal.',
          explanation:
            'With the AWS CLI you do from the terminal the same things you do in the console, like uploading the menu to S3, and you can put it in a script to automate it every morning.',
          correct: true,
        },
        {
          id: 'amplify-menu',
          label: 'AWS Amplify',
          definition:
            'Service to build and deploy web and mobile apps with continuous deployment from Git.',
          explanation:
            'Amplify publishes web and mobile apps. To automate an S3 task with a script from the terminal, the tool is the AWS CLI.',
          correct: false,
        },
      ],
    },
    {
      id: 'loyalty-sdk',
      prompt:
        'The points backend is written in Python. When a customer pays, the backend code itself has to save their points to an AWS database. What do I use to call AWS services from that code?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'sdk-loyalty',
          label: 'The AWS SDK for Python',
          definition:
            'Libraries for languages such as Java, Python, Ruby or .NET that let you call AWS services from an application\'s code.',
          explanation:
            'The SDKs give programmatic access to AWS APIs from code. With the SDK for Python, the backend saves the points every time a customer pays.',
          correct: true,
        },
        {
          id: 'console-loyalty',
          label: 'AWS Management Console',
          definition:
            'Web interface to manage AWS services manually from the browser.',
          explanation:
            'The console is for working by hand. The backend needs to call AWS on its own, from its own code, every time someone pays.',
          correct: false,
        },
        {
          id: 'cloudtrail-loyalty',
          label: 'AWS CloudTrail',
          definition:
            'Service that records API calls made in the account for auditing.',
          explanation:
            'CloudTrail records calls that were already made, so you can audit them. It\'s not how you make those calls from code.',
          correct: false,
        },
        {
          id: 'codepipeline-loyalty',
          label: 'AWS CodePipeline',
          definition:
            'Continuous delivery service that automates the build, test and deploy phases of an application.',
          explanation:
            'CodePipeline automates how software gets released, but it\'s not what the backend code uses to save data in AWS while it runs.',
          correct: false,
        },
      ],
    },
    {
      id: 'build-and-test',
      prompt:
        'Here\'s what hurts the most: I test the backend on my laptop, and if I forget, the bug reaches production. I want a managed service that compiles the code, runs the tests and produces the package ready to deploy, without maintaining a build server. Which one is it?',
      topicSlug: 'developer-and-frontend-tools',
      examTasks: ['3.8'],
      options: [
        {
          id: 'xray-build',
          label: 'AWS X-Ray',
          definition:
            'Distributed tracing service that shows the path of each request through an application\'s services.',
          explanation:
            'X-Ray finds bottlenecks and errors in requests, but it doesn\'t compile the code or run the tests before publishing.',
          correct: false,
        },
        {
          id: 'codepipeline-build',
          label: 'AWS CodePipeline',
          definition:
            'Continuous delivery service that orchestrates the source, build, test and deploy stages of a pipeline.',
          explanation:
            'This is the classic mix-up: CodePipeline orchestrates the entire delivery flow, but the stage that compiles and tests the code is CodeBuild.',
          correct: false,
        },
        {
          id: 'codebuild-build',
          label: 'AWS CodeBuild',
          definition:
            'Fully managed build service that compiles source code, runs tests and produces packages ready to deploy.',
          explanation:
            'CodeBuild compiles and tests the backend without you provisioning build servers, and it scales to process multiple builds at once. That way your tests no longer depend on your laptop.',
          correct: true,
        },
        {
          id: 'cloudformation-build',
          label: 'AWS CloudFormation',
          definition:
            'Infrastructure as code service that creates and manages AWS resources from templates.',
          explanation:
            'CloudFormation creates AWS resources from templates, but it doesn\'t compile your Python code or run its tests.',
          correct: false,
        },
      ],
    },
  ],
};
