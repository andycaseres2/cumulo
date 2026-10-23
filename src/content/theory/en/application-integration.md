---
title: "Application integration: SQS, SNS, EventBridge, and Step Functions"
summary: "How to decouple applications with queues (SQS), pub/sub (SNS), event buses (EventBridge), and workflows (Step Functions), and which one to choose for messages and alerts."
domain: "technology-services"
order: 17
examTasks: ["3.8"]
services: ["Amazon SQS", "Amazon SNS", "Amazon EventBridge", "AWS Step Functions", "AWS Lambda"]
readingMinutes: 5
sources:
  - "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/application-integration.html"
  - "https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html"
  - "https://docs.aws.amazon.com/decision-guides/latest/sns-or-sqs-or-eventbridge/sns-or-sqs-or-eventbridge.html"
  - "https://docs.aws.amazon.com/ses/latest/dg/Welcome.html"
quiz:
  - prompt: "A fintech in Bogotá decouples its payment system with a queue. Each transaction must be processed exactly once and in the exact order in which it was sent. What should it use?"
    options:
      - label: "An Amazon SQS Standard queue"
        explanation: "A Standard queue offers best-effort ordering and at-least-once delivery, so a message could arrive duplicated or out of order."
      - label: "An Amazon SNS topic"
        explanation: "Amazon SNS pushes a message to many subscribers with pub/sub; it is not a queue that guarantees exactly-once processing in order."
      - label: "An Amazon SQS FIFO queue"
        explanation: "FIFO queues guarantee that messages are processed exactly once and in the exact order in which they were sent."
        correct: true
      - label: "AWS Step Functions"
        explanation: "AWS Step Functions coordinates the steps of a workflow with decisions and retries; it is not a message queue between components."
  - prompt: "A retail chain in Lima publishes each new order only once, and that same message must reach the billing queue, the inventory queue, and the customer as an SMS. Which service solves this fan-out?"
    options:
      - label: "Amazon SNS"
        explanation: "Amazon SNS is pub/sub: the order is published to a topic and SNS pushes it to SQS queues and to people by SMS, which is known as fan-out."
        correct: true
      - label: "Amazon SQS"
        explanation: "Amazon SQS stores messages in a queue for a consumer to pull; on its own it does not send the same message to several destinations or send SMS."
      - label: "AWS Step Functions"
        explanation: "AWS Step Functions orchestrates steps in order with decisions and retries; the scenario asks to distribute the same message to many subscribers."
      - label: "Amazon SES"
        explanation: "Amazon SES is for business email from your own domain, such as confirmations or newsletters; it does not deliver messages to queues or send SMS."
  - prompt: "A delivery app in Mexico City wants to coordinate its process: charge the customer, then assign a courier if the payment is approved or notify the customer if it is declined, with retries on errors and a record of the state of each step. Which service should it use?"
    options:
      - label: "Amazon SQS"
        explanation: "Amazon SQS stores messages until a consumer processes them, but it does not define the order of the steps or the decisions in the process."
      - label: "Amazon SNS"
        explanation: "Amazon SNS sends a message to many subscribers; choosing it to coordinate steps with conditional logic is a classic exam trap."
      - label: "Amazon EventBridge"
        explanation: "Amazon EventBridge filters and routes events to targets with rules; it does not organize a multi-step process with decisions and retries."
      - label: "AWS Step Functions"
        explanation: "AWS Step Functions coordinates components with visual workflows: it starts and tracks each step, retries on errors, and records the state."
        correct: true
