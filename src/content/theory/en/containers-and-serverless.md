---
title: "Containers and serverless: ECS, EKS, Fargate, and Lambda"
summary: "What a container is, when to use Amazon ECS or Amazon EKS, what Amazon ECR is for, and how AWS Fargate and AWS Lambda remove server management."
domain: "technology-services"
order: 5
examTasks: ["3.3"]
services: ["Amazon ECS", "Amazon EKS", "Amazon ECR", "AWS Fargate", "AWS Lambda"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
  - "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
  - "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html"
  - "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
  - "https://docs.aws.amazon.com/eks/latest/userguide/fargate.html"
  - "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
  - "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html"
quiz:
  - prompt: "A delivery platform in Medellín wants to run a short function that generates a thumbnail every time a customer uploads a photo of a receipt to Amazon S3, paying per request and execution time, without managing servers. Which service should it use?"
    options:
      - label: "Amazon ECR"
        explanation: "Amazon ECR only stores container images; it does not run code when an event occurs."
      - label: "Amazon EC2"
        explanation: "Amazon EC2 gives you full control of the server, but you manage it and pay to keep it running even when there are no events."
      - label: "AWS Lambda"
        explanation: "Lambda runs event-driven functions, such as on an S3 upload, without provisioning servers, and you pay per request and execution time."
        correct: true
      - label: "Amazon ECS"
        explanation: "Amazon ECS orchestrates containers; it is not a function service triggered directly by each S3 upload."
  - prompt: "The team at a fintech in Quito already uses Kubernetes on premises and wants to bring its applications to AWS without rewriting them, using community tools, with a control plane managed by AWS. Which service should it choose?"
    options:
      - label: "Amazon EKS"
        explanation: "Amazon EKS is managed Kubernetes: AWS manages the control plane and, because it is Kubernetes-conformant, you can use community tools and applications without rewriting them."
        correct: true
      - label: "Amazon ECS"
        explanation: "Amazon ECS uses AWS's own orchestrator, not Kubernetes; the scenario mentions Kubernetes, which points to EKS."
      - label: "Amazon ECR"
        explanation: "Amazon ECR is a container image registry; it stores images but does not orchestrate or run containers."
      - label: "AWS Lambda"
        explanation: "Lambda runs event-driven functions; it is not a Kubernetes orchestrator for containerized applications."
  - prompt: "A startup in Asunción orchestrates its containers with Amazon ECS and wants to stop provisioning, configuring, and scaling EC2 instances to run them; it only wants to specify CPU and memory per task. What should it use?"
    options:
      - label: "Amazon ECR"
        explanation: "Amazon ECR stores container images; it does not provide the compute capacity where tasks run."
      - label: "Larger Amazon EC2 instances"
        explanation: "Switching to larger EC2 instances still forces the startup to choose and manage them, which is exactly what it wants to avoid."
      - label: "AWS Lambda"
        explanation: "Lambda runs event-driven functions; it is not the capacity option that Amazon ECS tasks run on."
      - label: "AWS Fargate"
        explanation: "Fargate is a serverless compute engine for ECS and EKS containers: you specify CPU and memory and do not provision or scale virtual machines."
        correct: true
practice:
  - prompt: "A software company in Rosario needs a managed place to store, manage, and share its container images in private repositories, and also scan them for vulnerabilities. Which service should it use?"
    options:
      - label: "Amazon ECS"
        explanation: "Amazon ECS runs and orchestrates containers; it is not the registry where images are stored and scanned."
      - label: "Amazon ECR"
        explanation: "Amazon ECR is a managed container image registry with private or public repositories, and it can scan images for vulnerabilities."
        correct: true
      - label: "AWS Fargate"
        explanation: "AWS Fargate is the serverless compute engine where containers run; it does not store or share images."
      - label: "AWS Lambda"
        explanation: "AWS Lambda runs event-driven functions; it is not a container image repository."
  - prompt: "A movie theater chain in San Salvador wants to orchestrate its containers on AWS. Its team does not use Kubernetes and is looking for the simplest, most integrated option, with AWS's own orchestrator and no control plane to manage. Which service fits best?"
    options:
      - label: "Amazon ECR"
        explanation: "Amazon ECR only stores container images; it does not decide where containers run or restart them."
      - label: "AWS Fargate"
        explanation: "AWS Fargate is a serverless compute engine for containers, not an orchestrator; it has to work together with ECS or EKS."
      - label: "Amazon ECS"
        explanation: "Amazon ECS is AWS's own fully managed container orchestration service, the simplest and most integrated option, with no control plane to manage."
        correct: true
      - label: "AWS Lambda"
        explanation: "AWS Lambda runs event-driven functions; it is not a container orchestrator."
  - prompt: "A genomics lab in Lima wants to use AWS Lambda to run an analysis process that takes about three hours per run. Why is Lambda not the right choice for this task?"
    options:
      - label: "Because Lambda does not scale automatically with traffic"
        explanation: "Lambda does scale automatically, creating and destroying execution environments based on traffic; that is not the problem here."
      - label: "Because Lambda requires you to provision and patch servers"
        explanation: "Lambda runs code without provisioning or managing servers; AWS takes care of provisioning and patching."
      - label: "Because Lambda can only be triggered by uploads to Amazon S3"
        explanation: "Lambda accepts several triggers, such as Amazon SQS, Amazon EventBridge, or Amazon API Gateway, in addition to Amazon S3."
      - label: "Because an invocation of an event-driven function can last at most 15 minutes"
        explanation: "An invocation of a Lambda event-driven function lasts at most 15 minutes (900 seconds); for processes that take hours, containers or AWS Batch are a better fit."
        correct: true
  - prompt: "The manager of a transportation company in Santa Cruz de la Sierra believes \"serverless\" means the application runs without any physical server. What does serverless really mean?"
    options:
      - label: "That the servers exist, but AWS takes care of provisioning, scaling, patching, and maintaining them"
        explanation: "Serverless does not eliminate servers: AWS manages them and you pay only for what you use, focusing on your code."
        correct: true
      - label: "That the application runs with no physical servers anywhere"
        explanation: "Believing serverless means \"no physical servers\" is a classic trap; the servers exist, but you don't manage them."
      - label: "That you manage the operating system, but AWS pays for the hardware"
        explanation: "Managing the operating system belongs to a model like Amazon EC2; in serverless you do not manage the servers."
      - label: "That you pay a fixed monthly fee regardless of usage"
        explanation: "In serverless you pay for usage, for example per request and execution time in Lambda, not a fixed fee."
  - prompt: "The developers at a travel agency in Cusco suffer from the \"it works on my machine\" problem: in production, library versions break. Which concept packages the code together with its dependencies so the application runs the same from one environment to another?"
    options:
      - label: "An orchestrator"
        explanation: "An orchestrator decides where containers run, restarts them if they fail, and scales them; it does not package code with its dependencies."
      - label: "A container"
        explanation: "A container is a standard unit of software that packages code and its dependencies so it runs quickly and reliably across environments."
        correct: true
      - label: "A control plane"
        explanation: "The control plane is the part that manages the orchestrator, such as the Kubernetes one in EKS; it does not package applications."
      - label: "A Lambda trigger"
        explanation: "A trigger connects an event, such as an S3 upload, to a Lambda function; it does not solve library differences between environments."
  - prompt: "In an architecture meeting at an insurance company in Valparaíso, someone proposes \"replacing Amazon EKS with AWS Fargate as the orchestrator\". What role does Fargate actually play?"
    options:
      - label: "It is a container image registry, like Amazon ECR"
        explanation: "The image registry is Amazon ECR; Fargate provides the compute capacity where containers run."
      - label: "It is an event-driven function service, like AWS Lambda"
        explanation: "Lambda is the event-driven function service; Fargate runs ECS and EKS containers."
      - label: "It is the serverless compute engine where containers run; the orchestrator is still ECS or EKS"
        explanation: "Fargate is a serverless compute engine for containers that works with ECS and EKS; thinking it is an orchestrator is a classic trap."
        correct: true
      - label: "It is a Kubernetes orchestrator that replaces the EKS control plane"
        explanation: "Fargate is not an orchestrator; in EKS, AWS manages the Kubernetes control plane and Fargate only provides the compute."
---

## Why does it matter?

A delivery platform in Medellín has an app split into small services: orders, payments, and courier tracking. On the developers' laptops everything works, but in production the library versions break. On top of that, every time a customer uploads a photo of a receipt, a thumbnail has to be generated, and that task happens only a few times per minute.

**Containers** solve the "it works on my machine" problem, and the **serverless** model lets you run code only when an event occurs, without keeping servers running. The exam will ask you to choose between ECS, EKS, Fargate, and Lambda.

## What is a container?

A **container** is a standard unit of software that **packages code and its dependencies** so the application runs quickly and reliably from one environment to another. Containers are run from a **container image** (the template with the code and its dependencies). Docker and OCI (*Open Container Initiative*) images are common formats.

Containers are lightweight and portable, but when you have dozens or hundreds of them you need an **orchestrator**: a service that decides where they run, restarts them if they fail, and scales them.

## Amazon ECS, Amazon EKS, and Amazon ECR

- **Amazon Elastic Container Service (Amazon ECS):** AWS's own **fully managed container orchestration** service. It comes with AWS configuration and operational best practices built in and integrates with tools such as Amazon ECR and Docker. You do not have to manage a control plane.
- **Amazon Elastic Kubernetes Service (Amazon EKS):** a **managed Kubernetes** service. **Kubernetes** is an open source container orchestrator widely used in the industry. In EKS, AWS manages the Kubernetes control plane; with **EKS Auto Mode**, AWS also manages the nodes where workloads run. EKS is certified Kubernetes-conformant, so you can use community tools and applications without rewriting them.
- **Amazon Elastic Container Registry (Amazon ECR):** a managed **container image registry**. You store, manage, and share your images in private (or public) repositories and use them from ECS or EKS. It can scan images for vulnerabilities.

| Question | Amazon ECS | Amazon EKS |
| --- | --- | --- |
| Which orchestrator does it use? | AWS's own | Kubernetes (open source) |
| When should I choose it? | You want the simplest, most integrated way to run containers on AWS | You already use Kubernetes, or you want portability or tools from its ecosystem |
| Where do the containers run? | EC2 instances, AWS Fargate, or other capacity options | EC2 instances, AWS Fargate, or other capacity options |

ECR does not run containers: **it only stores images**.

## AWS Fargate: containers without servers

ECS or EKS containers need compute capacity. You can use **EC2 instances** that you choose and manage, or use **AWS Fargate**.

**AWS Fargate** is a **serverless**, pay-as-you-go compute engine for containers. With Fargate:

- You do not provision, configure, or scale virtual machines.
- You do not choose server types or decide when to scale the cluster.
- You package your application in containers, specify CPU and memory, define networking and permissions, and launch it.
- Each task (in ECS) or Pod (in EKS) has its own isolation boundary and does not share a kernel, CPU, or memory with others.

Fargate works with **Amazon ECS and Amazon EKS**.

## AWS Lambda: serverless functions

**Serverless** does not mean there are no servers; it means **you don't manage them**: AWS takes care of provisioning, scaling, patching, and maintenance, and you pay only for what you use.

**AWS Lambda** is a serverless compute service that **runs code without provisioning or managing servers**:

- **Event-driven:** you write a function and connect it to a trigger, for example an upload to Amazon S3, a message from Amazon SQS, an Amazon EventBridge rule, or a request from Amazon API Gateway. Lambda runs it when the event occurs.
- **Scales automatically:** it creates and destroys execution environments based on traffic.
- **Pay for use:** no upfront commitments; for event-driven functions you pay per request and for execution time.
- **Limited duration:** an invocation of an event-driven function can last **at most 15 minutes (900 seconds)**. For very long processes, consider other options such as containers or AWS Batch.

In the opening example, generating the thumbnail when a receipt is uploaded to S3 is a classic Lambda use case.

## Which one do I choose?

| Scenario | Option |
| --- | --- |
| Run short code in response to events, without servers | **AWS Lambda** |
| Run containers without managing servers | **AWS Fargate** (with ECS or EKS) |
| Orchestrate containers with the AWS native tool | **Amazon ECS** |
| Orchestrate containers with Kubernetes | **Amazon EKS** |
| Store container images | **Amazon ECR** |
| Full control of the server's operating system | **Amazon EC2** |

## Common exam traps

- **Thinking Fargate is an orchestrator.** Fargate is the **serverless compute engine**; the orchestrator is ECS or EKS.
- **Confusing ECR with ECS.** ECR **stores** images; ECS **runs and orchestrates** containers.
- **Choosing ECS when the scenario mentions Kubernetes.** "Kubernetes" points to **EKS**.
- **Using Lambda for processes that take several hours.** An invocation of an event-driven function can last at most 15 minutes.
- **Believing serverless means "no physical servers".** The servers exist, but AWS manages them.

## Exam summary

- Container = code + dependencies packaged together; portable across environments.
- ECS = AWS's own managed container orchestrator.
- EKS = managed Kubernetes; AWS manages the control plane.
- ECR = container image registry.
- Fargate = serverless compute for ECS and EKS containers.
- Lambda = event-driven serverless functions, pay for use.
- A Lambda invocation (event-driven function) can last at most 15 minutes.
- Serverless = AWS manages servers, scaling, and patching; you focus on the code.
