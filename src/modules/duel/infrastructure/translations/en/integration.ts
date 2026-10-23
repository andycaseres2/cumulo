import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const integrationFamily: ServiceFamily = {
  id: 'integration',
  title: 'Application integration',
  summary:
    'A queue consumed at its own pace (SQS), a message pushed to many subscribers (SNS), a bus that routes events with rules (EventBridge), a stateful multi-step workflow (Step Functions); and to talk to customers, email (SES) or a contact center (Connect).',
  services: [
    {
      name: 'Amazon SQS',
      summary: 'Message queue: decouples components, and consumers pull messages at their own pace.',
    },
    {
      name: 'Amazon SNS',
      summary: 'Publish/subscribe: a message sent to a topic is pushed to many subscribers at once (fan-out).',
    },
    {
      name: 'Amazon EventBridge',
      summary: 'Serverless event bus: receives events from AWS, SaaS, or your apps and routes them with rules; it also schedules tasks.',
    },
    {
      name: 'AWS Step Functions',
      summary: 'Orchestrates stateful multi-step workflows with decisions, retries, and waits for approval.',
    },
    {
      name: 'Amazon SES',
      summary: 'Sends and receives transactional and marketing email from your own domain.',
    },
    {
      name: 'Amazon Connect',
      summary: 'Cloud contact center: phone numbers, voice menus, chat, and routing to agents, with pay-as-you-go pricing.',
    },
  ],
  cards: [
    {
      id: 'integration-1',
      prompt:
        'A bakery in Arequipa takes web orders, and at peak hours the kitchen system gets overwhelmed. You want each order to wait in line until the kitchen can take it, without losing any. Which service do you use?',
      options: [
        {
          service: 'Amazon SNS',
          why: 'SNS pushes each message to its subscribers instantly; it does not hold orders for the kitchen to pull at its own pace.',
        },
        {
          service: 'Amazon SQS',
          why: 'Correct: a queue holds each order until the kitchen app requests it (pull). That decouples the website from the kitchen and absorbs the peaks.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Step Functions orchestrates stateful multi-step workflows; here there are no steps to coordinate, just orders that must wait in line.',
        },
      ],
      answer: 'Amazon SQS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-2',
      prompt:
        'A clinic in Medellín publishes a lab result and, at that same moment, must alert the patient by SMS, the doctor by email, and the billing app. Which service delivers one message to all of them at once?',
      options: [
        {
          service: 'Amazon SQS',
          why: 'A queue delivers each message to a single consumer that pulls it; it does not fan out the alert to several destinations or send SMS.',
        },
        {
          service: 'Amazon SES',
          why: 'SES only handles email; it does not send SMS or notify another application at the same time.',
        },
        {
          service: 'Amazon SNS',
          why: 'Correct: you publish once to a topic and SNS pushes it to every subscriber, such as SMS, email, or an HTTP endpoint (fan-out).',
        },
      ],
      answer: 'Amazon SNS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-3',
      prompt:
        'A startup in Guadalajara uses a SaaS support ticketing app. It wants that app’s events to reach AWS and, depending on their content (urgent or normal), go to different functions, without writing integration code.',
      options: [
        {
          service: 'Amazon EventBridge',
          why: 'Correct: EventBridge receives events from SaaS partners, AWS services, and your apps, and its rules filter them by content and send them to the right target.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS fans out what your app publishes to a topic; it does not natively receive SaaS app events or route them with rules like an event bus.',
        },
        {
          service: 'Amazon SQS',
          why: 'A queue only holds messages until someone consumes them; it does not receive third-party events or decide where each one goes.',
        },
      ],
      answer: 'Amazon EventBridge',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-4',
      prompt:
        'A school in Quito needs a function to generate the attendance report every night at 2:00 a.m., without keeping a server running just to launch that scheduled task. Which service triggers it?',
      options: [
        {
          service: 'AWS Step Functions',
          why: 'Step Functions coordinates the steps of a workflow once it starts, but it is not the time-based scheduler; something has to start it.',
        },
        {
          service: 'Amazon SQS',
          why: 'A queue holds messages to be consumed later; it does not run anything at a set time.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'Correct: EventBridge Scheduler creates tasks with cron or rate expressions and invokes your function at the set time, serverless.',
        },
      ],
      answer: 'Amazon EventBridge',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-5',
      prompt:
        'An insurance company in Santiago processes applications: it validates documents, checks the history, and, if the amount is high, waits for a person’s approval before issuing the policy. It wants retries and to see which step each application is on.',
      options: [
        {
          service: 'Amazon SQS',
          why: 'A queue moves messages between components, but it does not remember which step each application is on or make decisions.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS sends notifications to subscribers; it does not coordinate steps in order or wait for an approval to continue.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'EventBridge routes events based on rules, but it does not keep the state of a multi-step process with decisions and waits.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Correct: Step Functions orchestrates stateful steps with decisions, retries, and waits for human approval, and shows each execution visually.',
        },
      ],
      answer: 'AWS Step Functions',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-6',
      prompt:
        'A logistics company in Lima has four functions: reserve stock, charge the customer, assign transport, and issue the shipping label. They must run in order, some in parallel, and if the charge fails the reservation must be undone. What do you use to coordinate them?',
      options: [
        {
          service: 'AWS Step Functions',
          why: 'Correct: you define the workflow as a state machine, with parallel steps and error catching that runs fallback steps, such as undoing the reservation.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'EventBridge reacts to events and routes them, but it does not track the order of steps or run a compensation when one fails.',
        },
        {
          service: 'Amazon SQS',
          why: 'With queues you could pass messages between functions, but you would have to code the ordering, parallelism, and error handling yourself.',
        },
      ],
      answer: 'AWS Step Functions',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-7',
      prompt:
        'An online store in Bogotá wants to send purchase confirmations and a monthly newsletter from its own domain, and also receive its customers’ email replies. Which service do you choose?',
      options: [
        {
          service: 'Amazon Connect',
          why: 'Connect is a contact center for calls and chat with agents; it is not a platform for sending email newsletters.',
        },
        {
          service: 'Amazon SES',
          why: 'Correct: SES sends transactional and marketing email from your domain, and it can also receive email for processing.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS can email alerts to confirmed subscribers of a topic, but it is not a transactional and marketing email platform.',
        },
      ],
      answer: 'Amazon SES',
      topicSlug: 'business-apps-desktops-and-iot',
    },
    {
      id: 'integration-8',
      prompt:
        'A medical center in Córdoba wants a cloud phone system: one number, a voice menu to choose a specialty, and each call routed to the available receptionist, paying only for usage. Which service do you use?',
      options: [
        {
          service: 'Amazon SNS',
          why: 'SNS sends notifications, even SMS, but it does not answer incoming calls or route them to people.',
        },
        {
          service: 'Amazon SES',
          why: 'SES sends and receives email; it does not handle phone calls or voice menus.',
        },
        {
          service: 'Amazon Connect',
          why: 'Correct: Connect is a cloud contact center with phone numbers, voice flows, and routing to agents, and you pay for what you use.',
        },
      ],
      answer: 'Amazon Connect',
      topicSlug: 'business-apps-desktops-and-iot',
    },
    {
      id: 'integration-9',
      prompt:
        'A savings cooperative in Cochabamba records account transactions. A process must take them one by one, in the exact order they arrived, without processing any of them twice. Which service do you use?',
      options: [
        {
          service: 'Amazon SQS',
          why: 'Correct: a FIFO queue preserves arrival order and offers exactly-once processing, and the process pulls the transactions at its own pace.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS pushes messages to subscribers; it does not let a process pull transactions one by one at its own pace. What you need is a queue.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'EventBridge routes events to targets based on rules; it is not the queue a process consumes from in strict order.',
        },
      ],
      answer: 'Amazon SQS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-10',
      prompt:
        'A gym chain in Monterrey wants to alert its app users with a mobile push notification when a class is canceled. Which service sends that alert?',
      options: [
        {
          service: 'Amazon SES',
          why: 'SES sends email; it does not deliver push notifications to a mobile app.',
        },
        {
          service: 'Amazon SNS',
          why: 'Correct: SNS sends mobile push notifications, SMS, and email to many subscribers at once.',
        },
        {
          service: 'Amazon SQS',
          why: 'A queue holds messages for another component to consume; it does not push them to people’s phones.',
        },
      ],
      answer: 'Amazon SNS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-11',
      prompt:
        'A photo studio in Valparaíso receives thousands of images to retouch. Several servers process them and, if one fails midway, the task must become available to another one. Which service distributes the work?',
      options: [
        {
          service: 'AWS Step Functions',
          why: 'Step Functions coordinates multi-step workflows, but handing out individual tasks to many servers that request them is a queue’s job.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS pushes each message to every subscriber; here each image must be processed by a single server.',
        },
        {
          service: 'Amazon SQS',
          why: 'Correct: each server pulls a message from the queue; if it does not delete it before the visibility timeout expires, the message becomes available again.',
        },
      ],
      answer: 'Amazon SQS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-12',
      prompt:
        'A university in Montevideo wants a function to run automatically every time someone stops an EC2 instance in its labs, to record the change. Which service detects that change and invokes the function?',
      options: [
        {
          service: 'Amazon SQS',
          why: 'A queue does not detect changes in your resources; it only holds the messages someone sends to it.',
        },
        {
          service: 'Amazon EventBridge',
          why: 'Correct: AWS services emit events, such as an instance state change, and an EventBridge rule sends them to your function.',
        },
        {
          service: 'Amazon SNS',
          why: 'SNS delivers what someone publishes to a topic; it does not receive your resources’ state-change events on its own.',
        },
      ],
      answer: 'Amazon EventBridge',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-13',
      prompt:
        'A store in Asunción publishes a message when an order is paid. Inventory, billing, and shipping must each get their own copy in their own queue to process at their own pace. Which service copies it to the three queues?',
      options: [
        {
          service: 'Amazon SNS',
          why: 'Correct: this is the fan-out pattern. You publish once to a topic and SNS sends a copy to each subscribed queue.',
        },
        {
          service: 'Amazon SQS',
          why: 'Each queue holds one consumer’s messages; a queue on its own does not duplicate the order to other queues.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Step Functions coordinates the steps of a workflow; to get one message to several queues at once, a publish/subscribe topic is enough.',
        },
      ],
      answer: 'Amazon SNS',
      topicSlug: 'application-integration',
    },
    {
      id: 'integration-14',
      prompt:
        'A publisher in San José, Costa Rica, hires staff through a process that takes days: create the account, wait for the contract signature, assign equipment, and notify the team. It needs the process to remember which step it is on while it waits.',
      options: [
        {
          service: 'Amazon SES',
          why: 'SES can send the welcome email, but it does not coordinate the steps or remember where the process is.',
        },
        {
          service: 'Amazon SQS',
          why: 'A queue holds messages for a limited time; it does not track the state of a process with steps, waits, and decisions.',
        },
        {
          service: 'AWS Step Functions',
          why: 'Correct: a Step Functions Standard workflow can run for up to one year, saves the state of each step, and can wait for an external response.',
        },
      ],
      answer: 'AWS Step Functions',
      topicSlug: 'application-integration',
    },
  ],
};