practice:
  - prompt: "A logistics company in Monterrey wants to run an AWS Lambda function every time one of its EC2 instances changes state, using rules to filter only the events it cares about. Which service should it use?"
    options:
      - label: "Amazon EventBridge"
        explanation: "EventBridge is a serverless event bus that receives events from AWS services and filters them with rules to send them to targets such as Lambda."
        correct: true
      - label: "Amazon SQS"
        explanation: "Amazon SQS stores messages in a queue for a consumer to pull; it does not filter events from AWS services with rules."
      - label: "AWS Step Functions"
        explanation: "Step Functions coordinates the steps of a workflow; reacting to events with filtering rules is EventBridge's job."
      - label: "Amazon SES"
        explanation: "Amazon SES sends business email from your own domain; it does not react to instance state changes."
  - prompt: "A ticketing platform in Buenos Aires gets huge spikes every time a sale opens. It wants to hold requests until its servers process them at their own pace, without losing messages and with maximum throughput; order does not matter. What should it use?"
    options:
      - label: "An Amazon SNS topic"
        explanation: "SNS pushes each message to its subscribers immediately; it does not hold messages for a consumer to pull at its own pace."
      - label: "AWS Step Functions"
        explanation: "Step Functions orchestrates steps with decisions and retries; it is not a queue that absorbs load spikes."
      - label: "An Amazon SQS Standard queue"
        explanation: "An SQS Standard queue holds messages without losing them until a consumer processes them, and it offers maximum throughput."
        correct: true
      - label: "Amazon EventBridge"
        explanation: "EventBridge routes events to targets with rules; the scenario asks to hold requests so the servers can pull them at their own pace."
  - prompt: "The IT team at a clinic in Rosario wants an alert to be sent by SMS and email to the on-call administrators whenever a critical process fails. Which service should it use?"
    options:
      - label: "Amazon SQS"
        explanation: "Choosing SQS to notify people is a classic trap: SQS holds messages for a consumer to pull; it does not send SMS or email."
      - label: "Amazon SNS"
        explanation: "Amazon SNS notifies people by SMS, email, and mobile push, which makes it the choice for alerting administrators."
        correct: true
      - label: "AWS Step Functions"
        explanation: "Step Functions coordinates the steps of a process; it is not the service that delivers alerts by SMS and email."
      - label: "Amazon EventBridge"
        explanation: "EventBridge filters and routes events to targets with rules; it does not itself send SMS or email to people."
  - prompt: "In a delivery app in Mexico City, all the components call each other directly. When the payment service fails, orders are lost. Which design principle solves this problem?"
    options:
      - label: "Keep a tightly coupled architecture"
        explanation: "In a tightly coupled architecture the failure of one component spreads to the others, which is exactly the current problem."
      - label: "Put all the logic in a single program"
        explanation: "A single program means an outage of the payment service affects the entire order process."
      - label: "Make each component scale together with the others"
        explanation: "If they all depend on each other, they keep sharing failures; the idea is for each part to scale independently."
      - label: "Decouple the components so they communicate through messages"
        explanation: "With decoupling, one component leaves a message and another processes it when it can, so a failure does not spread and no orders are lost."
        correct: true
  - prompt: "An online store in Guayaquil wants to send purchase confirmations and marketing newsletters by email from its own domain. Which service should it use?"
    options:
      - label: "Amazon SES"
        explanation: "Amazon SES is the service for business email from your own domain, such as purchase confirmations and newsletters."
        correct: true
      - label: "Amazon SQS"
        explanation: "Amazon SQS is a message queue between components; it does not send email to customers."
      - label: "AWS Step Functions"
        explanation: "Step Functions coordinates the steps of a workflow; it is not an email-sending service."
      - label: "Amazon EventBridge"
        explanation: "EventBridge routes events between applications and services; it does not send business email from your domain."
  - prompt: "What is the difference in model between Amazon SQS and Amazon SNS?"
    options:
      - label: "SQS pushes messages to many subscribers and SNS stores them in a queue"
        explanation: "It is the other way around: SQS is the queue the consumer pulls messages from, and SNS pushes to subscribers."
      - label: "SQS is an event bus with rules and SNS is a visual workflow"
        explanation: "The event bus with rules is EventBridge, and visual workflows belong to Step Functions."
      - label: "In SQS the consumer pulls the messages; SNS pushes each message to all subscribers"
        explanation: "SQS holds messages for a consumer to pull, while SNS is pub/sub and pushes the message to many subscribers."
        correct: true
      - label: "SQS only sends SMS and SNS only connects microservices"
        explanation: "SMS to people is sent by SNS, and SQS is a message queue between components."
---

## Why does it matter?

A delivery platform in Mexico City receives thousands of orders per minute at peak hours. When an order comes in, it has to be charged, the restaurant has to be notified, the customer has to get an SMS, and the inventory has to be updated. If everything happens inside a single program and the payment service goes down, orders are lost.

The solution is to **decouple**: split the application into components that communicate through messages, so that if one fails or gets overloaded, the others keep working. AWS offers several **application integration** services to achieve this, and the exam will ask you to pick the right one for **delivering messages** and **sending alerts and notifications**.

## Decoupling: the core idea

