---
title: "Service and deployment models"
summary: "Tell IaaS, PaaS and SaaS apart, and cloud, hybrid and on-premises deployments, based on how much each party controls and manages."
domain: "cloud-concepts"
order: 2
examTasks: ["1.1", "3.1"]
services: ["Amazon EC2", "AWS Elastic Beanstalk", "AWS Outposts"]
readingMinutes: 6
sources:
  - "https://aws.amazon.com/types-of-cloud-computing/"
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html"
  - "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"
  - "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html"
quiz:
  - prompt: "The team at a pharmacy chain in Guadalajara rents virtual servers on Amazon EC2 and is responsible for installing and patching the operating system. Which service model is it using?"
    options:
      - label: "SaaS (Software as a Service)"
        explanation: "In SaaS the provider runs and manages a complete application and you just use it; here the team manages the operating system."
      - label: "PaaS (Platform as a Service)"
        explanation: "In PaaS the provider manages the hardware and the operating system; if the team patches the operating system, it is not PaaS."
      - label: "IaaS (Infrastructure as a Service)"
        explanation: "IaaS provides the basic building blocks (compute, networking, storage) with the most control; on Amazon EC2 you install and update the operating system."
        correct: true
      - label: "Hybrid deployment model"
        explanation: "Hybrid is a deployment model (where the application lives), not a service model; the question is how much the team manages."
  - prompt: "A startup in Medellín wants to upload the code of its ordering app and have AWS provision the EC2 instances and configure load balancing, health monitoring and scaling. Which AWS service suits it?"
    options:
      - label: "Amazon EC2, managing the instances itself"
        explanation: "With Amazon EC2 directly, the startup would have to manage the servers and the operating system itself; it only wants to upload its code."
      - label: "AWS Elastic Beanstalk"
        explanation: "With AWS Elastic Beanstalk you build and upload your application, and the service provisions EC2 and configures load balancing, health monitoring and scaling (a PaaS approach)."
        correct: true
      - label: "AWS Outposts"
        explanation: "AWS Outposts brings AWS infrastructure to the customer's premises for hybrid scenarios; it is not a platform where you just upload code."
      - label: "An on-premises deployment with virtualization"
        explanation: "On-premises means running resources in your own data center; the startup wants AWS to take care of the infrastructure."
  - prompt: "Due to regulations, a hospital in Monterrey must keep part of its data in its own data center, connected to its applications on AWS, with low latency to its local systems. Which deployment model and which AWS service fit?"
    options:
      - label: "Cloud deployment, with everything running on AWS"
        explanation: "In the cloud model all parts of the application run in the cloud; the hospital must keep data on its premises."
      - label: "On-premises (private cloud), with no connection to the cloud"
        explanation: "On-premises leaves everything in your own data center; the hospital needs to connect its local resources with the cloud."
      - label: "PaaS with AWS Elastic Beanstalk"
        explanation: "PaaS describes how much you manage, not where the data lives; Elastic Beanstalk does not bring AWS capacity to the hospital's premises."
      - label: "Hybrid deployment with AWS Outposts"
        explanation: "Hybrid connects the cloud with on-premises infrastructure, and AWS Outposts brings AWS infrastructure to your premises for low latency or local data processing."
        correct: true
