import type { Mission } from '../../../../domain/Mission';

/**
 * Telecom Andina: a mobile operator in La Paz activating SIM cards online and moving its Kubernetes workloads to AWS.
 * Practices event-driven AWS Lambda, Amazon EKS for existing Kubernetes, the 15-minute Lambda invocation limit
 * and what serverless really means.
 */
export const containersAndServerless2: Mission = {
  id: 'containers-and-serverless-2',
  track: 'tech',
  topicSlug: 'containers-and-serverless',
  buildingId: 'telecom',
  title: 'Signal without servers',
  client: { name: 'Ernesto Mamani', role: 'Head of Systems at Telecom Andina' },
  intro: [
    "Hello, come on in. I'm Ernesto Mamani, head of systems at Telecom Andina. From La Paz, we provide mobile and internet service to half a million customers in Bolivia.",
    "We launched online SIM card activation: the customer uploads a photo of their ID card and has a line within minutes. But those photos come in bursts, sometimes ten an hour and sometimes hundreds, and today we have a server running all day waiting for them.",
    'Also, the network team runs its applications on Kubernetes in our own data center and wants to move them to AWS. And every month we run a huge billing process that someone wants to move to serverless.',
    'The board wants to cut costs without losing customers. Can you help me decide what goes in containers and what goes serverless?',
  ],
  outro: {
    passed: [
      'Excellent! Activations run on Lambda only when a photo arrives, the network applications move to EKS without being rewritten and the long billing run stays where it belongs.',
      'And now the board understands what serverless really means. Thank you: at Telecom Andina you will always have a signal.',
    ],
    failed: [
      "Hmm... with these decisions we're going to lose signal in more than one process.",
      "Review the theory on containers and serverless and come back whenever you like. I'll keep the line open for you.",
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'telecom-sim-activation',
      prompt:
        "First, activations: every time a customer uploads the photo of their ID card to Amazon S3, it has to be validated and shrunk. I want to pay only when photos arrive and not manage any servers. What do we use?",
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-ec2-waiting',
          label: 'An Amazon EC2 instance running all day waiting for the photos',
          definition:
            'Virtual server with full control of the operating system, which the customer manages and pays for while it is running.',
          explanation:
            "It's what they have today: Telecom Andina manages the server and pays for it even when hours go by without any photos.",
          correct: false,
        },
        {
          id: 'telecom-lambda',
          label: 'AWS Lambda, with the Amazon S3 upload as the trigger',
          definition:
            'Serverless compute service that runs functions when an event occurs, priced per request and execution time.',
          explanation:
            'Each upload to S3 triggers the function, Lambda scales on its own with the number of photos and Telecom Andina pays per request and execution time, without managing servers.',
          correct: true,
        },
        {
          id: 'telecom-ecr',
          label: 'Amazon ECR',
          definition: 'Managed registry for storing, managing and sharing container images.',
          explanation:
            "ECR stores container images; it doesn't run code when a customer uploads a photo.",
          correct: false,
        },
        {
          id: 'telecom-ecs-ec2',
          label: 'An Amazon ECS cluster on self-managed EC2 instances',
          definition:
            'Container orchestration with the AWS-native service, using servers that the customer chooses and manages.',
          explanation:
            'ECS orchestrates containers, and on EC2 instances the team would still be managing servers. For short, event-triggered code, the option is Lambda.',
          correct: false,
        },
      ],
    },
    {
      id: 'telecom-kubernetes',
      prompt:
        "Now the network team. Their applications already run on Kubernetes in our data center, they use community tools and they don't want to rewrite anything. They want AWS to manage the control plane. Which service do they choose?",
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-ecs',
          label: 'Amazon ECS',
          definition: 'Fully managed container orchestration service, with the AWS-native orchestrator.',
          explanation:
            'ECS uses the AWS orchestrator, not Kubernetes. When the scenario mentions Kubernetes, the answer points to EKS.',
          correct: false,
        },
        {
          id: 'telecom-fargate-k8s',
          label: 'AWS Fargate as a replacement for Kubernetes',
          definition: 'Serverless compute engine where Amazon ECS and Amazon EKS containers run.',
          explanation:
            "Fargate isn't an orchestrator: it can provide the compute for the Pods, but the Kubernetes orchestrator is still EKS.",
          correct: false,
        },
        {
          id: 'telecom-eks',
          label: 'Amazon EKS',
          definition:
            'Managed Kubernetes service, certified Kubernetes conformant, in which AWS manages the control plane.',
          explanation:
            'Because it is Kubernetes conformant, the network team brings its applications and community tools without rewriting them, and AWS manages the control plane.',
          correct: true,
        },
        {
          id: 'telecom-ecr-k8s',
          label: 'Amazon ECR',
          definition: 'Managed container image registry, with private or public repositories.',
          explanation:
            "ECR can store their images, but it doesn't orchestrate or run the Kubernetes applications.",
          correct: false,
        },
      ],
    },
    {
      id: 'telecom-billing-run',
      prompt:
        "An analyst wants to move the monthly billing process to Lambda, and each run takes about four hours. Something tells me it doesn't fit. Why?",
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-no-scaling',
          label: "Because Lambda doesn't scale automatically with the load",
          definition:
            'A claim about the ability of AWS Lambda to create and tear down execution environments based on traffic.',
          explanation:
            "Lambda does scale automatically, creating and tearing down execution environments based on traffic; that isn't the billing problem.",
          correct: false,
        },
        {
          id: 'telecom-patch-servers',
          label: 'Because with Lambda you have to provision and patch the servers',
          definition: 'A claim about who manages the servers where AWS Lambda functions run.',
          explanation:
            'Lambda runs code without provisioning or managing servers; AWS takes care of provisioning and patching.',
          correct: false,
        },
        {
          id: 'telecom-s3-only',
          label: 'Because Lambda can only be triggered by uploads to Amazon S3',
          definition: 'A claim about the triggers that can invoke an AWS Lambda function.',
          explanation:
            'Lambda accepts many triggers, such as Amazon SQS, Amazon EventBridge or Amazon API Gateway, in addition to Amazon S3.',
          correct: false,
        },
        {
          id: 'telecom-15-minutes',
          label: 'Because an invocation of a Lambda event function lasts at most 15 minutes',
          definition:
            'The duration limit for an invocation of an AWS Lambda event function, 900 seconds.',
          explanation:
            'Four hours far exceeds the 15-minute maximum per invocation. For processes that long, it is better to use containers or AWS Batch.',
          correct: true,
        },
      ],
    },
    {
      id: 'telecom-serverless-meaning',
      prompt:
        'To wrap up: someone on the board said that with serverless "there are no servers anywhere anymore," and someone else said "AWS charges us a flat fee." I need to explain to them what it really means. What do I tell them?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'telecom-servers-managed',
          label: 'The servers exist, but AWS provisions, scales, patches and maintains them, and we pay for what we use',
          definition:
            'Serverless model: the provider manages the servers, and the customer focuses on the code and pays based on usage.',
          explanation:
            "Serverless doesn't eliminate servers: AWS takes care of managing them and Telecom Andina pays for usage, for example per request and execution time in Lambda.",
          correct: true,
        },
        {
          id: 'telecom-no-physical',
          label: 'The application runs without physical servers anywhere',
          definition: 'A literal reading of the word "serverless" as the complete absence of hardware.',
          explanation:
            'Believing serverless means "no physical servers" is a classic trap: the servers exist, but Telecom Andina doesn\'t manage them.',
          correct: false,
        },
        {
          id: 'telecom-we-manage-os',
          label: 'We manage the operating system and AWS only provides the hardware',
          definition: 'A compute model in which the customer installs and patches the server operating system.',
          explanation:
            "Managing the operating system belongs to a model like Amazon EC2; with serverless the team doesn't manage the servers.",
          correct: false,
        },
        {
          id: 'telecom-flat-fee',
          label: 'We pay a flat monthly fee, no matter how much we use',
          definition: 'A pricing model with a constant monthly amount, regardless of consumption.',
          explanation:
            'With serverless you pay for usage, with no up-front commitments; in Lambda, per request and execution time.',
          correct: false,
        },
      ],
    },
  ],
};