In a **tightly coupled** architecture, components call each other directly and depend on one another: if one fails, the failure spreads. In a **loosely coupled** architecture, one component leaves a message and another processes it when it can. That way each part scales and is updated independently. This is a cloud design best practice.

## Amazon SQS: message queues

**Amazon Simple Queue Service (Amazon SQS)** is a **fully managed message queuing** service. A producer sends messages to a **queue**, where they are stored until a consumer receives and processes them. It lets you send, store, and receive messages between components at any volume, **without losing messages** and without requiring the other service to be available at that moment.

Two queue types:

- **Standard**: maximum throughput, *best-effort* ordering, and **at-least-once** delivery (a message could arrive more than once).
- **FIFO** (*first in, first out*): guarantees that messages are processed **exactly once** and **in the exact order** in which they were sent.

Typical pattern: a **consumer pulls messages** from the queue. Example: orders go into a queue and a group of servers processes them at their own pace.

## Amazon SNS: publish and subscribe

**Amazon Simple Notification Service (Amazon SNS)** is a managed **pub/sub** (publish/subscribe) messaging service. A publisher sends a message to a **topic**, and SNS **pushes** it to all subscribers: **many-to-many** communication.

- To other systems: Amazon SQS queues, AWS Lambda functions, or HTTP/S *webhooks*.
- To people: **mobile push notifications, SMS, and email**.

Sending the same message to many destinations is called **fan-out**. Example: a new order is published to a topic; SNS sends it to the billing queue, to the inventory queue, and to the customer as an SMS.

## Amazon EventBridge: event bus

An **event** is a record that something happened (for example, "an order was created" or "an EC2 instance changed state"). **Amazon EventBridge** is a **serverless event bus** for building **event-driven** applications at scale, with events coming from your applications, from **AWS services**, and from integrated **SaaS** applications (such as Zendesk or Shopify).

You define **routing rules** that filter events and send them to targets such as AWS Lambda. Publisher and consumer are completely decoupled. EventBridge can also schedule automated tasks and share events across accounts. It was previously called CloudWatch Events.

## AWS Step Functions: workflows

**AWS Step Functions** is a fully managed service for **coordinating the components** of distributed applications and microservices using **visual workflows**. You organize the application as a series of **steps**; Step Functions starts and tracks each step, **retries** when there are errors, and records the state of each one so you can diagnose problems.

Example: charge → if the payment is approved, assign a courier → if not, notify the customer. The order and the decisions live in the workflow, not in the code of each service.

## Which one do I choose?

| I need to… | Service | Model |
| --- | --- | --- |
| Hold messages until a component processes them, absorb load spikes | **Amazon SQS** | Queue (the consumer pulls messages) |
| Send the same message to many subscribers or alert people by SMS, email, or push | **Amazon SNS** | Pub/sub (push to subscribers) |
| React to events from AWS services, my applications, or SaaS, with filtering rules | **Amazon EventBridge** | Event bus |
| Coordinate several steps in order, with decisions and retries | **AWS Step Functions** | Workflow (orchestration) |

A useful distinction: for **alerts and notifications** to people, the answer is SNS. For business email from your own domain (purchase confirmations, marketing newsletters), the service is **Amazon SES**, which is covered in the business applications topic.

## Common exam traps

- **Confusing SQS with SNS.** SQS holds messages for **one** consumer to pull; SNS **pushes** a message to **many** subscribers.
- **Thinking SQS Standard guarantees order.** Only **FIFO** queues guarantee exact order and exactly-once processing.
- **Choosing SQS to email an administrator.** Notifications to people belong to **SNS**.
- **Choosing SNS to coordinate steps with conditional logic.** To orchestrate a multi-step process, the answer is **Step Functions**.
- **Forgetting EventBridge when the source is an AWS service or a SaaS application.** Reacting to events with rules is its main job.

## Exam summary

- Decoupling = independent components that communicate through messages; it improves resilience and scalability.
- SQS = message queue; Standard (high throughput, at least once) or FIFO (exact order, exactly once).
- SNS = pub/sub with fan-out; it also notifies people by SMS, email, and push.
- EventBridge = serverless event bus with rules; it receives events from AWS, from your applications, and from SaaS.
- Step Functions = visual workflows with steps, decisions, and retries.
- Keywords: "queue" → SQS; "notification" or "fan-out" → SNS; "event" → EventBridge; "workflow" → Step Functions.