practice:
  - prompt: "A dental clinic in Cali subscribes to a web-based email service. The provider runs and manages everything, and the staff only use it to write to their patients. Which service model is it?"
    options:
      - label: "IaaS (Infrastructure as a Service)"
        explanation: "With IaaS the clinic would receive compute, networking and storage and would have to manage the operating system; here it manages nothing."
      - label: "PaaS (Platform as a Service)"
        explanation: "PaaS is for deploying your own code; the clinic has no application to deploy, it only uses a finished product."
      - label: "SaaS (Software as a Service)"
        explanation: "In SaaS the provider delivers a complete application that it runs and manages, and AWS gives web-based email as a common example."
        correct: true
      - label: "On-premises deployment"
        explanation: "On-premises describes resources in the company's own data center; the email is run by the provider, not by the clinic."
  - prompt: "A startup in Rosario built its booking platform from scratch on AWS, and all parts of the application run in the cloud. Which deployment model does it use?"
    options:
      - label: "Cloud deployment"
        explanation: "In the cloud model the application is fully deployed in the cloud; this is the typical case of a startup born on AWS."
        correct: true
      - label: "Hybrid deployment"
        explanation: "Hybrid connects the cloud with resources that are not in the cloud; using several AWS services does not make it hybrid."
      - label: "On-premises deployment"
        explanation: "On-premises means the servers are in your own data center, and the startup does not have one."
      - label: "PaaS (Platform as a Service)"
        explanation: "PaaS is a service model (how much you manage), not a deployment model (where the application lives)."
  - prompt: "A public agency in Sucre decides to deploy its resources on its own premises with virtualization and management tools, without connecting them to the cloud, because it wants dedicated resources. Which deployment model is it?"
    options:
      - label: "Hybrid deployment with AWS Outposts"
        explanation: "Hybrid connects local resources with the cloud, and Outposts is AWS capacity operated as part of a Region; the agency does not want to connect to the cloud."
      - label: "Cloud deployment"
        explanation: "In the cloud model everything runs in the cloud; here everything stays on the agency's premises."
      - label: "SaaS (Software as a Service)"
        explanation: "SaaS is a service model in which you use the provider's application; it does not describe virtualized resources on your own premises."
      - label: "On-premises (private cloud)"
        explanation: "On-premises means deploying resources on your premises with virtualization and management tools; it is sometimes called private cloud and provides dedicated resources."
        correct: true
  - prompt: "Which service model contains the basic building blocks of cloud IT (networking, compute and storage) and offers the most flexibility and control over resources?"
    options:
      - label: "PaaS (Platform as a Service)"
        explanation: "PaaS gives a medium level of control: the provider manages the hardware and the operating system, and you manage only your application."
      - label: "IaaS (Infrastructure as a Service)"
        explanation: "IaaS provides networking, compute and storage with the most flexibility and control; you even manage the operating system."
        correct: true
      - label: "SaaS (Software as a Service)"
        explanation: "SaaS gives the least control: the provider manages the whole application and you only use it."
      - label: "Cloud deployment"
        explanation: "Cloud deployment describes where the application lives, not how much control you have over resources."
  - prompt: "A store chain in Lima rents virtual servers on Amazon EC2 and patches their operating system, while its legacy inventory system stays in its data center, connected to those apps on AWS. Which combination describes its situation?"
    options:
      - label: "PaaS with a cloud deployment"
        explanation: "Patching the operating system points to IaaS, not PaaS; and with a system in its own data center, not everything is in the cloud."
      - label: "SaaS with an on-premises deployment"
        explanation: "The chain manages servers, so it is not SaaS; and it has resources on AWS, so not everything is on-premises."
      - label: "IaaS with a hybrid deployment"
        explanation: "Servers on EC2 with a self-managed operating system are IaaS, and connecting the cloud with your own data center is a hybrid deployment; the two dimensions combine."
        correct: true
      - label: "IaaS with a cloud deployment"
        explanation: "The service model is IaaS, but the inventory system stays in its own data center, so the deployment is not cloud-only."
  - prompt: "A travel agency in Arequipa is evaluating AWS Elastic Beanstalk for its website and asks how the service is charged. What do you tell it?"
    options:
      - label: "A fixed monthly fee for each deployed application"
        explanation: "Elastic Beanstalk does not charge its own fee per application; the cost comes from the resources the app uses."
      - label: "An hourly charge for using the platform, on top of the resources"
        explanation: "The platform itself has no hourly charge; you only pay for the resources your application provisions, such as EC2 instances."
      - label: "An annual license purchased in AWS Marketplace"
        explanation: "Elastic Beanstalk is an AWS service, not a third-party product with an annual license."
      - label: "There is no additional charge; you pay for the resources your application uses"
        explanation: "There is no additional charge for Elastic Beanstalk: you pay for the resources, such as EC2 instances, that your application uses."
        correct: true
---

## Why does it matter?

A pharmacy chain in Guadalajara wants to modernize its technology. The IT team is debating three ideas: rent virtual servers and manage them as usual, use a platform where they only upload the code of their ordering app, or simply subscribe to ready-to-use email and invoicing software. In addition, due to regulations, part of its data must stay in its own data center for a while.

Each idea corresponds to a different **service model**, and the situation with data "inside and outside" the company corresponds to a **deployment model**. The exam will ask you to recognize them from scenarios like this one.

## Service models: IaaS, PaaS and SaaS

A **service model** describes which part of the technology the provider manages and which part you manage. The higher up you go, the less you manage and the less control you have.

