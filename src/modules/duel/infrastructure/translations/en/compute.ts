import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const computeFamily: ServiceFamily = {
  id: 'compute',
  title: 'Compute: servers, containers or functions',
  summary:
    'Ask yourself how much you want to manage: virtual servers with full control, orchestrated containers, event-driven functions, a platform that deploys your code, or a simple fixed-price bundle.',
  services: [
    { name: 'Amazon EC2', summary: 'Virtual servers: you choose the instance type, operating system and purchase option; you manage them.' },
    { name: 'AWS Lambda', summary: 'Serverless functions that run on events; you pay per request and duration; up to 15 minutes per invocation.' },
    { name: 'Amazon ECS', summary: 'AWS-native container orchestrator, fully managed and without Kubernetes; runs on EC2 or Fargate.' },
    { name: 'Amazon EKS', summary: 'Managed Kubernetes: AWS runs the control plane and you use the community tooling.' },
    { name: 'AWS Fargate', summary: 'Serverless compute engine for ECS and EKS containers: no instances to provision or scale.' },
    { name: 'AWS Elastic Beanstalk', summary: 'You upload the code and AWS creates instances, load balancing, scaling and monitoring; no extra charge for the service.' },
    { name: 'Amazon Lightsail', summary: 'Virtual servers and resources bundled at a low, predictable monthly price, for simple projects.' },
    { name: 'AWS Batch', summary: 'Runs batch jobs at any scale: job queues and capacity provisioned based on demand.' },
    { name: 'AWS Outposts', summary: 'AWS infrastructure installed in your own data center, with the same APIs, managed by AWS.' },
  ],
  cards: [
    {
      id: 'compute-1',
      prompt:
        'An architecture studio in Santiago needs virtual servers with GPUs for rendering. It wants to pick the exact instance type and install its own drivers on the operating system. What does it use?',
      options: [
        { service: 'AWS Lambda', why: 'Lambda runs functions without you managing servers; it does not let you choose GPU instances or install drivers.' },
        { service: 'Amazon EC2', why: 'EC2 provides virtual servers where you choose the instance type, including GPU ones, and control the operating system.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk deploys web applications for you; it is not meant for choosing rendering hardware and managing the server.' },
        { service: 'Amazon Lightsail', why: 'Lightsail offers simple fixed-price server plans; the broad range of instance types lives in EC2.' },
      ],
      answer: 'Amazon EC2',
      topicSlug: 'ec2-compute',
    },
    {
      id: 'compute-2',
      prompt:
        'A logistics company in Lima wants virtual servers where it controls the operating system, sizes CPU and memory to its workload, and can buy Spot capacity or use Savings Plans. Which service does it use?',
      options: [
        { service: 'Amazon EC2', why: 'EC2 gives you instances with operating system control and the On-Demand, Spot, Savings Plans and Reserved Instances purchase options.' },
        { service: 'AWS Fargate', why: 'Fargate runs containers without you seeing or managing the servers; it gives no access to the operating system.' },
        { service: 'AWS Lambda', why: 'Lambda runs serverless functions; you do not manage an operating system or choose instances.' },
      ],
      answer: 'Amazon EC2',
      topicSlug: 'ec2-compute',
    },
    {
      id: 'compute-3',
      prompt:
        'A real estate agency in Quito wants to create a thumbnail every time a photo is uploaded to its bucket. Each run takes a few seconds, and they do not want to manage servers or pay when there are no photos. What does it use?',
      options: [
        { service: 'Amazon EC2', why: 'With EC2 you pay for the running instance even when no photos arrive, and you manage it.' },
        { service: 'AWS Batch', why: 'AWS Batch queues large batch jobs; to react to each upload within seconds, an event-driven function is simpler.' },
        { service: 'AWS Lambda', why: 'Lambda runs code in response to events, such as an upload to the bucket, with no servers and billing per request and duration.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk keeps instances running for a web application; it is not an event trigger billed by usage.' },
      ],
      answer: 'AWS Lambda',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-4',
      prompt:
        'A hotel in Cartagena must send an email every time a message arrives in its bookings queue. Each send takes two seconds, and the team only wants to write the function code. What does it use?',
      options: [
        { service: 'Amazon ECS', why: 'ECS orchestrates containers; you would have to package and run a service when a single function is enough here.' },
        { service: 'AWS Lambda', why: 'Lambda runs a function for each message in the queue, with no servers; a two-second job is well under the 15 minutes per invocation.' },
        { service: 'Amazon Lightsail', why: 'Lightsail gives you a fixed-price server that you pay for even when no messages arrive, and you manage it.' },
        { service: 'Amazon EC2', why: 'EC2 means keeping and paying for an instance waiting for messages; the team only wants to write code.' },
      ],
      answer: 'AWS Lambda',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-5',
      prompt:
        'A small team in Guadalajara packages its microservices in Docker containers. It wants the simpler, AWS-native orchestrator, without having to learn Kubernetes. What does it choose?',
      options: [
        { service: 'Amazon EKS', why: 'EKS is managed Kubernetes; exactly what the team does not want to learn.' },
        { service: 'Amazon ECS', why: 'ECS is the fully managed, AWS-native container orchestrator, with best practices built in and no Kubernetes.' },
        { service: 'Amazon Lightsail', why: 'Lightsail has simple container services, but the AWS orchestrator for microservices is ECS.' },
        { service: 'AWS Batch', why: 'AWS Batch schedules batch jobs; it is not the orchestrator for services that run continuously.' },
      ],
      answer: 'Amazon ECS',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-6',
      prompt:
        'A fintech in Bogotá already runs Kubernetes in its data center, with manifests and Helm. It wants to move it to AWS without rewriting anything and have AWS run the control plane. Which service does it use?',
      options: [
        { service: 'Amazon ECS', why: 'ECS is the AWS-native orchestrator and does not use Kubernetes manifests; the deployments would have to be redone.' },
        { service: 'Amazon EKS', why: 'EKS is managed, certified-conformant Kubernetes: AWS runs the control plane and your manifests work unchanged.' },
        { service: 'AWS Fargate', why: 'Fargate is a compute engine for containers, not an orchestrator; with Kubernetes it is used alongside EKS.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk deploys web applications from code; it does not replace a Kubernetes cluster and its tooling.' },
      ],
      answer: 'Amazon EKS',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-7',
      prompt:
        'An insurance company in Panama City wants to standardize its containers on an open-source orchestrator, use its community tools and plugins, and have the cloud run the control plane. What does it use?',
      options: [
        { service: 'Amazon EKS', why: 'EKS runs Kubernetes, the open-source orchestrator, with a managed control plane that is compatible with its tooling.' },
        { service: 'Amazon ECS', why: 'ECS is an AWS-native orchestrator, not open source; it does not use the Kubernetes plugin ecosystem.' },
        { service: 'Amazon EC2', why: 'With EC2 you would have to install and run the control plane yourself; the insurer wants AWS to run it.' },
      ],
      answer: 'Amazon EKS',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-8',
      prompt:
        'An online store in Montevideo already uses the AWS-native container orchestrator, but no longer wants to patch and scale the cluster instances. It wants to pay for the CPU and memory of each task. What does it use?',
      options: [
        { service: 'Amazon EC2', why: 'Running the tasks on EC2 instances is exactly what they do today: they choose, patch and scale those servers.' },
        { service: 'AWS Fargate', why: 'Fargate runs ECS tasks with no servers or EC2 clusters to manage; you define CPU and memory per task.' },
        { service: 'Amazon EKS', why: 'EKS is Kubernetes; switching orchestrators does not solve the problem, which is to stop managing the instances.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk creates and manages its own application environment; it is not serverless capacity for their current tasks.' },
      ],
      answer: 'AWS Fargate',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-9',
      prompt:
        'A team in Santiago uses managed Kubernetes on AWS and wants some pods to run without provisioning nodes or choosing instance types. Which compute option does it use for those pods?',
      options: [
        { service: 'AWS Fargate', why: 'Fargate is serverless compute for containers that works with ECS and EKS: pods run with no nodes to manage.' },
        { service: 'Amazon EC2', why: 'With EC2 the pods run on nodes you choose and manage, exactly what the team wants to avoid.' },
        { service: 'AWS Batch', why: 'AWS Batch schedules batch jobs; it is not the capacity where the pods of a Kubernetes service run.' },
        { service: 'Amazon ECS', why: 'ECS is a different orchestrator; the team already uses Kubernetes and only needs somewhere to run pods serverlessly.' },
      ],
      answer: 'AWS Fargate',
      topicSlug: 'containers-and-serverless',
    },
    {
      id: 'compute-10',
      prompt:
        'A team in Asunción has a Java web app. It wants to upload the code and have AWS create the instances, load balancer, scaling and health monitoring, without paying extra for the tool. What does it use?',
      options: [
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk deploys your code and sets up instances, load balancing, scaling and health; you only pay for the resources it creates.' },
        { service: 'Amazon EC2', why: 'With EC2 they would have to build the instances, load balancer and scaling by hand.' },
        { service: 'Amazon Lightsail', why: 'Lightsail gives you fixed-price servers, but it does not deploy your code or set up automatic scaling for you.' },
        { service: 'AWS Lambda', why: 'Lambda runs functions; a traditional Java web app would have to be redesigned to run as functions.' },
      ],
      answer: 'AWS Elastic Beanstalk',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-11',
      prompt:
        'The PHP developers at a nonprofit in Tegucigalpa know nothing about infrastructure. They want to deploy by uploading a code bundle and still be able to see the AWS resources that get created. What do they use?',
      options: [
        { service: 'Amazon EC2', why: 'EC2 requires configuring servers, networking and scaling, exactly what the team does not know how to do.' },
        { service: 'Amazon ECS', why: 'ECS requires packaging containers and defining tasks and services; it is more than the team wants to manage.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk builds the environment from the uploaded code, and the resources stay in your account where you can see them.' },
      ],
      answer: 'AWS Elastic Beanstalk',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-12',
      prompt:
        'A flower shop in Cuenca wants its WordPress blog on a virtual server with a static IP and DNS, all in a low, predictable monthly plan it can launch in minutes. Which service does it use?',
      options: [
        { service: 'Amazon EC2', why: 'EC2 works, but it bills the instance, storage and data transfer separately; it is not a fixed monthly plan.' },
        { service: 'Amazon Lightsail', why: 'Lightsail bundles a server, a WordPress image, a static IP and DNS for a low, predictable monthly price.' },
        { service: 'AWS Elastic Beanstalk', why: 'Elastic Beanstalk deploys your own code with scaling; for a fixed-price blog it is more than needed.' },
        { service: 'AWS Lambda', why: 'Lambda runs event-driven functions; WordPress needs a web server with PHP and a database.' },
      ],
      answer: 'Amazon Lightsail',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-13',
      prompt:
        'A research center in Bogotá launches thousands of simulations every night; each one runs for 2 to 6 hours. It wants to queue them and have AWS provision capacity for each job. What does it use?',
      options: [
        { service: 'AWS Lambda', why: 'A standard Lambda invocation lasts at most 15 minutes; simulations that run for hours do not fit.' },
        { service: 'AWS Batch', why: 'AWS Batch schedules batch jobs in queues and provisions capacity based on what each job requests, with no extra software.' },
        { service: 'Amazon EC2', why: 'With EC2 you would have to build your own queues and scale the instances yourself.' },
        { service: 'Amazon ECS', why: 'ECS orchestrates containers, but you would have to build the job queue and its scheduling yourself.' },
      ],
      answer: 'AWS Batch',
      topicSlug: 'other-compute-services',
    },
    {
      id: 'compute-14',
      prompt:
        'A hospital in Mexico City must process data from its equipment inside the building, with very low latency, but wants the same AWS APIs and tools, on hardware that AWS operates. What does it use?',
      options: [
        { service: 'AWS Outposts', why: 'Outposts brings AWS capacity to your site, operated by AWS, with the same APIs for low latency and local processing.' },
        { service: 'Amazon EC2', why: 'EC2 instances in a Region run in AWS data centers, not inside the hospital.' },
        { service: 'Amazon Lightsail', why: 'Lightsail runs in AWS Regions; it does not bring hardware into the customer building.' },
      ],
      answer: 'AWS Outposts',
      topicSlug: 'other-compute-services',
    },
  ],
};
