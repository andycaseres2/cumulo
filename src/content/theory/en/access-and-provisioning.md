---
title: "Ways to access and provision: console, CLI, SDKs, and IaC"
summary: "Compare the console, the CLI, the SDKs, the APIs, and infrastructure as code (CloudFormation) to decide how to operate in AWS in each scenario."
domain: "technology-services"
order: 1
examTasks: ["3.1"]
services: ["AWS Management Console", "AWS CLI", "AWS CloudFormation", "AWS CDK"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html"
  - "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html"
  - "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
  - "https://docs.aws.amazon.com/sdkref/latest/guide/overview.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"
quiz:
  - prompt: "A fintech in Lima needs identical development, test, and production environments. It wants to describe all its resources in JSON or YAML templates stored in version control and create them as a single unit. Which service should it use?"
    options:
      - label: "AWS Management Console"
        explanation: "The console is convenient for one-off tasks, but clicks cannot be repeated exactly or versioned like a template."
      - label: "AWS SDKs"
        explanation: "SDKs are used inside an application's code to call services; they do not provision infrastructure from JSON or YAML templates."
      - label: "AWS CloudFormation"
        explanation: "CloudFormation creates the resources described in a JSON or YAML template as a stack managed as a single unit, consistently and repeatably."
        correct: true
      - label: "Direct Query API"
        explanation: "The Query API consists of low-level HTTPS calls where your application signs the requests; it does not work with templates or stacks."
  - prompt: "An insurance company in Montevideo has a Python app that must upload files to AWS from its own code, without having to sign requests or handle retries by hand. What should it use?"
    options:
      - label: "AWS CLI"
        explanation: "The CLI is used with commands in the terminal and for scripts; access from an application's code is the job of the SDK."
      - label: "AWS SDK for Python (Boto3)"
        explanation: "SDKs are language-specific libraries used inside the application's code, and they take care of signing requests, retrying, and handling errors."
        correct: true
      - label: "AWS CloudFormation"
        explanation: "CloudFormation provisions infrastructure from templates; it is not a library an application uses to upload files from its code."
      - label: "AWS Management Console"
        explanation: "The console is a web interface you use by hand in the browser; an application cannot use it from its code."
  - prompt: "A pharmacy chain in Caracas keeps its own data center and connects it to resources it deploys in AWS. Which deployment model is it using?"
    options:
      - label: "Cloud"
        explanation: "In the cloud model the entire application runs in the cloud, but this company keeps its own data center."
      - label: "On-premises (private cloud)"
        explanation: "On-premises deploys resources only in your own facilities using virtualization, without using resources in AWS."
      - label: "Infrastructure as code"
        explanation: "Infrastructure as code is a way to provision resources with text files, not a deployment model."
      - label: "Hybrid"
        explanation: "The hybrid model connects cloud resources with existing infrastructure outside the cloud, usually your own data center."
        correct: true
practice:
  - prompt: "The systems administrator at a university in Córdoba wants a bash script that lists and stops AWS resources every night using commands in the terminal. Which tool should they use?"
    options:
      - label: "AWS CLI"
        explanation: "The AWS CLI lets you interact with services using commands in the terminal and write scripts to automate repetitive tasks."
        correct: true
      - label: "AWS Management Console"
        explanation: "The console is a web interface you use by hand; clicks cannot be scheduled like a nightly script."
      - label: "AWS CloudFormation"
        explanation: "CloudFormation provisions infrastructure from templates; it is not a command tool for listing and stopping resources every night."
      - label: "AWS CDK"
        explanation: "The CDK defines infrastructure with programming languages and provisions it through CloudFormation; it is not a command tool for nightly administrative tasks."
  - prompt: "An intern at a digital agency in Valparaíso wants to explore an AWS service she doesn't know, visually, without programming, and run a quick one-time test. What should she use?"
    options:
      - label: "AWS CLI"
        explanation: "The CLI requires typing commands in the terminal; to explore a service visually, the console is a better fit."
      - label: "AWS CloudFormation"
        explanation: "CloudFormation is meant for repeatable processes with templates; a one-time visual test does not require writing a template."
      - label: "AWS Management Console"
        explanation: "The console is the web interface: visual, no programming required, and ideal for learning, exploring services, and doing one-off tasks."
        correct: true
      - label: "Direct Query API"
        explanation: "The Query API consists of low-level HTTPS calls that must be signed; it is not visual or suitable for someone who doesn't program."
  - prompt: "A regulator requires a bank in Guatemala to be able to quickly rebuild its entire infrastructure in another AWS Region if a disaster occurs. Which approach does AWS recommend?"
    options:
      - label: "Document the steps to recreate everything by hand from the AWS Management Console"
        explanation: "Repeating clicks in the console is slow, prone to human error, and hard to audit; it is not a repeatable process for fast recovery."
      - label: "Use the AWS SDKs inside the application's code"
        explanation: "SDKs let an application use AWS services from its code; they are not the infrastructure as code approach AWS recommends for rebuilding everything repeatably."
      - label: "Make direct calls to the Query API"
        explanation: "The Query API is the lowest-level access, where you must sign requests and handle errors; it is not a repeatable process for rebuilding infrastructure."
      - label: "Deploy with infrastructure as code using AWS CloudFormation"
        explanation: "AWS recommends deploying with IaC so you can quickly rebuild a workload in a disaster recovery Region; templates can be reused in other Regions."
        correct: true
  - prompt: "The development team at a fintech in San José prefers to define its infrastructure in TypeScript, a programming language it already knows, instead of writing JSON or YAML templates, and have it provisioned through CloudFormation. What should it use?"
    options:
      - label: "AWS CLI"
        explanation: "The CLI runs commands in the terminal; it does not define infrastructure in TypeScript to provision it through CloudFormation."
      - label: "AWS CDK"
        explanation: "The AWS CDK lets you define infrastructure with familiar programming languages and provisions it through CloudFormation."
        correct: true
      - label: "AWS Management Console"
        explanation: "The console is a web interface for manual tasks; it does not let you define infrastructure as code in TypeScript."
      - label: "Direct Query API"
        explanation: "The Query API consists of low-level HTTPS calls; it does not generate CloudFormation stacks from TypeScript code."
  - prompt: "A new team member at a logistics company in Monterrey believes some AWS actions can only be done from the console. Which statement is correct?"
    options:
      - label: "The CLI uses a separate, private API that is different from the one the SDKs use"
        explanation: "The CLI and the SDKs use the same public service APIs; they are just different ways of making those calls."
      - label: "Every action ends up as a call to the service API, which the console, the CLI, and the SDKs all use under the hood"
        explanation: "In AWS every action is a call to the service's public API over HTTPS, signed with credentials; the tools are more convenient ways of making it."
        correct: true
      - label: "The console has IaaS management features that do not exist in the API"
        explanation: "AWS states that the IaaS management features in the console are also available in the API and the CLI."
      - label: "Outside the console, CloudFormation is the only way to create resources"
        explanation: "The CLI, the SDKs, and the Query API also create resources, because they all use the service APIs."
  - prompt: "In AWS CloudFormation, what is a stack?"
    options:
      - label: "The JSON or YAML file that describes the resources and their properties"
        explanation: "That file is the template; the stack is what CloudFormation creates when you use it."
      - label: "A language-specific library for using AWS from an application's code"
        explanation: "That describes an SDK, such as Boto3 for Python; it has nothing to do with CloudFormation stacks."
      - label: "The collection of resources created from a template, managed as a single unit"
        explanation: "A stack groups the resources of a template: they are created, updated, and deleted together as a unit."
        correct: true
      - label: "A log of API calls for auditing who made each change"
        explanation: "A stack is not an audit log; it is the collection of resources that CloudFormation manages as a unit."
---

## Why does it matter?

A fintech in Lima starts out with a single developer who creates its first server by clicking around in the browser. A year later it has three environments (development, test, and production) that must be identical, a team that automates tasks with scripts, and an app that needs to upload files to AWS from its own code. On top of that, the regulator asks it to be able to rebuild its entire infrastructure in another Region if a disaster occurs.

Each of those needs is solved with a different way of accessing AWS. The exam will ask you to choose the right one for the scenario.

## Everything in AWS is an API

An **API** (*Application Programming Interface*) is a set of operations a program can invoke. In AWS, **every action** (launching an instance, deleting a bucket, reading a table) ends up as a call to the service's public API, made over HTTPS and signed with credentials. The other tools are more convenient ways of making those calls:

- **AWS Management Console:** the web interface in the browser. It is visual, requires no programming, and is ideal for learning, exploring services, or doing one-off tasks.
- **AWS CLI** (*Command Line Interface*): an open source tool for interacting with services using **commands** in the terminal (bash, zsh, PowerShell, or the Windows command prompt). It gives direct access to the public APIs and lets you write **scripts** to automate tasks. AWS states that the IaaS management features available in the console are also available in the API and the CLI.
- **AWS SDKs** (*Software Development Kits*): libraries for languages such as Python (Boto3), Java, JavaScript, .NET, Go, PHP, Ruby, and others. They are used **inside your application's code** and take care of details such as signing requests, retrying, and handling errors.
- **Query API / direct API:** low-level HTTPS calls. It is the most direct access, but your application must sign the requests and handle errors itself, which is why an SDK is usually preferred.

The CLI, the SDKs, and the APIs are collectively called **programmatic access**.

## Infrastructure as code (IaC) with AWS CloudFormation

**Infrastructure as code** (IaC) means describing your resources in text files and letting a tool create them for you, instead of creating them by hand.

**AWS CloudFormation** is the AWS IaC service:

- You write a **template** in **JSON or YAML** format that describes all the resources and their properties (for example, Amazon EC2 instances, a load balancer, and an Amazon RDS database).
- When you use the template, CloudFormation creates a **stack**: the collection of resources managed **as a single unit**. CloudFormation resolves the dependencies and provisions everything in the right order. If you delete the stack, its resources are deleted.
- You can **reuse** the same template to create the same resources again and again, in the same Region or across multiple Regions and accounts, **consistently and repeatably**.
- Because templates are text files, you can store them in a version control system, see what changed, who changed it, and when, and roll back to a previous version if something fails.

**AWS CDK** (*Cloud Development Kit*) lets you define infrastructure with familiar programming languages; the CDK provisions it through CloudFormation.

## One-time operations vs repeatable processes

The exam checks whether you know when a manual action is enough and when it is better to automate.

| Situation | Recommended approach | Typical tool |
| --- | --- | --- |
| Exploring a new service or running a quick test | One-time, manual operation | AWS Management Console |
| A recurring administrative task (for example, listing or stopping resources every night) | Automated script | AWS CLI |
| An application that must use AWS services from its code | Programmatic integration | AWS SDKs |
| Identical environments (development, test, production) or deployment across multiple Regions | Repeatable, versioned process | AWS CloudFormation (IaC) |
| Rebuilding infrastructure after a disaster | Repeatable process | AWS CloudFormation (IaC) |

The key idea: the console is convenient for **one-off** tasks, but clicks cannot be repeated exactly or audited easily. When a process must be **repeatable, consistent, and free of human error**, the answer is **automation**: scripts with the CLI or, for complete infrastructure, **IaC**. AWS recommends deploying with IaC so you can quickly rebuild a workload in a disaster recovery Region.

## Deployment models: cloud, hybrid, and on-premises

This exam task also includes identifying the **deployment model**:

- **Cloud:** the entire application runs in the cloud.
- **Hybrid:** connects cloud resources with existing infrastructure outside the cloud, usually your own data center.
- **On-premises (private cloud):** resources deployed in your own facilities with virtualization tools; it does not offer many of the benefits of the cloud.

This is covered in more detail in the service and deployment models topic.

## Common exam traps

- **Choosing the console for something that must be repeated many times.** If the scenario says "repeatable", "consistent", or "multiple environments", think **CloudFormation**.
- **Confusing the CLI with the SDK.** The CLI is used from the **terminal**; the SDK is used **inside the code** of an application.
- **Believing CloudFormation is a monitoring or code deployment service.** It is for **provisioning infrastructure** from templates.
- **Thinking the console is the only way in.** Everything can be done through the API, and the CLI and SDKs use those same APIs.
- **Forgetting the stack.** The resources in a template are managed together as a **stack**: they are created, updated, and deleted as a unit.

## Exam summary

- Every action in AWS is an API call.
- Console = web interface; ideal for learning and one-off tasks.
- CLI = commands in the terminal; ideal for scripts and automation.
- SDK = language-specific libraries for using AWS from an application's code.
- IaC = describing infrastructure in text files.
- CloudFormation: JSON/YAML templates → stacks managed as a unit.
- Templates are reusable across Regions and accounts and can be versioned like code.
- One-time operation → console; repeatable process → CLI or IaC.
- Deployment models: cloud, hybrid, and on-premises.