- **IaaS (Infrastructure as a Service):** according to AWS, it contains the basic building blocks of cloud IT: networking, compute and storage. It gives you **the most flexibility and control** over your resources. Typical AWS example: **Amazon EC2**, where you rent virtual servers and you install and update the operating system.
- **PaaS (Platform as a Service):** the provider removes the need for you to manage the underlying infrastructure (hardware and operating systems). You focus on **deploying and managing your application**. On AWS, **AWS Elastic Beanstalk** follows this approach: you build and upload your application, and the service provisions the EC2 instances and configures load balancing, health monitoring and scaling. There is no additional charge; you pay for the resources your application uses.
- **SaaS (Software as a Service):** the provider delivers a complete application that it runs and manages itself. You only think about **how you use the software**. AWS gives web-based email as a common example.

| | IaaS | PaaS | SaaS |
| --- | --- | --- | --- |
| What do you get? | Basic building blocks: compute, networking, storage | A platform to deploy your app | A finished application |
| Who manages the operating system? | You | The provider | The provider |
| Who manages the application? | You | You | The provider |
| Level of control | Highest | Medium | Lowest |
| Example | Virtual servers (Amazon EC2) | Uploading your code to AWS Elastic Beanstalk | Web-based email |

Rule of thumb: if someone in the scenario **patches the operating system**, it is IaaS. If they only **upload code**, it is PaaS. If they only **use** the product, it is SaaS.

## Deployment models: cloud, hybrid and on-premises

A **deployment model** describes **where** your applications live. AWS defines three:

- **Cloud:** the application is fully deployed in the cloud; all of its parts run there. It may have been created in the cloud or migrated from existing infrastructure.
- **Hybrid:** connects infrastructure and applications between cloud-based resources and resources that are **not** in the cloud. The most common case is linking the cloud with existing **on-premises** infrastructure to extend it.
- **On-premises (private cloud):** deploying resources on your own premises using virtualization and management tools. AWS notes that it is sometimes called *private cloud*, that it **does not provide many of the benefits** of the cloud, but that some companies seek it because it provides dedicated resources.

**On-premises** literally means "on the premises": the servers are in a data center owned by the company.

For hybrid scenarios, **AWS Outposts** is a fully managed service that brings AWS infrastructure, services, APIs and tools to the customer's premises. AWS operates and manages that capacity as part of a Region. It is used when an application needs **low latency** to local systems or **local data processing**, but you want to work with the same APIs as in the cloud.

| Model | Where does it run? | Typical case |
| --- | --- | --- |
| Cloud | Everything in the cloud | A startup born on AWS |
| Hybrid | Part in the cloud and part on-premises, connected | A company migrating in stages or with data that must stay in-house |
| On-premises | Everything in your own data center | An organization that needs dedicated resources on its premises |

## When does each deployment model make sense?

- **Cloud:** new applications or ones that can move entirely; you want to take full advantage of pay-as-you-go pricing, elasticity and global reach, without maintaining hardware.
- **Hybrid:** staged migration, legacy systems that cannot move yet, data that must stay on premises due to regulations, or workloads that need low latency to local equipment (for example, with AWS Outposts).
- **On-premises:** the organization needs dedicated resources on its own premises and accepts giving up many cloud benefits (pay-as-you-go, global scale, less maintenance).

## How they combine

The two concepts are independent. The pharmacy in Guadalajara could use **IaaS** (virtual servers on AWS) within a **hybrid** deployment (because it keeps part of its data in its data center). First identify **how much the customer manages** (service), then **where everything is** (deployment).

## Common exam traps

- **Believing "private cloud" is an AWS service.** In AWS terms, an on-premises deployment with virtualization is what is sometimes called a private cloud.
- **Confusing hybrid with "using several AWS services".** Hybrid means connecting the cloud with resources **outside** the cloud, usually on-premises.
- **Thinking IaaS gives less control than PaaS.** It is the other way around: IaaS offers the most control and flexibility.
- **Choosing PaaS when the user only consumes a ready-made application.** If there is no code of their own to deploy, it is SaaS.
- **Thinking AWS Outposts is a 100% cloud deployment.** Outposts brings AWS capacity to your premises: it is a typical piece of a hybrid scenario.

## Exam summary

- IaaS: basic building blocks (compute, networking, storage); the most control.
- PaaS: the provider manages the infrastructure and operating system; you manage your app.
- SaaS: a complete application managed by the provider; you just use it.
- Cloud: everything runs in the cloud.
- Hybrid: the cloud connected with infrastructure that is not in the cloud.
- On-premises: your own data center; sometimes called private cloud.
- AWS Elastic Beanstalk: you upload the code and AWS provisions, load balances and scales (a PaaS approach).
- AWS Outposts: AWS infrastructure on your premises, for low latency or local processing.
- Service and deployment are separate dimensions and they combine.
