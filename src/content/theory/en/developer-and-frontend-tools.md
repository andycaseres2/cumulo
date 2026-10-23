---
title: "Developer and frontend tools"
summary: "Tools for building, deploying, and troubleshooting applications (CodeBuild, CodePipeline, X-Ray, AWS CLI, and SDKs) and AWS Amplify for web and mobile apps."
domain: "technology-services"
order: 18
examTasks: ["3.8"]
services: ["AWS CodeBuild", "AWS CodePipeline", "AWS X-Ray", "AWS Amplify", "AWS CLI"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/developer-tools.html"
  - "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
  - "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html"
  - "https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html"
  - "https://aws.amazon.com/amplify/"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-out-of-scope-services.html"
quiz:
  - prompt: "A fintech in São Paulo wants its code to be compiled, its tests run, and deployable packages produced, without provisioning or managing build servers. Which service should it use?"
    options:
      - label: "AWS CodePipeline"
        explanation: "CodePipeline orchestrates the entire delivery workflow; the stage that compiles and tests within that workflow is CodeBuild."
      - label: "AWS CodeBuild"
        explanation: "CodeBuild is a fully managed build service that compiles source code, runs tests, and produces ready-to-deploy packages."
        correct: true
      - label: "AWS X-Ray"
        explanation: "X-Ray traces requests to find bottlenecks and errors; it does not compile or test code."
      - label: "AWS Amplify"
        explanation: "Amplify is for building and deploying web and mobile applications; it is not the build and test service the scenario calls for."
  - prompt: "A company's app in Buenos Aires slows down at peak hours. The team wants to follow each request through its microservices, databases, and APIs, and see a trace map to find the bottleneck. Which service should it use?"
    options:
      - label: "An Amazon CloudWatch alarm on latency"
        explanation: "An alarm warns you when the application is slow, but it does not follow each request across services or generate the trace map; X-Ray does that."
      - label: "AWS CloudTrail"
        explanation: "CloudTrail audits who made which API call; it does not measure the performance of application requests."
      - label: "AWS CodePipeline"
        explanation: "CodePipeline automates continuous delivery of software; it does not diagnose request latency."
      - label: "AWS X-Ray"
        explanation: "X-Ray performs distributed tracing and generates a trace map with the client, the front-end service, and the backend services to find bottlenecks."
        correct: true
  - prompt: "The frontend team at a startup in Montevideo wants to publish its React web app by connecting its GitHub repository, so every change is automatically deployed to the AWS global CDN without managing infrastructure. Which service should it use?"
    options:
      - label: "AWS Amplify"
        explanation: "Amplify Hosting offers a Git-based workflow with continuous deployment: every change in the repository is published to the AWS global CDN."
        correct: true
      - label: "Amazon EC2"
        explanation: "With EC2 the team would have to manage servers; for a frontend with continuous deployment from Git, the answer is Amplify."
      - label: "AWS CodeBuild"
        explanation: "CodeBuild compiles and tests code, but it does not host or publish the web app on the global CDN."
      - label: "AWS X-Ray"
        explanation: "X-Ray diagnoses request performance; it does not host or deploy web applications."
practice:
  - prompt: "An e-commerce company in Santiago wants every change in its GitHub repository to automatically go through build, test, and deploy phases according to a model it defines. Which service orchestrates that entire workflow?"
    options:
      - label: "AWS CodePipeline"
        explanation: "CodePipeline is a continuous delivery service that automates the release pipeline and runs build, test, and deploy on every change."
        correct: true
      - label: "AWS CodeBuild"
        explanation: "CodeBuild is the stage that compiles and tests within the workflow; the full orchestration through deployment is done by CodePipeline."
      - label: "AWS X-Ray"
        explanation: "X-Ray traces requests to diagnose latency and errors; it does not automate software delivery."
      - label: "AWS CLI"
        explanation: "The AWS CLI runs commands against AWS services from the terminal; on its own it does not orchestrate build, test, and deploy phases on every change."
  - prompt: "A systems administrator in Asunción wants to use scripts, from the terminal on his Linux laptop, to automate the tasks he currently does by hand in the AWS web console. Which tool should he use?"
    options:
      - label: "AWS Amplify"
        explanation: "Amplify is for building and deploying web and mobile apps; it is not a command tool for the terminal."
      - label: "AWS X-Ray"
        explanation: "X-Ray collects data about an application's requests to diagnose it; it does not run commands against AWS services."
      - label: "AWS CloudTrail"
        explanation: "CloudTrail audits who made which API call; it records actions, but it cannot be used to run them from the terminal."
      - label: "AWS CLI"
        explanation: "The AWS CLI lets you do from the terminal the same things you do in the web console and automate tasks with scripts on Linux, macOS, or Windows."
        correct: true
  - prompt: "The developers of a booking app in Cusco, written in Python, need the application itself to upload files to Amazon S3 by calling AWS from its code. What should they use?"
    options:
      - label: "AWS CodePipeline"
        explanation: "CodePipeline automates software delivery; it is not a library for calling AWS services from the app's code."
      - label: "An AWS SDK"
        explanation: "The AWS SDKs are libraries for languages such as Python that let you call AWS services from the application's code."
        correct: true
      - label: "AWS X-Ray"
        explanation: "X-Ray traces the application's requests to find bottlenecks; it does not upload files to Amazon S3."
      - label: "AWS CodeBuild"
        explanation: "CodeBuild compiles and tests code in a managed service; it is not how the app calls Amazon S3 at runtime."
  - prompt: "At a fintech in Buenos Aires, every time someone pushes code to the repository, that code is automatically compiled and tested to catch errors early. What is this practice called?"
    options:
      - label: "Continuous delivery (CD)"
        explanation: "Continuous delivery automatically moves changes that have already passed tests into testing and production; compiling and testing on every push is CI."
      - label: "Distributed tracing"
        explanation: "Distributed tracing follows requests across services, as X-Ray does; it does not compile or test code."
      - label: "Continuous integration (CI)"
        explanation: "Continuous integration automatically compiles and tests code every time someone pushes it to the repository."
        correct: true
      - label: "Programmatic access"
        explanation: "Programmatic access means using the AWS CLI or SDKs to call AWS APIs; it does not describe compiling and testing on every push."
  - prompt: "The team at a mining company in Antofagasta uses the AWS CLI in its scripts and an AWS SDK inside its Python application. What do the two tools have in common?"
    options:
      - label: "Both are forms of programmatic access to AWS APIs"
        explanation: "The AWS CLI does it with commands in the terminal and the SDKs from code; both avoid manual use of the AWS Management Console."
        correct: true
      - label: "Both compile and test code in a managed service"
        explanation: "Compiling and testing code in a managed service is the job of AWS CodeBuild, not the CLI or the SDKs."
      - label: "Both trace requests across microservices"
        explanation: "Distributed request tracing is done by AWS X-Ray; the CLI and the SDKs are for calling AWS services."
      - label: "Both work only inside the AWS Management Console"
        explanation: "The CLI runs in the Linux, macOS, or Windows terminal and the SDKs run inside code; neither depends on the web console."
  - prompt: "A frontend team in Guadalajara wants to build a web and mobile app and define its authentication and data backend with a code-first approach, without managing servers. Which service should it use?"
    options:
      - label: "Amazon EC2"
        explanation: "With EC2 the team would have to manage servers, exactly what it wants to avoid for its web and mobile app."
      - label: "AWS CodePipeline"
        explanation: "CodePipeline automates software delivery; it does not offer tools to define the backend of a web and mobile app."
      - label: "AWS Amplify"
        explanation: "Amplify brings together everything needed to build and deploy web and mobile apps, and lets you define the backend, such as authentication and data, with code."
        correct: true
      - label: "AWS X-Ray"
        explanation: "X-Ray diagnoses requests in distributed applications; it does not build apps or define their backend."
---

## Why does it matter?

A fintech in São Paulo with teams in Argentina and Uruguay ships changes to its application several times a day. Previously, a developer compiled the code on his laptop, ran tests by hand, and uploaded the files to the server. Errors were frequent and nobody knew why the app slowed down at peak hours.

AWS offers tools to **automate building and delivering** software, to **find the cause of performance problems**, and to **publish web and mobile applications** without managing servers. The exam will ask you to identify which one to use in each case.

## CI/CD: the concept

- **Continuous integration (CI)**: every time someone pushes code to the repository, it is **compiled and tested automatically**. Errors are caught early.
- **Continuous delivery or deployment (CD)**: changes that pass the tests move **automatically** into test and production environments.

A **pipeline** is the automated sequence of stages: source code → build → test → deploy.

## AWS CodeBuild: build and test

**AWS CodeBuild** is a **fully managed** build service that **compiles source code, runs tests, and produces packages** that are ready to deploy. You do not need to provision or manage build servers: it scales continuously and processes multiple builds at the same time, so they are not left waiting in a queue. You can use prepackaged or custom build environments.

## AWS CodePipeline: orchestrate delivery

**AWS CodePipeline** is a fully managed **continuous delivery** service that **automates your release pipelines**. Every time there is a code change, it runs the **build, test, and deploy** phases according to the model you define. It integrates with third-party services such as GitHub and, of course, with CodeBuild. You pay only for what you use.

Key relationship: **CodePipeline orchestrates** the whole workflow; **CodeBuild** is the stage that compiles and tests within that workflow.

## AWS X-Ray: troubleshooting distributed applications

**AWS X-Ray** collects data about the **requests** your application serves and gives you tools to analyze them. For each traced request, it shows details of the request and of the calls the application makes to other resources: microservices, databases, web APIs, and AWS services.

This is called **distributed tracing**. Using the trace data, X-Ray generates a **trace map** that shows the client, the front-end service, and the backend services. It helps you find **bottlenecks**, latency spikes, and errors, both in development and in production.

**X-Ray vs. CloudWatch vs. CloudTrail:** X-Ray follows the path of a request across services; CloudWatch monitors metrics, logs, and alarms (its console can also display the traces X-Ray collects); CloudTrail audits who made which API call.

## AWS CLI and SDKs: programmatic access

- **AWS CLI** (*Command Line Interface*): an open source tool for interacting with AWS services using **commands in the terminal** (Linux, macOS, or Windows). It lets you do from the command line the same things you do in the web console and **automate tasks with scripts**.
- **AWS SDKs** (*Software Development Kits*): libraries for languages such as Java, Python, Ruby, or .NET that let you call AWS services **from your application's code**.

Both are forms of **programmatic access** to AWS APIs, as opposed to manual use of the AWS Management Console.

## AWS Amplify: web and mobile frontend

The **frontend** is the part of the application the user sees and uses (the web page or the phone app). **AWS Amplify** brings together everything needed to **build and deploy web and mobile applications**.

- **Amplify Hosting**: a **Git-based** workflow for hosting serverless *full-stack* web applications with **continuous deployment**. You connect your repository (GitHub, Bitbucket, GitLab, or AWS CodeCommit) and every change is automatically published to the **AWS global CDN**.
- Supports popular frameworks such as React, Angular, Vue.js, Next.js, and static site generators.
- Offers per-environment branches (production, test), custom domains, and *pull request* previews.
- Lets you define the application's **backend** (for example, authentication and data) with a code-first approach.

If the scenario says "a frontend team wants to publish its web or mobile app quickly, without managing infrastructure", the answer is **Amplify**.

## What is out of scope

The official list of services **out of scope** for CLF-C02 includes, among developer tools, AWS CodeDeploy, AWS CodeArtifact, Amazon CodeGuru, AWS CloudShell, AWS Device Farm, and AWS Application Composer. It is enough to recognize their names; the exam focuses on CodeBuild, CodePipeline, X-Ray, the AWS CLI, and Amplify.

## Common exam traps

- **Confusing CodeBuild with CodePipeline.** CodeBuild compiles and tests; CodePipeline automates the entire delivery workflow.
- **Choosing CloudWatch to follow a request across microservices.** For distributed tracing and a service map, the answer is **X-Ray**.
- **Choosing CloudTrail to diagnose latency.** CloudTrail records API calls for auditing, not request performance.
- **Choosing EC2 to host a simple frontend.** For web and mobile apps with continuous deployment from Git, the answer is **Amplify**.

## Exam summary

- CI = compile and test automatically; CD = automatically deliver what passes the tests.
- CodeBuild = managed builds and tests, without your own servers.
- CodePipeline = continuous delivery that orchestrates source → build → test → deploy.
- X-Ray = distributed tracing and a trace map to find bottlenecks and errors.
- AWS CLI = commands in the terminal; SDKs = access from code.
- Amplify = build and deploy web and mobile apps with continuous deployment from Git.
