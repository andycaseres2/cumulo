import type { Mission } from '../../../../domain/Mission';

/**
 * Rutas del Sur: a logistics company in Santiago de Chile, with offices at Centro de Datos Andino, whose microservices break in production.
 * Practices what a container is, Amazon ECR as the image registry, Amazon ECS as the AWS-native orchestrator
 * and AWS Fargate as serverless compute for containers.
 */
export const containersAndServerless1: Mission = {
  id: 'containers-and-serverless-1',
  track: 'tech',
  topicSlug: 'containers-and-serverless',
  buildingId: 'data-center',
  title: 'It works on my machine',
  client: { name: 'Lucía Fernández', role: 'Platform Lead at Rutas del Sur' },
  intro: [
    "Hi, come in. I'm Lucía Fernández, platform lead at Rutas del Sur. From these offices at Centro de Datos Andino, we coordinate the trucks that deliver parcels between Santiago and southern Chile.",
    'Our app is split into small services: routes, dispatch and truck tracking. The developers swear everything works on their laptops, but in production the library versions break again and again.',
    "On top of that, for each service we have EC2 instances that someone has to choose, update and scale by hand. My team is small, and it spends more time looking after servers than improving the app.",
    "If we don't get this sorted out, the sales season is going to find us with trucks waiting and angry customers. Can you help me modernize the platform?",
  ],
  outro: {
    passed: [
      'Perfect. Each service travels in its container with its dependencies, the images are stored and scanned in ECR, and ECS takes care of running and restarting them.',
      "With Fargate my team stopped looking after servers and can finally focus on the routes. Thank you: this time it works on every machine.",
    ],
    failed: [
      'Hmm... with these decisions we\'ll keep hearing "it works on my machine" at every deployment.',
      'Review the theory on containers and serverless and come back whenever you like. Rutas del Sur is still waiting for you.',
    ],
  },
  passingScore: 0.75,
  decisions: [
    {
      id: 'rutas-package',
      prompt:
        "Let's start with the daily headache: library versions that work on the laptops fail in production. Which concept packages code with its dependencies so it runs the same in any environment?",
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-orchestrator',
          label: 'An orchestrator',
          definition:
            'Service that decides where containers run, restarts them if they fail and scales them.',
          explanation:
            "The orchestrator manages containers that already exist; it doesn't package the code with its libraries.",
          correct: false,
        },
        {
          id: 'rutas-control-plane',
          label: 'A control plane',
          definition:
            'Part of an orchestrator that manages the state of the cluster, like the Kubernetes control plane that AWS manages in EKS.',
          explanation:
            "The control plane manages the orchestrator; it doesn't fix library differences between the laptops and production.",
          correct: false,
        },
        {
          id: 'rutas-container',
          label: 'A container, created from a container image',
          definition:
            'Standard unit of software that packages code and its dependencies so it runs quickly and reliably from one environment to another.',
          explanation:
            'The image carries the code and the exact versions of its libraries, so each Rutas del Sur service runs the same on a laptop and in production.',
          correct: true,
        },
        {
          id: 'rutas-bigger-ec2',
          label: 'A bigger Amazon EC2 instance for each service',
          definition: 'Vertical scaling: giving a server more CPU and memory by switching it to a larger instance type.',
          explanation:
            "More CPU and memory don't fix library versions that differ between environments; the problem is packaging, not capacity.",
          correct: false,
        },
      ],
    },
    {
      id: 'rutas-registry',
      prompt:
        'Great, we packaged the services. Now we need a managed, private place to store those images, share them between teams and scan them for vulnerabilities. What service do we use?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-ecr',
          label: 'Amazon Elastic Container Registry (Amazon ECR)',
          definition:
            'Managed container image registry with private or public repositories, which can scan images for vulnerabilities.',
          explanation:
            "ECR stores, manages and shares Rutas del Sur's images in private repositories, scans them, and they're used directly from ECS or EKS.",
          correct: true,
        },
        {
          id: 'rutas-ecs-registry',
          label: 'Amazon Elastic Container Service (Amazon ECS)',
          definition: 'Fully managed, AWS-native container orchestration service.',
          explanation:
            'Confusing ECR with ECS is a classic trap: ECS runs and orchestrates containers, but the image registry is ECR.',
          correct: false,
        },
        {
          id: 'rutas-fargate-registry',
          label: 'AWS Fargate',
          definition: 'Serverless, pay-as-you-go compute engine where ECS and EKS containers run.',
          explanation:
            "Fargate provides the capacity where containers run; it doesn't store or share images.",
          correct: false,
        },
        {
          id: 'rutas-lambda-registry',
          label: 'AWS Lambda',
          definition: 'Serverless compute service that runs functions when an event occurs.',
          explanation:
            "Lambda runs code in response to events; it isn't a repository for storing and scanning container images.",
          correct: false,
        },
      ],
    },
    {
      id: 'rutas-orchestration',
      prompt:
        "We have dozens of containers and need something that decides where they run and restarts them if they fail. Nobody on the team uses Kubernetes, and I want the simplest option, most integrated with AWS, without managing a control plane. What do we choose?",
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-eks',
          label: 'Amazon Elastic Kubernetes Service (Amazon EKS)',
          definition:
            'Managed Kubernetes service in which AWS manages the Kubernetes control plane.',
          explanation:
            "EKS suits teams that already use Kubernetes or want its ecosystem. Rutas del Sur doesn't use Kubernetes and is looking for the AWS-native option.",
          correct: false,
        },
        {
          id: 'rutas-fargate-orchestrator',
          label: 'AWS Fargate',
          definition: 'Serverless compute engine for containers that works with Amazon ECS and Amazon EKS.',
          explanation:
            'Thinking Fargate is an orchestrator is a classic trap: it provides the compute, but it needs ECS or EKS to do the orchestrating.',
          correct: false,
        },
        {
          id: 'rutas-ecr-orchestrator',
          label: 'Amazon ECR',
          definition: 'Managed container image registry.',
          explanation:
            "ECR only stores images; it doesn't decide where containers run or restart them when they fail.",
          correct: false,
        },
        {
          id: 'rutas-ecs',
          label: 'Amazon Elastic Container Service (Amazon ECS)',
          definition:
            'Fully managed, AWS-native container orchestration service, integrated with Amazon ECR and Docker.',
          explanation:
            'ECS is the AWS-native orchestrator: the simplest, most integrated option, with no control plane to manage, ideal for a team that does not use Kubernetes.',
          correct: true,
        },
      ],
    },
    {
      id: 'rutas-no-servers',
      prompt:
        'Last step, the one my team wants most: to stop choosing, updating and scaling the EC2 instances where the ECS tasks run. We just want to specify CPU and memory per task and launch them. What do we use?',
      topicSlug: 'containers-and-serverless',
      examTasks: ['3.3'],
      options: [
        {
          id: 'rutas-bigger-hosts',
          label: 'Bigger EC2 instances for the ECS cluster',
          definition:
            'Compute capacity based on virtual servers that the customer chooses, configures and manages.',
          explanation:
            'With bigger instances the team still chooses, patches and scales them, which is exactly the work it wants to drop.',
          correct: false,
        },
        {
          id: 'rutas-fargate',
          label: 'AWS Fargate',
          definition:
            'Serverless, pay-as-you-go compute engine for Amazon ECS and Amazon EKS containers.',
          explanation:
            "With Fargate the team specifies CPU and memory per task and doesn't provision, configure or scale virtual machines. Each task has its own isolation boundary.",
          correct: true,
        },
        {
          id: 'rutas-lambda',
          label: 'AWS Lambda',
          definition:
            'Service that runs event-driven functions without provisioning servers, priced per request and execution time.',
          explanation:
            "Lambda runs functions connected to triggers; it isn't the capacity option that Amazon ECS tasks run on.",
          correct: false,
        },
        {
          id: 'rutas-ecr-capacity',
          label: 'Amazon ECR',
          definition: 'Managed registry for storing, managing and sharing container images.',
          explanation:
            "ECR stores the images, but it doesn't provide the compute capacity where the tasks run.",
          correct: false,
        },
      ],
    },
  ],
};
